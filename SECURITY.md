Security Policy

Atlas Estates is a front-end real estate demo and integration-ready project. Security is important, and contributors and users are encouraged to report vulnerabilities responsibly.

This repository must not contain real credentials, private keys, production secrets, or sensitive personal information.

Supported Versions

Security fixes are generally intended for the latest version of the project on the main branch.

Older versions may not receive security updates. Users should keep their installations updated with the latest available changes.

Reporting a Vulnerability

Please do not disclose suspected security vulnerabilities through public GitHub issues, discussions, or pull requests.

Use one of the following private reporting methods:

GitHub Private Vulnerability Reporting: If enabled for this repository, use the repository's Security tab and select the option to report a vulnerability privately.

Private contact: Contact the maintainer using a dedicated security contact address published in the repository or maintainer profile.

siddhantkumar345@hotmail.com

When reporting a vulnerability, include:

A clear description of the suspected vulnerability.

Steps to reproduce the issue.

The affected files, components, or versions.

The potential security impact.

Screenshots or proof-of-concept details, where safe and appropriate.

Please allow the maintainer reasonable time to investigate and address the issue before publicly disclosing technical details.

The maintainer will review reports and communicate next steps where possible. No specific response or resolution time is guaranteed.

Security Guidelines

Environment variables and credentials

Never commit .env, .env.local, or other files containing real credentials.

Use placeholder values only in .env.example.

Treat all variables prefixed with VITE_ as publicly accessible because they can be included in the frontend build.

Never expose Supabase service-role keys, private API keys, database passwords, or other privileged credentials in frontend code.

Review environment variables, build output, and repository history before publishing changes.

If a credential is accidentally committed, revoke or rotate it immediately. Removing it from the latest commit does not guarantee that it has been removed from Git history or existing clones.

Supabase and backend security

If Supabase is configured:

Enable Row Level Security (RLS) on tables containing user-specific or sensitive data.

Define and test appropriate access policies for each table.

Never rely on frontend validation as the only security control.

Keep privileged operations on a trusted server-side environment.

Validate and authorize requests before accessing or modifying sensitive data.

Do not assume that the presence of a Supabase schema or client configuration means the backend is production-secure.

Dependencies and application security

Use trusted and maintained dependencies.

Review dependency updates and security advisories.

Avoid introducing unnecessary packages or unverified third-party scripts.

Validate and sanitize untrusted input where appropriate.

Avoid logging credentials, private configuration, or sensitive user information.

Review third-party assets, libraries, and integrations before introducing them.

Demo Mode Safety

Atlas Estates intentionally supports a demo mode using sample data.

The demo does not automatically provide production-grade authentication, authorization, data protection, enquiry delivery, or backend security.

Connecting Supabase or deploying the application to Vercel does not, by itself, make the application production-secure.

Before using Atlas Estates with real users or sensitive information, implement and test the required authentication, authorization, database policies, input validation, secret management, and data protection controls.

Use only authorized platform configuration and secret-management tools when setting up live environments.

Scope

This policy applies to security vulnerabilities in the Atlas Estates source code, project configuration, and officially maintained integrations.

Issues involving third-party platforms or services should be reported to their respective providers where appropriate.

Maintainer: Siddhant Jha
Repository: https://github.com/siddhantkrjha/atlas-estates
