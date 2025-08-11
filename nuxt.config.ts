// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@nuxt/fonts', '@nuxt/icon'],
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
      meta: [
        {
          name: 'description',
          content: 'Text converter for the languages of the Caucasus.'
        }
      ],
    }
  }
});
