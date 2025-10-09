# Table Components

FancyCRUD provides several components to build and customize tables. These components can be imported from `@fancy-crud/vue` and used individually or together.

```vue
<script lang="ts" setup>
import { 
  FTable, 
  FTableBody, 
  FTableFooter, 
  FTableHeaderActions,
  FTableRowActions,
  FDeleteConfirmationModal 
} from '@fancy-crud/vue'
</script>
```

## FTable

The main table container that orchestrates all table functionality. This is the primary component you'll use in most cases.

### Props

| Name         | Description                                    | Type                         | Required |
|--------------|------------------------------------------------|------------------------------|----------|
| id           | Table ID as symbol value                       | `symbol`                     | Yes      |
| columns      | Column definitions                             | `ObjectWithNormalizedColumns`| Yes      |
| form         | Form configuration for create/edit operations  | `BaseTableForm`              | Yes      |
| settings     | Table settings (URL, lookup field, etc.)       | `NormalizedTableSettings`    | Yes      |
| pagination   | Pagination configuration                       | `NormalizedTablePagination`  | Yes      |
| filterParams | Filter parameters for data fetching            | `NormalizedTableFilters`     | Yes      |
| buttons      | Button configurations (add, edit, remove, etc.)| `NormalizedTableButtons`     | Yes      |
| list         | List data and fetching methods                 | `NormalizedTableList`        | Yes      |

### Usage

```vue
<template>
  <!-- Expanded way to pass props -->
  <f-table
    :id="table.id"
    :columns="table.columns"
    :form="table.form"
    :settings="table.settings"
    :pagination="table.pagination"
    :filterParams="table.filterParams"
    :buttons="table.buttons"
    :list="table.list"
  />

  <!-- Shortcut to pass all props -->
  <f-table v-bind="table" />
</template>

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
  settings: { url: 'users/' }
})
</script>
```

### Slots

| Name                          | Description                                    | Scope                              |
|-------------------------------|------------------------------------------------|------------------------------------|
| `table-header`                | Customize the entire header section            | `{ onCreate, onExport, add, dump }`|
| `table-body`                  | Replace the entire table body                  | `{ items, headers, loading }`      |
| `table-footer`                | Customize pagination and footer                | `{ pagination }`                   |
| `table-form`                  | Customize the form dialog                      | `{ form, id, onSuccess }`          |
| `delete-confirmation-modal`   | Customize delete confirmation dialog           | `{ accept, cancel }`               |
| `column-{columnName}`         | Customize individual column display            | `{ row, item, index }`             |
| `column-actions`              | Replace the entire actions column              | `{ row, item }`                    |
| `column-actions-prepend`      | Add actions before edit/delete buttons         | `{ row, item }`                    |
| `column-actions-append`       | Add actions after edit/delete buttons          | `{ row, item }`                    |
| `create-button`               | Customize the create button in header          | -                                  |
| `export-button`               | Customize the export button in header          | -                                  |
| `prepend`                     | Add content before header buttons              | -                                  |
| `append`                      | Add content after header buttons               | -                                  |
| `edit-button`                 | Customize the edit button in row actions       | -                                  |
| `delete-button`               | Customize the delete button in row actions     | -                                  |

### Slot Examples

#### Custom Column Rendering

```vue
<template>
  <f-table v-bind="table">
    <template #column-status="{ row }">
      <v-chip :color="row.status === 'active' ? 'success' : 'error'">
        {{ row.status }}
      </v-chip>
    </template>
    
    <template #column-email="{ row }">
      <a :href="`mailto:${row.email}`">{{ row.email }}</a>
    </template>
  </f-table>
</template>
```

#### Custom Actions

```vue
<template>
  <f-table v-bind="table">
    <template #column-actions-prepend="{ row }">
      <v-btn
        icon="mdi-eye"
        size="small"
        @click="viewDetails(row)"
      />
    </template>
    
    <template #column-actions-append="{ row }">
      <v-btn
        icon="mdi-download"
        size="small"
        @click="downloadReport(row)"
      />
    </template>
  </f-table>
</template>
```

#### Custom Header

```vue
<template>
  <f-table v-bind="table">
    <template #table-header="{ onCreate, add }">
      <div class="custom-header">
        <h2>User Management</h2>
        <v-btn @click="onCreate" v-bind="add">
          Add New User
        </v-btn>
      </div>
    </template>
  </f-table>
</template>
```

## FTableHeaderActions

Component that renders the header action buttons (Create and Export).

### Props

| Name | Description          | Type                   | Required |
|------|----------------------|------------------------|----------|
| add  | Add button config    | `NormalizedTableButton`| No       |
| dump | Export button config | `NormalizedTableButton`| No       |

### Events

| Name     | Description                      | Type          |
|----------|----------------------------------|---------------|
| @create  | Emitted when create is clicked   | `() => void`  |
| @export  | Emitted when export is clicked   | `() => void`  |

### Slots

| Name            | Description                         |
|-----------------|-------------------------------------|
| `prepend`       | Content before create/export buttons|
| `create-button` | Custom create button                |
| `export-button` | Custom export button                |
| `append`        | Content after create/export buttons |

### Usage

```vue
<template>
  <f-table-header-actions
    :add="table.buttons.add"
    :dump="table.buttons.dump"
    @create="handleCreate"
    @export="handleExport"
  >
    <template #prepend>
      <v-btn icon="mdi-filter">Filters</v-btn>
    </template>
    
    <template #append>
      <v-btn icon="mdi-refresh" @click="refresh">Refresh</v-btn>
    </template>
  </f-table-header-actions>
</template>
```

## FTableRowActions

Component that renders row action buttons (Edit and Delete).

### Props

| Name   | Description         | Type                   | Required |
|--------|---------------------|------------------------|----------|
| edit   | Edit button config  | `NormalizedTableButton`| No       |
| delete | Delete button config| `NormalizedTableButton`| No       |

### Events

| Name    | Description                    | Type          |
|---------|--------------------------------|---------------|
| @edit   | Emitted when edit is clicked   | `() => void`  |
| @delete | Emitted when delete is clicked | `() => void`  |

### Slots

| Name            | Description              |
|-----------------|--------------------------|
| `edit-button`   | Custom edit button       |
| `delete-button` | Custom delete button     |

### Usage

```vue
<template>
  <f-table-row-actions
    :edit="table.buttons.edit"
    :delete="table.buttons.remove"
    @edit="handleEdit(row)"
    @delete="handleDelete(row)"
  >
    <template #edit-button>
      <v-btn icon="mdi-pencil" size="small" color="primary" />
    </template>
    
    <template #delete-button>
      <v-btn icon="mdi-trash-can" size="small" color="error" />
    </template>
  </f-table-row-actions>
</template>
```

## FTableBody

Component that renders the table body with data rows.

### Props

| Name    | Description                          | Type                       | Required |
|---------|--------------------------------------|----------------------------|----------|
| items   | Array of data rows                   | `any[]`                    | Yes      |
| headers | Column definitions                   | `NormalizedColumn[]`       | Yes      |
| loading | Loading state                        | `boolean`                  | Yes      |
| buttons | Button configurations                | `NormalizedTableButtons`   | Yes      |

### Events

| Name    | Description                      | Type                  |
|---------|----------------------------------|-----------------------|
| @edit   | Emitted when edit is clicked     | `(row: any) => void`  |
| @delete | Emitted when delete is clicked   | `(row: any) => void`  |

### Slots

| Name                     | Description                              | Scope              |
|--------------------------|------------------------------------------|--------------------|
| `column-{columnName}`    | Customize individual column              | `{ row, item, index }` |
| `column-actions`         | Replace entire actions column            | `{ row, item }`    |
| `column-actions-prepend` | Add actions before edit/delete           | `{ row, item }`    |
| `column-actions-append`  | Add actions after edit/delete            | `{ row, item }`    |

### Usage

```vue
<template>
  <f-table-body
    :items="table.list.data"
    :headers="headers"
    :loading="table.list.isFetching"
    :buttons="table.buttons"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <template #column-name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
  </f-table-body>
</template>
```

## FTableFooter

Component that renders pagination controls.

### Props

| Name       | Description              | Type                        | Required |
|------------|--------------------------|-----------------------------|----------|
| pagination | Pagination configuration | `NormalizedTablePagination` | Yes      |

### Events

| Name               | Description                      | Type                             |
|--------------------|----------------------------------|----------------------------------|
| @update:pagination | Emitted when pagination changes  | `(pagination: Pagination) => void` |

### Usage

```vue
<template>
  <f-table-footer
    :pagination="table.pagination"
    @update:pagination="handlePaginationUpdate"
  />
</template>

<script setup lang="ts">
const handlePaginationUpdate = (pagination: Pagination) => {
  console.log('Page:', pagination.page)
  console.log('Rows per page:', pagination.rowsPerPage)
}
</script>
```

## FDeleteConfirmationModal

Component that displays a confirmation dialog before deleting records.

### Props

| Name       | Description                    | Type      | Required |
|------------|--------------------------------|-----------|----------|
| modelValue | Controls modal visibility      | `boolean` | Yes      |

### Events

| Name              | Description                        | Type          |
|-------------------|------------------------------------|---------------|
| @update:modelValue| Emitted when modal is closed       | `(value: boolean) => void` |
| @accept           | Emitted when user confirms delete  | `() => void`  |
| @cancel           | Emitted when user cancels          | `() => void`  |

### Slots

| Name    | Description                 | Scope                    |
|---------|-----------------------------|--------------------------|
| default | Custom modal content        | `{ accept, cancel }`     |

### Usage

```vue
<template>
  <f-delete-confirmation-modal
    v-model="showDeleteDialog"
    @accept="confirmDelete"
    @cancel="cancelDelete"
  >
    <template #default="{ accept, cancel }">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this record?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="error" @click="accept">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </f-delete-confirmation-modal>
</template>

<script setup lang="ts">
const showDeleteDialog = ref(false)

const confirmDelete = () => {
  // Perform delete operation
  showDeleteDialog.value = false
}

const cancelDelete = () => {
  showDeleteDialog.value = false
}
</script>
```

## Complete Custom Example

Here's an example using multiple components together with customization:

```vue
<template>
  <div class="user-management">
    <!-- Custom Header -->
    <f-table-header-actions
      :add="table.buttons.add"
      :dump="table.buttons.dump"
      @create="table.buttons.add.onClick"
      @export="table.buttons.dump.onClick"
    >
      <template #prepend>
        <h2>Users</h2>
      </template>
      
      <template #append>
        <v-btn
          icon="mdi-refresh"
          @click="table.list.fetchData()"
        />
      </template>
    </f-table-header-actions>

    <!-- Custom Table Body -->
    <f-table-body
      :items="table.list.data"
      :headers="headers"
      :loading="table.list.isFetching"
      :buttons="table.buttons"
      @edit="table.buttons.edit.onClick"
      @delete="table.buttons.remove.onClick"
    >
      <!-- Custom columns -->
      <template #column-status="{ row }">
        <v-chip :color="getStatusColor(row.status)">
          {{ row.status }}
        </v-chip>
      </template>
      
      <!-- Custom actions -->
      <template #column-actions-prepend="{ row }">
        <v-btn
          icon="mdi-email"
          size="small"
          @click="sendEmail(row)"
        />
      </template>
    </f-table-body>

    <!-- Custom Footer -->
    <f-table-footer
      :pagination="table.pagination"
      @update:pagination="handlePagination"
    />

    <!-- Form Dialog -->
    <v-dialog v-model="table.settings.displayFormDialog">
      <f-form
        v-bind="table.form"
        @success="handleFormSuccess"
      />
    </v-dialog>

    <!-- Delete Confirmation -->
    <f-delete-confirmation-modal
      v-model="table.settings.displayConfirmationDialog"
      @accept="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useForm, useTable } from '@fancy-crud/vue'

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
  settings: { url: 'users/' }
})

const headers = computed(() => 
  Object.values(table.columns).filter(col => !col.exclude)
)

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'success',
    inactive: 'error',
    pending: 'warning',
  }
  return colors[status] || 'default'
}

const sendEmail = (row: any) => {
  console.log('Sending email to:', row.email)
}

const handleFormSuccess = () => {
  table.list.fetchData()
  table.settings.displayFormDialog = false
}

const handlePagination = (pagination: Pagination) => {
  Object.assign(table.pagination, pagination)
}

const confirmDelete = () => {
  table.buttons.remove.onClick()
}

const cancelDelete = () => {
  table.settings.displayConfirmationDialog = false
  table.settings.rowToDelete = null
}
</script>
```

## Best Practices

### 1. **Use FTable for Most Cases**

The `FTable` component handles everything automatically. Use individual components only when you need fine-grained control.

```vue
<!-- ✅ Good - Simple and complete -->
<f-table v-bind="table" />

<!-- ❌ Only if you need custom layout -->
<f-table-header-actions ... />
<f-table-body ... />
<f-table-footer ... />
```

### 2. **Use Slots for Customization**

Instead of using individual components, use slots within `FTable`:

```vue
<!-- ✅ Good - Use slots -->
<f-table v-bind="table">
  <template #column-status="{ row }">
    <v-chip>{{ row.status }}</v-chip>
  </template>
</f-table>
```

### 3. **Keep Component Props Reactive**

Always bind reactive data to component props:

```vue
<!-- ✅ Good -->
<f-table-body
  :items="table.list.data"
  :loading="table.list.isFetching"
/>
```

## Next Steps

- Learn about [Custom Components](/tables/custom-components) for creating wrapper components
- Explore [Table Columns](/tables/columns) for column configuration
- Check out [Table Commands](/tables/commands) for programmatic control

