---
name: fix-bug
description: Diagnose and safely fix a reported bug with focused regression checks.
---

Investigate the reported bug before editing.

1. Reproduce it or state what evidence is available.
2. Trace the affected execution path.
3. Identify the root cause and explain it briefly.
4. Inspect repository status and preserve unrelated changes.
5. Propose a minimal fix and relevant regression test.
6. Implement only the requested fix.
7. Run focused checks and inspect their output.
8. Report files changed, verification, and remaining uncertainty.

Do not hide errors, add arbitrary delays, or rewrite unrelated modules. Do not claim success without verification.
