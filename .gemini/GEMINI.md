# GEMINI.md

This project is a personal portfolio website for a Senior .NET Developer. It is a frontend application built using **React** and **Vite**, styled with **TailwindCSS**.

---

## Project Overview
- **Purpose:** Personal portfolio showcasing professional experience, skills, and blog posts.
- **Type**: React Single Page Application
- **Tech Stack:** React 19, Vite, TailwindCSS.
- **Architecture:** Component-based UI with data often fetched from External API (see `src/api/githubApi.js` and `src/hooks/useGitHub.js`).
- **Language**: JavaScript (ES2020+)
- **Package Manager**: npm (use `npm`)
- **Styling**: [Tailwind CSS / CSS Modules / styled-components]
- **State Management**: [Redux Toolkit / Context API]
- **Routing**: React Router v6

---

## Directory Structure

```
src/
├── assets/                          # Static files: images, fonts, icons
├── components/                      # Shared/reusable UI components (dumb components)
├── hooks/                           # Global custom hooks (not tied to a single feature)
├── layouts/                         # Page layout wrappers
├── pages/                           # Route-level page components
│   └── subfolder /                  # Sub-folders for pages (examples: home, blog, projects)
│       ├── page-specific components # Page-specific components (examples: ProfileCard.jsx, BlogCard.jsx)
├── api/                             # API calls and external integrations
├── store/                           # Global state (Redux store)
├── utils/                           # Pure utility/helper functions
└── App.jsx
```

- `components/` is for truly reusable UI primitives only (Button, Modal, Input, etc.).
- Pages should be thin — delegate logic to hooks and services.

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files & folders | `kebab-case` | `user-profile.jsx`, `use-auth.js` |
| React components | `PascalCase` | `UserProfile`, `AuthGuard` |
| Hooks | `camelCase` prefixed with `use` | `useAuth`, `useFetchUser` |
| Variables & functions | `camelCase` | `getUserById`, `isLoading` |
| Constants | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_RETRIES` |
| CSS classes (if Tailwind) | Tailwind utilities only — no custom class names unless necessary |
| Event handlers | `handle` prefix | `handleSubmit`, `handleClose` |

- Use `.jsx` extension for files containing JSX; `.js` for plain logic (hooks, utils, services).
- Name files after the primary export: `UserCard.jsx` exports `UserCard`.

---

## Component Rules

- **One component per file.** No multi-component files.
- Use **functional components** only — no class components.
- Keep components **small and single-purpose**. If a component exceeds ~150 lines, split it.
- Separate **UI (presentational)** from **logic (container/hooks)**:
  - Presentational: receives props, renders JSX, no side effects.
  - Logic: lives in a custom hook; handles state, effects, and API calls.
- Define **prop types** with PropTypes directly below the component definition:

```jsx
import PropTypes from 'prop-types';

export function UserCard({ userId, onClose }) { ... }

UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
```

- Define **defaultProps** for any optional prop that has a sensible default.
- Use **named exports** for components, not default exports (except for pages/routes if required by router).
- Destructure props in the function signature — do not access via `props.x` inside the body.

---

## Hooks

- One hook per file. File name must match hook name: `useAuth.js` exports `useAuth`.
- Hooks must start with `use`.
- Hooks own their side effects (`useEffect`) and expose only what callers need.
- Do not call hooks conditionally.
- Extract repeated `useEffect` + `useState` patterns into a custom hook immediately.

---

## JavaScript Standards

- Use **ES2020+ syntax**: optional chaining (`?.`), nullish coalescing (`??`), `async/await`, destructuring, spread.
- Use `const` by default; `let` only when reassignment is necessary. Never use `var`.
- Use **JSDoc comments** for functions that are non-obvious or shared across features:

```js
/**
 * Fetches a user by ID.
 * @param {string} id - The user's unique identifier.
 * @returns {Promise<Object>} The user object.
 */
export async function fetchUser(id) { ... }
```

- **No `eval()`**, no implicit globals, no `==` (use `===` always).
- Validate prop shapes at runtime with **PropTypes** (`prop-types` package) — required on all shared components.
- Use ESLint with the project's configured ruleset — do not disable rules without a comment explaining why.

---

## State Management

- **Local state** (`useState`): use for UI-only state (open/close, form fields).
- **Derived state**: compute from existing state — do not store what can be derived.
- **Server state**: use a data-fetching library (React Query / SWR) — do not manually manage loading/error/data with `useState`.
- **Global state**: use the configured store (Redux) only for truly shared state. Avoid global state for things that are local to a feature.
- Do not store server data in global state if a cache layer (React Query) already manages it.

---

## Services & API Layer

- All API calls live in `src/api/`
- **No `fetch` or `axios` calls inside components or hooks directly** — always delegate to a service function.
- Service functions are plain async functions, not hooks.
- Handle errors explicitly — do not swallow them silently.

```js
// src/api/userApi.js
export async function fetchUser(id) {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
}
```

---

## Styling

- Use the project's chosen styling approach consistently — do not mix strategies.
- Avoid inline styles except for truly dynamic values (e.g., calculated widths).
- Keep style logic out of business logic.
- Responsive design: mobile-first approach.

---

## Code Quality

- **SOLID principles apply**:
  - Single Responsibility: each function/component does one thing.
  - Open/Closed: extend behavior via composition, not modification.
- **DRY**: extract repeated logic (≥ 2 uses) into a shared utility or hook.
- **Pure functions**: utility functions in `src/utils/` must be pure — no side effects, no external state.
- **Early returns**: prefer guard clauses over deeply nested `if/else`.
- **Avoid magic numbers/strings**: extract them as named constants.
- **Error Handling**: All API calls must include try/catch blocks

---

## Testing

- Test files live alongside source: `UserCard.test.jsx` next to `UserCard.jsx`.
- Test hook: `src/hooks/useAuth.test.js`.
- Run tests: `npm test`
- Run lint: `npm run lint`

**Before considering a task complete**, verify:
1. `npm run lint` passes with no errors.
2. Relevant tests pass.

---

## What NOT to Do

- Do not add `console.log` to committed code — use a proper logger or remove before committing.
- Do not use `// eslint-disable` without a comment explaining why.
- Do not import from a sibling feature's internals — go through its `index.js` public API.
- Do not put business logic in JSX — extract to a function or hook.
- Do not create a new global state slice without confirming it truly needs to be global.
- Do not use `useEffect` to sync state that can be derived or handled by an event handler.
- Do not use `var` — always `const` or `let`.
- Do not use `==` — always `===` for equality checks.
- Do not skip PropTypes on shared/reusable components.

---

## Commands
- **Development:** `npm run dev` - Starts the Vite development server.
- **Build:** `npm run build` - Builds the project for production in the `dist` folder.
- **Lint:** `npm run lint` - Runs ESLint to check for code quality.
- **Preview:** `npm run preview` - Previews the production build.
- **Deployment:** `npm run deploy` - Deploys the project (configured via `gh-pages`).

---
