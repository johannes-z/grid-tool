<template>
  <span class="collision-marker"
        :style="position"
        v-if="collisions > 1 ">
    {{ collisions }}
  </span>
</template>

<script>
export default {
  inject: ['GRID_W', 'GRID_H'],
  props: {
    coordinates: String,
    collisions: Number,
    offsetX: Number,
    offsetY: Number
  },
  data () {
    return {
      x: 0,
      y: 0
    }
  },
  created () {
    let [x, y] = this.coordinates.split(';').map(Number)
    this.x = x
    this.y = y
  },
  computed: {
    position () {
      var x = (this.x + this.offsetX)
      var y = (this.y + this.offsetY)
      x = x < 0 ? 0 : x
      y = y < 0 ? 0 : y
      var style = {
        transform: `translate(${x * this.GRID_W + 1}px, ${y * this.GRID_H + 1}px)`,
        width: `${this.GRID_W - 1}px`,
        height: `${this.GRID_H - 1}px`
      }
      return style
    }
  }
}
</script>

<style>
.collision-marker {
  position: absolute;
  line-height: 12px;
  font-size: 12px;
  background-color: white;
}
</style>
