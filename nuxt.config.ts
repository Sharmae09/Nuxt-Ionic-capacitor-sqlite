// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-11-07",
  ssr: false,
  vue: {
    compilerOptions: {
      // This function tells Vue to treat any element that starts with "ion-" as a custom element
      isCustomElement: (tag) => tag.startsWith("ion-")
    }
  }
});
