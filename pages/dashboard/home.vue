<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Welcome, {{ auth.user?.email || 'Guest' }}</h1>
        <v-btn v-if="auth.isLoggedIn()" @click="logout">Logout</v-btn>
        <v-btn v-else to="/login">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from '@/stores/auth'


export default {
  data() {
    return {
      auth: useAuthStore(),
    }
  },
  mounted() {
    this.auth.fetchUser()
  },
  methods: {
    async logout() {
      await this.auth.logout()
      this.$router.push('/login')
    },
  }
}
</script>