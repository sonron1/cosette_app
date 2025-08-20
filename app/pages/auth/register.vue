<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center px-6 py-8">
    <div class="glass-effect p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Inscription</h1>
        <p class="text-white/80">Créez votre compte Cosette</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white mb-2 font-semibold text-sm">Nom</label>
            <input
                v-model="form.nom"
                type="text"
                required
                class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                placeholder="Nom"
            />
          </div>
          <div>
            <label class="block text-white mb-2 font-semibold text-sm">Prénom</label>
            <input
                v-model="form.prenom"
                type="text"
                required
                class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                placeholder="Prénom"
            />
          </div>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold text-sm">Pseudo</label>
          <input
              v-model="form.pseudo"
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              placeholder="Choisissez un pseudo unique"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold text-sm">Email</label>
          <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              placeholder="votre@email.com"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold text-sm">Âge</label>
          <input
              v-model.number="form.age"
              type="number"
              min="13"
              max="120"
              required
              class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              placeholder="Votre âge"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold text-sm">Photo de profil (optionnel)</label>
          <input
              @change="handleFileUpload"
              type="file"
              accept="image/*"
              class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-white/30 file:text-white text-sm"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold text-sm">Mot de passe</label>
          <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              placeholder="Minimum 6 caractères"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold text-sm">Confirmer le mot de passe</label>
          <input
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              placeholder="Répétez votre mot de passe"
          />
        </div>

        <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
          <p class="text-red-100 text-sm">{{ error }}</p>
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          <span v-if="loading">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-white/80 text-sm">
          Déjà un compte ?
          <NuxtLink to="/auth/login" class="text-white font-semibold hover:underline">
            Se connecter
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
  nom: '',
  prenom: '',
  pseudo: '',
  email: '',
  age: '',
  password: '',
  confirmPassword: '',
  photo: null
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await authStore.register({
      nom: form.nom,
      prenom: form.prenom,
      pseudo: form.pseudo,
      email: form.email,
      age: form.age,
      password: form.password,
      photo: form.photo
    })

    if (result.success) {
      await navigateTo('/dashboard')
    } else {
      error.value = result.error || 'Erreur lors de l\'inscription'
    }
  } catch (err) {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>