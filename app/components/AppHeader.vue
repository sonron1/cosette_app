<!-- components/AppHeader.vue -->
<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
    <UContainer>
      <nav class="flex items-center justify-between py-4">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-sky-600">
          <span class="inline-block h-8 w-8 rounded bg-sky-500/10 ring-1 ring-sky-200"></span>
          <span>VotreMarque</span>
        </NuxtLink>

        <ul class="hidden md:flex items-center gap-8 text-sm">
          <li><NuxtLink to="#features" class="hover:text-sky-600">Fonctionnalités</NuxtLink></li>
          <li><NuxtLink to="#pricing" class="hover:text-sky-600">Tarifs</NuxtLink></li>
          <li><NuxtLink to="#faq" class="hover:text-sky-600">FAQ</NuxtLink></li>
          <li><NuxtLink to="#contact" class="hover:text-sky-600">Contact</NuxtLink></li>
        </ul>

        <div class="flex items-center gap-2">
          <UButton color="white" variant="ghost" to="/login">Connexion</UButton>
          <UButton color="sky" to="/signup">Commencer</UButton>
          <button class="md:hidden p-2 rounded hover:bg-gray-100" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <UIcon name="i-heroicons-bars-3" class="h-6 w-6" />
          </button>
        </div>
      </nav>

      <transition name="fade">
        <div v-if="mobileOpen" class="md:hidden pb-4">
          <div class="grid gap-2">
            <UButton to="#features" color="white" variant="ghost">Fonctionnalités</UButton>
            <UButton to="#pricing" color="white" variant="ghost">Tarifs</UButton>
            <UButton to="#faq" color="white" variant="ghost">FAQ</UButton>
            <UButton to="#contact" color="white" variant="ghost">Contact</UButton>
          </div>
        </div>
      </transition>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>