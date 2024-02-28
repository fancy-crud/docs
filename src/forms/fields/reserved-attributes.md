## Reserved attributes
Fields are available to use attributes from native HTML inputs, or specify attributes from the ui wrapper.

For example, let's say we are using Vuetify as our wrapper and we're going to use `placeholder` attribute into our `firstName` field. When the `FancyCRUD` map our field, it will pass all the attributes to the input, and display the text in the `placeholder` attribute.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John Doe', // [!code focus]
    }
  }
})
</script>
```

As you know, even when we have different field types there are some common attributes for every field; `class`, `id` or `name`. But there are specific attributes to handle some reserved actions and manage the input value.

## ModelValue

| Name       | Type  | Default |
|------------|-------|---------|
| modelValue | `any` | `null`  |

The `modelValue` attribute is to handle the input value. So you can always find the most recent value here, or set a initial value.

```vue
<template>
  <f-form v-bind="form"></f-form>
  {{ form.fields.firstName.modelValue }}
</template>
  
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      modelValue: 'Juan Camaney' // [!code focus]
    },
  }
})
</script>
```

<FormModelValue></FormModelValue>


## ModelKey

| Name     | Type     | Default                     |
|----------|----------|-----------------------------|
| modelKey | `string` | Same as the `[fieldKey]` name |

The `modelKey` attribute is responsible to handle the key name of the field to be send in the request payload.

```vue
<template>
  <f-form v-bind="form"></f-form>
</template>
  
<script setup lang='ts'>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: { // <- [fieldKey] name
      type: FieldType.text,
      label: 'First name',

      // Also, you can omit this attribute,
      // and it going to take "firstName" (field key name)
      // as default value
      modelKey: 'firstName'
    },
  }
})
</script>
```

<FormModelKey></FormModelKey>

## Errors

| Name   | Type       | Default |
|--------|------------|---------|
| errors | `string[]` | `[]`    |

The `errors` attribute is to handle the field errors. These errors can be set from rules validation or backend validations. You can set errors programmatically as well.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    text: {
      type: FieldType.text,
      label: 'Favorite color',
      errors: ['Displaying an error']
    }
  }
})
</script>
```

<FormErrors></FormErrors>

## Rules

| Name  | Type                                        | Default     |
|-------|---------------------------------------------|-------------|
| rules | `(value: any) => string \| true \| unknown` | `undefined` |

This section is to understand how to specify a rule for a field. You can follow the Rules section to have a full understanding. The next example is using [Zod](https://zod.dev/), but you can use your own rules or third-party libraries like [Valibot](https://valibot.dev/) or [Joi](https://joi.dev/api/?v=17.12.2):

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      rules: value => ({ value, rule: z.string().email() }),
    }
  }
})
</script>
```

## Options

| Name    | Type    | Default     |
|---------|---------|-------------|
| options | `any[]` | `undefined` |

You can use the `options` attribute to render a list of items. Then the user will be able to pick a value, and it will be assigned to `modelValue`

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      options: ['red', 'blue', 'purple']
    }
  }
})
</script>
```

Also, you can work with objects and specify the label to be displayed, and the value to be picked. To those cases you need to use `optionLabel` and `optionValue`. Let's see an example:

::: warning
If you don't specify the `optionLabel` when you're working with objects, it will display something like `[Object object]`.
:::

::: info
If you don't specify the `optionValue` when you're working with objects, it will gives you the object as value.
:::

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const employees = [
  { id: 1, name: 'Marco', age: 34 },
  { id: 2, name: 'Linda', age: 28 },
  { id: 3, name: 'Alex', age: 42 },
  { id: 4, name: 'Emily', age: 31 },
  { id: 5, name: 'Jordan', age: 35 }
];

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      options: employees
      optionLabel: 'name',
      optionValue: 'id'
    }
  }
})
</script>
```

<FieldURL></FieldURL>

## URL

| Name | Type     | Default     |
|------|----------|-------------|
| url  | `string` | `undefined` |

Sometimes when you're working with the `select` field type. You will need to populate the field with some data from the backend. So, you can use the `url` attribute. If the url is specified the form will trigger a HTTP request to GET the values from an API, and automatically set those values into the field `options`. Then you can set `optionLabel` and `optionValue`, to display and picked the data from each object. Let's see an example:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      url: 'employees/',
      optionLabel: 'name',
      optionValue: 'id'
    }
  }
})
</script>
```

<FieldURL></FieldURL>


## DebounceTime

| Name         | Type     | Default |
|--------------|----------|---------|
| debounceTime | `number` | `0`     |

The `debounceTime` property allows specifying a wait time before update the `modelValue`.


## CreateOnly

| Name       | Type      | Default |
|------------|-----------|---------|
| createOnly | `boolean` | `false` |

The `createOnly` is for those cases where you want to display a field only when the form is `FORM_MODE.create`.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      createOnly: true
    }
  }
})
</script>
```

## UpdateOnly

| Name       | Type      | Default |
|------------|-----------|---------|
| updateOnly | `boolean` | `false` |

The `updateOnly` is for those cases where you want to display a field only when the form is `FORM_MODE.update`.

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    favoriteColor: {
      type: FieldType.select,
      label: 'Favorite color',
      updateOnly: true
    }
  }
})
</script>
```

## Hidden

| Name   | Type      | Default |
|--------|-----------|---------|
| hidden | `boolean` | `false` |

The `hidden` is to hide a field, not matter the `FORM_MODE`.

## Exclude

| Name    | Type      | Default |
|---------|-----------|---------|
| exclude | `boolean` | `false` |

The `exclude` attribute is to avoid the field to be add it in the request payload.

## Multiple

| Name    | Type      | Default |
|---------|-----------|---------|
| exclude | `boolean` | `false` |

The `multiple` attribute allows you to start the `modelValue` as an array. Usually this attribute works perfectly along with the `FieldType.select`

## Wrapper

The `wrapper` attribute allows you to pass attributes to the field wrapper, but it depends on the UI Wrapper that you're using.
