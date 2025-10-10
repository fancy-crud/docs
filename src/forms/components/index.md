# Form Components

FancyCRUD provides a modular component architecture that gives you complete control over form layout and customization. The form functionality is split into four distinct components, each serving a specific purpose, allowing you to build forms with any layout or structure you need.

## Overview

FancyCRUD forms are built from four main components:

- **`<f-form>`**: The main container that orchestrates all form components
- **`<f-form-header>`**: Displays the form title with dynamic mode-based text
- **`<f-form-body>`**: Renders all form fields with powerful slot customization
- **`<f-form-footer>`**: Contains form action buttons (submit/cancel)

Each component can be used independently or combined to create custom form layouts.

## Import Components

All form components can be imported from `@fancy-crud/vue`:

```vue
<script lang="ts" setup>
import { FForm, FFormHeader, FFormBody, FFormFooter } from '@fancy-crud/vue'
</script>
```

## Quick Start

The simplest way to use FancyCRUD forms is with the `<f-form>` component:

```vue
<template>
  <f-form v-bind="form" />
</template>

<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    },
    email: {
      type: FieldType.text,
      label: 'Email'
    }
  },
  settings: {
    url: 'users/',
    title: '{{ Create User | Edit User }}'
  }
})
</script>
```

This automatically renders a complete form with header, fields, and footer buttons.

## Custom Layouts

For more control, you can use individual components to create custom layouts:

```vue
<template>
  <div class="custom-form-container">
    <f-form-header :title="form.settings.title" :mode="form.settings.mode" />
    
    <div class="two-column-layout">
      <f-form-body
        :form-id="form.id"
        :fields="form.fields"
        :settings="form.settings"
      />
    </div>
    
    <f-form-footer
      :buttons="form.buttons"
      :settings="form.settings"
      :is-form-valid="isFormValid"
      @main-click="handleSubmit"
      @aux-click="handleCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { useForm, FFormHeader, FFormBody, FFormFooter, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: { type: FieldType.text, label: 'Name' },
    email: { type: FieldType.text, label: 'Email' }
  },
  settings: {
    url: 'users/'
  }
})

const isFormValid = computed(() => {
  return Object.values(form.fields).every(field => !field.errors.length)
})

const handleSubmit = () => {
  form.submit()
}

const handleCancel = () => {
  form.reset()
}
</script>

<style scoped>
.custom-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.two-column-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
```

## Component Architecture

Each component is designed to be:
- **Modular**: Use individually or together
- **Flexible**: Extensive slot support for customization
- **Type-Safe**: Full TypeScript support
- **Framework-Agnostic**: Works with any UI framework wrapper

::: tip
Use `<f-form>` for quick standard forms, or individual components when you need custom layouts or advanced styling.
:::

<!--@include: ./form-header.md -->

<!--@include: ./form-body.md -->

<!--@include: ./form-footer.md -->

<!--@include: ./form-container.md -->