<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-800">Cosette</h1>
            <span class="text-gray-500">|</span>
            <span class="text-gray-600">Tableau de bord</span>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <img
                  :src="authStore.user?.photo || '/placeholder-avatar.png'"
                  :alt="authStore.user?.prenom"
                  class="w-8 h-8 rounded-full object-cover"
              />
              <span class="text-gray-700 font-medium">
                {{ authStore.user?.prenom }} {{ authStore.user?.nom }}
              </span>
            </div>

            <button
                @click="authStore.logout"
                class="text-gray-500 hover:text-red-600 transition-colors"
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
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-lg font-semibold mb-4">Mon Profil</h2>
            <div class="text-center">
              <img
                  :src="authStore.user?.photo || '/placeholder-avatar.png'"
                  :alt="authStore.user?.prenom"
                  class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 class="font-semibold text-gray-800">
                {{ authStore.user?.prenom }} {{ authStore.user?.nom }}
              </h3>
              <p class="text-gray-500 text-sm">@{{ authStore.user?.pseudo }}</p>
              <p class="text-gray-500 text-sm">{{ authStore.user?.age }} ans</p>
            </div>
          </div>

          <!-- Add Friend -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-lg font-semibold mb-4">Ajouter un ami</h2>
            <form @submit.prevent="sendFriendRequest" class="space-y-4">
              <input
                  v-model="friendPseudo"
                  type="text"
                  placeholder="Pseudo de l'ami"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
              />
              <button
                  type="submit"
                  :disabled="friendRequestLoading"
                  class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {{ friendRequestLoading ? 'Envoi...' : 'Envoyer la demande' }}
              </button>
            </form>

            <div v-if="friendRequestMessage" :class="friendRequestSuccess ? 'text-green-600' : 'text-red-600'" class="mt-2 text-sm">
              {{ friendRequestMessage }}
            </div>
          </div>

          <!-- Friend Requests -->
          <div v-if="pendingRequests.length > 0" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold mb-4">Demandes d'amis</h2>
            <div class="space-y-3">
              <div v-for="request in pendingRequests" :key="request.id"
                   class="flex items-center justify-between p-3 border rounded-lg">
                <div class="flex items-center space-x-3">
                  <img
                      :src="request.sender.photo || '/placeholder-avatar.png'"
                      :alt="request.sender.prenom"
                      class="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-medium text-sm">{{ request.sender.prenom }} {{ request.sender.nom }}</p>
                    <p class="text-gray-500 text-xs">@{{ request.sender.pseudo }}</p>
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
        <div class="lg:col-span-3">
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <!-- Stats -->
            <div class="bg-white rounded-lg shadow-sm p-6 text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ authStore.friends.length }}</div>
              <div class="text-gray-600 text-sm">Amis connectés</div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ totalMessages }}</div>
              <div class="text-gray-600 text-sm">Messages échangés</div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">{{ pendingRequests.length }}</div>
              <div class="text-gray-600 text-sm">Demandes en attente</div>
            </div>
          </div>

          <!-- Friends List -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b">
              <h2 class="text-xl font-semibold">Mes amis</h2>
            </div>

            <div v-if="authStore.friends.length === 0" class="p-6 text-center text-gray-500">
              <p>Aucun ami pour le moment. Commencez par envoyer des demandes d'amis !</p>
            </div>

            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div v-for="friend in authStore.friends" :key="friend.id"
                   class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                   @click="openChat(friend)">
                <div class="flex items-center space-x-3">
                  <img
                      :src="friend.photo || '/placeholder-avatar.png'"
                      :alt="friend.prenom"
                      class="w-12 h-12 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="font-semibold">{{ friend.prenom }} {{ friend.nom }}</h3>
                    <p class="text-gray-500 text-sm">@{{ friend.pseudo }}</p>
                  </div>
                </div>
                <button class="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Discuter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Modal -->
    <div v-if="showChat" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div class="p-4 border-b flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <img
                :src="selectedFriend.photo || '/placeholder-avatar.png'"
                :alt="selectedFriend.prenom"
                class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 class="font-semibold">{{ selectedFriend.prenom }} {{ selectedFriend.nom }}</h3>
              <p class="text-gray-500 text-sm">@{{ selectedFriend.pseudo }}</p>
            </div>
          </div>
          <button @click="closeChat" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 chat-container">
          <div v-for="message in chatStore.messages" :key="message.id" class="mb-4">
            <div :class="message.sender_id === authStore.user?.id ? 'flex justify-end' : 'flex justify-start'">
              <div :class="message.sender_id === authStore.user?.id ? 'message-bubble message-sent' : 'message-bubble message-received'">
                <p class="text-sm">{{ message.content }}</p>
                <div v-if="message.file_url" class="mt-2">
                  <a :href="message.file_url" target="_blank"
                     class="inline-flex items-center space-x-2 text-xs underline">
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

        <div class="p-4 border-t">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
                v-model="newMessage"
                type="text"
                placeholder="Tapez votre message..."
                class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                @change="handleFileSelect"
                type="file"
                ref="fileInput"
                class="hidden"
            />
            <button
                type="button"
                @click="$refs.fileInput.click()"
                class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              📎
            </button>
            <button
                type="submit"
                :disabled="!newMessage.trim() && !selectedFile"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
          <div v-if="selectedFile" class="mt-2 text-sm text-gray-600">
            Fichier sélectionné: {{ selectedFile.name }}
            <button @click="selectedFile = null" class="ml-2 text-red-500">✗</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const chatStore = useChatStore()

// Protéger la route
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

  // Subscribe to real-time messages
  chatStore.subscribeToMessages(friend.id)
}

const closeChat = () => {
  showChat.value = false
  selectedFriend.value = null
}

const sendMessage = async () => {
  if (!newMessage.value.trim() && !selectedFile.value) return

  await chatStore.sendMessage(
      selectedFriend.value.id,
      newMessage.value,
      selectedFile.value
  )

  newMessage.value = ''
  selectedFile.value = null
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
}

// Charger les données au montage
onMounted(async () => {
  await authStore.fetchFriendRequests()
  await authStore.fetchFriends()
})
</script>