# Modal

The Modal (or Dialog) component in FancyCRUD tables controls how forms are displayed when creating or editing records. By default, FancyCRUD opens forms in a modal dialog, providing a clean, focused interface for data entry without leaving the table view.

## Overview

The modal component offers:

- **Automatic Management**: Opens/closes automatically when creating or editing records
- **Framework Integration**: Uses your UI framework's native dialog component (VDialog, ElDialog, QDialog, etc.)
- **Customizable Properties**: Configure size, behavior, appearance, and more
- **Form Integration**: Seamlessly displays your form within the modal
- **Responsive Design**: Adapts to different screen sizes
- **Loading States**: Shows loading indicators during data fetching
- **Framework-Specific Props**: Pass any props supported by your UI framework's dialog component

## How It Works

When you use FancyCRUD tables:

1. **User clicks "Create"** → Modal opens with empty form
2. **User clicks "Edit"** → Modal opens with form populated with row data
3. **User submits form** → Modal closes automatically on success
4. **User cancels** → Modal closes without changes

The modal visibility is controlled by `table.settings.displayFormDialog`, which is automatically managed by FancyCRUD but can also be controlled programmatically.

## Basic Usage

**Default Modal (No Configuration):**

```vue
<template>
  <f-table v-bind="table" />
</template>

<script lang="ts" setup>
import { useForm, useTable, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/'
    // No modal configuration - uses default behavior
  }
})
</script>
```

::: info Default Behavior
Without any configuration, FancyCRUD uses sensible defaults from your UI framework. The modal will:
- Open when clicking "Create" or "Edit"
- Close on successful form submission
- Close when clicking outside or pressing ESC
- Display your form inside a dialog container
:::

## Configuring Modal Properties

You can customize the modal by adding a `modal` property to your table settings. Any properties you pass will be forwarded to your UI framework's dialog component.

::: warning Modal vs Dialog Content
The `modal` property configures the **dialog container** (size, behavior, etc.), not the content inside. To customize the title, header, or body content, use the [`table-form` slot](#customizing-modal-content).
:::

### Basic Configuration

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {  // [!code highlight:3]
      width: '800px',
      persistent: true
    }
  }
})
</script>
```

### Reactive Modal Properties

Modal properties can be reactive by using the function syntax for settings. This allows the modal configuration to change dynamically based on application state:

```vue
<script lang="ts" setup>
import { useForm, useTable, FieldType } from '@fancy-crud/vue'
import { ref } from 'vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: { url: 'users/' }
})

const isLargeForm = ref(false)

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({  // [!code highlight:6]
    url: 'users/',
    modal: {
      width: isLargeForm.value ? '1000px' : '600px',
      persistent: true
    }
  })
})
</script>
```

## Framework-Specific Examples

Different UI frameworks support different modal/dialog properties. FancyCRUD passes all properties directly to the framework's component.

### Vuetify (VDialog)

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      width: '800px',           // Dialog width
      maxWidth: '90%',          // Max width (responsive)
      persistent: true,         // Don't close on outside click
      scrollable: true,         // Enable scrolling for long forms
      fullscreen: false,        // Fullscreen mode
      transition: 'dialog-bottom-transition', // Custom transition
      'overlay-opacity': 0.7,   // Backdrop opacity
      'close-on-back': false    // Don't close on browser back button
    }
  }
})
</script>
```

**Common Vuetify Properties:**
- `width`: Dialog width (string or number)
- `maxWidth`: Maximum width
- `fullscreen`: Make dialog fullscreen
- `persistent`: Don't close on outside click
- `scrollable`: Enable internal scrolling
- `transition`: Animation transition name
- `overlay-opacity`: Backdrop opacity (0-1)
- `close-on-back`: Close on browser back button

::: tip Vuetify Documentation
See [Vuetify Dialog documentation](https://vuetifyjs.com/en/components/dialogs/) for all available properties.
:::

### Element Plus (ElDialog)

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      width: '50%',            // Dialog width
      top: '5vh',              // Distance from top
      modal: true,             // Show backdrop
      closeOnClickModal: false,// Don't close on backdrop click
      closeOnPressEscape: true,// Close on ESC key
      showClose: true,         // Show close button
      draggable: false,        // Enable dragging
      center: false,           // Center content
      alignCenter: true,       // Center dialog on screen
      destroyOnClose: false,   // Destroy content on close
      fullscreen: false        // Fullscreen mode
    }
  }
})
</script>
```

**Common Element Plus Properties:**
- `width`: Dialog width (string or number)
- `fullscreen`: Fullscreen mode
- `top`: Distance from viewport top
- `modal`: Show modal backdrop
- `closeOnClickModal`: Close when clicking backdrop
- `closeOnPressEscape`: Close on ESC key
- `showClose`: Show close icon button
- `draggable`: Enable drag to move
- `center`: Center dialog content
- `alignCenter`: Center dialog on screen

::: tip Element Plus Documentation
See [Element Plus Dialog documentation](https://element-plus.org/en-US/component/dialog.html) for all available properties.
:::

### Quasar (QDialog)

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      persistent: true,          // Don't close on backdrop click
      maximized: false,          // Fullscreen mode
      fullWidth: false,          // Use full screen width
      fullHeight: false,         // Use full screen height
      position: 'standard',      // Position: standard, top, bottom, left, right
      seamless: false,           // No backdrop, inline with content
      transitionShow: 'scale',   // Show animation
      transitionHide: 'scale'    // Hide animation
    }
  }
})
</script>
```

**Common Quasar Properties:**
- `persistent`: Don't close on backdrop click
- `maximized`: Fullscreen mode
- `fullWidth`: Use full viewport width
- `fullHeight`: Use full viewport height
- `position`: Dialog position (standard, top, bottom, left, right)
- `seamless`: No backdrop
- `transitionShow`: Show animation name
- `transitionHide`: Hide animation name

::: tip Quasar Documentation
See [Quasar Dialog documentation](https://quasar.dev/vue-components/dialog) for all available properties.
:::

### Oruga UI (OModal)

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      width: 960,               // Width in pixels
      scroll: 'clip',           // Scroll behavior: clip, keep
      canCancel: true,          // Allow closing (boolean or array)
      animation: 'zoom-in',     // Animation name
      fullScreen: false,        // Fullscreen mode
      trapFocus: true,          // Trap focus inside modal
      autoFocus: true           // Auto focus first element
    }
  }
})
</script>
```

**Common Oruga Properties:**
- `width`: Modal width (number in pixels)
- `scroll`: Scroll behavior (clip, keep)
- `canCancel`: Allow cancel (boolean or ['escape', 'outside', 'button'])
- `animation`: Animation name
- `fullScreen`: Fullscreen mode
- `trapFocus`: Keep focus inside modal
- `autoFocus`: Auto focus first element

::: tip Oruga Documentation
See [Oruga Modal documentation](https://oruga.io/components/Modal.html) for all available properties.
:::

## Common Use Cases

### Larger Modal for Complex Forms

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      width: '1200px',
      maxWidth: '95%'
    }
  }
})
</script>
```

### Fullscreen Modal

```vue
<script lang="ts" setup>
// Vuetify
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      fullscreen: true,
      transition: 'dialog-bottom-transition'
    }
  }
})
</script>
```

### Responsive Modal Size

```vue
<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({  // [!code highlight:7]
    url: 'users/',
    modal: {
      fullscreen: mobile.value,  // Fullscreen on mobile
      width: mobile.value ? undefined : '800px',
      maxWidth: '100%'
    }
  })
})
</script>
```

### Prevent Accidental Closes

```vue
<script lang="ts" setup>
// Vuetify
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      persistent: true,             // Don't close on outside click
      'close-on-back': false        // Don't close on back button
    }
  }
})

// Element Plus
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      closeOnClickModal: false,     // Don't close on backdrop click
      closeOnPressEscape: false     // Don't close on ESC
    }
  }
})
</script>
```

### Conditional Modal Behavior

You can conditionally change modal properties based on application state:

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const requireConfirmation = ref(true)

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({  // [!code highlight:6]
    url: 'users/',
    modal: {
      persistent: requireConfirmation.value,  // Dynamic persistent
      width: '600px'
    }
  })
})
</script>
```

### Modal with Custom Transitions

```vue
<script lang="ts" setup>
// Vuetify - custom transitions
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      transition: 'scale-transition',
      width: '600px'
    }
  }
})

// Quasar - custom transitions
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      transitionShow: 'slide-up',
      transitionHide: 'slide-down'
    }
  }
})
</script>
```

## Programmatic Control

While the modal is automatically managed, you can control it programmatically when needed.

### Opening the Modal

```vue
<template>
  <div>
    <v-btn @click="openCreateModal" color="primary">
      Create User
    </v-btn>
    <v-btn @click="openEditModal(selectedUser)" color="info">
      Edit User
    </v-btn>
    <f-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { FORM_MODE } from '@fancy-crud/core'

const openCreateModal = () => {
  form.settings.mode = FORM_MODE.create
  table.settings.displayFormDialog = true  // [!code highlight]
}

const openEditModal = (user: any) => {
  form.settings.mode = FORM_MODE.update
  form.settings.lookupValue = user.id
  table.settings.displayFormDialog = true  // [!code highlight]
}
</script>
```

### Closing the Modal

```vue
<script lang="ts" setup>
const closeModal = () => {
  table.settings.displayFormDialog = false  // [!code highlight]
}

// Close after custom validation
const handleCustomSubmit = async () => {
  if (await customValidation()) {
    await form.submit()
    table.settings.displayFormDialog = false  // [!code highlight]
  }
}
</script>
```

### Watching Modal State

```vue
<script lang="ts" setup>
import { watch } from 'vue'

// Track when modal opens/closes
watch(() => table.settings.displayFormDialog, (isOpen) => {
  if (isOpen) {
    console.log('Modal opened')
    // Initialize something
  } else {
    console.log('Modal closed')
    // Cleanup
  }
})
</script>
```

## Customizing Modal Content

The `modal` property only configures the dialog container itself (size, position, behavior). To customize what appears **inside** the modal (title, header, form layout), use the `table-form` slot.

### Using the `table-form` Slot

You can completely customize what appears inside the modal using the `table-form` slot. This is where you would add titles, headers, custom layouts, etc.:

```vue
<template>
  <f-table v-bind="table">
    <template #table-form="{ form, id, onSuccess }">
      <v-card>
        <v-card-title class="bg-primary">
          <span class="text-h5">
            {{ form.settings.mode === FORM_MODE.create ? 'New User' : 'Edit User' }}
          </span>
        </v-card-title>
        
        <v-card-text class="pa-6">
          <f-form 
            v-bind="form" 
            :id="id" 
            @success="onSuccess"
          />
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn @click="table.settings.displayFormDialog = false">
            Cancel
          </v-btn>
          <v-btn 
            color="primary" 
            @click="form.submit()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </f-table>
</template>
```

### Custom Loading State

```vue
<template>
  <f-table v-bind="table">
    <template #table-form="{ form, id, onSuccess }">
      <v-card>
        <v-card-text>
          <div v-if="form.settings.loading" class="text-center py-8">
            <v-progress-circular indeterminate color="primary" size="64" />
            <p class="mt-4 text-subtitle-1">Loading data...</p>
          </div>
          <f-form 
            v-else
            v-bind="form" 
            :id="id" 
            @success="onSuccess"
          />
        </v-card-text>
      </v-card>
    </template>
  </f-table>
</template>
```

## Complete Example

Here's a comprehensive example showing various modal configurations:

```vue
<template>
  <div class="user-management">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>User Management</v-toolbar-title>
      <v-spacer />
      <v-btn @click="openCreateModal">
        <v-icon left>mdi-plus</v-icon>
        Add User
      </v-btn>
    </v-toolbar>

    <f-table v-bind="table">
      <!-- Custom modal content -->
      <template #table-form="{ form, id, onSuccess }">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon left :color="modalIcon.color">
              {{ modalIcon.icon }}
            </v-icon>
            <span>{{ modalTitle }}</span>
            <v-spacer />
            <v-btn 
              icon 
              @click="table.settings.displayFormDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-card-text class="pa-6">
            <!-- Loading state -->
            <div v-if="form.settings.loading" class="text-center py-12">
              <v-progress-circular 
                indeterminate 
                color="primary" 
                size="64"
              />
              <p class="mt-4 text-subtitle-1">Loading user data...</p>
            </div>

            <!-- Form -->
            <f-form 
              v-else
              v-bind="form" 
              :id="id" 
              @success="handleSuccess(onSuccess)"
            >
              <!-- Custom field slot if needed -->
              <template #field-email="{ field }">
                <v-text-field
                  v-model="field.model"
                  :label="field.label"
                  type="email"
                  prepend-icon="mdi-email"
                  :rules="[field.rules]"
                />
              </template>
            </f-form>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-4">
            <v-btn 
              @click="table.settings.displayFormDialog = false"
              :disabled="form.settings.loading"
            >
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn 
              color="primary" 
              @click="form.submit()"
              :loading="form.buttons.main.loading"
              :disabled="form.settings.loading"
            >
              {{ form.settings.mode === FORM_MODE.create ? 'Create' : 'Update' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </f-table>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useTable, FieldType } from '@fancy-crud/vue'
import { FORM_MODE } from '@fancy-crud/core'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useToast } from 'vue-toastification'

const { mobile } = useDisplay()
const toast = useToast()

// Form configuration
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name',
      required: true,
      rules: (value) => !!value || 'First name is required'
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name',
      required: true
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true,
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email'
        return true
      }
    },
    role: {
      type: FieldType.select,
      label: 'Role',
      options: ['admin', 'editor', 'viewer'],
      required: true
    },
    isActive: {
      type: FieldType.checkbox,
      label: 'Active'
    }
  },
  settings: {
    url: 'users/'
  }
})

// Table configuration
const table = useTable({
  form,
  columns: {
    id: {
      label: 'ID',
      width: '80px',
      sortable: true
    },
    firstName: {
      label: 'First Name',
      sortable: true
    },
    lastName: {
      label: 'Last Name',
      sortable: true
    },
    email: {
      label: 'Email',
      sortable: true
    },
    role: {
      label: 'Role',
      format: (value) => value.toUpperCase(),
      align: 'center'
    },
    isActive: {
      label: 'Status',
      format: (value) => value ? 'Active' : 'Inactive',
      align: 'center'
    },
    actions: {
      label: 'Actions',
      align: 'center'
    }
  },
  settings: () => ({  // [!code highlight:20]
    url: 'users/',
    
    // Modal configuration (responsive)
    modal: {
      // Fullscreen on mobile, fixed width on desktop
      fullscreen: mobile.value,
      width: mobile.value ? undefined : '800px',
      maxWidth: '95%',
      
      // Prevent accidental closes
      persistent: true,
      'close-on-back': false,
      
      // Smooth transition
      transition: 'dialog-bottom-transition',
      
      // Styling
      scrollable: true,
      'overlay-opacity': 0.5
    }
  })
})

// Computed properties for modal content (not modal config)
const modalTitle = computed(() => {
  return form.settings.mode === FORM_MODE.create 
    ? 'Create New User' 
    : 'Edit User'
})

const modalIcon = computed(() => {
  return form.settings.mode === FORM_MODE.create
    ? { icon: 'mdi-account-plus', color: 'success' }
    : { icon: 'mdi-account-edit', color: 'info' }
})

// Note: modalTitle and modalIcon are used in the slot above,
// not in the modal configuration

// Methods
const openCreateModal = () => {
  form.settings.mode = FORM_MODE.create
  table.settings.displayFormDialog = true
}

const handleSuccess = (onSuccess: () => void) => {
  onSuccess()
  toast.success(
    form.settings.mode === FORM_MODE.create 
      ? 'User created successfully!' 
      : 'User updated successfully!'
  )
}

// Watch modal state for analytics
watch(() => table.settings.displayFormDialog, (isOpen) => {
  if (isOpen) {
    // Track modal open event
    console.log('User form opened:', form.settings.mode)
  }
})
</script>
```

## Global Modal Configuration

You can set global defaults for all modals in your FancyCRUD configuration:

```typescript
// main.ts or config file
import { setDefaults } from '@fancy-crud/core'

setDefaults({
  modal: {
    width: '700px',
    maxWidth: '90%',
    persistent: true,
    scrollable: true
  }
})
```

These defaults will apply to all tables unless overridden in specific table settings.

## Best Practices

::: tip Modal Configuration
1. **Responsive Design**: Use `computed()` to make modal fullscreen on mobile devices
2. **Prevent Data Loss**: Set `persistent: true` for forms with user input
3. **Appropriate Size**: Choose widths that fit your form comfortably (600-800px typical)
4. **Loading States**: Always show clear loading indicators when fetching edit data
5. **Accessibility**: Keep `trapFocus` and `autoFocus` enabled for keyboard navigation
6. **Smooth Transitions**: Use appropriate animations for better UX
7. **Close Confirmation**: Consider warning users about unsaved changes before closing
8. **Global Defaults**: Set sensible defaults globally, customize per-table when needed
:::

::: warning Common Pitfalls
- ❌ **Too Small**: Modals under 500px make forms cramped
- ❌ **No Max Width**: Large screens can show overly wide modals
- ❌ **No Loading State**: Users don't know when data is being fetched
- ❌ **Allow Accidental Close**: Users lose form data by clicking outside
- ❌ **Static Configuration**: Not adapting to mobile/tablet screens
- ❌ **Hardcoded Titles**: Not updating title based on create/edit mode
- ❌ **Framework Mismatch**: Using wrong prop names for your UI framework
:::

## Troubleshooting

### Modal Not Opening

**Problem**: Clicking "Create" or "Edit" doesn't open the modal.

**Solutions**:
```vue
<script lang="ts" setup>
// Check that displayFormDialog is being set
watch(() => table.settings.displayFormDialog, (value) => {
  console.log('displayFormDialog changed to:', value)
})

// Verify the modal is rendered
// Check browser dev tools for the modal element

// Ensure you're using <f-table v-bind="table" />
// not individual props that might miss the modal config
</script>
```

### Modal Too Small/Large

**Problem**: Modal doesn't fit content or is too large.

**Solutions**:
```vue
<script lang="ts" setup>
// Set appropriate width
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      width: '800px',      // Fixed width
      maxWidth: '95%',     // Responsive max
      fullscreen: false    // Override if needed
    }
  }
})
</script>
```

### Modal Closes When Clicking Outside

**Problem**: Users accidentally close modal and lose form data.

**Solutions**:
```vue
<script lang="ts" setup>
// Vuetify
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      persistent: true  // [!code highlight]
    }
  }
})

// Element Plus
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      closeOnClickModal: false  // [!code highlight]
    }
  }
})
</script>
```

### Modal Properties Not Working

**Problem**: Modal properties are ignored.

**Solutions**:
1. **Verify Framework**: Ensure you're using the correct property names for your UI framework
2. **Check Syntax**: Property names might be camelCase or kebab-case
3. **Global Defaults**: Global defaults might override your settings
4. **Component Version**: Ensure your UI framework version supports the property

```vue
<script lang="ts" setup>
// ❌ Wrong - mixed framework props
modal: {
  fullscreen: true,        // Vuetify/Element Plus prop
  maximized: true          // Quasar prop
}

// ✅ Correct - consistent framework
modal: {
  fullscreen: true,        // Vuetify/Element Plus
  width: '800px'
}
</script>
```

### Modal Content Not Scrolling

**Problem**: Long forms are cut off in the modal.

**Solutions**:
```vue
<script lang="ts" setup>
// Vuetify
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    modal: {
      scrollable: true  // [!code highlight]
    }
  }
})

// Element Plus - usually scrolls automatically
// Quasar - adjust content height
</script>
```

## TypeScript Support

FancyCRUD modal configuration is fully typed. Your IDE will provide autocomplete for framework-specific properties based on your setup.

```typescript
import { useTable } from '@fancy-crud/vue'
import type { RawTableSettings } from '@fancy-crud/core'

// Settings are typed
const settings: RawTableSettings = {
  url: 'users/',
  modal: {
    // Your IDE will suggest framework-specific properties
    width: '800px',
    persistent: true
  }
}

const table = useTable({
  form,
  columns: { actions: {} },
  settings
})
```

## Next Steps

- [Table Settings](/tables/settings) - Learn about all table configuration options
- [Table Components](/tables/components) - Explore customizing table components
- [Form Components](/forms/components/) - Understand form customization
- [Custom Components](/tables/custom-components) - Build completely custom table layouts

---

**Related Sections:**
- [Display Form Dialog](/tables/settings#display-form-dialog) - Controlling modal visibility
- [Table Components](/tables/components) - Understanding `<f-table>` slots
- [Global Configuration](/guide/configuration) - Setting global defaults

