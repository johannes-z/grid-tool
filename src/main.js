import Vue from 'vue'
import App from './App.vue'

import Client from './js/client'
const client = new Client()

var bus = new Vue({
  name: 'EventBus'
})

new Vue({
  provide: {
    bus
  },
  el: '#app',
  render: h => h(App),
  created () {
    bus.$on('itemMoved', this.onItemMoved)
    bus.$on('itemCreated', this.onItemCreated)
    client.init()
  },
  methods: {
    onItemMoved (item) {
      let data = { action: 'moved', item }
      client.send(JSON.stringify(data))
    },
    onItemCreated (item) {
      let data = { action: 'created', item }
      client.send(JSON.stringify(data))
    }
  }
})
