<template>
  <div id="grid" ref="grid" :style="styleObj"
        @mouseup.prevent="onMouseUp($event)"
        @mousemove.prevent="onMouseMove($event)">
    <GridElement v-for="(item, index) in items" :key="index"
                  :x="item.x" :y="item.y"
                  :offsetX="offsetX" :offsetY="offsetY"
                  :collisions="item.collisions"
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
      collisionMap: {},
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
      this.collisionMap = {}
      var collisionMap = this.collisionMap
      this.elements.forEach(e => {
        let x = e.x + this.offsetX
        let y = e.y + this.offsetY
        x = x < 0 ? 0 : x
        y = y < 0 ? 0 : y
        var key = x + ';' + y
        collisionMap[key] = (collisionMap[key] || 0) + 1
        e.collisions = collisionMap[key]
      })
      return this.elements
    },
    styleObj () {
      return {
        'background-size': `${GRID_W}px ${GRID_H}px`,
        'background-position': `0 0, ${GRID_W}px 0, ${GRID_W}px -${GRID_W}px, 0px ${GRID_W}px`
      }
    },
    previewStyleObj () {
      var x = (this.newX) * GRID_W
      var y = (this.newY) * GRID_H
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
      if (this.dragging) return
      this.dragging = true
      this.selectedItem = item
      this.newX = item.x + this.offsetX
      this.newY = item.y + this.offsetY
    },
    onMouseUp (event) {
      if (!this.dragging) return
      this.dragging = false
      let { x, y } = this.getCoordinates(event)
      var item = this.selectedItem
      item.x = x - this.offsetX
      item.y = y - this.offsetY
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
