# Contributing

Thanks for contributing to Atlas Estates.

## Development workflow

1. Fork or clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app locally:
   ```bash
   npm run dev -- --host 0.0.0.0
   ```
4. Run the type and build checks before submitting a change:
   ```bash
   npm run build
   npm run lint
   ```

## Pull requests

- Keep changes focused and easy to review.
- Avoid committing credentials or local environment files.
- Explain the reason for the change and any relevant context.
- Ensure the app still works in demo mode unless the change explicitly covers live backend integration.

## Coding standards

- Prefer clean, readable TypeScript and React code.
- Keep UI changes consistent with the luxury brand direction of the project.
- Do not commit secrets or private configuration values.

## Questions

Open an issue for feature ideas, bugs, or questions before starting larger changes.
