<template>
  <f-form v-bind="form">
    <template #before-field-email="{ field }">
      <p class="col-span-12">Your email is: {{ field.modelValue }}</p>
    </template>

    <template #field-email>
      <input v-model="form.fields.email.modelValue" placeholder="Type your email" class="col-span-12" />
    </template>

    <template #after-field-email>
      <p class="col-span-12">
        <input type="checkbox">
        <span class="pl-1">Do you want to receive ads?</span>
      </p>
    </template>
  </f-form>
</template>

<script lang="ts" setup>
import { FieldType, useForm } from '@fancy-crud/vue';

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email'
    },
  },
})
</script>

<style scoped>
.col-span-12 {
  grid-column: span 12 / span 12;
}

.pl-1 {
  padding-left: 0.5rem;
}

input {
  border: 1px solid #4f4f4f;
  border-radius: 5px;
  padding: 1rem;
}
</style>