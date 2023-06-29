<template>
  <div class="card">
    <f-form v-bind="form" />
  </div>
  <!-- <h3>{{ fullName }}</h3> -->
  <br>
  <h6>Request</h6>
  <br>

  <code>url: {{ form.settings.url }}</code>
  <br>
  <code>payload:</code>
  <br>
  <pre>{{ requestData.jsonForm }}</pre>
  <br>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
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

const fullName = computed(() => {
  const firstName = form.fields.firstName.modelValue || ''
  const lastName = form.fields.lastName.modelValue || ''

  if (firstName || lastName)
    return `Hello, ${firstName} ${lastName}`

  return ''
})

const requestData = computed(() => {
  return form.manager.getFormData()
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
