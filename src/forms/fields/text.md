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
    name: {
      type: FieldType.text,
      label: 'Name',
      placeholder: 'John Doe',
    },
  },
  settings: {
    url: 'endpoint/',
  }
})
</script>
```

## Props
You can use the same native attributes for `<input type="text">` like `placeholder`, `readonly`, `disabled`, etc.
Also, the props from the UI that you chooses as wrapper:

----

<!--@include: ./default-props/id.md -->

<!--@include: ./default-props/class.md -->

<!--@include: ./default-props/model-value.md -->

<!--@include: ./default-props/model-key.md -->

<!--@include: ./default-props/errors.md -->

<!--@include: ./default-props/name.md -->

<!--@include: ./default-props/ref.md  -->

<!--@include: ./default-props/was-focused.md  -->
