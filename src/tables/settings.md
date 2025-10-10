# Table Settings

Table settings control the core behavior of your FancyCRUD tables, including data fetching, record identification, dialog visibility, and delete confirmation behavior. These settings work together to provide a complete CRUD experience with minimal configuration.

## Overview

Table settings provide control over:

- **Data Source**: Configure the API endpoint for fetching, creating, updating, and deleting records
- **Record Identification**: Specify which field identifies unique records (default: `id`)
- **Delete Behavior**: Control delete confirmation dialogs
- **Dialog Management**: Control form and confirmation dialog visibility
- **Reactive Configuration**: Define settings as functions for dynamic behavior

## Quick Reference

```typescript
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',                    // API endpoint (required)
    lookupField: 'id',                // Field to identify records
    skipDeleteConfirmation: false,    // Show delete confirmation
    displayFormDialog: false,         // Form dialog visibility
    displayConfirmationDialog: false, // Delete dialog visibility
    rowToDelete: null                 // Row being deleted
  }
})
```

## URL

The API endpoint for table operations. This is the base URL used for fetching records (list), and also inherited by the form for create, read, update, and delete operations.

| Property | Type     | Required | Default | Description |
|----------|----------|----------|---------|-------------|
| `url`    | `string` | Yes      | -       | Base API endpoint for table operations |

### How It Works

The table URL is used for different HTTP operations:

1. **List (GET)**: Fetches paginated records
   ```
   GET /api/users/?page=1&pageSize=10
   ```

2. **Delete (DELETE)**: Deletes a specific record
   ```
   DELETE /api/users/123/
   ```

The form associated with the table also uses this URL (or its own if specified separately):
- **Create (POST)**: `POST /api/users/`
- **Read (GET)**: `GET /api/users/123/`
- **Update (PATCH)**: `PATCH /api/users/123/`

### Basic Example

```vue
<script lang="ts" setup>
import { useForm, useTable, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: {
    url: 'users/'  // Form operations use this URL
  }
})

const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/'  // Table list operations use this URL
  }
})
</script>
```

### URL Formats

**Relative URLs (Recommended):**
```typescript
settings: {
  url: 'users/'           // Simple resource
  url: 'api/v1/users/'    // With API prefix
  url: 'admin/users/'     // Namespaced resource
}
```

**Absolute URLs:**
```typescript
settings: {
  url: 'https://api.example.com/users/'
  url: 'http://localhost:8000/api/users/'
}
```

### Common Patterns

**Standard REST Endpoint:**
```typescript
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/'
  }
})
// Results in:
// GET    /users/       (list)
// POST   /users/       (create)
// GET    /users/123/   (read)
// PATCH  /users/123/   (update)
// DELETE /users/123/   (delete)
```

**API Versioning:**
```typescript
settings: {
  url: 'api/v2/users/'
}
```

**Multi-tenant Applications:**
```typescript
const tenantId = ref('tenant-123')

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({
    url: `${tenantId.value}/users/`
  })
})
// Results in: /tenant-123/users/
```

**Nested Resources:**
```typescript
const companyId = ref('company-456')

settings: () => ({
  url: `companies/${companyId.value}/employees/`
})
// Results in: /companies/company-456/employees/
```

::: tip URL Best Practices
1. **Always end with a trailing slash** (`users/` not `users`) for consistency with REST conventions
2. **Use relative URLs** when possible for better portability across environments
3. **Keep it consistent** between table and form settings
4. **Use reactive settings** (`() => ({ url: ... })`) for dynamic URLs
:::

::: warning URL Consistency
Make sure the table `settings.url` matches the form `settings.url` unless you have a specific reason for them to differ. Mismatched URLs can cause issues with edit/delete operations.
:::

::: info Automatic Pagination Parameters
The table automatically appends pagination parameters to the URL:
- `?page=1` - Current page number
- `&pageSize=10` - Number of records per page
- Additional filter parameters if filters are configured
:::

## Lookup Field

The property name used to uniquely identify records. This field is used to construct URLs for edit, read, and delete operations on individual records.

| Property     | Type     | Required | Default | Description |
|--------------|----------|----------|---------|-------------|
| `lookupField` | `string` | No       | `'id'`  | Property name for record identification |

### How It Works

When you perform operations on a row, FancyCRUD uses the `lookupField` value to:

1. **Build the resource URL**: `/{url}/{lookupValue}/`
2. **Set form.settings.lookupValue**: The value from `row[lookupField]`
3. **Make requests**: `GET`, `PATCH`, or `DELETE` to the specific resource

### Basic Example

**Default (using `id`):**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    lookupField: 'id'  // Default - can be omitted
  }
})

// Row data: { id: 123, name: 'John Doe', email: 'john@example.com' }
// When clicking edit:
// - form.settings.lookupValue = 123
// - Fetches: GET /users/123/
// When clicking delete:
// - Sends: DELETE /users/123/
</script>
```

**Custom Lookup Field:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    employee_id: { label: 'Employee ID' },
    name: { label: 'Name' },
    actions: {}
  },
  settings: {
    url: 'employees/',
    lookupField: 'employee_id'  // Use custom field // [!code highlight]
  }
})

// Row data: { employee_id: 'EMP-456', name: 'Jane Smith', department: 'Engineering' }
// When clicking edit:
// - form.settings.lookupValue = 'EMP-456'
// - Fetches: GET /employees/EMP-456/
// When clicking delete:
// - Sends: DELETE /employees/EMP-456/
</script>
```

### Common Use Cases

**UUID as Identifier:**
```typescript
settings: {
  url: 'users/',
  lookupField: 'uuid'
}
// Row: { uuid: '550e8400-e29b-41d4-a716-446655440000', name: 'John' }
// Edit URL: /users/550e8400-e29b-41d4-a716-446655440000/
```

**Custom ID Field Names:**
```typescript
settings: {
  url: 'products/',
  lookupField: 'product_code'
}
// Row: { product_code: 'PROD-2024-001', name: 'Widget' }
// Edit URL: /products/PROD-2024-001/
```

**MongoDB ObjectId:**
```typescript
settings: {
  url: 'documents/',
  lookupField: '_id'
}
// Row: { _id: '507f1f77bcf86cd799439011', title: 'Report' }
// Edit URL: /documents/507f1f77bcf86cd799439011/
```

**Composite Keys (Not Directly Supported):**
```typescript
// For composite keys, use a computed field
const table = useTable({
  form,
  columns: {
    compositeId: {
      label: 'ID',
      field: (row) => `${row.company_id}-${row.user_id}`,
      exclude: false
    },
    name: { label: 'Name' },
    actions: {}
  },
  settings: {
    url: 'users/',
    lookupField: 'compositeId'  // Use computed field
  }
})
```

::: tip When to Change lookupField
Only change `lookupField` if:
- Your API uses a different identifier field name (e.g., `uuid`, `_id`, `employee_id`)
- You're working with legacy systems that don't use `id`
- Your database uses custom primary key names
:::

::: warning lookupField Requirements
- The field specified must exist in your row data
- The value must be unique across all records
- The value must be serializable as a URL parameter
- Must match the parameter your API expects in URLs
:::

::: info Display vs Identification
The `lookupField` is for identification only, not display:
- **Identification**: Uses `lookupField` to build URLs (`/users/123/`)
- **Display**: Uses column configuration to show data in table
- These can be different fields (e.g., show `name` but identify by `id`)
:::

## Skip Delete Confirmation

Controls whether to show a confirmation dialog before deleting a record. When enabled, records are deleted immediately without user confirmation.

| Property | Type      | Required | Default | Description |
|----------|-----------|----------|---------|-------------|
| `skipDeleteConfirmation` | `boolean` | No | `false` | Skip the delete confirmation dialog |

### How It Works

**Default Behavior (`false`):**
1. User clicks delete button
2. Confirmation dialog appears
3. User confirms or cancels
4. If confirmed, DELETE request is sent

**Skip Confirmation (`true`):**
1. User clicks delete button
2. DELETE request is sent immediately
3. No confirmation dialog shown

### Basic Example

**With Confirmation (Default):**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    skipDeleteConfirmation: false  // Show confirmation (default)
  }
})

// When user clicks delete:
// 1. Dialog appears: "Are you sure you want to delete this record?"
// 2. User confirms
// 3. DELETE /users/123/ is sent
</script>
```

**Without Confirmation:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    skipDeleteConfirmation: true  // Delete immediately // [!code highlight]
  }
})

// When user clicks delete:
// 1. DELETE /users/123/ is sent immediately
// 2. No confirmation dialog shown
</script>
```

### Common Use Cases

**Trash/Soft Delete Systems:**
```vue
<script lang="ts" setup>
// In a trash/recycle bin where users can restore deleted items
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'trash/items/',
    skipDeleteConfirmation: true  // Safe to delete without confirmation
  }
})
</script>
```

**Admin with Undo Capability:**
```vue
<script lang="ts" setup>
const recentlyDeleted = ref<any[]>([])

const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    skipDeleteConfirmation: true
  }
})

// Implement undo functionality
const deleteHandler = async (row: any) => {
  recentlyDeleted.value.push({ ...row, deletedAt: Date.now() })
  // Show undo notification
  showNotification('Item deleted. Click here to undo.', {
    action: () => restoreItem(row)
  })
}
</script>
```

**Conditional Confirmation:**
```vue
<script lang="ts" setup>
const userRole = ref('admin')

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({
    url: 'users/',
    // Admins can delete without confirmation
    skipDeleteConfirmation: userRole.value === 'admin'  // [!code highlight]
  })
})
</script>
```

**Temporary/Draft Items:**
```vue
<script lang="ts" setup>
// Deleting draft items doesn't need confirmation
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'drafts/',
    skipDeleteConfirmation: true  // Drafts are less critical
  }
})
</script>
```

::: warning Use With Caution
Enabling `skipDeleteConfirmation` removes an important safety mechanism:
- **Data Loss Risk**: Users might accidentally delete important records
- **No Second Chance**: No way to cancel once the delete button is clicked
- **User Confusion**: Users expect confirmation for destructive actions
- **Best for**: Temporary data, soft deletes, or systems with undo functionality
:::

::: tip When to Use
Consider skipping confirmation when:
- ✅ Implementing soft delete (items can be restored)
- ✅ Deleting temporary/draft items
- ✅ You have undo functionality
- ✅ Items are trivial or easily recreated
- ✅ Admin panel with experienced users

Avoid skipping when:
- ❌ Deleting critical business data
- ❌ Hard deletes (permanent deletion)
- ❌ Users are inexperienced
- ❌ No undo capability exists
:::

::: info Alternative: Custom Confirmation
Instead of skipping, you can implement custom confirmation logic:
```vue
<template>
  <f-table v-bind="table">
    <template #column-actions="{ row }">
      <v-btn @click="customDelete(row)">Delete</v-btn>
    </template>
  </f-table>
</template>

<script lang="ts" setup>
const customDelete = async (row: any) => {
  const confirmed = await showCustomDialog(row)
  if (confirmed) {
    // Implement delete logic
  }
}
</script>
```
:::

## Display Form Dialog

Controls the visibility of the form dialog. This reactive property is automatically managed by FancyCRUD but can be controlled programmatically for custom behaviors.

| Property | Type      | Required | Default | Description |
|----------|-----------|----------|---------|-------------|
| `displayFormDialog` | `boolean` | No | `false` | Controls form dialog visibility |

### How It Works

FancyCRUD automatically manages this property:
- **Clicking "Create"**: Sets to `true` and opens form in create mode
- **Clicking "Edit"**: Sets to `true` and opens form in edit mode with loaded data
- **Form Submit Success**: Sets to `false` and closes the dialog
- **Clicking Cancel/Close**: Sets to `false` and closes the dialog

### Basic Example

**Automatic Management (Recommended):**
```vue
<template>
  <f-table v-bind="table" />
</template>

<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    // displayFormDialog not specified - managed automatically
  }
})

// Clicking "Create" button automatically:
// - Sets table.settings.displayFormDialog = true
// - Opens the form dialog
</script>
```

**Programmatic Control:**
```vue
<template>
  <div>
    <v-btn @click="openCreateForm">Custom Create Button</v-btn>
    <f-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/'
  }
})

// Open form dialog programmatically
const openCreateForm = () => {
  table.settings.displayFormDialog = true  // [!code highlight]
}

// Close form dialog
const closeForm = () => {
  table.settings.displayFormDialog = false  // [!code highlight]
}
</script>
```

### Common Use Cases

**Custom Create Button:**
```vue
<template>
  <div>
    <v-toolbar>
      <v-btn color="primary" @click="createNewUser">
        <v-icon>mdi-plus</v-icon>
        Add User
      </v-btn>
    </v-toolbar>
    <f-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
const createNewUser = () => {
  table.settings.displayFormDialog = true
  // Form opens in create mode (default)
}
</script>
```

**Watch Dialog State:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Track when dialog opens/closes
watch(() => table.settings.displayFormDialog, (isOpen) => {
  if (isOpen) {
    console.log('Form dialog opened')
  } else {
    console.log('Form dialog closed')
  }
})
</script>
```

**Conditional Form Opening:**
```vue
<script lang="ts" setup>
const canEdit = ref(true)

const editRow = (row: any) => {
  if (!canEdit.value) {
    alert('You do not have permission to edit')
    return
  }
  
  // Open form programmatically
  form.settings.lookupValue = row.id
  form.settings.mode = FORM_MODE.update
  table.settings.displayFormDialog = true
}
</script>
```

::: tip Automatic Management
In most cases, you should let FancyCRUD manage this property automatically. The built-in "Create" and "Edit" buttons handle everything correctly.
:::

::: info When to Control Manually
Consider manual control when:
- Creating custom action buttons outside the table
- Implementing wizards or multi-step processes
- Need to programmatically open/close the form
- Implementing conditional form opening logic
:::

## Display Confirmation Dialog

Controls the visibility of the delete confirmation dialog. This reactive property is automatically managed by FancyCRUD but can be monitored or controlled programmatically.

| Property | Type      | Required | Default | Description |
|----------|-----------|----------|---------|-------------|
| `displayConfirmationDialog` | `boolean` | No | `false` | Controls delete confirmation dialog visibility |

### How It Works

FancyCRUD automatically manages this property:
- **Clicking Delete**: Sets to `true` (unless `skipDeleteConfirmation` is `true`)
- **Confirming Delete**: Sets to `false` after deletion completes
- **Canceling Delete**: Sets to `false` without deleting

**Example:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/',
    // displayConfirmationDialog managed automatically
  }
})

// Watch confirmation dialog state
watch(() => table.settings.displayConfirmationDialog, (isOpen) => {
  if (isOpen) {
    console.log('User is about to delete:', table.settings.rowToDelete)
  }
})
</script>
```

::: tip Automatic Management
This property is automatically managed. You rarely need to set it manually.
:::

## Row To Delete

Stores the reference to the row currently selected for deletion. This property is used internally to track which record should be deleted when the user confirms.

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `rowToDelete` | `any \| null` | No | `null` | Row object pending deletion |

### How It Works

**Delete Flow:**
1. User clicks delete button
2. FancyCRUD sets `rowToDelete = row`
3. If confirmation enabled, dialog shows
4. User confirms
5. DELETE request sent using `rowToDelete[lookupField]`
6. `rowToDelete` set back to `null`

**Example - Monitoring Deletes:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Watch for delete attempts
watch(() => table.settings.rowToDelete, (row) => {
  if (row) {
    console.log('About to delete:', row)
    // Log for audit trail
    logDeleteAttempt(row)
  }
})
</script>
```

::: tip Automatic Management
This property is managed automatically. Access it for monitoring or logging purposes.
:::

## Reactive Settings

Define settings as a function to enable dynamic, reactive behavior based on your application state.

### Static vs Reactive Settings

**Static Settings:**
```typescript
settings: {
  url: 'users/',
  lookupField: 'id',
  skipDeleteConfirmation: false
}
```

**Reactive Settings:**
```typescript
settings: () => ({
  url: `${tenantId.value}/users/`,
  lookupField: 'id',
  skipDeleteConfirmation: userRole.value === 'admin'
})
```

### Use Cases

**Multi-Tenant Applications:**
```vue
<script lang="ts" setup>
const currentTenant = ref('tenant-abc')

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({
    url: `${currentTenant.value}/users/`,  // [!code highlight]
    lookupField: 'id'
  })
})

// When tenant changes, table URL updates automatically
const switchTenant = (newTenant: string) => {
  currentTenant.value = newTenant
  table.list.fetch()  // Refetch with new URL
}
</script>
```

**Role-Based Delete Confirmation:**
```vue
<script lang="ts" setup>
const userRole = ref<'admin' | 'user'>('user')

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({
    url: 'users/',
    // Admins can delete without confirmation
    skipDeleteConfirmation: userRole.value === 'admin'  // [!code highlight]
  })
})
</script>
```

**Dynamic API Endpoints:**
```vue
<script lang="ts" setup>
const environment = ref<'staging' | 'production'>('production')

const table = useTable({
  form,
  columns: { actions: {} },
  settings: () => ({
    url: environment.value === 'production'  // [!code highlight]
      ? 'https://api.example.com/users/'  // [!code highlight]
      : 'https://staging-api.example.com/users/'  // [!code highlight]
  })
})
</script>
```

## Complete Example

Here's a comprehensive example demonstrating all settings with advanced usage:

```vue
<template>
  <div class="user-management">
    <v-toolbar>
      <v-toolbar-title>User Management</v-toolbar-title>
      <v-spacer />
      <v-btn color="primary" @click="openCreateForm">
        <v-icon left>mdi-plus</v-icon>
        Add User
      </v-btn>
    </v-toolbar>

    <f-table v-bind="table">
      <!-- Custom actions -->
      <template #column-actions-append="{ row }">
        <v-btn
          icon="mdi-eye"
          size="small"
          @click="viewDetails(row)"
        />
      </template>
    </f-table>

    <!-- Audit log -->
    <v-snackbar v-model="showAuditLog">
      {{ auditMessage }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useForm, useTable, FieldType, FORM_MODE } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const currentTenant = ref('tenant-abc')
const userRole = ref<'admin' | 'editor' | 'viewer'>('editor')
const showAuditLog = ref(false)
const auditMessage = ref('')

// Form configuration
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name',
      required: true
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name',
      required: true
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true
    },
    role: {
      type: FieldType.select,
      label: 'Role',
      options: ['admin', 'editor', 'viewer'],
      required: true
    }
  },
  settings: () => ({
    url: `${currentTenant.value}/users/`,
    mode: FORM_MODE.create
  })
})

// Table configuration with all settings
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
    actions: {
      label: 'Actions',
      align: 'center'
    }
  },
  settings: () => ({
    // Dynamic URL based on tenant
    url: `${currentTenant.value}/users/`,
    
    // Standard ID field
    lookupField: 'id',
    
    // Admins can delete without confirmation
    skipDeleteConfirmation: userRole.value === 'admin',
    
    // Dialog states (automatically managed)
    displayFormDialog: false,
    displayConfirmationDialog: false,
    rowToDelete: null
  })
})

// Programmatic controls
const openCreateForm = () => {
  form.settings.mode = FORM_MODE.create
  table.settings.displayFormDialog = true
}

const viewDetails = (row: any) => {
  router.push(`/users/${row.id}`)
}

// Audit logging
watch(() => table.settings.rowToDelete, (row) => {
  if (row) {
    auditMessage.value = `Deleting user: ${row.firstName} ${row.lastName}`
    showAuditLog.value = true
    
    // Log to audit service
    console.log('Delete attempt:', {
      user: row,
      timestamp: new Date(),
      actor: userRole.value
    })
  }
})

// Watch for successful operations
watch(() => table.settings.displayFormDialog, (isOpen, wasOpen) => {
  if (wasOpen && !isOpen) {
    // Dialog closed - operation might have completed
    console.log('Form dialog closed')
  }
})

// Tenant switching
const switchTenant = (newTenant: string) => {
  currentTenant.value = newTenant
  table.list.fetch()  // Refetch with new URL
}
</script>

<style scoped>
.user-management {
  padding: 1rem;
}
</style>
```

## Best Practices

::: tip Table Settings Best Practices
1. **Use Consistent URLs**: Keep form and table URLs synchronized
2. **Leverage Reactive Settings**: Use `() => ({ ... })` for dynamic behavior
3. **Default to Confirmations**: Keep `skipDeleteConfirmation: false` unless you have good reason
4. **Match Lookup Fields**: Ensure `lookupField` matches your API's identifier
5. **Let FancyCRUD Manage Dialogs**: Avoid manually controlling dialog visibility unless needed
6. **Monitor State Changes**: Use watchers for audit logging and analytics
7. **Handle Errors Gracefully**: Implement response interceptors for better UX
:::

::: warning Common Pitfalls
- **URL Mismatch**: Form and table URLs should match for proper CRUD flow
- **Wrong Lookup Field**: Must match the actual identifier in your data
- **Skipping Confirmations**: Use cautiously - users expect confirmation for deletes
- **Manual Dialog Control**: Can conflict with built-in behavior - use sparingly
- **Missing Error Handling**: Always handle API errors appropriately
:::

## Default Values

All table settings have sensible defaults:

```typescript
{
  url: '',  // Required - must be provided
  lookupField: 'id',
  skipDeleteConfirmation: false,
  displayFormDialog: false,
  displayConfirmationDialog: false,
  rowToDelete: null
}
```

**Minimal Configuration:**
```typescript
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/'  // Only this is required
  }
})
```

## Troubleshooting

### Table Not Loading Data

**Check:**
1. `settings.url` is correct and reachable
2. API returns data in `{ data: [...] }` format
3. No CORS issues in browser console
4. Authentication headers are configured

### Edit/Delete Not Working

**Check:**
1. `lookupField` matches the identifier in your data
2. Row data contains the lookup field
3. API supports PATCH (update) and DELETE methods
4. URLs are correctly formed (`/users/123/`)

### Dialogs Not Showing

**Check:**
1. Not manually overriding dialog visibility
2. Wrapper components support dialogs
3. No CSS hiding the dialogs
4. Check browser console for errors

### Delete Confirmation Not Showing

**Check:**
1. `skipDeleteConfirmation` is `false` (default)
2. `displayConfirmationDialog` not manually set
3. Wrapper dialog component is properly configured

## Next Steps

Continue learning about FancyCRUD tables:

- **[Columns](/tables/columns)**: Define and customize table columns
- **[Buttons](/tables/buttons)**: Customize toolbar and action buttons
- **[Pagination](/tables/pagination)**: Configure pagination behavior
- **[Filters](/tables/filters)**: Implement filtering and search
- **[List Management](/tables/list)**: Understand data fetching
- **[Custom Components](/tables/custom-components)**: Build custom table layouts
