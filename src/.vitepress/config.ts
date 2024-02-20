import path from 'path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@theme': `${path.resolve(__dirname, 'theme')}/`,
      },
    },
    ssr: {
      noExternal: ['@inertiajs/server',/\.css$/, /\?vue&type=style/, /^vuetify/],
    }
  },
  base: '/docs',
  title: "FancyCRUD",
  description: "Create forms and data tables with ease",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/guide/get-started' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide/get-started' },
        ]
      },
      { text: 'Built-in', items: [
        { text: "Command Bus Pattern", link: '/built-in/command-bus' },
        { text: "Form commands", link: '/built-in/form-commands' },
        // { text: "Built-in table commands", link: '/built-in/command-bus' },
      ] },
      {
        text: 'Forms',
        items: [
          { text: 'Fields', link: '/forms/fields/' },
          { text: 'Settings', link: '/forms/settings' },
          { text: 'Buttons', link: '/forms/buttons' },
          { text: 'Rules', link: '/forms/rules' },
          { text: 'Response interceptor', link: '/forms/handle-responses' },
          { text: 'Components', link: '/forms/components' },
        ]
      },
      {
        text: "Tables",
        items: [
          { text: "Basics", link: '/tables/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fancy-crud' }
    ]
  },
  outDir: '../dist'
})
