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

## Bugfix session — 2026-09-23

- Goal: fix reported plugin bugs, limited to this repository. v0.5.0 was already published; the publication steps above are historical.
- Fixed #9: original index.html was 130,772 bytes versus the host limit of 102,400. ESM bundling, minification, private theme-variable renaming and removal of unused CSS reduce it to 102,047 bytes. Build fails before updating release files if oversized. Only 353 bytes of headroom remain, so preserve the size guard.
- #8: existing safe Markdown remains functional, including Chinese text and tables in an offline sandboxed blob iframe. #5 restoration is still unsupported; no host changes or delete/restore behavior added.
- Prepared local v0.5.1 and archived-viewer-plugin-0.5.1.zip. Not committed, pushed or released. ZIP has only index.html, manifest.json, plugin.js, THIRD_PARTY_NOTICES.md; personal JSON files untouched.
- Verification: all 9 Edge tests passed; ZIP entry sizes/allowlist and git diff --check passed; mobile screenshot reviewed. Not installed in a live host on macOS/Android.
- Key files: scripts/build.cjs, src/index.html, tests/viewer.spec.cjs, package.json/lock, manifest.json, CHANGELOG.md, README.md and generated index.html.
- Next: user can install the local ZIP; publish v0.5.1 and update issues if requested.

## Release preparation — 2026-09-24

- User authorized uploading v0.5.1. Remote main matches the v0.5.0 base; committing and publishing only this plugin's tracked changes and verified four-file ZIP.
- Existing verification remains valid: 9 passing tests, 102,047-byte page, ZIP inspected. No functional changes since those checks. Final publication result is recorded in the parent workspace HANDOFF.md.
