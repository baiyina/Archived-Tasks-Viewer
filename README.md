# Archived Tasks Viewer (Super Productivity Plugin) / 归档任务查看器

Read-only plugin for Super Productivity: view archived tasks grouped by date/tag/project, inspect details, and stay within an iframe UI.  
面向 Super Productivity 的只读插件：查看「归档任务」，按日期/标签/项目分组，并在 iframe 中展示详情。

## Compatibility / 兼容性
- Super Productivity `>= 16.0.0`

## Features / 功能
- Read archived tasks only (`PluginAPI.getArchivedTasks`) / 只读获取归档任务
- Group by completion date / tag / project / 可按完成日期、标签、项目分组
- Show details: project, tags, done time, issue, spent/estimate, notes, subtasks, attachments / 展示项目、标签、完成时间、Issue、耗时/预估、备注、子任务、附件
- Pure HTML/JS in `index.html` (iframe view, no deps) / 纯前端实现，无额外依赖

## Install & Use / 安装与使用
1) Zip this folder (keep `manifest.json`, `plugin.js`, `index.html` at the root of the zip):  
   在本目录生成 zip（确保三文件在压缩包根目录）：
   ```powershell
   Compress-Archive -Path * -DestinationPath archived-viewer-plugin.zip -Force
   ```
2) Super Productivity → `Settings -> Plugins -> Upload plugin` → choose `archived-viewer-plugin.zip` → enable.  
   打开 Super Productivity：`Settings -> Plugins -> Upload plugin`，选择 zip 后启用。
3) Sidebar entry `Archived tasks`:  
   - Pick grouping: date / tag / project  
   - Click `Reload` to refresh archived data  
   侧边栏出现 `Archived tasks`：选择分组方式，点击 `Reload` 重新拉取数据。

## Permissions / 权限
- `PluginAPI.getArchivedTasks`
- `PluginAPI.getAllProjects`
- `PluginAPI.getAllTags`
- `PluginAPI.showSnack`

## Notes / 备注
- Read-only; no writes or edits to tasks / 全程只读，不修改任务数据。
- Tag grouping uses the first tag as the group key; all tags still show on the card / 标签分组取第一个标签作为分组键，卡片会显示全部标签。
