<template>
<div>
  <nav class="navbar" role="navigation" aria-label="dropdown navigation">
    <div class="navbar-item has-dropdown is-hoverable">
  <div class="control">
    <button class="button is-text" @click.prevent.stop="move(-1, 0)">move left</button>
    <button class="button is-text" @click.prevent.stop="move(1, 0)">move right</button>
    <button class="button is-text" @click.prevent.stop="move(0, -1)">move up</button>
    <button class="button is-text" @click.prevent.stop="move(0, 1)">move down</button>
  </div>
    </div>
  </nav>
  <Grid :offsetX="offsetX" :offsetY="offsetY"></Grid>
</div>
</template>

<script>
import Grid from './Grid/Grid.vue'

export default {
  components: { Grid },
  data () {
    return {
      offsetX: 0,
      offsetY: 0
    }
  },
  methods: {
    move (x, y) {
      this.offsetX += x
      this.offsetY += y
    }
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 5px;
}
</style>
