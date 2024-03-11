# List

This property allows you to handle the data that will be displayed in the table.

## Data

| Name | Description                                                  | type    | default |
| ---- | ------------------------------------------------------------ | ------- | ------- |
| data | Data source of the items that will be displayed in the table | `any[]` | `[]`    |

:::warning
The `data` property cannot be initialized with a default value. If you want to set a default value, please, use the `fetchData` method.
:::

```vue
<script lang="ts" setup>
const table = useTable({
  // Other properties...

  list: {
    data: []
  }
})
</script>
```

## Fetch data

| Name      | Description                                                                                   | type         | default |
| --------- | --------------------------------------------------------------------------------------------- | ------------ | ------- |
| fetchData | This method allows you to fetch items from the endpoint specified in the `table.settings.url` | `() => void` |         |

By default, the `fetchData` method executes the `FetchListDataCommand`. So, the function it's the next one:

```ts
table.list.fetchData = () => {
  const table = tableStore.searchById(id)!
  bus.execute(
    new FetchListDataCommand(id, table.pagination.page, table.list.options),
  )
}
```

You can override this function if you want to. For example:

```vue
<script lang="ts" setup>
import axios from 'axios'

const bus = new Bus()

const table = useTable({
  // Other properties...

  list: {
    fetchData() {
      axios.get('api/users/').then(response => {
        console.log(response.data) // [{"id": 1, "name": "John" }, { "id": 2, "name": "Carlos" }]
        
        bus.execute(
          new SetListDataCommand(tableId, response.data),
        )
      })
    }
  }
})
</script>
```

As you can see in the example above, we're fetching some data from the users endpoint, then we're using the `SetListDataCommand` to set those values in the `table.list.data`. This approach has some advantages over just assign the values directly into the `table.list.data`; one of those advantages is the compute of the table pagination.

### Response structure
By default, the list is expecting two possible response structures:

1. This structure is useful for paginated results:
    - The `count` key will be used to know the total number of records saved, and the value will be assign to `table.pagination.count`
    - The `results` key should contain an array of objects.

```ts
// response

{
  count: number,
  results: [
    // list of records
    // ...
  ]
}
```

With this structure the table will take the values from `response.data.results`

2. The second structure is to get all the values directly from the `response.data`. Then the `count` value will be equal to the array length

```ts
// response

[
  // list of records
  // ...
]
```

With this structure the table will take the values from `response.data`

## isFetching

| Name       | Description                        | type      | default |
| ---------- | ---------------------------------- | --------- | ------- |
| isFetching | Allows you to set a loading status | `boolean` |         |

:::info
If you're not overriding the `fetchData` or you are using the `FetchListDataCommand`, the status `table.list.isFetching` will be automatically handled
:::

## Options

Some options to manipulate the list behavior

| Name        | Description                                                                         | type                      | default |
| ----------- | ----------------------------------------------------------------------------------- | ------------------------- | ------- |
| autoTrigger | If the value is true, it will trigger the fetchData automatically                   | `boolean`                 | `true`  |
| hotFetch    | Automatically trigger fetchData when a `filterParam` change                         | `boolean`                 | `true`  |
| onInit      | Actionable hook to run tasks. Only available if you do not override the `fetchData` | `() => void`              |         |
| onSuccess   | Actionable hook to run tasks. Only available if you do not override the `fetchData` | `(response: any) => void` |         |
| onFailed    | Actionable hook to run tasks. Only available if you do not override the `fetchData` | `(error: any) => void`    |         |
| onFinally   | Actionable hook to run tasks. Only available if you do not override the `fetchData` | `() => void`              |         |
