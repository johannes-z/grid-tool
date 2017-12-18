import Vue from 'vue'

import router from './router'

import App from './App.vue'

var bus = new Vue({
  name: 'EventBus'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  provide: { bus },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
