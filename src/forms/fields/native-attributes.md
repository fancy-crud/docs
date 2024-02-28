## Native attributes

Fields are available to use attributes from native HTML inputs, or specify attributes from the ui wrapper.

For example, let's say we are using Vuetify as our wrapper and we're going to use `placeholder` attribute into our `firstName` field. When the `FancyCRUD` map our field, it will pass all the attributes to the input, and display the text in the `placeholder` attribute.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John Doe', // [!code highlight]
    }
  }
})
</script>
```

As you know, even when we have different field types there are some common attributes for every field; `class`, `id` or `name`. But there are specific attributes to handle some reserved actions and manage the input value.
