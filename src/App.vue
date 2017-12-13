<template>
  <div id="app" :style="styleObj">
    <GridElement v-for="(item, index) in items" :key="index"
                 :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                 draggable="true"
                 @drag.native="onDrag($event, item)"
                 @dragend.native.prevent="onDragEnd($event, item)"
                 @drop.native.prevent="onDrop"
    ></GridElement>
  </div>
</template>

<script>
import GridElement from './Grid/GridElement.vue'

const GRID_W = 50
const GRID_H = GRID_W

var items = [
  { x: 2, y: 5 },
  { x: 2, y: 2 },
  { x: 0, y: 2 }
]

export default {
  components: { GridElement },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    styleObj () {
      return {
        'background-size': `${GRID_W * 2}px ${GRID_H * 2}px`,
        'background-position': `0 0, ${GRID_W}px 0, ${GRID_W}px -${GRID_W}px, 0px ${GRID_W}px`
      }
    },
    items () {
      var elements = items.map(i => ({
        x: i.x * GRID_W,
        y: i.y * GRID_H,
        w: GRID_W,
        h: GRID_H
      }))
      console.log(elements)
      return elements
    }
  },
  methods: {
    onDrag (event, item) {
      // console.log()
    },
    onDrop (event) {
      console.log(event)
    },
    onDragEnd (event, item) {
      console.log(event)
      let cx = event.clientX
      let cy = event.clientY
      console.log(item)
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
</style>
