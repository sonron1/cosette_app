<!-- components/AppFooter.vue -->
<template>
  <footer class="bg-sky-50/40 border-t border-gray-100">
    <UContainer class="py-12">
      <div class="grid gap-10 md:grid-cols-4">
        <div class="space-y-3">
          <div class="flex items-center gap-2 font-semibold text-sky-700">
            <span class="inline-block h-8 w-8 rounded bg-sky-500/10 ring-1 ring-sky-200"></span>
            <span>VotreMarque</span>
          </div>
          <p class="text-sm text-gray-600">
            La plateforme moderne pour communiquer en toute simplicité.
          </p>
          <div class="flex gap-3">
            <NuxtLink to="https://twitter.com" target="_blank" aria-label="Twitter" class="p-2 rounded hover:bg-sky-100">
              <UIcon name="i-simple-icons-x" class="h-5 w-5 text-sky-700" />
            </NuxtLink>
            <NuxtLink to="https://github.com" target="_blank" aria-label="GitHub" class="p-2 rounded hover:bg-sky-100">
              <UIcon name="i-simple-icons-github" class="h-5 w-5 text-sky-700" />
            </NuxtLink>
            <NuxtLink to="https://www.linkedin.com" target="_blank" aria-label="LinkedIn" class="p-2 rounded hover:bg-sky-100">
              <UIcon name="i-simple-icons-linkedin" class="h-5 w-5 text-sky-700" />
            </NuxtLink>
          </div>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Produit</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="#features" class="hover:text-sky-700">Fonctionnalités</NuxtLink></li>
            <li><NuxtLink to="#pricing" class="hover:text-sky-700">Tarifs</NuxtLink></li>
            <li><NuxtLink to="#roadmap" class="hover:text-sky-700">Feuille de route</NuxtLink></li>
            <li><NuxtLink to="#changelog" class="hover:text-sky-700">Changelog</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Ressources</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/docs" class="hover:text-sky-700">Documentation</NuxtLink></li>
            <li><NuxtLink to="#guides" class="hover:text-sky-700">Guides</NuxtLink></li>
            <li><NuxtLink to="#support" class="hover:text-sky-700">Support</NuxtLink></li>
            <li><NuxtLink to="#status" class="hover:text-sky-700">Statut</NuxtLink></li>
          </ul>
        </div>

        <div id="contact">
          <h4 class="font-semibold mb-3">Contact</h4>
          <ul class="space-y-2 text-sm">
            <li>Email: <a href="mailto:contact@example.com" class="hover:text-sky-700">contact@example.com</a></li>
            <li>Adresse: <span class="text-gray-600">123 Rue Exemple, Paris</span></li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-600 flex flex-wrap items-center justify-between gap-4">
        <p>© {{ new Date().getFullYear() }} VotreMarque. Tous droits réservés.</p>
        <div class="flex gap-4">
          <NuxtLink to="/legal/mentions-legales" class="hover:text-sky-700">Mentions légales</NuxtLink>
          <NuxtLink to="/legal/cgu" class="hover:text-sky-700">CGU</NuxtLink>
          <NuxtLink to="/legal/confidentialite" class="hover:text-sky-700">Confidentialité</NuxtLink>
        </div>
      </div>
    </UContainer>
  </footer>
</template>