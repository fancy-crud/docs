## Reserved Attributes

FancyCRUD reserves certain attribute names for special functionality. These attributes control how fields behave, validate, and interact with your data.

### ModelValue

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `modelValue` | `any` | `null` | No |

The `modelValue` attribute stores the current value of the field. It's reactive and updates automatically as the user types or selects values. You can also set an initial value.

```vue
<template>
  <f-form v-bind="form"></f-form>
  {{ form.fields.firstName.modelValue }}
</template>
  
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelValue: 'Juan Camaney' // [!code highlight]
    },
  }
})
</script>
```

<FormModelValue></FormModelValue>


### ModelKey

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `modelKey` | `string` | Same as field key | No |

The `modelKey` attribute specifies the property name that will be used in the HTTP request payload. By default, it uses the field key, but you can override it to match your API's expected format.

**Example: Matching API Field Names**

```vue
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    // Field key is "firstName" but API expects "first_name"
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelKey: 'first_name', // [!code highlight]
    },
    // Field key is "emailAddress" but API expects "email"
    emailAddress: {
      type: FieldType.text,
      label: 'Email',
      modelKey: 'email', // [!code highlight]
    },
  },
  settings: {
    url: 'users/',
  },
})

// When form is submitted, the payload will be:
// { first_name: "John", email: "john@example.com" }
// Instead of: { firstName: "John", emailAddress: "john@example.com" }
</script>
```

::: tip
Use `modelKey` when your frontend field names don't match your API's expected property names. This is common when working with APIs that use snake_case while your Vue code uses camelCase.
:::

<FormModelKey></FormModelKey>

### Errors

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `errors` | `string[]` | `[]` | No |

The `errors` attribute contains validation error messages for the field. Errors can come from:
- Frontend validation rules
- Backend API validation responses
- Programmatic assignment

Error messages are automatically displayed by the field component.

**Example: Programmatic Error Setting**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      errors: ['This username is already taken'], // [!code highlight]
    }
  }
})

// You can also set errors programmatically
function checkUsername() {
  form.fields.username.errors = ['Username is already in use']
}

// Or clear errors
function clearErrors() {
  form.fields.username.errors = []
}
</script>
```

::: info
Errors are automatically cleared when the user modifies the field value. FancyCRUD also automatically populates errors from backend validation responses.
:::

<FormErrors></FormErrors>

### Rules

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `rules` | `(value: any) => string \| true \| unknown` | `undefined` | No |

The `rules` attribute defines validation logic for the field. Rules are functions that return either `true` (valid) or an error message string (invalid).

**Simple Validation Example**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: (value) => { // [!code highlight:3]
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      },
    },
    age: {
      type: FieldType.text,
      label: 'Age',
      rules: (value) => { // [!code highlight:4]
        if (!value) return 'Age is required'
        const age = parseInt(value)
        if (age < 18) return 'Must be 18 or older'
        return true
      },
    },
  }
})
</script>
```

**Using Validation Libraries**

FancyCRUD supports popular validation libraries like [Zod](https://zod.dev/), [Valibot](https://valibot.dev/), [Yup](https://github.com/jquense/yup), and [Vuelidate](https://vuelidate-next.netlify.app/). See the [Validation Rules](/guide/configuration#validation-rules) section for setup details.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { z } from 'zod'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      rules: value => ({ value, rule: z.string().email() }), // [!code highlight]
    },
    password: {
      type: FieldType.password,
      label: 'Password',
      rules: value => ({ value, rule: z.string().min(8) }), // [!code highlight]
    },
  }
})
</script>
```

::: tip
For more complex validation scenarios and library-specific examples, see the complete [Rules documentation](/forms/rules).
:::

### Options

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `options` | `any[]` | `undefined` | No |
| `optionLabel` | `string` | `undefined` | No |
| `optionValue` | `string` | `undefined` | No |

The `options` attribute provides a list of choices for select, radio, and checkbox fields. Options can be simple arrays of strings or arrays of objects.

**Simple Array Options**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      options: ['Red', 'Blue', 'Green', 'Purple'], // [!code highlight]
    },
    skills: {
      type: FieldType.checkbox,
      label: 'Skills',
      options: ['Vue', 'React', 'Angular', 'Svelte'], // [!code highlight]
      multiple: true,
    },
  }
})
</script>
```

**Object Array Options**

When working with objects, use `optionLabel` to specify which property to display and `optionValue` to specify which property to use as the value.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const employees = [
  { id: 1, name: 'Marco Anderson', department: 'Engineering' },
  { id: 2, name: 'Linda Chen', department: 'Design' },
  { id: 3, name: 'Alex Johnson', department: 'Sales' },
  { id: 4, name: 'Emily Rodriguez', department: 'Marketing' },
]

const form = useForm({
  fields: {
    assignedTo: {
      type: FieldType.select,
      label: 'Assign to',
      options: employees,     // [!code highlight]
      optionLabel: 'name',    // Display "Marco Anderson" // [!code highlight]
      optionValue: 'id',      // Submit value: 1 // [!code highlight]
    },
  }
})

// When user selects "Marco Anderson"
// form.fields.assignedTo.modelValue will be: 1
</script>
```

**Dynamic Options from Reactive Data**

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const categories = ref([
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
])

const form = useForm({
  fields: {
    category: {
      type: FieldType.select,
      label: 'Category',
      options: categories.value,  // Reactive options // [!code highlight]
      optionLabel: 'name',
      optionValue: 'id',
    },
  }
})

// Update options dynamically
function addCategory() {
  categories.value.push({ id: 4, name: 'Sports' })
  form.fields.category.options = categories.value // [!code highlight]
}
</script>
```

::: warning
When working with object arrays, always specify `optionLabel` to avoid displaying `[object Object]` in the UI.
:::

::: tip
If you omit `optionValue` when working with objects, the entire object will be stored in `modelValue` instead of just a single property.
:::

**Fetching Options from API**

For loading options from a backend API, use the `url` attribute instead. See the [URL section](#url) below.

<FieldURL></FieldURL>

### URL

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `url` | `string` | `undefined` | No |

The `url` attribute allows fields to fetch their options from a backend API. When specified, FancyCRUD automatically sends a GET request to the URL and populates the field's `options` with the response data.

**Basic API Usage**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    assignedTo: {
      type: FieldType.select,
      label: 'Assign to Employee',
      url: 'employees/',    // Fetches from /api/employees/ // [!code highlight]
      optionLabel: 'name',  // Display employee name // [!code highlight]
      optionValue: 'id',    // Submit employee ID // [!code highlight]
    },
    country: {
      type: FieldType.select,
      label: 'Country',
      url: 'countries/',
      optionLabel: 'name',
      optionValue: 'code',
    },
  }
})
</script>
```

**Expected API Response Format**

The API should return an array of objects:

```json
[
  { "id": 1, "name": "Marco Anderson", "department": "Engineering" },
  { "id": 2, "name": "Linda Chen", "department": "Design" },
  { "id": 3, "name": "Alex Johnson", "department": "Sales" }
]
```

**Loading State**

FancyCRUD automatically handles the loading state while fetching options. The field will be disabled during the request and re-enabled once data is loaded.

**Error Handling**

If the API request fails, FancyCRUD will:
- Log the error to the console
- Keep the field enabled
- Leave the `options` array empty

**Intercepting and Transforming Options**

You can intercept and transform the API response before it's assigned to `options`:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    employee: {
      type: FieldType.select,
      label: 'Employee',
      url: 'employees/',
      optionLabel: 'name',
      optionValue: 'id',
      // Transform the response data
      interceptOptions: (options) => { // [!code highlight:3]
        // Filter, sort, or modify options
        return options.filter(emp => emp.active === true)
      },
    },
  }
})
</script>
```

See [interceptOptions in Methods](#interceptoptions) for more details.

::: tip
The `url` attribute is relative to your configured base HTTP client. Make sure you've set up your HTTP configuration in `fancy-crud.config.ts`. See [Configuration](/guide/configuration#http-configuration).
:::

<FieldURL></FieldURL>


### DebounceTime

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `debounceTime` | `number` | `0` | No |

The `debounceTime` property specifies a delay (in milliseconds) before updating the `modelValue` after user input. This is useful for reducing the frequency of validation checks or API calls.

**Example: Debounced Username Check**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { watch } from 'vue'

const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      debounceTime: 500, // Wait 500ms after user stops typing // [!code highlight]
    },
  }
})

// This will only fire 500ms after the user stops typing
watch(() => form.fields.username.modelValue, async (value) => {
  if (value) {
    // Check username availability
    const response = await fetch(`/api/check-username/${value}`)
    const data = await response.json()
    
    if (!data.available) {
      form.fields.username.errors = ['Username is already taken']
    }
  }
})
</script>
```

::: tip
Use `debounceTime` for fields that trigger expensive operations like API calls, database queries, or complex validations. A value between 300-500ms provides a good user experience.
:::


### CreateOnly

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `createOnly` | `boolean` | `false` | No |

Display the field only when the form is in **create mode**. Useful for fields that should only appear when creating new records.

```vue
<script lang="ts" setup>
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    password: {
      type: FieldType.password,
      label: 'Password',
      createOnly: true, // Only shown when creating a new user // [!code highlight]
    },
    confirmPassword: {
      type: FieldType.password,
      label: 'Confirm Password',
      createOnly: true, // [!code highlight]
    },
    // This field appears in both modes
    email: {
      type: FieldType.text,
      label: 'Email',
    },
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create,
  },
})
</script>
```

### UpdateOnly

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `updateOnly` | `boolean` | `false` | No |

Display the field only when the form is in **update mode**. Useful for fields that should only appear when editing existing records.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    id: {
      type: FieldType.text,
      label: 'ID',
      updateOnly: true, // Only shown when updating // [!code highlight]
      readonly: true,
    },
    lastModified: {
      type: FieldType.datepicker,
      label: 'Last Modified',
      updateOnly: true, // [!code highlight]
      readonly: true,
    },
    // This field appears in both modes
    name: {
      type: FieldType.text,
      label: 'Name',
    },
  }
})
</script>
```

### Hidden

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `hidden` | `boolean` | `false` | No |

Hide the field from the form UI regardless of the form mode. The field will still be included in the request payload if it has a `modelValue`.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    userId: {
      type: FieldType.text,
      label: 'User ID',
      hidden: true, // Never displayed in the form // [!code highlight]
      modelValue: currentUser.id, // But still sent in the request
    },
    name: {
      type: FieldType.text,
      label: 'Name',
    },
  }
})
</script>
```

::: tip
Use `hidden` for fields that need to be submitted with the form but shouldn't be visible to users, such as IDs, timestamps, or system-generated values.
:::

### Exclude

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `exclude` | `boolean` | `false` | No |

Exclude the field from the HTTP request payload. The field will still be displayed in the form, but its value won't be sent to the server.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    confirmPassword: {
      type: FieldType.password,
      label: 'Confirm Password',
      exclude: true, // Not sent to the API // [!code highlight]
      rules: (value) => {
        return value === form.fields.password.modelValue || 'Passwords must match'
      },
    },
    password: {
      type: FieldType.password,
      label: 'Password',
      // This WILL be sent to the API
    },
  }
})
</script>
```

::: tip
Use `exclude` for client-side-only fields like password confirmation, search filters, or UI state that shouldn't be persisted.
:::

### Multiple

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `multiple` | `boolean` | `false` | No |

Enable multiple value selection. When `true`, the `modelValue` is initialized as an empty array `[]` instead of `null`. Commonly used with `select`, `checkbox`, and `file` fields.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    // Multiple select
    skills: {
      type: FieldType.select,
      label: 'Skills',
      options: ['Vue', 'React', 'Angular', 'Svelte'],
      multiple: true, // [!code highlight]
      // modelValue will be: []
    },
    
    // Multiple checkboxes
    interests: {
      type: FieldType.checkbox,
      label: 'Interests',
      options: ['Technology', 'Sports', 'Music', 'Travel'],
      multiple: true, // [!code highlight]
      // modelValue will be: []
    },
    
    // Multiple file uploads
    attachments: {
      type: FieldType.file,
      label: 'Upload Files',
      multiple: true, // [!code highlight]
      // modelValue will be: []
    },
  }
})
</script>
```

### Wrapper

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `wrapper` | `object` | `{}` | No |

Pass additional attributes to the field's wrapper component. This is particularly useful for applying custom styling classes or wrapper-specific props.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      // Apply classes to the field wrapper
      wrapper: { // [!code highlight:3]
        class: 'col-span-6 md:col-span-4',
      },
    },
    lastName: {
      type: FieldType.text,
      label: 'Last name',
      wrapper: { // [!code highlight:3]
        class: 'col-span-6 md:col-span-4',
      },
    },
    description: {
      type: FieldType.textarea,
      label: 'Description',
      wrapper: { // [!code highlight:4]
        class: 'col-span-12',
        style: 'margin-top: 1rem',
      },
    },
  }
})
</script>
```

::: tip
The `wrapper` attribute's behavior depends on your UI framework wrapper. Check your wrapper's documentation for supported properties.
:::
