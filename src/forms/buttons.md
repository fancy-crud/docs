# Buttons

You have a convenient way to handle button configurations for forms. When integrating this functionality into your form using `useForm`, you can easily customize and control the appearance and behavior of buttons.

Inside your useForm setup, define your button configurations. This can include properties for the main action button (`main`) and auxiliary action button (`aux`).

```vue
<script lang="ts" setup>
const form = useForm({
  // other form configurations...
  buttons: {
    main: {
      // Some configurations
    },
    aux: {
      // Some configurations
    },
  },
})
</script> 
```

## Class

| Name  | Type     | Default                              |
|-------|----------|--------------------------------------|
| class | `string` | (Depends on the selected ui wrapper) |

You can pass some class names by using the `class` property, Just as you would do in a native HTML button.

```vue
<script lang="ts" setup>
const form = useForm({
  // other form configurations...
  buttons: {
    main: {
      class: 'background-blue shadow-xl',
    },
  },
})
</script> 
```


## Label

| Button | Name  | Type     | Default                                                  |
|--------|-------|----------|----------------------------------------------------------|
| main   | label | `string` | <code v-pre>"{{ Create record \| Save changes }}"</code> |
| aux    | label | `string` | <code v-pre>"Cancel"</code>                              |

The button label is represented as a string that can be a literal string:

```vue
<script lang="ts" setup>
const form = useForm({
  // other form configurations...
  buttons: {
    main: {
      label: 'Save Changes',
    },
    aux: {
      label: 'Cancel',
    },
  },
})
</script> 
```

Or can include placeholders for dynamic values depending on the form mode. For example:

```vue
<script lang="ts" setup>
const form = useForm({
  // other form configurations...
  buttons: {
    main: {
      label: '{{ Create record | Save Changes }}',
    },
    aux: {
      label: '{{ Reset | Cancel }}',
    },
  },
})
</script> 
```

As you can see in the code above, the form is going to display "Create record" when the form mode is `FORM_MODE.create`, and "Save Changes" when it's `FORM_MODE.update`

## Loading

| Name      | Type      | Default |
|-----------|-----------|---------|
| isLoading | `boolean` | `false` |

The `isLoading` property is particularly useful for informing users about ongoing background operations, enhancing the overall user experience by providing feedback on the form's status.

```vue
<script lang="ts" setup>
const form = useForm({
  // other form configurations...
  buttons: {
    main: {
      isLoading: true
    },
  },
})
</script> 
```

## Hidden

| Name   | Type      | Default |
|--------|-----------|---------|
| hidden | `boolean` | `false` |

If you want to hide or avoid a button to be rendered you can use the `hidden` property. In the next example the form is going to hide the `aux` button.

```vue
<script lang="ts" setup>
const form = useForm({
  // other form configurations...
  buttons: {
    aux: {
      hidden: true
    },
  },
})
</script> 
```

## Events

Also, you can handle events like `click`, `blur`, `focus`, etc. See the next example:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const count = ref(0)

const form = useForm({
  buttons: {
    main: {
      onClick() {
        count.value++
      },
      onFocus: () => {
        // Do something
      },

      onBlur: () => {
        // Do something
      }
    }
  }
})
</script>
```
