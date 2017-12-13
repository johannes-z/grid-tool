<template>
  <div :style="styleObj" class="grid-element"></div>
</template>

<script>
export default {
  inject: ['GRID_W', 'GRID_H'],
  props: {
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
      return {
        transform: `translate(${x + 1 + 5}px, ${y + 1 + 5}px)`,
        width: `${this.GRID_W - 10}px`,
        height: `${this.GRID_H - 10}px`
      }
    }
  }
}
</script>

<style>
.grid-element {
  position: absolute;
  background-color: black;
  cursor: move;
  border-radius: 50px;
}
</style>
