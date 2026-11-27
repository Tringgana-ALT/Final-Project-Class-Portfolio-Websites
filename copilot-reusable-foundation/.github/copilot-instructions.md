# Repository-Wide Copilot Instructions

These instructions define the default collaboration and engineering workflow for this repository.

## First principles
- Treat the current repository, its documentation, and the user's explicit brief as the source of truth.
- Inspect before changing: read relevant files, understand existing conventions, and check the working tree.
- Preserve existing user work. Never overwrite, reset, delete, or revert unrelated changes without permission.
- Prefer the smallest coherent change that solves the stated problem.
- Do not invent project requirements, test results, APIs, configuration, or deployment status.
- Verify current package versions and project choices before changing dependencies or architecture.

## Workflow
1. Clarify the requested outcome and identify constraints.
2. Inspect the relevant code, docs, scripts, and repository state.
3. Summarize findings, assumptions, risks, and a focused implementation plan.
4. Define acceptance criteria before substantial implementation.
5. Implement one phase or independently reviewable subtask at a time.
6. Run relevant checks and inspect their actual output.
7. Fix regressions introduced by the change.
8. Update documentation where behavior, setup, architecture, or decisions changed.
9. Report what changed, what was tested, what remains, and any limitations.

For substantial or multi-step work, stop after presenting the plan and wait for approval. Do not begin the next phase until the user approves. For small, low-risk requests, proceed directly while keeping the same inspection and verification principles.

## Engineering quality
- Follow the project's established language, framework, architecture, naming, formatting, and test conventions.
- Keep presentation, domain logic, and data/infrastructure concerns separated where appropriate.
- Validate untrusted input at the appropriate trust boundary.
- Handle loading, empty, success, error, and unauthorized states when relevant.
- Avoid unnecessary dependencies, duplicated abstractions, speculative features, and premature generalization.
- Consider performance, accessibility, security, privacy, and maintainability where relevant to the project.

## Verification
- Discover available scripts and test commands before running them.
- Run the narrowest relevant checks first, then broader regression/build checks when appropriate.
- Never claim a check passed unless it was run and its output inspected.
- If a check cannot run, state why and what remains unverified.
- Do not mark incomplete work as complete.

## Documentation and communication
- Keep project documentation aligned with the implementation.
- Record meaningful technical decisions and their reasons.
- Communicate in the user's preferred language; default to clear, concise Indonesian when the user communicates in Indonesian.
- Explain material risks and distinguish facts from assumptions.
- End substantial tasks with a concise implementation and verification report.
