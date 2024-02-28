# Fields
When you use `FancyCRUD` you can create forms just by specifying the fields and their attributes, and it will create the **HTML structure, handle the form data, send the request, handle the responses, display notifications, display any field error, and more.**

Fields are one of the main utilities to create forms using FancyCRUD. As long you're using any of the existing wrapper, you should be able to use the props and slots from the source UI Framework.

To get the correctly fields structure we need to pass the raw fields to `useForm` composable. This function will return a normalized fields to interact with. 

Let's see the next example:

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
We're defining a form with the field `firstName` and `lastName`. Even when we're just defining three attributes(`type`, `label` and `placeholder`) inside these fields. The composable will normalized them and it going to add all the necessary attributes into each field.

So, we will have a structure as the next:

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

Also, you can override those default values by passing the key with another custom value. Then you will be able to access to those properties as the follow example:

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