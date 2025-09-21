<script lang="ts">
import {defineComponent} from 'vue'
import {useAuthStore} from "~/stores/auth";

export default defineComponent({
  name: "top-bar-menu",
  methods: {useAuthStore},
  setup() {
    // Setup logic can go here if needed

  }
})
</script>

<template>
  <v-app-bar flat color="Matisse" elevation="0" class="px-md-7 px-sm-5">
    <router-link to="/" class="pa-0 ma-0">
      <v-icon size="50" ><v-img rounded="xl" src="public/ServGo_Logo.png"></v-img></v-icon>
    </router-link>
    <v-toolbar-title>ServGo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" class="d-none d-md-flex" >Buy</v-btn>
    <v-btn variant="text" class="d-none d-md-flex" >Rent</v-btn>
    <v-btn variant="text" class="d-none d-md-flex" >Finance</v-btn>
    <v-btn variant="text" class="d-none d-md-flex" >Sell</v-btn>
    <v-btn variant="text" class="d-none d-md-flex" >Insurance</v-btn>
    <v-btn variant="elevated" class="ml-2" color="BlackPearl" to="/auth/users/register">Sign up</v-btn>
    <v-btn variant="elevated" class="ml-2" color="green" to="/auth/users/login">Login</v-btn>
    <v-btn variant="elevated" class="ml-2" color="green" @click="useAuthStore().logout()">exit</v-btn>

  </v-app-bar>
</template>

<style scoped>

</style>