<template>
  <f-form v-bind="form" />
</template>

<script lang="ts" setup>
import { useForm, FieldType, Bus, register } from '@fancy-crud/vue'
import { GreetCommand, IGreetHandler } from '../command-basics/commands/greet'
import { GreetHandler } from './handlers/greet';

register(IGreetHandler.name, GreetHandler)

const bus = new Bus()

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name',
      modelValue: ''
    }
  },
  buttons: {
    main: {
      label: 'Greetings',
      onClick: sayHello
    }
  },
  settings: {
    title: 'Say Hello to'
  }
})

function sayHello() {
  const greetings = bus.execute(
    new GreetCommand(form.fields.name.modelValue)
  )

  alert(greetings)
}
</script>
