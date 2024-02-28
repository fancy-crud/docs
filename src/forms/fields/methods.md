## Methods

### RecordValue

The `recordValue?: (value: any) => unknown` function is use it to get the field value coming from the source object. This is useful when you want to handle a nested object value or you want to compute a value before assign it to the `modelValue`. For example, let's say that you have the next object:

```ts
employee: {
  id: 1,
  name: 'Samira Gonzales'
}
```

And you want to send an `employee_id` value in the request payload. So, you need to set the `modelValue` with the `employee.id`. To accomplish that, you can do something like the code below:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

interface Employee {
  id: int
  name: str
}

const form = useForm({
  fields: {
    employee_id: {
      type: FieldType.text,
      label: 'Employee ID',
      recordValue: (obj: { employee: Employee }) => obj.employee.id
    }
  }
})
</script>
```

### InterceptOptions

The `interceptOptions?: (options: any[]) => unknown[]` is use it to intercept the values that will be assigned into the de `options` attribute.

### ParseModelValue

The `parseModelValue` is a function to parse the `modelValue` before send it into the request payload. For example, let's say we have a `modelValue` with number as string, and you want to send that value as number. So, you can do something like:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

interface Employee {
  id: int
  name: str
}

const form = useForm({
  fields: {
    employee_id: {
      type: FieldType.text,
      label: 'First name',
      modelValue: '1',
      parseModelValue: Number
    }
  }
})
</script>
```

The example above is a shortcut for:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

interface Employee {
  id: int
  name: str
}

const form = useForm({
  fields: {
    employee_id: {
      type: FieldType.text,
      label: 'First name',
      modelValue: '1',
      parseModelValue: value => Number(value)
    }
  }
})
</script>
```

## Events

Fields also allows you to handle events from the native HTML input or custom events from the ui wrapper like `click`, `blur`, `focus`, etc. See the next example:

```vue
<script lang="ts" setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
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