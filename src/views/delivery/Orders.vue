<template>
<v-container>
  <v-tabs>
    <v-tab @click="stateOrder='in_process'">En proceso</v-tab>
    <v-tab v-if="stateSubclassOrder" @click="stateOrder='pending'" class="state-subclass">Pendientes</v-tab>
    <v-tab v-if="stateSubclassOrder" @click="stateOrder='accepted'" class="state-subclass">Aceptados</v-tab>
    <v-tab v-if="stateSubclassOrder" @click="stateOrder='in_travel'" class="state-subclass">En viaje</v-tab>
    <v-tab @click="stateOrder='delivered'">Entregados</v-tab>
  </v-tabs>
    <br v-if="loading">
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-row v-if="!hasOrders && !loading">
      <v-col>
        No hay pedidos que mostrar
      </v-col>
    </v-row>
  <v-card>
      <v-row v-for="order in this.$store.getters.orders" :key="order.id">
          <v-col :class="styleOrder(order)" cols="8" md="8">#{{order.order.id}} - {{order.order.address.name}} {{order.order.address.number}}</v-col>
          <v-col cols="3" md="3" align="end">
            <v-btn
              v-if="order.state == 'accepted'"
              fab
              dark
              color="primary"
              x-small
              class="mr-2"
              @click="changeStateOrder(order)"
            >
              <v-icon>
                electric_moped
              </v-icon>
            </v-btn>
            <InformationOrder 
              :order = "order"
            />
          </v-col>
      </v-row>
  </v-card>
  <v-pagination
    v-if="!loading"
    v-model="currentPage"
    class="my-4"
    color="primary"
    :length="pageCount"
  ></v-pagination>
</v-container>
</template>

<script>
  import InformationOrder from '@/views/delivery/InformationOrder';
  import Paginator from '@/components/modules/Paginator';

  export default {
    components: {
      InformationOrder,
      Paginator
    },

    data: () => ({
        stateOrder: 'in_process',
        orders: [],
        dialog: false,
        currentPage: 1,
        total: 0,
        pageCount: 1,
        loading: true
    }),

    created() {
    },

    mounted() { 
      this.getOrdersByState()
    },

    watch: {
      stateOrder() {
        this.getOrdersByState()
      },

      currentPage() {
        this.getOrdersByState()
      },
    },

    computed: {
      stateSubclassOrder() {
        return this.stateOrder != 'delivered' && this.stateOrder != 'cancelled'
      },

      hasOrders() {
        return this.$store.getters.orders.length > 0
      }
    },

    methods: {
      getOrdersByState() {
        this.$axios
        .get(
          this.apiUrl(`order/commerce/${this.stateOrder}/1?page=${this.currentPage}`)
        )
        .then(response => {
          this.setDataPagination(response.data)
          this.$store.commit("setOrders", response.data.data);
        })
        .then(() => 
          this.loading = false
        );
      },

      changeStateOrder(order) {
        /* this.$axios
        .post(
          this.apiUrl(`order/${this.stateOrder}/change_state`)
        )
        .then(response => {
          this.orders = response.data
          this.$store.commit("setOrders", response.data);
        }) */
      },

      styleOrder(order) {
        let clase = "ml-3 "
        if(order.state == "pending") {
          return clase + 'order-pendiente'
        }
        if(order.state == "accepted") {
          return clase + 'order-aceptado'
        }
        if(order.state == "in_travel") {
          return clase + 'order-enviaje'
        }
        if(order.state == "delivered") {
          return clase + 'order-entregado'
        }
        if(order.state == "cancelled") {
          return clase + 'order-cancelled'
        }
      },

      setDataPagination(data) {
				this.pageCount = data.cantPages
				this.total = data.total
      }
    }
  }
</script>

<style scoped>
.order-pendiente {
  border-left: 5px solid #ffe100
}

.order-aceptado {
  border-left: 5px solid #09ccc9
}

.order-enviaje {
  border-left: 5px solid #e89b0c
}

.order-entregado {
  border-left: 5px solid #2dbd09
}

.order-cancelled {
  border-left: 5px solid #e90c0c
}

.state-subclass {
  font-size: 11px;
}
</style>