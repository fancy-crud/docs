# List Management

The `list` property controls data fetching, loading states, and lifecycle hooks for your table. It provides a powerful and flexible system for managing table data from any source, with automatic pagination, loading indicators, and customizable fetch behavior.

## Overview

The list management system provides:

- **Automatic Data Fetching**: Fetch data automatically on mount
- **Loading States**: Built-in loading indicators with `isFetching`
- **Custom Fetch Logic**: Override default fetch behavior for any data source
- **Lifecycle Hooks**: React to fetch events (init, success, failed, finally)
- **Hot Fetching**: Automatically refetch when filters change
- **Pagination Integration**: Seamless integration with table pagination
- **Flexible Response Format**: Support for paginated and non-paginated APIs
- **Manual Control**: Programmatically trigger data fetches

## Quick Reference

```typescript
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    data: [],                    // Current table data
    fetchData: () => {},         // Custom fetch function (optional)
    isFetching: false,           // Loading state
    options: {
      autoTrigger: true,         // Auto-fetch on mount
      hotFetch: true,            // Refetch on filter changes
      onInit: () => {},          // Before fetch starts
      onSuccess: (response) => {}, // After successful fetch
      onFailed: (error) => {},   // On fetch error
      onFinally: () => {}        // After fetch completes
    }
  }
})
```

## Data

The array of records currently displayed in the table. This property is reactive and automatically updated when data is fetched.

| Property | Type    | Required | Default | Description |
|----------|---------|----------|---------|-------------|
| `data`   | `any[]` | No       | `[]`    | Array of records to display in the table |

### How It Works

The `data` property is:
- **Reactive**: Changes automatically update the table display
- **Automatically Managed**: Populated by `fetchData()` or `SetListDataCommand`
- **Read/Write**: Can be accessed for current data or manually set
- **Paginated**: Contains only the records for the current page

### Basic Example

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
    actions: {}
  },
  settings: { url: 'users/' },
  list: {
    // data starts empty, populated by automatic fetch
    data: []
  }
})

// Access current data
console.log('Current records:', table.list.data)

// Data structure after fetch:
// table.list.data = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
// ]
</script>
```

### Accessing Table Data

**Read Current Data:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Get all current records
const getCurrentRecords = () => {
  return table.list.data
}

// Find specific record
const findUser = (id: number) => {
  return table.list.data.find(user => user.id === id)
}

// Count records
const recordCount = computed(() => table.list.data.length)
</script>
```

**Watch Data Changes:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Watch for data updates
watch(() => table.list.data, (newData, oldData) => {
  console.log(`Data updated: ${oldData.length} → ${newData.length} records`)
  
  // Trigger side effects
  updateAnalytics(newData)
}, { deep: true })
</script>
```

**Manually Set Data (Advanced):**
```vue
<script lang="ts" setup>
import { Bus, SetListDataCommand } from '@fancy-crud/core'

const bus = new Bus()
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Manually set data using command (recommended)
const setCustomData = (data: any[]) => {
  bus.execute(new SetListDataCommand(table.id, data))
}

// Direct assignment (not recommended - bypasses pagination calculation)
// table.list.data = newData  // ❌ Avoid this
</script>
```

::: warning Initial Data
Don't set initial data directly in `data: []`. The `fetchData` method handles data loading automatically. If you need to set initial/default data, use the `onSuccess` hook or override `fetchData`.
:::

::: tip Use SetListDataCommand
When manually setting data, use `SetListDataCommand` instead of direct assignment. This ensures proper pagination calculation and maintains table state consistency.
:::

::: info Data Lifecycle
1. Table mounts → `fetchData()` called automatically (if `autoTrigger: true`)
2. Data fetched from API
3. Response processed by `FetchListDataCommand`
4. `data` property updated reactively
5. Table re-renders with new data
:::

## Fetch Data

The function responsible for fetching and loading table data. By default, FancyCRUD provides automatic data fetching from your API, but you can override it for custom data sources or logic.

| Property   | Type         | Required | Default | Description |
|------------|--------------|----------|---------|-------------|
| `fetchData` | `() => void` | No | Auto-fetch from `settings.url` | Function to fetch and load table data |

### Default Behavior

By default, `fetchData` executes the `FetchListDataCommand` which:
1. Fetches data from `table.settings.url`
2. Includes pagination parameters (`page`, `pageSize`)
3. Includes filter parameters if configured
4. Handles loading states automatically
5. Updates `table.list.data` with results
6. Triggers lifecycle hooks (`onInit`, `onSuccess`, etc.)

**Default Implementation:**
```typescript
table.list.fetchData = () => {
  const tableData = tableStore.searchById(id)
  bus.execute(
    new FetchListDataCommand(id, tableData.pagination.page, tableData.list.options)
  )
}
```

### Basic Usage (Default)

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: {
    url: 'users/'  // FetchData automatically fetches from here
  }
  // fetchData not specified - uses default behavior
})

// Data is automatically fetched on mount
// Sends: GET /users/?page=1&pageSize=10
</script>
```

### Custom Fetch Implementation

Override `fetchData` for custom data sources, transformations, or logic:

**Example - Custom API Call:**
```vue
<script lang="ts" setup>
import axios from 'axios'
import { Bus, SetListDataCommand } from '@fancy-crud/core'

const bus = new Bus()

const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {  // [!code highlight]
      try {
        table.list.isFetching = true  // Set loading state
        
        const response = await axios.get('/api/users/', {
          params: {
            page: table.pagination.page,
            pageSize: table.pagination.pageSize
          }
        })
        
        // Use SetListDataCommand to update data properly
        bus.execute(
          new SetListDataCommand(table.id, response.data.results)
        )
        
        // Update pagination
        table.pagination.count = response.data.count
        
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        table.list.isFetching = false
      }
    }  // [!code highlight]
  }
})
</script>
```

### Common Use Cases

**1. Custom Authentication:**
```vue
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const bus = new Bus()

const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {
      table.list.isFetching = true
      
      try {
        const response = await axios.get('/api/users/', {
          headers: {
            Authorization: `Bearer ${auth.token}`  // [!code highlight]
          },
          params: {
            page: table.pagination.page,
            pageSize: table.pagination.pageSize
          }
        })
        
        bus.execute(new SetListDataCommand(table.id, response.data))
      } finally {
        table.list.isFetching = false
      }
    }
  }
})
</script>
```

**2. Data Transformation:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {
      table.list.isFetching = true
      
      try {
        const response = await axios.get('/api/users/')
        
        // Transform data before setting
        const transformedData = response.data.map(user => ({  // [!code highlight]
          ...user,  // [!code highlight]
          fullName: `${user.firstName} ${user.lastName}`,  // [!code highlight]
          isActive: user.status === 'active'  // [!code highlight]
        }))  // [!code highlight]
        
        bus.execute(new SetListDataCommand(table.id, transformedData))
      } finally {
        table.list.isFetching = false
      }
    }
  }
})
</script>
```

**3. Multiple API Calls:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {
      table.list.isFetching = true
      
      try {
        // Fetch from multiple endpoints
        const [usersResponse, rolesResponse] = await Promise.all([  // [!code highlight]
          axios.get('/api/users/'),  // [!code highlight]
          axios.get('/api/roles/')  // [!code highlight]
        ])  // [!code highlight]
        
        // Enrich user data with roles
        const enrichedData = usersResponse.data.map(user => ({
          ...user,
          roleName: rolesResponse.data.find(r => r.id === user.roleId)?.name
        }))
        
        bus.execute(new SetListDataCommand(table.id, enrichedData))
      } finally {
        table.list.isFetching = false
      }
    }
  }
})
</script>
```

**4. Local/Static Data:**
```vue
<script lang="ts" setup>
const staticData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: '' },  // No API URL needed
  list: {
    fetchData() {  // [!code highlight]
      // Load static/local data  // [!code highlight]
      bus.execute(new SetListDataCommand(table.id, staticData))  // [!code highlight]
    }  // [!code highlight]
  }
})
</script>
```

**5. Filtering & Search:**
```vue
<script lang="ts" setup>
const searchQuery = ref('')

const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {
      table.list.isFetching = true
      
      try {
        const response = await axios.get('/api/users/', {
          params: {
            page: table.pagination.page,
            pageSize: table.pagination.pageSize,
            search: searchQuery.value  // [!code highlight]
          }
        })
        
        bus.execute(new SetListDataCommand(table.id, response.data.results))
        table.pagination.count = response.data.count
      } finally {
        table.list.isFetching = false
      }
    }
  }
})

// Refetch when search changes
watch(searchQuery, () => {
  table.list.fetchData()
})
</script>
```

### Manual Fetch Trigger

Call `fetchData()` manually to reload table data:

```vue
<template>
  <div>
    <v-btn @click="refreshData">Refresh</v-btn>
    <f-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
})

// Manually trigger data fetch
const refreshData = () => {
  table.list.fetchData()  // [!code highlight]
}

// Or create an alias
const { fetchData: refetchUsers } = table.list
</script>
```

::: tip Use SetListDataCommand
Always use `SetListDataCommand` to update table data. It properly handles pagination calculation and maintains state consistency, unlike direct assignment to `table.list.data`.
:::

::: warning Async/Await
If your `fetchData` is async, make sure to handle errors properly with try/catch and always set `isFetching` in the finally block.
:::

::: info When to Override
Override `fetchData` when:
- Using custom authentication or headers
- Need to transform data before display
- Fetching from multiple sources
- Using local/static data
- Implementing custom caching or optimization
- Need special error handling
:::

### Response Structure

FancyCRUD supports multiple response formats for maximum flexibility with different APIs.

**Format 1: Paginated with Metadata (Recommended)**

Best for pagination with total count:

```json
{
  "count": 150,
  "results": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ]
}
```

- `count`: Total number of records (used for pagination)
- `results`: Array of records for current page
- Table reads from: `response.data.results`
- Pagination count set to: `response.data.count`

**Format 2: Simple Array**

For non-paginated or simple responses:

```json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
]
```

- Table reads from: `response.data`
- Pagination count set to: `response.data.length`

**Format 3: Custom Wrapper**

If your API uses different property names, override `fetchData`:

```json
{
  "total": 150,
  "data": [
    { "id": 1, "name": "John Doe" }
  ],
  "page": 1,
  "per_page": 10
}
```

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {
      table.list.isFetching = true
      
      try {
        const response = await axios.get('/api/users/')
        
        // Extract from custom response format
        bus.execute(new SetListDataCommand(table.id, response.data.data))  // [!code highlight]
        table.pagination.count = response.data.total  // [!code highlight]
      } finally {
        table.list.isFetching = false
      }
    }
  }
})
</script>
```

## isFetching

A reactive boolean indicating whether data is currently being fetched. This property controls loading indicators and should be properly managed in custom `fetchData` implementations.

| Property    | Type      | Required | Default | Description |
|-------------|-----------|----------|---------|-------------|
| `isFetching` | `boolean` | No       | `false` | Loading state indicator |

### How It Works

**Automatic Management (Default `fetchData`):**
- Set to `true` when fetch starts
- Set to `false` when fetch completes (success or error)
- Automatically managed by `FetchListDataCommand`

**Manual Management (Custom `fetchData`):**
- You must set `isFetching` manually
- Set to `true` at start of fetch
- Set to `false` in `finally` block

### Basic Example

**Automatic (Default):**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' }
  // isFetching managed automatically
})

// Access loading state
const isLoading = computed(() => table.list.isFetching)
</script>
```

**Manual (Custom fetchData):**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    async fetchData() {
      table.list.isFetching = true  // [!code highlight]
      
      try {
        const response = await axios.get('/api/users/')
        bus.execute(new SetListDataCommand(table.id, response.data))
      } catch (error) {
        console.error('Fetch failed:', error)
      } finally {
        table.list.isFetching = false  // [!code highlight]
      }
    }
  }
})
</script>
```

### Common Use Cases

**Custom Loading Indicator:**
```vue
<template>
  <div>
    <v-progress-linear
      v-if="table.list.isFetching"  <!-- [!code highlight] -->
      indeterminate
      color="primary"
    />
    <f-table v-bind="table" />
  </div>
</template>
```

**Disable Actions While Loading:**
```vue
<template>
  <div>
    <v-btn
      :disabled="table.list.isFetching"  <!-- [!code highlight] -->
      @click="refreshData"
    >
      Refresh
    </v-btn>
    <f-table v-bind="table" />
  </div>
</template>
```

**Watch Loading State:**
```vue
<script lang="ts" setup>
watch(() => table.list.isFetching, (isLoading) => {
  if (isLoading) {
    console.log('Loading data...')
  } else {
    console.log('Data loaded')
  }
})
</script>
```

::: info Automatic Management
When using the default `fetchData`, `isFetching` is automatically managed. You only need to set it manually when overriding `fetchData`.
:::

::: warning Always Use Finally
When manually managing `isFetching`, always set it to `false` in a `finally` block to ensure it's reset even if an error occurs.
:::

## Options

Configuration options for controlling list behavior, automatic fetching, and lifecycle hooks.

| Property     | Type | Required | Default | Description |
|--------------|------|----------|---------|-------------|
| `autoTrigger` | `boolean` | No | `true` | Auto-fetch data on mount |
| `hotFetch` | `boolean` | No | `true` | Auto-refetch when filters change |
| `onInit` | `() => void` | No | - | Hook before fetch starts |
| `onSuccess` | `(response: any) => void` | No | - | Hook after successful fetch |
| `onFailed` | `(error: any) => void` | No | - | Hook when fetch fails |
| `onFinally` | `() => void` | No | - | Hook after fetch completes |

::: warning Lifecycle Hooks Availability
The `onInit`, `onSuccess`, `onFailed`, and `onFinally` hooks are **only available when using the default `fetchData`**. If you override `fetchData`, you'll need to implement your own hook logic.
:::

### autoTrigger

Controls whether data is fetched automatically when the table mounts.

**Example:**
```vue
<script lang="ts" setup>
// Auto-fetch on mount (default)
const table1 = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      autoTrigger: true  // [!code highlight]
    }
  }
})

// Don't fetch automatically - manual control
const table2 = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      autoTrigger: false  // [!code highlight]
    }
  }
})

// Manually trigger when needed
onMounted(() => {
  if (someCondition) {
    table2.list.fetchData()
  }
})
</script>
```

### hotFetch

Automatically refetches data when filter parameters change.

**Example:**
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
    }
  },
  list: {
    options: {
      hotFetch: true  // Auto-refetch when status filter changes // [!code highlight]
    }
  }
})
</script>
```

### onInit

Called before the fetch request is sent. Useful for logging, analytics, or setup tasks.

**Example:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      onInit: () => {  // [!code highlight]
        console.log('Fetching data...')  // [!code highlight]
        // Track analytics  // [!code highlight]
        analytics.track('table_fetch_started')  // [!code highlight]
      }  // [!code highlight]
    }
  }
})
</script>
```

### onSuccess

Called after a successful fetch with the response data. Useful for notifications, logging, or post-processing.

**Example:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      onSuccess: (response) => {  // [!code highlight]
        console.log('Loaded records:', response.data.length)  // [!code highlight]
        
        // Show success notification  // [!code highlight]
        toast.success(`Loaded ${response.data.length} users`)  // [!code highlight]
        
        // Update analytics  // [!code highlight]
        analytics.track('table_fetch_success', {  // [!code highlight]
          count: response.data.length  // [!code highlight]
        })  // [!code highlight]
      }  // [!code highlight]
    }
  }
})
</script>
```

### onFailed

Called when the fetch fails. Useful for error handling, notifications, or logging.

**Example:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      onFailed: (error) => {  // [!code highlight]
        console.error('Fetch failed:', error)  // [!code highlight]
        
        // Show error notification  // [!code highlight]
        toast.error('Failed to load data. Please try again.')  // [!code highlight]
        
        // Log to error tracking service  // [!code highlight]
        Sentry.captureException(error)  // [!code highlight]
      }  // [!code highlight]
    }
  }
})
</script>
```

### onFinally

Called after the fetch completes, regardless of success or failure. Useful for cleanup tasks.

**Example:**
```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      onFinally: () => {  // [!code highlight]
        console.log('Fetch complete')  // [!code highlight]
        
        // Hide custom loading indicator  // [!code highlight]
        isCustomLoading.value = false  // [!code highlight]
        
        // Update last fetch timestamp  // [!code highlight]
        lastFetchedAt.value = new Date()  // [!code highlight]
      }  // [!code highlight]
    }
  }
})
</script>
```

### Combined Example

Using all lifecycle hooks together:

```vue
<script lang="ts" setup>
const fetchCount = ref(0)
const lastError = ref<string | null>(null)

const table = useTable({
  form,
  columns: { actions: {} },
  settings: { url: 'users/' },
  list: {
    options: {
      autoTrigger: true,
      hotFetch: true,
      
      onInit: () => {  // [!code highlight:27]
        console.log('📡 Starting fetch...')
        fetchCount.value++
        lastError.value = null
      },
      
      onSuccess: (response) => {
        console.log('✅ Fetch successful:', response.data.length, 'records')
        toast.success('Data loaded successfully')
        
        // Custom post-processing
        if (response.data.length === 0) {
          toast.info('No records found')
        }
      },
      
      onFailed: (error) => {
        console.error('❌ Fetch failed:', error)
        lastError.value = error.message
        toast.error('Failed to load data')
        
        // Report to error tracking
        Sentry.captureException(error)
      },
      
      onFinally: () => {
        console.log('🏁 Fetch complete')
        // Cleanup or final tasks
      }
    }
  }
})
</script>
```

## Complete Example

Here's a comprehensive example demonstrating all list management features:

```vue
<template>
  <div class="data-table-container">
    <!-- Custom Toolbar -->
    <v-toolbar>
      <v-toolbar-title>User Management</v-toolbar-title>
      
      <v-spacer />
      
      <!-- Manual Refresh -->
      <v-btn
        :disabled="table.list.isFetching"
        :loading="table.list.isFetching"
        @click="refreshData"
      >
        <v-icon left>mdi-refresh</v-icon>
        Refresh
      </v-btn>
      
      <!-- Search -->
      <v-text-field
        v-model="searchQuery"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        hide-details
        clearable
        @input="debouncedSearch"
      />
    </v-toolbar>
    
    <!-- Custom Loading Indicator -->
    <v-progress-linear
      v-if="table.list.isFetching"
      indeterminate
      color="primary"
      height="2"
    />
    
    <!-- Stats -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <div class="text-h6">{{ table.list.data.length }}</div>
            <div class="text-caption">Records</div>
          </v-col>
          <v-col cols="4">
            <div class="text-h6">{{ fetchAttempts }}</div>
            <div class="text-caption">Fetches</div>
          </v-col>
          <v-col cols="4">
            <div class="text-h6">{{ lastFetched || 'Never' }}</div>
            <div class="text-caption">Last Updated</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <!-- Table -->
    <f-table v-bind="table" />
    
    <!-- Error Snackbar -->
    <v-snackbar
      v-model="showError"
      color="error"
      timeout="5000"
    >
      {{ errorMessage }}
      <template #actions>
        <v-btn text @click="showError = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useForm, useTable, FieldType } from '@fancy-crud/vue'
import { Bus, SetListDataCommand } from '@fancy-crud/core'
import axios from 'axios'
import { useDebounceFn } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
import dayjs from 'dayjs'

// State
const bus = new Bus()
const auth = useAuthStore()
const searchQuery = ref('')
const fetchAttempts = ref(0)
const lastFetched = ref<string | null>(null)
const showError = ref(false)
const errorMessage = ref('')

// Form
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
      options: ['admin', 'user', 'viewer']
    }
  },
  settings: {
    url: 'users/'
  }
})

// Table with comprehensive list configuration
const table = useTable({
  form,
  columns: {
    id: {
      label: 'ID',
      width: '80px'
    },
    fullName: {
      label: 'Name',
      field: (row) => `${row.firstName} ${row.lastName}`,
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
  settings: {
    url: 'users/',
    lookupField: 'id'
  },
  list: {
    // Custom fetchData with authentication and transformation
    async fetchData() {
      table.list.isFetching = true
      
      try {
        const response = await axios.get('/api/users/', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          },
          params: {
            page: table.pagination.page,
            pageSize: table.pagination.pageSize,
            search: searchQuery.value
          }
        })
        
        // Transform data
        const transformedData = response.data.results.map(user => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`,
          isActive: user.status === 'active'
        }))
        
        // Update table
        bus.execute(new SetListDataCommand(table.id, transformedData))
        table.pagination.count = response.data.count
        
      } catch (error) {
        console.error('Fetch failed:', error)
        errorMessage.value = 'Failed to load users. Please try again.'
        showError.value = true
      } finally {
        table.list.isFetching = false
      }
    },
    
    // Options with lifecycle hooks
    options: {
      autoTrigger: true,
      hotFetch: true,
      
      onInit: () => {
        console.log('📡 Fetching users...')
        fetchAttempts.value++
      },
      
      onSuccess: (response) => {
        console.log('✅ Loaded:', response.data.length, 'users')
        lastFetched.value = dayjs().format('HH:mm:ss')
        
        // Track analytics
        analytics.track('users_table_fetch_success', {
          count: response.data.length,
          page: table.pagination.page
        })
      },
      
      onFailed: (error) => {
        console.error('❌ Fetch failed:', error)
        errorMessage.value = error.response?.data?.message || 'Failed to load users'
        showError.value = true
        
        // Report to error tracking
        Sentry.captureException(error)
      },
      
      onFinally: () => {
        console.log('🏁 Fetch complete')
      }
    }
  }
})

// Manual refresh
const refreshData = () => {
  table.list.fetchData()
}

// Debounced search
const debouncedSearch = useDebounceFn(() => {
  table.list.fetchData()
}, 500)

// Watch data changes for analytics
watch(() => table.list.data, (newData) => {
  console.log('Table data updated:', newData.length, 'records')
}, { deep: true })

// Watch loading state
watch(() => table.list.isFetching, (isLoading) => {
  if (isLoading) {
    document.title = 'Loading...'
  } else {
    document.title = `Users (${table.list.data.length})`
  }
})
</script>

<style scoped>
.data-table-container {
  padding: 1rem;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
}

.text-caption {
  font-size: 0.75rem;
  color: #666;
}
</style>
```

## Best Practices

::: tip List Management Best Practices
1. **Use SetListDataCommand**: Always use `SetListDataCommand` for setting data—it handles pagination correctly
2. **Handle Errors Properly**: Always use try/catch with custom `fetchData` implementations
3. **Manage isFetching**: Set `isFetching` in finally blocks to ensure it's reset even on errors
4. **Leverage Lifecycle Hooks**: Use hooks for logging, analytics, and notifications
5. **Implement Debouncing**: Debounce search/filter inputs to avoid excessive API calls
6. **Transform Data Wisely**: Transform data in `fetchData` before setting, not in columns
7. **Use autoTrigger Appropriately**: Disable for lazy-loaded or conditional tables
8. **Handle Empty States**: Check for empty results in `onSuccess` and show appropriate messages
9. **Track Fetch State**: Monitor `isFetching` for UI feedback and analytics
10. **Cache When Possible**: Implement caching strategies for frequently accessed data
:::

::: warning Common Pitfalls
- **Direct Data Assignment**: Avoid `table.list.data = []` - use `SetListDataCommand` instead
- **Missing Finally Block**: Always set `isFetching = false` in finally when using custom `fetchData`
- **Ignoring Errors**: Don't silently fail - handle and communicate errors to users
- **Over-fetching**: Use debouncing and avoid unnecessary refetches
- **Blocking UI**: Long fetches should show loading indicators
- **Memory Leaks**: Clean up subscriptions and watchers when components unmount
- **Inconsistent State**: Keep pagination count synced with actual total records
:::

## Troubleshooting

### Table Not Loading Data

**Check:**
1. `settings.url` is correct and accessible
2. API returns expected format (`{ count, results }` or `[]`)
3. `autoTrigger` is not set to `false`
4. No JavaScript errors in console
5. Network requests succeeding in DevTools

### Data Not Updating After Fetch

**Check:**
1. Using `SetListDataCommand` instead of direct assignment
2. `isFetching` is being reset to `false`
3. Response data is in expected format
4. No errors in `fetchData` execution
5. Table ID is correct in `SetListDataCommand`

### Loading State Stuck

**Check:**
1. `isFetching` is set to `false` in `finally` block
2. No unhandled Promise rejections
3. Async function properly awaits
4. Error handling doesn't skip finally block

### Lifecycle Hooks Not Firing

**Check:**
1. Using default `fetchData` (not overridden)
2. Hook functions are properly defined
3. No syntax errors in hook implementations
4. Hooks are in `list.options` object

### Search/Filters Not Working

**Check:**
1. `hotFetch` is `true` (default)
2. Filter parameters included in API request
3. API supports filter parameters
4. Debouncing not too aggressive

## Next Steps

Continue learning about FancyCRUD tables:

- **[Settings](/tables/settings)**: Configure table behavior
- **[Columns](/tables/columns)**: Define and customize table columns
- **[Pagination](/tables/pagination)**: Configure pagination behavior
- **[Filters](/tables/filters)**: Implement filtering and search
- **[Buttons](/tables/buttons)**: Customize toolbar buttons
- **[Custom Components](/tables/custom-components)**: Build custom table layouts
