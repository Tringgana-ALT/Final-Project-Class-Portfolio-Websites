---
applyTo: "**/*"
---

# Security and Privacy Instructions

Apply these rules when relevant to the code being changed:

- Identify trust boundaries and enforce permissions at trusted server/backend boundaries.
- Follow least privilege for accounts, roles, tokens, services, and storage.
- Never commit secrets or expose privileged credentials to untrusted clients.
- Validate untrusted input and uploads according to the project's actual requirements.
- Avoid logging secrets, tokens, or unnecessary personal data.
- Use private-by-default handling for sensitive data.
- Test unauthorized access and permission boundaries where applicable.
- Do not add security controls that conflict with the project's architecture; explain the chosen approach.
