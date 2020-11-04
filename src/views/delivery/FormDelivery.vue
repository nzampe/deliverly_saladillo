<template>
  <v-container v-if="!loading">
    <v-alert dismissible type="error" v-model="alertCantCreate">
        Ha ocurrido un error al enviar el pedido.
    </v-alert>
    <v-stepper
      v-model="e6"
      vertical
    >
      <v-stepper-step
        :complete="e6 > 1"
        step="1"
      >
        Datos del pedido
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-row class="mx-1">
          <v-col
              cols="12"
              class="py-2"
          >
            <v-btn-toggle
                v-model="$v.dataOrder.typeOrder.$model"
                borderless
                color="#3ab6fe"
                group
            >
              <v-btn v-for="typeOrder in typesOrders" v-bind:key="typeOrder.id" :value="typeOrder.id">
                  {{typeOrder.name}}
              </v-btn>
            </v-btn-toggle>
            <v-tooltip bottom max-width="200px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  info
                </v-icon>
              </template>
              <span v-for="typeOrder in typesOrders" v-bind:key="typeOrder.id">
                {{typeOrder.name}} - {{typeOrder.dimensions}}
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="$v.dataOrder.productCost.$model"
              label="Costo del producto *"
              prefix="$"
              type="float"
              class="inputPrice"
              :error = validationError($v.dataOrder.productCost)  
              :error-messages = validationMessages($v.dataOrder.productCost)
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="$v.dataOrder.sendingCost.$model"
              label="Costo de envío *"
              prefix="$"
              type="float"
              class="inputPrice"
              :error = validationError($v.dataOrder.sendingCost)
              :error-messages = validationMessages($v.dataOrder.sendingCost)
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                :value="sumCost"
                label="Precio total:"
                prefix="$"
                readonly
                type="float"
                class="inputPrice" 
              ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="$v.dataOrder.description.$model"
              solo
              label="Descripción del pedido *"
              :error-messages = validationMessages($v.dataOrder.description)
            ></v-textarea>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col>
            <small>(*) campos obligatorios</small>
          </v-col>
          <v-col align="end">
            <v-btn
              color="primary"
              @click="e6 = 2"
            >
              Siguiente
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 2"
        step="2"
      >
        Datos del cliente
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-row class="mx-1">
          <v-col cols="12" md="6">
              <v-text-field
                v-model="$v.dataClient.firstName.$model"
                label="Nombre *"
                :error = validationError($v.dataClient.firstName)
                :error-messages = validationMessages($v.dataClient.firstName)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field
                v-model="$v.dataClient.lastName.$model"
                label="Apellido *"
                :error = validationError($v.dataClient.lastName)
                :error-messages = validationMessages($v.dataClient.lastName)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
              <v-text-field
                v-model="$v.dataClient.codAreaTel.$model"
                label="Cod Área Teléfono *"
                :error = validationError($v.dataClient.codAreaTel)
                :error-messages = validationMessages($v.dataClient.codAreaTel)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
              <v-text-field
                v-model="$v.dataClient.tel.$model"
                label="Teléfono *"
                :error = validationError($v.dataClient.tel)
                :error-messages = validationMessages($v.dataClient.tel)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="$v.dataClient.nameAddress.$model"
                label="Calle *"
                :error = validationError($v.dataClient.nameAddress)
                :error-messages = validationMessages($v.dataClient.nameAddress)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
              <v-text-field
                v-model="$v.dataClient.numberAddress.$model"
                label="Número *"
                :error = validationError($v.dataClient.numberAddress)
                :error-messages = validationMessages($v.dataClient.numberAddress)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
              <v-text-field
                v-model="$v.dataClient.floorAddress.$model"
                label="Piso"
                :error = validationError($v.dataClient.floorAddress)
                :error-messages = validationMessages($v.dataClient.floorAddress)
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
              <v-text-field
                v-model="$v.dataClient.flatAddress.$model"
                label="Dpto"
                :error = validationError($v.dataClient.flatAddress)
                :error-messages = validationMessages($v.dataClient.flatAddress)
              ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <small>(*) campos obligatorios</small>
          </v-col>
          <v-col align="end">
            <v-btn
              color="primary"
              @click="e6 = 1" 
            >
              Atrás
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper>
    <v-col align="end">
      <v-btn
        color="primary"
        @click="create()" 
        :disabled="!verifyValidData()"
      >
        Enviar
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
import * as PusherPushNotifications from "@pusher/push-notifications-web"
import { helpers, required, alpha, alphaNum, numeric, minValue, maxLength } from 'vuelidate/lib/validators'
const decimal = helpers.regex('decimal', /^\d+(\.\d+)$/)

const beamsClient = new PusherPushNotifications.Client({
  instanceId: 'c64c9d1d-477e-4739-8c3b-fe25decdab4e',
});


beamsClient.start()
  .then(beamsClient => beamsClient.getDeviceId())
  .then(deviceId =>
    console.log('Successfully registered with Beams. Device ID:', deviceId)
  )
  .then(() => beamsClient.addDeviceInterest('debug-hello'))
    .then(() => beamsClient.getDeviceInterests())
    .then(interests => console.log('Current interests:', interests))
    .catch(console.error);

  export default {
    name: 'FormDelivery',

    data: () => ({
      dataClient: {
        firstName: '',
        lastName: '',
        codAreaTel: '',
        tel: '',
        nameAddress: '',
        numberAddress: '',
        floorAddress: '',
        flatAddress: '',
      },
      dataOrder: {
        description: '',
        typeOrder: '',
        productCost: '',
        sendingCost: '',
        totalCost: '',
      },
      typesOrders: [],
      e6: 1,
      alertCantCreate: false,
      loading: true
    }),

    validations: {
      dataClient: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        codAreaTel: { required, numeric, maxLength: maxLength(6) },
        tel: { required, numeric, maxLength: maxLength(12) },
        nameAddress: { required, alphaNum },
        numberAddress: { required, numeric, maxLength: maxLength(5) },
        floorAddress: { numeric, maxLength: maxLength(3) },
        flatAddress: { alphaNum, maxLength: maxLength(5) }
      },
      dataOrder: {
        description: { required, alphaNum, maxLength: maxLength(200) },
        typeOrder: { required, numeric },
        productCost: { required, decimal }, 
        sendingCost: { required, decimal},
      }
    },

    mounted() {
				this.$axios
				.get(
					this.apiUrl("type_order")
				)
				.then(response => {
					this.typesOrders = response.data
        })
        .then(() =>
          this.loading = false
        )
    },
    
    watch: {},

    computed: {
      sumCost() {
        if(!isNaN(parseFloat(this.dataOrder.sendingCost)) && !isNaN(parseFloat(this.dataOrder.productCost))){
          this.totalCost = parseFloat((parseFloat(this.dataOrder.productCost) + parseFloat(this.dataOrder.sendingCost)).toFixed(2))
        }
        if(!this.dataOrder.sendingCost && !this.dataOrder.productCost){
          return ''
        }
        return this.totalCost
      },

      canCreate() {
        return this.verifyValidData()
      },

      seeAlertCantCreate() {
        return this.alertCantCreate
      }

    },

    methods: {
      create() {
        if(!this.verifyValidData()){
          this.alertCantCreate = true
          return
        }
        let formData = new FormData();
			  formData.append("description", this.description);
			  formData.append("typeOrder", this.typeOrder);
			  formData.append("productCost", this.productCost);
			  formData.append("sendingCost", this.sendingCost);
			  formData.append("firstName", this.firstName);
			  formData.append("lastName", this.lastName);
			  formData.append("codAreaTel", this.codAreaTel);
			  formData.append("tel", this.tel);
			  formData.append("nameAddress", this.nameAddress);
			  formData.append("numberAddress", this.numberAddress);
			  formData.append("floorAddress", this.floorAddress);
			  formData.append("flatAddress", this.flatAddress);
        axios
        .post('order/', formData)
        .then(response => {
          
            this.clearValuesOrder()
        })
        .catch(error => {
            reject(error)
        })
      },

      verifyValidData() {
        return !this.$v.$invalid ? true : false
      },

      closeAlerteCantCreate() {
        this.alertCantCreate = false
      },

      validationError(validation) {
        return validation.$error
      },

      validationMessages(validation) {
        let messages = []
        if(validation.$error){
          if(validation.$params.required){
            if(!validation.required){
              messages.push("El campo es obligatorio.")
            }
          }
          if(validation.$params.alpha){
            if(!validation.alpha){
              messages.push("El campo debe contener solo letras.")
            }
          }
          if(validation.$params.alphaNum){
            if(!validation.alphaNum){
              messages.push("El campo debe contener letras y/o números.")
            }
          }
          if(validation.$params.numeric){
            if(!validation.numeric){
              messages.push("El campo debe contener un número entero.")
            }
          }
          if(validation.$params.decimal){
            if(!validation.decimal){
              messages.push("El campo debe contener un número decimal. Por ej: 10.0")
            }
          }
          if(validation.$params.maxLength){
            if(!validation.maxLength){
              messages.push(`El tamaño máximo es de ${validation.$params.maxLength.max}.`)
            }
          }
        }

        return messages
      },
    },
  }

</script>
          

<style scoped>
/* .pendiente{
  background-color: yellow;
} */
.en_proceso{
  background-color: green;
}
.entregado{
  background-color: lightblue;
}
</style>