<template>
  <div id="app" :style="styleObj">
    <GridElement v-for="(item, index) in items" :key="index"
                 :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                 draggable="true"
                 @drag.native.prevent="onDrag($event, item)"
                 @dragend.native.prevent="onDragEnd($event, item)"
                 @dragstart.native="onDragStart($event, item)"
    ></GridElement>
    <div class="grid-element-preview" :style="previewStyleObj" v-show="dragging"></div>
  </div>
</template>

<script>
import GridElement from './Grid/GridElement.vue'

const GRID_W = 50
const GRID_H = GRID_W

var elements = [
  { x: 2, y: 5 },
  { x: 2, y: 2 },
  { x: 0, y: 2 }
]

var items = elements.map(i => ({
  x: i.x * GRID_W,
  y: i.y * GRID_H,
  w: GRID_W,
  h: GRID_H
}))

function throttle (callback, limit) {
  var wait = false
  return function () {
    if (!wait) {
      callback.apply(null, arguments)
      wait = true
      setTimeout(function () {
        wait = false
      }, limit)
    }
  }
}

export default {
  components: { GridElement },
  data () {
    return {
      items,
      dragging: false,
      newX: 0,
      newY: 0
    }
  },
  computed: {
    styleObj () {
      return {
        'background-size': `${GRID_W * 2}px ${GRID_H * 2}px`,
        'background-position': `0 0, ${GRID_W}px 0, ${GRID_W}px -${GRID_W}px, 0px ${GRID_W}px`
      }
    },
    previewStyleObj () {
      var x = this.newX
      var y = this.newY
      return {
        left: `${x}px`,
        top: `${y}px`
      }
    }
  },
  methods: {
    getCoordinates (event) {
      console.log(event)
      let cx = event.clientX
      let cy = event.clientY

      var x = Math.floor(cx / GRID_W) * GRID_W
      var y = Math.floor(cy / GRID_H) * GRID_H

      return {x, y}
    },
    onDragStart (event, item) {
      this.dragging = true
      event.dataTransfer.setData('text/plain', '1')
      console.log('onDragStart')
    },
    onDrag (event, item) {
      console.log('...')
      let { x, y } = this.getCoordinates(event)
      if (this.newX === x && this.newY === y) return
      this.currentItem = item
      this.newX = x
      this.newY = y
    },
    onDragEnd (event, item) {
      this.dragging = false
      console.log('onDragEnd')
      let { x, y } = this.getCoordinates(event)
      console.log(x, y)

      item.x = x
      item.y = y
    }
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 5px;
}
#app {
  position: relative;
  width: 2000px;
  height: 2000px;
  display: inline-block;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(135deg, transparent 75%, #ccc 75%);
}
.grid-element-preview {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 0, 0, 0.5);
}
</style>
