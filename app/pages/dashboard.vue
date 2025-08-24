<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-sky-50">
    <!-- Header -->
    <header class="bg-white/90 backdrop-blur border-b border-sky-100">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-sky-900">Cosette</h1>
            <span class="text-sky-300">|</span>
            <span class="text-sky-800/80">Tableau de bord</span>
          </div>

          <div class="flex items-center space-x-3">
            <NuxtLink
                to="/chat"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              💬 Ouvrir le chat
            </NuxtLink>

            <div class="flex items-center space-x-3">
              <img
                  :src="authStore.user?.photo || '/placeholder-avatar.png'"
                  :alt="authStore.user?.prenom"
                  class="w-8 h-8 rounded-full object-cover ring-2 ring-sky-100"
              />
              <span class="text-sky-900 font-medium">
                {{ authStore.user?.prenom }} {{ authStore.user?.nom }}
              </span>
            </div>

            <button
                @click="authStore.logout"
                class="text-sky-700 hover:text-red-600 transition-colors"
                title="Se déconnecter"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 p-6">
            <h2 class="text-lg font-semibold text-sky-900 mb-4">Mon Profil</h2>
            <div class="text-center">
              <img
                  :src="authStore.user?.photo || '/placeholder-avatar.png'"
                  :alt="authStore.user?.prenom"
                  class="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-sky-100"
              />
              <h3 class="font-semibold text-sky-900">
                {{ authStore.user?.prenom }} {{ authStore.user?.nom }}
              </h3>
              <p class="text-sky-600 text-sm">@{{ authStore.user?.pseudo }}</p>
              <p class="text-sky-600 text-sm">{{ authStore.user?.age }} ans</p>

              <NuxtLink
                  to="/chat"
                  class="mt-4 inline-flex items-center justify-center w-full px-3 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
              >
                💬 Aller au chat
              </NuxtLink>
            </div>
          </div>

          <!-- Add Friend -->
          <div class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 p-6">
            <h2 class="text-lg font-semibold text-sky-900 mb-4">Ajouter un ami</h2>
            <form @submit.prevent="sendFriendRequest" class="space-y-3">
              <input
                  v-model="friendPseudo"
                  type="text"
                  placeholder="Pseudo de l'ami"
                  class="w-full px-3 py-2 rounded-lg border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  required
              />
              <button
                  type="submit"
                  :disabled="friendRequestLoading"
                  class="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
              >
                {{ friendRequestLoading ? 'Envoi...' : 'Envoyer la demande' }}
              </button>
            </form>

            <div v-if="friendRequestMessage" :class="friendRequestSuccess ? 'text-green-600' : 'text-red-600'" class="mt-2 text-sm">
              {{ friendRequestMessage }}
            </div>
          </div>

          <!-- Friend Requests -->
          <div v-if="pendingRequests.length > 0" class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 p-6">
            <h2 class="text-lg font-semibold text-sky-900 mb-4">Demandes d'amis</h2>
            <div class="space-y-3">
              <div
                  v-for="request in pendingRequests"
                  :key="request.id"
                  class="flex items-center justify-between p-3 border border-sky-100 rounded-lg bg-sky-50/30"
              >
                <div class="flex items-center space-x-3">
                  <img
                      :src="request.sender.photo || '/placeholder-avatar.png'"
                      :alt="request.sender.prenom"
                      class="w-10 h-10 rounded-full object-cover ring-1 ring-sky-100"
                  />
                  <div>
                    <p class="font-medium text-sm text-sky-900">{{ request.sender.prenom }} {{ request.sender.nom }}</p>
                    <p class="text-sky-600 text-xs">@{{ request.sender.pseudo }}</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                      @click="authStore.acceptFriendRequest(request.id)"
                      class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                  >
                    ✓
                  </button>
                  <button
                      @click="authStore.rejectFriendRequest(request.id)"
                      class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    ✗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <!-- CTA -->
          <div class="rounded-2xl bg-white ring-1 ring-sky-100 shadow-sm p-6 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-sky-900">Bienvenue, {{ authStore.user?.prenom }} !</h2>
              <p class="text-sky-700/80">Retrouvez vos amis et commencez à discuter en temps réel.</p>
            </div>
            <NuxtLink
                to="/chat"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700"
            >
              Ouvrir le chat
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 p-6 text-center">
              <div class="text-3xl font-bold text-sky-700 mb-2">{{ authStore.friends.length }}</div>
              <div class="text-sky-700/80 text-sm">Amis</div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 p-6 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ totalMessages }}</div>
              <div class="text-sky-700/80 text-sm">Messages échangés</div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 p-6 text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">{{ pendingRequests.length }}</div>
              <div class="text-sky-700/80 text-sm">Demandes en attente</div>
            </div>
          </div>

          <!-- Friends List -->
          <div class="bg-white rounded-2xl shadow-sm ring-1 ring-sky-100 overflow-hidden">
            <div class="p-6 border-b border-sky-100">
              <h2 class="text-xl font-semibold text-sky-900">Mes amis</h2>
            </div>

            <div v-if="authStore.friends.length === 0" class="p-6 text-center text-sky-700/80">
              <p>Aucun ami pour le moment. Envoyez des demandes pour commencer !</p>
            </div>

            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div
                  v-for="friend in authStore.friends"
                  :key="friend.id"
                  class="border border-sky-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-sky-50/20"
              >
                <div class="flex items-center space-x-3">
                  <img
                      :src="friend.photo || '/placeholder-avatar.png'"
                      :alt="friend.prenom"
                      class="w-12 h-12 rounded-full object-cover ring-1 ring-sky-100"
                  />
                  <div class="flex-1">
                    <h3 class="font-semibold text-sky-900">{{ friend.prenom }} {{ friend.nom }}</h3>
                    <p class="text-sky-700/80 text-sm">@{{ friend.pseudo }}</p>
                  </div>
                </div>
                <div class="mt-3 grid grid-cols-2 gap-2">
                  <NuxtLink
                      :to="{ path: '/chat', query: { friendId: friend.id } }"
                      class="w-full text-center bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm"
                  >
                    Discuter
                  </NuxtLink>
                  <button
                      class="w-full bg-white text-sky-700 border border-sky-200 py-2 rounded-lg hover:bg-sky-50 transition-colors text-sm"
                      @click="openChat(friend)"
                      title="Discuter en modal (aperçu)"
                  >
                    Aperçu
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Modal (aperçu) -->
          <div
              v-if="showChat"
              class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          >
            <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col ring-1 ring-sky-100">
              <div class="p-4 border-b border-sky-100 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <img
                      :src="selectedFriend.photo || '/placeholder-avatar.png'"
                      :alt="selectedFriend.prenom"
                      class="w-10 h-10 rounded-full object-cover ring-1 ring-sky-100"
                  />
                  <div>
                    <h3 class="font-semibold text-sky-900">{{ selectedFriend.prenom }} {{ selectedFriend.nom }}</h3>
                    <p class="text-sky-700/80 text-sm">@{{ selectedFriend.pseudo }}</p>
                  </div>
                </div>
                <button @click="closeChat" class="text-sky-700 hover:text-sky-900">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              <div class="flex-1 overflow-y-auto p-4 chat-container">
                <div v-for="message in chatStore.messages" :key="message.id" class="mb-4">
                  <div :class="message.sender_id === authStore.user?.id ? 'flex justify-end' : 'flex justify-start'">
                    <div :class="message.sender_id === authStore.user?.id ? 'message-bubble message-sent' : 'message-bubble message-received'">
                      <p class="text-sm">{{ message.content }}</p>
                      <div v-if="message.file_url" class="mt-2">
                        <a :href="message.file_url" target="_blank" class="inline-flex items-center space-x-2 text-xs underline">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                          </svg>
                          <span>{{ message.file_name }}</span>
                        </a>
                      </div>
                      <p class="text-xs opacity-70 mt-1">
                        {{ new Date(message.created_at).toLocaleTimeString() }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 border-t border-sky-100">
                <form @submit.prevent="sendMessage" class="flex space-x-2">
                  <input
                      v-model="newMessage"
                      type="text"
                      placeholder="Tapez votre message..."
                      class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 border-sky-100"
                  />
                  <input @change="handleFileSelect" type="file" ref="fileInput" class="hidden" />
                  <button
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="px-3 py-2 border border-sky-200 rounded-lg hover:bg-sky-50"
                  >
                    📎
                  </button>
                  <button
                      type="submit"
                      :disabled="!newMessage.trim() && !selectedFile"
                      class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
                  >
                    Envoyer
                  </button>
                </form>
                <div v-if="selectedFile" class="mt-2 text-sm text-sky-700/90">
                  Fichier sélectionné: {{ selectedFile.name }}
                  <button @click="selectedFile = null" class="ml-2 text-red-500">✗</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /Chat Modal -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const chatStore = useChatStore()

definePageMeta({
  middleware: 'auth'
})

const friendPseudo = ref('')
const friendRequestLoading = ref(false)
const friendRequestMessage = ref('')
const friendRequestSuccess = ref(false)

const showChat = ref(false)
const selectedFriend = ref(null)
const newMessage = ref('')
const selectedFile = ref(null)
const totalMessages = ref(0)

const pendingRequests = computed(() => {
  return authStore.friendRequests.filter(request =>
      request.receiver_id === authStore.user?.id && request.status === 'pending'
  )
})

const sendFriendRequest = async () => {
  friendRequestLoading.value = true
  friendRequestMessage.value = ''

  const result = await authStore.sendFriendRequest(friendPseudo.value)

  if (result.success) {
    friendRequestMessage.value = 'Demande d\'ami envoyée avec succès !'
    friendRequestSuccess.value = true
    friendPseudo.value = ''
  } else {
    friendRequestMessage.value = result.error
    friendRequestSuccess.value = false
  }

  friendRequestLoading.value = false

  setTimeout(() => {
    friendRequestMessage.value = ''
  }, 3000)
}

const openChat = async (friend) => {
  selectedFriend.value = friend
  showChat.value = true
  await chatStore.fetchMessages(friend.id)
  chatStore.subscribeToMessages(friend.id)
}

const closeChat = () => {
  showChat.value = false
  selectedFriend.value = null
}

const sendMessage = async () => {
  if (!newMessage.value.trim() && !selectedFile.value) return
  await chatStore.sendMessage(selectedFriend.value.id, newMessage.value, selectedFile.value)
  newMessage.value = ''
  selectedFile.value = null
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
}

onMounted(async () => {
  await authStore.fetchFriendRequests()
  await authStore.fetchFriends()
})
</script>

<style scoped>
.message-bubble {
  max-width: 75%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
}
.message-sent {
  background: #0369a1;
  color: white;
}
.message-received {
  background: #ffffff;
  color: #0c4a6e;
  border: 1px solid #e2e8f0;
}
</style>