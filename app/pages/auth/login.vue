<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center px-6">
    <div class="glass-effect p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Connexion</h1>
        <p class="text-white/80">Connectez-vous à votre compte</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-white mb-2 font-semibold">Email</label>
          <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="votre@email.com"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Mot de passe</label>
          <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Votre mot de passe"
          />
        </div>

        <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
          <p class="text-red-100 text-sm">{{ error }}</p>
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-white/80">
          Pas encore de compte ?
          <NuxtLink to="/auth/register" class="text-white font-semibold hover:underline">
            S'inscrire
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.login(form.email, form.password)

    if (result.success) {
      await navigateTo('/dashboard')
    } else {
      error.value = result.error || 'Erreur de connexion'
    }
  } catch (err) {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>