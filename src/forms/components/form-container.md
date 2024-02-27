## Form Container
The main form container, `<f-form />`, orchestrates the integration of the aforementioned components. It offers a comprehensive structure for managing the entire form, including the header, body, and footer.

```vue
<template>
  <!-- Expanded way to pass props -->
  <f-form
    :id="fields.id"
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

### Slots

#### Header

You can modify the form header by using the `form-header` slot. For example:

```vue
<template>
  <f-form v-bind="form">
    <template #form-header>
      The best form header title
    </template>
  </f-form>
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

When using the `form-header` you have access to the `formModeTitle` bind property. Which it's a reactive property that automatically change the form title depending on the form mode

```vue
<template>
  <f-form v-bind="form">
    <template #form-header="{ formModeTitle }">
      <h5>{{ formModeTitle }}</h5>
    </template>
  </f-form>
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
