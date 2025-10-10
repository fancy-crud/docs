# Form Rules & Validation

Form validation in FancyCRUD is flexible and powerful, allowing you to validate fields using custom functions, third-party validation libraries (Zod, Valibot, Yup), or built-in validation logic. Rules ensure data integrity before submission and provide immediate feedback to users.

## Overview

FancyCRUD supports multiple validation approaches:

- **Custom Functions**: Write your own validation logic
- **Third-Party Libraries**: Use Zod, Valibot, Yup, or other validation libraries
- **Async Validation**: Validate against APIs (check username availability, etc.)
- **Multiple Validation Checks**: Combine multiple checks within a single validation function
- **Real-Time Validation**: Automatic validation with 400ms debounce as users type

All validation errors are automatically displayed beneath the corresponding field, with support for custom error messages.

## Custom Validation Functions

The simplest way to validate fields is using custom functions. A validation function receives the field value and should return `true` for valid values or an error message string for invalid values.

### Basic Validation

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      }
    },
    age: {
      type: FieldType.text,
      label: 'Age',
      rules: (value) => {
        if (!value) return 'Age is required'
        const age = parseInt(value)
        if (isNaN(age)) return 'Age must be a number'
        if (age < 18) return 'You must be at least 18 years old'
        if (age > 120) return 'Please enter a valid age'
        return true
      }
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Multiple Validation Checks

You can combine multiple validation checks within a single validation function:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    password: {
      type: FieldType.password,
      label: 'Password',
      rules: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter'
        if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter'
        if (!/[0-9]/.test(value)) return 'Password must contain a number'
        if (!/[^A-Za-z0-9]/.test(value)) return 'Password must contain a special character'
        return true
      }
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

::: tip
Validation checks are performed sequentially, stopping at the first check that fails and displaying that error message.
:::

### Cross-Field Validation

Validate fields based on other field values:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    password: {
      type: FieldType.password,
      label: 'Password',
      rules: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        return true
      }
    },
    confirmPassword: {
      type: FieldType.password,
      label: 'Confirm Password',
      rules: (value) => {
        if (!value) return 'Please confirm your password'
        if (value !== form.fields.password.modelValue) {
          return 'Passwords do not match'
        }
        return true
      }
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Conditional Validation

Apply validation rules conditionally based on form state:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const requiresShipping = ref(false)

const form = useForm({
  fields: {
    product: {
      type: FieldType.text,
      label: 'Product',
      rules: (value) => !!value || 'Product is required'
    },
    shippingAddress: {
      type: FieldType.textarea,
      label: 'Shipping Address',
      rules: (value) => {
        // Only validate if shipping is required
        if (requiresShipping.value) {
          if (!value) return 'Shipping address is required'
          if (value.length < 10) return 'Please enter a complete address'
        }
        return true
      }
    }
  },
  settings: {
    url: 'orders/'
  }
})
</script>
```

## Async Validation

Validate fields against external APIs, such as checking username availability or validating coupon codes.

### Basic Async Validation

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import axios from 'axios'

const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      rules: async (value) => {
        if (!value) return 'Username is required'
        if (value.length < 3) return 'Username must be at least 3 characters'
        
        try {
          // Check if username is available
          const response = await axios.get(`/api/check-username/${value}`)
          if (!response.data.available) {
            return 'Username is already taken'
          }
          return true
        } catch (error) {
          return 'Unable to verify username availability'
        }
      }
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Debounced Async Validation

Use debouncing to avoid excessive API calls:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useDebounceFn } from '@vueuse/core'
import axios from 'axios'

const checkEmailAvailability = useDebounceFn(async (email: string) => {
  const response = await axios.get(`/api/check-email/${email}`)
  return response.data.available
}, 500) // 500ms debounce

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: async (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        
        const isAvailable = await checkEmailAvailability(value)
        if (!isAvailable) return 'Email is already registered'
        
        return true
      }
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

::: tip
Async validation runs automatically with a 400ms debounce. For expensive API calls, consider adding additional debouncing within your validation function for even better performance.
:::

## Validation with Third-Party Libraries

FancyCRUD integrates seamlessly with popular validation libraries like Zod, Valibot, and Yup. You can use these libraries with a rule parser.

### Installation

To install the current plugin parser you can run:

::: code-group
```bash [NPM]
npm i @fancy-crud/plugin-rule-parsers
```
```bash [PNPM]
pnpm add @fancy-crud/plugin-rule-parsers
```
```bash [Yarn]
yarn add @fancy-crud/plugin-rule-parsers
```
:::

::: warning
The package `@fancy-crud/plugin-rule-parsers` will be deprecated in future releases in favor of code snippets parsers for rules. We recommend using the code snippet approach shown below.
:::

### Setup Parser

You need to configure the parser in your FancyCRUD configuration:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'

// For this example we're going to use Zod,
// but there's a Valibot parser available
import { zodSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'

export const fancyCrud = defineConfig({
  // Other configurations...

  rules: {
    parser  // The parser function
  },
})
```
:::

### Using Zod (Recommended)

When using validation libraries like Zod, Valibot, or Yup, your `rules` function must return an object with `{ value, rule }` format. The parser then processes this object to validate the value against the rule.

You can use the code snippet instead of installing the parser package:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'
import type { ZodAny } from 'zod/lib/types'

export const fancyCrud = defineConfig({
  // Other configurations...

  rules: {
    parser(raw: { value: unknown; rule: ZodAny }) {
      const { value, rule } = raw
      const result = rule.safeParse(value)

      if (result.success)
        return result.success

      return result.error.issues[0].message
    }
  }
})
```
:::

Now you can use Zod schemas in your field rules:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { z } from 'zod'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => ({
        value,
        rule: z.string()
          .min(1, 'Email is required')
          .email('Invalid email address')
      })
    },
    age: {
      type: FieldType.text,
      label: 'Age',
      rules: (value) => ({
        value,
        rule: z.coerce.number()
          .min(18, 'You must be at least 18 years old')
          .max(120, 'Please enter a valid age')
      })
    },
    username: {
      type: FieldType.text,
      label: 'Username',
      rules: (value) => ({
        value,
        rule: z.string()
          .min(3, 'Username must be at least 3 characters')
          .max(20, 'Username must be at most 20 characters')
          .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
      })
    },
    website: {
      type: FieldType.text,
      label: 'Website',
      rules: (value) => ({
        value,
        rule: z.string()
          .url('Must be a valid URL')
          .optional()
          .or(z.literal(''))
      })
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Using Valibot

Configure the Valibot parser:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'
import type * as v from 'valibot'

export const fancyCrud = defineConfig({
  rules: {
    parser(raw: { value: unknown; rule: v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>> }) {
      const { value, rule } = raw
      const result = v.safeParse(rule, value)

      if (result.success)
        return result.success

      return result.issues[0].message
    }
  }
})
```
:::

Usage with Valibot:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import * as v from 'valibot'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => ({
        value,
        rule: v.pipe(
          v.string(),
          v.email('Invalid email address')
        )
      })
    },
    age: {
      type: FieldType.text,
      label: 'Age',
      rules: (value) => ({
        value,
        rule: v.pipe(
          v.string(),
          v.transform(Number),
          v.number('Age must be a number'),
          v.minValue(18, 'You must be at least 18 years old')
        )
      })
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Using Yup

Configure the Yup parser:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'
import type { AnySchema } from 'yup'

export const fancyCrud = defineConfig({
  rules: {
    parser(raw: { value: unknown; rule: AnySchema }) {
      const { value, rule } = raw
      
      try {
        rule.validateSync(value)
        return true
      } catch (error) {
        return error.message
      }
    }
  }
})
```
:::

Usage with Yup:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import * as yup from 'yup'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => ({
        value,
        rule: yup.string()
          .required('Email is required')
          .email('Invalid email address')
      })
    },
    password: {
      type: FieldType.password,
      label: 'Password',
      rules: (value) => ({
        value,
        rule: yup.string()
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters')
          .matches(/[A-Z]/, 'Password must contain an uppercase letter')
          .matches(/[0-9]/, 'Password must contain a number')
      })
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

::: tip
Using validation libraries like Zod provides better TypeScript integration, composable schemas, and more comprehensive validation options.
:::

::: info Important: Parser Syntax
When using a validation library with a parser, your `rules` function must return an object:
```js
rules: (value) => ({ value, rule: zodSchema })
```

This is different from custom validation functions which return `true` or an error string:
```js
rules: (value) => {
  if (!value) return 'Required'
  return true
}
```
:::

## Reusable Validators

Create reusable validation functions for common patterns:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

// Reusable validators
const validators = {
  required: (fieldName: string) => (value: any) => 
    !!value || `${fieldName} is required`,
  
  minLength: (min: number) => (value: string) => 
    !value || value.length >= min || `Must be at least ${min} characters`,
  
  maxLength: (max: number) => (value: string) => 
    !value || value.length <= max || `Must be at most ${max} characters`,
  
  email: (value: string) => 
    !value || /\S+@\S+\.\S+/.test(value) || 'Invalid email format',
  
  phone: (value: string) => 
    !value || /^\+?[\d\s-()]+$/.test(value) || 'Invalid phone number',
  
  alphanumeric: (value: string) => 
    !value || /^[a-zA-Z0-9]+$/.test(value) || 'Only letters and numbers allowed',
  
  url: (value: string) => {
    if (!value) return true
    try {
      new URL(value)
      return true
    } catch {
      return 'Invalid URL'
    }
  }
}

const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      rules: (value) => {
        // Chain validators
        return validators.required('Username')(value)
          || validators.minLength(3)(value)
          || validators.maxLength(20)(value)
          || validators.alphanumeric(value)
      }
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => {
        return validators.required('Email')(value) || validators.email(value)
      }
    },
    website: {
      type: FieldType.text,
      label: 'Website',
      rules: validators.url
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

## Validation Timing

FancyCRUD automatically validates fields in real-time:

- **On mount**: When the field is first initialized
- **As user types**: With a 400ms debounce (waits 400ms after typing stops)
- **On submit**: Before the form is submitted

This means validation errors appear automatically after the user stops typing for 400 milliseconds.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      }
      // Validation runs automatically:
      // - After 400ms of no typing
      // - Before form submission
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

::: tip Debounced Validation
The 400ms debounce prevents validation from running on every keystroke, which improves performance and provides a better user experience. Validation errors only appear after the user has stopped typing.
:::

::: info Max Wait Time
Validation will trigger at most every 5000ms (5 seconds) even if the user continues typing, ensuring timely feedback for long inputs.
:::

## Error Handling

Access and display validation errors:

```vue
<script lang="ts" setup>
import { watch } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      }
    }
  },
  settings: {
    url: 'users/'
  }
})

// Watch for validation errors
watch(() => form.fields.email.errors, (errors) => {
  if (errors.length > 0) {
    console.log('Email validation errors:', errors)
  }
})

// Check if form has any errors
const hasErrors = computed(() => {
  return Object.values(form.fields).some(field => field.errors.length > 0)
})

// Get all error messages
const allErrors = computed(() => {
  return Object.values(form.fields)
    .flatMap(field => field.errors)
    .filter(Boolean)
})
</script>
```

## Complete Example

Here's a comprehensive example combining multiple validation techniques:

```vue
<template>
  <div class="card">
    <f-form v-bind="form" />
    
    <!-- Display all errors -->
    <div v-if="allErrors.length > 0" class="error-summary">
      <h4>Please fix the following errors:</h4>
      <ul>
        <li v-for="error in allErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'
import { z } from 'zod'
import axios from 'axios'
import { useDebounceFn } from '@vueuse/core'

// Reusable validators
const validators = {
  required: (fieldName: string) => (value: any) => 
    !!value || `${fieldName} is required`,
  
  minLength: (min: number) => (value: string) => 
    !value || value.length >= min || `Must be at least ${min} characters`
}

// Debounced username check
const checkUsername = useDebounceFn(async (username: string) => {
  const response = await axios.get(`/api/check-username/${username}`)
  return response.data.available
}, 500)

const form = useForm({
  fields: {
    // Using Zod
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => ({
        value,
        rule: z.string()
          .min(1, 'Email is required')
          .email('Invalid email address')
      })
    },
    
    // Using custom validators with async validation
    username: {
      type: FieldType.text,
      label: 'Username',
      rules: async (value) => {
        // Basic validation
        const requiredCheck = validators.required('Username')(value)
        if (requiredCheck !== true) return requiredCheck
        
        const lengthCheck = validators.minLength(3)(value)
        if (lengthCheck !== true) return lengthCheck
        
        // Async validation
        if (value.length >= 3) {
          const available = await checkUsername(value)
          if (!available) return 'Username is already taken'
        }
        
        return true
      }
    },
    
    // Multiple custom validation checks
    password: {
      type: FieldType.password,
      label: 'Password',
      rules: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Must be at least 8 characters'
        if (!/[A-Z]/.test(value)) return 'Must contain uppercase letter'
        if (!/[a-z]/.test(value)) return 'Must contain lowercase letter'
        if (!/[0-9]/.test(value)) return 'Must contain a number'
        return true
      }
    },
    
    // Cross-field validation
    confirmPassword: {
      type: FieldType.password,
      label: 'Confirm Password',
      rules: (value) => {
        if (!value) return 'Please confirm your password'
        if (value !== form.fields.password.modelValue) {
          return 'Passwords do not match'
        }
        return true
      }
    },
    
    // Using Zod with optional field
    phone: {
      type: FieldType.text,
      label: 'Phone (optional)',
      rules: (value) => ({
        value,
        rule: z.string()
          .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number')
          .optional()
          .or(z.literal(''))
      })
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  }
})

// Computed property for all errors
const allErrors = computed(() => {
  return Object.values(form.fields)
    .flatMap(field => field.errors)
    .filter(Boolean)
})
</script>

<style scoped>
.error-summary {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fee;
  border-left: 4px solid #f00;
}

.error-summary h4 {
  margin: 0 0 0.5rem 0;
  color: #c00;
}

.error-summary ul {
  margin: 0;
  padding-left: 1.5rem;
}

.error-summary li {
  color: #c00;
}
</style>
```

## Best Practices

::: tip Validation Tips
1. **Provide Clear Error Messages**: Use descriptive messages that tell users exactly what's wrong
2. **Keep It Simple**: Don't over-validate; balance security with user experience
3. **Use Debouncing**: For async validation, debounce API calls to improve performance
4. **Cross-Field Validation**: Validate related fields together (e.g., password confirmation)
5. **Reusable Validators**: Create a library of reusable validation functions
6. **Type Safety**: Use TypeScript and validation libraries like Zod for better type inference
7. **Test All Paths**: Ensure validation works for both valid and invalid inputs
:::

::: warning Common Pitfalls
- **Don't block input**: Let users type freely, validate on blur or submit
- **Avoid excessive async calls**: Always debounce async validation
- **Handle errors gracefully**: Provide fallback messages for network failures
- **Test edge cases**: Null, undefined, empty string, whitespace, etc.
:::

::: info Rule Return Values
The `rules` property accepts a single function (not an array) that must return:
- `true` for valid values
- A `string` error message for invalid values
- A `Promise<true | string>` for async validation

If you need multiple validation checks, combine them within a single function using if statements or logical operators.
:::

## Next Steps

- Learn about [Form Settings](/forms/settings) to configure form behavior
- Explore [Form Buttons](/forms/buttons) to customize form actions
- Check out [Form Fields](/forms/fields/) for field configuration
- Read about [Form Commands](/forms/commands) for custom behaviors
- Discover [Response Interceptors](/forms/response-interceptors) to handle API responses