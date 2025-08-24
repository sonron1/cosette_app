<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-sky-50 flex items-center justify-center px-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
        <p class="text-gray-600">Connectez-vous à votre compte</p>
      </div>

      <div class="rounded-2xl bg-white ring-1 ring-sky-100 shadow-md">
        <form @submit.prevent="handleLogin" class="p-6 md:p-8 space-y-6" novalidate>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                placeholder="votre@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <div class="relative">
              <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  class="w-full px-4 py-3 pr-12 rounded-lg border border-sky-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                  placeholder="Votre mot de passe"
              />
              <button
                  type="button"
                  class="absolute inset-y-0 right-0 px-3 text-sky-600 hover:text-sky-700 focus:outline-none"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
              >
                <span v-if="showPassword">🙈</span>
                <span v-else>👁️</span>
              </button>
            </div>
          </div>

          <div v-if="error" class="rounded-lg bg-red-50 border border-red-100 p-3">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>

          <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-sky-600 text-white font-semibold shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>

          <div class="flex items-center justify-between text-sm">
            <NuxtLink to="/" class="text-sky-700 hover:text-sky-800 hover:underline">Retour à l’accueil</NuxtLink>
            <NuxtLink to="/auth/forgot" class="text-sky-700 hover:text-sky-800 hover:underline">Mot de passe oublié ?</NuxtLink>
          </div>
        </form>
      </div>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Pas encore de compte ?
          <NuxtLink to="/auth/register" class="text-sky-700 font-semibold hover:text-sky-800 hover:underline">
            S'inscrire
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Décorations légères bleu ciel -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-10 -left-10 h-56 w-56 rounded-full bg-sky-100 blur-3xl opacity-70"></div>
      <div class="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-sky-200 blur-3xl opacity-60"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#imports'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)

const form = reactive({
  email: '' as string,
  password: '' as string
})

const handleLogin = async (): Promise<void> => {
  if (!form.email || !form.password) {
    error.value = 'Veuillez renseigner votre email et votre mot de passe.'
    return
  }

  loading.value = true
  error.value = null

  try {
    const result = await authStore.login(form.email, form.password)
    if (result.success) {
      await navigateTo('/dashboard')
    } else {
      error.value = result.error || 'Erreur de connexion'
    }
  } catch {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Aucun style sombre, uniquement blanc et bleu ciel avec décorations très légères */
</style>