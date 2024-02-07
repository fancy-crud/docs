<template>
  <code>modelValue: {{ form.fields.firstName.modelValue }}</code>
  <br/>
  <br/>
  <v-card>
    <v-card-text>
      <f-form v-bind="form"></f-form>
    </v-card-text>
  </v-card>

</template>
  
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelValue: 'Juan Camaney'
    },
  }
})
</script>
