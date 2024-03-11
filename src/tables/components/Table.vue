<template>
  <f-table v-bind="table" />
</template>
  
<script setup lang='ts'>
import { FieldType, useForm, useTable } from '@fancy-crud/vue';

// The next form will be used to create/edit records
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First Name'
    },
    lastName: {
      type: FieldType.text,
      label: 'Last Name' 
    },
    age: {
      type: FieldType.text,
      label: 'Age'
    }
  },
  settings: {
    url: '/api/users/',
  }
})

// The next table will be used to display the records
// and to perform actions on them
const table = useTable({
  // The form to create/edit records
  form,

  // Columns are going to be automatically inferred from the form
  // but you can override them here and add more
  columns: {
    // You need to specify the actions column
    // if you want to perform actions on the records
    actions: {}
  },
  settings: {
    // The url to fetch the records and/or delete them
    url: '/api/users/',
  },
  buttons: {
    // The button to export the records.
    // This functionality is not implemented by default
    // but you can add it here
    dump: {
      onClick() {
        alert('Exporting data...')
      }
    }
  },
})
</script>