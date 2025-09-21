import { defineStore } from 'pinia'
import {createClient} from "@supabase/supabase-js";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        async login(email, password) {
            const superbase = useSupabaseClient()
            const { data, error } = await superbase.auth.signInWithPassword({ email, password })
            if (error) throw error
            this.user = data.user
        },

        async register(email, password) {
            const superbase = useSupabaseClient()
            const { data, error } = await superbase.auth.signUp({ email, password })
            if (error) throw error
        },
        async logout() {
            const superbase = useSupabaseClient()
            await superbase.auth.signOut()
            this.user = null
        },
        async fetchUser() {
            const superbase = useSupabaseClient()
            const { data } = await superbase.auth.getUser()
            this.user = data.user
        },
        isLoggedIn() {
            return !!this.user
        },
    }
})