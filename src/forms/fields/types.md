## Types
Forms are nothing without fields. So, we can use multiple field types to create those forms. Right now we have the next field types:

- Text
- Password
- Color
- Datepicker
- Radio
- Select
- Textarea

We're working to bring more and more field types :). You can specify the field type by using the `FieldType` enumerator or using a string when you want to specify custom field types.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text, // [!code highlight]
      label: 'First name',
    }
    favoriteColor: {
      type: FieldType.color, // [!code highlight]
      label: 'Favorite color',
    },
    password: {
      type: FieldType.password, // [!code highlight]
      label: 'Password',
    },
    birthDate: {
      type: FieldType.datepicker, // [!code highlight]
      label: 'Birth date',
    },
    role: {
      type: FieldType.radio, // [!code highlight]
      label: 'Role',
      options: ["Manager", "Developer", "Sales"]
    },
    programmingLanguage: {
      type: FieldType.select, // [!code highlight]
      label: 'Skills',
      options: ["Python", "Vue", "Typescript", "FancyCRUD", "NodeJS"]
    },
    comments: {
      type: FieldType.textarea, // [!code highlight]
      label: 'Comments',
    },
  }
})
</script>
```

<FormFieldTypes />
<script setup>
import FormFieldTypes from '@theme/components/fieldtypes.vue'

</script>
