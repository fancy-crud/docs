import DefaultTheme from 'vitepress/theme'
import { FancyCrud } from '@fancy-crud/vue'
import fancyCrudConfig from './fancy-crud.config'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import FormModelValue from './components/modelValue.vue'
import FormModelKey from './components/modelKey.vue'
import FormErrors from './components/attributes/FormErrors.vue'
import FieldURL from './components/attributes/FieldURL.vue'
import GreetForm from './components/command-basics/GreetForm.vue'

import '@mdi/font/css/materialdesignicons.css'
import '@fancy-crud/vue/dist/fancy-crud-vue.css'
import '@fancy-crud/wrapper-vuetify/dist/fancy-crud-wrapper-vuetify.css'

import './index.sass'

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  }
})

const config = {
  extends: DefaultTheme,
  enhanceApp(ctx: any) {
    ctx.app.use(vuetify)
    ctx.app.use(FancyCrud, fancyCrudConfig)
    ctx.app.component('FormModelValue', FormModelValue)
    ctx.app.component('FormModelKey', FormModelKey)
    ctx.app.component('FormErrors', FormErrors)
    ctx.app.component('FieldURL', FieldURL)
    ctx.app.component('GreetForm', GreetForm)

  }
}

export default config