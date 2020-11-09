<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="7">
        <Orders/>
      </v-col>
      <v-col cols="12" lg="5">
        <FormOrder class="mt-5"/>
        <InfoCommerce class="mt-5"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Orders from '@/views/commerce/Orders';
  import FormOrder from '@/views/delivery/FormOrder';
  import InfoCommerce from '@/views/commerce/InfoCommerce';
  import Pusher from 'pusher-js'
  import * as PusherPushNotifications from "@pusher/push-notifications-web"

  export default {
    components: {
      Orders,
      FormOrder,
      InfoCommerce
    },
    
    data: () => ({
      //
    }),

    created() {
      this.$axios
				.get(
					this.apiUrl("commerce")
				)
				.then(response => {
					this.subscribeChannel(response.data.user.id)
					this.subscribeBeams(response.data.user.id)
        })   
    },

    mounted() {
    },

    methods: {
      subscribeChannel (user) {
        let pusher = new Pusher('52154600eff89e51b5a2', { cluster: 'us2' })
        pusher.subscribe('orders')
        pusher.bind('change-state-order-'+user, data => {
          console.log(data.state)
        })
      },

      subscribeBeams (user) {
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: 'c64c9d1d-477e-4739-8c3b-fe25decdab4e',
        });

        beamsClient.start()
          .then(beamsClient => beamsClient.getDeviceId())
          .then(deviceId =>
            console.log('Successfully registered with Beams. Device ID:', deviceId)
          )
          .then(() => beamsClient.addDeviceInterest('change-state-order-'+user))
          .then(() => beamsClient.getDeviceInterests())
          .then(interests => console.log('Current interests:', interests))
          .catch(console.error);
        }
    },
  }
</script>

<style scoped>
</style>