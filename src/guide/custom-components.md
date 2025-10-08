# Custom Components

FancyCRUD allows you to create and register custom field components, giving you complete control over how your form fields are rendered and behave. This is perfect for specialized inputs, third-party integrations, or unique UI requirements.

## Why Custom Components?

While FancyCRUD provides built-in field types through wrappers, you may need:

- **Specialized Inputs**: Rating stars, color pickers, sliders, WYSIWYG editors
- **Third-Party Integrations**: Google Maps, Stripe elements, chart inputs
- **Business-Specific Fields**: Custom dropdowns, compound fields, calculators
- **Unique Behaviors**: Fields with special validation, formatting, or interactions

## Understanding the Architecture

FancyCRUD provides a layered architecture for custom components:

1. **Core Composables** (`@fancy-crud/vue`): Provide field logic, validation, and state management
2. **Wrapper Components**: Integrate UI frameworks (Vuetify, Element Plus, etc.) with composables
3. **Field Registration**: Components are registered by type in the configuration

## Creating a Custom Component

### Required Props

Every custom component must accept these props:

```ts
interface ComponentProps {
  formId: symbol                 // Unique form identifier
  field: NormalizedField         // Field configuration and state
}
```

### Using FancyCRUD Composables

FancyCRUD provides composables that handle the heavy lifting:

#### useTextField

For text-based inputs (text, email, password, etc.):

```vue
<template>
  <div class="custom-text-field" v-bind="field.wrapper">
    <label v-if="field.label">{{ field.label }}</label>
    <input
      v-model="modelValue"
      :placeholder="field.placeholder"
      :disabled="field.disabled"
      :class="field.class"
    />
    <span v-if="hasFieldErrors" class="error">
      {{ hintText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { NormalizedTextField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedTextField
}>()

const { modelValue, hintText, hasFieldErrors, validate } = useTextField(props)
</script>
```

#### useSelectField

For select/dropdown inputs:

```vue
<template>
  <div class="custom-select-field" v-bind="field.wrapper">
    <label v-if="field.label">{{ field.label }}</label>
    <select
      v-model="modelValue"
      :disabled="field.disabled"
      v-bind="attrs"
    >
      <option
        v-for="option in options"
        :key="option[field.optionValue]"
        :value="option[field.optionValue]"
      >
        {{ option[field.optionLabel] }}
      </option>
    </select>
    <span v-if="hasFieldErrors" class="error">
      {{ hintText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { NormalizedSelectField } from '@fancy-crud/vue'
import { useSelectField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedSelectField
}>()

const { modelValue, options, attrs, hintText, hasFieldErrors } = useSelectField(props)
</script>
```

### Composable Returns

The composables provide everything you need:

```ts
// useTextField returns:
{
  modelValue: Ref<any>        // Reactive model value with debounce
  vmodel: ComputedRef<{       // v-model binding object
    modelValue: any
    'onUpdate:modelValue': (value) => void
  }>
  hintText: ComputedRef<string>      // Error or help text
  hasFieldErrors: ComputedRef<boolean> // Whether field has errors
  validate: (field) => void           // Validation function
}

// useSelectField additionally returns:
{
  options: ComputedRef<any[]>  // Processed options array
  attrs: ComputedRef<object>    // Filtered attributes (no type/options/wrapper)
}
```

### Field Props

```ts
interface Field {
  // Core properties
  id: string                    // Unique field identifier
  name: string                  // Field name
  modelKey: string              // Key for form data
  modelValue: any               // Current field value
  label?: string                // Field label
  placeholder?: string          // Input placeholder
  
  // State
  errors: string[]              // Validation errors
  wasFocused: boolean          // Whether field was focused
  disabled?: boolean           // Disabled state
  hidden?: boolean             // Hidden state
  
  // Styling
  class?: string               // CSS classes for input
  wrapper?: {                  // Wrapper configuration
    class?: string
  }
  
  // Behavior
  rules?: Function             // Validation rules
  debounceTime?: number        // Input debounce time
  
  // Custom properties
  [key: string]: any           // Any custom props you define
}
```

## Creating Wrapper-Style Components

For maximum integration with UI frameworks, create components using the same pattern as FancyCRUD wrappers:

### Vuetify Wrapper Example

```vue
<script lang="ts">
import { VRating } from 'vuetify/components'
import type { NormalizedField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hintText, vmodel, hasFieldErrors } = useTextField(props)

    return () =>
      h(VRating, {
        ...attrs,
        ...props.field,
        ...props.field.wrapper,
        ...vmodel.value,
        hint: hintText.value,
        errorMessages: hasFieldErrors.value ? [hintText.value] : [],
        rules: undefined,
      }, {
        ...slots,
      })
  },
})
</script>
```

### Element Plus Wrapper Example

```vue
<template>
  <div class="rating-field" v-bind="computedAttrs">
    <label v-if="field.label">{{ field.label }}</label>
    <el-rate
      v-model="modelValue"
      v-bind="field"
      :disabled="field.disabled"
      :max="field.max || 5"
    />
    <span v-if="hasFieldErrors" class="error-message">
      {{ hintText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ElRate } from 'element-plus'
import type { NormalizedField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedField & { max?: number }
}>()

const attrs = useAttrs()

const { hintText, modelValue, hasFieldErrors } = useTextField(props)

const computedAttrs = computed(() => {
  return {
    ...attrs,
    ...props.field.wrapper,
  }
})
</script>
```

## Registering Custom Components

### Global Registration

Register components globally in your FancyCRUD configuration:

```ts
import { defineConfig } from '@fancy-crud/vue'
import axios from 'axios'
import components, { styles } from '@fancy-crud/wrapper-vuetify'

// Import your custom components
import RatingField from './components/RatingField.vue'
import SliderField from './components/SliderField.vue'
import TagsField from './components/TagsField.vue'

export const fancyCrud = defineConfig({
  http: { request: axios },
  
  components: {
    ...components,
    
    // Register custom components
    rating: RatingField,
    slider: SliderField,
    tags: TagsField,
  },
  
  styles,
})
```

### How Component Resolution Works

When rendering a form, FancyCRUD:

1. Looks at the field's `type` property
2. Searches for a registered component with that type name
3. Falls back to the `text` component if not found
4. Passes `formId` and `field` as props to the component

```ts
// In your form
const form = useForm({
  fields: {
    userRating: {
      type: 'rating',  // Looks for registered 'rating' component
      label: 'Rate us',
      max: 5,
    },
  },
})
```

### Using Custom Components

Once registered, use them in your forms with the component name as the type:

```ts
import { useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    productRating: {
      type: 'rating',      // Your custom component
      label: 'Rate this product',
      max: 5,
    },
    priceRange: {
      type: 'slider',      // Your custom component
      label: 'Price Range',
      min: 0,
      max: 1000,
      step: 10,
    },
    tags: {
      type: 'tags',        // Your custom component
      label: 'Tags',
      placeholder: 'Add tags...',
    },
  },
  settings: {
    url: 'products/',
  },
})
```

## Real-World Examples

### Slider Component (Vuetify)

```vue
<script lang="ts">
import { VSlider } from 'vuetify/components'
import type { NormalizedField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedField & { min?: number; max?: number; step?: number }>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hintText, vmodel } = useTextField(props)

    return () =>
      h(VSlider, {
        ...attrs,
        ...props.field.wrapper,
        ...vmodel.value,
        label: props.field.label,
        min: props.field.min || 0,
        max: props.field.max || 100,
        step: props.field.step || 1,
        hint: hintText.value,
        disabled: props.field.disabled,
        thumbLabel: true,
        rules: undefined,
      }, {
        ...slots,
      })
  },
})
</script>
```

Usage:

```ts
const form = useForm({
  fields: {
    volume: {
      type: 'slider',
      label: 'Volume',
      min: 0,
      max: 100,
      step: 5,
      modelValue: 50,
    },
  },
})
```

### Rich Text Editor (with Quill)

```vue
<template>
  <div class="rich-text-field" v-bind="field.wrapper">
    <label v-if="field.label">{{ field.label }}</label>
    
    <div ref="editorContainer" />
    
    <span v-if="hasFieldErrors" class="error-message">
      {{ hintText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import type { NormalizedField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedField & { toolbar?: any[][] }
}>()

const { modelValue, hintText, hasFieldErrors } = useTextField(props)

const editorContainer = ref<HTMLDivElement | null>(null)
let quill: Quill | null = null

onMounted(() => {
  if (!editorContainer.value) return
  
  quill = new Quill(editorContainer.value, {
    theme: 'snow',
    modules: {
      toolbar: props.field.toolbar || [
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    },
  })
  
  // Set initial content
  if (modelValue.value) {
    quill.root.innerHTML = modelValue.value
  }
  
  // Listen to changes
  quill.on('text-change', () => {
    if (quill) {
      modelValue.value = quill.root.innerHTML
    }
  })
})

// Watch for external changes
watch(() => modelValue.value, (newValue) => {
  if (quill && quill.root.innerHTML !== newValue) {
    quill.root.innerHTML = newValue || ''
  }
})
</script>

<style scoped>
.error-message {
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
</style>
```

Usage:

```ts
const form = useForm({
  fields: {
    content: {
      type: 'richText',
      label: 'Article Content',
      toolbar: [
        ['bold', 'italic'],
        ['link'],
      ],
    },
  },
})
```

### Tags Input (Element Plus)

```vue
<template>
  <div class="tags-field" v-bind="computedAttrs">
    <label v-if="field.label">{{ field.label }}</label>
    
    <el-select
      v-model="modelValue"
      v-bind="field"
      multiple
      filterable
      allow-create
      default-first-option
      :placeholder="field.placeholder"
    />
    
    <span v-if="hasFieldErrors" class="error-message">
      {{ hintText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ElSelect } from 'element-plus'
import type { NormalizedField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedField
}>()

const attrs = useAttrs()

const { modelValue, hintText, hasFieldErrors } = useTextField(props)

const computedAttrs = computed(() => ({
  ...attrs,
  ...props.field.wrapper,
}))
</script>
```

Usage:

```ts
const form = useForm({
  fields: {
    tags: {
      type: 'tags',
      label: 'Tags',
      placeholder: 'Add tags...',
      modelValue: [],
    },
  },
})
```

## Advanced Features

### Automatic Validation

The composables (`useTextField`, `useSelectField`) automatically handle validation:

- Call `validate(field)` on mount
- Display errors through `hasFieldErrors` and `hintText`
- Integrate with form-level validation rules

```ts
const form = useForm({
  fields: {
    rating: {
      type: 'rating',
      label: 'Rating',
      rules: (value) => {
        if (!value) return 'Rating is required'
        if (value < 3) return 'Rating must be at least 3 stars'
        return true
      },
    },
  },
})
```

### Debounce Support

The `modelValue` from composables automatically supports debouncing via the `debounceTime` field property:

```ts
const form = useForm({
  fields: {
    search: {
      type: 'text',
      label: 'Search',
      debounceTime: 500,  // Wait 500ms before updating
    },
  },
})
```

The composable handles debouncing internally - no extra code needed!

### Custom Data Transformation

Use `parseModelValue` to transform data before API submission:

```ts
const form = useForm({
  fields: {
    priceRange: {
      type: 'slider',
      label: 'Price Range',
      min: 0,
      max: 1000,
      parseModelValue: (value) => {
        // Transform slider value before sending to API
        return { min: 0, max: value }
      },
    },
  },
})
```

## Best Practices

### 1. **Always Use Composables**

Leverage `useTextField` or `useSelectField` for automatic:
- Validation integration
- Error handling
- Debounce support
- Reactive updates

```vue
<script setup lang="ts">
import { useTextField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedField
}>()

// Get everything you need from the composable
const { modelValue, hintText, hasFieldErrors } = useTextField(props)
</script>
```

### 2. **Support Custom Field Properties**

Extend the `NormalizedField` type for custom properties:

```ts
const props = defineProps<{
  formId: symbol
  field: NormalizedField & {
    // Your custom properties
    max?: number
    min?: number
    toolbar?: any[][]
  }
}>()
```

### 3. **Apply Wrapper Classes**

Always bind `field.wrapper` to support responsive layouts:

```vue
<template>
  <div v-bind="field.wrapper">
    <!-- Your component -->
  </div>
</template>
```

### 4. **Display Errors Correctly**

Use `hasFieldErrors` and `hintText` from the composable:

```vue
<template>
  <span v-if="hasFieldErrors" class="error">
    {{ hintText }}
  </span>
</template>
```

### 5. **Clean Up Resources**

```vue
<script setup lang="ts">
import { onBeforeUnmount } from 'vue'

let thirdPartyLib: any = null

onMounted(() => {
  thirdPartyLib = initializeLibrary()
})

onBeforeUnmount(() => {
  thirdPartyLib?.destroy()
})
</script>
```

### 6. **Use Render Functions for Wrappers**

For tight UI framework integration, use render functions:

```vue
<script lang="ts">
import { VSwitch } from 'vuetify/components'
import { useTextField } from '@fancy-crud/vue'

export default defineComponent({
  props: {
    formId: { type: Symbol, required: true },
    field: { type: Object, required: true },
  },
  setup(props, { attrs, slots }) {
    const { vmodel, hintText } = useTextField(props)

    return () =>
      h(VSwitch, {
        ...attrs,
        ...props.field.wrapper,
        ...vmodel.value,
        label: props.field.label,
        hint: hintText.value,
      }, slots)
  },
})
</script>
```

## Next Steps

- Learn about [Form Commands](/forms/commands) to work with form state
- Explore [Field Types](/forms/fields/) to see built-in components
- Check out [Configuration](/guide/configuration) for global component registration
