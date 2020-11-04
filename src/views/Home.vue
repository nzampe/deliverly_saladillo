<template>
    <Commerce/>
    <!-- <Deliverman/> -->
</template>

<script>
  import Commerce from '@/views/commerce/Commerce';
  import Deliverman from '@/views/deliverman/Deliverman';
  import Pusher from 'pusher-js'

  export default {
    components: {
      Commerce,
      Deliverman,
    },
    
    data: () => ({
      //
    }),

    created() {
      this.subscribe()
    },

    methods: {
    // ...
    subscribe () {
      let pusher = new Pusher('52154600eff89e51b5a2', { cluster: 'us2' })
      pusher.subscribe('orders')
      pusher.bind('new-order', data => {
        console.log(data)
      })
    }
  },
  }
</script>

<style scoped>
</style>