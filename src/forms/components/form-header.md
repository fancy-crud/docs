## Form Header

The `f-form-header` component focuses on the form header, allowing you to customize and present information related to the form. It provides the flexibility to dynamically display the form mode title.

### Props

| Name  | Description                               | Type                    | Default |
|-------|-------------------------------------------|-------------------------|---------|
| title | Title value to display in the form header | `string` \| `undefined` |         |
| mode  | Current form mode                         | `FormMode`              |         |

### Slots

| Name    | Description                        | Scope                        |
|---------|------------------------------------|------------------------------|
| default | Default slot to display form title | `{ formModeTitle: string }`  |