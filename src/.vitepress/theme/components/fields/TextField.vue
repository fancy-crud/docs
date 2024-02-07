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
      label: 'Name',
      placeholder: 'John Doe',
    },
  },
  settings: {
    url: 'endpoint/',
  }
})
</script>
