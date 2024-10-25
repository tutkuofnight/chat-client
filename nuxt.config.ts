// https://nuxt.com/docs/api/configuration/nuxt-config
// import Aura from "@primevue/themes/aura"
import CustomTheme from "./lib/theme"
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css : ["primeicons/primeicons.css", "~/assets/scss/globals.scss"],
  modules: [
    "@primevue/nuxt-module"
  ],
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
      theme: {
        preset: CustomTheme,
        options: {
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  }
})
