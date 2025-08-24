<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'send', payload: { text: string; file?: File | null }): void
}>()

const text = ref('')
const file = ref<File | null>(null)

const onPick = (e: Event) => {
  const input = e.target as HTMLInputElement
  file.value = input.files?.[0] || null
}

const onSend = () => {
  const message = text.value.trim()
  if (!message && !file.value) return
  emit('send', { text: message, file: file.value })
  text.value = ''
  file.value = null
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <input
        type="file"
        @change="onPick"
        class="hidden"
        id="file"
    />
    <label for="file" class="cursor-pointer px-3 py-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100">
      📎 Pièce jointe
    </label>

    <input
        v-model="text"
        type="text"
        placeholder="Votre message..."
        class="flex-1 px-4 py-2 rounded-lg border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
        @keyup.enter="onSend"
    />
    <button
        @click="onSend"
        class="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700"
    >
      Envoyer
    </button>
  </div>
</template>

<style scoped>
</style>