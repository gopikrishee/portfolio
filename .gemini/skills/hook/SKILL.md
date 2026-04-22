---
name: hook
description: Covers all custom React hooks that encapsulate stateful logic and side effects. These hooks are designed to be reusable across components and follow React Hooks conventions. Use this skill when building new hook or calling existing hook.
---

### Key Characteristics
- **Reusable Logic**: Extract and share stateful logic between components
- **Composable**: Hooks can be combined to create more complex logic
- **Clean Code**: Reduces code duplication and improves readability
- **Testing**: Hooks are easier to test in isolation
- **Performance**: Optimized hooks can prevent unnecessary re-renders
---
### Hook Categories
1. **State Management Hooks**: Custom hooks for managing component state
2. **Data Fetching Hooks**: Hooks for API calls and data management (useFetch, useAPI)
3. **Form Hooks**: Hooks for form handling and validation (useForm, useInput)
4. **Window/DOM Hooks**: Hooks for interacting with browser APIs (useWindowSize, useMediaQuery)
5. **Authentication Hooks**: Hooks for managing user authentication and authorization
6. **Storage Hooks**: Hooks for managing localStorage and sessionStorage
7. **Navigation Hooks**: Hooks for routing and navigation logic

### Naming Convention
- All custom hooks must start with the prefix `use` (e.g., `useAuth`, `useFetch`)
- Descriptive names that clearly indicate what the hook does

### Best Practices
- Keep hooks focused on a single responsibility
- Use built-in React hooks (useState, useEffect, useContext, etc.)
- Properly manage dependencies in the dependency array
- Return both state and functions for complete control
- Include proper error handling and cleanup
- Document hook parameters and return values
- Write unit tests for hooks
---