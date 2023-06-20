<template>
  <div class="card">
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

<style lang="sass" scoped>
.card
  padding: 1rem
  background-color: #f9f9f9
  border-radius: 1rem

:deep(.f-form-header__title)
  color: #363636 !important
</style>
