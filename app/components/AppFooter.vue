<script setup lang="ts">
</script>

<template>
  <footer class="mt-12 border-t border-sky-100 bg-white">
    <div class="container mx-auto px-6 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-3">
        <p class="text-sky-700/80 text-sm">
          © {{ new Date().getFullYear() }} Cosette. Tous droits réservés.
        </p>
        <nav class="flex items-center gap-4 text-sm">
          <NuxtLink to="/" class="text-sky-700 hover:text-sky-900">Accueil</NuxtLink>
          <NuxtLink to="/dashboard" class="text-sky-700 hover:text-sky-900">Dashboard</NuxtLink>
          <NuxtLink to="/chat" class="text-sky-700 hover:text-sky-900">Chat</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>