<template>
  <v-app>
      <Navbar/>
      <Base/>
  </v-app>
</template>

<script>
import Base from '@/components/Base';
import Navbar from '@/components/modules/Navbar';

export default {
  name: 'App',

  components:{
    Base,
    Navbar
  },

  created() {
    this.$root.$data.baseUrlApi = process.env.VUE_APP_ROUTE_API
    this.$axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.token;
  },
};
</script>