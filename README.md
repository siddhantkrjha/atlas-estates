Atlas Estates

A premium luxury real estate web application built for modern property agencies, brokers, and real estate consultants.

Atlas Estates is a responsive, multi-page real estate platform designed to showcase premium property listings, agents, neighborhoods, and property-related services through an elegant digital experience.

Built with React, Vite, and TypeScript, the application combines an editorial visual experience with interactive property discovery and a Supabase integration scaffold for potential future backend functionality.

<p align="center">
  <a href="https://atlas-estates-seven.vercel.app/"><strong>Live Demo</strong></a>
  ·
  <a href="https://github.com/siddhantkrjha/atlas-estates"><strong>GitHub Repository</strong></a>
</p>

Project Overview

Atlas Estates is designed for:

Luxury real estate agencies

Independent property brokers

Real estate consultants

Property developers

Property marketing businesses

Real estate startups

The project currently operates in demo mode using realistic sample data and browser-based functionality.

It does not currently depend on a live Supabase backend, production database, or production authentication credentials.

The Supabase architecture is provided as a starting point for future integration, not as a claim that production backend functionality is already active.

Live Demo

Explore the deployed application:

https://atlas-estates-seven.vercel.app/

The deployed version is intended for demonstration and evaluation. It uses sample property information and should not be treated as a live real estate marketplace or source of verified property information.

Features

Property Discovery

Browse property listings through an interactive interface.

Search and filter available sample properties.

Explore individual property detail pages.

View property galleries, key facts, and features.

Submit enquiries through the demo interface.

Real Estate Experience

Luxury editorial landing page.

Premium visual identity and responsive layouts.

Agent directory and individual agent profiles.

Neighborhood exploration.

Market insight and blog content.

Interactive Tools

Save properties using browser storage.

Compare selected properties.

Explore property valuation request workflows.

Navigate property-related content and services.

Technical Foundation

React-based component architecture.

TypeScript for application development.

Motion-enhanced user interactions.

Supabase integration scaffold.

Vercel deployment configuration.

Demo limitation: Features that appear interactive in the demo do not necessarily represent live transactions, persistent server-side data, authenticated accounts, or operational business workflows.

Screenshots

Screenshots have not yet been added to this repository.

Screenshots can be stored in either:

docs/assets/

or:

public/screenshots/

Once added, update this section with actual screenshots of the deployed application.

Technology Stack

Technology

Purpose

React 19

User interface

Vite

Development server and build tooling

TypeScript

Application development

React Router

Client-side navigation

Framer Motion

Animations and interactions

Leaflet / React Leaflet

Map functionality

Supabase JS

Future backend integration

Lucide React

Icons

Getting Started

Prerequisites

Install the following:

Node.js 18 or later (use a version compatible with the installed project dependencies).

npm or pnpm.

Git (if cloning the repository).

A Supabase project is not required to run the application in demo mode.

1. Clone the Repository

git clone https://github.com/siddhantkrjha/atlas-estates.git
cd atlas-estates

2. Install Dependencies

Using npm:

npm install

Or using pnpm:

pnpm install

3. Start the Development Server

npm run dev

To expose the development server on the network:

npm run dev -- --host 0.0.0.0

Open the local URL provided by Vite. The default is usually:

http://localhost:5173

4. Build for Production

npm run build

To preview the production build locally:

npm run preview

Check package.json for the actual available scripts before running commands if your project configuration differs.

Environment Variables

Atlas Estates includes a Supabase integration scaffold for future backend configuration.

You do not need Supabase credentials to run the application in demo mode if the current implementation supports that fallback.

If you want to configure Supabase locally, create a .env file using the provided example:

cp .env.example .env

Configure the following variables with your own project values:

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

Security notes:

Never commit .env or .env.local files.

Keep .env.example limited to placeholder values.

Never expose a Supabase service-role key in frontend code.

Use appropriate database access policies and server-side controls for privileged operations.

Treat frontend environment variables as publicly accessible to users of the deployed application.

Demo Mode and Sample Data

The application currently uses sample data to demonstrate its real estate interface and workflows.

This includes sample:

Property listings

Agent profiles

Neighborhood information

Market insights

Property-related content

The sample information is illustrative and should not be interpreted as verified real estate inventory, actual market statistics, genuine customer testimonials, or live transaction data.

Some interactions may rely on browser storage or local application state rather than a persistent backend.

Supabase Integration

The project includes a Supabase integration scaffold.

Relevant files include:

src/lib/supabase.ts
supabase/schema.sql

These provide a starting point for future integration with a Supabase project.

Future Configuration

To enable backend functionality:

Create a Supabase project.

Configure the project URL and anon key in your local environment.

Review the SQL schema in supabase/schema.sql.

Apply and test the database schema.

Configure authentication if required.

Review and test Row Level Security (RLS) policies.

Connect application workflows to the appropriate database operations.

Test all functionality before using real business or customer data.

The existence of a schema file does not mean that all application features are already connected to database operations.

Database Schema

The current schema scaffold is intended to support entities such as:

Profiles

Locations

Properties

Property images

Agents

Saved properties

Enquiries

Viewing requests

Valuation requests

Blog posts

Site settings

Property comparisons

Refer to supabase/schema.sql for the actual definitions.

Authentication and Database Security

The current demo version is not connected to production authentication.

If authentication and live database functionality are introduced later:

Use Supabase Auth or an appropriate authentication provider.

Configure and test RLS policies for every relevant table.

Restrict access to sensitive user information.

Validate user input on trusted server-side systems.

Keep privileged credentials outside client-facing code.

Test authorization boundaries before handling real customer data.

Do not assume that a demo interface or database schema alone provides production-grade security.

Deployment

Vercel

Atlas Estates has been deployed to Vercel.

Live application:

https://atlas-estates-seven.vercel.app/

The repository also includes a vercel.json configuration file intended to support deployment behavior such as SPA routing and frontend security headers.

For future deployments:

Import the GitHub repository into Vercel.

Confirm the build command and output directory against the project configuration.

Configure environment variables through Vercel project settings when required.

Deploy the application.

Verify routing, assets, environment configuration, and application functionality after deployment.

A successful frontend deployment does not automatically establish a live backend, production authentication, or operational database.

Project Structure

The following is an overview of the expected project structure. Refer to the actual repository for the complete and current file listing.

atlas-estates/
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

Customization

Developers can adapt the application to suit their own real estate business requirements.

Examples include:

Branding and visual identity

Update the application's branding, colors, typography, and design tokens in the relevant CSS files.

Property inventory

Replace sample property information in src/data.ts with authorized property information.

Navigation and pages

Modify the routes, page layouts, and application content in the relevant source files.

Backend integration

Configure Supabase and implement the required database operations, authentication, and access policies before handling live data.

Business workflows

Extend enquiry handling, viewing requests, property management, and valuation functionality as needed.

Known Limitations

The current version has the following limitations:

Uses sample property and agent data.

Does not provide a connected production database.

Does not include production authentication.

Does not provide a live property listing feed.

Does not implement a verified real-world property valuation engine.

Does not guarantee delivery of enquiries to a real estate business.

Does not provide verified live transactions or payment processing.

The application should be evaluated as a frontend demonstration and development foundation until the relevant production integrations have been implemented and tested.

Roadmap

Potential future improvements include:

Connect Supabase for persistent property and agent data.

Implement production authentication and authorization.

Develop secure administrative workflows.

Integrate real property inventory and listing management.

Implement operational enquiry and viewing request handling.

Expand property management functionality.

Improve analytics, monitoring, and performance.

Add additional testing and accessibility improvements.

The roadmap represents potential development work, not completed functionality.

Contributing

Contributions are welcome, particularly in the areas of:

Frontend improvements

Accessibility

Performance optimization

Documentation

Bug fixes

UI and UX refinements

To contribute:

Fork the repository.

Create a feature branch.

Make your changes.

Test your changes.

Submit a pull request with a clear explanation.

Please review the repository's contribution guidelines and Code of Conduct before participating, once those files are added.

Licensing

License status: Not yet assigned.

A public open-source license has not been added while the original code ownership and third-party asset rights are being reviewed.

Until a license is added, the source code should not be assumed to be available for unrestricted copying, modification, redistribution, or commercial reuse.

Third-party assets, including photographs, fonts, icons, illustrations, and other resources, may have separate licensing terms.

The appropriate license will be added after the ownership and asset review is complete.

Maintainer

Siddhant Jha

GitHub: https://github.com/siddhantkrjha

Contact and Collaboration

For project discussions, bug reports, and feature suggestions, please use the GitHub repository's issue tracker.

For implementation, deployment, design customization, integrations, or other development support, contact the project maintainer through the GitHub profile.

Atlas Estates is an independent real estate web application project maintained by Siddhant Jha.

Built as a demonstration and development foundation for modern luxury real estate experiences.

