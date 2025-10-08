# Custom Table Components

FancyCRUD provides a powerful slot-based system for customizing table columns, actions, and other table elements. This gives you complete control over how your data is displayed and how users interact with it.

## Why Custom Table Components?

While FancyCRUD provides default table rendering, you may need:

- **Custom Column Renderers**: Display images, badges, chips, progress bars
- **Custom Actions**: Special buttons with unique behaviors
- **Interactive Cells**: Inline editing with form components
- **Rich Data Display**: Charts, formatted text, links, icons
- **Custom Layouts**: Complex cell structures, multi-line content

## Understanding Table Architecture

FancyCRUD tables use Vue slots extensively for customization:

### Main Slots

1. **`table-header`**: Customize the entire header section
2. **`table-body`**: Replace the entire table body
3. **`table-footer`**: Customize pagination and footer
4. **`table-form`**: Customize the form dialog
5. **`delete-confirmation-modal`**: Customize delete confirmation

### Column Slots

- **`#column-{columnName}`**: Customize individual column display
- Receives props: `{ row, item, index }`

### Action Slots

- **Header Actions**: `create-button`, `export-button`, `prepend`, `append`
- **Row Actions**: `column-actions`, `column-actions-prepend`, `column-actions-append`, `edit-button`, `delete-button`

## Custom Column Rendering

### Using Column Slots

The primary way to customize column display is using the `#column-{columnName}` slot pattern:

```vue
<template>
  <f-table v-bind="table">
    <!-- Custom column rendering -->
    <!-- Slot receives: { row, item, index } -->
    <template #column-status="{ row }">
      <v-chip
        :color="row.status === 'active' ? 'success' : 'error'"
        size="small"
      >
        {{ row.status }}
      </v-chip>
    </template>
    
    <template #column-avatar="{ row }">
      <v-avatar size="32">
        <v-img :src="row.avatar" />
      </v-avatar>
    </template>
    
    <template #column-progress="{ row, index }">
      <v-progress-linear
        :model-value="row.progress"
        color="primary"
        height="8"
      >
        <template #default="{ value }">
          <span class="text-xs">{{ Math.ceil(value) }}%</span>
        </template>
      </v-progress-linear>
    </template>
  </f-table>
</template>

<script setup lang="ts">
import { useForm, useTable } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
    status: { type: 'text', label: 'Status' },
  },
  settings: { url: 'users/' },
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    status: { label: 'Status' },
    avatar: { label: 'Avatar' },
    progress: { label: 'Progress' },
  },
  settings: {
    url: 'users/',
  },
})
</script>
```

### Using Column Field Functions

For more control, use the `field` function in column definitions:

```ts
const table = useTable({
  form: myForm,
  columns: {
    fullName: {
      label: 'Full Name',
      field: (row) => `${row.firstName} ${row.lastName}`,
    },
    salary: {
      label: 'Salary',
      field: (row) => row.salary,
      format: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    },
    createdAt: {
      label: 'Created',
      field: (row) => row.created_at,
      format: (value) => new Date(value).toLocaleDateString(),
    },
  },
})
```

## Customizing Actions

###  Customizing Row Action Buttons

Use the provided action slots to customize edit and delete buttons:

```vue
<template>
  <f-table v-bind="table">
    <!-- Customize edit button -->
    <template #edit-button="{ }">
      <v-btn
        icon="mdi-pencil"
        size="small"
        color="primary"
        variant="tonal"
      />
    </template>
    
    <!-- Customize delete button -->
    <template #delete-button>
      <v-btn
        icon="mdi-trash-can"
        size="small"
        color="error"
        variant="tonal"
      />
    </template>
  </f-table>
</template>
```

### Adding Custom Row Actions

Use the `column-actions-prepend` or `column-actions-append` slots to add custom actions:

```vue
<template>
  <f-table v-bind="table">
    <!-- Add actions before edit/delete buttons -->
    <template #column-actions-prepend="{ row, item }">
      <v-btn
        icon="mdi-eye"
        size="small"
        variant="text"
        @click="viewDetails(row)"
      />
      <v-btn
        icon="mdi-content-copy"
        size="small"
        variant="text"
        @click="duplicate(row)"
      />
    </template>
    
    <!-- Add actions after edit/delete buttons -->
    <template #column-actions-append="{ row }">
      <v-btn
        icon="mdi-download"
        size="small"
        variant="text"
        @click="exportRow(row)"
      />
    </template>
  </f-table>
</template>

<script setup lang="ts">
const viewDetails = (row: any) => {
  console.log('View:', row)
}

const duplicate = (row: any) => {
  console.log('Duplicate:', row)
}

const exportRow = (row: any) => {
  console.log('Export:', row)
}
</script>
```

### Replacing the Entire Actions Column

Use the `column-actions` slot to completely replace the actions column:

```vue
<template>
  <f-table v-bind="table">
    <template #column-actions="{ row, item }">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            size="small"
            variant="text"
            v-bind="props"
          />
        </template>
        
        <v-list>
          <v-list-item @click="table.buttons.edit.onClick(row)">
            <template #prepend>
              <v-icon>mdi-pencil</v-icon>
            </template>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          
          <v-list-item @click="table.buttons.remove.onClick(row)">
            <template #prepend>
              <v-icon>mdi-delete</v-icon>
            </template>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </f-table>
</template>
```

### Customizing Header Actions

Customize the create and export buttons using header action slots:

```vue
<template>
  <f-table v-bind="table">
    <!-- Add custom buttons before create/export -->
    <template #prepend>
      <v-btn
        color="secondary"
        prepend-icon="mdi-filter"
      >
        Filters
      </v-btn>
    </template>
    
    <!-- Customize create button -->
    <template #create-button>
      <v-btn
        color="success"
        prepend-icon="mdi-plus-circle"
      >
        Add New User
      </v-btn>
    </template>
    
    <!-- Add custom buttons after create/export -->
    <template #append>
      <v-btn
        color="info"
        prepend-icon="mdi-refresh"
        @click="table.list.fetchData()"
      >
        Refresh
      </v-btn>
    </template>
  </f-table>
</template>
```

## Real-World Examples

### Status Badge Component

```vue
<!-- StatusBadge.vue -->
<template>
  <v-chip
    :color="statusColor"
    :variant="variant"
    size="small"
  >
    <v-icon start :icon="statusIcon" />
    {{ displayText }}
  </v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const statusConfig: Record<string, { color: string; icon: string; text: string }> = {
  active: { color: 'success', icon: 'mdi-check-circle', text: 'Active' },
  pending: { color: 'warning', icon: 'mdi-clock', text: 'Pending' },
  inactive: { color: 'error', icon: 'mdi-close-circle', text: 'Inactive' },
  draft: { color: 'info', icon: 'mdi-pencil', text: 'Draft' },
}

const config = computed(() => statusConfig[props.value] || statusConfig.draft)
const statusColor = computed(() => config.value.color)
const statusIcon = computed(() => config.value.icon)
const displayText = computed(() => config.value.text)
const variant = computed(() => 'flat')
</script>
```

Usage:

```vue
<template>
  <f-table v-bind="table">
    <template #column-status="{ row }">
      <status-badge :value="row.status" />
    </template>
  </f-table>
</template>
```

### Image Gallery Column

```vue
<!-- ImageGallery.vue -->
<template>
  <div class="image-gallery">
    <v-avatar
      v-for="(image, index) in displayImages"
      :key="index"
      size="32"
      class="gallery-item"
    >
      <v-img :src="image" />
    </v-avatar>
    <v-chip v-if="remainingCount > 0" size="small" class="remaining-count">
      +{{ remainingCount }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
  maxDisplay?: number
}>()

const maxDisplay = props.maxDisplay || 3

const displayImages = computed(() => 
  props.images.slice(0, maxDisplay)
)

const remainingCount = computed(() => 
  Math.max(0, props.images.length - maxDisplay)
)
</script>

<style scoped>
.image-gallery {
  display: flex;
  align-items: center;
  gap: 4px;
}

.gallery-item {
  margin-right: -8px;
  border: 2px solid white;
}

.remaining-count {
  margin-left: 8px;
}
</style>
```

### Inline Editing with Form Components

FancyCRUD automatically renders form components for inline editing when you enable the `input` option in column configuration:

```ts
const table = useTable({
  form,
  columns: {
    name: {
      label: 'Name',
      input: {
        isEnable: true,  // Enable inline editing
        type: 'text',     // Form field type
      },
    },
    status: {
      label: 'Status',
      input: {
        isEnable: true,
        type: 'select',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
    },
    verified: {
      label: 'Verified',
      input: {
        isEnable: true,
        type: 'checkbox',
      },
    },
  },
  settings: {
    url: 'users/',
  },
})
```

The table will automatically:
- Render the appropriate form component in the cell
- Handle value updates via `UpdateRowValueCommand`
- Support all form field types (text, select, checkbox, datepicker, etc.)
- Provide validation and error handling

### Rating Display Component

```vue
<!-- RatingDisplay.vue -->
<template>
  <div class="rating-display">
    <v-rating
      :model-value="rating"
      :length="5"
      size="small"
      readonly
      color="amber"
    />
    <span class="rating-text">{{ rating.toFixed(1) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  maxRating?: number
}>()

const rating = computed(() => 
  Math.min(props.value, props.maxRating || 5)
)
</script>

<style scoped>
.rating-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-text {
  font-size: 0.875rem;
  color: #666;
}
</style>
```


## Creating Custom Table Components

Just like the form wrappers, you can create custom table body and footer components to integrate with different UI frameworks.

### Custom Table Body Component

Create a custom table body component that receives the table data and renders it using your UI framework:

```vue
<!-- CustomTableBody.vue -->
<template>
  <v-data-table
    v-bind="$attrs"
    :headers="parseHeaders"
    :items="props.items"
    :loading="props.loading"
    class="elevation-1"
    item-value="id"
  >
    <!-- Render each column with slot support -->
    <template 
      v-for="(column, index) in columnsWithoutActions" 
      :key="index" 
      #[`item.${column.value}`]="{ item, index }"
    >
      <slot 
        :name="`column-${column.value}`" 
        v-bind="{ row: item, item, index }"
      >
        {{ getValue(item, column, index) }}
      </slot>
    </template>
    
    <!-- Actions column -->
    <template v-if="hasActionColumn" #[`item.actions`]="{ item }">
      <slot name="column-actions" v-bind="{ row: item, item }">
        <slot name="column-actions-prepend" v-bind="{ row: item, item }" />
        <f-table-row-actions
          @edit="emit('edit', item)"
          @delete="emit('delete', item)"
          :edit="props.buttons.edit"
          :delete="props.buttons.remove"
        />
        <slot name="column-actions-append" v-bind="{ row: item, item }" />
      </slot>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import type { TableBodyProps, TableBodyEmit } from '@fancy-crud/vue'
import { FTableRowActions } from '@fancy-crud/vue'

const props = defineProps<TableBodyProps>()
const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

// Transform headers for Vuetify
const parseHeaders = computed(() => 
  props.headers.map(header => ({
    ...header,
    title: header.label,
    key: header.value,
  }))
)

const columnsWithoutActions = computed(() => 
  parseHeaders.value.filter(h => h.key !== 'actions')
)

const hasActionColumn = computed(() => 
  props.headers.some(h => h.value === 'actions' && !h.exclude)
)

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex)
  )
}
</script>
```

#### Required Props (TableBodyProps)

```ts
interface TableBodyProps {
  items: any[]                    // Table data rows
  headers: NormalizedColumn[]     // Column definitions
  loading: boolean                // Loading state
  buttons: NormalizedTableButtons // Button configurations
}
```

#### Required Emits (TableBodyEmit)

```ts
interface TableBodyEmit {
  (e: 'edit', row: any): void    // Emitted when edit is clicked
  (e: 'delete', row: any): void  // Emitted when delete is clicked
}
```

### Custom Table Footer Component

Create a custom footer component for pagination:

```vue
<!-- CustomTableFooter.vue -->
<template>
  <div class="d-flex justify-space-between align-center">
    <!-- Rows per page selector -->
    <v-menu location="bottom">
      <template #activator="{ props: menuProps }">
        <v-btn
          v-bind="menuProps"
          append-icon="mdi-chevron-down"
          variant="outlined"
        >
          {{ state.pagination.perPage }} / page
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="option in props.pagination.rowsPerPageOptions"
          :key="option"
          @click="state.pagination.perPage = option"
        >
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Pagination -->
    <v-pagination
      v-model="state.pagination.page"
      :length="totalPages"
      :total-visible="7"
      size="small"
    />
  </div>
</template>

<script lang="ts" setup>
import { VBtn, VList, VListItem, VListItemTitle, VMenu, VPagination } from 'vuetify/components'
import type { TableFooterProps, TableFooterEmit } from '@fancy-crud/vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()

const state = useTableFooter(props.pagination, emit)

const totalPages = computed(() => 
  Math.ceil(props.pagination.count / state.pagination.perPage)
)
</script>
```

#### Required Props (TableFooterProps)

```ts
interface TableFooterProps {
  pagination: NormalizedTablePagination
}

interface NormalizedTablePagination {
  page: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  count: number
  hidden: boolean
}
```

#### Required Emits (TableFooterEmit)

```ts
interface TableFooterEmit {
  (e: 'update:pagination', pagination: Pagination): void
}

interface Pagination {
  page?: number
  rowsPerPage?: number
}
```

#### Using useTableFooter Composable

The `useTableFooter` composable handles pagination state and emits updates:

```ts
const state = useTableFooter(props.pagination, emit)

// state.pagination.perPage - current rows per page
// state.pagination.page - current page
// Automatically emits 'update:pagination' when these change
```

### Registering Custom Table Components

Register your custom components globally:

```ts
// fancy-crud.config.ts
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'

// Import your custom components
import CustomTableBody from './components/CustomTableBody.vue'
import CustomTableFooter from './components/CustomTableFooter.vue'

export const fancyCrud = defineConfig({
  http: { request: axios },
  components: {
    tableBody: CustomTableBody,
    tableFooter: CustomTableFooter,
  },
})
```

### Complete Example: Element Plus Table Components

Here's a complete example using Element Plus instead of Vuetify:

```vue
<!-- ElTableBody.vue -->
<template>
  <el-table
    v-bind="$attrs"
    :data="props.items"
    v-loading="props.loading"
    stripe
  >
    <!-- Render columns -->
    <el-table-column
      v-for="(column, index) in columnsWithoutActions"
      :key="index"
      :prop="column.value"
      :label="column.label"
    >
      <template #default="{ row, $index }">
        <slot 
          :name="`column-${column.value}`" 
          v-bind="{ row, item: row, index: $index }"
        >
          {{ getValue(row, column, $index) }}
        </slot>
      </template>
    </el-table-column>
    
    <!-- Actions column -->
    <el-table-column
      v-if="hasActionColumn"
      label="Actions"
      width="150"
      fixed="right"
    >
      <template #default="{ row }">
        <slot name="column-actions" v-bind="{ row, item: row }">
          <slot name="column-actions-prepend" v-bind="{ row }" />
          
          <el-button
            v-if="!props.buttons.edit.hidden"
            type="primary"
            size="small"
            @click="emit('edit', row)"
          >
            Edit
          </el-button>
          
          <el-button
            v-if="!props.buttons.remove.hidden"
            type="danger"
            size="small"
            @click="emit('delete', row)"
          >
            Delete
          </el-button>
          
          <slot name="column-actions-append" v-bind="{ row }" />
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import type { TableBodyProps, TableBodyEmit } from '@fancy-crud/vue'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'

const props = defineProps<TableBodyProps>()
const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

const columnsWithoutActions = computed(() => 
  props.headers.filter(h => h.value !== 'actions' && !h.exclude)
)

const hasActionColumn = computed(() => 
  props.headers.some(h => h.value === 'actions' && !h.exclude)
)

function getValue(row: any, column: any, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex)
  )
}
</script>
```

```vue
<!-- ElTableFooter.vue -->
<template>
  <div class="el-table-footer">
    <el-pagination
      v-model:current-page="state.pagination.page"
      v-model:page-size="state.pagination.perPage"
      :page-sizes="props.pagination.rowsPerPageOptions"
      :total="props.pagination.count"
      layout="sizes, prev, pager, next, total"
      background
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableFooterProps, TableFooterEmit } from '@fancy-crud/vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()

const state = useTableFooter(props.pagination, emit)
</script>

<style scoped>
.el-table-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
```

Register the Element Plus components:

```ts
// fancy-crud.config.ts
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import ElTableBody from './components/ElTableBody.vue'
import ElTableFooter from './components/ElTableFooter.vue'

export const fancyCrud = defineConfig({
  http: { request: axios },
  components: {
    tableBody: ElTableBody,
    tableFooter: ElTableFooter,
  },
})
```

### Key Points

1. **Always implement required props and emits** - `TableBodyProps`, `TableBodyEmit`, `TableFooterProps`, `TableFooterEmit`
2. **Support all slots** - Forward column slots, action slots to allow customization
3. **Use GetColumnValueCommand** - To properly extract column values with field/format support
4. **Use useTableFooter composable** - For consistent pagination behavior
5. **Emit events correctly** - `edit` and `delete` events with row data, `update:pagination` with pagination changes
6. **Integrate your UI framework** - Wrap framework-specific table components (VDataTable, ElTable, etc.)

## Column Data Transformation

### Field Function

Use the `field` function to extract or compute values from row data:

```ts
const table = useTable({
  form,
  columns: {
    fullName: {
      label: 'Full Name',
      field: (row) => `${row.firstName} ${row.lastName}`,
    },
    fullAddress: {
      label: 'Address',
      field: (row) => `${row.street}, ${row.city}, ${row.state} ${row.zip}`,
    },
    daysActive: {
      label: 'Days Active',
      field: (row) => {
        const start = new Date(row.created_at)
        const now = new Date()
        return Math.floor((now - start) / (1000 * 60 * 60 * 24))
      },
    },
  },
})
```

### Format Function

Use the `format` function to format the displayed value:

```ts
const table = useTable({
  form,
  columns: {
    salary: {
      label: 'Salary',
      field: (row) => row.salary,
      format: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    },
    createdAt: {
      label: 'Created',
      field: (row) => row.created_at,
      format: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    discount: {
      label: 'Discount',
      field: (row) => row.discount,
      format: (value) => `${(value * 100).toFixed(0)}%`,
    },
  },
})
```

## Best Practices

### 1. **Use Slots for Column Customization**

Slots are the primary way to customize table columns:

```vue
<template>
  <f-table v-bind="table">
    <template #column-email="{ row }">
      <a :href="`mailto:${row.email}`">{{ row.email }}</a>
    </template>
  </f-table>
</template>
```

### 2. **Use Field/Format Functions for Data Transformation**

For simple data transformation, prefer `field` and `format` functions over slots:

```ts
// ✅ Good - Simple transformation
columns: {
  name: {
    field: (row) => row.firstName + ' ' + row.lastName
  }
}

// ❌ Not needed - Use slots for complex UI
<template #column-name="{ row }">
  {{ row.firstName }} {{ row.lastName }}
</template>
```

### 3. **Provide Data Fallbacks**

Handle missing or invalid data gracefully:

```vue
<template #column-avatar="{ row }">
  <v-avatar size="32">
    <v-img :src="row.avatar || '/default-avatar.png'" />
  </v-avatar>
</template>
```

### 4. **Use Action Slots for Custom Buttons**

Add custom actions using the provided action slots:

```vue
<template>
  <f-table v-bind="table">
    <template #column-actions-prepend="{ row }">
      <v-btn icon="mdi-eye" @click="view(row)" />
    </template>
  </f-table>
</template>
```

### 5. **Leverage Inline Editing**

Use `input.isEnable` for editable columns instead of building custom edit UI:

```ts
// ✅ Good - Use built-in inline editing
columns: {
  name: {
    label: 'Name',
    input: { isEnable: true, type: 'text' }
  }
}
```

### 6. **Use TypeScript for Better DX**

Type your slot props for better developer experience:

```vue
<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'pending' | 'inactive'
}

const table = useTable<User>({
  // ...
})
</script>

<template>
  <f-table v-bind="table">
    <template #column-status="{ row }: { row: User }">
      <!-- row is now properly typed -->
    </template>
  </f-table>
</template>
```

## Advanced Patterns

### Conditional Rendering

Show different components based on data:

```vue
<template>
  <f-table v-bind="table">
    <template #column-document="{ row }">
      <v-btn
        v-if="row.documentUrl"
        icon="mdi-file-document"
        size="small"
        @click="openDocument(row.documentUrl)"
      />
      <v-chip v-else size="small" color="grey">
        No document
      </v-chip>
    </template>
    
    <template #column-status="{ row }">
      <v-chip
        :color="getStatusColor(row.status)"
        size="small"
      >
        {{ row.status }}
      </v-chip>
    </template>
  </f-table>
</template>

<script setup lang="ts">
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'success',
    pending: 'warning',
    inactive: 'error',
  }
  return colors[status] || 'default'
}

const openDocument = (url: string) => {
  window.open(url, '_blank')
}
</script>
```

### Replacing Table Sections

Replace entire sections using major slots:

```vue
<template>
  <f-table v-bind="table">
    <!-- Custom header section -->
    <template #table-header="{ onCreate, onExport, add, dump }">
      <div class="custom-header">
        <h2>User Management</h2>
        <div class="actions">
          <v-btn @click="onCreate" v-bind="add">
            Add User
          </v-btn>
          <v-btn @click="onExport" v-bind="dump">
            Export
          </v-btn>
        </div>
      </div>
    </template>
    
    <!-- Custom footer section -->
    <template #table-footer="{ pagination }">
      <div class="custom-footer">
        <span>Total: {{ pagination.count }} users</span>
        <!-- Your custom pagination UI -->
      </div>
    </template>
  </f-table>
</template>
```

### Customizing the Form Dialog

Customize the table's form dialog:

```vue
<template>
  <f-table v-bind="table">
    <template #table-form="{ form, id, onSuccess }">
      <v-card>
        <v-card-title>Custom Form Title</v-card-title>
        <v-card-text>
          <f-form v-bind="form" :id="id" @success="onSuccess" />
        </v-card-text>
      </v-card>
    </template>
  </f-table>
</template>
```

## Next Steps

- Learn about [Table Commands](/tables/commands) to work with table state
- Explore [Columns](/tables/columns) for column configuration options
- Check out [List Configuration](/tables/list) for data fetching patterns
