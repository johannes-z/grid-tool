<template>
  <router-view></router-view>
</template>

<script>
import Client from './client'
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
    this.bus.$on('itemLabelChanged', this.itemLabelChanged)
  },
  methods: {
    send (action, payload) {
      let data = { action, payload }
      client.send(JSON.stringify(data))
    },
    onItemMoved (payload) {
      this.send('moved', payload)
    },
    onItemCreated (payload) {
      this.send('created', payload)
    },
    onOffsetChanged (payload) {
      this.send('offset', payload)
    },
    itemLabelChanged (payload) {
      this.send('label', payload)
    }
  }
}
</script>
