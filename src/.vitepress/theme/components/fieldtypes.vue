<template>
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
      type: FieldType.text, // [!code focus]
      label: 'First name',
    },
    favoriteColor: {
      type: FieldType.color, // [!code focus]
      label: 'Favorite color',
    },
    password: {
      type: FieldType.password, // [!code focus]
      label: 'Password',
    },
    birthDate: {
      type: FieldType.datepicker, // [!code focus]
      label: 'Birth date',
    },
    role: {
      type: FieldType.radio, // [!code focus]
      label: 'Role',
      options: ["Manager", "Developer", "Sales"]
    },
    programmingLanguage: {
      type: FieldType.select, // [!code focus]
      label: 'Skills',
      options: ["Python", "Vue", "Typescript", "FancyCRUD", "NodeJS"]
    },
    comments: {
      type: FieldType.textarea, // [!code focus]
      label: 'Comments',
    },
  }
})
</script>
