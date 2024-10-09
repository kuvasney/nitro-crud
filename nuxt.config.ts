// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: { // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    secret: process.env.NUXT_ENV_MAINT,
    public: {
      baseUrl: process.env.NUXT_ENV_API,
    },
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PWD: process.env.EMAIL_PWD,
    EMAIL_USER: process.env.EMAIL_USER
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/mediaquery.scss" as *; @use "@/assets/css/mixins.scss" as *;'
        }
      }
    }
  },

  css: ['@/assets/css/main.scss'],

  nitro: {
    plugins: ['~/server/index.ts']
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt']
})