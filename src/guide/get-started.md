# Introduction

**FancyCRUD** is a powerful library designed to facilitate the creation of forms and tables, handling the complete CRUD (Create, Read, Update, and Delete) process with minimal boilerplate code.

## Why FancyCRUD?

When building web applications, forms are inevitable. Often, we find ourselves copying code from previous projects, making adjustments, and hoping it works. While this might seem simple at first, things get complicated quickly.

As requirements grow, you need:
- More fields and complex layouts
- Validation rules and error handling
- State management for field values
- HTTP requests with proper error handling
- Response interceptors and notifications
- Consistent UI across different forms
- Table views with pagination and filtering

Before you know it, your code becomes messy, repetitive, and hard to maintain. **FancyCRUD** solves these problems by providing a declarative, configuration-based approach to building forms and tables.

## Key Features

- 🎯 **Declarative Configuration**: Define forms and tables using simple configuration objects
- 🔄 **Command Pattern**: Built on a powerful command bus pattern for extensibility
- 🎨 **Framework Agnostic**: Works with multiple UI frameworks through wrappers
- ✅ **Built-in Validation**: Support for custom validation rules with error handling
- 🌐 **HTTP Integration**: Automatic API calls with request/response handling
- 📊 **Tables & Pagination**: Complete table functionality with sorting, filtering, and pagination
- 🔔 **Notifications**: Automatic success/error notifications
- 🎭 **Type Safe**: Full TypeScript support

## Installation

FancyCRUD is designed to work with multiple UI frameworks through wrappers. This means you're not locked into a specific component library. Currently supported frameworks:

<!--@include: @/add-ons/wrappers.md -->

:::tip
We're actively working on supporting more UI frameworks. Contributions are welcome!
:::

### Install FancyCRUD with your preferred UI framework

Choose your UI framework and install FancyCRUD with the corresponding wrapper:

#### Vuetify

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

#### Element Plus

::: code-group
```bash [NPM]
npm i @fancy-crud/vue @fancy-crud/wrapper-element-plus
```
```bash [PNPM]
pnpm add @fancy-crud/vue @fancy-crud/wrapper-element-plus
```
```bash [Yarn]
yarn add @fancy-crud/vue @fancy-crud/wrapper-element-plus
```
:::

#### Quasar

::: code-group
```bash [NPM]
npm i @fancy-crud/vue @fancy-crud/wrapper-quasar
```
```bash [PNPM]
pnpm add @fancy-crud/vue @fancy-crud/wrapper-quasar
```
```bash [Yarn]
yarn add @fancy-crud/vue @fancy-crud/wrapper-quasar
```
:::

#### Oruga UI

::: code-group
```bash [NPM]
npm i @fancy-crud/vue @fancy-crud/wrapper-oruga-ui
```
```bash [PNPM]
pnpm add @fancy-crud/vue @fancy-crud/wrapper-oruga-ui
```
```bash [Yarn]
yarn add @fancy-crud/vue @fancy-crud/wrapper-oruga-ui
```
:::

## Configuration

Create a `fancy-crud.config.ts` file to configure FancyCRUD with your HTTP client and UI components.

Select your wrapper to see the configuration:

::: code-group
```ts [Vuetify]
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-vuetify'

export const fancyCrud = defineConfig({
  http: {
    request: axios,
  },
  components,
  styles,
})
```

```ts [Element Plus]
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-element-plus'

export const fancyCrud = defineConfig({
  http: {
    request: axios,
  },
  components,
  styles,
})
```

```ts [Quasar]
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-quasar'

export const fancyCrud = defineConfig({
  http: {
    request: axios,
  },
  components,
  styles,
})
```

```ts [Oruga UI]
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-oruga-ui'

export const fancyCrud = defineConfig({
  http: {
    request: axios,
  },
  components,
  styles,
})
```
:::

The configuration includes:
- **http.request**: Your HTTP client (axios, fetch, etc.)
- **components**: UI components from the wrapper
- **styles**: Default styling configuration for forms and tables

### Register FancyCRUD Plugin

Add the configuration as a Vue plugin in your application entry point (usually `main.ts` or `main.js`).

Select your framework to see the setup:

::: code-group
```ts [Vuetify]
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// FancyCRUD imports
import { FancyCrud } from '@fancy-crud/vue'
import { fancyCrud } from './fancy-crud.config'

// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'
import '@fancy-crud/wrapper-vuetify/dist/fancy-crud-wrapper-vuetify.css'

import App from './App.vue'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
app.use(FancyCrud, fancyCrud)
app.mount('#app')
```

```ts [Element Plus]
import { createApp } from 'vue'
import ElementPlus from 'element-plus'

// FancyCRUD imports
import { FancyCrud } from '@fancy-crud/vue'
import { fancyCrud } from './fancy-crud.config'

// Styles
import 'element-plus/dist/index.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'
import '@fancy-crud/wrapper-element-plus/dist/fancy-crud-wrapper-element-plus.css'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(FancyCrud, fancyCrud)
app.mount('#app')
```

```ts [Quasar]
import { createApp } from 'vue'
import { Quasar } from 'quasar'

// FancyCRUD imports
import { FancyCrud } from '@fancy-crud/vue'
import { fancyCrud } from './fancy-crud.config'

// Styles
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'
import '@fancy-crud/wrapper-quasar/dist/fancy-crud-wrapper-quasar.css'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
})
app.use(FancyCrud, fancyCrud)
app.mount('#app')
```

```ts [Oruga UI]
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'

// FancyCRUD imports
import { FancyCrud } from '@fancy-crud/vue'
import { fancyCrud } from './fancy-crud.config'

// Styles
import '@oruga-ui/oruga-next/dist/oruga.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'
import '@fancy-crud/wrapper-oruga-ui/dist/fancy-crud-wrapper-oruga-ui.css'

import App from './App.vue'

const app = createApp(App)

app.use(Oruga)
app.use(FancyCrud, fancyCrud)
app.mount('#app')
```
:::

:::warning Important
Make sure to register FancyCRUD **after** your UI framework (Vuetify, Quasar, Element Plus, Oruga, etc.)
:::

## Your First Form

Let's create a simple user registration form with first name and last name fields:

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
      rules: (value) => !!value || 'First name is required',
    },
    lastName: {
      type: FieldType.text,
      label: 'Last name',
      placeholder: 'Doe',
      rules: (value) => !!value || 'Last name is required',
    },
  },
  settings: {
    url: 'users/',
  },
})
</script>
```

That's it! With this simple configuration, FancyCRUD will:

1. ✅ Render the form fields with labels and placeholders
2. ✅ Validate inputs using the rules you defined
3. ✅ Display validation errors when fields are invalid
4. ✅ Handle form submission
5. ✅ Send a POST request to `users/` when creating
6. ✅ Send a PUT/PATCH request when updating
7. ✅ Show success/error notifications automatically
8. ✅ Manage loading states during API calls

## Interactive Demo

Try it out below! When you submit the form, it will trigger a `POST` request with the following payload:

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

<FormExample />
<script setup>
import FormExample from '@theme/components/form.vue'
</script>