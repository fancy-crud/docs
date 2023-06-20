import DefaultTheme from 'vitepress/theme'
import { FancyCrud } from '@fancy-crud/vue'
import Oruga from '@oruga-ui/oruga-next'

import { defaultCustomization, fields, table, utils } from '@fancy-crud/oruga-wrapper'
import axios from 'axios'

import './index.sass'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Oruga)
    ctx.app.use(FancyCrud, {
    http: {
        service: axios,
    },
    fields,
    utils,
    table,
    defaultClasses: defaultCustomization,
    ruleOptions: {
        processResult: (raw) => {
        const { value, rule } = raw
        const result = rule.safeParse(value)

        if (result.success)
            return result.success

        return result.error.issues[0].message
        },
    },
    })
  }
}