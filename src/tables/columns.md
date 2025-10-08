# Columns

When it comes to tables, columns are one of the main elements to display data. You can also use columns props from the UI Wrapper.

## Inferring columns

Columns are going to be automatically inferred from the form. Let's see the next example, we have define a form with some fields and then we're passing the form into de `useTable`, notice that we're not specifying any column inside the `columns` property. The composable will map the fields in the form and display them as table columns.

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
  columns: { },
})
</script>
```

You are able to override the columns by specifying the same `[fieldKey]` as in the form fields, for example:

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

    // We're replacing the label 'First Name' with 'Name'
    // You can do the same for other fields.
    firstName: {
      label: 'Name' // [!code highlight]
    }
  },
})
</script>
```

## Adding columns

Columns are not limited to the form fields, you are able to append as many columns as you need, let's see an example:

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
    id: {   // [!code highlight:6]
      label: 'ID'
    },
    created_at: {
      label: 'Created at'
    }
  },
})
</script>
```

The above code will generate a table with the following columns. As you can see, the `ID` and `Created at` columns were added right after the `Age` column.

| First Name | Last Name | Age | ID | Created at |
|------------|-----------|-----|----|------------|

## Action column

You're allowed to perform actions on the table rows, to accomplish that you have available the actions columns, and you only need to specify it in the `columns` property. This columns will enable the edit and delete actions for every row.

```vue
<script lang="ts" setup>
// Form declaration...

const table = useTable({
  // Other properties...

  columns: {
    actions: {   // [!code highlight:3]
      label: 'ID'
    },
  },
})
</script>
```

<Table />

<script lang="ts" setup>
import Table from './components/Table.vue'
</script>

## Wrapper attributes

You're allow to pass column properties from your preferred UI wrapper.

## Reserved attributes

### Label

| Name  | Description                                 | type     | default |
| ----- | ------------------------------------------- | -------- | ------- |
| label | Column label to display in the table header | `string` |         |

```vue
<script lang="ts" setup>
// Form declaration...

const table = useTable({
  // Other properties...

  columns: {
    // Other columns...
    firstName: {
      label: 'First name' // [!code highlight]
    },
  },
})
</script>
```

### Value

| Name  | Description                                                       | type     | default     |
| ----- | ----------------------------------------------------------------- | -------- | ----------- |
| value | Name of the object key from which the column is to take its value | `string` | [columnKey] |


Let's say we have the next objects:

```json
[
  { "id": "84e1ea10-f482-4fd4-a2bf-ca075e27ad6b", "firstName": "John", "lastName": "Doe", "age": 25 },
  { "id": "2b1f0f58-f207-4b2f-9ddb-4f3f4feb6e07", "firstName": "Jane", "lastName": "Doe", "age": 24 },
  { "id": "eeff9587-27a3-40e5-a01d-4042b0d05455", "firstName": "Jim", "lastName": "Doe", "age": 23 },
  { "id": "906aef41-0d5d-4579-9050-27c4121ac6df", "firstName": "Jill", "lastName": "Doe", "age": 22 }
]
```

By default the `value` is the same as the `[columnKey]` name, for example:

```vue
<script lang="ts" setup>
// Form declaration...

const table = useTable({
  // Other properties...

  columns: {
    // Other columns...
    firstName: {
      value: 'firstName' // [!code highlight]
    },
  },
})
</script>
```

Now, imagine that for some reason you want to show the last name in the column of the first name, you can do something like this:

```vue
<script lang="ts" setup>
// Form declaration...

const table = useTable({
  // Other properties...

  columns: {
    // Other columns...
    firstName: {
      value: 'lastName' // [!code highlight]
    },
  },
})
</script>
```

### Format

| Name   | Description                                                                                                              | type                  | default |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------- |
| format | It's a function that receives the value from the object. You can use this method modify the displayed value in the table | `(value: any) => any` |         |

:::warning
To use this method, the `[columnKey]` should exist as a property of the row object
:::

Let's see the example below:

```vue
<script lang="ts" setup>
// Form declaration...

const table = useTable({
  // Other properties...

  columns: {
    // Other columns...
    firstName: {
      format(value: string) {
        return value.toLowerCase()
      }
    },
  },
})
</script>
```

### Field

| Name   | Description                                                                                                                                  | type                               | default |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| format | Very similar to the `format` property, but this one receives the row object and index. Allows you to modify the displayed value in the table | `(row: any, index: number) => any` |         |


:::info
This method is useful if you want to add columns in the table that do not necessarily exist in the row object.
:::

This function is very useful to display a nested value in the object or merge some fields. For example:

```vue
<script lang="ts" setup>
// Form declaration...

const table = useTable({
  // Other properties...

  columns: {
    // Other columns...
    fullName: {
      field(row: { firstName: string, lastName: string}, _index: number) {
        return `${row.firstName} ${row.lastName}`
      }
    },
  },
})
</script>
```
