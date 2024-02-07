<template>
  <v-card>
    <v-card-text>
      <f-form v-bind="form" />
    </v-card-text>
  </v-card>
  <br>
</template>

<script lang="ts" setup>
import { FieldType, useForm } from '@fancy-crud/vue'


const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      errors: ['Displaying an error']
    },
  },
  settings: {
    url: 'endpoint/'
  },
})
</script>

