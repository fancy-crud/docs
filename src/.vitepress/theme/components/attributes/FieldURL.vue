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

const employees = [
  { id: 1, name: 'Marco', age: 34 },
  { id: 2, name: 'Linda', age: 28 },
  { id: 3, name: 'Alex', age: 42 },
  { id: 4, name: 'Emily', age: 31 },
  { id: 5, name: 'Jordan', age: 35 }
];

const form = useForm({
  fields: {
    employee: {
      type: FieldType.select,
      label: 'Employee',
      options: employees,
      optionValue: 'id',
      optionLabel: 'name'
    },
  },
  settings: {
    url: 'assign/tasks/'
  },
})
</script>

