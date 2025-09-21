<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card class="pa-6" max-width="500" elevation="10" rounded="lg">
      <v-card-title class="justify-center text-h5 font-weight-bold">
        Welcome Back
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin" ref="form">
          <!-- Email -->
          <v-text-field
              v-model="email"
              label="Email"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-email"
              required
          ></v-text-field>

          <!-- Password -->
          <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock"
              required
          ></v-text-field>

          <!-- Buttons -->
          <div class="d-flex justify-space-between mt-4">
            <v-btn
                to="/auth/register"
                variant="text"
                color="primary"
                prepend-icon="mdi-account-plus"
            >
              Register
            </v-btn>

            <v-btn
                type="submit"
                color="primary"
                variant="flat"
                prepend-icon="mdi-login"
            >
              Login
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>


import {useAuthStore} from "../../stores/auth.js";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  mounted() {

  },
  methods: {
    async handleLogin() {
      const auth = useAuthStore()
      try {
        await auth.login(this.email, this.password)
        this.$router.push('/dashboard/home')
      } catch (err) {
        alert(err.message)
      }
    },
  }
}
</script>