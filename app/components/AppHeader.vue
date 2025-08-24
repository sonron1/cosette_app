<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useSupabaseUser } from '#imports'

const auth = useAuthStore()
const user = useSupabaseUser()
</script>

<template>
  <header class="bg-white/90 backdrop-blur border-b border-sky-100">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="text-2xl font-bold text-sky-900">Cosette</NuxtLink>
          <span class="text-sky-300">|</span>
          <span class="text-sky-800/80">Plateforme de chat</span>
        </div>

        <nav class="flex items-center gap-3">
          <NuxtLink to="/dashboard" class="px-3 py-2 rounded-lg text-sky-800 hover:bg-sky-50">Dashboard</NuxtLink>
          <NuxtLink to="/chat" class="px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">💬 Chat</NuxtLink>

          <template v-if="user">
            <div class="h-6 w-px bg-sky-100 mx-1" />
            <div class="flex items-center gap-2">
              <img
                  :src="auth.user?.photo || '/placeholder-avatar.png'"
                  alt="avatar"
                  class="w-8 h-8 rounded-full object-cover ring-2 ring-sky-100"
              />
              <span class="text-sky-900 text-sm font-medium">
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
            <NuxtLink to="/auth/login" class="px-3 py-2 rounded-lg text-sky-800 hover:bg-sky-50">Connexion</NuxtLink>
            <NuxtLink to="/auth/register" class="px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">Inscription</NuxtLink>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>