# Table Settings

Table settings allow you to customize the behavior and appearance of your tables in FancyCRUD.

## URL

| Name | Type     | Default |
|------|----------|---------|
| url  | `string` |         |

The `url` property is the API endpoint where the table will fetch its data. This property specifies the server endpoint responsible for providing the list of records to display in the table.

```vue
<script lang="ts" setup>
import { useForm, useTable } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
    email: { type: 'text', label: 'Email' },
  },
  settings: {
    url: 'users/'
  }
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
  },
  settings: {
    url: 'users/'  // Endpoint to fetch table data
  }
})
</script>
```

::: tip
The table will automatically make GET requests to this endpoint with pagination and filter parameters.
:::

## Lookup Field

| Name        | Type     | Default |
|-------------|----------|---------|
| lookupField | `string` | `"id"`  |

The `lookupField` is the property name used to identify individual records in the table. This is used when performing operations like edit or delete on a specific row.

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    employee_id: { label: 'Employee ID' },
    name: { label: 'Name' },
  },
  settings: {
    url: 'employees/',
    lookupField: 'employee_id'  // Use employee_id instead of id
  }
})
</script>
```

When you click edit on a row with `employee_id: 123`, FancyCRUD will:
1. Set `form.settings.lookupValue = 123`
2. Make a request to `employees/123/` to load the record

::: tip
By default, FancyCRUD uses `id` as the lookup field, which works for most cases. Only change this if your API uses a different identifier field.
:::

## Skip Delete Confirmation

| Name                   | Type      | Default |
|------------------------|-----------|---------|
| skipDeleteConfirmation | `boolean` | `false` |

A boolean that determines whether to skip the delete confirmation dialog when deleting a record. When set to `true`, records will be deleted immediately without asking for confirmation.

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
  },
  settings: {
    url: 'users/',
    skipDeleteConfirmation: true  // Delete without confirmation
  }
})
</script>
```

::: warning
Be careful when enabling this setting, as users won't be able to confirm before deleting records.
:::

## Display Form Dialog

| Name              | Type      | Default |
|-------------------|-----------|---------|
| displayFormDialog | `boolean` | `false` |

A boolean that controls the visibility of the form dialog. This is typically managed internally by FancyCRUD when you click the create or edit buttons.

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/',
    displayFormDialog: false  // Initially hidden
  }
})

// Open the form dialog programmatically
const openFormDialog = () => {
  table.settings.displayFormDialog = true
}
</script>

<template>
  <div>
    <f-table v-bind="table" />
    <v-btn @click="openFormDialog">Open Form Manually</v-btn>
  </div>
</template>
```

::: tip
You usually don't need to set this manually. FancyCRUD automatically manages this when you click the "Create" or "Edit" buttons.
:::

## Display Confirmation Dialog

| Name                      | Type      | Default |
|---------------------------|-----------|---------|
| displayConfirmationDialog | `boolean` | `false` |

A boolean that controls the visibility of the delete confirmation dialog. This is managed internally by FancyCRUD when you click the delete button.

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/',
    displayConfirmationDialog: false  // Initially hidden
  }
})
</script>
```

::: tip
This is automatically managed by FancyCRUD. It's set to `true` when you click delete (unless `skipDeleteConfirmation` is `true`), and `false` when you confirm or cancel.
:::

## Row To Delete

| Name        | Type           | Default |
|-------------|----------------|---------|
| rowToDelete | `Row \| null`  | `null`  |

Stores the reference to the row that is about to be deleted. This is used internally by FancyCRUD to track which record should be deleted when the user confirms the delete action.

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/',
    rowToDelete: null  // No row selected for deletion
  }
})

// Access the row being deleted
watch(() => table.settings.rowToDelete, (row) => {
  if (row) {
    console.log('About to delete:', row)
  }
})
</script>
```

::: tip
This is automatically managed by FancyCRUD when you click the delete button. You typically don't need to modify this manually.
:::

## Complete Example

Here's a complete example showing all table settings:

```vue
<script lang="ts" setup>
import { useForm, useTable } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
    email: { type: 'text', label: 'Email' },
    status: { type: 'select', label: 'Status' },
  },
  settings: {
    url: 'users/'
  }
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
    status: { label: 'Status' },
  },
  settings: {
    url: 'users/',                    // API endpoint
    lookupField: 'id',                 // Field to identify records
    skipDeleteConfirmation: false,     // Show confirmation dialog
    displayFormDialog: false,          // Form dialog initially hidden
    displayConfirmationDialog: false,  // Delete dialog initially hidden
    rowToDelete: null,                 // No row selected for deletion
  }
})
</script>

<template>
  <f-table v-bind="table" />
</template>
```

## Programmatic Control

You can programmatically control table settings:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/',
  }
})

// Open the form dialog to create a new record
const createNew = () => {
  table.settings.displayFormDialog = true
}

// Close the form dialog
const closeForm = () => {
  table.settings.displayFormDialog = false
}

// Delete without confirmation
const forceDelete = (row: any) => {
  table.settings.rowToDelete = row
  table.settings.skipDeleteConfirmation = true
  table.buttons.remove.onClick(row)
}
</script>

<template>
  <div>
    <v-btn @click="createNew">Create New User</v-btn>
    <f-table v-bind="table">
      <template #column-actions-append="{ row }">
        <v-btn
          icon="mdi-delete-forever"
          size="small"
          color="error"
          @click="forceDelete(row)"
        >
          Force Delete
        </v-btn>
      </template>
    </f-table>
  </div>
</template>
```

## Default Values

All table settings have sensible defaults:

```ts
{
  lookupField: 'id',
  skipDeleteConfirmation: false,
  displayFormDialog: false,
  displayConfirmationDialog: false,
  rowToDelete: null,
}
```

You only need to specify settings that differ from the defaults.

## Next Steps

- Learn about [Table Columns](/tables/columns) to customize what data is displayed
- Explore [Table Buttons](/tables/buttons) to customize action buttons
- Check out [Table Pagination](/tables/pagination) for pagination configuration
- Read about [Table List](/tables/list) for data fetching options

