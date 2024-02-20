# Form Commands

**FancyCRUD** already provides a collection of commands to work with forms.

## CreateFormCommand

The command `CreateFormCommand` will receive the raw attributes of a form and it will return the normalized elements.

```ts
const bus = new Bus()

bus.execute(
  new CreateFormCommand({
    fields: {
      firstName: {
        type: FieldType.text,
        label: 'First name'
      }
    },
    settings: {
      url: 'users/'
    },
    buttons: {
      main: {
        label: 'Save'
      }
    }
  })
)
```

When you're using vue you will find a composable variation of this command, which it's the `useForm`. It's essentially the same but the `useForm` is returning a reactive object to work with vue reactivity.

## FilterFieldsByFormModeCommand

The command `FilterFieldsByFormModeCommand` will receive a set of normalized fields and will return and array `[[fieldName, field]]` with the fields that match the current form mode status. The handler is using the `createOnly` and `updateOnly` attribute to filter the fields.


```ts
const bus = new Bus()

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
    },
    updatedAt: { 
      type: FieldType.text,
      label: 'First name',
      updateOnly: true
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  },}
})

const filteredFields = bus.execute(
  new FilterFieldsByFormModeCommand(form.fields, form.settings.mode)
)
```