## Native Attributes

Fields in FancyCRUD support all native HTML input attributes as well as framework-specific attributes from your UI wrapper (Vuetify, Element Plus, Quasar, or Oruga UI). When FancyCRUD renders a field, it automatically passes all attributes to the underlying input component.

### Common HTML Attributes

You can use standard HTML input attributes on any field:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      placeholder: 'Enter your username', // HTML attribute
      minlength: 3,                        // HTML attribute
      maxlength: 20,                       // HTML attribute
      required: true,                      // HTML attribute
      autocomplete: 'username',            // HTML attribute
      pattern: '[a-zA-Z0-9]+',            // HTML attribute
    },
    email: {
      type: FieldType.text,
      label: 'Email',
      placeholder: 'user@example.com',
      required: true,
      autocomplete: 'email',
    },
    age: {
      type: FieldType.text,
      label: 'Age',
      min: 18,                             // HTML attribute
      max: 120,                            // HTML attribute
      step: 1,                             // HTML attribute
    },
    description: {
      type: FieldType.textarea,
      label: 'Description',
      rows: 5,                             // HTML attribute
      cols: 50,                            // HTML attribute
      maxlength: 500,                      // HTML attribute
      placeholder: 'Enter description...',
    },
  }
})
</script>
```

### Framework-Specific Attributes

Each UI wrapper supports its own framework-specific attributes. FancyCRUD passes these directly to the component.

#### Vuetify Attributes

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John Doe',
      // Vuetify-specific attributes
      variant: 'outlined',
      density: 'compact',
      clearable: true,
      persistentHint: true,
      hint: 'Enter your first name',
    },
  }
})
</script>
```

#### Element Plus Attributes

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John Doe',
      // Element Plus-specific attributes
      size: 'large',
      clearable: true,
      prefixIcon: 'User',
      showWordLimit: true,
    },
  }
})
</script>
```

#### Quasar Attributes

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John Doe',
      // Quasar-specific attributes
      filled: true,
      rounded: true,
      clearable: true,
      bottomSlots: true,
    },
  }
})
</script>
```

### Commonly Used Native Attributes

| Attribute | Type | Description | Applicable Fields |
|-----------|------|-------------|------------------|
| `placeholder` | `string` | Hint text when field is empty | text, textarea, select |
| `required` | `boolean` | Makes field required | all |
| `disabled` | `boolean` | Disables the field | all |
| `readonly` | `boolean` | Makes field read-only | all |
| `minlength` | `number` | Minimum character length | text, textarea |
| `maxlength` | `number` | Maximum character length | text, textarea |
| `min` | `number/string` | Minimum value/date | number, datepicker |
| `max` | `number/string` | Maximum value/date | number, datepicker |
| `step` | `number` | Value increment step | number |
| `pattern` | `string` | Regex validation pattern | text |
| `autocomplete` | `string` | Browser autocomplete hint | text, password |
| `rows` | `number` | Number of visible rows | textarea |
| `cols` | `number` | Number of visible columns | textarea |
| `accept` | `string` | Acceptable file types | file, image |
| `multiple` | `boolean` | Allow multiple selections | select, file |

### Example: Complete Field with Native Attributes

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    email: {
      type: FieldType.text,
      label: 'Email Address',
      
      // HTML attributes
      placeholder: 'user@example.com',
      required: true,
      maxlength: 100,
      autocomplete: 'email',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
      
      // FancyCRUD attributes
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      },
      
      // Wrapper-specific (Vuetify example)
      variant: 'outlined',
      hint: 'We will never share your email',
      persistentHint: true,
    },
  },
  settings: {
    url: 'users/',
  },
})
</script>
```

::: tip
You can mix HTML attributes, FancyCRUD-specific attributes, and UI framework attributes in the same field definition. FancyCRUD intelligently passes each attribute to the appropriate destination.
:::

::: info
If an attribute is not recognized by the HTML input or your UI framework, it will be safely ignored. This allows for forward compatibility and experimentation.
:::
