---
name: analyze-project
description: Inspect a repository and produce an evidence-based project assessment before implementation.
---

Analyze the current repository without modifying files.

1. Inspect repository structure, project instructions, README, relevant documentation, manifests, scripts, and version-control status.
2. Identify the actual stack, entry points, architecture, conventions, and current implementation state.
3. Identify incomplete areas, risks, duplicated systems, and unclear requirements only where supported by evidence.
4. Separate verified facts from assumptions and questions.
5. Recommend the smallest useful next step.

Return:
- Project summary.
- Stack and important dependencies.
- Architecture overview.
- Current status.
- Risks and unknowns.
- Suggested next step.

Do not invent findings. Do not edit files.
