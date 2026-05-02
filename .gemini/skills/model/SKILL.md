---
name: model
description: This skill enables automatic generation of strongly-typed class models from raw JSON output. It converts unstructured JSON data into organized, reusable class definitions that maintain type safety, support nested objects, handle naming conventions (snake_case to camelCase), and include helper methods for common operations.
---

## When to Use This Skill

**Trigger this skill when:**
- User provides raw JSON data and requests conversion to class models
- JSON needs to be structured into a `/model` folder with class definitions
- Data requires mapping between different naming conventions (snake_case ↔ camelCase)
- Complex nested objects or arrays need proper class hierarchy
- Helper methods are needed to access or manipulate the data
- Building a frontend application that consumes API responses
- Creating TypeScript/JavaScript model layer for clean architecture

**Key Indicators:**
- Phrases like "create a class for this JSON", "convert JSON to model", "generate model from JSON"
- Presence of raw JSON data with fields that need to be mapped to properties
- Requests mentioning `/model` folder or model structure
- Need for data transformation or normalization

## Output Structure

### Directory Layout
```
src/
├── model/
│   ├── UserProfile.js
│   ├── WorkExperience.js
│   ├── index.js          (barrel export)
│   └── types.md          (optional: type definitions)
```

### File Organization
- One class per file for maintainability
- Related classes grouped in the same folder
- Barrel export file (`index.js`) for easy importing
- Optional `types.md` for JSDoc/TypeScript type hints

## Class Generation Best Practices

### 1. **Basic Class Structure**
```javascript
/**
 * Model representing [Purpose]
 * @class
 */
class ClassName {
  /**
   * Constructor for ClassName
   * @param {Object} data - Raw data object from API
   */
  constructor(data = {}) {
    // Direct property mapping
    this.propertyName = data.propertyName;
    
    // Default values for optional fields
    this.optionalField = data.optionalField || null;
    
    // Array mapping with defaults
    this.arrayField = data.arrayField || [];
  }
}

export default ClassName;
```

### 2. **Naming Convention Handling**
Always map snake_case (API) to camelCase (JavaScript):

```javascript
class WorkExperience {
  constructor(data) {
    this.company = data.company;
    this.role = data.role;
    this.activeYears = data.active_years;  // ← snake_case to camelCase
    this.current = data.current;
  }
}
```

### 3. **Nested Object Mapping**
For complex nested structures, create separate classes and instantiate them:

```javascript
class UserProfile {
  constructor(data) {
    this.userId = data.userId;
    this.userName = data.userName;
    this.email = data.email;
    
    // Nested array of objects: map to class instances
    this.experience = (data.experience || []).map(
      exp => new WorkExperience(exp)
    );
    
    // Simple array: map directly
    this.skills = data.skills || [];
  }
}
```

### 4. **Helper Methods**
Include business logic methods for common operations:

```javascript
class UserProfile {
  constructor(data) {
    // ... constructor code
  }

  /**
   * Get the user's current job title
   * @returns {string} Current company name or "Not currently employed"
   */
  getCurrentJob() {
    const currentJob = this.experience.find(exp => exp.current);
    return currentJob ? currentJob.company : "Not currently employed";
  }

  /**
   * Get all skills as a formatted string
   * @returns {string} Comma-separated skill list
   */
  getSkillsAsString() {
    return this.skills.join(", ");
  }

  /**
   * Check if user has specific skill
   * @param {string} skill - Skill name to check
   * @returns {boolean} True if skill exists
   */
  hasSkill(skill) {
    return this.skills.some(s => s.toLowerCase() === skill.toLowerCase());
  }

  /**
   * Get work experience duration in years
   * @returns {number} Total years of experience
   */
  getTotalExperience() {
    return this.experience.length;
  }
}
```

### 5. **Static Factory Methods**
Provide convenient factory methods for creating instances:

```javascript
class UserProfile {
  constructor(data) {
    // ... constructor code
  }

  /**
   * Create a UserProfile from raw API response
   * @static
   * @param {Object} data - Raw JSON data
   * @returns {UserProfile} Instance of UserProfile
   */
  static fromJSON(data) {
    return new UserProfile(data);
  }

  /**
   * Create multiple UserProfiles from array
   * @static
   * @param {Array} dataArray - Array of raw JSON objects
   * @returns {Array<UserProfile>} Array of UserProfile instances
   */
  static fromJSONArray(dataArray) {
    return (dataArray || []).map(item => new UserProfile(item));
  }
}
```

### 6. **Validation Methods**
Add validation for data integrity:

```javascript
class UserProfile {
  constructor(data) {
    // ... constructor code
  }

  /**
   * Validate user profile data
   * @returns {Object} Validation result {isValid: boolean, errors: string[]}
   */
  validate() {
    const errors = [];

    if (!this.userId) errors.push("userId is required");
    if (!this.userName) errors.push("userName is required");
    if (!this.email) errors.push("email is required");
    if (this.skills.length === 0) errors.push("At least one skill is required");

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if profile is complete
   * @returns {boolean} True if all required fields are present
   */
  isComplete() {
    return this.validate().isValid;
  }
}
```

### 7. **Serialization Methods**
Support converting back to JSON:

```javascript
class UserProfile {
  constructor(data) {
    // ... constructor code
  }

  /**
   * Convert instance back to JSON object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      userId: this.userId,
      userName: this.userName,
      email: this.email,
      avatarUrl: this.avatarUrl,
      bio: this.bio,
      title: this.title,
      location: this.location,
      skills: this.skills,
      experience: this.experience.map(exp => ({
        company: exp.company,
        role: exp.role,
        active_years: exp.activeYears,  // ← camelCase back to snake_case
        current: exp.current
      }))
    };
  }

  /**
   * Get JSON string representation
   * @returns {string} JSON string
   */
  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}
```

## Complete Example

### File: `model/types.md` (Optional TypeScript Type Hints)
```markdown
# Type Definitions

## WorkExperience
- `company: string` - Company name
- `role: string` - Job role/title
- `activeYears: string` - Duration period
- `current: boolean` - Is current position

## UserProfile
- `userId: string` - Unique identifier
- `userName: string` - Display name
- `email: string` - Email address
- `avatarUrl: string` - Profile picture URL
- `bio: string` - User biography
- `title: string` - Job title
- `location: string` - Location
- `skills: string[]` - Array of skills
- `experience: WorkExperience[]` - Work history
```

## Usage Examples

### Basic Usage
```javascript
import { UserProfile } from "./model/index.js";

// Create from raw JSON
const rawData = { /* ... */ };
const user = new UserProfile(rawData);

// Access properties
console.log(user.userName);
console.log(user.getCurrentJob());
```

### Array Processing
```javascript
const users = UserProfile.fromJSONArray(jsonArray);
users.forEach(user => {
  console.log(`${user.userName} - ${user.getCurrentJob()}`);
});
```

### Validation
```javascript
const validation = user.validate();
if (!validation.isValid) {
  console.error("Validation errors:", validation.errors);
}
```

### Serialization
```javascript
// Convert back to JSON
const jsonOutput = user.toJSON();
const jsonString = user.toString();
```

## Advanced Patterns

### 1. **Getters for Computed Properties**
```javascript
class UserProfile {
  get experienceYears() {
    return this.experience.length;
  }

  get isActive() {
    return this.experience.some(exp => exp.current);
  }
}
```

### 2. **Default Values & Initialization**
```javascript
class UserProfile {
  constructor(data = {}) {
    // Use nullish coalescing for defaults
    this.skills = data.skills ?? [];
    
    // Use optional chaining for nested access
    this.experience = data.experience?.length > 0 
      ? data.experience.map(exp => new WorkExperience(exp))
      : [];
  }
}
```

### 3. **Immutable Pattern**
```javascript
class UserProfile {
  constructor(data) {
    Object.assign(this, {
      userId: data.userId,
      userName: data.userName,
      // ... other properties
    });
    Object.freeze(this); // Make immutable
  }
}
```

## Common Pitfalls to Avoid

❌ **Don't:** Map arrays without validation
```javascript
// Bad - will crash if data.skills is null/undefined
this.skills = data.skills.map(s => s.toUpperCase());
```

✅ **Do:** Use optional chaining and nullish coalescing
```javascript
// Good
this.skills = (data.skills || []).map(s => s.toUpperCase());
```

❌ **Don't:** Forget to update naming conventions
```javascript
// Bad - inconsistent naming
this.activeYears = data.active_years;  // camelCase
this.current_status = data.current;     // snake_case
```

✅ **Do:** Consistently use camelCase
```javascript
// Good
this.activeYears = data.active_years;
this.currentStatus = data.current;
```

❌ **Don't:** Skip JSDoc comments
```javascript
class UserProfile { constructor(data) { /* ... */ } }
```

✅ **Do:** Document all properties and methods
```javascript
/**
 * Model representing the User Profile
 * @class UserProfile
 * @param {Object} data - Raw user data
 */
class UserProfile {
  /**
   * Constructor description
   * @param {Object} data - Configuration object with typed properties
   */
  constructor(data) { /* ... */ }
}
```

## Integration Tips

- **Nest the `/model` folder in your project structure** (e.g., `src/model/` or `app/model/`)
- **Use barrel exports** (`index.js`) for cleaner imports
- **Add helper methods** that match your business logic
- **Include validation methods** early in development
- **Document all public methods** with JSDoc
- **Test model instantiation** with various JSON formats
- **Keep classes single-responsibility** (one concept per class)

## Tools & Extensions

- **JSDoc Linting:** Use `eslint-plugin-jsdoc` for documentation validation

---