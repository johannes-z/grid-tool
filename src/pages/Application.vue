<template>
<div>
  <nav class="navbar" role="navigation" aria-label="dropdown navigation">
    <div class="navbar-item has-dropdown is-hoverable">
      <div class="control">
        <button class="button"
                @click.prevent.stop="move(-1, 0)">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button class="button"
                @click.prevent.stop="move(1, 0)">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
        <button class="button"
                @click.prevent.stop="move(0, -1)">
          <i class="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
        <button class="button"
                @click.prevent.stop="move(0, 1)">
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </nav>
  <Grid :offsetX="offsetX" :offsetY="offsetY"></Grid>
</div>
</template>

<script>
import Grid from '../components/Grid/Grid.vue'

export default {
  inject: ['bus', 'client'],
  components: { Grid },
  data () {
    return {
      offsetX: 0,
      offsetY: 0
    }
  },
  created () {
    if (this.client.socket.readyState !== 1) {
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    move (x, y) {
      this.offsetX += x
      this.offsetY += y
      this.bus.$emit('offsetChanged', {
        offsetX: this.offsetX,
        offsetY: this.offsetY
      })
    }
  }
}
</script>

<style>
body {
  margin: 5px;
}
</style>
