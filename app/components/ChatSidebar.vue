<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import { useAuthStore } from '~/stores/auth'

interface Profile {
  id: string
  nom?: string
  prenom?: string
  pseudo?: string
  photo?: string | null
}

const props = defineProps<{
  activeId: string | null
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const supabase = useSupabaseClient<any>()
const auth = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)
const profiles = ref<Profile[]>([])

const loadProfiles = async () => {
  try {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
        .from('profiles')
        .select('id, nom, prenom, pseudo, photo')
        .order('pseudo', { ascending: true })
    if (err) throw err
    profiles.value = (data || []).filter((p: Profile) => p.id !== auth.user?.id)
  } catch (e: any) {
    error.value = e?.message || 'Erreur de chargement des profils'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadProfiles()
})

const activeId = computed(() => props.activeId)
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="p-4 border-b border-sky-100">
      <h2 class="text-sky-900 font-semibold">Contacts</h2>
    </div>

    <div class="p-3">
      <input
          type="text"
          placeholder="Rechercher..."
          class="w-full px-3 py-2 rounded-lg border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
          disabled
      />
      <p class="mt-1 text-xs text-sky-600/70">Recherche à venir</p>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div v-if="loading" class="p-4 text-sky-700">Chargement...</div>
      <div v-else-if="error" class="p-4 text-red-700">{{ error }}</div>
      <ul v-else class="divide-y divide-sky-50">
        <li
            v-for="p in profiles"
            :key="p.id"
            class="p-3 cursor-pointer hover:bg-sky-50"
            :class="{ 'bg-sky-50': p.id === activeId }"
            @click="emit('select', p.id)"
        >
          <div class="flex items-center space-x-3">
            <img
                v-if="p.photo"
                :src="p.photo"
                alt="avatar"
                class="w-10 h-10 rounded-full object-cover"
            />
            <div v-else class="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
              {{ (p.pseudo || 'U')[0]?.toUpperCase() }}
            </div>
            <div class="min-w-0">
              <p class="text-sky-900 font-medium truncate">
                {{ p.pseudo || [p.prenom, p.nom].filter(Boolean).join(' ') || 'Utilisateur' }}
              </p>
              <p class="text-xs text-sky-600 truncate">
                {{ [p.prenom, p.nom].filter(Boolean).join(' ') || '—' }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>