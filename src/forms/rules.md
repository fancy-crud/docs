# Rules

Rules allows you to apply custom validation on fields. You can use Third-party libraries like Zod, Valibot, etc. Currently, there's a plugin to handle rules for Zod and Valibot, but you can write your own parsers as well.

To install the current plugin parser you can run:

::: code-group
```bash [NPM]
npm i @fancy-crud/plugin-rule-parsers
```
```bash [PNPM]
pnpm add @fancy-crud/plugin-rule-parsers
```
```bash [Yarn]
yarn add @fancy-crud/plugin-rule-parsers
```
:::

::: warning
The package `@fancy-crud/plugin-rule-parsers` will be deprecated in future releases in favor of code snippets parsers for rules.
:::


You will need to add the parser in the `FancyCRUD` configurations. For example:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'

// For this example we're going to use Zod,
// but there's a Valibot parser available
import { zodSafeParser as parser } from '@fancy-crud/plugin-rule-parsers'

export const fancyCrud = defineConfig({
  // Other configurations...

  rules: {
    parser  // The parser function
  },
})
```
:::

Also, you can use the code snippet instead of installing the parser package:

::: code-group
```ts [fancy-crud.config.ts]
import { defineConfig } from '@fancy-crud/vue'

import type { ZodAny } from 'zod/lib/types'

export const fancyCrud = defineConfig({
  // Other configurations...

  rules: {
    parser(raw: { value: unknown; rule: ZodAny }) {
      const { value, rule } = raw
      const result = rule.safeParse(value)

      if (result.success)
        return result.success

      return result.error.issues[0].message
    },
  },
})
```
:::

There's no rule parser by default, so you can work with your own rules with no third-party rule dependency. The only condition is that the `rules` method should return a `string` value for any error or `true` when the field value is valid.