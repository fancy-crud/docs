# Concepts
When we are in the process to create a website, we'll be in the case to create one or more forms. And it's very likely that we have worked on any form before, so we go to another project and copy and paste parts of the older code, make some changes and voilà... right?.

Yep, sometimes it could be just as ease like that, but in other cases we need to add more fields, so we need extra HTML, Javascript code, validations, handle the field values, send data into the requests, handle responses, display notifications and so on. At the end, our code becomes messy.

For those cases we have `Forms` from `FancyCRUD`. You can create forms just specifying the fields and their attributes, and `FancyCRUD` will create the **HTML structure, handle the form data, send the request, handle the responses, display notifications, display any field error, and more.**

## Fields
Fields are one of the main utilities to create forms using FancyCRUD. As long you're using any of the existing wrapper, you should be able to use the props and slots from the source UI Framework


## Demo
<FormExample />
<script setup>
import FormExample from './form.vue'
</script>

### Structure
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
We're defining a form with the field `firstName`. Even when we're just defining two values inside the firstName field (`type` and `label`). The composable will normalized the field structure and it going to add all the necessary values into the field.

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

And then we will be able to access to those properties as the follow example:

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
console.log(form.fields.firstName.id) // field-firstName-control
console.log(form.fields.firstName.errors) // []
console.log(form.fields.firstName.modelValue) // null
console.log(form.fields.firstName.label) // First name
</script>
```

But you're able to add other attributes or events to your field. This allows you to use any `prop` from the UI Framework that you're working with. For example, let's say we are using oruga as our ui wrapper and we're going to pass `rounded` prop into our `firstName` field. When the `FancyCRUD` map our field to the [oruga input](https://oruga.io/components/Input.html#props), it will receive all attributes as component props, including the `rounded` prop.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      rounded: true, // [!code focus:3]
      onInput: (e) => console.log(e),
      onBlur: (e) => console.log("Come back")
    }
  }
})
</script>
```

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

## Field types
Forms are nothing without fields. So, we can use multiple field types to create those forms. Right now we have the next field types:

- [Text](https://)
- [Password](https://)
- [Color](https://)
- [Datepicker](https://)
- [Radio](https://)
- [Select](https://)
- [Textarea](https://)

We're working to bring more and more field types :).

## Default attributes
As you know, even when we have different field types there are some common attributes for every field. `label`, `id` or `modelValue` to say something. But there are specific attributes for few of these field types.

Let's take the `select` field type. For this field we have 3 extra attributes:

- options
- optionValue
- optionLabel

Take a look at the next code:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      options: ['red', 'blue', 'purple']
    }
  }
})
</script>
```
 Since we are using `select` field type. The `FancyCRUD` already now how to work with this field type. But, if we using a field type like `text`, no extra functionality will be added to the field. Even tho, you will be able to handle and work with that attribute. You can read more in the [select field section](./fields/select.md)


::: warning Working
Comming soon
:::