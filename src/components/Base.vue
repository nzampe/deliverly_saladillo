<template>
  <v-container>
    <!-- <Navbar/> -->
    <router-view></router-view>
  </v-container>
</template>

<script>
  import Navbar from '@/components/modules/Navbar';

  export default {
    components: {
      Navbar,
    },
    
    data: () => ({
      //
    }),
  }
</script>

<style scoped>
</style>