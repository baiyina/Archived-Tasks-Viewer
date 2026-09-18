# Archived Tasks Viewer (Super Productivity)

[English](#english) | [中文](#中文)

## English

Read-only plugin to browse archived tasks, read Markdown notes and inspect complete task families.

### Compatibility

- Browsing: Super Productivity **16.0.0 or newer**.
- No host modifications are required. The plugin only uses existing read APIs.
- Archive restoration ([issue #5](https://github.com/baiyina/Archived-Tasks-Viewer/issues/5)) is not implemented: the inspected host plugin API does not expose it. This release does not add an unsupported permission or claim to resolve that issue.

### Install

1. Choose **one** source:
   - **Download (recommended):** obtain the plugin ZIP from [GitHub Releases](https://github.com/baiyina/Archived-Tasks-Viewer/releases).
   - **Build locally:** with Node.js 20.19+ and PowerShell, run:
     ```powershell
     npm ci
     ./scripts/package.ps1
     ```
     Only index.html, manifest.json, plugin.js and THIRD_PARTY_NOTICES.md from dist/ are included at the ZIP root. **Never zip the whole working directory**, which may contain personal backups.
2. In Super Productivity, open **Settings → Plugins → Upload plugin**, upload the ZIP and enable it.
3. Open **Archived tasks** from the sidebar.

### Use

- **Tasks:** group by completion date, first tag or project; switch parent tree/flat view. All tags remain visible.
- **Calendar:** switch week/month and use Prev, Today and Next.
- **Search:** filter title, notes, tags and project. Details show the complete family, even when search hides some children.
- **Subtasks:** show completion counts and Done/Open status. Related active parents and siblings are labelled as context in parent view. Unrelated active tasks are excluded; flat/calendar views list archived tasks only.
- **Notes:** offline Markdown headings, lists, checkboxes, tables, links and code blocks. Unsafe HTML is removed, embedded images are omitted, and only HTTP/HTTPS/mailto links are clickable. Unsupported attachment paths stay visible as text.
- This plugin does not modify, restore or permanently delete tasks.

### Permissions

PluginAPI.getArchivedTasks, PluginAPI.getTasks (related active context), PluginAPI.getAllProjects, PluginAPI.getAllTags, PluginAPI.showSnack.

### Development

Edit src/index.html; **npm run build** generates the self-contained root index.html and dist/. Dependencies are inlined for the host's blob iframe. **npm test** runs browser regressions using Microsoft Edge; set PLAYWRIGHT_CHANNEL=chrome for Chrome. npm ci uses pinned dependencies in package-lock.json. THIRD_PARTY_NOTICES.md contains dependency licenses. Personal JSON backups are never packaged or used as test fixtures.

## 中文

只读插件：浏览归档任务，阅读 Markdown 备注，查看完整父子任务关系。

### 兼容性

- 浏览功能：Super Productivity **16.0.0 及以上**。
- 不需要修改主体，仅使用现有读取接口。
- 归档恢复（[Issue #5](https://github.com/baiyina/Archived-Tasks-Viewer/issues/5)）尚未实现：已检查的宿主插件 API 没有开放此能力。本版不添加不存在的权限，也不将该问题标为已解决。

### 安装

1. **任选一种**获取方式：
   - **下载（推荐）**：从 [GitHub Releases](https://github.com/baiyina/Archived-Tasks-Viewer/releases) 获取插件 ZIP。
   - **源码构建**：使用 Node.js 20.19+ 和 PowerShell：
     ```powershell
     npm ci
     ./scripts/package.ps1
     ```
     仅将 dist/ 中的 index.html、manifest.json、plugin.js、THIRD_PARTY_NOTICES.md 放入压缩包根目录。**不要打包整个工作目录**，以免混入个人备份。
2. 在 Super Productivity 打开 **Settings → Plugins → Upload plugin**，上传 ZIP 并启用。
3. 从侧边栏打开 **Archived tasks**。

### 使用

- **Tasks 列表**：按完成日期、首个标签或项目分组，切换父任务树/平铺，卡片仍显示全部标签。
- **Calendar 日历**：切换周/月，通过 Prev、Today、Next 导航。
- **搜索**：筛选标题、备注、标签和项目，详情始终显示完整关联任务，不受列表搜索裁剪影响。
- **子任务**：显示完成数量及 Done/Open 状态。父任务视图补充相关活动父任务、兄弟任务并标为上下文；不混入无关活动任务，平铺和日历只列归档任务。
- **备注**：离线支持 Markdown 标题、列表、复选框、表格、链接、代码块。过滤不安全 HTML，不加载内嵌图片，只允许 HTTP/HTTPS/mailto 链接；不能安全打开的附件路径保留为文本。
- 本插件不修改、恢复或永久删除任务。

### 权限

PluginAPI.getArchivedTasks、PluginAPI.getTasks（关联活动任务）、PluginAPI.getAllProjects、PluginAPI.getAllTags、PluginAPI.showSnack。

### 开发

修改 src/index.html；**npm run build** 生成可独立运行的根目录 index.html 和 dist/，依赖内联以适配宿主 blob iframe。**npm test** 使用 Microsoft Edge 执行浏览器回归，设置 PLAYWRIGHT_CHANNEL=chrome 可改用 Chrome。npm ci 按 package-lock.json 安装固定版本依赖，许可见 THIRD_PARTY_NOTICES.md。个人 JSON 备份不会打包或用作测试数据。
