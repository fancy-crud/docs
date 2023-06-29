# Introduction
FancyCRUD is a powerful library specifically designed to facilitate the creation of forms and tables, handling the Create, Read, Update, and Delete (CRUD) process.

## Installation
We don't want limitations with the use of UI Frameworks. We known there are many alternatives and all of them are really powerful and unique. We're planning to handle them by using wrappers. Right now, you can use a wrapper for:

- [Oruga](https://oruga.io/)

:::tip INFO
We're working to bring more and more wrappers 😃.
:::

The next command will install `FancyCRUD` and the `oruga-wrapper`

```bash
npm i @fancy-crud/vue @fancy-crud/oruga-wrapper
```

## Configuration
Let's see the base configuration in your entry file(usually main.ts or main.js), and your entry file for styles.

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import axios from 'axios'
import Oruga from '@oruga-ui/oruga-next'
import FancyCrud from '@fancy-crud/vue'

// import the components and base styles from Oruga
import { fields, table, utils, defaultClasses } from '@fancy-crud/oruga-wrapper'

import App from './App.vue'

// You're main file for styles
import './styles/main.css'

// We're using axios to trigger the http requests
axios.defaults.baseURL = 'http://localhost:9000/api/'

const app = createApp(App)

app.use(Oruga)
app.use(FancyCrud, {
  http: {
    service: axios,
  },
  fields,
  utils,
  table,
  defaultClasses,
})

app.mount('#app')
```

```css [main.css]
/* 
  If the UI has CSS styles,
  you should import them before the FancyCRUD styles.
  After that, you can add your own classes
  and additional styles.
*/
@import '@oruga-ui/oruga-next/dist/oruga-full.css';
@import '@fancy-crud/vue/dist/fancy-crud-vue.css';
```
:::
## Usage example
The next code creates a simple form with two field, first name and last name.

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
<FormExample />
<script setup>
import FormExample from '@theme/components/form.vue'
</script>