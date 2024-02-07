
import { defineConfig } from '@fancy-crud/vue'

import { default as components, styles } from '@fancy-crud/wrapper-vuetify'
import { axios } from './plugins'


export default defineConfig({
  http: {
    request: axios as any,
  },
  components,
  styles,
})
