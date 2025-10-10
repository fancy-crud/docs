## Form Container (`<f-form>`)

The `<f-form>` component is the main form container that orchestrates all form functionality. It automatically integrates the header, body, and footer components, providing a complete form solution with minimal setup.

### When to Use

Use `<f-form>` when you want:
- **Quick setup**: Default form layout with header, fields, and buttons
- **Standard forms**: Common create/edit forms with typical layouts
- **Minimal configuration**: Let FancyCRUD handle the structure

For custom layouts or advanced styling, use individual components (`<f-form-header>`, `<f-form-body>`, `<f-form-footer>`).

### Props

| Name     | Description                                      | Type                 | Required | Default |
|----------|--------------------------------------------------|----------------------|----------|---------|
| id       | Form ID as symbol value                          | `symbol`             | Yes      | -       |
| fields   | Normalized fields to render in the form          | `NormalizedFields`   | Yes      | -       |
| settings | Normalized settings to manage form behavior      | `NormalizedSettings` | Yes      | -       |
| buttons  | Normalized buttons to display in the form footer | `NormalizedButtons`  | Yes      | -       |

::: tip Props Shortcut
Instead of passing each prop individually, use `v-bind="form"` to pass all props at once:
```vue
<f-form v-bind="form" />
```
:::

### Basic Usage

```vue
<template>
  <div class="card">
    <!-- Short syntax (recommended) -->
    <f-form v-bind="form" />
    
    <!-- Expanded syntax -->
    <!-- <f-form
      :id="form.id"
      :fields="form.fields"
      :settings="form.settings"
      :buttons="form.buttons"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name',
      required: true
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true
    },
    bio: {
      type: FieldType.textarea,
      label: 'Bio'
    }
  },
  settings: {
    url: 'users/',
    title: '{{ Create User | Edit User }}'
  }
})
</script>
```

### Events

The `<f-form>` component emits events for form lifecycle hooks:

| Name     | Description                                          | Payload Type          | When Emitted              |
|----------|------------------------------------------------------|-----------------------|---------------------------|
| @success | Emitted when form submission succeeds                | `(response: any) => void` | After successful API call |
| @error   | Emitted when form submission fails                   | `(error?: any) => void`   | After failed API call     |

#### Handling Events

```vue
<template>
  <f-form 
    v-bind="form"
    @success="onSuccess"
    @error="onError"
  />
</template>

<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

const onSuccess = (response: any) => {
  toast.success('User saved successfully!')
  router.push(`/users/${response.data.id}`)
}

const onError = (error: any) => {
  console.error('Form submission failed:', error)
  toast.error('Failed to save user')
}
</script>
```

### Slots

The `<f-form>` component provides access to all slots from its child components:

| Slot Name                         | Description                                    | Scope Properties              | From Component      |
|-----------------------------------|------------------------------------------------|-------------------------------|---------------------|
| `form-header`                     | Customize the entire header section            | `{ formModeTitle: string }`   | `<f-form-header>`   |
| `before-field-[fieldKey]`         | Add content before a specific field            | `{ field: NormalizedField }`  | `<f-form-body>`     |
| `field-[fieldKey]`                | Override the default field rendering           | `{ field: NormalizedField }`  | `<f-form-body>`     |
| `after-field-[fieldKey]`          | Add content after a specific field             | `{ field: NormalizedField }`  | `<f-form-body>`     |
| `form-footer`                     | Customize the entire footer section            | `{ mainButton, auxButton, ... }` | `<f-form-footer>`   |

#### Customizing the Header

```vue
<template>
  <f-form v-bind="form">
    <template #form-header="{ formModeTitle }">
      <div class="custom-header">
        <h1 class="text-3xl font-bold">{{ formModeTitle }}</h1>
        <p class="text-gray-500">Fill out the form below</p>
      </div>
    </template>
  </f-form>
</template>
```

#### Customizing Fields

```vue
<template>
  <f-form v-bind="form">
    <!-- Add content before a field -->
    <template #before-field-email="{ field }">
      <div class="info-box">
        <span>ℹ️ We'll never share your email</span>
      </div>
    </template>
    
    <!-- Completely replace a field -->
    <template #field-username="{ field }">
      <div class="custom-field">
        <label>{{ field.label }}</label>
        <input
          v-model="field.modelValue"
          :placeholder="field.placeholder"
          class="custom-input"
        />
        <button @click="checkAvailability">Check Availability</button>
      </div>
    </template>
    
    <!-- Add content after a field -->
    <template #after-field-password>
      <div class="password-strength">
        <span>Password strength: Strong</span>
      </div>
    </template>
  </f-form>
</template>

<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    username: { type: FieldType.text, label: 'Username' },
    email: { type: FieldType.text, label: 'Email' },
    password: { type: FieldType.password, label: 'Password' }
  },
  settings: {
    url: 'users/'
  }
})

const checkAvailability = () => {
  console.log('Checking username availability...')
}
</script>
```

#### Customizing the Footer

```vue
<template>
  <f-form v-bind="form">
    <template #form-footer="{ mainButton, auxButton, onMainClick, onAuxClick }">
      <div class="custom-footer">
        <button @click="onAuxClick" class="secondary-btn">
          {{ auxButton.label }}
        </button>
        
        <div class="actions-right">
          <button @click="saveAsDraft" class="draft-btn">
            Save as Draft
          </button>
          <button
            @click="onMainClick"
            :disabled="mainButton.disabled"
            class="primary-btn"
          >
            {{ mainButton.label }}
          </button>
        </div>
      </div>
    </template>
  </f-form>
</template>

<script lang="ts" setup>
const saveAsDraft = () => {
  console.log('Saving as draft...')
}
</script>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
}

.actions-right {
  display: flex;
  gap: 0.5rem;
}
</style>
```

### Complete Example

Here's a comprehensive example showing multiple customizations:

```vue
<template>
  <div class="page-container">
    <f-form
      v-bind="form"
      @success="handleSuccess"
      @error="handleError"
    >
      <!-- Custom Header -->
      <template #form-header="{ formModeTitle }">
        <div class="custom-header">
          <h1>{{ formModeTitle }}</h1>
          <p class="subtitle">Please provide accurate information</p>
        </div>
      </template>
      
      <!-- Add help text before email field -->
      <template #before-field-email>
        <div class="help-text">
          💡 Use your work email for business accounts
        </div>
      </template>
      
      <!-- Custom phone field with formatting -->
      <template #field-phone="{ field }">
        <div class="custom-field">
          <label>{{ field.label }}</label>
          <input
            v-model="field.modelValue"
            @input="formatPhone"
            placeholder="(555) 123-4567"
            class="phone-input"
          />
        </div>
      </template>
      
      <!-- Add terms acceptance after last field -->
      <template #after-field-bio>
        <div class="terms">
          <label>
            <input type="checkbox" v-model="acceptTerms" />
            <span>I accept the terms and conditions</span>
          </label>
        </div>
      </template>
      
      <!-- Custom Footer with additional actions -->
      <template #form-footer="{ mainButton, auxButton, onMainClick, onAuxClick, isMainButtonDisabled }">
        <div class="footer-actions">
          <button @click="onAuxClick" class="btn-cancel">
            {{ auxButton.label }}
          </button>
          
          <div class="right-actions">
            <button @click="resetForm" class="btn-reset">
              Reset Form
            </button>
            <button
              @click="onMainClick"
              :disabled="isMainButtonDisabled || !acceptTerms"
              class="btn-submit"
            >
              {{ mainButton.label }}
            </button>
          </div>
        </div>
      </template>
    </f-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const acceptTerms = ref(false)

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Full Name',
      required: true
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true
    },
    phone: {
      type: FieldType.text,
      label: 'Phone Number'
    },
    bio: {
      type: FieldType.textarea,
      label: 'Bio'
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create,
    title: '{{ Create Account | Update Profile }}'
  }
})

const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '')
  const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  form.fields.phone.modelValue = formatted
}

const resetForm = () => {
  form.reset()
  acceptTerms.value = false
}

const handleSuccess = (response: any) => {
  toast.success('Account created successfully!')
  router.push('/dashboard')
}

const handleError = (error: any) => {
  toast.error('Failed to create account. Please try again.')
}
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-header {
  text-align: center;
  margin-bottom: 2rem;
}

.custom-header h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
}

.help-text {
  padding: 0.75rem;
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  margin-bottom: 1rem;
}

.custom-field {
  margin-bottom: 1rem;
}

.custom-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.phone-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.terms {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  margin-top: 1rem;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e5e5;
}

.right-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-cancel,
.btn-reset {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  padding: 0.5rem 1.5rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

### Best Practices

::: tip Component Usage Tips
1. **Use `v-bind="form"`**: Simplifies prop passing and keeps code clean
2. **Leverage Slots**: Customize only what you need; let FancyCRUD handle the rest
3. **Handle Events**: Always implement `@success` and `@error` handlers
4. **Validate Before Submit**: Use `isMainButtonDisabled` to prevent invalid submissions
5. **Keep It Simple**: Use `<f-form>` for standard layouts; use individual components only when needed
:::

::: warning Common Pitfalls
- **Don't override all slots**: You'll lose FancyCRUD's built-in functionality
- **Remember field keys**: Slot names must match your field keys exactly
- **Handle errors gracefully**: Always provide error feedback to users
:::

### Next Steps

- Learn about [Form Header Component](#form-header) for header customization
- Explore [Form Body Component](#form-body) for field layout control
- Check out [Form Footer Component](#form-footer) for button customization
