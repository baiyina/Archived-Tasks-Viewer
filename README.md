# Archived Tasks Viewer (Super Productivity)

[English](#english) | [中文](#中文)

## English
Read-only Super Productivity plugin to browse archived tasks with a clean, iframe-based UI.

### Compatibility
- Super Productivity `>= 16.0.0`

### Features
- Read-only access to archived tasks (`PluginAPI.getArchivedTasks`)
- Screens: `Tasks` (list) and `Calendar` (week/month)
- Tasks screen: grouping by completion date / tag / project; view as parent task tree or flat list
- Filter by title/notes/tag/project
- Per-card info: title, done date, project, tags, created/submit date
- Subtask preview: title + done date (full details in modal)
- Details modal: project, tags, done date, created, time spent/estimate, notes, subtasks, attachments
- Light/Dark theme toggle (auto-detect on first load)

### Install & Use
1) Zip this folder (keep `manifest.json`, `plugin.js`, `index.html` at the zip root):
   ```powershell
   Compress-Archive -Path * -DestinationPath archived-viewer-plugin.zip -Force
   ```
2) Download from GitHub Releases (recommended): [Releases](https://github.com/baiyina/Archived-Tasks-Viewer/releases) → `archived-viewer-plugin-<version>.zip`, then in Super Productivity go to `Settings -> Plugins -> Upload plugin` and enable it.
   - Or, use the local zip you just built.
3) Open sidebar `Archived tasks`:
   - Screen: `Tasks` (list) or `Calendar` (week/month)
   - If `Tasks` screen: switch grouping (date/tag/project) and view (parent tree/flat)
   - Filter text; click `Reload` to refresh
   - Click `View details` for the full modal

### Permissions
- `PluginAPI.getArchivedTasks`
- `PluginAPI.getAllProjects`
- `PluginAPI.getAllTags`
- `PluginAPI.showSnack`

### Notes
- Strictly read-only; never edits tasks.
- Tag grouping uses the first tag as the bucket key; all tags remain visible on cards.
- Sample import file: `sample-import.json` (Super Productivity backup format) for quick testing.
- If this plugin helps you, consider leaving a ⭐ on GitHub — it tells me it’s useful. I’ll keep polishing it and follow up in discussions when time allows.

---

## 中文
适用于 Super Productivity 的只读插件：在 iframe 界面浏览归档任务，支持分组、过滤和详情弹窗。

### 兼容性
- Super Productivity `>= 16.0.0`

### 功能
- 只读获取归档任务（`PluginAPI.getArchivedTasks`）
- 两个界面：`Tasks`（列表）与 `Calendar`（周/月）
- Tasks 界面：按完成日期/标签/项目分组，视图可选父任务树或平铺
- 过滤：标题、备注、标签、项目
- 卡片展示：标题、完成日期、项目、标签、创建/提交时间
- 子任务简览：标题 + 完成时间（更多信息在详情弹窗查看）
- 详情弹窗：项目、标签、完成时间、创建时间、耗时/预估、备注、子任务、附件
- 明暗主题切换（首次自动跟随系统）

### 安装与使用
1) 在本目录生成 zip（确保 `manifest.json`、`plugin.js`、`index.html` 位于压缩包根目录）：
   ```powershell
   Compress-Archive -Path * -DestinationPath archived-viewer-plugin.zip -Force
   ```
2) 从 GitHub Releases 下载（推荐）：[Releases](https://github.com/baiyina/Archived-Tasks-Viewer/releases) 中获取 `archived-viewer-plugin-<version>.zip`；然后在 Super Productivity 里打开 `Settings -> Plugins -> Upload plugin` 上传并启用。
   - 或使用刚才本地打包的 zip。
3) 打开侧边栏 `Archived tasks`：
   - Screen：`Tasks`（列表）或 `Calendar`（周/月）
   - 在 `Tasks` 下切换分组（日期/标签/项目）与视图（父任务树/平铺）
   - 文本过滤，点击 `Reload` 重新拉取
   - 点击 `View details` 打开完整详情

### 权限
- `PluginAPI.getArchivedTasks`
- `PluginAPI.getAllProjects`
- `PluginAPI.getAllTags`
- `PluginAPI.showSnack`

### 备注
- 完全只读，不会修改任务数据。
- 标签分组使用首个标签作为分组键，卡片仍会展示所有标签。
- 提供测试用例 `sample-import.json`（Super Productivity 备份格式），可快速验证。
- 如果这个插件对你有帮助，欢迎在 GitHub 点亮一个 ⭐。这会让我知道它有价值，也便于我抽空继续优化并关注讨论区。
