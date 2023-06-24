import path from 'path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@theme': `${path.resolve(__dirname, 'theme')}/`,
      },
    }
  },
  base: '/docs',
  title: "FancyCRUD",
  description: "Create forms and data tables with ease",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/guide/get-started' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide/get-started' },
        ]
      },
      {
        text: 'Forms',
        items: [
          { text: 'Basics', link: '/forms/basics' },
          { text: 'Field types', collapsed: true, items: [
            { text: 'Text', link: '/forms/fields/text' },
            { text: 'Password', link: '/forms/fields/password' },
            { text: 'Color', link: '/forms/fields/color' },
            { text: 'Datepicker', link: '/forms/fields/datepicker' },
            { text: 'Radio', link: '/forms/fields/radio' },
            { text: 'Checkbox', link: '/forms/fields/checkbox' },
            { text: 'Select', link: '/forms/fields/select' },
            { text: 'Textarea', link: '/forms/fields/textarea' }
          ] },
          { text: 'Settings', link: '/forms/settings' },
          { text: 'Buttons', link: '/forms/buttons' },
          { text: 'Titles', link: '/forms/titles' },
          { text: 'Rules', link: '/forms/rules' },
          { text: 'Manager', link: '/forms/manager' },
          { text: 'Handle responses', link: '/forms/handle-responses' },
          { text: 'Components', link: '/forms/components' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fancy-crud' }
    ]
  },
  outDir: '../dist'
})
