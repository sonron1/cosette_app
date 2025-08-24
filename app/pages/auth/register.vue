<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-sky-50 flex items-center justify-center px-6 py-12" style="font-family: 'DM Sans', ui-sans-serif, system-ui;">
    <div class="w-full max-w-2xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-sky-900 mb-2">Inscription</h1>
        <p class="text-sky-700">Créez votre compte</p>
      </div>

      <div class="rounded-2xl bg-white ring-1 ring-sky-100 shadow-md">
        <form @submit.prevent="handleRegister" class="p-6 md:p-8 space-y-5" novalidate>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="nom" class="block text-sm font-medium text-sky-900 mb-2">Nom</label>
              <input
                  id="nom"
                  v-model.trim="form.nom"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                  placeholder="Dupont"
              />
            </div>
            <div>
              <label for="prenom" class="block text-sm font-medium text-sky-900 mb-2">Prénom</label>
              <input
                  id="prenom"
                  v-model.trim="form.prenom"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                  placeholder="Marie"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="pseudo" class="block text-sm font-medium text-sky-900 mb-2">Pseudo</label>
              <input
                  id="pseudo"
                  v-model.trim="form.pseudo"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                  placeholder="votre_pseudo"
              />
            </div>
            <div>
              <label for="age" class="block text-sm font-medium text-sky-900 mb-2">Âge</label>
              <input
                  id="age"
                  v-model.number="form.age"
                  type="number"
                  min="13"
                  max="120"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                  placeholder="Votre âge"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-sky-900 mb-2">Email</label>
            <input
                id="email"
                v-model.trim="form.email"
                type="email"
                required
                autocomplete="email"
                class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                placeholder="vous@email.com"
            />
          </div>

          <div>
            <label for="photo" class="block text-sm font-medium text-sky-900 mb-2">Photo de profil (optionnel)</label>
            <input
                id="photo"
                @change="handleFileUpload"
                type="file"
                accept="image/*"
                class="w-full px-4 py-2 rounded-lg border border-sky-100 bg-white text-sky-900 file:mr-4 file:py-2 file:px-3 file:rounded file:border-0 file:bg-sky-50 file:text-sky-700"
            />
            <p v-if="photoName" class="mt-2 text-xs text-sky-700/80">Fichier sélectionné: {{ photoName }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="password" class="block text-sm font-medium text-sky-900 mb-2">Mot de passe</label>
              <div class="relative">
                <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    minlength="6"
                    autocomplete="new-password"
                    class="w-full px-4 py-3 pr-12 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                    placeholder="Minimum 6 caractères"
                />
                <button
                    type="button"
                    class="absolute inset-y-0 right-0 px-3 text-sky-700 hover:text-sky-800 focus:outline-none"
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                >
                  <span v-if="showPassword">🙈</span>
                  <span v-else>👁️</span>
                </button>
              </div>
            </div>

            <div>
              <label for="confirm" class="block text-sm font-medium text-sky-900 mb-2">Confirmer le mot de passe</label>
              <input
                  id="confirm"
                  v-model="form.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-sky-100 bg-white text-sky-900 placeholder-sky-600/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                  placeholder="Répétez votre mot de passe"
              />
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
            <span v-if="loading">Création en cours...</span>
            <span v-else>Créer mon compte</span>
          </button>

          <div class="text-center text-sm">
            <span class="text-sky-700/90">Déjà un compte ?</span>
            <NuxtLink to="/auth/login" class="ml-1 text-sky-700 font-semibold hover:text-sky-800 hover:underline">
              Se connecter
            </NuxtLink>
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
import { reactive, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#imports'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)
const photoName = ref<string | null>(null)

const form = reactive<{
  nom: string
  prenom: string
  pseudo: string
  email: string
  age: number | '' // '' tant que non rempli
  password: string
  confirmPassword: string
  photo: string | null // Base64 ou URL
}>({
  nom: '',
  prenom: '',
  pseudo: '',
  email: '',
  age: '',
  password: '',
  confirmPassword: '',
  photo: null
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  photoName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      form.photo = result
    }
  }
  reader.readAsDataURL(file)
}

const handleRegister = async (): Promise<void> => {
  // Validations de base
  if (!form.nom || !form.prenom || !form.pseudo || !form.email) {
    error.value = 'Merci de compléter tous les champs requis.'
    return
  }
  if (!form.password || form.password.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }
  if (form.password !== form.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  const ageNum = typeof form.age === 'number' ? form.age : Number(form.age)
  if (!ageNum || ageNum < 13) {
    error.value = 'Âge invalide (minimum 13).'
    return
  }

  loading.value = true
  error.value = null

  try {
    const result = await authStore.register({
      nom: form.nom,
      prenom: form.prenom,
      pseudo: form.pseudo,
      email: form.email,
      age: ageNum,
      password: form.password,
      photo: form.photo || undefined
    })

    if (result.success) {
      await navigateTo('/dashboard')
    } else {
      error.value = result.error || "Erreur lors de l'inscription"
    }
  } catch {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Style blanc + bleu ciel uniquement */
</style>