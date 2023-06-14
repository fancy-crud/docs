# Get Started
FancyCRUD is a library intended for the creation of forms and tables, streamlining the process of creating everything from registration or login forms to complex dashboards.

## Installation
We don't want limitations with the use of UI Frameworks. We known there are many alternatives and all of them are really powerful and unique. We're planning to handle them by using wrappers. Right now you can use a wrapper for:

- [Oruga](https://oruga.io/)


The next command will install `FancyCRUD` and the `oruga-wrapper`

```bash
npm i @fancy-crud/vue @fancy-crud/oruga-wrapper
```

## Configuration
Let's see the base configuration to use FancyCRUD.

```ts
// main.ts

import { createApp } from 'vue'
import axios from 'axios'
import Oruga from '@oruga-ui/oruga-next'
import FancyCrud from '@fancy-crud/vue'

// import the components from Oruga and base styles
import { fields, table, utils, defaultClasses } from '@fancy-crud/oruga-wrapper'

import App from './App.vue'

import '@oruga-ui/oruga-next/dist/oruga-full.css'

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

## Usage example
The next code creates a simple form for user registration

```vue
<template>
    <f-form v-bind="form" />
</template>

<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
    // Specify the fields for the form
    fields: {
        firstName: {
            type: FieldType.text,
            label: 'First name',
        },
        lastName: {
            type: FieldType.text,
            label: 'Last name',
        },
        password: {
            type: FieldType.password,
            label: 'Password',
            showPassword: false
        },
    },
    settings: {
        // The endpoint to send the form data
        url: '/registration'
    }
})
</script>
```
