// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "netlify",
  },
  modules: ["./modules/socket.js"],
});
