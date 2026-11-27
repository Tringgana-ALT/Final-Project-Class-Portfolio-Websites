# Reusable GitHub Copilot Foundation

This folder contains a technology-agnostic baseline for Copilot-assisted development.

## Structure

```text
.github/
├── copilot-instructions.md
├── instructions/
│   ├── documentation.instructions.md
│   └── security.instructions.md
├── prompts/
│   ├── analyze-project.prompt.md
│   ├── plan-feature.prompt.md
│   ├── review-code.prompt.md
│   └── fix-bug.prompt.md
└── skills/
    └── project-development/
        └── SKILL.md
```

## How to adapt it to a project

1. Keep `copilot-instructions.md` as the repository-wide baseline.
2. Add a project-specific skill under `.github/skills/<project-name>/SKILL.md`.
3. Put stack-specific or file-specific rules in `.github/instructions/` with a narrow `applyTo` pattern.
4. Add repeatable workflows in `.github/prompts/`.
5. Document the project's actual stack, commands, architecture, constraints, and acceptance criteria in its own README/docs.
6. Remove or edit any rule that does not apply to the project.

## What is intentionally not included

The original Family Archive-specific choices are not treated as universal defaults. This foundation does not mandate Next.js, Supabase, Vercel, family data models, particular roles, or a fixed documentation tree.

## Source extraction

The reusable workflow was distilled from the supplied `.github` archive: repository inspection, phased work, approval gates, preservation of user changes, honest QA, regression protection, documentation, and completion reporting. Product-specific architecture and deployment decisions should remain project-specific.
