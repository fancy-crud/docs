## Methods

Field methods are functions that allow you to transform, intercept, or compute field values at different stages of the form lifecycle.

### RecordValue

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `recordValue` | `(record: any) => unknown` | `undefined` | No |

The `recordValue` function extracts and transforms values from the source record object before assigning them to the field's `modelValue`. This is essential for handling nested objects, computed values, or data transformations during form initialization.

**Use Cases:**
- Extracting values from nested objects
- Computing derived values
- Transforming data structures
- Accessing related object properties

**Example: Extracting Nested Values**

```ts
// Backend returns this structure:
{
  id: 1,
  name: 'John Doe',
  employee: {
    id: 42,
    name: 'Samira Gonzales',
    department: 'Engineering'
  }
}
```

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

interface Employee {
  id: number
  name: string
  department: string
}

const form = useForm({
  fields: {
    employeeId: {
      type: FieldType.text,
      label: 'Employee ID',
      recordValue: (record: { employee: Employee }) => record.employee.id, // [!code highlight]
      // When form loads, modelValue will be: 42
    },
    employeeName: {
      type: FieldType.text,
      label: 'Employee Name',
      recordValue: (record: { employee: Employee }) => record.employee.name, // [!code highlight]
      // When form loads, modelValue will be: "Samira Gonzales"
    },
  }
})
</script>
```

**Example: Computed Values**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    fullName: {
      type: FieldType.text,
      label: 'Full Name',
      recordValue: (record) => `${record.firstName} ${record.lastName}`, // [!code highlight]
      // Combines first and last name
    },
    displayPrice: {
      type: FieldType.text,
      label: 'Price',
      recordValue: (record) => `$${(record.price / 100).toFixed(2)}`, // [!code highlight]
      // Converts cents to dollars
    },
  }
})
</script>
```

**Example: Array Mapping**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    tagIds: {
      type: FieldType.select,
      label: 'Tags',
      multiple: true,
      recordValue: (record) => record.tags.map((tag: any) => tag.id), // [!code highlight]
      // Extracts IDs from array of tag objects
      // Input: [{ id: 1, name: 'vue' }, { id: 2, name: 'typescript' }]
      // Output: [1, 2]
    },
  }
})
</script>
```

::: tip
`recordValue` is called when the form loads data (update mode) or when you manually set form data. It does NOT affect the data being submitted - use `parseModelValue` for that.
:::

### InterceptOptions

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `interceptOptions` | `(options: any[]) => unknown[]` | `undefined` | No |

The `interceptOptions` function intercepts and transforms options before they are assigned to the field's `options` attribute. This is useful when fetching options from an API (using the `url` attribute) and you need to filter, sort, or transform the data.

**Use Cases:**
- Filtering options based on criteria
- Sorting options
- Transforming option structures
- Adding computed properties to options

**Example: Filtering Active Items**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    employee: {
      type: FieldType.select,
      label: 'Assign to',
      url: 'employees/', // Fetches all employees from API
      optionLabel: 'name',
      optionValue: 'id',
      interceptOptions: (options) => { // [!code highlight:3]
        // Only show active employees
        return options.filter(emp => emp.status === 'active')
      },
    },
  }
})
</script>
```

**Example: Sorting Options**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    category: {
      type: FieldType.select,
      label: 'Category',
      url: 'categories/',
      optionLabel: 'name',
      optionValue: 'id',
      interceptOptions: (options) => { // [!code highlight:3]
        // Sort categories alphabetically
        return options.sort((a, b) => a.name.localeCompare(b.name))
      },
    },
  }
})
</script>
```

**Example: Adding Computed Properties**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    product: {
      type: FieldType.select,
      label: 'Product',
      url: 'products/',
      optionLabel: 'displayName',
      optionValue: 'id',
      interceptOptions: (options) => { // [!code highlight:6]
        // Add a computed display name
        return options.map(product => ({
          ...product,
          displayName: `${product.name} - $${product.price}`
        }))
      },
    },
  }
})
</script>
```

**Example: Complex Transformations**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    manager: {
      type: FieldType.select,
      label: 'Manager',
      url: 'users/',
      optionLabel: 'fullName',
      optionValue: 'id',
      interceptOptions: (options) => { // [!code highlight:9]
        return options
          .filter(user => user.role === 'manager')
          .filter(user => user.active)
          .sort((a, b) => a.lastName.localeCompare(b.lastName))
          .map(user => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName} (${user.department})`
          }))
      },
    },
  }
})
</script>
```

::: tip
`interceptOptions` is particularly useful when working with the `url` attribute, as it allows you to process API responses without modifying your backend.
:::

### ParseModelValue

| Property | Type | Default | Required |
|----------|------|---------|----------|
| `parseModelValue` | `(value: any) => unknown` | `undefined` | No |

The `parseModelValue` function transforms the field's `modelValue` before including it in the HTTP request payload. This is essential for data type conversions, formatting, or structural transformations.

**Use Cases:**
- Converting data types (string to number, etc.)
- Formatting dates or currency
- Transforming data structures
- Normalizing values

**Example: Type Conversion**

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    age: {
      type: FieldType.text,
      label: 'Age',
      modelValue: '25', // String from input
      parseModelValue: Number, // [!code highlight]
      // Sent to API as: 25 (number)
    },
    price: {
      type: FieldType.text,
      label: 'Price',
      modelValue: '99.99',
      parseModelValue: parseFloat, // [!code highlight]
      // Sent to API as: 99.99 (number)
    },
  }
})
</script>
```

**Example: Date Formatting**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    birthDate: {
      type: FieldType.datepicker,
      label: 'Birth Date',
      parseModelValue: (value) => { // [!code highlight:4]
        // Convert Date object to ISO string
        return value instanceof Date ? value.toISOString() : value
      },
    },
    scheduledAt: {
      type: FieldType.datepicker,
      label: 'Scheduled Date',
      parseModelValue: (value) => { // [!code highlight:4]
        // Format as YYYY-MM-DD
        return value instanceof Date ? value.toISOString().split('T')[0] : value
      },
    },
  }
})
</script>
```

**Example: Currency Conversion**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    price: {
      type: FieldType.text,
      label: 'Price ($)',
      modelValue: '99.99',
      parseModelValue: (value) => { // [!code highlight:4]
        // Convert dollars to cents for API
        return Math.round(parseFloat(value) * 100)
      },
      // Input: "99.99"
      // Sent to API: 9999 (cents)
    },
  }
})
</script>
```

**Example: Array Transformation**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    tags: {
      type: FieldType.select,
      label: 'Tags',
      multiple: true,
      modelValue: [1, 2, 3], // Array of IDs
      parseModelValue: (value) => { // [!code highlight:5]
        // Convert array to comma-separated string
        return Array.isArray(value) ? value.join(',') : value
      },
      // Input: [1, 2, 3]
      // Sent to API: "1,2,3"
    },
  }
})
</script>
```

**Example: Nested Object Transformation**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    employeeId: {
      type: FieldType.select,
      label: 'Employee',
      options: employees,
      optionLabel: 'name',
      // Note: no optionValue, so entire object is stored
      parseModelValue: (value) => { // [!code highlight:4]
        // Extract just the ID from the employee object
        return typeof value === 'object' ? value.id : value
      },
      // modelValue: { id: 42, name: 'John Doe', department: 'IT' }
      // Sent to API: 42
    },
  }
})
</script>
```

::: tip
Use `parseModelValue` when you need to transform how data is sent to the API, while keeping the field's display logic unchanged. For transforming data when loading (opposite direction), use `recordValue`.
:::

## Events

Fields support all native HTML input events as well as custom events from your UI wrapper. Events are defined using the `on[EventName]` pattern (e.g., `onFocus`, `onBlur`, `onClick`).

### Common Field Events

| Event | When Triggered | Use Case |
|-------|----------------|----------|
| `onFocus` | Field gains focus | Show hints, load related data |
| `onBlur` | Field loses focus | Validate, auto-format, save draft |
| `onChange` | Value changes | Track changes, dependent fields |
| `onClick` | Field is clicked | Custom interactions |
| `onInput` | User types | Real-time validation, character count |
| `onKeydown` | Key is pressed | Keyboard shortcuts, input restrictions |
| `onKeyup` | Key is released | Search suggestions, auto-complete |

### Basic Event Handling

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
      onFocus: (event) => { // [!code highlight:3]
        console.log('Email field focused')
      },
      onBlur: (event) => { // [!code highlight:4]
        // Validate email when user leaves the field
        console.log('Email field blurred')
      },
      onChange: (event) => { // [!code highlight:3]
        console.log('Email value changed:', event.target.value)
      },
    },
  }
})
</script>
```

### Advanced Event Examples

**Example: Auto-formatting on Blur**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    phoneNumber: {
      type: FieldType.text,
      label: 'Phone Number',
      placeholder: '(555) 123-4567',
      onBlur: () => { // [!code highlight:8]
        const value = form.fields.phoneNumber.modelValue
        if (value) {
          // Auto-format phone number
          const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
          form.fields.phoneNumber.modelValue = formatted
        }
      },
    },
  }
})
</script>
```

**Example: Dependent Fields**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    country: {
      type: FieldType.select,
      label: 'Country',
      options: ['USA', 'Canada', 'Mexico'],
      onChange: async () => { // [!code highlight:9]
        const country = form.fields.country.modelValue
        
        // Load states/provinces based on selected country
        const response = await fetch(`/api/states/${country}`)
        const states = await response.json()
        
        form.fields.state.options = states
        form.fields.state.modelValue = null // Reset state selection
      },
    },
    state: {
      type: FieldType.select,
      label: 'State/Province',
      options: [],
    },
  }
})
</script>
```

**Example: Character Counter**

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const charCount = ref(0)
const maxLength = 280

const form = useForm({
  fields: {
    description: {
      type: FieldType.textarea,
      label: 'Description',
      maxlength: maxLength,
      onInput: (event) => { // [!code highlight:3]
        charCount.value = event.target.value.length
      },
    },
  }
})
</script>

<template>
  <f-form v-bind="form" />
  <p>{{ charCount }} / {{ maxLength }} characters</p>
</template>
```

**Example: Real-time Search**

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const searchResults = ref([])

const form = useForm({
  fields: {
    search: {
      type: FieldType.text,
      label: 'Search',
      placeholder: 'Type to search...',
      debounceTime: 300,
    },
  }
})

// Watch for changes and perform search
watchDebounced(
  () => form.fields.search.modelValue,
  async (query) => {
    if (query && query.length >= 3) {
      const response = await fetch(`/api/search?q=${query}`)
      searchResults.value = await response.json()
    } else {
      searchResults.value = []
    }
  },
  { debounce: 300 }
)
</script>
```

**Example: Keyboard Shortcuts**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    notes: {
      type: FieldType.textarea,
      label: 'Notes',
      onKeydown: (event) => { // [!code highlight:11]
        // Save on Ctrl+S or Cmd+S
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault()
          console.log('Saving draft...')
          // Trigger save
        }
        
        // Clear on Ctrl+K or Cmd+K
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
          event.preventDefault()
          form.fields.notes.modelValue = ''
        }
      },
    },
  }
})
</script>
```

**Example: Focus Management**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name',
      onKeydown: (event) => { // [!code highlight:6]
        // Move to next field on Enter
        if (event.key === 'Enter') {
          event.preventDefault()
          document.querySelector('input[name="lastName"]')?.focus()
        }
      },
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name',
    },
  }
})
</script>
```

::: tip
Events receive the native browser event object as their first parameter. You can access the event target, prevent default behavior, and stop propagation as needed.
:::

::: warning
When using `onChange` with `debounceTime`, be aware that the event fires after the debounce delay, not immediately upon user input. Use `onInput` for immediate feedback.
:::