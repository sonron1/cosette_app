export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    // Pages publiques accessibles sans connexion
    const publicPaths = new Set<string>([
        '/',
        '/auth/login',
        '/auth/register',
        '/auth/forgot'
    ])

    // Si pas connecté et route privée => redirection vers login
    if (!user.value && !publicPaths.has(to.path)) {
        return navigateTo('/auth/login')
    }

    // Si connecté et route publique d'auth => redirection vers dashboard
    if (user.value && publicPaths.has(to.path)) {
        return navigateTo('/dashboard')
    }
})