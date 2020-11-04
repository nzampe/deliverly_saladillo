<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="60"
    width="100%"
  >
    <v-app-bar
      color="#3ab6fe"
      dark
    >		
      <v-col cols="2" md="2">
        <v-img
          :src="require('@/assets/images/logo.png')"
          class="mb-1 ml-n16"
          contain
          height="120"
        />
      </v-col>
      <v-col cols="8" md="8" sm="2" align="end">
        <!-- <p>{{this.$store.getters.user.username}}</p> -->
      </v-col>
      <v-col cols="1" md="1" sm="1" align="left">
        <v-icon
          color="#E1F5FE"
          dark
          large
        >
          account_circle
        </v-icon>
      </v-col>
      <v-col>
        <v-menu
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              icon
              medium
            >
              <v-badge
                  content="3"
                  color="#FFE082"
                >
                  <v-icon 
                    large
                  >
                    notifications
                  </v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-app-bar>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),

    methods: {
      next() {
        console.log("asd")
      }
    },
  }
</script>

<style scoped>
.v-main{
   background-color: #3ab6fe
}
#btn-notification{
  background-color: transparent !important;
}
</style>