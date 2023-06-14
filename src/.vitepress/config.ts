import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
          { text: 'Fields', link: '/forms/fields/', collapsed: true, items: [
            { text: 'Definition', link: '/forms/fields/' },
            { text: 'Text', link: '/forms/fields/text' },
            { text: 'Password', link: '/forms/fields/password' },
            { text: 'Color', link: '/forms/fields/color' },
            { text: 'Datepicker', link: '/forms/fields/datepicker' },
            { text: 'Radio', link: '/forms/fields/radio' },
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
