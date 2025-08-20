export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()

    // Autoriser l'accès aux pages publiques
    const publicPages = ['/', '/auth/login', '/auth/register']

    if (!user.value && !publicPages.includes(to.path)) {
        return navigateTo('/auth/login')
    }

    // Rediriger les utilisateurs connectés depuis les pages d'auth
    if (user.value && ['/auth/login', '/auth/register'].includes(to.path)) {
        return navigateTo('/dashboard')
    }
})