# Response interceptor

The response interceptors are functions that make it possible to react according to the status code resulting from a creation or update action from a `Form`. To define them you can specify the status code that you want to handle, and set a function that receives two parameters: the first one is the form id and the second one the response.

Let's see how to create interceptors for different status codes into a form.


```vue
<script lang="ts" setup>
import { FieldType, useForm } from '@fancy-crud/vue';
import { ref } from 'vue';

const form = useForm({
  fields: {
    // Some fields...
  },
  settings: {
    // Some settings...
  },
  responseInterceptor: {
    200: (formId: symbol, response: any) => {
      // Do something when the response code is 200
    },
    201: (formId: symbol, response: any) => {
      // Do something when the response code is 201
    },
    400: (formId: symbol, response: any) => {
      // Do something when the response code is 400. 
    },
  }
})
</script>
```

By default there is a generic notification error for status codes starting from `400` up to `451`; and 500 up to `511`. To see the notification error you should have installed a toast plugin like `plugin-vue3-toastify`.

If you want to create a response interceptor and set it by default for every form, you can define them in the `FancyCRUD` configurations. For example:

```ts
import { defineConfig } from '@fancy-crud/vue'

export const fancyCrud = defineConfig({
  // Some other configurations...

  responseInterceptors: {
    200: (formId: symbol, response: any) => {
      // Always do something for every form, when the response code is 200
    },
    201: (formId: symbol, response: any) => {
      // Always do something for every form, when the response code is 201
    },
    400: (formId: symbol, response: any) => {
      // Always do something for every form, when the response code is 400. 
    },
  },
})
```
