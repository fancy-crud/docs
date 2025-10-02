<template>
  <v-card>
    <v-card-text>
      <f-form v-bind="form" />
    </v-card-text>
  </v-card>
  <br>
  <h6>Request payload</h6>
  <br>

  <code>url: {{ form.settings.url }}</code>
  <br>
  <code>payload: {{ requestData.jsonForm }}</code>
  <br>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { FieldType, GenerateFormDataCommand, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John',
      rules: (value) => !!value || 'First name is required',
    },
    lastName: {
      type: FieldType.text,
      label: 'Last name',
      placeholder: 'Doe',
      rules: (value) => !!value || 'Last name is required',
    },
  },
  settings: {
    url: 'users/',
  },
})

const requestData = computed(() => {
  return form.bus.execute(
    new GenerateFormDataCommand(form.fields)
  )
})
</script>

