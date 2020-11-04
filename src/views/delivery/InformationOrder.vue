<template>
  <v-dialog
      v-model="dialog"
      width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        color="primary"
        x-small
        alt="Ver más"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
        mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card v-if="dialog">
      <div>
        <h4 class="ml-4 pt-3"> 
          Datos del pedido:
        </h4>
        <v-card-text class="mt-n3">
          <v-row>
            <v-col cols="12">Dirección: {{order.order.address.name}} {{order.order.address.number}} {{order.order.address.floor}}{{order.order.address.flat}}</v-col>
            <v-col cols="12">Teléfono del cliente: ({{order.order.client_cod_area_tel}}){{order.order.client_number_tel}}</v-col>
            <v-col cols="12">Costo pedido:{{order.order.product_cost}}</v-col>
            <v-col cols="12">Costo envío: {{order.order.sending_cost}}</v-col>
            <v-col cols="12">Costo total: {{order.order.total_cost}}</v-col>
            <v-col cols="12">Monto con el que paga: {{order.order.amount_to_pay}}</v-col>
            <v-col cols="12">Descripción: {{order.order.description}}</v-col>
            <v-col cols="12">Tipo del pedido: {{order.order.type_order.name}} ({{order.order.type_order.dimensions}})</v-col>
          </v-row>  
        </v-card-text>
      </div>
      <v-divider></v-divider>
        <!-- Solo si el usuario es de tipo comercio -->
      <div v-if="deliverman.user">
        <h4 class="ml-4 mb-1 pt-3"> 
          Datos del deliverman:
        </h4>
        <v-card-text class="mt-n3">
          <v-row>
            <v-col cols="12">Nombre: {{deliverman.user.first_name}} {{deliverman.user.last_name}}</v-col>
            <v-col cols="12">DNI: {{deliverman.user.dni}}</v-col>
            <v-col cols="12">Automóvil: Chevrolet Corsa modelo 2000 patente HDP123</v-col>
          </v-row>  
        </v-card-text>            
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        deliverman: {}
      }
    },
		
		props: {
        order: {
            type: Object,
            required: true,
        },
    },
    
    mounted() {
    },

    watch: {
      dialog() {
        if(this.order.deliverman){
          this.$axios
          .get(
            this.apiUrl(`deliverman/${this.order.deliverman}`)
          )
          .then(response => {
            this.deliverman = response.data
          })
        }
      }
    },
  }
</script>