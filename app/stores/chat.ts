import { defineStore } from 'pinia'
import type { RealtimeChannel } from '@supabase/supabase-js'
import {useAuthStore} from "~/stores/auth";

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
    const supabase = useSupabaseClient()

    const sendMessage = async (receiverId: string, content: string, file?: File) => {
        try {
            const authStore = useAuthStore()

            let fileUrl: string | null = null
            let fileName: string | null = null
            let fileType: string | null = null

            if (file) {
                const fileExt = file.name.split('.').pop()
                const filePath = `${Date.now()}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('chat-files')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('chat-files')
                    .getPublicUrl(filePath)

                fileUrl = publicUrl
                fileName = file.name
                fileType = file.type
            }

            const { error } = await supabase
                .from('messages')
                .insert({
                    sender_id: authStore.user?.id,
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

    const fetchMessages = async (friendId: string) => {
        try {
            const authStore = useAuthStore()

            if (!authStore.user?.id) {
                console.error('Utilisateur non authentifié')
                return
            }

            const { data, error } = await supabase
                .from('messages')
                .select(`
          *,
          sender:sender_id(nom, prenom, pseudo, photo)
        `)
                .or(`and(sender_id.eq.${authStore.user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${authStore.user.id})`)
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

        // Unsubscribe from previous channel if exists
        if (activeSubscription.value) {
            activeSubscription.value.unsubscribe()
        }

        const channel = supabase
            .channel(`messages-${friendId}`)
            .on('postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages'
                },
                (payload) => {
                    const newMessage = payload.new as any
                    if (authStore.user?.id &&
                        ((newMessage.sender_id === authStore.user.id && newMessage.receiver_id === friendId) ||
                            (newMessage.sender_id === friendId && newMessage.receiver_id === authStore.user.id))) {
                        fetchMessages(friendId)
                    }
                }
            )
            .subscribe()

        activeSubscription.value = channel
        return channel
    }

    const unsubscribeFromMessages = () => {
        if (activeSubscription.value) {
            activeSubscription.value.unsubscribe()
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