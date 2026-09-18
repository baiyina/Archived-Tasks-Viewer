# Handoff

## Current Goal
Publish plugin-only v0.5.0: safe Markdown, task relationships, documentation and packaging. Do not modify or publish the Super Productivity host repository.

## Completed
Initial review recorded in ../HANDOFF.md.

- 2026-09-18: Implemented safe offline Markdown with pinned marked/DOMPurify, text-only task/project titles and attachment URL allowlist.
- Initially implemented restore interaction and a companion host API; both were withdrawn after the user clarified that only the plugin is in scope. The host repository is clean at its original commit.
- Complete family details survive search filtering; parent view includes related active family context, completion counts, and cycle protection.
- Reworked bilingual installation docs, explicit packaging allowlist, dependency license notices; built archived-viewer-plugin-0.5.0.zip.

## In Progress
2026-09-18: User authorized commit, push and GitHub release v0.5.0 with the verified plugin-only ZIP.

## Next Steps
Publish v0.5.0 and verify the uploaded ZIP. Issue #5 remains unresolved because the existing plugin API does not expose archive restoration. The plugin stays read-only; there is no unsupported restore permission or button, and no permanent purge.

## Key Files
src/index.html, index.html, manifest.json, README.md.

## Verification
Final plugin-only build: 6 Playwright browser tests passed in Edge (safe Markdown/input, full details after filtering, flat/active context, read-only behavior, cycles and narrow viewport). Build and ZIP contents verified: four release files, no personal JSON. Earlier restore/host test results describe a withdrawn implementation and are not release claims.

## Notes
Keep existing untracked JSON files private and unchanged.
