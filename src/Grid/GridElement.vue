<template>
  <div :style="styleObj" class="grid-element">
    <div class="token"></div>

    <span style="position: absolute; left: 0; top: 0; line-height: 12px; font-size: 12px;" v-if="collisions">{{ collisions }}</span>
  </div>
</template>

<script>
export default {
  inject: ['GRID_W', 'GRID_H'],
  props: {
    collisions: Number,
    x: Number,
    y: Number,
    w: {
      type: Number,
      default: this.GRID_W
    },
    h: {
      type: Number,
      default: this.GRID_H
    },
    offsetX: Number,
    offsetY: Number
  },
  computed: {
    styleObj () {
      var x = (this.x + this.offsetX) * this.GRID_W
      var y = (this.y + this.offsetY) * this.GRID_H
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
}
.token {
  margin: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  position: relative;
  background-color: black;
  border-radius: 50px;
  display: inline-block;
}
</style>
