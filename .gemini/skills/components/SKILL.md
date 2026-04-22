---
name: components
description: Covers reusable UI components, modular design principles, component types (presentational, container, layout, form, UI), and best practices for component organization. Use this skill when building new component or calling existing component.
---

### Key Characteristics
- **Modular Design**: Each component has a single responsibility
- **Prop-Based Configuration**: Components accept props for customization
- **Styled Components**: Uses CSS modules or styled-components for styling
- **Accessibility**: Built with accessibility standards in mind
- **Reusability**: Designed to be used across multiple parts of the application

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

### Best Practices
- Keep components small and focused
- Use meaningful component names
- Document props using PropTypes or TypeScript
- Avoid nested component definitions
- Keep styling isolated to individual components

---