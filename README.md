# Archived Tasks Viewer (Super Productivity)

[English](#english) | [中文](#中文)

## English
Read-only plugin for Super Productivity: view archived tasks grouped by date/tag/project, inspect details, and run entirely in an iframe UI.

### Compatibility
- Super Productivity `>= 16.0.0`

### Features
- Fetch archived tasks only (`PluginAPI.getArchivedTasks`)
- Group by completion date / tag / project
- Show details: project, tags, done date, issue, spent vs estimate, notes, subtasks, attachments
- Pure HTML/JS in `index.html` (iframe view, no external deps)

### Install & Use
1) Create the zip from this folder (keep `manifest.json`, `plugin.js`, `index.html` at the zip root):
   ```powershell
   Compress-Archive -Path * -DestinationPath archived-viewer-plugin.zip -Force
   ```
2) In Super Productivity: `Settings -> Plugins -> Upload plugin`, pick `archived-viewer-plugin.zip`, then enable it.
3) Open the sidebar entry `Archived tasks`:
   - Switch grouping: date / tag / project
   - Click `Reload` to refresh archived data

### Permissions
- `PluginAPI.getArchivedTasks`
- `PluginAPI.getAllProjects`
- `PluginAPI.getAllTags`
- `PluginAPI.showSnack`

### Notes
- Read-only; never writes or edits tasks.
- Tag grouping uses the first tag as the key; all tags still show on each card.

---

## 中文
Super Productivity 的只读插件：查看归档任务，按日期/标签/项目分组，并在 iframe 中展示详情。

### 兼容性
- Super Productivity `>= 16.0.0`

### 功能
- 只读获取归档任务（`PluginAPI.getArchivedTasks`）
- 按完成日期 / 标签 / 项目分组
- 展示详情：项目、标签、完成时间、Issue、耗时/预估、备注、子任务、附件
- 纯前端实现（`index.html`），无外部依赖

### 安装与使用
1) 在本目录生成 zip（确保 `manifest.json`、`plugin.js`、`index.html` 在压缩包根目录）：
   ```powershell
   Compress-Archive -Path * -DestinationPath archived-viewer-plugin.zip -Force
   ```
2) 打开 Super Productivity：`Settings -> Plugins -> Upload plugin`，选择 zip 并启用。
3) 侧边栏出现 `Archived tasks`：
   - 选择分组方式（date/tag/project）
   - 点击 `Reload` 重新拉取归档数据

### 权限
- `PluginAPI.getArchivedTasks`
- `PluginAPI.getAllProjects`
- `PluginAPI.getAllTags`
- `PluginAPI.showSnack`

### 备注
- 全程只读，不会修改任务数据。
- 标签分组使用任务的第一个标签作为分组键，卡片仍显示所有标签。
