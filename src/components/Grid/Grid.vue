<template>
  <div id="grid" ref="grid" :style="styleObj"
        @mouseup.prevent="onMouseUp($event)"
        @mousemove.prevent="onMouseMove($event)"
        @contextmenu.prevent="onContextMenu($event)"
        @click.prevent.stop="contextMenuOpen = false">
    <GridElement v-for="(item, index) in items" :key="index"
                 :item="item"
                 :offsetX="offsetX" :offsetY="offsetY"
                 @mousedown.left.native.prevent="onMouseDown($event, item)"
    ></GridElement>
    <CollisionIndicator v-for="(collisions, key) in collisionMap" :key="key"
                        :coordinates="key"
                        :collisions="collisions"
                        :offsetX="offsetX"
                        :offsetY="offsetY"
    ></CollisionIndicator>
    <div class="grid-element-preview"
         :style="previewStyleObj"
         v-show="dragging"></div>

    {{collisions}}

    <ContextMenu
      :x="contextMenuX"
      :y="contextMenuY"
      :item="contextMenuItem"
      v-if="contextMenuOpen"
    ></ContextMenu>
  </div>
</template>

<script>
import { throttle } from '../../js/util'
import GridElement from './GridElement.vue'
import CollisionIndicator from './CollisionIndicator.vue'

import ContextMenu from './ContextMenu.vue'

const GRID_W = 100
const GRID_H = GRID_W

export default {
  inject: ['bus', 'client'],
  provide: {
    GRID_W,
    GRID_H
  },
  components: { GridElement, CollisionIndicator, ContextMenu },
  props: {
    offsetX: Number,
    offsetY: Number
  },
  data () {
    return {
      elements: [],
      collisionMap: {},
      grid: {},
      selectedItem: {},
      dragging: false,
      newX: 0,
      newY: 0,
      contextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0,
      contextMenuItem: {}
    }
  },
  created () {
    if (this.client.socket.readyState !== 1) return
    this.client.registerEventListener('message', event => {
      this.elements = JSON.parse(event.data)
    })

    this.bus.$on('openContextMenu', position => {
      this.contextMenuOpen = true
      this.contextMenuX = position.x
      this.contextMenuY = position.y
      this.contextMenuItem = position.item
    })
  },
  mounted () {
    var grid = document.querySelector('#grid')
    this.grid = grid
  },
  computed: {
    collisions () {
      this.collisionMap = {}
      var collisionMap = this.collisionMap
      this.elements.forEach(e => {
        let x = e.x + this.offsetX
        let y = e.y + this.offsetY
        x = x < 0 ? 0 : x
        y = y < 0 ? 0 : y
        var key = x + ';' + y
        collisionMap[key] = (collisionMap[key] || 0) + 1
      })
    },
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
      var x = (this.newX) * GRID_W
      var y = (this.newY) * GRID_H
      return {
        left: `${x}px`,
        top: `${y}px`
      }
    }
  },
  methods: {
    moveItem (item, x, y) {
      let itemX = item.x
      let itemY = item.y
      item.x = x - this.offsetX
      item.y = y - this.offsetY
      if (itemX === item.x && itemY === item.y) return
      this.bus.$emit('itemMoved', item)
    },
    getCoordinates (event) {
      let cx = event.clientX - this.grid.offsetLeft
      let cy = event.clientY - this.grid.offsetTop

      var x = (Math.floor(cx / GRID_W))
      var y = Math.floor(cy / GRID_H)

      return {x, y}
    },
    onContextMenu (event) {
      let target = event.target
      if (!target || target.id !== 'grid') return
      let { x, y } = this.getCoordinates(event)
      let items = this.items
      var id = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0
      let item = {
        id: id + 1,
        x: x - this.offsetX,
        y: y - this.offsetY
      }
      this.elements.push(item)
      this.bus.$emit('itemCreated', item)
    },
    onMouseDown (event, item) {
      if (this.dragging) return
      this.dragging = true
      let { x, y } = this.getCoordinates(event)
      this.selectedItem = item
      this.newX = x
      this.newY = y
    },
    onMouseUp (event) {
      if (!this.dragging) return
      this.dragging = false
      let { x, y } = this.getCoordinates(event)
      this.moveItem(this.selectedItem, x, y)
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
  width: 2001px;
  height: 2001px;
  display: block;

  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
}

.grid-element-preview {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 100, 0.3);
  z-index: 1;
}
</style>
