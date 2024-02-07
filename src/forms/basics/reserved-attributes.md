## Reserved attributes
Fields are available to use attributes from native HTML inputs, or specify attributes from the ui wrapper.

For example, let's say we are using Vuetify as our wrapper and we're going to use `placeholder` attribute into our `firstName` field. When the `FancyCRUD` map our field, it will pass all the attributes to the input, and display the text in the `placeholder` attribute.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John Doe', // [!code focus]
    }
  }
})
</script>
```

As you know, even when we have different field types there are some common attributes for every field; `class`, `id` or `name`. But there are specific attributes to handle some reserved actions and manage the input value.

## Attribute: modelValue
`default: null`

`type: any`

This attribute is to handle the input value. So you can always find the most recent value here, or set a initial value.

```vue
<template>
  <f-form v-bind="form"></f-form>
  {{ form.fields.firstName.modelValue }}
</template>
  
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelValue: 'Juan Camaney' // [!code focus]
    },
  }
})
</script>
```

<FormModelValue></FormModelValue>


## Attribute: modelKey
`default: (Same as the field key name)`

`type: string`

This attribute is responsible to handle the key name of the field to be send in the request payload.

```vue
<template>
  <f-form v-bind="form"></f-form>
</template>
  
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: { // <- field key name
      type: FieldType.text,
      label: 'First name',

      // Also, you can omit this attribute,
      // and it going to take "firstName" (field key name)
      // as default value
      modelKey: 'firstName'
    },
  }
})
</script>
```

<FormModelKey></FormModelKey>

## Attribute: errors
`default: []`

`type: string[]`

This attribute is to handle the field errors. These errors can be set from rules validation or backend validations. You can set errors programmatically as well.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    text: {
      type: FieldType.text,
      label: 'Favorite color',
      errors: ['Displaying an error']
    }
  }
})
</script>
```

<FormErrors></FormErrors>

## Attribute: options
`default: undefined`

`type: any[]`

You can use the `options` attribute to render a list of items. Then the user will be able to pick a value, and it will be assigned to `modelValue`

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

Also, you can work with objects and specify the label to be displayed, and the value to be picked. To those cases you need to use `optionLabel` and `optionValue`. Let's see an example:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const employees = [
  { id: 1, name: 'Marco', age: 34 },
  { id: 2, name: 'Linda', age: 28 },
  { id: 3, name: 'Alex', age: 42 },
  { id: 4, name: 'Emily', age: 31 },
  { id: 5, name: 'Jordan', age: 35 }
];

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      options: employees
      optionLabel: 'name',
      optionValue: 'id'
    }
  }
})
</script>
```