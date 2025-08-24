import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
    srcDir: 'app',
    modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],
  googleFonts: {
    families: {
      'DM+Sans': [300, 400, 500, 600, 700]
    },
    display: 'swap'
  },
  css: ['~/assets/css/main.css'],
  ui: {
    global: true
  },
  supabase: {
    // S'assure que les pages publiques ne sont pas redirigées par le module
    redirectOptions: {
      login: '/auth/login',
      callback: '/dashboard',
        exclude: ['/', '/auth/register']
        //exclude: ['/', '/auth/login', '/auth/register', '/auth/forgot']
    },
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY
    }
  }
})