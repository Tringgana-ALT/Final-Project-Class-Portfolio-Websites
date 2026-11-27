---
name: review-code
description: Review a proposed or existing change for correctness, regressions, maintainability, and security.
---

Review the specified change. Prioritize actionable findings over stylistic preferences.

Inspect the relevant diff and surrounding implementation. Check:
- Functional correctness and edge cases.
- Regression risk and compatibility.
- Error handling and validation.
- Security, authorization, and privacy where relevant.
- Performance and resource handling where relevant.
- Accessibility and responsive behavior for interfaces.
- Tests and documentation.

For each finding, include severity, file/location, impact, and a concrete recommendation. Do not invent issues. Separate confirmed defects from questions or potential risks. If no material findings are found, say so and state what was not verified. Do not modify code unless asked.
