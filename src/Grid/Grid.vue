<template>
  <div id="grid" ref="grid" :style="styleObj"
        @mouseup.prevent="onMouseUp($event)"
        @mousemove.prevent="onMouseMove($event)">
    <GridElement v-for="(item, index) in items" :key="index"
                  :x="item.x" :y="item.y"
                  :offsetX="offsetX" :offsetY="offsetY"
                  @mousedown.native.prevent="onMouseDown($event, item)"
    ></GridElement>
    <div class="grid-element-preview" :style="previewStyleObj" v-show="dragging"></div>
  </div>


</template>

<script>
import { throttle } from '../js/util'
import GridElement from './GridElement.vue'

const GRID_W = 50
const GRID_H = GRID_W

export default {
  provide: {
    GRID_W,
    GRID_H
  },
  components: { GridElement },
  props: {
    offsetX: Number,
    offsetY: Number
  },
  data () {
    return {
      elements: [
        { x: 2, y: 5 },
        { x: 2, y: 2 },
        { x: 0, y: 2 }
      ],
      grid: {},
      selectedItem: {},
      dragging: false,
      newX: 0,
      newY: 0
    }
  },
  mounted () {
    var grid = document.querySelector('#grid')
    this.grid = grid
  },
  computed: {
    items () {
      return this.elements
    },
    styleObj () {
      return {
        'background-size': `${GRID_W}px ${GRID_H}px`,
        'background-position': `0 0, ${GRID_W}px 0, ${GRID_W}px -${GRID_W}px, 0px ${GRID_W}px`
      }
    },
    previewStyleObj () {
      var x = this.newX * GRID_W
      var y = this.newY * GRID_H
      return {
        left: `${x}px`,
        top: `${y}px`
      }
    }
  },
  methods: {
    getCoordinates (event) {
      let cx = event.clientX - this.grid.offsetLeft
      let cy = event.clientY - this.grid.offsetTop

      var x = (Math.floor(cx / GRID_W))
      var y = Math.floor(cy / GRID_H)

      return {x, y}
    },
    onMouseDown (event, item) {
      this.dragging = true
      this.selectedItem = item
      this.newX = item.x
      this.newY = item.y
    },
    onMouseUp (event) {
      this.dragging = false
      var item = this.selectedItem
      item.x = this.newX
      item.y = this.newY
    },
    onMouseMove: throttle(function (event) {
      if (!this.dragging) return
      let { x, y } = this.getCoordinates(event)
      this.newX = x
      this.newY = y
    }, 16)
  }

}
</script>

<style>
#grid {
  position: relative;
  width: 2000px;
  height: 2000px;
  display: inline-block;

  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
}

.grid-element-preview {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 0, 0, 0.3);
}
</style>
