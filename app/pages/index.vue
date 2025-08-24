<template>
  <section class="relative overflow-hidden" style="font-family: 'DM Sans', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial;">
    <!-- Hero -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-white to-sky-50"></div>
    <UContainer class="pt-20 pb-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold ring-1 ring-sky-200 mb-4">
            <UIcon name="i-heroicons-sparkles-20-solid" />
            Nouveau: expériences plus rapides
          </p>
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-sky-900 leading-tight">
            Communication simple, <span class="text-sky-600">sécurisée</span> et efficace
          </h1>
          <p class="mt-4 text-sky-700 max-w-xl">
            Centralisez vos conversations, partagez des fichiers et collaborez avec fluidité grâce à une interface moderne.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton color="sky" size="lg" to="/signup">Essayer gratuitement</UButton>
            <UButton color="white" variant="ghost" size="lg" to="#features">Voir les fonctionnalités</UButton>
          </div>
          <div class="mt-8 flex items-center gap-6 text-sm text-sky-700">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle-20-solid" class="text-sky-600" />
              Sans carte requise
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-shield-check-20-solid" class="text-sky-600" />
              Données protégées
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-200/40 blur-2xl"></div>
          <img
              src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1400&q=80"
              alt="Aperçu de l'application"
              class="relative z-10 rounded-lg ring-1 ring-sky-200/60"
              referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </UContainer>
  </section>

  <!-- Features -->
  <section id="features" class="py-20 bg-white" style="font-family: 'DM Sans', ui-sans-serif, system-ui;">
    <UContainer>
      <h2 class="text-3xl font-bold text-center text-sky-900">Tout ce qu’il faut pour collaborer</h2>
      <p class="mt-3 text-center text-sky-700 max-w-2xl mx-auto">
        Des outils simples et efficaces pour votre quotidien.
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard class="transition ring-1 ring-sky-100 hover:ring-sky-200">
          <template #header>
            <div class="flex items-center gap-3">
              <span class="h-10 w-10 grid place-items-center rounded bg-sky-50 ring-1 ring-sky-100">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="text-sky-600" />
              </span>
              <h3 class="font-semibold text-sky-900">Messagerie temps réel</h3>
            </div>
          </template>
          <p class="text-sky-700">Échangez instantanément et restez synchronisé avec votre équipe.</p>
        </UCard>

        <UCard class="transition ring-1 ring-sky-100 hover:ring-sky-200">
          <template #header>
            <div class="flex items-center gap-3">
              <span class="h-10 w-10 grid place-items-center rounded bg-sky-50 ring-1 ring-sky-100">
                <UIcon name="i-heroicons-paper-clip" class="text-sky-600" />
              </span>
              <h3 class="font-semibold text-sky-900">Partage de fichiers</h3>
            </div>
          </template>
          <p class="text-sky-700">Partagez et prévisualisez facilement vos documents.</p>
        </UCard>

        <UCard class="transition ring-1 ring-sky-100 hover:ring-sky-200">
          <template #header>
            <div class="flex items-center gap-3">
              <span class="h-10 w-10 grid place-items-center rounded bg-sky-50 ring-1 ring-sky-100">
                <UIcon name="i-heroicons-bolt" class="text-sky-600" />
              </span>
              <h3 class="font-semibold text-sky-900">Performances</h3>
            </div>
          </template>
          <p class="text-sky-700">Une interface rapide et fluide pour rester concentré.</p>
        </UCard>

        <UCard class="transition ring-1 ring-sky-100 hover:ring-sky-200">
          <template #header>
            <div class="flex items-center gap-3">
              <span class="h-10 w-10 grid place-items-center rounded bg-sky-50 ring-1 ring-sky-100">
                <UIcon name="i-heroicons-lock-closed" class="text-sky-600" />
              </span>
              <h3 class="font-semibold text-sky-900">Sécurité</h3>
            </div>
          </template>
          <p class="text-sky-700">Authentification robuste et protection des données.</p>
        </UCard>

        <UCard class="transition ring-1 ring-sky-100 hover:ring-sky-200">
          <template #header>
            <div class="flex items-center gap-3">
              <span class="h-10 w-10 grid place-items-center rounded bg-sky-50 ring-1 ring-sky-100">
                <UIcon name="i-heroicons-arrow-path" class="text-sky-600" />
              </span>
              <h3 class="font-semibold text-sky-900">Synchronisation</h3>
            </div>
          </template>
          <p class="text-sky-700">Vos données toujours à jour, partout.</p>
        </UCard>

        <UCard class="transition ring-1 ring-sky-100 hover:ring-sky-200">
          <template #header>
            <div class="flex items-center gap-3">
              <span class="h-10 w-10 grid place-items-center rounded bg-sky-50 ring-1 ring-sky-100">
                <UIcon name="i-heroicons-cog-6-tooth" class="text-sky-600" />
              </span>
              <h3 class="font-semibold text-sky-900">Personnalisation</h3>
            </div>
          </template>
          <p class="text-sky-700">Adaptez l’outil à vos besoins.</p>
        </UCard>
      </div>
    </UContainer>
  </section>

  <!-- Metrics -->
  <section class="py-20 bg-sky-50/40" style="font-family: 'DM Sans', ui-sans-serif, system-ui;">
    <UContainer>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="p-6 rounded-xl bg-white ring-1 ring-sky-100 text-center">
          <p class="text-4xl font-extrabold text-sky-600">99.9%</p>
          <p class="text-sky-700 mt-1">Disponibilité</p>
        </div>
        <div class="p-6 rounded-xl bg-white ring-1 ring-sky-100 text-center">
          <p class="text-4xl font-extrabold text-sky-600">2x</p>
          <p class="text-sky-700 mt-1">Plus rapide</p>
        </div>
        <div class="p-6 rounded-xl bg-white ring-1 ring-sky-100 text-center">
          <p class="text-4xl font-extrabold text-sky-600">+10k</p>
          <p class="text-sky-700 mt-1">Utilisateurs</p>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="py-20 bg-white" style="font-family: 'DM Sans', ui-sans-serif, system-ui;">
    <UContainer>
      <h2 class="text-3xl font-bold text-center text-sky-900">Tarification simple</h2>
      <p class="mt-3 text-center text-sky-700 max-w-2xl mx-auto">Commencez gratuitement, évoluez selon vos besoins.</p>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <UCard class="relative overflow-hidden ring-1 ring-sky-100">
          <template #header>
            <h3 class="font-semibold text-sky-900">Gratuit</h3>
          </template>
          <p class="text-3xl font-extrabold text-sky-700">0€</p>
          <ul class="mt-4 text-sm text-sky-700 space-y-2">
            <li>Messagerie temps réel</li>
            <li>Partage de fichiers</li>
            <li>Support communautaire</li>
          </ul>
          <template #footer>
            <UButton color="sky" block to="/signup">Choisir</UButton>
          </template>
        </UCard>

        <UCard class="relative overflow-hidden ring-2 ring-sky-200">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-sky-900">Pro</h3>
              <span class="text-xs px-2 py-1 rounded bg-sky-100 text-sky-700 ring-1 ring-sky-200">Populaire</span>
            </div>
          </template>
          <p class="text-3xl font-extrabold text-sky-700">
            12€<span class="text-sm font-normal text-sky-600">/mois</span>
          </p>
          <ul class="mt-4 text-sm text-sky-700 space-y-2">
            <li>Taille de fichiers élargie</li>
            <li>Historique avancé</li>
            <li>Support prioritaire</li>
          </ul>
          <template #footer>
            <UButton color="sky" block to="/signup">Choisir</UButton>
          </template>
        </UCard>

        <UCard class="relative overflow-hidden ring-1 ring-sky-100">
          <template #header>
            <h3 class="font-semibold text-sky-900">Entreprise</h3>
          </template>
          <p class="text-3xl font-extrabold text-sky-700">Contact</p>
          <ul class="mt-4 text-sm text-sky-700 space-y-2">
            <li>SSO et conformité</li>
            <li>SLAs personnalisés</li>
            <li>Onboarding dédié</li>
          </ul>
          <template #footer>
            <UButton color="sky" block to="#contact">Nous contacter</UButton>
          </template>
        </UCard>
      </div>
    </UContainer>
  </section>

  <!-- FAQ -->
  <section id="faq" class="py-20 bg-sky-50/40" style="font-family: 'DM Sans', ui-sans-serif, system-ui;">
    <UContainer>
      <h2 class="text-3xl font-bold text-center text-sky-900">Questions fréquentes</h2>
      <UAccordion class="mt-8 max-w-3xl mx-auto" :items="faqItems" color="sky" variant="soft" />
    </UContainer>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-white" style="font-family: 'DM Sans', ui-sans-serif, system-ui;">
    <UContainer class="text-center">
      <div class="rounded-2xl bg-gradient-to-r from-white to-sky-50 ring-1 ring-sky-100 p-10">
        <h3 class="text-2xl font-bold text-sky-900">Prêt à démarrer ?</h3>
        <p class="text-sky-700 mt-2">Créez votre compte et commencez à collaborer dès aujourd’hui.</p>
        <div class="mt-6">
          <UButton color="sky" size="lg" to="/signup">Créer un compte</UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const faqItems = [
  { label: 'Puis-je tester gratuitement ?', content: 'Oui, la formule gratuite permet de tester sans carte.' },
  { label: 'Comment sécurisez-vous mes données ?', content: 'Nous appliquons des bonnes pratiques de sécurité et de protection.' },
  { label: 'Y a-t-il une application mobile ?', content: 'L’interface est responsive et une application dédiée est prévue.' }
]
</script>

<style scoped>
/* Animations simples */
@keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
.animate-float { animation: float 6s ease-in-out infinite; }
</style>