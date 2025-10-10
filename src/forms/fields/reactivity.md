## Reactivity

All field properties returned by `useForm` are fully reactive. This means you can use them with Vue's reactive APIs like `watch`, `computed`, `watchEffect`, and more. Changes to field values, errors, or any other properties automatically trigger reactivity.

### Reactive Field Properties

All field properties are reactive, including:
- `modelValue` - The current field value
- `errors` - Array of error messages
- `options` - List of available options (for select/radio/checkbox)
- `hidden` - Visibility state
- `disabled` - Disabled state
- Any custom properties you add

### Using Computed Properties

```vue
<script lang="ts" setup>
import { computed } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name',
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name',
    },
  }
})

// Compute full name from fields
const fullName = computed(() => { // [!code highlight:4]
  const first = form.fields.firstName.modelValue || ''
  const last = form.fields.lastName.modelValue || ''
  return `${first} ${last}`.trim()
})

// Check if form has any errors
const hasErrors = computed(() => { // [!code highlight:5]
  return Object.values(form.fields).some(field => field.errors.length > 0)
})

// Count filled fields
const filledFieldsCount = computed(() => { // [!code highlight:3]
  return Object.values(form.fields).filter(field => field.modelValue).length
})
</script>

<template>
  <f-form v-bind="form" />
  <p>Full Name: {{ fullName }}</p>
  <p>Form has errors: {{ hasErrors }}</p>
  <p>Filled fields: {{ filledFieldsCount }}</p>
</template>
```

### Watching Field Changes

```vue
<script lang="ts" setup>
import { watch } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
    },
    password: {
      type: FieldType.password,
      label: 'Password',
    },
  }
})

// Watch a single field value
watch(() => form.fields.email.modelValue, (newValue, oldValue) => { // [!code highlight:4]
  console.log('Email changed from', oldValue, 'to', newValue)
})

// Watch multiple fields
watch( // [!code highlight:11]
  [
    () => form.fields.email.modelValue,
    () => form.fields.password.modelValue,
  ],
  ([email, password]) => {
    console.log('Form values:', { email, password })
    // You could enable/disable a submit button based on these values
  }
)

// Watch errors
watch(() => form.fields.email.errors, (errors) => { // [!code highlight:5]
  if (errors.length > 0) {
    console.log('Email has errors:', errors)
  }
}, { deep: true })
</script>
```

### Conditional Field Display

```vue
<script lang="ts" setup>
import { computed } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    accountType: {
      type: FieldType.radio,
      label: 'Account Type',
      options: ['Personal', 'Business'],
    },
    companyName: {
      type: FieldType.text,
      label: 'Company Name',
    },
    taxId: {
      type: FieldType.text,
      label: 'Tax ID',
    },
  }
})

// Show/hide fields based on account type
watch(() => form.fields.accountType.modelValue, (type) => { // [!code highlight:8]
  const isBusiness = type === 'Business'
  
  // Toggle field visibility
  form.fields.companyName.hidden = !isBusiness
  form.fields.taxId.hidden = !isBusiness
})
</script>
```

### Dependent Field Updates

```vue
<script lang="ts" setup>
import { watch } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    quantity: {
      type: FieldType.text,
      label: 'Quantity',
      modelValue: 1,
    },
    pricePerUnit: {
      type: FieldType.text,
      label: 'Price per Unit',
      modelValue: 10,
    },
    total: {
      type: FieldType.text,
      label: 'Total Price',
      readonly: true,
    },
  }
})

// Auto-calculate total
watch( // [!code highlight:10]
  [
    () => form.fields.quantity.modelValue,
    () => form.fields.pricePerUnit.modelValue,
  ],
  ([qty, price]) => {
    const quantity = parseFloat(qty) || 0
    const pricePerUnit = parseFloat(price) || 0
    form.fields.total.modelValue = (quantity * pricePerUnit).toFixed(2)
  },
  { immediate: true }
)
</script>
```

### Real-time Validation

```vue
<script lang="ts" setup>
import { watch } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      debounceTime: 500,
    },
  }
})

// Check username availability
watch(() => form.fields.username.modelValue, async (username) => { // [!code highlight:13]
  if (!username || username.length < 3) {
    form.fields.username.errors = []
    return
  }
  
  try {
    const response = await fetch(`/api/check-username/${username}`)
    const data = await response.json()
    
    if (!data.available) {
      form.fields.username.errors = ['Username is already taken']
    } else {
      form.fields.username.errors = []
    }
  } catch (error) {
    console.error('Error checking username:', error)
  }
})
</script>
```

### Using watchEffect

```vue
<script lang="ts" setup>
import { watchEffect } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name',
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name',
    },
    displayName: {
      type: FieldType.text,
      label: 'Display Name',
    },
  }
})

// Auto-sync display name
watchEffect(() => { // [!code highlight:6]
  const first = form.fields.firstName.modelValue
  const last = form.fields.lastName.modelValue
  
  if (first || last) {
    form.fields.displayName.modelValue = `${first || ''} ${last || ''}`.trim()
  }
})
</script>
```

### Template Refs with Reactivity

```vue
<template>
  <f-form v-bind="form">
    <template #field-email="{ field }">
      <div>
        <input 
          v-model="field.modelValue"
          :class="{ 'error': field.errors.length > 0 }"
          @blur="validateEmail(field)"
        />
        <span v-if="field.errors.length" class="error-message">
          {{ field.errors[0] }}
        </span>
      </div>
    </template>
  </f-form>
</template>

<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email',
    },
  }
})

function validateEmail(field: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!field.modelValue) {
    field.errors = ['Email is required']
  } else if (!emailRegex.test(field.modelValue)) {
    field.errors = ['Invalid email format']
  } else {
    field.errors = []
  }
}
</script>
```

### Performance Considerations

::: tip
When watching deeply nested objects or arrays, use the `deep: true` option carefully as it can impact performance. Consider watching specific properties instead of entire objects when possible.
:::

```vue
<script lang="ts" setup>
// Good: Watch specific property
watch(() => form.fields.email.modelValue, (value) => {
  console.log(value)
})

// Less efficient: Watch entire field object
watch(() => form.fields.email, (field) => {
  console.log(field)
}, { deep: true })
</script>
```

::: info
All FancyCRUD fields use Vue 3's reactivity system under the hood, which means they benefit from all of Vue's reactivity optimizations and performance improvements.
:::
