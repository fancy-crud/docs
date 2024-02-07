## Events
Fields also allows you to handle events from the native HTML input or custom events from the ui wrapper like `click`, `blur`, `focus`, etc. See the next example:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      onFocus: () => {
        // Do something
      },

      onBlur: () => {
        // Do something
      }
    }
  }
})
</script>
```
