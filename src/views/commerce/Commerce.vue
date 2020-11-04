<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="7">
        <Orders/>
      </v-col>
      <v-col cols="12" lg="5">
        <FormDelivery/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import FormDelivery from '@/views/delivery/FormDelivery';
  import Orders from '@/views/delivery/Orders';

  export default {
    components: {
      FormDelivery,
      Orders
    },
    
    data: () => ({
      //
    }),
  }
</script>

<style scoped>
</style>