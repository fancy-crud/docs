# Table Filters

Table filters allow you to add custom query parameters when fetching data from your API. These filters are automatically included in every request made by the table.

## What are Filter Params?

The `filterParams` property in `useTable` lets you define custom query parameters that are sent with every data fetch request. This is useful for:

- Filtering data by specific criteria
- Adding search parameters
- Including authentication tokens
- Passing tenant IDs or organization filters
- Adding any custom query parameters your API needs

## Basic Usage

For static filters (values that don't change), use a plain object:

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
  settings: {
    url: 'users/'
  },
  filterParams: {
    status: 'active',
    role: 'admin'
  }
})
</script>

<template>
  <f-table v-bind="table" />
</template>
```

In this example, every request to fetch users will include:
```
GET /users/?limit=10&offset=0&status=active&role=admin
```

::: info
Use a plain object for **static filters** (constant values). Use a **function** for **dynamic filters** (reactive values that can change).
:::

## Dynamic Filters

For dynamic filtering, use a function that returns an object with the current filter values:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useTable } from '@fancy-crud/vue'

const selectedStatus = ref('all')
const searchQuery = ref('')

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
    status: { type: 'select', label: 'Status' },
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    status: { label: 'Status' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: () => ({
    status: selectedStatus.value,
    search: searchQuery.value,
  })
})

// Change filters - table will automatically refetch
const applyFilters = () => {
  selectedStatus.value = 'active'
  searchQuery.value = 'john'
}
</script>

<template>
  <div>
    <!-- Filter controls -->
    <div class="filters">
      <v-select
        v-model="selectedStatus"
        :items="['all', 'active', 'inactive']"
        label="Status"
      />
      <v-text-field
        v-model="searchQuery"
        label="Search"
        clearable
      />
    </div>

    <!-- Table -->
    <f-table v-bind="table" />
  </div>
</template>
```

::: tip
Use a function `() => ({})` syntax for dynamic filters. This ensures the filter values are evaluated each time the table fetches data.
:::

## Reactive Filters with Conditional Logic

Use a function to conditionally include filter parameters based on their values:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useTable } from '@fancy-crud/vue'

const statusFilter = ref('all')
const roleFilter = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const form = useForm({
  fields: {
    name: { type: 'text', label: 'Name' },
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    role: { label: 'Role' },
    created_at: { label: 'Created' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: () => {
    const filters: Record<string, any> = {}
    
    // Only include non-empty values
    if (statusFilter.value && statusFilter.value !== 'all') {
      filters.status = statusFilter.value
    }
    
    if (roleFilter.value) {
      filters.role = roleFilter.value
    }
    
    if (dateFrom.value) {
      filters.date_from = dateFrom.value
    }
    
    if (dateTo.value) {
      filters.date_to = dateTo.value
    }
    
    return filters
  }
})
</script>

<template>
  <div>
    <div class="filters">
      <v-select
        v-model="statusFilter"
        :items="['all', 'active', 'inactive', 'pending']"
        label="Status"
      />
      <v-select
        v-model="roleFilter"
        :items="['admin', 'user', 'guest']"
        label="Role"
        clearable
      />
      <v-text-field
        v-model="dateFrom"
        label="From Date"
        type="date"
      />
      <v-text-field
        v-model="dateTo"
        label="To Date"
        type="date"
      />
    </div>

    <f-table v-bind="table" />
  </div>
</template>
```

## Common Use Cases

### Search Filter

```vue
<script lang="ts" setup>
const searchTerm = ref('')

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    email: { label: 'Email' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: () => ({
    search: searchTerm.value
  })
})
</script>

<template>
  <div>
    <v-text-field
      v-model="searchTerm"
      label="Search users..."
      prepend-inner-icon="mdi-magnify"
      clearable
    />
    <f-table v-bind="table" />
  </div>
</template>
```

### Multi-Tenant Filtering

```vue
<script lang="ts" setup>
const currentOrganization = ref(1)

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: () => ({
    organization_id: currentOrganization.value
  })
})
</script>
```

### Date Range Filtering

```vue
<script lang="ts" setup>
const dateRange = ref({
  start: '2024-01-01',
  end: '2024-12-31'
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    created_at: { label: 'Created' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: () => ({
    created_after: dateRange.value.start,
    created_before: dateRange.value.end,
  })
})
</script>
```

### Status and Category Filters

```vue
<script lang="ts" setup>
const filters = reactive({
  status: 'all',
  category: '',
  is_verified: false,
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
    status: { label: 'Status' },
    category: { label: 'Category' },
  },
  settings: {
    url: 'products/'
  },
  filterParams: () => ({
    status: filters.status,
    category: filters.category,
    is_verified: filters.is_verified,
  })
})
</script>

<template>
  <div>
    <div class="filters">
      <v-select
        v-model="filters.status"
        :items="['all', 'active', 'inactive']"
        label="Status"
      />
      <v-select
        v-model="filters.category"
        :items="['electronics', 'clothing', 'food']"
        label="Category"
        clearable
      />
      <v-checkbox
        v-model="filters.is_verified"
        label="Verified Only"
      />
    </div>
    <f-table v-bind="table" />
  </div>
</template>
```

## Advanced Filtering

### Filter with Debounce

Debounce search inputs to avoid excessive API calls:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const searchInput = ref('')
const debouncedSearch = ref('')

// Debounce the search term
watchDebounced(
  searchInput,
  (value) => {
    debouncedSearch.value = value
  },
  { debounce: 500 }
)

const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: () => ({
    search: debouncedSearch.value
  })
})
</script>

<template>
  <div>
    <v-text-field
      v-model="searchInput"
      label="Search (debounced)"
      clearable
    />
    <f-table v-bind="table" />
  </div>
</template>
```

### Complex Filter Logic

```vue
<script lang="ts" setup>
const filters = reactive({
  minPrice: 0,
  maxPrice: 1000,
  inStock: false,
  brands: [] as string[],
})

const table = useTable({
  form,
  columns: {
    name: { label: 'Product' },
    price: { label: 'Price' },
  },
  settings: {
    url: 'products/'
  },
  filterParams: () => {
    const params: Record<string, any> = {}
    
    if (filters.minPrice > 0) {
      params.price_min = filters.minPrice
    }
    
    if (filters.maxPrice < 1000) {
      params.price_max = filters.maxPrice
    }
    
    if (filters.inStock) {
      params.stock_status = 'in_stock'
    }
    
    if (filters.brands.length > 0) {
      params.brands = filters.brands.join(',')
    }
    
    return params
  }
})
</script>
```

## How Filters Work

When you define `filterParams`, FancyCRUD:

1. **Merges** them with pagination parameters (`limit`, `offset`)
2. **Watches** for changes in filter values
3. **Automatically refetches** data when filters change
4. **Resets** pagination to page 1 when filters change

### Request Example

With these filters:
```ts
filterParams: {
  status: 'active',
  role: 'admin',
  search: 'john'
}
```

FancyCRUD makes this request:
```
GET /users/?limit=10&offset=0&status=active&role=admin&search=john
```

## Accessing Current Filters

You can access and modify current filters programmatically:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: { label: 'Name' },
  },
  settings: {
    url: 'users/'
  },
  filterParams: {
    status: 'all'
  }
})

// Access current filters
console.log(table.filterParams.status) // 'all'

// Modify filters
const setActiveFilter = () => {
  table.filterParams.status = 'active'
  // Table will automatically refetch
}

// Clear filters
const clearFilters = () => {
  Object.keys(table.filterParams).forEach(key => {
    table.filterParams[key] = ''
  })
}
</script>

<template>
  <div>
    <v-btn @click="setActiveFilter">Show Active Only</v-btn>
    <v-btn @click="clearFilters">Clear Filters</v-btn>
    <f-table v-bind="table" />
  </div>
</template>
```

## Best Practices

### 1. **Use Function Syntax for Dynamic Filters**

```ts
// ✅ Good - Function returns current values
filterParams: () => ({
  status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
  search: searchTerm.value || undefined,
})

// ❌ Bad - Don't pass refs as values
filterParams: {
  status: statusFilter,  // Wrong!
  search: searchTerm,    // Wrong!
}
```

### 2. **Debounce Search Inputs**

```ts
// ✅ Good - Prevents excessive API calls
watchDebounced(searchInput, (value) => {
  debouncedSearch.value = value
}, { debounce: 500 })
```

### 3. **Provide Clear Filter UI**

```vue
<!-- ✅ Good - Clear filter controls -->
<div class="filters">
  <v-select v-model="statusFilter" label="Status" />
  <v-btn @click="clearFilters">Clear Filters</v-btn>
</div>
```

### 4. **Remove Empty Values**

```ts
// ✅ Good - Only send meaningful filters
const filterParams = computed(() => {
  const params: Record<string, any> = {}
  if (statusFilter.value) params.status = statusFilter.value
  if (searchTerm.value) params.search = searchTerm.value
  return params
})
```

### 5. **TypeScript Types**

```ts
interface UserFilters {
  status?: 'active' | 'inactive' | 'pending'
  role?: 'admin' | 'user' | 'guest'
  search?: string
}

const table = useTable({
  form,
  columns: { name: { label: 'Name' } },
  settings: { url: 'users/' },
  filterParams: {
    status: 'active',
    role: 'admin',
  } as UserFilters
})
```

## Next Steps

- Learn about [Table Pagination](/tables/pagination) for controlling page size and navigation
- Explore [Table List](/tables/list) for data fetching configuration
- Check out [Table Settings](/tables/settings) for additional table configuration

