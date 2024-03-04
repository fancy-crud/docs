## Form Footer

Handling the form's footer, `f-form-footer`, this component includes buttons and functionality for main and auxiliary actions. It enables easy customization of buttons and responsiveness to user interactions.

### Props

| Name        | Description                                                               | Type                                                | Default |
|-------------|---------------------------------------------------------------------------|-----------------------------------------------------|---------|
| buttons     | Object with normalized `main` and `aux` buttons                           | `{ main: NormalizedButton, aux: NormalizedButton }` |         |
| settings    | Normalized settings object                                                | `NormalizedSettings`                                |         |
| isFormValid | If the value is `false` the user won't be able to click the `main` button | `boolean`                                           | `false` |

### Events

| Name        | Description                                            | Type         |
|-------------|--------------------------------------------------------|--------------|
| @main-click | Event emitted when the user click on the `main` button | `() => void` |
| @aux-click  | Event emitted when the user click on the `aux` button  | `() => void` |

### Slots

| Name    | Description                    | Scope                                                                                                                                                         |
|---------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default | Default slot to render buttons | `{ mainButton: NormalizedButton; auxButton: NormalizedButton; getLabel: string; onMainClick: Function; onAxuClick: Function; isMainButtonDisabled: boolean }` |
