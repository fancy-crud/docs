## Form Container
The main form container, `f-form`, orchestrates the integration of the aforementioned components. It offers a comprehensive structure for managing the entire form, including the header, body, and footer.

### Props

| Name     | Description                                      | Type                 | Default |
|----------|--------------------------------------------------|----------------------|---------|
| id       | Form ID as symbol value                          | `symbol`             |         |
| fields   | Normalized fields to render in the form          | `NormalizedFields`   |         |
| settings | Normalized settings to manage form behavior      | `NormalizedSettings` |         |
| buttons  | Normalized buttons to display in the form footer | `NormalizedButtons`  |         |

```vue
<template>
  <!-- Expanded way to pass props -->
  <f-form
    :id="form.id"
    :fields="form.fields"
    :buttons="form.buttons"
    :settings="form.settings"
  />

  <!-- This is the shortcut to pass all the props -->
  <f-form v-bind="form" />
</template>

<script lang="ts" setup>
import { FieldType, useForm } from '@fancy-crud/vue';

const form = useForm({
  fields: {
    // Some fields...
  },
  settings: {
    // Some settings...
  },
})
</script>
```

### Events

| Name     | Description                                                | Type                      |
|----------|------------------------------------------------------------|---------------------------|
| @success | Event emitted when the create/update a record successfully | `(response: any) => void` |
| @error   | Event emitted after a create/update record fails           | `(error?: any) => void`   |

### Slots

| Name                              | Description                                                             | Scope                                     |
|-----------------------------------|-------------------------------------------------------------------------|-------------------------------------------|
| form-header                       | Allows you to use the default slot as in <br> `f-form-header` component | Same as in <br> `f-form-header` component |
| (before-\|after-)field-[fieldKey] | Allows you to use the same slots as in <br> `f-form-body` component     | Same as in <br> `f-form-body` component   |
| form-footer                       | Allows you to use the default slot as in <br> `f-form-footer` component | Same as in <br> `f-form-footer` component |
