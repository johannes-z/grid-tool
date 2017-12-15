import Vue from 'vue'
import App from './App.vue'

import Client from './js/client'
const client = new Client()

new Vue({
  el: '#app',
  render: h => h(App),
  created () {
    client.init()
  }
})
