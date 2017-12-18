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
    bus.$on('offsetChanged', this.onOffsetChanged)
    client.init()
  },
  methods: {
    onItemMoved (payload) {
      let data = { action: 'moved', payload }
      client.send(JSON.stringify(data))
    },
    onItemCreated (payload) {
      let data = { action: 'created', payload }
      client.send(JSON.stringify(data))
    },
    onOffsetChanged (payload) {
      let data = { action: 'offset', payload }
      client.send(JSON.stringify(data))
    }
  }
})
