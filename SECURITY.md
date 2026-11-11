# Security

Atlas Estates is a front-end demo and integration-ready project. This repository should not contain real credentials, service-role keys, or production secrets.

## Reporting a vulnerability

Please report suspected vulnerabilities privately by raising a GitHub issue in the repository or contacting the maintainer through the repository owner profile.

Do not disclose sensitive details in public discussion until a fix is ready.

## Security guidance

- Never commit `.env`, `.env.local`, or any file containing credentials.
- Keep Supabase service-role keys out of client code and out of the repository history.
- Use only starter or placeholder values in `.env.example`.
- Review all environment variables and secrets before deployment.
- Do not expose private configuration in frontend bundles or public logs.

## Demo mode safety

This project intentionally runs with sample data until Supabase and Vercel are configured and explicitly authorized.

Any live environment setup should use the official platform secret management tools and should be validated before publication.
