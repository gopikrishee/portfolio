---
name: api
description: Describes the API abstraction layer including client configuration, endpoints, services, interceptors, utilities, and best practices for centralized API management. Use this skill when building new endpoints or calling existing API services.
---

### Key Characteristics
- **Centralized Management**: All API calls in one location
- **Consistent Handling**: Standardized request/response handling
- **Error Management**: Centralized error handling and logging
- **Authentication**: Manages API authentication and tokens
- **Retry Logic**: Built-in retry mechanisms for failed requests
- **Caching**: Optional response caching for performance
- **Type Safety**: TypeScript definitions for API contracts


### Typical Structure
```
api/
├── client.js
├── auth.js
├── endpoints/
│   ├── users.js
│   ├── products.js
│   ├── orders.js
│   └── ...
├── services/
│   ├── UserService.js
│   ├── ProductService.js
│   ├── OrderService.js
│   └── ...
├── interceptors/
│   ├── authInterceptor.js
│   ├── errorInterceptor.js
│   └── ...
├── utils/
│   ├── apiUtils.js
│   ├── errorHandler.js
│   └── requestValidator.js
└── index.js
```


### Module Categories
1. **Client Configuration**: Base API client setup and configuration (axios, fetch wrapper)
2. **Endpoints**: API endpoint definitions and URLs
3. **Services**: Business logic for API operations (UserService, ProductService, etc.)
4. **Interceptors**: Request/response interceptors for auth, logging, error handling
5. **Utilities**: Helper functions for API operations
6. **Constants**: API configuration constants and status codes


### Common Responsibilities
- **Making HTTP Requests**: GET, POST, PUT, DELETE, PATCH operations
- **Authentication**: Managing tokens, refreshing tokens, handling auth errors
- **Error Handling**: Consistent error format and error handling strategy
- **Request Transformation**: Converting data to API-expected format
- **Response Transformation**: Converting API responses to application format
- **Loading States**: Providing loading status for components
- **Caching**: Optional caching strategies for performance optimization


### Best Practices
- Keep API calls in service functions, not in components
- All API calls must include try/catch blocks to handle errors
- Use consistent naming conventions for endpoints
- Implement proper error handling and logging
- Use environment variables for API base URLs
- Implement request/response interceptors
- Add request timeouts and retry logic
- Document API endpoints and required parameters
- Use TypeScript for type safety
- Implement proper authentication and authorization
- Handle rate limiting and backoff strategies
- Test API services thoroughly
---