# Configuration

FancyCRUD provides a powerful configuration system that allows you to customize forms, tables, HTTP behavior, notifications, styling, and more. All configuration is done through the `defineConfig` function.

## Basic Configuration

The minimum configuration requires an HTTP client and UI components from a wrapper:

```ts
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-vuetify'

export const fancyCrud = defineConfig({
  http: {
    request: axios,
  },
  components,
  styles,
})
```

## HTTP Configuration

### HTTP Client

FancyCRUD supports any HTTP client that follows a promise-based interface. The most common choice is Axios:

```ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fancyCrud = defineConfig({
  http: {
    request: axiosInstance,
  },
  // ... other config
})
```

### Custom HTTP Client

You can use any HTTP client as long as it returns promises:

```ts
import { defineConfig } from '@fancy-crud/vue'

export const fancyCrud = defineConfig({
  http: {
    request: {
      get: (url, config) => fetch(url, config).then(r => r.json()),
      post: (url, data, config) => fetch(url, { method: 'POST', body: JSON.stringify(data), ...config }).then(r => r.json()),
      put: (url, data, config) => fetch(url, { method: 'PUT', body: JSON.stringify(data), ...config }).then(r => r.json()),
      patch: (url, data, config) => fetch(url, { method: 'PATCH', body: JSON.stringify(data), ...config }).then(r => r.json()),
      delete: (url, config) => fetch(url, { method: 'DELETE', ...config }).then(r => r.json()),
    },
  },
  // ... other config
})
```

### Pagination Configuration

Configure how FancyCRUD interprets paginated API responses:

```ts
export const fancyCrud = defineConfig({
  http: {
    request: axios,
    pagination: {
      // Default Django REST Framework style
      results: 'results',  // Path to results array
      count: 'count',      // Path to total count
    },
  },
  // ... other config
})
```

For different API response structures:

```ts
// Laravel pagination
pagination: {
  results: 'data',
  count: 'total',
}

// Custom nested structure
pagination: {
  results: 'response.items',
  count: 'response.pagination.total',
}
```

## Default Settings

Set default values for forms and tables that will be applied unless overridden:

```ts
export const fancyCrud = defineConfig({
  http: { request: axios },
  components,
  styles,
  
  // Default form settings
  defaults: {
    // Field defaults by type
    text: {
      class: 'my-text-field',
      wrapper: {
        class: 'col-12 col-md-6',
      },
    },
    email: {
      class: 'my-email-field',
      wrapper: {
        class: 'col-12',
      },
    },
    select: {
      class: 'my-select-field',
      wrapper: {
        class: 'col-12 col-md-4',
      },
    },
    
    // Button defaults
    mainButton: {
      class: 'btn-primary',
      label: 'Save',
    },
    auxButton: {
      class: 'btn-secondary',
      label: 'Cancel',
    },
    
    // Table button defaults
    addButton: {
      class: 'btn-success',
      label: 'Add New',
      icon: 'mdi-plus',
    },
    editButton: {
      class: 'btn-info',
      label: 'Edit',
      icon: 'mdi-pencil',
    },
    removeButton: {
      class: 'btn-danger',
      label: 'Delete',
      icon: 'mdi-delete',
    },
  },
})
```

## Notifications

Configure default notifications for form operations:

```ts
export const fancyCrud = defineConfig({
  http: { request: axios },
  components,
  styles,
  
  notifications: {
    // Notifications when creating records
    onCreateRecord: {
      success: {
        title: 'Success!',
        message: 'Record created successfully',
        type: 'success',
        duration: 3000,
      },
      error: {
        title: 'Error',
        message: 'Failed to create record',
        type: 'error',
        duration: 5000,
      },
    },
    
    // Notifications when updating records
    onUpdateRecord: {
      success: {
        title: 'Updated!',
        message: 'Record updated successfully',
        type: 'success',
        duration: 3000,
      },
      error: {
        title: 'Error',
        message: 'Failed to update record',
        type: 'error',
        duration: 5000,
      },
    },
  },
})
```

## Response Interceptors

Define global response interceptors based on HTTP status codes:

```ts
export const fancyCrud = defineConfig({
  http: { request: axios },
  components,
  styles,
  
  responseInterceptor: {
    // Handle validation errors (422)
    422: (response, formId) => {
      const errors = response.response?.data?.errors || {}
      
      // Set field errors automatically
      bus.execute(
        new SetFieldsErrorsCommand(form.fields, errors)
      )
    },
    
    // Handle unauthorized (401)
    401: (response) => {
      console.log('User unauthorized, redirecting to login...')
      window.location.href = '/login'
    },
    
    // Handle forbidden (403)
    403: (response) => {
      console.log('Access forbidden')
      // Show notification or redirect
    },
    
    // Handle server errors (500)
    500: (response) => {
      console.error('Server error:', response)
      // Log to error tracking service
    },
  },
})
```

## Validation Rules

Configure global validation rule parsers:

```ts
export const fancyCrud = defineConfig({
  http: { request: axios },
  components,
  styles,
  
  rulesConfig: {
    // Custom parser for validation results
    parser: (result) => {
      // Transform your validation library's result
      // to FancyCRUD's expected format
      if (result.valid) return true
      return result.message || 'Validation failed'
    },
    
    // Prevent error messages from showing
    preventErrorMessage: false,
  },
})
```

### Integration with Validation Libraries

#### Vuelidate

```ts
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

rulesConfig: {
  parser: (result) => {
    if (result.$error) {
      return result.$errors[0].$message
    }
    return true
  },
}
```

#### Yup

```ts
import * as yup from 'yup'

rulesConfig: {
  parser: async (schema) => {
    try {
      await schema.validate()
      return true
    } catch (error) {
      return error.message
    }
  },
}
```

## Styling Configuration

The `styles` object from wrappers contains default CSS classes for components. You can override or extend them:

```ts
import components, { styles as defaultStyles } from '@fancy-crud/wrapper-vuetify'

export const fancyCrud = defineConfig({
  http: { request: axios },
  components,
  
  styles: {
    ...defaultStyles,
    
    // Override form container styles
    formContainer: 'custom-form-container my-form',
    
    // Override field wrapper styles
    fieldWrapper: 'custom-field-wrapper',
    
    // Override button styles
    primaryButton: 'custom-btn custom-btn-primary',
    secondaryButton: 'custom-btn custom-btn-secondary',
  },
})
```

## Complete Configuration Example

Here's a comprehensive configuration example:

```ts
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-vuetify'

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const fancyCrud = defineConfig({
  http: {
    request: axiosInstance,
    pagination: {
      results: 'results',
      count: 'count',
    },
  },
  
  components,
  styles,
  
  defaults: {
    text: {
      class: 'text-field',
      wrapper: { class: 'col-12 col-md-6' },
    },
    textarea: {
      class: 'textarea-field',
      wrapper: { class: 'col-12' },
    },
    select: {
      class: 'select-field',
      wrapper: { class: 'col-12 col-md-4' },
    },
    mainButton: {
      class: 'btn-primary',
      label: 'Save',
    },
    auxButton: {
      class: 'btn-secondary',
      label: 'Cancel',
    },
    addButton: {
      class: 'btn-success',
      label: 'Add New',
      icon: 'mdi-plus',
    },
    editButton: {
      class: 'btn-info',
      label: 'Edit',
      icon: 'mdi-pencil',
    },
    removeButton: {
      class: 'btn-danger',
      label: 'Delete',
      icon: 'mdi-delete',
    },
  },
  
  notifications: {
    onCreateRecord: {
      success: {
        title: 'Success!',
        message: 'Record created successfully',
        type: 'success',
        duration: 3000,
      },
      error: {
        title: 'Error',
        message: 'Failed to create record',
        type: 'error',
        duration: 5000,
      },
    },
    onUpdateRecord: {
      success: {
        title: 'Updated!',
        message: 'Changes saved successfully',
        type: 'success',
        duration: 3000,
      },
      error: {
        title: 'Error',
        message: 'Failed to save changes',
        type: 'error',
        duration: 5000,
      },
    },
  },
  
  responseInterceptor: {
    422: (response, formId) => {
      // Handle validation errors
      const errors = response.response?.data?.errors || {}
      // Set field errors
    },
    401: () => {
      // Redirect to login
      window.location.href = '/login'
    },
    403: () => {
      // Show access denied message
      console.log('Access denied')
    },
  },
  
  rulesConfig: {
    preventErrorMessage: false,
  },
})
```

## Environment-Specific Configuration

You can create different configurations for different environments:

::: code-group
```ts [config.development.ts]
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-vuetify'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export const fancyCrud = defineConfig({
  http: { request: axiosInstance },
  components,
  styles,
})
```

```ts [config.production.ts]
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-vuetify'

const axiosInstance = axios.create({
  baseURL: 'https://api.production.com',
})

export const fancyCrud = defineConfig({
  http: { request: axiosInstance },
  components,
  styles,
})
```

```ts [main.ts]
import { createApp } from 'vue'
import { FancyCrud } from '@fancy-crud/vue'

const config = import.meta.env.PROD
  ? await import('./config.production')
  : await import('./config.development')

app.use(FancyCrud, config.fancyCrud)
```
:::

## Next Steps

Now that you've configured FancyCRUD, you can:

- Learn about [Form Commands](/forms/commands) to understand how to work with forms
- Explore [Table Commands](/tables/commands) for table operations
- Check out the [Command Bus Pattern](/built-in/command-bus) for advanced usage
