<script >
import sideNav from "~/components/dashboard/sideNav.vue";

export default {
  components: {
    sideNav,
  },
};
</script>
<template>
  <v-app>
    <side-nav />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>


