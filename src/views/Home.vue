<template>
  <Commerce/>
    <!-- <Commerce v-if="this.$store.getters.user.roles.includes('ROLE_COMMERCE')"/> -->
    <!-- <Deliverman v-if="this.$store.getters.user.roles.includes("ROLE_DELIVERMAN")"/> -->
</template>

<script>
  import Commerce from '@/views/commerce/Commerce';
  import Deliverman from '@/views/deliverman/Deliverman';

  export default {
    components: {
      Commerce,
      Deliverman,
    },
    
    data: () => ({
      //
    }),
  }
</script>

<style scoped>
</style>