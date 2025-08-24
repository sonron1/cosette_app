<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import ChatSidebar from '~/components/ChatSidebar.vue'
import ChatWindow from '~/components/ChatWindow.vue'
import { useChatStore } from '~/stores/chat'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const chat = useChatStore()
const selectedFriendId = ref<string | null>(null)

const selectFriend = async (friendId: string) => {
  selectedFriendId.value = friendId
  await chat.fetchMessages(friendId)
  chat.subscribeToMessages(friendId)
}

watch(selectedFriendId, async (val, oldVal) => {
  if (oldVal && val !== oldVal) {
    await chat.unsubscribeFromMessages()
  }
  if (val) {
    await chat.fetchMessages(val)
    chat.subscribeToMessages(val)
  }
})

onMounted(() => {
  // Optionnel: pré-sélectionner une conversation via query param, etc.
})

onBeforeUnmount(async () => {
  await chat.unsubscribeFromMessages()
})
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-full md:w-80 border-r border-sky-100 bg-white">
      <ChatSidebar @select="selectFriend" :activeId="selectedFriendId" />
    </aside>

    <!-- Chat window -->
    <main class="flex-1">
      <ChatWindow v-if="selectedFriendId" :friend-id="selectedFriendId" />
      <div v-else class="h-full flex items-center justify-center text-sky-700">
        Sélectionnez un contact pour commencer une conversation
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Style blanc + bleu ciel pour cohérence */
</style>