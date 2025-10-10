## Field Types

FancyCRUD provides a comprehensive set of field types to cover most form use cases. Each field type is optimized for specific data input scenarios.

### Available Field Types

| Field Type | Use Case | Example Data |
|-----------|----------|--------------|
| `text` | General text input | Names, titles, emails |
| `password` | Secure password input | User passwords, API keys |
| `color` | Color picker | #FF5733, rgb(255, 87, 51) |
| `datepicker` | Date selection | 2024-01-15 |
| `radio` | Single selection from options | Gender, status |
| `checkbox` | Boolean or multiple selection | Terms acceptance, features |
| `select` | Dropdown selection | Country, category |
| `textarea` | Multi-line text | Comments, descriptions |
| `file` / `image` | File uploads | Documents, images |

### Using Field Types

You can specify field types using the `FieldType` enum (recommended) or as strings when using custom field types:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    // Text input
    firstName: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'John',
    },
    
    // Password input
    password: {
      type: FieldType.password,
      label: 'Password',
      placeholder: 'Enter your password',
    },
    
    // Email input (use text type with validation)
    email: {
      type: FieldType.text,
      label: 'Email',
      placeholder: 'user@example.com',
      rules: (value) => {
        if (!value) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format'
        return true
      },
    },
    
    // Color picker
    favoriteColor: {
      type: FieldType.color,
      label: 'Favorite color',
      modelValue: '#FF5733',
    },
    
    // Date picker
    birthDate: {
      type: FieldType.datepicker,
      label: 'Birth date',
    },
    
    // Radio buttons
    gender: {
      type: FieldType.radio,
      label: 'Gender',
      options: ['Male', 'Female', 'Other']
    },
    
    // Checkbox
    acceptTerms: {
      type: FieldType.checkbox,
      label: 'I accept the terms and conditions',
      modelValue: false,
    },
    
    // Select dropdown
    country: {
      type: FieldType.select,
      label: 'Country',
      options: ['USA', 'Canada', 'Mexico', 'UK']
    },
    
    // Textarea
    comments: {
      type: FieldType.textarea,
      label: 'Comments',
      placeholder: 'Enter your comments here...',
      rows: 4,
    },
    
    // File upload
    avatar: {
      type: FieldType.file,
      label: 'Profile Picture',
      accept: 'image/*',
    },
  }
})
</script>
```

### Detailed Field Type Examples

#### Text Field

The most common field type for general text input.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    username: {
      type: FieldType.text,
      label: 'Username',
      placeholder: 'johndoe',
      minlength: 3,
      maxlength: 20,
    },
  }
})
</script>
```

#### Password Field

Securely masks user input. Perfect for passwords and sensitive data.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    password: {
      type: FieldType.password,
      label: 'Password',
      minlength: 8,
      rules: (value) => (value && value.length >= 8) || 'Password must be at least 8 characters'
    },
    confirmPassword: {
      type: FieldType.password,
      label: 'Confirm Password',
      rules: (value) => value === form.fields.password.modelValue || 'Passwords must match'
    },
  }
})
</script>
```

#### Select Field

Dropdown selection from a list of options. See the [Options](#options) section for advanced usage with objects.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    priority: {
      type: FieldType.select,
      label: 'Priority',
      options: ['Low', 'Medium', 'High', 'Critical'],
      modelValue: 'Medium',
    },
  }
})
</script>
```

#### Radio Field

Single selection from a visible list of options.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    subscription: {
      type: FieldType.radio,
      label: 'Subscription Plan',
      options: ['Free', 'Pro', 'Enterprise'],
      modelValue: 'Free',
    },
  }
})
</script>
```

#### Checkbox Field

Boolean value or multiple selection.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    // Single checkbox (boolean)
    newsletter: {
      type: FieldType.checkbox,
      label: 'Subscribe to newsletter',
      modelValue: false,
    },
    
    // Multiple checkboxes (array)
    interests: {
      type: FieldType.checkbox,
      label: 'Interests',
      options: ['Technology', 'Sports', 'Music', 'Travel'],
      multiple: true,
      modelValue: [],
    },
  }
})
</script>
```

#### Textarea Field

Multi-line text input for longer content.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    description: {
      type: FieldType.textarea,
      label: 'Description',
      placeholder: 'Enter a detailed description...',
      rows: 5,
      maxlength: 500,
    },
  }
})
</script>
```

#### Color Picker

Visual color selection tool.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    brandColor: {
      type: FieldType.color,
      label: 'Brand Color',
      modelValue: '#3B82F6',
    },
  }
})
</script>
```

#### Date Picker

Calendar-based date selection.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    startDate: {
      type: FieldType.datepicker,
      label: 'Start Date',
      min: new Date().toISOString().split('T')[0], // Today
    },
    endDate: {
      type: FieldType.datepicker,
      label: 'End Date',
    },
  }
})
</script>
```

#### File Upload

File and image upload handling.

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    // Single file upload
    document: {
      type: FieldType.file,
      label: 'Upload Document',
      accept: '.pdf,.doc,.docx',
    },
    
    // Image upload
    profilePicture: {
      type: FieldType.image,
      label: 'Profile Picture',
      accept: 'image/*',
      preview: true, // Show image preview
    },
    
    // Multiple files
    attachments: {
      type: FieldType.file,
      label: 'Attachments',
      multiple: true,
    },
  }
})
</script>
```

### Custom Field Types

You can also use custom field types by providing a string value and registering a custom component:

```vue
<script lang="ts" setup>
const form = useForm({
  fields: {
    rating: {
      type: 'rating', // Custom type
      label: 'Rate this product',
      max: 5,
    },
    tags: {
      type: 'tags-input', // Custom type
      label: 'Tags',
      modelValue: [],
    },
  }
})
</script>
```

See the [Custom Components](/guide/custom-components) section for more information on creating custom field types.

<FormFieldTypes />
<script setup>
import FormFieldTypes from '@theme/components/fieldtypes.vue'
</script>
