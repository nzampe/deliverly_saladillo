<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="7">
        <Orders/>
      </v-col>
      <v-col cols="12" lg="5">
        <InfoDeliverman class="mt-5"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Orders from '@/views/deliverman/Orders';
  import InfoDeliverman from '@/views/deliverman/InfoDeliverman';
  import Pusher from 'pusher-js'
  import * as PusherPushNotifications from "@pusher/push-notifications-web"

  export default {
    components: {
      Orders,
      InfoDeliverman
    },
    
    data: () => ({
      //
    }),

    created() {
      this.$axios
				.get(
					this.apiUrl("deliverman/time_zone")
				)
				.then(response => {
					this.subscribeChannel(response.data)
					this.subscribeBeams(response.data)
        })   
    },

    mounted() {
      console.log(this.$store.getters.user.roles.includes('ROLE_DELIVERMAN'))
    },

    methods: {
      subscribeChannel (timeZone) {
        let pusher = new Pusher('52154600eff89e51b5a2', { cluster: 'us2' })
        pusher.subscribe('orders')
        pusher.bind('new-order-'+timeZone, data => {
          console.log(data.notification)
        })
      },

      subscribeBeams (timeZone) {
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: 'c64c9d1d-477e-4739-8c3b-fe25decdab4e',
        });

        beamsClient.start()
          .then(beamsClient => beamsClient.getDeviceId())
          .then(deviceId =>
            console.log('Successfully registered with Beams. Device ID:', deviceId)
          )
          .then(() => beamsClient.addDeviceInterest('new-order-'+timeZone))
          .then(() => beamsClient.getDeviceInterests())
          .then(interests => console.log('Current interests:', interests))
          .catch(console.error);
        }
    },
  }
</script>

<style scoped>
</style>