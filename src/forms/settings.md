# Settings
When working with forms, it's common to provide settings to customize the behavior and appearance of the form.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
    }
  },
  settings: {
    url: 'profile/colors'
  }
})
</script>
```

### Explanation
 * **url**: The API endpoint where the form data will be submitted.
 * **mode**: The mode of the form, whether it's in edit mode (`FORM_MODE.edit`) or create mode (`FORM_MODE.create`).
 * **lookupField**: The default lookup field used for searching records.
 * **title**: The title of the form, which is a string that can include placeholders for dynamic values.
 * **loading**: A boolean indicating whether the form is in a loading state.