import { defineStore } from 'pinia'
import type { RealtimeChannel, RealtimePostgresInsertPayload } from '@supabase/supabase-js'
import { useAuthStore } from '~/stores/auth'
import { ref, readonly } from 'vue'
import { useSupabaseClient } from '#imports'

interface Message {
    id: string
    sender_id: string
    receiver_id: string
    content: string
    file_url?: string
    file_name?: string
    file_type?: string
    created_at: string
    sender: {
        nom: string
        prenom: string
        pseudo: string
        photo?: string
    }
}

export const useChatStore = defineStore('chat', () => {
    const messages = ref<Message[]>([])
    const activeChat = ref<string | null>(null)
    const activeSubscription = ref<RealtimeChannel | null>(null)
    // Relaxer le typage du client pour éviter les "never" sur insert/update
    const supabase = useSupabaseClient<any>()

    const sendMessage = async (
        receiverId: string,
        content: string,
        file?: File
    ): Promise<{ success: boolean; error?: string }> => {
        try {
            const authStore = useAuthStore()
            if (!authStore.user?.id) {
                return { success: false, error: 'Utilisateur non authentifié' }
            }
            if (!receiverId) {
                return { success: false, error: 'Destinataire invalide' }
            }
            if (!content && !file) {
                return { success: false, error: 'Message vide' }
            }

            let fileUrl: string | null = null
            let fileName: string | null = null
            let fileType: string | null = null

            if (file) {
                const rawExt = file.name.includes('.') ? file.name.split('.').pop() : ''
                const fileExt = rawExt ? `.${rawExt}` : ''
                const filePath = `chat/${authStore.user.id}/${Date.now()}${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('chat-files')
                    .upload(filePath, file, {
                        contentType: file.type || undefined,
                        upsert: false
                    })
                if (uploadError) throw uploadError

                const { data } = supabase.storage.from('chat-files').getPublicUrl(filePath)
                fileUrl = data.publicUrl
                fileName = file.name
                fileType = file.type || null
            }

            const { error } = await supabase.from('messages').insert({
                sender_id: authStore.user.id,
                receiver_id: receiverId,
                content,
                file_url: fileUrl,
                file_name: fileName,
                file_type: fileType
            })
            if (error) throw error

            await fetchMessages(receiverId)
            return { success: true }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
            return { success: false, error: errorMessage }
        }
    }

    const fetchMessages = async (friendId: string): Promise<void> => {
        try {
            const authStore = useAuthStore()
            if (!authStore.user?.id) {
                console.error('Utilisateur non authentifié')
                return
            }
            if (!friendId) return

            const { data, error } = await supabase
                .from('messages')
                .select(
                    `
            *,
            sender:sender_id(nom, prenom, pseudo, photo)
          `
                )
                .or(
                    `and(sender_id.eq.${authStore.user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${authStore.user.id})`
                )
                .order('created_at', { ascending: true })

            if (error) throw error
            messages.value = (data as Message[]) || []
            activeChat.value = friendId
        } catch (error) {
            console.error('Erreur lors du chargement des messages:', error)
        }
    }

    const subscribeToMessages = (friendId: string): RealtimeChannel => {
        const authStore = useAuthStore()

        if (activeSubscription.value) {
            void activeSubscription.value.unsubscribe()
        }

        const filter =
            authStore.user?.id && friendId
                ? `or(and(sender_id.eq.${authStore.user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${authStore.user.id}))`
                : undefined

        const channel = supabase
            .channel(`messages-${friendId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    ...(filter ? { filter } : {})
                },
                (payload: RealtimePostgresInsertPayload<any>) => {
                    const newMessage = payload.new as { sender_id: string; receiver_id: string }
                    if (
                        authStore.user?.id &&
                        ((newMessage.sender_id === authStore.user.id && newMessage.receiver_id === friendId) ||
                            (newMessage.sender_id === friendId && newMessage.receiver_id === authStore.user.id))
                    ) {
                        void fetchMessages(friendId)
                    }
                }
            )
            .subscribe()

        activeSubscription.value = channel
        return channel
    }

    const unsubscribeFromMessages = async (): Promise<void> => {
        if (activeSubscription.value) {
            await activeSubscription.value.unsubscribe()
            activeSubscription.value = null
        }
    }

    return {
        messages: readonly(messages),
        activeChat: readonly(activeChat),
        sendMessage,
        fetchMessages,
        subscribeToMessages,
        unsubscribeFromMessages
    }
})