import { defineUserConfig, defaultTheme } from 'vuepress';


export default defineUserConfig({
  lang: 'en-US',
  title: 'Expeditie Edwin',
  theme: defaultTheme({
    navbar: [
      {
        text: 'Gedicht',
        link: '/index.md',
      },
      '/golfer.md',
      '/sommelier.md',
      '/archeoloog.md',
      '/mixoloog.md',
      '/historicus.md',
    ],
  })
})