# Tables

`FancyCRUD` can help you with rendering tables, viewing data, or deleting existing records. You can combine it with `forms` to allow the user to create or edit records.

In the next example you can see how to create a table, by using the `useTable` and `useForm` composables.

<<< ./components/Table.vue

<Table />

<script lang="ts" setup>
import Table from './components/Table.vue'
</script>

The table is performing a GET requests to the endpoint `/api/users/`, which can be and endpoint from your backend side. This endpoint is returning the next response:

```json
{
  "data": [
    { "id": "84e1ea10-f482-4fd4-a2bf-ca075e27ad6b", "firstName": "John", "lastName": "Doe", "age": 25 },
    { "id": "2b1f0f58-f207-4b2f-9ddb-4f3f4feb6e07", "firstName": "Jane", "lastName": "Doe", "age": 24 },
    { "id": "eeff9587-27a3-40e5-a01d-4042b0d05455", "firstName": "Jim", "lastName": "Doe", "age": 23 },
    { "id": "906aef41-0d5d-4579-9050-27c4121ac6df", "firstName": "Jill", "lastName": "Doe", "age": 22 }
  ]
}
```

Then the table is mapping the column with the corresponding object key in the data array.
