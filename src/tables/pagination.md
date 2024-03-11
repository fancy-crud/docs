# Pagination

This is a `limit...offset` implementation to handle pagination from the backend side. For pagination purposes the next query params will be appended in the request url:

`/?limit=[rowsPerPage]&offset=[COMPUTED_OFFSET]`

Inferring the `[rowsPerPage]` as the current `pagination.rowsPerPage` value, and the `[COMPUTED_OFFSET]` will be equal to `(pagination.page - 1) * pagination.rowsPerPage`

:::info
If you have the `table.list.hotFetch` as true, the table will trigger the `fetchData` every time the `page` or `rowsPerPage` property changes
:::

```vue
<script lang="ts" setup>
const table = useTable({
  // Other properties...

  pagination: {
    // Pagination properties...
  }
})
</script>
```

## Page

| Name | Description                          | type     | default |
| ---- | ------------------------------------ | -------- | ------- |
| page | The current page value for the table | `number` | `1`     |

:::warning
If you have the `table.list.hotFetch` as true, the table will trigger the `fetchData` every time the `page` property changes.
:::

## Rows per page

| Name        | Description                                | type     | default |
| ----------- | ------------------------------------------ | -------- | ------- |
| rowsPerPage | The number of rows to display in the table | `number` | `10`    |

:::warning
If you have the `table.list.hotFetch` as true, the table will trigger the `fetchData` every time the `rowsPerPage` property changes.
:::

## Rows per page options

| Name        | Description                                                | type     | default             |
| ----------- | ---------------------------------------------------------- | -------- | ------------------- |
| rowsPerPage | List of the available values to set in `rowsPerPage` value | `number` | `[10, 25, 50, 100]` |

## Count

| Name  | Description                                                    | type     | default             |
| ----- | -------------------------------------------------------------- | -------- | ------------------- |
| count | Property to save the total count of the records in the backend | `number` | `[10, 25, 50, 100]` |

## Hidden

| Name   | Description         | type     | default             |
| ------ | ------------------- | -------- | ------------------- |
| hidden | Hide the pagination | `number` | `[10, 25, 50, 100]` |
