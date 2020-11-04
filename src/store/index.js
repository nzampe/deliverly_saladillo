import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import User from '../entities/User'
import jwtDecode from "jwt-decode";

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.$cookies.config('7d')
axios.defaults.baseURL = process.env.VUE_APP_ROUTE_API;


export default new Vuex.Store({
    state: {
        token: Vue.$cookies.isKey('token') ? Vue.$cookies.get('token') : null,
        user: null,
        orders: []
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        },
        orders(state) {
            return state.orders
        }
    },
    mutations: {
        retriveToken(state, token) {
            //seteo el token 
            state.token = token;
            //seteo el user logueado
            let decode = jwtDecode(token);
            state.user = new User(decode.username, decode.roles);

        },
        destroyToken(state) {
            state.token = null;
        },

        setOrders(state, orders) {
            state.orders = orders
        }

    },
    actions: {
        retriveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('login_check', {
                        _username: credentials.username,
                        _password: credentials.password
                    })
                    .then(response => {
                        const token = response.data.token;
                        Vue.$cookies.set('token', token)
                            //seteo los hedears del axios
                        context.commit('retriveToken', token);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context) {
            if (context.getters.loggedIn) {
                Vue.$cookies.remove('token')
                context.commit('destroyToken');
            }
        },
        tokenExpired(context, error) {
            // if (error.data.code == '401' && error.data.message == "Expired JWT Token") {
            //     Vue.$cookies.remove('token')
            //     context.commit('destroyToken');
            // }

            return new Promise((resolve, reject) => {
                if (error.data.code == '401' && error.data.message == "Expired JWT Token") {
                    Vue.$cookies.remove('token')
                    context.commit('destroyToken');
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        }
    },
    modules: {}
})