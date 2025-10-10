# Columns

Columns are the foundation of your tables, controlling how data is displayed, formatted, and interacted with. FancyCRUD provides powerful column configuration options with automatic inference from form fields, custom formatting, nested data access, sorting capabilities, and full framework compatibility.

## Overview

FancyCRUD columns offer:

- **Automatic Inference**: Columns are automatically created from form fields
- **Easy Overriding**: Customize inherited columns with your own properties
- **Custom Columns**: Add columns that don't exist in the form
- **Value Formatting**: Transform data before display with `format` and `field` functions
- **Actions Column**: Built-in edit/delete actions for CRUD operations
- **Column Ordering**: Control display order explicitly or use `exclude` to hide columns
- **Sorting**: Enable sortable columns with a single property
- **Alignment**: Control text alignment (left, center, right)
- **Width Control**: Set fixed or percentage-based widths
- **Exclude Property**: Hide specific columns from display
- **Framework Props**: Pass UI framework-specific properties (Vuetify, Element Plus, etc.)
- **Custom Rendering**: Use slots for complete control over column display

## Quick Reference

```typescript
const table = useTable({
  form,
  columns: {
    // Inherited from form, customized
    firstName: {
      label: 'Full Name',
      sortable: true,
      align: 'left'
    },
    
    // New column not in form
    status: {
      label: 'Status',
      field: (row) => row.isActive ? 'Active' : 'Inactive',
      align: 'center'
    },
    
    // Actions column for CRUD operations
    actions: {
      label: 'Actions',
      align: 'center'
    }
  },
  settings: {
    url: 'users/'
  }
})
```

## Inferring Columns

Columns are automatically inferred from your form fields. When you pass a form to `useTable`, FancyCRUD creates table columns for each form field, using the field's `label` as the column header.

### How Automatic Inference Works

When you define form fields, FancyCRUD automatically:
1. Creates a column for each field
2. Uses the field's `label` as the column header
3. Maps the field key to the data object property
4. Applies the same order as fields in the form

### Basic Example

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name'
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name' 
    },
    age: {
      type: FieldType.text,
      label: 'Age'
    }
  },
  settings: {
    url: '/api/users/',
  }
})

const table = useTable({
  form,
  columns: { },  // Empty - all columns inferred from form
  settings: {
    url: 'users/'
  }
})
</script>
```

**Result**: The table displays three columns with headers "First Name", "Last Name", and "Age".

::: tip Automatic Inference Benefits
- **No Duplication**: Define fields once in the form, use everywhere
- **Consistency**: Form and table always stay in sync
- **Less Code**: Minimal configuration required
- **Type Safety**: TypeScript types are automatically inferred
:::

## Overriding Columns

You can customize inherited columns by specifying the same key in the `columns` object. This allows you to change labels, add sorting, adjust alignment, or apply any other column property while keeping the automatic inference benefits.

### Basic Override

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name'
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name' 
    },
    age: {
      type: FieldType.text,
      label: 'Age'
    }
  },
  settings: {
    url: '/api/users/',
  }
})

const table = useTable({
  form,
  columns: {
    // Override the firstName column label
    firstName: {
      label: 'Name'  // Changed from 'First Name' to 'Name' // [!code highlight]
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

### Multiple Overrides

You can override multiple columns and their properties:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    firstName: {
      label: 'Full Name',
      sortable: true,
      align: 'left'
    },
    age: {
      label: 'Years',
      sortable: true,
      align: 'center',
      width: '100px'
    },
    lastName: {
      // Keep inherited label 'Last Name'
      sortable: true
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

::: info Partial Overrides
You only need to specify the properties you want to change. All other properties remain inherited from the form field.
:::

## Adding Columns

Columns aren't limited to form fields. You can add custom columns for data that exists in your API response but not in the form, or for computed/formatted values.

### Custom Columns Example

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name'
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name' 
    },
    age: {
      type: FieldType.text,
      label: 'Age'
    }
  },
  settings: {
    url: '/api/users/',
  }
})

const table = useTable({
  form,
  columns: {
    // Inherited columns: firstName, lastName, age
    
    // Add new columns not in the form
    id: {   // [!code highlight:6]
      label: 'ID',
      sortable: true
    },
    createdAt: {
      label: 'Created At',
      sortable: true
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

**Result**: The table displays columns in this order:

| First Name | Last Name | Age | ID | Created At |
|------------|-----------|-----|----|-----------  |

::: tip Column Order
Custom columns appear after inherited form columns. To control the order, see [Column Ordering](#column-ordering).
:::

### Common Use Cases

**Display IDs:**
```typescript
columns: {
  id: {
    label: 'ID',
    sortable: true,
    align: 'center',
    width: '80px'
  }
}
```

**Display Timestamps:**
```typescript
columns: {
  createdAt: {
    label: 'Created',
    format: (value) => new Date(value).toLocaleDateString(),
    sortable: true
  },
  updatedAt: {
    label: 'Updated',
    format: (value) => new Date(value).toLocaleDateString(),
    sortable: true
  }
}
```

**Display Status with Formatting:**
```typescript
columns: {
  status: {
    label: 'Status',
    format: (value) => value.toUpperCase(),
    align: 'center'
  }
}
```

## Actions Column

The `actions` column is a special column that provides built-in edit and delete buttons for each row. This enables complete CRUD functionality with minimal configuration.

### Basic Actions Column

Simply add `actions: {}` to enable edit and delete buttons:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    // Inherited: name, email
    
    actions: {}  // Adds edit and delete buttons // [!code highlight]
  },
  settings: { url: 'users/' }
})
</script>
```

### Customizing Actions Column

You can customize the actions column label and alignment:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    actions: {
      label: 'Actions',  // Custom header text
      align: 'center',   // Center the actions
      width: '120px'     // Fixed width
    }
  },
  settings: { url: 'users/' }
})
</script>
```

### How Actions Work

When the `actions` column is present:

1. **Edit Button**: 
   - Opens the form in edit mode
   - Loads the row data into the form
   - Submits a PATCH request on save
   - Refreshes the table after successful update

2. **Delete Button**:
   - Shows a confirmation dialog (by default)
   - Sends a DELETE request to the API
   - Removes the row from the table on success

### Custom Actions with Slots

Add custom action buttons alongside edit/delete:

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
      <v-btn
        icon="mdi-content-copy"
        size="small"
        @click="duplicateRow(row)"
      >
        Duplicate
      </v-btn>
    </template>
  </f-table>
</template>

<script lang="ts" setup>
const viewDetails = (row: any) => {
  router.push(`/users/${row.id}/details`)
}

const duplicateRow = (row: any) => {
  // Create a duplicate with the row data
  console.log('Duplicating:', row)
}
</script>
```

<Table />

<script lang="ts" setup>
import Table from './components/Table.vue'
</script>

::: tip Actions Column Placement
The actions column is automatically placed at the end (rightmost) of the table, regardless of where you define it in the `columns` object.
:::

::: warning Read-Only Tables
Omit the `actions` column if you want a read-only table without edit/delete capabilities.
:::

## Column Properties

FancyCRUD provides several built-in properties to control column behavior and appearance. These properties work with any UI framework and provide consistent functionality across your application.

### Label

The text displayed in the column header.

| Property | Type     | Default | Description |
|----------|----------|---------|-------------|
| `label`  | `string` | Field key | Column header text |

**Example:**

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    firstName: {
      label: 'Full Name'  // Displays "Full Name" in header // [!code highlight]
    },
    email: {
      label: 'Email Address' // [!code highlight]
    },
    createdAt: {
      label: 'Registration Date' // [!code highlight]
    }
  },
  settings: { url: 'users/' }
})
</script>
```

::: tip Default Labels
If you don't specify a label, inherited columns use the form field's label, and custom columns use the column key as the label.
:::

### Value

Maps the column to a different property in the data object.

| Property | Type     | Default | Description |
|----------|----------|---------|-------------|
| `value`  | `string` | Column key | The object property key to read from |

By default, FancyCRUD uses the column key to access data. The `value` property allows you to map a column to a different property in your data object.

**Default Behavior:**

When you define a column `firstName`, FancyCRUD automatically reads `row.firstName` from your data:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    firstName: {}  // Reads row.firstName automatically
  },
  settings: { url: 'users/' }
})
</script>
```

**Custom Property Mapping:**

Use `value` to read from a different property:

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    // Display header "First Name" but show lastName data
    firstName: {
      label: 'First Name',
      value: 'lastName'  // Reads row.lastName instead // [!code highlight]
    },
    
    // Display user.profile.displayName in a "Display Name" column
    displayName: {
      label: 'Display Name',
      value: 'user.profile.displayName'  // Supports nested properties // [!code highlight]
    }
  },
  settings: { url: 'users/' }
})
</script>
```

**Example Data:**

Given this API response:

```json
{
  "data": [
    {
      "id": "84e1ea10-f482-4fd4-a2bf-ca075e27ad6b",
      "firstName": "John",
      "lastName": "Doe",
      "age": 25,
      "user": {
        "profile": {
          "displayName": "JohnD"
        }
      }
    }
  ]
}
```

::: tip Use Cases for `value`
- Map columns to different property names
- Access nested object properties
- Display the same data in multiple columns with different formatting
- Work with inconsistent API naming conventions
:::

### Format

Transforms the column value before displaying it. The `format` function receives the raw value and returns the formatted value.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `format` | `(value: any) => any` | - | Function to transform the value before display |

The `format` function is called with the value of the property (determined by the column key or `value` property) and should return the formatted value to display.

**Basic Example:**

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    firstName: {
      label: 'First Name',
      format: (value: string) => value.toUpperCase() // [!code highlight]
    },
    email: {
      label: 'Email',
      format: (value: string) => value.toLowerCase() // [!code highlight]
    }
  },
  settings: { url: 'users/' }
})
</script>
```

**Common Formatting Examples:**

**Date Formatting:**
```typescript
columns: {
  createdAt: {
    label: 'Created',
    format: (value: string) => new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}
```

**Number Formatting:**
```typescript
columns: {
  price: {
    label: 'Price',
    format: (value: number) => `$${value.toFixed(2)}`
  },
  quantity: {
    label: 'Quantity',
    format: (value: number) => value.toLocaleString()
  }
}
```

**Boolean Formatting:**
```typescript
columns: {
  isActive: {
    label: 'Status',
    format: (value: boolean) => value ? 'Active' : 'Inactive'
  }
}
```

**Text Transformation:**
```typescript
columns: {
  status: {
    label: 'Status',
    format: (value: string) => value.toUpperCase()
  },
  description: {
    label: 'Description',
    format: (value: string) => value.substring(0, 50) + '...'
  }
}
```

**Null/Undefined Handling:**
```typescript
columns: {
  phone: {
    label: 'Phone',
    format: (value: string | null) => value || 'N/A'
  }
}
```

::: warning Value Must Exist
The `format` function only receives the value if the property exists in the data object. For computed values based on multiple properties, use the [`field`](#field) property instead.
:::

::: tip Performance Note
The `format` function is called for each row. Keep formatting logic simple for better performance with large datasets.
:::

### Field

Computes the column value from the entire row object. Unlike `format`, which receives only the value, `field` receives the entire row object and the row index.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `field` | `(row: any, index: number) => any` | - | Function to compute value from the row object |

The `field` function is perfect for:
- Creating computed columns from multiple properties
- Accessing nested object data
- Adding columns that don't exist in the data
- Conditional logic based on multiple properties
- Using the row index in calculations

**Basic Example - Combining Fields:**

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    fullName: {
      label: 'Full Name',
      field: (row, _index) => `${row.firstName} ${row.lastName}` // [!code highlight]
    }
  },
  settings: { url: 'users/' }
})
</script>
```

**Common `field` Examples:**

**Combining Multiple Fields:**
```typescript
columns: {
  fullName: {
    label: 'Full Name',
    field: (row) => `${row.firstName} ${row.lastName}`
  },
  address: {
    label: 'Address',
    field: (row) => `${row.street}, ${row.city}, ${row.state} ${row.zip}`
  }
}
```

**Nested Object Access:**
```typescript
columns: {
  companyName: {
    label: 'Company',
    field: (row) => row.user?.company?.name || 'N/A'
  },
  managerEmail: {
    label: 'Manager',
    field: (row) => row.manager?.contact?.email || 'No Manager'
  }
}
```

**Conditional Logic:**
```typescript
columns: {
  discount: {
    label: 'Discount',
    field: (row) => {
      if (row.isPremium) return '20%'
      if (row.isRegular) return '10%'
      return '0%'
    }
  },
  statusBadge: {
    label: 'Status',
    field: (row) => {
      if (row.isActive && row.verified) return '✅ Active & Verified'
      if (row.isActive) return '⚠️ Active (Unverified)'
      return '❌ Inactive'
    }
  }
}
```

**Using Row Index:**
```typescript
columns: {
  rowNumber: {
    label: '#',
    field: (_row, index) => index + 1,
    align: 'center',
    width: '60px'
  },
  priority: {
    label: 'Priority',
    field: (row, index) => {
      // Higher priority for first rows
      return index < 5 ? 'High' : 'Normal'
    }
  }
}
```

**Calculations:**
```typescript
columns: {
  total: {
    label: 'Total',
    field: (row) => row.price * row.quantity
  },
  taxAmount: {
    label: 'Tax',
    field: (row) => (row.price * row.quantity * row.taxRate).toFixed(2)
  },
  ageGroup: {
    label: 'Age Group',
    field: (row) => {
      if (row.age < 18) return 'Minor'
      if (row.age < 65) return 'Adult'
      return 'Senior'
    }
  }
}
```

**Array/List Data:**
```typescript
columns: {
  tags: {
    label: 'Tags',
    field: (row) => row.tags?.join(', ') || 'No tags'
  },
  skillCount: {
    label: 'Skills',
    field: (row) => `${row.skills?.length || 0} skills`
  }
}
```

**Date Calculations:**
```typescript
columns: {
  daysActive: {
    label: 'Days Active',
    field: (row) => {
      const created = new Date(row.createdAt)
      const now = new Date()
      const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
      return `${days} days`
    }
  }
}
```

::: info `field` vs `format`
- Use **`format`** when you only need to transform a single property value
- Use **`field`** when you need access to multiple properties or the entire row
:::

::: tip Complex Logic
For very complex logic, consider computing the value in your component and passing it as a reactive variable, or use [custom column components](/tables/custom-components) with slots.
:::

### Sortable

Enables sorting for the column.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sortable` | `boolean` | `false` | Makes the column sortable |

**Example:**

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    firstName: {
      label: 'Name',
      sortable: true  // Enable sorting // [!code highlight]
    },
    email: {
      label: 'Email',
      sortable: true // [!code highlight]
    },
    age: {
      label: 'Age',
      sortable: true // [!code highlight]
    },
    description: {
      label: 'Description'
      // No sortable - this column can't be sorted
    }
  },
  settings: { url: 'users/' }
})
</script>
```

::: info Server-Side Sorting
Sorting parameters are automatically sent to your API. Implement server-side sorting in your backend to handle large datasets efficiently.
:::

### Align

Controls the text alignment within the column.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `align` | `'left'` \| `'center'` \| `'right'` | `'left'` | Column text alignment |

**Example:**

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: {
      label: 'Name',
      align: 'left'  // Default // [!code highlight]
    },
    age: {
      label: 'Age',
      align: 'center' // [!code highlight]
    },
    price: {
      label: 'Price',
      align: 'right'  // Common for numbers // [!code highlight]
    },
    actions: {
      label: 'Actions',
      align: 'center' // [!code highlight]
    }
  },
  settings: { url: 'users/' }
})
</script>
```

::: tip Alignment Best Practices
- **Left**: Text, names, descriptions (default)
- **Center**: Status badges, icons, actions, boolean values
- **Right**: Numbers, currencies, quantities
:::

### Width

Sets the column width.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `string` \| `number` | Auto | Column width (px, %, or number) |

**Example:**

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    id: {
      label: 'ID',
      width: '80px'  // Fixed pixel width // [!code highlight]
    },
    name: {
      label: 'Name',
      width: '200px' // [!code highlight]
    },
    status: {
      label: 'Status',
      width: '100px' // [!code highlight]
    },
    description: {
      label: 'Description'
      // No width - fills remaining space
    },
    actions: {
      label: 'Actions',
      width: '120px' // [!code highlight]
    }
  },
  settings: { url: 'users/' }
})
</script>
```

### Exclude

Hides a column from the table display. This is particularly useful for excluding inherited columns from the form that you don't want to show in the table.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `exclude` | `boolean` | `false` | Hides the column from display |

**Example - Excluding Inherited Columns:**

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: { type: FieldType.text, label: 'First Name' },
    lastName: { type: FieldType.text, label: 'Last Name' },
    password: { type: FieldType.text, label: 'Password' },  // Don't show in table
    confirmPassword: { type: FieldType.text, label: 'Confirm Password' },  // Don't show in table
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    // Inherited: firstName, lastName, password, confirmPassword, email
    
    // Exclude password fields from table display
    password: {
      exclude: true // [!code highlight]
    },
    confirmPassword: {
      exclude: true // [!code highlight]
    },
    
    // Add actions column
    actions: {}
  },
  settings: { url: 'users/' }
})
</script>
```

**Result:** The table only displays `firstName`, `lastName`, `email`, and `actions` columns. The password fields are hidden.

**Example - Conditional Exclude:**

```vue
<script lang="ts" setup>
const userRole = ref('viewer')

const table = useTable({
  form,
  columns: () => ({
    firstName: { label: 'First Name' },
    lastName: { label: 'Last Name' },
    salary: {
      label: 'Salary',
      exclude: userRole.value !== 'admin'  // Only admins see salary // [!code highlight]
    },
    actions: {
      exclude: userRole.value === 'viewer'  // Viewers can't edit // [!code highlight]
    }
  }),
  settings: { url: 'users/' }
})
</script>
```

::: tip Use Cases for `exclude`
- **Hide Sensitive Fields**: Exclude password, token, or sensitive data columns from table display
- **Form-Only Fields**: Hide fields that are only needed in forms (confirmPassword, terms acceptance, etc.)
- **Role-Based Visibility**: Conditionally hide columns based on user permissions
- **Responsive Tables**: Hide less important columns on smaller screens
- **Simplified Tables**: Remove clutter by excluding fields users don't need to see in list view
:::

::: info `exclude` vs Not Defining Column
- Using `exclude: true` explicitly hides an inherited column
- Not defining a column at all has the same effect for custom (non-form) columns
- Use `exclude` when you want to be explicit about hiding inherited columns
:::

## Framework-Specific Properties

FancyCRUD allows you to pass any properties specific to your UI framework's table components. These properties are passed directly to the underlying framework component.

### Vuetify Example

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: {
      label: 'Name',
      sortable: true,
      // Vuetify-specific props
      cellClass: 'font-weight-bold',
      headerClass: 'primary--text'
    },
    status: {
      label: 'Status',
      align: 'center',
      // Vuetify-specific props
      divider: true
    }
  },
  settings: { url: 'users/' }
})
</script>
```

### Element Plus Example

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: {
      label: 'Name',
      sortable: true,
      // Element Plus-specific props
      fixed: 'left',
      resizable: true
    },
    actions: {
      label: 'Actions',
      // Element Plus-specific props
      fixed: 'right'
    }
  },
  settings: { url: 'users/' }
})
</script>
```

### Quasar Example

```vue
<script lang="ts" setup>
const table = useTable({
  form,
  columns: {
    name: {
      label: 'Name',
      sortable: true,
      // Quasar-specific props
      headerStyle: 'font-weight: bold',
      style: 'max-width: 200px'
    }
  },
  settings: { url: 'users/' }
})
</script>
```

::: tip Framework Compatibility
Check your UI framework's table/column documentation for available properties. FancyCRUD passes all unrecognized properties directly to the framework component.
:::

## Column Ordering

Columns appear in the order they are defined in the `columns` object, with one exception: the `actions` column always appears last (rightmost position).

### Understanding Column Order

By default, when you use automatic column inference:
1. **Inherited columns** appear first, in the order they're defined in the form fields
2. **Custom columns** appear after inherited columns, in the order you define them
3. **Actions column** always appears last

### Method 1: Explicit Column Definition

Define all columns in your desired order:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: { type: FieldType.text, label: 'First Name' },
    lastName: { type: FieldType.text, label: 'Last Name' },
    age: { type: FieldType.text, label: 'Age' }
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    // Define columns in your desired order
    id: { label: 'ID', width: '80px' },           // 1st
    firstName: { label: 'First Name' },           // 2nd (inherited)
    lastName: { label: 'Last Name' },             // 3rd (inherited)
    email: { label: 'Email' },                    // 4th (new column)
    age: { label: 'Age', align: 'center' },       // 5th (inherited)
    createdAt: { label: 'Created', sortable: true }, // 6th (new column)
    actions: {}                                   // Always last
  },
  settings: { url: 'users/' }
})
</script>
```

### Method 2: Using `exclude` to Control Visibility

Use the `exclude` property to hide unwanted inherited columns, effectively controlling which columns appear:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: { type: FieldType.text, label: 'First Name' },
    middleName: { type: FieldType.text, label: 'Middle Name' },  // Don't want in table
    lastName: { type: FieldType.text, label: 'Last Name' },
    password: { type: FieldType.text, label: 'Password' },  // Don't want in table
    age: { type: FieldType.text, label: 'Age' }
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    // Show only the columns we want
    firstName: { label: 'First Name' },
    lastName: { label: 'Last Name' },
    age: { label: 'Age' },
    
    // Exclude columns we don't want
    middleName: {
      exclude: true  // Hidden from table // [!code highlight]
    },
    password: {
      exclude: true  // Hidden from table // [!code highlight]
    },
    
    // Add actions
    actions: {}
  },
  settings: { url: 'users/' }
})
</script>
```

**Result:** Table shows `firstName`, `lastName`, `age`, `actions` - in that order.

### Advanced: Custom Order with Mixed Columns

Combine inherited, custom, and excluded columns for complete control:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: { type: FieldType.text, label: 'First Name' },
    lastName: { type: FieldType.text, label: 'Last Name' },
    email: { type: FieldType.text, label: 'Email' },
    phone: { type: FieldType.text, label: 'Phone' },
    password: { type: FieldType.text, label: 'Password' }
  },
  settings: { url: 'users/' }
})

const table = useTable({
  form,
  columns: {
    // Custom column first
    id: { label: 'ID', width: '80px', sortable: true },
    
    // Then inherited columns in desired order
    firstName: { label: 'First Name', sortable: true },
    lastName: { label: 'Last Name', sortable: true },
    
    // Another custom column
    fullName: {
      label: 'Full Name',
      field: (row) => `${row.firstName} ${row.lastName}`
    },
    
    // More inherited columns
    email: { label: 'Email', sortable: true },
    phone: { label: 'Phone' },
    
    // Exclude password from table
    password: { exclude: true },
    
    // Custom columns at the end
    createdAt: {
      label: 'Joined',
      format: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    
    // Actions always last
    actions: { align: 'center' }
  },
  settings: { url: 'users/' }
})
</script>
```

**Result:** Columns appear as: `ID → First Name → Last Name → Full Name → Email → Phone → Joined → Actions`

::: tip Column Ordering Best Practices
1. **Most Important First**: Place the most important columns (IDs, names) at the beginning
2. **Group Related**: Keep related columns together (e.g., firstName, lastName, fullName)
3. **Actions Last**: The actions column automatically appears last - no need to control its position
4. **Use `exclude`**: Hide form-only fields (passwords, confirmations) using `exclude: true`
5. **Be Explicit**: Define columns explicitly when order matters, rather than relying on automatic inference
:::

::: warning Column Order Limitation
The order of columns in the `columns` object determines their display order, **except** for the `actions` column which always appears last. You cannot place the actions column in the middle of other columns.
:::

## Complete Example

Here's a comprehensive example combining all column features:

```vue
<template>
  <div class="user-table-container">
    <f-table v-bind="table">
      <!-- Custom cell rendering for status -->
      <template #column-status="{ row }">
        <v-chip
          :color="row.isActive ? 'success' : 'error'"
          size="small"
        >
          {{ row.isActive ? 'Active' : 'Inactive' }}
        </v-chip>
      </template>
      
      <!-- Custom actions -->
      <template #column-actions-append="{ row }">
        <v-btn
          icon="mdi-eye"
          size="small"
          @click="viewDetails(row)"
        />
      </template>
    </f-table>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useTable, FieldType } from '@fancy-crud/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
    phone: {
      type: FieldType.text,
      label: 'Phone'
    }
  },
  settings: {
    url: 'users/'
  }
})

const table = useTable({
  form,
  columns: {
    // Simple ID column
    id: {
      label: 'ID',
      sortable: true,
      align: 'center',
      width: '80px'
    },
    
    // Combined name column using field
    fullName: {
      label: 'Full Name',
      field: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      width: '200px'
    },
    
    // Email with formatting
    email: {
      label: 'Email Address',
      format: (value) => value.toLowerCase(),
      sortable: true
    },
    
    // Phone with null handling
    phone: {
      label: 'Phone Number',
      format: (value) => value || 'N/A',
      align: 'center'
    },
    
    // Status computed from multiple fields
    status: {
      label: 'Status',
      field: (row) => {
        if (row.isActive && row.emailVerified) return 'Active'
        if (row.isActive) return 'Pending Verification'
        return 'Inactive'
      },
      align: 'center',
      sortable: true
    },
    
    // Formatted date
    createdAt: {
      label: 'Joined',
      format: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      sortable: true,
      width: '120px'
    },
    
    // Days since registration
    daysSinceJoined: {
      label: 'Days Active',
      field: (row) => {
        const created = new Date(row.createdAt)
        const now = new Date()
        const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
        return days
      },
      align: 'center',
      sortable: true,
      width: '100px'
    },
    
    // Actions column
    actions: {
      label: 'Actions',
      align: 'center',
      width: '150px'
    }
  },
  settings: {
    url: 'users/',
    lookupField: 'id'
  }
})

const viewDetails = (row: any) => {
  router.push(`/users/${row.id}/details`)
}
</script>

<style scoped>
.user-table-container {
  padding: 1rem;
}
</style>
```

## Best Practices

::: tip Column Configuration Best Practices
1. **Use Automatic Inference**: Let FancyCRUD infer columns from form fields to reduce duplication
2. **Override Selectively**: Only specify properties you want to change
3. **Add Sorting Wisely**: Enable sorting on searchable/filterable columns
4. **Align Appropriately**: Follow alignment conventions (left for text, right for numbers, center for actions)
5. **Set Widths for Fixed Columns**: Define widths for ID, status, and action columns
6. **Use `format` for Simple Transforms**: Perfect for date formatting, text transforms, null handling
7. **Use `field` for Complex Logic**: When you need multiple properties or computed values
8. **Keep Performance in Mind**: Format/field functions run for every row and every render
9. **Handle Null Values**: Always check for null/undefined in format/field functions
10. **Use Slots for Rich Content**: For badges, icons, images, use slots instead of format/field
:::

::: warning Common Pitfalls
- **Overusing `field` for Simple Cases**: Use `format` when you only need the value
- **Not Handling Null Values**: Always provide fallbacks in format/field functions
- **Complex Logic in format/field**: Move heavy calculations outside or use slots
- **Forgetting Sortable**: Users expect to sort common columns like names, dates, statuses
- **Inconsistent Alignment**: Follow alignment conventions for better UX
- **Too Many Columns**: Consider hiding less important columns or using expandable rows
- **Not Setting Action Column Width**: Can cause layout issues with varying button sizes
:::

## Custom Column Rendering

For complete control over column content, use slots:

```vue
<template>
  <f-table v-bind="table">
    <!-- Replace entire cell content -->
    <template #column-status="{ row }">
      <div class="status-container">
        <v-icon :color="row.isActive ? 'success' : 'error'">
          {{ row.isActive ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
        <span>{{ row.isActive ? 'Active' : 'Inactive' }}</span>
      </div>
    </template>
    
    <!-- User avatar and name -->
    <template #column-fullName="{ row }">
      <div class="user-cell">
        <v-avatar size="32">
          <img :src="row.avatarUrl" :alt="row.firstName">
        </v-avatar>
        <span>{{ row.firstName }} {{ row.lastName }}</span>
      </div>
    </template>
    
    <!-- Tags as chips -->
    <template #column-tags="{ row }">
      <v-chip
        v-for="tag in row.tags"
        :key="tag"
        size="small"
        class="ma-1"
      >
        {{ tag }}
      </v-chip>
    </template>
  </f-table>
</template>
```

::: tip When to Use Slots vs format/field
- **Use `format`/`field`**: For text transformations, simple calculations, string formatting
- **Use Slots**: For HTML content, components, images, icons, complex layouts
:::

## TypeScript Support

FancyCRUD provides full TypeScript support for column definitions:

```typescript
import type { ColumnDefinition, TableInstance } from '@fancy-crud/vue'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  age: number
  isActive: boolean
  createdAt: string
}

const table: TableInstance = useTable({
  form,
  columns: {
    fullName: {
      label: 'Full Name',
      field: (row: User) => `${row.firstName} ${row.lastName}`,
      sortable: true
    },
    status: {
      label: 'Status',
      format: (value: boolean) => value ? 'Active' : 'Inactive',
      align: 'center'
    },
    age: {
      label: 'Age',
      format: (value: number) => `${value} years`,
      sortable: true
    }
  } satisfies Record<string, ColumnDefinition>,
  settings: {
    url: 'users/'
  }
})
```

## Troubleshooting

### Column Not Showing

**Check:**
1. Column key matches data object property name (or use `value` to map it)
2. Data is present in API response
3. Column is not hidden by wrapper-specific logic
4. No JavaScript errors in console

### Format/Field Not Working

**Check:**
1. Function is returning a value
2. Property exists in data (use optional chaining `?.`)
3. Function syntax is correct: `format: (value) => ...` or `field: (row) => ...`
4. No errors thrown in the function

### Sorting Not Working

**Check:**
1. `sortable: true` is set on the column
2. API supports sorting parameters
3. Backend implements sorting logic
4. Column key matches backend sort field name

### Alignment Not Applied

**Check:**
1. Using correct values: `'left'`, `'center'`, `'right'`
2. CSS is not overriding alignment
3. UI framework supports the align property

## Next Steps

Now that you understand columns, explore related features:

- **[Settings](/tables/settings)**: Configure table behavior and data fetching
- **[Buttons](/tables/buttons)**: Add custom toolbar buttons
- **[Filters](/tables/filters)**: Implement filtering and search
- **[Custom Components](/tables/custom-components)**: Build custom table layouts with slots
- **[Pagination](/tables/pagination)**: Configure pagination behavior
