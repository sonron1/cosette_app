<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-sky-50 flex items-center justify-center px-4 sm:px-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-sky-900 mb-2">Mot de passe oublié</h1>
        <p class="text-sky-700">Entrez votre email pour recevoir un lien de réinitialisation.</p>
      </div>

      <div class="rounded-2xl bg-white ring-1 ring-sky-100 shadow-md">
        <form @submit.prevent="handleReset" class="p-5 sm:p-6 md:p-8 space-y-6" novalidate>
          <div>
            <label for="email" class="block text-sm font-medium text-sky-900 mb-2">Email</label>
            <input
                id="email"
                v-model.trim="email"
                type="email"
                required
                autocomplete="email"
                class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                placeholder="vous@email.com"
            />
          </div>

          <div v-if="error" class="rounded-lg bg-red-50 border border-red-100 p-3">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>
          <div v-if="success" class="rounded-lg bg-green-50 border border-green-100 p-3">
            <p class="text-green-700 text-sm">
              Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.
            </p>
          </div>

          <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-sky-600 text-white font-semibold shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Envoi en cours...</span>
            <span v-else>Envoyer le lien</span>
          </button>

          <div class="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between text-sm">
            <NuxtLink to="/auth/login" class="text-sky-700 hover:text-sky-800 hover:underline">Retour à la connexion</NuxtLink>
            <NuxtLink to="/auth/register" class="text-sky-700 hover:text-sky-800 hover:underline">Créer un compte</NuxtLink>
          </div>
        </form>
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
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient<any>()
const email = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleReset = async (): Promise<void> => {
  error.value = null
  success.value = false
  if (!email.value) {
    error.value = 'Veuillez renseigner votre email.'
    return
  }

  loading.value = true
  try {
    // URL de redirection après clic sur le lien (adapter si besoin)
    const redirectTo = `${window.location.origin}/auth/login`
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo
    })
    if (resetError) throw resetError
    success.value = true
  } catch (e: any) {
    error.value = e?.message || 'Impossible d’envoyer le lien de réinitialisation.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>