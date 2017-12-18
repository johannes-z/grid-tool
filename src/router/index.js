import Vue from 'vue'
import Router from 'vue-router'

import Application from '../pages/Application'
import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/app',
      name: 'app',
      component: Application
    }
  ]
})
