## Form Body

The `f-form-body` component is designed to handle the rendering of form fields. It efficiently manages the display of fields, providing a clean structure for your form's body.

### Props

| Name     | Description                                | Type                                                                                       | Default |
|----------|--------------------------------------------|--------------------------------------------------------------------------------------------|---------|
| formId   | The `id` generated in `useForm` composable | `symbol`                                                                                   |         |
| fields   | Object with normalized fields.             | `ObjectWithNormalizedFields` \| `Record<string, NormalizedField>` \| `NormalizedFields<T>` |         |
| settings | Form settings                              | `NormalizedSettings`                                                                       |         |

### Slots

- You have three dynamic slots for each field in the form.
- Where the `[fieldKey]` is the key name in the `fields` object.
- These three dynamic fields has access to the `field` through the `v-bind` property.

| Name                    | Description                        | Scope                        |
|-------------------------|------------------------------------|------------------------------|
| before-field-[fieldKey] | Adds elements before a field.      | `{ field: NormalizedField }` |
| field-[fieldKey]        | Overrides the auto-rendered field. | `{ field: NormalizedField }` |
| after-field-[fieldKey]  | Adds elements after a field.       | `{ field: NormalizedField }` |

Let's see an example where the `[fieldKey]` is `email`.

<<< ./FormFieldSlots.vue

<FormFieldSlots />
