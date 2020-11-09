import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Logout from '../views/auth/Logout.vue'

Vue.use(VueRouter)

  const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/logout', name: 'Logout', component: Logout }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
