# Settings
When working with forms, it's common to provide settings to customize the behavior and appearance of the form.

## URL

`required: true`

`type: string`


The `url` property is the API endpoint where the form data will be submitted. This setting allows you to specify the server endpoint responsible for processing and handling the submitted form data. It should be a string representing the URL where the form will send its data.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    ...
  },
  settings: {
    url: 'profile/colors'
  }
})
</script>
```

## Mode

`default: FORM_MODE.create`

`type: FormMode`


The `mode` of the form, determining whether it operates in:

- Create mode -> `FORM_MODE.create`
- Edit mode -> `FORM_MODE.update`

In create mode is for adding new records, and it will trigger a `POST` HTTP request. By setting this property, you control the initial state and behavior of the form.

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    ...
  },
  settings: {
    mode: FORM_MODE.create
  }
})
</script>
```

While edit mode, the form is typically used to modify existing data, and it will trigger a `PATCH` HTTP request.

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    ...
  },
  settings: {
    mode: FORM_MODE.update
  }
})
</script>
```

## lookupField & lookupValue

The `lookupField` is the key name to set the `lookupValue`, where the `lookupValue` it's the value concatenated at the end of the url. For example:

```ts
{
  employee_id: 1,
  name: 'Samira Gonzales',
  created_at: '2018-08-10'
}
```

And you have the next form:

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: "Employee name"
    }
  },
  settings: {
    url: 'employees/',
    lookupField: "employee_id"
    mode: FORM_MODE.update
  }
})

</script>
```

Also, you can manually set the `lookupValue`, by accessing the settings key: `form.settings.lookupValue`

## Title

The `title` of the form, represented as a string that can include placeholders for dynamic values. This title is often displayed at the top of the form interface, providing users with context about the purpose of the form. You can use placeholders, to dynamically change the title based on the form's mode. As you can see in the example below, the form will display "Create an Employee" when it's in `FORM_MODE.create`; and it will to display "Please be careful when editing employee" when it's in `FORM_MODE.update`

```vue
<script lang="ts" setup>
import { FORM_MODE, useForm } from '@fancy-crud/vue'

const form = useForm({
  settings: {
    title: "{{ Create an Employee | Please be careful when editing employee }}"
  }
})

</script>
```

## Loading

A boolean indicating whether the form is in a `loading` state. When set to true, it signifies that the form is currently processing or fetching data, and a loading indicator may be displayed. This setting is particularly useful for informing users about ongoing background operations, enhancing the overall user experience by providing feedback on the form's status.