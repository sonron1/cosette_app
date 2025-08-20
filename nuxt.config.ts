export default defineNuxtConfig({
    devtools: { enabled: true },
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
        redirectOptions: {
            login: '/auth/login',
            callback: '/dashboard',
            exclude: ['/']
        }
    },
    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY
        }
    }
})