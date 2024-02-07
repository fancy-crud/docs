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
          { text: 'Fields', link: '/forms/basics/' },
          { text: 'Settings', link: '/forms/settings' },
          { text: 'Buttons', link: '/forms/buttons' },
          { text: 'Titles', link: '/forms/titles' },
          { text: 'Rules', link: '/forms/rules' },
          { text: 'Manager', link: '/forms/manager' },
          { text: 'Handle responses', link: '/forms/handle-responses' },
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
