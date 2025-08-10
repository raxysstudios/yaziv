// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  colorMode: {
    preference: 'light'
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-08-10',
});
