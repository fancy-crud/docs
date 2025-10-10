# Response Interceptors

Response interceptors allow you to handle HTTP responses from form submissions based on their status codes. They provide a powerful way to customize behavior after create or update operations, such as showing custom notifications, redirecting users, updating application state, or handling errors.

## Overview

Response interceptors are functions triggered after form submission based on the HTTP status code of the response. Each interceptor receives:
- **`formId`**: The unique identifier of the form
- **`response`**: The complete HTTP response object

FancyCRUD provides:
- **Per-Form Interceptors**: Define specific behavior for individual forms
- **Global Interceptors**: Set default behavior for all forms
- **Built-in Error Handling**: Automatic error notifications for 4xx and 5xx status codes
- **Status Code Targeting**: Handle any HTTP status code (200, 201, 400, 404, 500, etc.)

## Basic Usage

Define interceptors directly in your form configuration:


```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    },
    email: {
      type: FieldType.text,
      label: 'Email'
    }
  },
  settings: {
    url: 'users/'
  },
  responseInterceptor: {
    200: (formId, response) => {
      console.log('Update successful:', response.data)
      // Handle successful update
    },
    201: (formId, response) => {
      console.log('Created successfully:', response.data)
      // Redirect to the new resource
      router.push(`/users/${response.data.id}`)
    },
    400: (formId, response) => {
      console.error('Bad request:', response.data)
      // Handle validation errors from server
    }
  }
})
</script>
```

## Common Status Codes

Here are the most common HTTP status codes you'll encounter:

### Success Responses (2xx)

| Code | Meaning | Common Use Case |
|------|---------|-----------------|
| `200` | OK | Successful update (PATCH/PUT) |
| `201` | Created | Successful creation (POST) |
| `204` | No Content | Successful deletion |

### Client Errors (4xx)

| Code | Meaning | Common Use Case |
|------|---------|-----------------|
| `400` | Bad Request | Validation errors, malformed data |
| `401` | Unauthorized | Authentication required |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource, constraint violation |
| `422` | Unprocessable Entity | Semantic validation errors |

### Server Errors (5xx)

| Code | Meaning | Common Use Case |
|------|---------|-----------------|
| `500` | Internal Server Error | Server-side error |
| `502` | Bad Gateway | Upstream server error |
| `503` | Service Unavailable | Server temporarily down |

::: info Built-in Error Handling
FancyCRUD automatically displays error notifications for status codes `400-451` and `500-511`. You can override this behavior by providing custom interceptors for these codes.
:::

## Use Cases & Examples

### 1. Success Notifications

Show custom success messages based on the operation:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = useForm({
  fields: {
    title: { type: FieldType.text, label: 'Title' }
  },
  settings: {
    url: 'posts/'
  },
  responseInterceptor: {
    200: (formId, response) => {
      toast.success('Post updated successfully!')
    },
    201: (formId, response) => {
      toast.success(`Post "${response.data.title}" created successfully!`)
    }
  }
})
</script>
```

### 2. Redirect After Success

Navigate to different pages based on the response:

```vue
<script lang="ts" setup>
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'products/',
    mode: FORM_MODE.create
  },
  responseInterceptor: {
    201: (formId, response) => {
      // Redirect to the newly created product
      router.push(`/products/${response.data.id}`)
    },
    200: (formId, response) => {
      // Redirect to product list after update
      router.push('/products')
    }
  }
})
</script>
```

### 3. Handle Validation Errors

Display server-side validation errors:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = useForm({
  fields: {
    email: { type: FieldType.text, label: 'Email' },
    username: { type: FieldType.text, label: 'Username' }
  },
  settings: {
    url: 'users/'
  },
  responseInterceptor: {
    400: (formId, response) => {
      // Display server validation errors
      const errors = response.data.errors
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          toast.error(`${field}: ${messages.join(', ')}`)
        })
      }
    },
    422: (formId, response) => {
      // Handle unprocessable entity errors
      toast.error(response.data.message || 'Validation failed')
    }
  }
})
</script>
```

### 4. Handle Authentication Errors

Redirect to login on authentication failures:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = useForm({
  fields: {
    content: { type: FieldType.textarea, label: 'Content' }
  },
  settings: {
    url: 'posts/'
  },
  responseInterceptor: {
    401: (formId, response) => {
      // Clear auth and redirect to login
      authStore.logout()
      router.push('/login')
    },
    403: (formId, response) => {
      // Show permission error
      alert('You do not have permission to perform this action')
    }
  }
})
</script>
```

### 5. Update Application State

Sync application state with server response:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    bio: { type: FieldType.textarea, label: 'Bio' }
  },
  settings: {
    url: 'profile/'
  },
  responseInterceptor: {
    200: (formId, response) => {
      // Update user store with new data
      userStore.updateProfile(response.data)
    }
  }
})
</script>
```

### 6. Handle Conflicts

Deal with duplicate resources or race conditions:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = useForm({
  fields: {
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: {
    url: 'users/'
  },
  responseInterceptor: {
    409: (formId, response) => {
      // Handle duplicate email
      toast.warning('This email is already registered')
      // Optionally suggest alternative actions
    }
  }
})
</script>
```

### 7. Retry Logic for Server Errors

Implement retry mechanism for temporary failures:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const retryCount = ref(0)
const maxRetries = 3

const form = useForm({
  fields: {
    data: { type: FieldType.text, label: 'Data' }
  },
  settings: {
    url: 'submissions/'
  },
  responseInterceptor: {
    500: (formId, response) => {
      if (retryCount.value < maxRetries) {
        retryCount.value++
        console.log(`Retrying... (${retryCount.value}/${maxRetries})`)
        setTimeout(() => {
          form.submit()
        }, 1000 * retryCount.value) // Exponential backoff
      } else {
        alert('Failed after multiple attempts. Please try again later.')
        retryCount.value = 0
      }
    },
    200: () => {
      retryCount.value = 0 // Reset on success
    },
    201: () => {
      retryCount.value = 0 // Reset on success
    }
  }
})
</script>
```

## Global Response Interceptors

Define default interceptors for all forms in your application by configuring them in your FancyCRUD configuration file:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'
import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const fancyCrud = defineConfig({
  // Other configurations...

  responseInterceptors: {
    // Success: Show success notification
    200: (formId, response) => {
      toast.success('Updated successfully')
    },
    
    // Created: Show success and log
    201: (formId, response) => {
      toast.success('Created successfully')
      console.log('New resource:', response.data)
    },
    
    // Bad Request: Log validation errors
    400: (formId, response) => {
      console.error('Validation errors:', response.data)
    },
    
    // Unauthorized: Redirect to login
    401: (formId, response) => {
      toast.error('Session expired. Please log in again.')
      router.push('/login')
    },
    
    // Forbidden: Show permission error
    403: (formId, response) => {
      toast.error('You do not have permission to perform this action')
    },
    
    // Not Found: Handle missing resources
    404: (formId, response) => {
      toast.error('Resource not found')
    },
    
    // Server Error: Show generic error
    500: (formId, response) => {
      toast.error('Server error. Please try again later.')
    }
  }
})
```
:::

### Combining Global and Local Interceptors

Local interceptors override global ones for the same status code:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  responseInterceptor: {
    // This overrides the global 201 interceptor for this form
    201: (formId, response) => {
      console.log('Custom handling for user creation')
      // Different behavior than global interceptor
    }
    // All other status codes will use global interceptors
  }
})
</script>
```

::: tip Interceptor Priority
Local interceptors take precedence over global interceptors. If you define both, only the local interceptor will execute for that status code.
:::

## Accessing Form and Response Data

Interceptors receive both the `formId` and the full `response` object:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { IFormStore } from '@fancy-crud/core'

const formStore = inject(IFormStore)

const form = useForm({
  fields: {
    title: { type: FieldType.text, label: 'Title' }
  },
  settings: {
    url: 'posts/'
  },
  responseInterceptor: {
    201: (formId, response) => {
      // Access the form instance
      const formInstance = formStore.searchById(formId)
      
      // Access response data
      console.log('Status:', response.status)
      console.log('Headers:', response.headers)
      console.log('Data:', response.data)
      
      // Access form fields
      console.log('Form title:', formInstance.fields.title.modelValue)
      
      // Reset form after successful creation
      formInstance.reset()
    }
  }
})
</script>
```

## Complete Example

Here's a comprehensive example demonstrating advanced response interceptor usage:

```vue
<template>
  <div class="card">
    <f-form v-bind="form" />
    
    <!-- Show server errors -->
    <div v-if="serverErrors.length" class="error-list">
      <h4>Server Errors:</h4>
      <ul>
        <li v-for="error in serverErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useProductStore } from '@/stores/products'

const router = useRouter()
const toast = useToast()
const productStore = useProductStore()

const serverErrors = ref<string[]>([])
const retryCount = ref(0)

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Product Name',
      required: true
    },
    price: {
      type: FieldType.text,
      label: 'Price',
      required: true
    },
    category: {
      type: FieldType.select,
      label: 'Category',
      options: ['Electronics', 'Clothing', 'Food'],
      required: true
    },
    description: {
      type: FieldType.textarea,
      label: 'Description'
    }
  },
  settings: {
    url: 'products/',
    mode: FORM_MODE.create,
    title: '{{ Create Product | Edit Product }}'
  },
  responseInterceptor: {
    // Success: Created
    201: (formId, response) => {
      toast.success(`Product "${response.data.name}" created successfully!`)
      
      // Add to store
      productStore.addProduct(response.data)
      
      // Clear any errors
      serverErrors.value = []
      
      // Redirect to product details
      router.push(`/products/${response.data.id}`)
    },
    
    // Success: Updated
    200: (formId, response) => {
      toast.success('Product updated successfully!')
      
      // Update store
      productStore.updateProduct(response.data)
      
      // Clear errors
      serverErrors.value = []
      
      // Redirect to product list
      router.push('/products')
    },
    
    // Validation Error
    400: (formId, response) => {
      serverErrors.value = []
      
      // Handle field-specific errors
      if (response.data.errors) {
        Object.entries(response.data.errors).forEach(([field, messages]: [string, any]) => {
          if (Array.isArray(messages)) {
            messages.forEach(msg => serverErrors.value.push(`${field}: ${msg}`))
          }
        })
      }
      
      // Show generic message
      if (response.data.message) {
        toast.error(response.data.message)
      }
    },
    
    // Unauthorized
    401: (formId, response) => {
      toast.error('Your session has expired. Please log in again.')
      router.push('/login')
    },
    
    // Forbidden
    403: (formId, response) => {
      toast.error('You do not have permission to manage products')
      router.push('/dashboard')
    },
    
    // Not Found (for updates)
    404: (formId, response) => {
      toast.error('Product not found. It may have been deleted.')
      router.push('/products')
    },
    
    // Conflict (duplicate)
    409: (formId, response) => {
      toast.warning('A product with this name already exists')
      serverErrors.value = ['Product name must be unique']
    },
    
    // Unprocessable Entity
    422: (formId, response) => {
      toast.error('Invalid product data')
      serverErrors.value = [response.data.message || 'Validation failed']
    },
    
    // Server Error with Retry
    500: (formId, response) => {
      if (retryCount.value < 3) {
        retryCount.value++
        toast.info(`Server error. Retrying... (${retryCount.value}/3)`)
        
        setTimeout(() => {
          form.submit()
        }, 1000 * retryCount.value)
      } else {
        toast.error('Server error. Please try again later.')
        serverErrors.value = ['Server is temporarily unavailable']
        retryCount.value = 0
      }
    },
    
    // Service Unavailable
    503: (formId, response) => {
      toast.error('Service is temporarily down for maintenance')
    }
  }
})

// Switch to edit mode
const editProduct = (productId: string) => {
  form.settings.mode = FORM_MODE.update
  form.settings.lookupValue = productId
  serverErrors.value = []
}

// Switch to create mode
const createNewProduct = () => {
  form.settings.mode = FORM_MODE.create
  form.settings.lookupValue = null
  form.reset()
  serverErrors.value = []
}
</script>

<style scoped>
.error-list {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fee;
  border-left: 4px solid #f00;
  border-radius: 4px;
}

.error-list h4 {
  margin: 0 0 0.5rem 0;
  color: #c00;
}

.error-list ul {
  margin: 0;
  padding-left: 1.5rem;
}

.error-list li {
  color: #c00;
  margin-bottom: 0.25rem;
}
</style>
```

## Best Practices

::: tip Response Interceptor Tips
1. **Handle Common Errors Globally**: Define global interceptors for common status codes (401, 403, 500)
2. **Use TypeScript**: Type your response data for better IDE support
3. **Keep It Simple**: Don't put complex business logic in interceptors
4. **Log for Debugging**: Console log responses during development
5. **Provide User Feedback**: Always show toast notifications or messages
6. **Reset Form State**: Clear errors and reset retry counters on success
7. **Graceful Degradation**: Handle unexpected status codes gracefully
:::

::: warning Common Pitfalls
- **Don't modify form state excessively**: Keep interceptors focused on response handling
- **Avoid async operations**: Interceptors should be synchronous; use callbacks for async work
- **Don't ignore errors**: Always handle error status codes appropriately
- **Test all paths**: Ensure interceptors work for all expected status codes
:::

::: info Response Object Structure
The response object typically contains:
```ts
{
  status: number,        // HTTP status code
  statusText: string,    // Status message
  data: any,            // Response body
  headers: object,      // Response headers
  config: object        // Request configuration
}
```
:::

## TypeScript Support

Define typed interceptors for better type safety:

```typescript
import type { AxiosResponse } from 'axios'

interface UserResponse {
  id: string
  name: string
  email: string
  created_at: string
}

interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  responseInterceptor: {
    201: (formId: symbol, response: AxiosResponse<UserResponse>) => {
      // response.data is typed as UserResponse
      console.log('User created:', response.data.name)
    },
    400: (formId: symbol, response: AxiosResponse<ErrorResponse>) => {
      // response.data is typed as ErrorResponse
      console.error('Validation failed:', response.data.message)
    }
  }
})
```

## Next Steps

- Learn about [Form Settings](/forms/settings) to configure form behavior
- Explore [Form Buttons](/forms/buttons) to customize form actions
- Check out [Form Rules](/forms/rules) for validation
- Read about [Form Commands](/forms/commands) for custom behaviors
- Discover [Form Fields](/forms/fields/) for field configuration
