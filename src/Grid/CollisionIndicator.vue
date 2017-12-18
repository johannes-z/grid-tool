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
      x: -1,
      y: -1
    }
  },
  created () {
    let [x, y] = this.coordinates.split(';').map(c => Number(c))
    this.x = x
    this.y = y
  },
  computed: {
    position () {
      var x = (this.x + this.offsetX) * this.GRID_W
      var y = (this.y + this.offsetY) * this.GRID_H
      var style = {
        transform: `translate(${x + 1}px, ${y + 1}px)`,
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
