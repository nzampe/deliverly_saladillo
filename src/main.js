import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import './service-worker.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(Vuetify, {
  icons: {
    iconfont: 'md' || 'fa' // default - only for display purposes
  },
})

Vue.mixin({

  computed: {
    baseUrlApi: function () {
      if (this.$root.$data.baseUrlApi.includes('localhost') || this.$root.$data.baseUrlApi.includes('local')) {
          return this.$root.$data.baseUrlApi;
      }
      return this.$root.$data.baseUrlApi.replace(/^http:\/\//i, 'https://');
  },
  },
  
  methods: {
    /**
     * Devuelve la URL de la api de deliverly concatenandole el metodo recibido por parametro.
     *
     * @param {String} method
     */
    apiUrl(method = "") {
      return `${this.baseUrlApi}/${method}`
    }
  }

})
  
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
