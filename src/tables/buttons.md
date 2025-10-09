# Table Buttons

FancyCRUD tables provide built-in buttons for common operations and allow you to customize their behavior and appearance. You can configure four default buttons (`add`, `edit`, `remove`, `dump`) and add custom buttons.

## Default Buttons

Tables come with four built-in button types:

- **`add`** - Opens the form dialog to create a new record
- **`edit`** - Opens the form dialog to edit an existing record
- **`remove`** - Deletes a record (with confirmation dialog by default)
- **`dump`** - Exports/dumps table data

```vue
<script lang="ts" setup>
import { useForm, useTable } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
    email: { type: 'text', label: 'Email' },
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      label: 'Create User',
    },
    edit: {
      label: 'Edit',
    },
    remove: {
      label: 'Delete',
    },
    dump: {
      label: 'Export',
    },
  },
})
</script>

<template>
  <f-table v-bind="table" />
</template>
```

## Button Properties

### Label

| Button | Name  | Type     | Default    |
|--------|-------|----------|------------|
| add    | label | `string` | `"Create"` |
| edit   | label | `string` | `"Edit"`   |
| remove | label | `string` | `"Delete"` |
| dump   | label | `string` | `"Export"` |

The button label is the text displayed on the button:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      label: 'Add New User',
    },
    edit: {
      label: 'Modify',
    },
    remove: {
      label: 'Remove',
    },
  },
})
</script>
```

### Class

| Name  | Type     | Default                              |
|-------|----------|--------------------------------------|
| class | `string` | (Depends on the selected UI wrapper) |

Add custom CSS classes to buttons:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      class: 'bg-blue-500 hover:bg-blue-700',
    },
    remove: {
      class: 'bg-red-500 hover:bg-red-700',
    },
  },
})
</script>
```

### Loading State

| Name      | Type      | Default |
|-----------|-----------|---------|
| isLoading | `boolean` | `false` |

Show a loading indicator on buttons during async operations:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      isLoading: false, // Set to true to show loading state
    },
  },
})

// Control loading state programmatically
const exportData = async () => {
  table.buttons.dump.isLoading = true
  try {
    await performExport()
  } finally {
    table.buttons.dump.isLoading = false
  }
}
</script>
```

### Hidden

| Name   | Type      | Default |
|--------|-----------|---------|
| hidden | `boolean` | `false` |

Hide buttons from the UI:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      hidden: false, // Show add button
    },
    edit: {
      hidden: false, // Show edit button
    },
    remove: {
      hidden: true, // Hide delete button
    },
    dump: {
      hidden: true, // Hide export button
    },
  },
})
</script>
```

::: tip
You can conditionally hide buttons based on user permissions or other conditions:
```ts
buttons: {
  remove: {
    hidden: !currentUser.isAdmin
  }
}
```
:::

## Button Events

### Add Button onClick

The `add` button opens the form dialog in create mode:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      onClick: () => {
        console.log('Creating new record')
        // Custom logic before opening form
        // The default behavior (opening form dialog) still executes
      },
    },
  },
})
</script>
```

### Edit Button onClick

The `edit` button receives the row data as a parameter:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    edit: {
      onClick: (row) => {
        console.log('Editing:', row)
        // Custom logic before opening edit form
      },
    },
  },
})
</script>
```

### Remove Button onClick

The `remove` button receives the row data and triggers deletion:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    remove: {
      onClick: (row) => {
        console.log('Deleting:', row)
        // Custom logic before/instead of deletion
      },
    },
  },
})
</script>
```

### Dump Button onClick

The `dump` button can be used for exporting data:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    dump: {
      onClick: async () => {
        table.buttons.dump.isLoading = true
        try {
          const response = await axios.get('users/export')
          downloadFile(response.data)
        } finally {
          table.buttons.dump.isLoading = false
        }
      },
    },
  },
})
</script>
```

## Custom Buttons

You can add custom buttons beyond the default ones:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
  buttons: {
    // Default buttons
    add: { label: 'Create' },
    edit: { label: 'Edit' },
    remove: { label: 'Delete' },
    
    // Custom buttons
    archive: {
      label: 'Archive',
      class: 'btn-warning',
      onClick: (row) => {
        console.log('Archiving:', row)
      },
    },
    duplicate: {
      label: 'Duplicate',
      onClick: (row) => {
        console.log('Duplicating:', row)
      },
    },
  },
})
</script>
```

Then use them in your template with custom slots:

```vue
<template>
  <f-table v-bind="table">
    <template #column-actions-append="{ row }">
      <v-btn
        v-bind="table.buttons.archive"
        @click="table.buttons.archive.onClick(row)"
      >
        {{ table.buttons.archive.label }}
      </v-btn>
      
      <v-btn
        v-bind="table.buttons.duplicate"
        @click="table.buttons.duplicate.onClick(row)"
      >
        {{ table.buttons.duplicate.label }}
      </v-btn>
    </template>
  </f-table>
</template>
```

## Programmatic Button Control

You can control buttons programmatically:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: { url: 'users/' },
})

// Call button actions programmatically
const createNewUser = () => {
  table.buttons.add.onClick()
}

const editUser = (user: any) => {
  table.buttons.edit.onClick(user)
}

const deleteUser = (user: any) => {
  table.buttons.remove.onClick(user)
}

// Toggle button visibility
const toggleDeleteButton = () => {
  table.buttons.remove.hidden = !table.buttons.remove.hidden
}

// Change button labels dynamically
const changeButtonLabel = () => {
  table.buttons.add.label = 'Add New Record'
}
</script>

<template>
  <div>
    <v-btn @click="createNewUser">Trigger Add</v-btn>
    <v-btn @click="toggleDeleteButton">Toggle Delete Button</v-btn>
    <v-btn @click="changeButtonLabel">Change Add Label</v-btn>
    <f-table v-bind="table" />
  </div>
</template>
```

## Complete Example

Here's a complete example with all button configurations:

```vue
<script lang="ts" setup>
import { useForm, useTable } from '@fancy-crud/vue'
import axios from 'axios'

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
    email: { type: 'text', label: 'Email' },
    status: { type: 'select', label: 'Status' },
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
    status: { label: 'Status' },
  },
  settings: { url: 'users/' },
  buttons: {
    add: {
      label: 'Create User',
      class: 'btn-primary',
      hidden: false,
      onClick: () => {
        console.log('Opening create form')
      },
    },
    edit: {
      label: 'Edit User',
      class: 'btn-secondary',
      hidden: false,
      onClick: (row) => {
        console.log('Editing user:', row)
      },
    },
    remove: {
      label: 'Delete User',
      class: 'btn-danger',
      hidden: false,
      onClick: (row) => {
        console.log('Deleting user:', row)
      },
    },
    dump: {
      label: 'Export Users',
      class: 'btn-info',
      hidden: false,
      isLoading: false,
      onClick: async () => {
        table.buttons.dump.isLoading = true
        try {
          const response = await axios.get('users/export')
          // Handle export
          console.log('Exported:', response.data)
        } finally {
          table.buttons.dump.isLoading = false
        }
      },
    },
    // Custom button
    sendEmail: {
      label: 'Send Email',
      class: 'btn-success',
      hidden: false,
      onClick: (row) => {
        console.log('Sending email to:', row.email)
      },
    },
  },
})
</script>

<template>
  <f-table v-bind="table">
    <!-- Custom button in actions column -->
    <template #column-actions-append="{ row }">
      <v-btn
        v-if="!table.buttons.sendEmail.hidden"
        :class="table.buttons.sendEmail.class"
        @click="table.buttons.sendEmail.onClick(row)"
      >
        {{ table.buttons.sendEmail.label }}
      </v-btn>
    </template>
  </f-table>
</template>
```

## Default Button Behavior

### Add Button
- Opens the form dialog
- Sets form mode to `FORM_MODE.create`
- Clears any existing form data
- Sets `table.settings.displayFormDialog = true`

### Edit Button
- Opens the form dialog
- Sets form mode to `FORM_MODE.update`
- Loads the selected row data into the form
- Sets `form.settings.lookupValue` to the row's lookup field value
- Sets `table.settings.displayFormDialog = true`

### Remove Button
- Shows confirmation dialog (unless `skipDeleteConfirmation` is `true`)
- Sets `table.settings.rowToDelete` to the selected row
- Executes `DeleteRecordCommand` on confirmation
- Refreshes table data after successful deletion

### Dump Button
- No default behavior (requires custom implementation)
- Typically used for exporting data

## Best Practices

### 1. **Use Hidden Instead of Conditional Rendering**

```ts
// ✅ Good - Dynamic visibility
buttons: {
  remove: {
    hidden: !userHasPermission('delete')
  }
}

// ❌ Avoid - Causes issues with FancyCRUD
// Don't conditionally define buttons
```

### 2. **Handle Loading States**

```ts
buttons: {
  dump: {
    onClick: async () => {
      table.buttons.dump.isLoading = true
      try {
        await performExport()
      } finally {
        table.buttons.dump.isLoading = false
      }
    }
  }
}
```

### 3. **Use Custom Buttons for Special Actions**

```ts
buttons: {
  // Keep default buttons
  add: { label: 'Create' },
  edit: { label: 'Edit' },
  remove: { label: 'Delete' },
  
  // Add custom buttons for specific needs
  approve: {
    label: 'Approve',
    onClick: (row) => approveRecord(row)
  }
}
```

### 4. **Preserve Default Behavior**

When overriding `onClick`, the default behavior still executes. To prevent this, you need to handle the complete flow:

```ts
buttons: {
  edit: {
    onClick: (row) => {
      // Your custom logic here
      // Default behavior (opening form) will still execute after this
      console.log('Custom logic before edit')
    }
  }
}
```

## Next Steps

- Learn about [Table Settings](/tables/settings) for configuring table behavior
- Explore [Custom Components](/tables/custom-components) to customize button rendering
- Check out [Table Commands](/tables/commands) for programmatic control

