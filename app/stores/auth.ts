import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import { useSupabaseClient, navigateTo } from '#imports'

interface User {
    id: string
    email: string
    nom: string
    prenom: string
    pseudo: string
    age: number
    photo?: string
    created_at: string
}

interface FriendRequest {
    id: string
    sender_id: string
    receiver_id: string
    status: 'pending' | 'accepted' | 'rejected'
    sender: User
    receiver: User
    created_at: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const friends = ref<User[]>([])
    const friendRequests = ref<FriendRequest[]>([])
    const supabase = useSupabaseClient<any>() // relaxe le typage pour éviter "never"

    const login = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            if (data.user?.id) await fetchUserProfile(data.user.id)
            return { success: true }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
            return { success: false, error: errorMessage }
        }
    }

    const register = async (userData: {
        email: string
        password: string
        nom: string
        prenom: string
        pseudo: string
        age: number
        photo?: string
    }) => {
        try {
            const { data: existingUser, error: existingErr } = await supabase
                .from('users')
                .select('pseudo')
                .eq('pseudo', userData.pseudo)
                .maybeSingle()
            if (existingErr) throw existingErr
            if (existingUser) return { success: false, error: 'Ce pseudo est déjà utilisé' }

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password
            })
            if (authError) throw authError

            if (authData.user?.id) {
                const payload = {
                    id: authData.user.id,
                    email: userData.email,
                    nom: userData.nom,
                    prenom: userData.prenom,
                    pseudo: userData.pseudo,
                    age: userData.age,
                    photo: userData.photo
                }
                const { error: profileError } = await supabase.from('users').insert(payload)
                if (profileError) throw profileError
                await fetchUserProfile(authData.user.id)
            }

            return { success: true }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
            return { success: false, error: errorMessage }
        }
    }

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()
            if (error) throw error
            user.value = data as User
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error)
        }
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error('Erreur lors de la déconnexion:', error)
        user.value = null
        friends.value = []
        friendRequests.value = []
        await navigateTo('/auth/login')
    }

    const sendFriendRequest = async (pseudo: string) => {
        try {
            if (!user.value?.id) return { success: false, error: 'Utilisateur non authentifié' }

            const { data: targetUser, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('pseudo', pseudo)
                .single()

            if (userError || !targetUser) return { success: false, error: 'Utilisateur non trouvé' }

            const payload = {
                sender_id: user.value.id,
                receiver_id: (targetUser as { id: string }).id,
                status: 'pending' as const
            }

            const { error } = await supabase.from('friend_requests').insert(payload)
            if (error) throw error
            return { success: true }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
            return { success: false, error: errorMessage }
        }
    }

    const acceptFriendRequest = async (requestId: string) => {
        try {
            const { error } = await supabase
                .from('friend_requests')
                .update({ status: 'accepted' })
                .eq('id', requestId)
            if (error) throw error
            await fetchFriendRequests()
            await fetchFriends()
        } catch (error) {
            console.error("Erreur lors de l'acceptation de la demande:", error)
        }
    }

    const rejectFriendRequest = async (requestId: string) => {
        try {
            const { error } = await supabase
                .from('friend_requests')
                .update({ status: 'rejected' })
                .eq('id', requestId)
            if (error) throw error
            await fetchFriendRequests()
        } catch (error) {
            console.error('Erreur lors du rejet de la demande:', error)
        }
    }

    const fetchFriendRequests = async () => {
        try {
            if (!user.value?.id) {
                friendRequests.value = []
                return
            }
            const { data, error } = await supabase
                .from('friend_requests')
                .select(`
          *,
          sender:sender_id(id, nom, prenom, pseudo, photo, email, age, created_at),
          receiver:receiver_id(id, nom, prenom, pseudo, photo, email, age, created_at)
        `)
                .or(`sender_id.eq.${user.value.id},receiver_id.eq.${user.value.id}`)
                .eq('status', 'pending')

            if (error) throw error
            friendRequests.value = (data as FriendRequest[]) || []
        } catch (error) {
            console.error("Erreur lors du chargement des demandes d'amis:", error)
        }
    }

    const fetchFriends = async () => {
        try {
            if (!user.value?.id) {
                friends.value = []
                return
            }

            const { data, error } = await supabase
                .from('friend_requests')
                .select(`
          sender:sender_id(id, nom, prenom, pseudo, photo, email, age, created_at),
          receiver:receiver_id(id, nom, prenom, pseudo, photo, email, age, created_at)
        `)
                .or(`sender_id.eq.${user.value.id},receiver_id.eq.${user.value.id}`)
                .eq('status', 'accepted')

            if (error) throw error

            // Normalisation: sender/receiver peuvent être objet ou tableau selon l'inférence
            type Row = { sender: User | User[]; receiver: User | User[] }
            const rows = (data ?? []) as Row[]
            const toUser = (u: User | User[] | undefined): User | undefined =>
                Array.isArray(u) ? u[0] : u

            const list = rows
                .map((r) => {
                    const s = toUser(r.sender)
                    const rec = toUser(r.receiver)
                    if (!s || !rec) return undefined
                    return s.id === user.value!.id ? rec : s
                })
                .filter(Boolean) as User[]

            friends.value = list
        } catch (error) {
            console.error('Erreur lors du chargement des amis:', error)
        }
    }

    return {
        user: readonly(user),
        friends: readonly(friends),
        friendRequests: readonly(friendRequests),
        login,
        register,
        logout,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        fetchUserProfile,
        fetchFriendRequests,
        fetchFriends
    }
})