# Form Buttons

Form buttons in FancyCRUD provide a convenient way to handle button configurations for your forms. You can customize the appearance, behavior, and functionality of form action buttons to match your application's needs.

## Overview

FancyCRUD forms come with two built-in buttons:

- **`main`**: The primary action button (Submit/Save)
- **`aux`**: The auxiliary action button (Cancel/Reset)

Both buttons are fully customizable and support all standard HTML button attributes, event handlers, and framework-specific props.

```vue
<script lang="ts" setup>
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  buttons: {
    main: {
      label: 'Save',
      class: 'btn-primary'
    },
    aux: {
      label: 'Cancel',
      class: 'btn-secondary'
    }
  }
})
</script> 
```

::: tip
All button properties are reactive and can be updated at any time using `form.buttons.main.property` or `form.buttons.aux.property`
:::

## Reactive Button Configuration

FancyCRUD supports two ways to define button configurations: as a static object or as a reactive function. Using the function syntax allows your button properties to be computed dynamically based on other reactive state.

### Static Button Configuration (Object Syntax)

The standard way to define buttons is as a plain object:

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
  buttons: {
    main: {
      label: 'Save',
      color: 'primary'
    },
    aux: {
      label: 'Cancel'
    }
  }
})
</script>
```

### Reactive Button Configuration (Function Syntax)

For more dynamic behavior, define buttons as a function that returns an object. This is especially powerful when button properties need to react to changes in your application state:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const isSaving = ref(false)
const userRole = ref('admin')
const hasChanges = ref(false)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  buttons: () => ({
    main: {
      label: isSaving.value ? 'Saving...' : 'Save',
      disabled: userRole.value === 'viewer' || !hasChanges.value,
      hidden: userRole.value === 'guest',
      color: hasChanges.value ? 'primary' : 'secondary'
    },
    aux: {
      label: isSaving.value ? 'Please wait...' : 'Cancel',
      disabled: isSaving.value,
      hidden: userRole.value === 'guest'
    }
  })
})

// When reactive values change, button properties automatically update
watch(hasChanges, (value) => {
  console.log('Button appearance updated based on changes:', value)
})
</script>
```

### Use Cases for Reactive Buttons

The function syntax is particularly useful for:

#### 1. **Permission-Based Buttons**

```vue
<script lang="ts" setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user, can } = useAuth()

const form = useForm({
  fields: {
    status: { type: FieldType.select, label: 'Status' }
  },
  settings: {
    url: 'orders/'
  },
  buttons: () => ({
    main: {
      label: can('approve') ? 'Approve Order' : 'Submit for Approval',
      hidden: !can('edit'),
      color: can('approve') ? 'success' : 'primary'
    },
    aux: {
      hidden: !can('cancel')
    }
  })
})
</script>
```

#### 2. **State-Dependent Button Behavior**

```vue
<script lang="ts" setup>
const isDraft = ref(true)
const isProcessing = ref(false)
const validationErrors = ref([])

const form = useForm({
  fields: {
    title: { type: FieldType.text, label: 'Title' }
  },
  buttons: () => ({
    main: {
      label: isDraft.value 
        ? '{{ Save Draft | Update Draft }}' 
        : '{{ Publish | Update }}',
      disabled: validationErrors.value.length > 0,
      isLoading: isProcessing.value,
      color: isDraft.value ? 'secondary' : 'primary',
      variant: isDraft.value ? 'outlined' : 'elevated'
    },
    aux: {
      label: isDraft.value ? 'Discard' : 'Unpublish',
      hidden: isProcessing.value
    }
  })
})
</script>
```

#### 3. **Form State Tracking**

```vue
<script lang="ts" setup>
const formState = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

const form = useForm({
  fields: {
    email: { type: FieldType.text, label: 'Email' }
  },
  buttons: () => ({
    main: {
      label: {
        idle: 'Submit',
        submitting: 'Submitting...',
        success: 'Submitted!',
        error: 'Try Again'
      }[formState.value],
      disabled: formState.value === 'submitting',
      color: {
        idle: 'primary',
        submitting: 'primary',
        success: 'success',
        error: 'error'
      }[formState.value],
      isLoading: formState.value === 'submitting'
    }
  })
})
</script>
```

#### 4. **Multi-Step Forms**

```vue
<script lang="ts" setup>
const currentStep = ref(1)
const totalSteps = ref(3)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  buttons: () => ({
    main: {
      label: currentStep.value === totalSteps.value ? 'Complete' : 'Next',
      color: currentStep.value === totalSteps.value ? 'success' : 'primary',
      prependIcon: currentStep.value === totalSteps.value ? 'mdi-check' : 'mdi-arrow-right'
    },
    aux: {
      label: currentStep.value === 1 ? 'Cancel' : 'Back',
      prependIcon: currentStep.value === 1 ? 'mdi-close' : 'mdi-arrow-left',
      onClick: () => {
        if (currentStep.value === 1) {
          form.reset()
        } else {
          currentStep.value--
        }
      }
    }
  })
})
</script>
```

::: tip When to Use Reactive Configuration
Use the function syntax when button properties need to react to:
- User authentication/authorization state
- Form validation state
- Multi-step form progress
- Loading/processing states
- Draft vs published states
- Real-time data changes
:::

::: info Mixing Approaches
You can mix static configuration with programmatic updates:
```js
// Static configuration
const form = useForm({
  buttons: {
    main: { label: 'Save' }
  }
})

// Later, update programmatically
form.buttons.main.disabled = computed(() => !isValid.value)
```
:::

::: warning Performance Consideration
The function is called reactively whenever any accessed reactive dependency changes. Keep the function lightweight and only access reactive values that should trigger button updates.
:::

## Class

| Name  | Type     | Default                              |
|-------|----------|--------------------------------------|
| class | `string` | (Depends on the selected UI wrapper) |

Add custom CSS classes to style your buttons. This works just like the native HTML button `class` attribute and is compatible with utility-first CSS frameworks like Tailwind CSS.

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
  buttons: {
    main: {
      label: 'Save',
      class: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    },
    aux: {
      label: 'Cancel',
      class: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
    }
  }
})
</script> 
```

::: tip Framework-Specific Classes
When using a UI wrapper (Vuetify, Element Plus, Quasar, etc.), you can also use framework-specific props:
```js
buttons: {
  main: {
    color: 'primary',      // Vuetify/Quasar
    variant: 'elevated',   // Vuetify
    size: 'large'          // Most frameworks
  }
}
```
:::


## Label

| Button | Name  | Type     | Default                                                  |
|--------|-------|----------|----------------------------------------------------------|
| main   | label | `string` | <code v-pre>"{{ Create record \| Save changes }}"</code> |
| aux    | label | `string` | <code v-pre>"Cancel"</code>                              |

The button label defines the text displayed on the button. You can use either a static string or dynamic placeholders that change based on the form mode.

### Static Labels

Use simple strings for labels that don't change:

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
  buttons: {
    main: {
      label: 'Save Changes'
    },
    aux: {
      label: 'Cancel'
    }
  }
})
</script> 
```

### Dynamic Labels

Use the <code v-pre>{{ create_label | update_label }}</code> syntax to display different labels based on the form mode:

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  },
  buttons: {
    main: {
      label: '{{ Create Record | Save Changes }}'
    },
    aux: {
      label: '{{ Reset | Cancel }}'
    }
  }
})
</script> 
```

- When `mode` is `FORM_MODE.create`: main button shows **"Create Record"**, aux shows **"Reset"**
- When `mode` is `FORM_MODE.update`: main button shows **"Save Changes"**, aux shows **"Cancel"**

### Programmatic Label Changes

You can also change labels dynamically:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  buttons: {
    main: {
      label: '{{ Create | Update }}'
    }
  }
})

// Change label dynamically
const saveAsDraft = () => {
  form.buttons.main.label = 'Save as Draft'
}

// Restore dynamic label
const restoreDynamicLabel = () => {
  form.buttons.main.label = '{{ Create | Update }}'
}
</script>
```

::: tip Icon Support
Most UI frameworks support adding icons to buttons:
```js
buttons: {
  main: {
    label: 'Save',
    prependIcon: 'mdi-content-save',  // Vuetify
    icon: 'save'                       // Quasar/Element Plus
  }
}
```
:::

## Loading

| Name      | Type      | Default |
|-----------|-----------|---------|
| isLoading | `boolean` | `false` |

The `isLoading` property displays a loading indicator on the button and typically disables it to prevent multiple submissions. FancyCRUD automatically manages this state during form submission.

### Automatic Loading State

FancyCRUD automatically sets `isLoading` to `true` when the form is being submitted and back to `false` when the operation completes:

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
  buttons: {
    main: {
      label: 'Save'
      // isLoading is automatically managed
    }
  }
})

// When user clicks submit:
// 1. form.buttons.main.isLoading becomes true
// 2. Button shows loading indicator and is disabled
// 3. Form submits to API
// 4. form.buttons.main.isLoading becomes false
// 5. Button returns to normal state
</script> 
```

### Manual Loading Control

You can manually control the loading state for custom operations:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Manually control loading state
const performCustomAction = async () => {
  form.buttons.main.isLoading = true
  
  try {
    await someAsyncOperation()
  } finally {
    form.buttons.main.isLoading = false
  }
}
</script>
```

### Independent Button Loading

You can set different loading states for each button:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Show loading on aux button for a different operation
const handleAuxAction = async () => {
  form.buttons.aux.isLoading = true
  
  try {
    await performAuxiliaryOperation()
  } finally {
    form.buttons.aux.isLoading = false
  }
}
</script>
```

::: tip Loading Indicators
The appearance of the loading indicator depends on your UI framework:
- **Vuetify**: Shows a circular progress indicator
- **Quasar**: Shows a spinner icon
- **Element Plus**: Shows a loading icon
- **Oruga**: Shows a loading spinner
:::

::: info
When a button is in loading state, it's automatically disabled to prevent multiple clicks.
:::

## Hidden

| Name   | Type      | Default |
|--------|-----------|---------|
| hidden | `boolean` | `false` |

The `hidden` property controls whether a button is rendered in the DOM. When set to `true`, the button will not be displayed or take up any space in the layout.

### Hide Auxiliary Button

A common use case is hiding the cancel/auxiliary button:

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
  buttons: {
    aux: {
      hidden: true  // Cancel button won't be rendered
    }
  }
})
</script> 
```

### Conditional Button Visibility

You can conditionally show or hide buttons based on user permissions or other state:

```vue
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const userRole = ref('viewer')

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Hide main button for viewers
form.buttons.main.hidden = computed(() => userRole.value === 'viewer')

// Or use it in buttons configuration
const form2 = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  buttons: {
    main: {
      hidden: userRole.value === 'viewer'
    }
  }
})
</script>
```

### Dynamic Visibility

Toggle button visibility programmatically:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const showAdvancedOptions = ref(false)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Toggle aux button visibility
const toggleAuxButton = () => {
  form.buttons.aux.hidden = !form.buttons.aux.hidden
}

// Show aux button only in update mode
watch(() => form.settings.mode, (mode) => {
  form.buttons.aux.hidden = mode === FORM_MODE.create
})
</script>
```

::: tip
Use `hidden` when you want the button completely removed from the DOM. If you only want to disable user interaction but keep the button visible, use the `disabled` property instead.
:::

::: warning Difference: Hidden vs Disabled
- **`hidden: true`**: Button is not rendered (no DOM element)
- **`disabled: true`**: Button is rendered but cannot be interacted with (still visible, usually grayed out)
:::

## Disabled

| Name     | Type      | Default |
|----------|-----------|---------|
| disabled | `boolean` | `false` |

The `disabled` property prevents user interaction with the button while keeping it visible in the UI. Disabled buttons are typically displayed with reduced opacity or a grayed-out appearance.

```vue
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const hasUnsavedChanges = ref(false)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  buttons: {
    main: {
      label: 'Save',
      disabled: false
    },
    aux: {
      label: 'Cancel',
      // Disable cancel button when there are no changes
      disabled: computed(() => !hasUnsavedChanges.value)
    }
  }
})

// Disable button based on validation
const isFormValid = computed(() => {
  return form.fields.name.modelValue?.length > 0
})

form.buttons.main.disabled = computed(() => !isFormValid.value)
</script>
```

::: info Automatic Disabling
Buttons are automatically disabled when `isLoading` is `true` to prevent multiple submissions.
:::

## Events

FancyCRUD buttons support all standard DOM events. You can attach event handlers just like you would with native HTML buttons.

### Common Events

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType } from '@fancy-crud/vue'

const clickCount = ref(0)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  },
  buttons: {
    main: {
      label: 'Save',
      onClick(event) {
        clickCount.value++
        console.log('Button clicked!', event)
      },
      onFocus() {
        console.log('Button focused')
      },
      onBlur() {
        console.log('Button lost focus')
      },
      onMouseEnter() {
        console.log('Mouse entered button')
      },
      onMouseLeave() {
        console.log('Mouse left button')
      }
    }
  }
})
</script>
```

### Custom Submit Behavior

Override the default submit behavior by providing a custom `onClick` handler:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: {
    url: 'users/'
  },
  buttons: {
    main: {
      label: 'Save',
      onClick: async () => {
        // Custom validation
        if (!form.fields.email.modelValue?.includes('@')) {
          alert('Please enter a valid email')
          return
        }
        
        // Custom pre-submit logic
        console.log('About to submit form...')
        
        // Call the default submit action
        await form.submit()
        
        // Custom post-submit logic
        console.log('Form submitted successfully!')
      }
    },
    aux: {
      label: 'Cancel',
      onClick: () => {
        // Custom cancel behavior
        if (confirm('Discard changes?')) {
          form.reset()
          // Navigate away or close dialog
        }
      }
    }
  }
})
</script>
```

### Async Event Handlers

Event handlers can be async functions:

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
  buttons: {
    main: {
      label: 'Save',
      onClick: async () => {
        form.buttons.main.isLoading = true
        
        try {
          // Perform async operation
          await someAsyncValidation()
          await form.submit()
          
          // Show success message
          console.log('Success!')
        } catch (error) {
          console.error('Error:', error)
        } finally {
          form.buttons.main.isLoading = false
        }
      }
    }
  }
})
</script>
```

::: tip Event Object
All event handlers receive the native DOM event as their first parameter, giving you access to `event.target`, `event.preventDefault()`, etc.
:::

::: warning Overriding Default Behavior
If you provide a custom `onClick` handler for the main button, you're responsible for calling `form.submit()` if you want the form to be submitted.
:::

## Framework-Specific Props

All button properties from your UI framework can be passed directly to button configurations:

### Vuetify Example

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
  buttons: {
    main: {
      label: 'Save',
      color: 'primary',
      variant: 'elevated',
      size: 'large',
      prependIcon: 'mdi-content-save',
      block: true
    },
    aux: {
      label: 'Cancel',
      color: 'secondary',
      variant: 'outlined',
      size: 'large',
      prependIcon: 'mdi-close'
    }
  }
})
</script>
```

### Quasar Example

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  buttons: {
    main: {
      label: 'Save',
      color: 'primary',
      icon: 'save',
      size: 'lg',
      rounded: true,
      unelevated: true
    },
    aux: {
      label: 'Cancel',
      color: 'grey',
      flat: true
    }
  }
})
</script>
```

### Element Plus Example

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  buttons: {
    main: {
      label: 'Save',
      type: 'primary',
      size: 'large',
      icon: 'Check',
      round: true
    },
    aux: {
      label: 'Cancel',
      type: 'default',
      plain: true
    }
  }
})
</script>
```

## Complete Example

Here's a comprehensive example showing all button features:

```vue
<template>
  <div class="card">
    <f-form v-bind="form" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

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
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  },
  buttons: {
    main: {
      // Label with mode-based dynamic text
      label: '{{ Create User | Update User }}',
      
      // Styling
      class: 'custom-submit-btn',
      color: 'primary',
      size: 'large',
      
      // State
      isLoading: false,
      disabled: computed(() => {
        // Disable if required fields are empty
        return !form.fields.name.modelValue || !form.fields.email.modelValue
      }),
      hidden: false,
      
      // Event handler
      onClick: async () => {
        console.log('Submitting form...')
        
        try {
          await form.submit()
          console.log('Form submitted successfully!')
        } catch (error) {
          console.error('Submission failed:', error)
        }
      }
    },
    aux: {
      // Static label
      label: 'Cancel',
      
      // Styling
      class: 'custom-cancel-btn',
      color: 'secondary',
      variant: 'outlined',
      
      // State
      hidden: false,
      
      // Event handler
      onClick: () => {
        if (confirm('Discard changes?')) {
          form.reset()
        }
      }
    }
  }
})

// Programmatically control buttons
const enableEditMode = () => {
  form.settings.mode = FORM_MODE.update
  form.buttons.main.label = 'Save Changes'
}

const showLoading = () => {
  form.buttons.main.isLoading = true
  setTimeout(() => {
    form.buttons.main.isLoading = false
  }, 2000)
}
</script>
```

## Programmatic Control

You can programmatically control all button properties after the form is created:

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Change button labels
form.buttons.main.label = 'Submit Now'
form.buttons.aux.label = 'Go Back'

// Control visibility
form.buttons.aux.hidden = true
form.buttons.main.hidden = false

// Control loading state
form.buttons.main.isLoading = true

// Control disabled state
form.buttons.main.disabled = true

// Change classes
form.buttons.main.class = 'btn-success btn-lg'

// Attach event handlers
form.buttons.main.onClick = () => {
  console.log('Custom click handler')
  form.submit()
}

// Change framework-specific props
form.buttons.main.color = 'error'
form.buttons.main.size = 'small'
</script>
```

## Default Values

Both buttons have sensible defaults:

### Main Button Defaults

```ts
{
  label: '{{ Create record | Save changes }}',
  isLoading: false,
  disabled: false,
  hidden: false,
  class: '',
  onClick: () => form.submit() // Default submit action
}
```

### Auxiliary Button Defaults

```ts
{
  label: 'Cancel',
  isLoading: false,
  disabled: false,
  hidden: false,
  class: '',
  onClick: () => form.reset() // Default reset action
}
```

::: tip
You only need to specify properties that differ from the defaults.
:::

## Next Steps

- Learn about [Form Settings](/forms/settings) to configure form behavior
- Explore [Form Commands](/forms/commands) for custom actions
- Check out [Form Components](/forms/components/) for layout customization
- Read about [Form Rules](/forms/rules) for validation
- Discover [Response Interceptors](/forms/response-interceptors) to handle API responses
