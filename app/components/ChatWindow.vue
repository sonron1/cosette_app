<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useChatStore } from '~/stores/chat'
import { useAuthStore } from '~/stores/auth'
import ChatInput from '~/components/ChatInput.vue'

const props = defineProps<{
  friendId: string
}>()

const chat = useChatStore()
const auth = useAuthStore()

const messages = computed(() => chat.messages)
const me = computed(() => auth.user?.id)

onMounted(() => {
  chat.subscribeToMessages(props.friendId)
})

onBeforeUnmount(async () => {
  await chat.unsubscribeFromMessages()
})

const handleSend = async (payload: { text: string; file?: File | null }) => {
  const { text, file } = payload
  await chat.sendMessage(props.friendId, text, file || undefined)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="p-4 border-b border-sky-100 bg-white">
      <h2 class="text-sky-900 font-semibold">Conversation</h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-sky-50/30">
      <div
          v-for="m in messages"
          :key="m.id"
          class="max-w-[75%] p-3 rounded-lg"
          :class="m.sender_id === me ? 'ml-auto bg-sky-600 text-white' : 'mr-auto bg-white border border-sky-100 text-sky-900'"
      >
        <div class="text-xs opacity-80 mb-1">
          {{ m.sender?.pseudo || 'Utilisateur' }} • {{ new Date(m.created_at).toLocaleString() }}
        </div>
        <div v-if="m.content" class="whitespace-pre-wrap">{{ m.content }}</div>
        <div v-if="m.file_url" class="mt-2">
          <a
              :href="m.file_url"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
          >
            {{ m.file_name || 'Fichier joint' }}
          </a>
          <div v-if="m.file_type?.startsWith('image/')" class="mt-2">
            <img :src="m.file_url" alt="pièce jointe" class="max-h-64 rounded"/>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-sky-100 bg-white p-3">
      <ChatInput @send="handleSend" />
    </div>
  </div>
</template>

<style scoped>
</style>