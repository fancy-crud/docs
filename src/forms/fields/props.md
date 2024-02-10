## Props
You're able to use the props from the selected ui wrapper. For example, let's say we are using Oruga UI as our wrapper and we're going to pass `rounded` prop into our `firstName` field. When the `FancyCRUD` map our field to the [oruga input](https://oruga.io/components/Input.html#props), it will pass the props , including the `rounded` prop. So, you will have the same aspect or functionality as the oruga docs mention.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      rounded: true, // [!code focus]
    }
  }
})
</script>
```
