// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@pandacss/dev/postcss': {},
    },
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  routeRules: {
    '/ssg-demo': { prerender: true }, // SSG
    '/isr-demo': { swr: 60 }, // ISR: 60秒キャッシュ
  }
})
