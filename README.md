# Atlas Estates

Atlas Estates is a premium luxury real estate web application built with React, Vite, and TypeScript. It is designed for real-estate agencies, brokers, and consultants who want a polished digital front-end for showcasing premium listings, neighborhoods, agents, and valuation workflows.

Repository: https://github.com/siddhantkrjha/atlas-estates

## Project status

This project is currently in demo mode. It uses realistic sample data and a Supabase-ready architecture, but it does not connect to a live backend or production credentials until those are added and authorized separately.

## Features

- Luxury editorial landing page and premium brand experience
- Search, filter, and browse property listings
- Property detail views with gallery, key facts, and enquiry workflow
- Saved listings and comparison tools in browser storage
- Agent directory and neighborhood exploration pages
- Valuation request flow and market insight content
- Fully responsive layout with motion-enhanced interactions
- Supabase integration scaffold for future production configuration

## Screenshots

Screenshots have not been added to this repository yet. When available, they should be placed in a `docs/assets/` or `public/screenshots/` folder and linked from this section.

## Tech stack

- React 19
- Vite
- TypeScript
- React Router
- Framer Motion
- Leaflet / React Leaflet
- Supabase JS client
- Lucide React

## Prerequisites

- Node.js 18+ recommended
- npm or pnpm
- A Supabase project only when you are ready to enable live backend functionality

## Local installation

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open the local preview URL shown by Vite, typically:

```text
http://localhost:5173
```

## Environment variables

Copy the sample file and add values only when you are ready to integrate with Supabase.

```bash
cp .env.example .env
```

The project expects:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Do not commit `.env` files or any real credentials. The repository should retain only placeholder values in `.env.example`.

## Demo mode and sample data

The application intentionally uses sample listings, agents, and neighborhoods. This keeps the app usable without external services while preserving a production-ready integration path.

The demo version is not intended to represent live market data, real transactions, or authenticated production accounts.

## Supabase setup

The app contains a safe Supabase client wrapper in `src/lib/supabase.ts` and a schema scaffold in `supabase/schema.sql`.

To enable Supabase later:

1. Create a Supabase project in the official Supabase dashboard.
2. Copy the project URL and anon key into your local `.env` file.
3. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.
4. Review row-level security policies and ensure they match your intended access model.
5. Confirm that no service-role key is exposed in frontend code.

## Database schema and migration notes

The SQL file includes core tables for:

- profiles
- locations
- properties
- property images
- agents
- saved properties
- enquiries
- viewing requests
- valuation requests
- blog posts
- site settings
- property comparisons

These tables provide a clear foundation for future live data integration without forcing the current demo experience to depend on a backend.

## Authentication and RLS

The current demo build is intentionally not connected to live authentication. When production auth is enabled, use Supabase Auth and review RLS rules carefully before exposing any data.

Never place a service-role key or privileged secret in client-facing code. Keep those credentials in a secure backend environment or managed secret store.

## Deployment to Vercel

A basic `vercel.json` file is included to support SPA routing and frontend security headers. The repository is ready for a Vercel deployment flow when the project owner has authorized the environment variables and production configuration.

Use the official Vercel dashboard workflow and add environment variables through the platform rather than embedding credentials into the app code.

## Project structure

```text
.
├── public/
├── src/
│   ├── lib/
│   ├── App.tsx
│   ├── App.css
│   ├── data.ts
│   ├── index.css
│   └── main.tsx
├── supabase/
│   └── schema.sql
├── .env.example
├── .gitignore
├── README.md
├── vercel.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Customization guide

- Update branding, colors, and luxury design tokens in the CSS files under `src/`.
- Replace sample listing data in `src/data.ts` with real property inventory when authorized.
- Adjust the routes and landing page copy in `src/App.tsx`.
- Configure Supabase and row-level policies when a production backend is enabled.

## Security considerations

- Keep all real credentials out of source control.
- Never commit `.env`, `.env.local`, or secrets.
- Use placeholder values in `.env.example` only.
- Keep service-role credentials in a secure environment and avoid exposing them in frontend code.
- Review all third-party assets and branded files before public release.

## Known limitations

- The app currently runs on demo data.
- No production authentication, payments, or live listing feeds are connected.
- No real valuation engine or live enquiry delivery is configured yet.
- Additional deployment and integration work should happen only after explicit authorization.

## Roadmap

- Connect to Supabase for real property data and auth
- Add production-ready admin workflows
- Review deployment configuration for Vercel and hosting
- Expand property management, enquiry handling, and blog publishing
- Add stronger analytics and monitoring

## Contributing

Contributions are welcome for documentation, accessibility, performance improvements, and frontend refinements. Please open an issue or submit a pull request with a clear explanation of the intended change.

The project should remain safe and demo-mode aware until a live backend is configured.

## Licensing status

A public license has not been added to this repository yet while ownership and third-party asset rights are under review. This repository is being prepared for public hosting while preserving the opportunity to confirm the appropriate licensing and asset review before final publication.

## Maintainer

Siddhant Jha

GitHub: https://github.com/siddhantkrjha

## Contact

For implementation, deployment, design customization, or integration support, contact the project maintainer through the GitHub profile linked above or use the repository issue tracker for project discussion.

## Repository note

This project is intentionally structured for a public GitHub release while remaining safe for demo-mode development until Supabase, Vercel, and production credentials are explicitly authorized.

