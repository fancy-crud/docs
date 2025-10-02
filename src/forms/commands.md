# Form Commands

**FancyCRUD** provides a collection of commands to work with forms. These commands power form operations and can be used directly when needed.

## Form Creation & Initialization

### CreateFormCommand

The command `CreateFormCommand` receives raw form attributes and creates a complete normalized form with all required stores and configurations.

```ts
const bus = new Bus()

const form = bus.execute(
  new CreateFormCommand({
    rawFields: {
      firstName: {
        type: FieldType.text,
        label: 'First name'
      }
    },
    rawSettings: {
      url: 'users/'
    },
    rawButtons: {
      main: {
        label: 'Save'
      }
    }
  })
)
```

This command internally:
- Normalizes fields, settings, and buttons
- Creates form stores for notifications, interceptors, and rule configs
- Sets up default onClick handlers for buttons
- Returns a complete form object with all normalized properties

### NormalizeFormFieldsCommand

The command `NormalizeFormFieldsCommand` converts raw field definitions into normalized fields with all default properties.

```ts
const bus = new Bus()

const normalizedFields = bus.execute(
  new NormalizeFormFieldsCommand({
    firstName: {
      type: FieldType.text,
      label: 'First name'
    }
  })
)
```

Each normalized field receives:
- Default properties like `id`, `modelKey`, `name`, `errors`, `wasFocused`
- Default CSS classes from configuration
- Empty options array for fields with URLs
- Wrapper configuration

### NormalizeButtonsCommand

The command `NormalizeButtonsCommand` normalizes button definitions with default labels and properties.

```ts
const bus = new Bus()

const normalizedButtons = bus.execute(
  new NormalizeButtonsCommand({
    main: {
      label: 'Submit'
    },
    aux: {
      label: 'Cancel'
    }
  })
)
```

Normalized buttons include:
- Default labels with mode-specific variations (create/update)
- Loading states (`isLoading`)
- Hidden states (`hidden`)
- CSS classes from configuration
- Click handlers

### NormalizeSettingsCommand

The command `NormalizeSettingsCommand` merges form settings with default values.

```ts
const bus = new Bus()

const normalizedSettings = bus.execute(
  new NormalizeSettingsCommand({
    url: 'users/',
    mode: FORM_MODE.create
  })
)
```

Normalized settings include:
- `url`: API endpoint
- `mode`: Form mode (create/update)
- `lookupField`: Field used for lookups (default: 'id')
- `title`: Form title with mode-specific variations
- `loading`: Loading state

## Form State Management

### SwitchFormToCreateModeCommand

The command `SwitchFormToCreateModeCommand` switches a form to create mode and resets all field values.

```ts
const bus = new Bus()

bus.execute(
  new SwitchFormToCreateModeCommand(formId, {
    onClickAux: () => {
      console.log('Cancelled')
    }
  })
)
```

This command:
- Changes form mode to `FORM_MODE.create`
- Resets all field values to their original state
- Optionally updates the aux button click handler

### SwitchFormToUpdateModeCommand

The command `SwitchFormToUpdateModeCommand` switches a form to update mode and resets all field values.

```ts
const bus = new Bus()

bus.execute(
  new SwitchFormToUpdateModeCommand(formId, {
    onClickAux: () => {
      console.log('Cancelled')
    }
  })
)
```

This command:
- Changes form mode to `FORM_MODE.update`
- Resets all field values to their original state
- Optionally updates the aux button click handler

### ResetFieldsCommand

The command `ResetFieldsCommand` resets field values to their original state.

```ts
const bus = new Bus()

bus.execute(
  new ResetFieldsCommand(clonedFields, originalFields)
)
```

This command copies all properties from original fields to cloned fields, effectively resetting the form state.

### ResetFieldsByFormIdCommand

The command `ResetFieldsByFormIdCommand` resets a form's fields by its ID.

```ts
const bus = new Bus()

bus.execute(
  new ResetFieldsByFormIdCommand(formId)
)
```

This command retrieves the form from the store and resets all its fields using `ResetFieldsCommand`.

## Field Management

### FilterFieldsByFormModeCommand

The command `FilterFieldsByFormModeCommand` filters fields based on the current form mode.

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
      label: 'Updated at',
      updateOnly: true
    }
  },
  settings: {
    url: 'users/',
    mode: FORM_MODE.create
  }
})

const filteredFields = bus.execute(
  new FilterFieldsByFormModeCommand(form.fields, form.settings.mode)
)
// Returns: [['firstName', {...}]] - updatedAt is excluded in create mode
```

The command uses `createOnly` and `updateOnly` field attributes to filter:
- In create mode: excludes fields with `updateOnly: true`
- In update mode: excludes fields with `createOnly: true`

### SetFieldsValuesCommand

The command `SetFieldsValuesCommand` populates form fields with values from a record.

```ts
const bus = new Bus()

bus.execute(
  new SetFieldsValuesCommand(
    form.fields,
    form.settings,
    {
      firstName: 'John',
      lastName: 'Doe',
      id: 123
    }
  )
)
```

This command:
- Uses each field's `recordValue` function to extract the correct value
- Handles file/image fields differently by setting `fileUrl` instead of `modelValue`
- Updates the form's `lookupValue` based on the lookup field

### SetFieldsErrorsCommand

The command `SetFieldsErrorsCommand` assigns validation errors to form fields.

```ts
const bus = new Bus()

bus.execute(
  new SetFieldsErrorsCommand(
    normalizedFields,
    {
      firstName: ['First name is required'],
      email: ['Invalid email format']
    }
  )
)
```

This command assigns error messages to the corresponding field's `errors` property.

## Form Submission

### SaveFormCommand

The command `SaveFormCommand` handles the complete form submission process.

```ts
const bus = new Bus()

bus.execute(
  new SaveFormCommand(formId, {
    onSuccess: (response) => {
      console.log('Form saved!', response)
    },
    onFailed: (error) => {
      console.log('Error:', error)
    }
  })
)
```

This command:
1. Filters fields based on form mode
2. Excludes fields marked with `exclude: true`
3. Generates form data (JSON or FormData)
4. Sets button loading state
5. Executes the save request with appropriate callbacks
6. Dispatches success/failure events

### GenerateFormDataCommand

The command `GenerateFormDataCommand` converts normalized fields into submission-ready data.

```ts
const bus = new Bus()

const { jsonForm, formData } = bus.execute(
  new GenerateFormDataCommand(form.fields)
)
```

This command intelligently processes different field types:
- **Plain values**: Uses `parseModelValue` if available, otherwise raw value
- **List values**: Handles arrays and multiple selections, extracting values using `optionValue`
- **File/Image fields**: Creates FormData with files, handles multiple file uploads
- Returns both `jsonForm` (plain object) and `formData` (FormData instance when files present)

## Validation

### ValidateFormCommand

The command `ValidateFormCommand` validates all fields in a form.

```ts
const bus = new Bus()

const isValid = bus.execute(
  new ValidateFormCommand(form.fields, {
    parser: customParser,
    preventErrorMessage: false
  })
)
```

This command:
- Iterates through all fields
- Skips hidden or excluded fields
- Uses `ValidateFieldRulesCommand` for each field
- Returns `true` if all fields are valid

### ValidateFieldRulesCommand

The command `ValidateFieldRulesCommand` validates a single field's rules.

```ts
const bus = new Bus()

const result = bus.execute(
  new ValidateFieldRulesCommand(field, {
    parser: (result) => {
      // Custom parsing logic
      return result
    },
    preventErrorMessage: false
  })
)
```

This command:
- Executes the field's `rules` function
- Optionally parses the result with a custom parser
- Sets field errors based on validation result
- Returns `true` or an error message string

## Response Handling

### DispatchOnSuccessFormEventCommand

The command `DispatchOnSuccessFormEventCommand` handles successful form submissions.

```ts
const bus = new Bus()

bus.execute(
  new DispatchOnSuccessFormEventCommand(formId, {
    response: apiResponse
  })
)
```

This command triggers:
1. Form response interceptors
2. Success notifications

### DispatchOnFailedFormEventCommand

The command `DispatchOnFailedFormEventCommand` handles failed form submissions.

```ts
const bus = new Bus()

bus.execute(
  new DispatchOnFailedFormEventCommand(formId, errorResponse)
)
```

This command:
- Checks if response handlers are enabled
- Extracts status code from error response
- Triggers appropriate response interceptors
- Respects the `disableResponseHandlers` setting

### TriggerFormNotificationCommand

The command `TriggerFormNotificationCommand` displays form-related notifications.

```ts
const bus = new Bus()

bus.execute(
  new TriggerFormNotificationCommand(formId, NOTIFICATION_TYPE.success)
)
```

This command:
- Checks if notifications are enabled
- Selects appropriate notification based on form mode (create/update)
- Pushes notification to the notification store
- Respects the `disableNotifications` setting

### TriggerFormResponseInterceptorCommand

The command `TriggerFormResponseInterceptorCommand` executes registered response interceptors.

```ts
const bus = new Bus()

bus.execute(
  new TriggerFormResponseInterceptorCommand(formId, response, false)
)
```

This command:
- Checks if response handlers are enabled
- Extracts status code from response
- Executes appropriate interceptors based on status code
- Handles both success and error responses

## Data Loading

### LoadRemoteRecordCommand

The command `LoadRemoteRecordCommand` fetches a record from a remote API and populates the form.

```ts
const bus = new Bus()

bus.execute(
  new LoadRemoteRecordCommand(formId, 123, {
    onSuccess: (response) => {
      console.log('Record loaded')
    }
  })
)
```

This command:
1. Retrieves the form from the store
2. Executes a retrieve request to the form's URL
3. On success, populates all form fields using `SetFieldsValuesCommand`
4. Supports additional request options

## UI Helpers

### GetButtonLabelByFormModeCommand

The command `GetButtonLabelByFormModeCommand` extracts mode-specific button labels.

```ts
const bus = new Bus()

const label = bus.execute(
  new GetButtonLabelByFormModeCommand(
    FORM_MODE.create,
    '{{ Create | Update }}'
  )
)
// Returns: 'Create'
```

This command parses labels with the syntax `{{ CreateText | UpdateText }}`:
- Returns the first text for create mode
- Returns the second text for update mode
- If no separator, returns the same text for both modes

### GetTitleByFormModeCommand

The command `GetTitleByFormModeCommand` extracts mode-specific form titles.

```ts
const bus = new Bus()

const title = bus.execute(
  new GetTitleByFormModeCommand(
    FORM_MODE.update,
    '{{ New User | Edit User }}'
  )
)
// Returns: 'Edit User'
```

This command uses the same parsing logic as `GetButtonLabelByFormModeCommand`:
- Parses titles with `{{ CreateText | UpdateText }}` syntax
- Returns appropriate text based on form mode
- Supports single text for both modes