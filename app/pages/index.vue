<template>
  <div class="min-h-screen gradient-bg">
    <!-- Navigation -->
    <nav class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="text-white text-2xl font-bold">
          Cosette
        </div>
        <div class="space-x-4">
          <NuxtLink to="/auth/login" class="text-white hover:text-gray-200 transition-colors">
            Connexion
          </NuxtLink>
          <NuxtLink to="/auth/register"
                    class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            S'inscrire
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="container mx-auto px-6 py-20 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Connectez-vous avec vos proches
        </h1>
        <p class="text-xl text-white/90 mb-8 leading-relaxed">
          Cosette est la plateforme qui vous permet de rester en contact avec vos amis,
          partager des moments et échanger en toute simplicité.
        </p>
        <div class="space-x-4">
          <NuxtLink to="/auth/register"
                    class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
            Commencer maintenant
          </NuxtLink>
          <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all">
            En savoir plus
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white/10 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-white text-center mb-16">
          Fonctionnalités principales
        </h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Profil personnalisé</h3>
            <p class="text-white/80">
              Créez votre profil avec photo et informations personnelles
            </p>
          </div>

          <div class="text-center">
            <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Messages instantanés</h3>
            <p class="text-white/80">
              Échangez des messages en temps réel avec vos amis
            </p>
          </div>

          <div class="text-center">
            <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Partage de fichiers</h3>
            <p class="text-white/80">
              Partagez facilement vos photos et documents
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 text-center">
        <div class="glass-effect p-12 max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p class="text-white/90 mb-8">
            Rejoignez Cosette dès maintenant et connectez-vous avec vos proches
          </p>
          <NuxtLink to="/auth/register"
                    class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block">
            Créer un compte gratuitement
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black/20 py-8">
      <div class="container mx-auto px-6 text-center">
        <p class="text-white/70">
          © 2024 Cosette. Tous droits réservés.
        </p>
      </div>
    </footer>
  </div>
</template>