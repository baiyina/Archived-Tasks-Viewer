# Changelog

## v0.5.0

### English

- Render Markdown notes offline: headings, lists, checkboxes, tables, links and code blocks (#8).
- Sanitize rendered notes; display task/project titles as text and restrict clickable attachment URLs to safe protocols.
- Keep complete task details when search filters out children; show completion counts and related active family context (#3).
- Handle cyclic task relationships and time out cleanly when the plugin API is unavailable.
- Clarify English and Chinese installation instructions, incorporating the installation-flow improvement proposed in PR #4.
- Build self-contained iframe assets and package only required release files, excluding personal backups.

Compatibility: Super Productivity 16.0.0+. No host changes are required. This plugin remains read-only. Archive restoration (#5 / PR #7) is **not implemented** because the inspected host plugin API does not expose it; adding a permission alone cannot provide that capability. No permanent archive deletion is included.

Validation: six Edge browser regression tests passed; build and ZIP file allowlist checked.

### 中文

- 离线渲染 Markdown 备注，支持标题、列表、复选框、表格、链接和代码块（#8）。
- 过滤不安全 HTML，任务和项目标题按纯文本显示，附件链接使用安全协议白名单。
- 搜索不再裁剪详情中的子任务，补充完成数量和相关活动父子任务上下文（#3）。
- 防止循环父子关系导致页面卡住，插件 API 不可用时给出超时错误。
- 同步优化中英文安装说明，采纳 PR #4 提出的安装流程改进。
- 构建独立 iframe 页面，仅打包必要文件，避免混入个人备份。

兼容 Super Productivity 16.0.0+，**不需要修改主体**，插件保持只读。恢复归档需求（#5 / PR #7）尚未实现：已检查的宿主插件 API 没有开放此能力，仅增加权限不能实现恢复。本版也不包含永久删除归档。

验证：6 项 Edge 浏览器回归测试通过，构建及 ZIP 文件白名单检查通过。
