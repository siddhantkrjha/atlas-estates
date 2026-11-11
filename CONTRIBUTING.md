Contributing to Atlas Estates

Thank you for your interest in contributing to Atlas Estates. Contributions of all kinds are welcome, including bug reports, documentation improvements, UI enhancements, accessibility improvements, and new features.

Please read these guidelines before submitting a contribution.

Development setup

Fork the repository on GitHub.

Clone your fork:

git clone https://github.com/YOUR-USERNAME/atlas-estates.git
cd atlas-estates

Install dependencies:

npm install

Create your local environment file if required:

cp .env.example .env

Add your own Supabase configuration if you are testing backend integration. Never commit .env or other files containing private credentials.

Start the development server:

npm run dev

To expose the development server on your network, use:

npm run dev -- --host 0.0.0.0

Development workflow

Create a separate branch for your changes:

git checkout -b feature/your-feature-name

Make your changes, keeping them focused and consistent with the existing project structure.

Test your changes locally.

Run the available project checks before submitting:

npm run build

If a lint script is configured in package.json, also run:

npm run lint

Commit your changes with a clear commit message.

Push your branch to your fork and open a pull request against the original repository's main branch.

Coding standards

Prefer clean, readable, maintainable TypeScript and React code.

Follow the existing naming conventions and project structure.

Keep UI changes consistent with Atlas Estates' luxury real estate design direction.

Build responsive interfaces that work across desktop, tablet, and mobile.

Consider accessibility, usability, and performance when introducing UI changes.

Avoid unnecessary dependencies.

Do not introduce hard-coded credentials, private configuration values, or sensitive data.

Keep the application functional in demo mode unless your contribution specifically addresses live backend integration.

Pull request guidelines

Before submitting a pull request:

Explain the purpose and motivation behind your changes.

Describe the main changes and any relevant implementation details.

Include screenshots or a short recording for visual changes, where appropriate.

Mention the checks and tests you performed.

Update relevant documentation when setup instructions, configuration, or functionality changes.

Keep pull requests focused and easy to review.

Disclose any new dependencies or third-party assets you introduce.

Reporting bugs and requesting features

For bugs, feature ideas, or questions, open an issue in the GitHub repository.

When reporting a bug, include:

A clear description of the problem.

Steps to reproduce the issue.

Expected and actual behaviour.

Relevant browser, device, or environment information.

Screenshots or error messages, if applicable.

For substantial changes, open an issue first to discuss the proposed approach before investing significant development effort.

Do not include passwords, API keys, personal information, or other sensitive data in public issues.

Questions and community standards

Please follow the project's Code of Conduct when participating in discussions and contributing.

For security vulnerabilities, do not disclose sensitive details in a public issue. Follow the reporting instructions in SECURITY.md, if available.

Thank you for helping improve Atlas Estates!

Maintainer: Siddhant Jha
Repository: https://github.com/siddhantkrjha/atlas-estates
