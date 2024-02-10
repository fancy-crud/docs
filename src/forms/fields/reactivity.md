## Reactivity
Once we have the normalized fields, we are getting reactive objects. This allow us to use the fields with watch/computed or any other reactive method.


```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name'
    }
  }
})
// [!code focus:5]
const hasErrors = computed(() => !!form.fields.firstName.errors.length)

watch(() => form.fields.firstName.modelValue, (value) => {
  console.log(value)
})
</script>
```
