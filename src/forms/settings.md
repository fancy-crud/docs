# Form Settings

Form settings allow you to customize the behavior and appearance of your forms in FancyCRUD. These settings control how the form interacts with your API, what mode it operates in, and how it displays information to users.

## Reactive Settings

FancyCRUD supports two ways to define form settings: as a static object or as a reactive function. Using the function syntax allows your settings to be computed dynamically based on other reactive state.

### Static Settings (Object Syntax)

The standard way to define settings is as a plain object:

```vue
<script lang="ts" setup>
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  }
})
</script>
```

### Reactive Settings (Function Syntax)

For more dynamic behavior, you can define settings as a function that returns an object. This is particularly useful when settings depend on reactive state:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, FieldType, FORM_MODE } from '@fancy-crud/vue'

const currentTenant = ref('tenant-1')
const isEditMode = ref(false)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: () => ({
    url: `${currentTenant.value}/users/`,
    mode: isEditMode.value ? FORM_MODE.update : FORM_MODE.create,
    title: isEditMode.value 
      ? "{{ Create User | Edit User Profile }}" 
      : "Create New User"
  })
})

// When currentTenant or isEditMode changes, settings automatically update
const switchTenant = () => {
  currentTenant.value = 'tenant-2'
  // Form URL automatically becomes 'tenant-2/users/'
}

const enableEditMode = () => {
  isEditMode.value = true
  // Form mode automatically becomes FORM_MODE.update
}
</script>
```

### Use Cases for Reactive Settings

The function syntax is especially powerful for:

#### 1. **Multi-tenant Applications**

```vue
<script lang="ts" setup>
const currentOrganization = ref('org-123')

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Product Name' }
  },
  settings: () => ({
    url: `organizations/${currentOrganization.value}/products/`
  })
})
</script>
```

#### 2. **Dynamic API Endpoints**

```vue
<script lang="ts" setup>
const apiVersion = ref('v2')
const useNewEndpoint = ref(false)

const form = useForm({
  fields: {
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: () => ({
    url: useNewEndpoint.value 
      ? `${apiVersion.value}/users/new/` 
      : `${apiVersion.value}/users/`
  })
})
</script>
```

#### 3. **Conditional Modes**

```vue
<script lang="ts" setup>
const selectedUserId = ref<string | null>(null)

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: () => ({
    url: 'users/',
    mode: selectedUserId.value ? FORM_MODE.update : FORM_MODE.create,
    lookupValue: selectedUserId.value
  })
})
</script>
```

#### 4. **User-based Configuration**

```vue
<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'

const { user, hasPermission } = useAuth()

const form = useForm({
  fields: {
    status: { type: FieldType.select, label: 'Status' }
  },
  settings: () => ({
    url: hasPermission('admin') 
      ? 'admin/users/' 
      : `users/${user.value.id}/profile/`,
    title: hasPermission('admin')
      ? "{{ Create User | Edit User }}"
      : "Edit My Profile"
  })
})
</script>
```

::: tip
Use the function syntax when your settings need to react to changes in:
- User authentication state
- Route parameters
- Component props
- Other reactive state in your application
:::

::: info
Both syntax styles can be mixed with programmatic updates. You can still manually change settings like `form.settings.mode = FORM_MODE.update` even when using the function syntax.
:::

::: warning Performance Note
The function is called reactively whenever dependencies change. For optimal performance, only include reactive values that should trigger settings updates.
:::

## URL

| Name | Type     | Default |
|------|----------|---------|
| url  | `string` | `''`    |

The `url` property is the API endpoint where the form data will be submitted. This property specifies the server endpoint responsible for processing and handling the submitted form data.

- In **create mode** (`FORM_MODE.create`): Sends a `POST` request to this URL
- In **update mode** (`FORM_MODE.update`): Sends a `PATCH` request to `{url}/{lookupValue}/`

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    },
    email: {
      type: FieldType.text,
      label: 'Email'
    }
  },
  settings: {
    url: 'users/'
  }
})
</script>
```

::: tip
Make sure to include a trailing slash in your URL if your API requires it. For example: `users/` instead of `users`
:::

## Mode

| Name | Type       | Default            |
|------|------------|--------------------|
| mode | `FormMode` | `FORM_MODE.create` |

The `mode` of the form determines whether it operates in create or update mode, which affects the HTTP method used and the form's behavior.

### Available Modes

- **`FORM_MODE.create`**: For adding new records (sends `POST` request)
- **`FORM_MODE.update`**: For editing existing records (sends `PATCH` request)

By setting this property, you control the initial state and behavior of the form.

### Create Mode Example

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    },
    email: {
      type: FieldType.text,
      label: 'Email'
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  }
})
</script>
```

When submitted, this form will send a `POST` request to `users/`

### Update Mode Example

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    },
    email: {
      type: FieldType.text,
      label: 'Email'
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.update,
    lookupValue: '123'  // ID of the record to update
  }
})
</script>
```

When submitted, this form will send a `PATCH` request to `users/123/`

::: tip
You can change the mode dynamically:
```js
// Switch to update mode
form.settings.mode = FORM_MODE.update
form.settings.lookupValue = '123'

// Switch back to create mode
form.settings.mode = FORM_MODE.create
form.settings.lookupValue = undefined
```
:::

## Lookup Field

| Name        | Type     | Default |
|-------------|----------|---------|
| lookupField | `string` | `"id"`  |

The `lookupField` is the property name used to identify a specific record when in update mode. It determines which field from your data object will be used as the `lookupValue`.

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Employee Name'
    },
    email: {
      type: FieldType.text,
      label: 'Email'
    }
  },
  settings: {
    url: 'employees/',
    lookupField: 'employee_id',  // Use employee_id instead of id
    mode: FORM_MODE.update
  }
})
</script>
```

::: tip
By default, FancyCRUD uses `id` as the lookup field, which works for most cases. Only change this if your API uses a different identifier field.
:::

## Lookup Value

| Name        | Type                       | Default     |
|-------------|----------------------------|-------------|
| lookupValue | `string \| number \| null` | `null`      |

The `lookupValue` is the identifier value that gets appended to the URL when the form is in update mode. This value is used to specify which record to update.

### How It Works

When you have a data object like this:

```ts
{
  employee_id: 1,
  name: 'Samira Gonzales',
  created_at: '2018-08-10'
}
```

And configure your form with a `lookupField`:

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Employee Name'
    }
  },
  settings: {
    url: 'employees/',
    lookupField: 'employee_id',
    mode: FORM_MODE.update
  }
})

// When you load data into the form
form.load({
  employee_id: 1,
  name: 'Samira Gonzales',
  created_at: '2018-08-10'
})
</script>
```

FancyCRUD will automatically set `form.settings.lookupValue = 1` based on the `lookupField`. When the form is submitted, it will send a `PATCH` request to `employees/1/`.

### Manual Setting

You can also manually set the `lookupValue`:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'employees/',
    mode: FORM_MODE.update,
    lookupValue: '123'  // Manually set the ID
  }
})

// Or set it dynamically
form.settings.lookupValue = '456'
</script>
```

::: info
The `lookupValue` is automatically set when you:
- Use the edit button in a table
- Call `form.load(data)` with data that contains the `lookupField`
- Manually assign a value to `form.settings.lookupValue`
:::

## Title

| Name  | Type     | Default                                                   |
|-------|----------|-----------------------------------------------------------|
| title | `string` | <code v-pre>"{{ Create record \| Update record }}"</code> |

The `title` of the form is displayed at the top of the form interface, providing users with context about the purpose of the form. You can use a dynamic placeholder syntax to display different titles based on the form's mode.

### Dynamic Title Syntax

Use the <code v-pre>{{ create_text | update_text }}</code> syntax to define different titles for create and update modes:

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    }
  },
  settings: {
    url: 'employees/',
    title: "{{ Create an Employee | Update Employee Details }}"
  }
})
</script>
```

- When `mode` is `FORM_MODE.create`: displays **"Create an Employee"**
- When `mode` is `FORM_MODE.update`: displays **"Update Employee Details"**

### Static Title

You can also use a static title that doesn't change:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'employees/',
    title: "Employee Form"  // Same title for both modes
  }
})
</script>
```

### Dynamic Title Changes

The title automatically updates when you change the form mode:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'employees/',
    title: "{{ New Employee | Edit Employee }}"
  }
})

// Switch to update mode - title automatically becomes "Edit Employee"
const editEmployee = (id: string) => {
  form.settings.mode = FORM_MODE.update
  form.settings.lookupValue = id
  // Title is now "Edit Employee"
}

// Switch to create mode - title automatically becomes "New Employee"
const createEmployee = () => {
  form.settings.mode = FORM_MODE.create
  form.settings.lookupValue = null
  form.reset()
  // Title is now "New Employee"
}
</script>
```

::: tip
Use descriptive titles that clearly indicate the form's purpose:
- ✅ <code v-pre>{{ Create User | Edit User }}</code>
- ✅ <code v-pre>{{ New Product | Update Product }}</code>
- ✅ <code v-pre>{{ Add Employee | Modify Employee Information }}</code>
:::

::: warning
If you use the dynamic syntax but only provide one value (e.g., <code v-pre>{{ Create Item }}</code>), that value will be used for both modes.
:::

## Loading

| Name    | Type      | Default |
|---------|-----------|---------|
| loading | `boolean` | `false` |

A boolean indicating whether the form is in a loading state. When set to `true`, the form displays a loading indicator and typically disables user interaction to prevent multiple submissions.

FancyCRUD automatically manages this state:
- Set to `true` when fetching data or submitting the form
- Set to `false` when the operation completes or fails

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    }
  },
  settings: {
    url: 'users/',
    loading: false
  }
})

// Watch loading state
watch(() => form.settings.loading, (isLoading) => {
  if (isLoading) {
    console.log('Form is processing...')
  } else {
    console.log('Form is ready')
  }
})
</script>
```

### Manual Control

You can manually control the loading state if needed:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Show loading indicator
const performCustomAction = async () => {
  form.settings.loading = true
  
  try {
    // Perform some async operation
    await customApiCall()
  } finally {
    form.settings.loading = false
  }
}
</script>
```

::: tip
The loading state is automatically managed during form submission and data fetching. You typically don't need to set it manually unless you're performing custom operations.
:::

## Complete Example

Here's a comprehensive example showing all form settings:

### Static Settings Example

```vue
<template>
  <div class="card">
    <f-form v-bind="form" />
  </div>
</template>

<script lang="ts" setup>
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Employee Name',
      required: true
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true
    },
    department: {
      type: FieldType.select,
      label: 'Department',
      options: ['Engineering', 'Sales', 'Marketing']
    }
  },
  settings: {
    url: 'employees/',                                    // API endpoint
    mode: FORM_MODE.create,                               // Create or update mode
    lookupField: 'id',                                    // Field to identify records
    lookupValue: null,                                    // ID of record to update
    title: "{{ New Employee | Edit Employee Details }}", // Dynamic title
    loading: false                                         // Loading state
  }
})

// Example: Switch to edit mode
const editEmployee = async (employeeId: string) => {
  form.settings.mode = FORM_MODE.update
  form.settings.lookupValue = employeeId
  
  // Fetch and load employee data
  await form.load({ id: employeeId })
}

// Example: Switch to create mode
const createEmployee = () => {
  form.settings.mode = FORM_MODE.create
  form.settings.lookupValue = null
  form.reset()
}
</script>
```

### Reactive Settings Example

```vue
<template>
  <div class="card">
    <div class="controls">
      <v-btn @click="currentDepartment = 'engineering'">Engineering</v-btn>
      <v-btn @click="currentDepartment = 'sales'">Sales</v-btn>
      <v-btn @click="editEmployee('123')">Edit Employee 123</v-btn>
    </div>
    
    <f-form v-bind="form" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FORM_MODE, useForm, FieldType } from '@fancy-crud/vue'

const currentDepartment = ref('engineering')
const selectedEmployeeId = ref<string | null>(null)

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Employee Name',
      required: true
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      required: true
    }
  },
  settings: () => ({
    // URL dynamically includes the current department
    url: `departments/${currentDepartment.value}/employees/`,
    
    // Mode changes based on whether an employee is selected
    mode: selectedEmployeeId.value ? FORM_MODE.update : FORM_MODE.create,
    
    // Lookup value is the selected employee ID
    lookupValue: selectedEmployeeId.value,
    
    // Title changes based on mode
    title: selectedEmployeeId.value
      ? `{{ Add Employee to ${currentDepartment.value} | Edit Employee }}`
      : `Add Employee to ${currentDepartment.value}`,
    
    lookupField: 'id',
    loading: false
  })
})

// Switch department - settings automatically update
const switchDepartment = (dept: string) => {
  currentDepartment.value = dept
  // URL automatically becomes: departments/{dept}/employees/
}

// Edit employee - mode automatically changes to update
const editEmployee = async (employeeId: string) => {
  selectedEmployeeId.value = employeeId
  // Mode automatically becomes FORM_MODE.update
  // URL automatically includes lookupValue
  await form.load({ id: employeeId })
}

// Create new employee - mode automatically changes to create
const createEmployee = () => {
  selectedEmployeeId.value = null
  // Mode automatically becomes FORM_MODE.create
  form.reset()
}
</script>
```

## Programmatic Control

You can programmatically control all form settings:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' }
  },
  settings: {
    url: 'users/'
  }
})

// Change the URL dynamically
const changeEndpoint = (newUrl: string) => {
  form.settings.url = newUrl
}

// Switch modes dynamically
const switchToEditMode = (userId: string) => {
  form.settings.mode = FORM_MODE.update
  form.settings.lookupValue = userId
  form.settings.title = "{{ Create User | Edit User Profile }}"
}

// Reset to create mode
const resetToCreate = () => {
  form.settings.mode = FORM_MODE.create
  form.settings.lookupValue = null
  form.reset()
}
</script>
```

## Default Values

All form settings have sensible defaults:

```ts
{
  url: '',
  mode: FORM_MODE.create,
  lookupField: 'id',
  lookupValue: null,
  title: '{{ Create record | Update record }}',
  loading: false
}
```

You only need to specify settings that differ from the defaults.

## Next Steps

- Learn about [Form Fields](/forms/fields/) to understand how to define form inputs
- Explore [Form Buttons](/forms/buttons) to customize form actions
- Check out [Form Rules](/forms/rules) for validation
- Read about [Form Commands](/forms/commands) for custom behaviors
- Discover [Response Interceptors](/forms/response-interceptors) to handle API responses