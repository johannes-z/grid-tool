<template>
  <div :style="styleObj"
       class="grid-element">
    <div class="token">{{ text }}</div>

    <span class="collision-marker" v-if="item.collisions > 1">
      {{ item.collisions }}
    </span>
  </div>
</template>

<script>
export default {
  inject: ['GRID_W', 'GRID_H'],
  props: {
    item: Object,
    offsetX: Number,
    offsetY: Number
  },
  data () {
    return { text: 'S#1' }
  },
  computed: {
    styleObj () {
      var x = (this.item.x + this.offsetX) * this.GRID_W
      var y = (this.item.y + this.offsetY) * this.GRID_H
      if (x < 0) {
        x = 0
      }
      if (y < 0) {
        y = 0
      }
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
.grid-element {
  position: absolute;
  cursor: move;
  z-index: 2;
}
.token {
  margin: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  font-size: 14px;
  line-height: 28px;
  position: relative;
  background-color: black;
  display: inline-block;
  text-align: center;
  color: white;
  font-family: Consolar, Courier New, Courier, monospace;
}
.collision-marker {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 12px;
  font-size: 12px;
  background-color: white;
}
</style>
