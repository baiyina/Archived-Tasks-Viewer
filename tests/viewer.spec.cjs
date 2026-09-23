const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const parent = { id: 'p', title: '<img src=x onerror="window.injected=1"> Parent', projectId: 'project', tagIds: [], subTaskIds: ['done', 'open'], isDone: true, notes: '# Heading\n\n**Bold** and [safe](https://example.com)\n\n- [x] Complete\n- [ ] Pending\n\n```js\nconst n = 1;\n```\n\n<script>window.injected=1</script>\n\n[bad](javascript:alert(1))', attachments: [{ title: 'bad attachment', path: 'javascript:alert(1)' }, { title: 'good attachment', path: 'https://example.com/file' }] };
const children = [{ id: 'done', parentId: 'p', title: 'Completed child', isDone: true, subTaskIds: [] }, { id: 'open', parentId: 'p', title: 'Pending child', isDone: false, subTaskIds: [] }];

test('release page fits the host uncompressed byte limit', () => {
  expect(Buffer.byteLength(html, 'utf8')).toBeLessThanOrEqual(100 * 1024);
  expect(fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')).toBe(html);
});

test('bundled Markdown works offline in a sandboxed blob iframe', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.route('**/*', (route) => route.abort());
  await page.evaluate((html) => {
    const mock = `<script>window.PluginAPI = {
      getArchivedTasks: async () => [{id: 'blob', title: 'Blob task', notes: '# 中文备注\\n\\n| Name | Value |\\n| --- | --- |\\n| Test | 42 |', subTaskIds: []}],
      getTasks: async () => [], getAllProjects: async () => [], getAllTags: async () => []
    };<\/script>`;
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.src = URL.createObjectURL(new Blob([html.replace('<head>', '<head>' + mock)], {type: 'text/html'}));
    document.body.append(frame);
  }, html);
  const frame = page.frameLocator('iframe');
  await frame.getByRole('button', {name: 'View details'}).click();
  await expect(frame.locator('.notes h1')).toHaveText('中文备注');
  await expect(frame.locator('.notes td').last()).toHaveText('42');
  expect(requests).toEqual([]);
});

test('minified theme variables still switch the visible theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await boot(page);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(248, 248, 247)');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(19, 19, 20)');
});

async function boot(page, options = {}) {
  await page.route('**/*', (route) => route.abort());
  await page.addInitScript(() => {});
  await page.evaluate(({ parent, children, options }) => {
    window.calls = [];
    window.archive = options.tasks || [parent, ...children];
    window.PluginAPI = {
      getArchivedTasks: async () => window.archive,
      getTasks: async () => options.active || [],
      getAllProjects: async () => [{ id: 'project', title: '<img src=x onerror="window.injected=2">' }],
      getAllTags: async () => [],
    };
    if (!options.legacy) window.PluginAPI.restoreArchivedTask = async (id) => {
      window.calls.push(id);
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (options.fail) throw new Error('Storage unavailable');
      window.archive = [];
    };
  }, { parent, children, options });
  await page.setContent(html);
  await expect(page.locator('#status')).not.toHaveText('Loading archived tasks...');
}

test('renders safe Markdown and treats task/project titles as plain text', async ({ page }) => {
  await boot(page);
  await page.getByRole('button', { name: 'View details' }).first().click();
  await expect(page.locator('.modal .task-title')).toHaveText(parent.title);
  await expect(page.locator('.notes h1')).toHaveText('Heading');
  await expect(page.locator('.notes strong')).toHaveText('Bold');
  await expect(page.locator('.notes pre code')).toContainText('const n = 1;');
  await expect(page.locator('.notes input')).toHaveCount(2);
  await expect(page.locator('.notes input').first()).toBeDisabled();
  await expect(page.locator('.notes a[href^="javascript:"]')).toHaveCount(0);
  await expect(page.locator('.modal img, .modal script, .task-row img')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'bad attachment' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'good attachment' })).toHaveAttribute('rel', 'noopener noreferrer');
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
});

test('search does not prune full task details, and flat view retains subtasks', async ({ page }) => {
  await boot(page);
  await page.locator('#filter-input').fill('Completed child');
  await page.getByRole('button', { name: 'View details' }).first().click();
  await expect(page.locator('.modal')).toContainText('Pending child');
  await expect(page.locator('.modal')).toContainText('Subtasks (1/2 done)');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('#filter-input').fill('');
  await page.locator('[data-field="view"] [data-value="flat"]').click();
  await expect(page.locator('.subtask-preview').first()).toContainText('1/2 done');
});

test('shows relevant active parent and siblings without unrelated active tasks', async ({ page }) => {
  await boot(page, { tasks: [children[0]], active: [parent, children[1], { id: 'other', title: 'Unrelated active', subTaskIds: [] }] });
  await expect(page.locator('#content')).toContainText('Active context');
  await expect(page.locator('#content')).not.toContainText('Unrelated active');
  await page.getByRole('button', { name: 'View details' }).first().click();
  await expect(page.locator('.modal')).toContainText('Pending child');
});

test('remains read-only without unsupported restore controls', async ({ page }) => {
  await boot(page);
  await page.getByRole('button', { name: 'View details' }).first().click();
  await expect(page.getByRole('button', { name: 'Restore task', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => window.calls)).toEqual([]);
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest.json'), 'utf8'));
  expect(manifest.permissions).not.toContain('PluginAPI.restoreArchivedTask');
});
test('malformed cyclic task relationships do not hang the viewer', async ({ page }) => {
  await boot(page, { tasks: [{ id: 'a', title: 'Cycle A', parentId: 'b' }, { id: 'b', title: 'Cycle B', parentId: 'a' }] });
  await expect(page.locator('.task-row')).toHaveCount(2);
});

test('Markdown details fit a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await boot(page, { tasks: [{ ...parent, title: 'Archived project notes' }, ...children] });
  await page.getByRole('button', { name: 'View details' }).first().click();
  const box = await page.locator('.modal').boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(390);
  await page.screenshot({ path: 'test-results/mobile-details.png' });
});
