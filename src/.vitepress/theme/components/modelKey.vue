<template>
  <v-text-field label="Rename modelKey (illustration purpose only)" v-model="modelKey"></v-text-field>

  <v-card>
    <v-card-text>
      <f-form v-bind="form" />
    </v-card-text>
  </v-card>
  <br>

  <h6>Request payload</h6>
  <br>
  <code>{{ requestData.jsonForm }}</code>
  <br>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue'
import { FieldType, GenerateFormDataCommand, useForm } from '@fancy-crud/vue'

const modelKey = ref('firstName')

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelKey: modelKey.value
    },
  },
  settings: {
    url: 'endpoint/'
  },
})

const requestData = computed(() => {
  return form.bus.execute(
    new GenerateFormDataCommand(form.fields)
  )
})

watch(modelKey, () => {
  form.fields.firstName.modelKey = modelKey.value
})
</script>

