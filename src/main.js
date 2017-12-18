import Vue from 'vue'

import router from './router'

import App from './App.vue'

var bus = new Vue({
  name: 'EventBus'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  provide: {
    bus
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// new Vue({
//   provide: {
//     bus
//   },
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App },
//   created () {
//     bus.$on('itemMoved', this.onItemMoved)
//     bus.$on('itemCreated', this.onItemCreated)
//     bus.$on('offsetChanged', this.onOffsetChanged)
//     client.init()
//   },
//   methods: {
//     onItemMoved (payload) {
//       let data = { action: 'moved', payload }
//       client.send(JSON.stringify(data))
//     },
//     onItemCreated (payload) {
//       let data = { action: 'created', payload }
//       client.send(JSON.stringify(data))
//     },
//     onOffsetChanged (payload) {
//       let data = { action: 'offset', payload }
//       client.send(JSON.stringify(data))
//     }
//   }
// })
