// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/i18n'],
  colorMode: {
    preference: 'light'
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-10',
  icon: {
    clientBundle: {
      scan: true,
    },
    serverBundle: 'local',
  },
  app: {
    head: {
      title: 'Yaziv',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
          media: '(prefers-color-scheme: light)'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-dark.png',
          media: '(prefers-color-scheme: dark)'
        }
      ],
      meta: [
        {
          name: 'description',
          content: 'Text converter for the languages of the Caucasus.'
        }
      ],
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.json'
      }
    ]
  }
});
