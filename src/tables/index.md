# Tables

Tables in FancyCRUD provide a powerful and flexible way to display, manage, and interact with data. With built-in support for pagination, filtering, sorting, CRUD operations, and custom actions, FancyCRUD tables handle the complexity of data management while giving you complete control over appearance and behavior.

## Overview

FancyCRUD tables offer:

- **Automatic Column Generation**: Columns are inferred from your form fields
- **Built-in CRUD Operations**: Create, read, update, and delete records with minimal configuration
- **Integrated Forms**: Seamlessly connect forms for create/edit operations
- **Pagination**: Built-in pagination with customizable page sizes
- **Filtering**: Server-side and client-side filtering support
- **Sorting**: Column-based sorting capabilities
- **Actions Column**: Customizable action buttons (edit, delete, custom actions)
- **Custom Buttons**: Add toolbar buttons for exports, bulk operations, etc.
- **Responsive**: Works with any UI framework (Vuetify, Element Plus, Quasar, Oruga)

## Quick Start

The simplest way to create a table is by using the `useTable` composable with a form:

<<< ./components/Table.vue

<Table />

<script lang="ts" setup>
import Table from './components/Table.vue'
</script>

::: tip
The table automatically performs a GET request to fetch data and maps columns to object keys in the response data array.
:::

## How It Works

### 1. API Request

The table automatically sends a GET request to the endpoint specified in `settings.url`:

```
GET /api/users/
```

### 2. Expected Response Format

Your API should return data in this format:

```json
{
  "data": [
    { 
      "id": "84e1ea10-f482-4fd4-a2bf-ca075e27ad6b", 
      "firstName": "John", 
      "lastName": "Doe", 
      "age": 25 
    },
    { 
      "id": "2b1f0f58-f207-4b2f-9ddb-4f3f4feb6e07", 
      "firstName": "Jane", 
      "lastName": "Doe", 
      "age": 24 
    },
    { 
      "id": "eeff9587-27a3-40e5-a01d-4042b0d05455", 
      "firstName": "Jim", 
      "lastName": "Doe", 
      "age": 23 
    },
    { 
      "id": "906aef41-0d5d-4579-9050-27c4121ac6df", 
      "firstName": "Jill", 
      "lastName": "Doe", 
      "age": 22 
    }
  ]
}
```

::: info Response Format
The response must have a `data` property containing an array of records. Each record should be an object with properties matching your column keys.
:::

### 3. Column Mapping

FancyCRUD automatically maps columns to object keys:

- Form field `firstName` → Table column displays `record.firstName`
- Form field `lastName` → Table column displays `record.lastName`
- Form field `age` → Table column displays `record.age`

## Core Concepts

### useTable Composable

The `useTable` composable is the primary way to create tables:

```typescript
const table = useTable({
  form,        // Required: Form instance for create/edit
  columns,     // Optional: Column definitions (inferred from form)
  settings,    // Required: Table settings (URL, pagination, etc.)
  buttons,     // Optional: Toolbar buttons
  filters      // Optional: Filter definitions
})
```

### Form Integration

Tables are tightly integrated with forms:

```vue
<script lang="ts" setup>
import { useForm, useTable, FieldType } from '@fancy-crud/vue'

// 1. Define the form
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' },
    status: { type: FieldType.select, label: 'Status', options: ['Active', 'Inactive'] }
  },
  settings: {
    url: 'users/'
  }
})

// 2. Create the table with the form
const table = useTable({
  form,
  columns: {
    actions: {}  // Add actions column for edit/delete buttons
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Automatic Column Inference

Columns are automatically inferred from form fields:

```typescript
// Form has fields: name, email, status
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' },
    status: { type: FieldType.select, label: 'Status' }
  }
})

// Table automatically creates columns for name, email, and status
const table = useTable({
  form,
  columns: {
    // These columns are automatically created:
    // - name (from form.fields.name)
    // - email (from form.fields.email)
    // - status (from form.fields.status)
    
    // You only need to add columns that aren't in the form:
    actions: {}
  }
})
```

## Complete Example

Here's a comprehensive example with all common features:

```vue
<template>
  <div class="page-container">
    <h1>User Management</h1>
    
    <f-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { useForm, useTable, FieldType, FORM_MODE } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Define the form for create/edit operations
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
      required: true,
      rules: (value) => !!value || 'Last name is required'
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true,
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      }
    },
    age: {
      type: FieldType.text,
      label: 'Age',
      rules: (value) => {
        if (!value) return true
        const age = parseInt(value)
        if (isNaN(age)) return 'Age must be a number'
        if (age < 0 || age > 120) return 'Invalid age'
        return true
      }
    },
    status: {
      type: FieldType.select,
      label: 'Status',
      options: ['Active', 'Inactive', 'Pending'],
      required: true
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create,
    title: '{{ Create User | Edit User }}'
  }
})

// Create the table
const table = useTable({
  form,
  
  // Define columns
  columns: {
    // Inherited from form: firstName, lastName, email, age, status
    
    // Add ID column (not in form)
    id: {
      label: 'ID',
      sortable: true
    },
    
    // Customize inherited columns
    email: {
      label: 'Email Address',
      sortable: true
    },
    
    age: {
      label: 'Age',
      align: 'center',
      sortable: true
    },
    
    // Add actions column
    actions: {
      label: 'Actions',
      align: 'center'
    }
  },
  
  // Table settings
  settings: {
    url: 'users/',
    lookupField: 'id'
  },
  
  // Custom toolbar buttons
  buttons: {
    // Export button
    export: {
      label: 'Export CSV',
      onClick: () => {
        console.log('Exporting data...')
        // Implement export logic
      }
    },
    
    // Refresh button
    refresh: {
      label: 'Refresh',
      onClick: () => {
        table.list.fetch()
      }
    }
  }
})

// Watch for successful form submission
watch(() => form.settings.mode, (newMode) => {
  if (newMode === FORM_MODE.create) {
    console.log('Switched to create mode')
  }
})
</script>

<style scoped>
.page-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}
</style>
```

## Common Patterns

### Basic CRUD Table

Minimal setup for standard CRUD operations:

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
  settings: { url: 'users/' }
})
</script>
```

### Read-Only Table

Display data without edit/delete actions:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
    createdAt: { label: 'Created At' }
    // No actions column = read-only
  },
  settings: { url: 'users/' }
})
</script>
```

### Table with Custom Actions

Add custom action buttons:

```vue
<template>
  <f-table v-bind="table">
    <template #column-actions-append="{ row }">
      <v-btn
        icon="mdi-eye"
        size="small"
        @click="viewDetails(row)"
      >
        View
      </v-btn>
    </template>
  </f-table>
</template>

<script lang="ts" setup>
const viewDetails = (row: any) => {
  router.push(`/users/${row.id}`)
}
</script>
```

### Table with Filters

Add filtering capabilities:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  filters: {
    status: {
      type: FieldType.select,
      label: 'Status',
      options: ['Active', 'Inactive']
    },
    search: {
      type: FieldType.text,
      label: 'Search',
      placeholder: 'Search by name or email'
    }
  }
})
</script>
```

## Key Features Explained

### 1. Automatic Data Fetching

Tables automatically fetch data on mount and refresh when needed:

```typescript
// Fetch happens automatically
const table = useTable({ form, settings: { url: 'users/' } })

// Manual refresh
table.list.fetch()
```

### 2. Integrated Create/Edit

Clicking "Create" or "Edit" buttons automatically:
- Opens a form dialog
- Switches form mode (create/edit)
- Loads record data (edit mode)
- Refreshes table after save

### 3. Delete Confirmation

Delete button shows a confirmation dialog by default:

```typescript
settings: {
  url: 'users/',
  skipDeleteConfirmation: false  // Shows confirmation (default)
}
```

### 4. Pagination

Built-in pagination with customizable options:

```typescript
// Pagination is automatic
// Configure page size in table settings
```

### 5. Responsive Actions

Action buttons adapt to your UI framework:
- Vuetify: Icon buttons with tooltips
- Element Plus: Compact button group
- Quasar: Q-btn with icons
- Oruga: Icon buttons

## API Integration

### Backend Requirements

Your API should support these operations:

| Operation | Method | Endpoint | Purpose |
|-----------|--------|----------|---------|
| List | GET | `/users/` | Fetch records with pagination |
| Create | POST | `/users/` | Create a new record |
| Read | GET | `/users/:id/` | Fetch single record for editing |
| Update | PATCH | `/users/:id/` | Update existing record |
| Delete | DELETE | `/users/:id/` | Delete a record |

### Request/Response Examples

**List (GET /users/)**
```json
// Response
{
  "data": [
    { "id": 1, "name": "John", "email": "john@example.com" },
    { "id": 2, "name": "Jane", "email": "jane@example.com" }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 10
}
```

**Create (POST /users/)**
```json
// Request
{ "name": "John", "email": "john@example.com" }

// Response
{
  "data": { "id": 3, "name": "John", "email": "john@example.com" }
}
```

**Update (PATCH /users/3/)**
```json
// Request
{ "name": "John Doe", "email": "john.doe@example.com" }

// Response
{
  "data": { "id": 3, "name": "John Doe", "email": "john.doe@example.com" }
}
```

**Delete (DELETE /users/3/)**
```json
// Response
{ "success": true }
```

## Best Practices

::: tip Table Best Practices
1. **Keep URLs Consistent**: Use the same base URL for form and table
2. **Add Actions Column**: Always include `actions: {}` for CRUD operations
3. **Validate Data**: Add validation rules to form fields
4. **Handle Errors**: Implement response interceptors for error handling
5. **Use Lookup Fields**: Configure `lookupField` if your ID field isn't named `id`
6. **Customize Columns**: Override inferred columns to add sorting, alignment, etc.
7. **Provide Feedback**: Use toast notifications for user actions
:::

::: warning Common Pitfalls
- **Missing Actions Column**: Without it, users can't edit or delete records
- **URL Mismatch**: Form and table URLs should match for proper CRUD flow
- **No Error Handling**: Always handle API errors gracefully
- **Wrong Response Format**: Ensure API returns `{ data: [...] }` format
- **Missing Lookup Field**: Configure if using custom ID field names
:::

::: info Next Steps
Now that you understand the basics, explore advanced features:
- **[Columns](/tables/columns)**: Customize column display and behavior
- **[Buttons](/tables/buttons)**: Add custom toolbar buttons
- **[Filters](/tables/filters)**: Implement filtering and search
- **[Settings](/tables/settings)**: Configure table behavior
- **[Pagination](/tables/pagination)**: Customize pagination options
- **[Custom Components](/tables/custom-components)**: Build custom table layouts
:::

## Troubleshooting

### Table Not Showing Data

Check:
1. API endpoint is correct in `settings.url`
2. API returns `{ data: [...] }` format
3. Column keys match object properties in data
4. No console errors in browser DevTools

### Edit/Delete Not Working

Check:
1. `actions` column is defined in `columns`
2. `lookupField` matches your ID field name
3. Form `settings.url` matches table `settings.url`
4. API supports PATCH (update) and DELETE methods

### Form Not Opening

Check:
1. Form is properly defined and passed to `useTable`
2. `form.settings.url` is configured
3. No JavaScript errors in console

## TypeScript Support

FancyCRUD provides full TypeScript support:

```typescript
import type { TableInstance, FormInstance } from '@fancy-crud/vue'

// Typed table instance
const table: TableInstance = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Typed row data
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  age: number
}

// Use in custom actions
const viewUser = (row: User) => {
  console.log('Viewing user:', row.firstName)
}
```

## Next Steps

Continue learning about FancyCRUD tables:

- **[Columns](/tables/columns)**: Learn how to define and customize table columns
- **[Buttons](/tables/buttons)**: Add custom toolbar buttons for exports and actions  
- **[Settings](/tables/settings)**: Configure table behavior and appearance
- **[Filters](/tables/filters)**: Implement filtering and search functionality
- **[Pagination](/tables/pagination)**: Customize pagination behavior
- **[List Management](/tables/list)**: Understand data fetching and management
- **[Custom Components](/tables/custom-components)**: Build custom table layouts
