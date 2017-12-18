<template>
  <router-view></router-view>
</template>

<script>
import Client from './js/client'
const client = new Client()

export default {
  inject: ['bus'],
  provide: {
    client
  },
  created () {
    this.bus.$on('itemMoved', this.onItemMoved)
    this.bus.$on('itemCreated', this.onItemCreated)
    this.bus.$on('offsetChanged', this.onOffsetChanged)
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
}
</script>
