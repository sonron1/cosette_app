import { defineStore } from 'pinia'

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
    const supabase = useSupabaseClient()

    const login = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            if (data.user) {
                await fetchUserProfile(data.user.id)
            }

            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message }
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
            // Vérifier si le pseudo existe déjà
            const { data: existingUser } = await supabase
                .from('users')
                .select('pseudo')
                .eq('pseudo', userData.pseudo)
                .single()

            if (existingUser) {
                return { success: false, error: 'Ce pseudo est déjà utilisé' }
            }

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password
            })

            if (authError) throw authError

            if (authData.user) {
                const { error: profileError } = await supabase
                    .from('users')
                    .insert({
                        id: authData.user.id,
                        email: userData.email,
                        nom: userData.nom,
                        prenom: userData.prenom,
                        pseudo: userData.pseudo,
                        age: userData.age,
                        photo: userData.photo
                    })

                if (profileError) throw profileError
                await fetchUserProfile(authData.user.id)
            }

            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message }
        }
    }

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) throw error
            user.value = data
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error)
        }
    }

    const logout = async () => {
        await supabase.auth.signOut()
        user.value = null
        friends.value = []
        friendRequests.value = []
        await navigateTo('/auth/login')
    }

    const sendFriendRequest = async (pseudo: string) => {
        try {
            const { data: targetUser, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('pseudo', pseudo)
                .single()

            if (userError || !targetUser) {
                return { success: false, error: 'Utilisateur non trouvé' }
            }

            const { error } = await supabase
                .from('friend_requests')
                .insert({
                    sender_id: user.value?.id,
                    receiver_id: targetUser.id,
                    status: 'pending'
                })

            if (error) throw error
            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message }
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
            console.error('Erreur lors de l\'acceptation de la demande:', error)
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
            const { data, error } = await supabase
                .from('friend_requests')
                .select(`
          *,
          sender:sender_id(id, nom, prenom, pseudo, photo),
          receiver:receiver_id(id, nom, prenom, pseudo, photo)
        `)
                .or(`sender_id.eq.${user.value?.id},receiver_id.eq.${user.value?.id}`)
                .eq('status', 'pending')

            if (error) throw error
            friendRequests.value = data || []
        } catch (error) {
            console.error('Erreur lors du chargement des demandes d\'amis:', error)
        }
    }

    const fetchFriends = async () => {
        try {
            const { data, error } = await supabase
                .from('friend_requests')
                .select(`
          sender:sender_id(id, nom, prenom, pseudo, photo),
          receiver:receiver_id(id, nom, prenom, pseudo, photo)
        `)
                .or(`sender_id.eq.${user.value?.id},receiver_id.eq.${user.value?.id}`)
                .eq('status', 'accepted')

            if (error) throw error

            const friendsList = data?.map((request: any) => {
                return request.sender.id === user.value?.id
                    ? request.receiver
                    : request.sender
            }) || []

            friends.value = friendsList
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