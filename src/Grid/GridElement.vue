<template>
  <div :style="styleObj" class="grid-element"></div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
    w: Number,
    h: Number
  },
  computed: {
    styleObj () {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: `${this.w}px`,
        height: `${this.h}px`
      }
    }
  }
}
</script>

<style>
.grid-element {
  position: absolute;
  background-color: red;
}
</style>
