<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useSupabaseUser } from '#imports'

const auth = useAuthStore()
const user = useSupabaseUser()

// État du menu mobile/tablette (affiché pour < lg)
const isMenuOpen = ref(false)

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }

// Verrouillage du scroll quand le menu est ouvert
watch(isMenuOpen, (open) => {
  const root = document.documentElement
  if (open) root.classList.add('no-scroll')
  else root.classList.remove('no-scroll')
})

// Fermeture menu via Échap
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="relative bg-white/90 backdrop-blur border-b border-sky-100">
    <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
      <div class="flex items-center justify-between">
        <!-- Branding -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <span class="text-2xl font-bold text-sky-900">Cosette</span>
          <span class="hidden lg:inline text-sky-300">|</span>
          <span class="hidden lg:inline text-sky-800/80">Plateforme de chat</span>
        </NuxtLink>

        <!-- Actions desktop (>= lg) -->
        <nav class="hidden lg:flex items-center gap-3">
          <NuxtLink to="/dashboard" class="px-3 py-2 rounded-lg text-sky-800 hover:bg-sky-50">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/chat" class="px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
            💬 Chat
          </NuxtLink>

          <template v-if="user">
            <div class="h-6 w-px bg-sky-100 mx-1" />
            <div class="flex items-center gap-2">
              <img
                  :src="auth.user?.photo || '/placeholder-avatar.png'"
                  alt="avatar"
                  class="w-8 h-8 rounded-full object-cover ring-2 ring-sky-100"
              />
              <span class="text-sky-900 text-sm font-medium truncate max-w-[10rem]">
                {{ auth.user?.prenom }}
              </span>
              <button
                  class="ml-2 text-sky-700 hover:text-red-600"
                  @click="auth.logout()"
                  title="Se déconnecter"
              >
                Déconnexion
              </button>
            </div>
          </template>

          <template v-else>
            <div class="h-6 w-px bg-sky-100 mx-1" />
            <NuxtLink to="/auth/login" class="px-3 py-2 rounded-lg text-sky-800 hover:bg-sky-50">
              Connexion
            </NuxtLink>
            <NuxtLink to="/auth/register" class="px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
              Inscription
            </NuxtLink>
          </template>
        </nav>

        <!-- Burger mobile/tablette (< lg) -->
        <button
            type="button"
            class="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-sky-100 text-sky-700 hover:bg-sky-50"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Basculer le menu"
            @click="toggleMenu"
        >
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Overlay + panneau mobile/tablette -->
    <teleport to="body">
      <!-- Backdrop -->
      <transition name="fade">
        <div
            v-if="isMenuOpen"
            class="fixed inset-0 z-40 bg-black/40 lg:hidden"
            @click="closeMenu"
        />
      </transition>

      <!-- Panneau -->
      <transition name="slide-down">
        <div
            v-if="isMenuOpen"
            id="mobile-menu"
            class="fixed top-0 inset-x-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
        >
          <div class="mx-3 sm:mx-6 mt-3 sm:mt-4 rounded-2xl bg-white shadow-xl ring-1 ring-sky-100 overflow-hidden">
            <!-- En-tête panneau -->
            <div class="p-3 flex items-center justify-between border-b border-sky-50">
              <div class="flex items-center gap-2 min-w-0">
                <img
                    :src="auth.user?.photo || '/placeholder-avatar.png'"
                    alt="avatar"
                    class="w-10 h-10 rounded-full object-cover ring-1 ring-sky-100"
                />
                <div class="min-w-0">
                  <p class="text-sky-900 font-medium truncate">
                    {{ user ? (auth.user?.prenom || 'Utilisateur') : 'Invité' }}
                  </p>
                  <p v-if="user" class="text-sky-600 text-xs truncate">@{{ auth.user?.pseudo }}</p>
                </div>
              </div>
              <button
                  type="button"
                  class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-sky-700 hover:bg-sky-50"
                  aria-label="Fermer le menu"
                  @click="closeMenu"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Liens -->
            <nav class="p-2">
              <NuxtLink
                  to="/dashboard"
                  class="block px-3 py-2 rounded-lg text-sky-800 hover:bg-sky-50"
                  @click="closeMenu"
              >
                Dashboard
              </NuxtLink>
              <NuxtLink
                  to="/chat"
                  class="block px-3 py-2 rounded-lg text-white bg-sky-600 hover:bg-sky-700 mt-1"
                  @click="closeMenu"
              >
                💬 Chat
              </NuxtLink>

              <div class="my-2 h-px bg-sky-50" />

              <template v-if="user">
                <button
                    class="w-full text-left px-3 py-2 rounded-lg text-sky-700 hover:bg-sky-50"
                    @click="() => { closeMenu(); auth.logout() }"
                >
                  Déconnexion
                </button>
              </template>
              <template v-else>
                <NuxtLink
                    to="/auth/login"
                    class="block px-3 py-2 rounded-lg text-sky-800 hover:bg-sky-50"
                    @click="closeMenu"
                >
                  Connexion
                </NuxtLink>
                <NuxtLink
                    to="/auth/register"
                    class="block px-3 py-2 rounded-lg text-white bg-sky-600 hover:bg-sky-700 mt-1"
                    @click="closeMenu"
                >
                  Inscription
                </NuxtLink>
              </template>
            </nav>
          </div>
        </div>
      </transition>
    </teleport>
  </header>
</template>

<style scoped>
/* Transitions discrètes */
.fade-enter-active,
.fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-down-enter-active,
.slide-down-leave-active { transition: transform .2s ease, opacity .2s ease; }
.slide-down-enter-from,
.slide-down-leave-to { transform: translateY(-8px); opacity: 0; }
</style>