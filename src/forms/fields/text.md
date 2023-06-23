# Text
> Text input field that allows the user to enter information freely.
## Demo
<script lang="ts" setup>
import TextField from '@theme/components/fields/TextField.vue'
</script>
<TextField />
## Usage
```vue
<template>
  <div class="card">
    <f-form v-bind="form" />
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    textField: {
      type: FieldType.text,
      label: 'Text field',
      placeholder: 'Como asi pues?',
    },
  },
  settings: {
    url: 'endpoint/',
  }
})
</script>
```
## Props
Remember that you can use native attributes like `placeholder`, `readonly`, etc.
Also, the props from the UI that you chooses as wrapper.
In this section we we'll only specify those props

::: warning Still in progress
:::
