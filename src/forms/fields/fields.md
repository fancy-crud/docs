# Fields

Fields are the building blocks of forms in FancyCRUD. When you define fields, FancyCRUD automatically:

✅ Creates the HTML structure  
✅ Manages form data and state  
✅ Handles validation  
✅ Sends HTTP requests  
✅ Processes responses  
✅ Displays notifications  
✅ Shows field-specific errors  
✅ Supports reactive updates

## How Fields Work

Fields are defined as plain objects and passed to the `useForm` composable. FancyCRUD normalizes these raw field definitions, adding all necessary properties and methods to make them fully functional.

As long as you're using one of the existing wrappers (Vuetify, Element Plus, Quasar, Oruga UI), you can use all props and slots from the underlying UI framework.

## Basic Example

```vue
<template>
  <div class="card">
    <!-- Component to render the form -->
    <f-form v-bind="form" />
  </div>
</template>

<script lang="ts" setup>
import { FieldType, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John',
    },
    lastName: {
      type: FieldType.text,
      label: 'Last name',
      placeholder: 'Doe',
    },
  },
  settings: {
    url: 'endpoint/'
  },
})
</script>
```
In this example, we only defined three attributes (`type`, `label`, and `placeholder`) for each field. However, the `useForm` composable automatically normalizes these fields and adds all necessary properties.

## Field Normalization

After normalization, each field will have a complete structure like this:

```js
{
  fields: {
    firstName: {
      type: "text",
      label: "First name",
      id: `field-firstName-control`,  // [!code ++:11]
      modelKey: "firstName",
      name: "firstName",
      errors: [],
      wasFocused: false,
      modelValue: null,
      class: '',
      wrapper: {
          class: '',
      },
      ref: null,
    }
  }
}
```

### Accessing Normalized Fields

You can override any of these default values by providing your own values. All field properties are accessible and reactive:

```vue
<script lang="ts" setup>  
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelValue: 'John Doe'
    }
  }
})
// [!code highlight:5]
console.log(form.fields.firstName.modelValue) // John Doe
console.log(form.fields.firstName.label) // First name
console.log(form.fields.firstName.id) // field-firstName-control
console.log(form.fields.firstName.errors) // []
</script>
```