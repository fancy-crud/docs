# Introduction
FancyCRUD is a powerful library designed to facilitate the creation of forms and tables; handling the CRUD (Create, Read, Update, and Delete) process.

# Why?
When we are in the process to create a website, we'll be in the case to create one or more forms. And it's very likely that we have worked on any form before, so we go to our last project, copy and paste parts of the older code, make some changes and voilà... right?.

Well... sometimes it could be just as ease like that, but in other cases we need to add more fields, then we need extra HTML, Javascript code, validations, handle the field values, send data into the requests, handle responses, display notifications and so on. At the end, our code becomes messy and repetitive. For those cases we create `FancyCRUD`.

## Installation
We don't want limitations with the use of UI Frameworks. We known there are many alternatives and all of them are really powerful and unique. We're planning to handle them by using wrappers. Right now, you can use a wrapper for:

<!--@include: @/add-ons/wrappers.md -->

:::tip INFO
We're working to bring more and more wrappers 😃.
:::

The next command will install `FancyCRUD` and `wrapper-vuetify`

::: code-group
```bash [NPM]
npm i @fancy-crud/vue @fancy-crud/wrapper-vuetify
```
```bash [PNPM]
pnpm add @fancy-crud/vue @fancy-crud/wrapper-vuetify
```
```bash [Yarn]
yarn add @fancy-crud/vue @fancy-crud/wrapper-vuetify
```
:::

## Configuration
Let's create `fancy-crud.config.ts` file which it's going to contain the base configuration.

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'

import components, { styles } from '@fancy-crud/wrapper-vuetify'
import { axios } from 'axios'

export const fancyCrud = defineConfig({
  http: {
    request: axios,
  },
  components
  styles,
})
```
:::

Then we just need to add the configuration as a Vue Plugin in the root file (usually main.ts or main.js if you're not using typescript)

::: code-group
```ts [main.ts]
import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// FancyCRUD configurations
import { FancyCrud } from '@fancy-crud/vue'
import fancyCrudConfig from './fancy-crud.config'

import '@mdi/font/css/materialdesignicons.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'
import '@fancy-crud/wrapper-vuetify/dist/fancy-crud-wrapper-vuetify.css'

import App from './App.vue'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.user(vuetify)
app.use(FancyCrud, fancyCrud)
app.mount('#app')
```
:::

## Usage example
The next code creates a simple form with two fields, first name and last name.

```vue
<template>
  <f-form v-bind="form" />
</template>

<script lang="ts" setup>
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
</script>
```

## Demo
Then if you click on "Create new", it will trigger a `POST` request to send the payload below.

<FormExample />
<script setup>
import FormExample from '@theme/components/form.vue'
</script>