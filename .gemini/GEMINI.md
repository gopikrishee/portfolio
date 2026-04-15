# GEMINI.md

This project is a personal portfolio website for Gopi Krish, a Senior .NET Developer. It is a frontend application built using **React** and **Vite**, styled with **TailwindCSS**.

## Project Overview
- **Purpose:** Personal portfolio showcasing professional experience, skills, and blog posts.
- **Tech Stack:** React 19, Vite, TailwindCSS.
- **Architecture:** Component-based UI with data often fetched from External API (see `src/api/githubApi.js` and `src/hooks/useGitHub.js`).

## Commands
- **Development:** `npm run dev` - Starts the Vite development server.
- **Build:** `npm run build` - Builds the project for production in the `dist` folder.
- **Lint:** `npm run lint` - Runs ESLint to check for code quality.
- **Preview:** `npm run preview` - Previews the production build.
- **Deployment:** `npm run deploy` - Deploys the project (configured via `gh-pages`).

## Development Conventions
- **Styling:** TailwindCSS is used for styling.
- **State Management:** Functional components with React hooks. Custom hooks are located in `src/hooks/`.
- **Components:** Modular structure located in `src/components/`.
- **API Integration:** External API integration handled in `src/api/`.

## Important Files
- `src/App.jsx`: Main application entry point and layout.
- `src/components/`: Reusable UI components for profile, projects, experience, etc.
- `src/api/`: All external HTTP requests (Axios/Fetch) must live here. Exported functions that return Promises. No React hooks or state logic allowed here.
- `src/hooks/`: Act as the bridge between the UI and the API layer. Components should NEVER call the API folder directly; they must always go through a custom hook.
- `vite.config.js`: Vite configuration, including the TailwindCSS plugin.
- `eslint.config.js`: ESLint configuration.

## Naming Convension
- PascalCase for components, camelCase for functions and variables.
- Hooks must start with use (e.g., useAuth.js). API files should end in Api.js (e.g., blogApi.js).

## Coding Standards
- Error Handling: All API calls must include try/catch blocks
