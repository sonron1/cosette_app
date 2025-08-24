<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-white text-gray-800">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>