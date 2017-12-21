<template>
  <div :style="styleObj"
       class="grid-element"
       @contextmenu.prevent.stop="onContextMenu">
    <div class="token">{{ item.text || item.id }}</div>

    <span class="collision-marker" v-if="item.collisions > 1">
      {{ item.collisions }}
    </span>
  </div>
</template>

<script>
import ContextMenu from './ContextMenu.vue'

export default {
  inject: ['bus', 'GRID_W', 'GRID_H'],
  components: { ContextMenu },
  props: {
    item: Object,
    offsetX: Number,
    offsetY: Number
  },
  data () {
    return {
      contextMenuOpen: false
    }
  },
  computed: {
    x () {
      let x = this.item.x + this.offsetX
      return x < 0 ? 0 : x
    },
    y () {
      let y = this.item.y + this.offsetY
      return y < 0 ? 0 : y
    },
    styleObj () {
      var x = this.x * this.GRID_W
      var y = this.y * this.GRID_H

      var style = {
        transform: `translate(${x + 1}px, ${y + 1}px)`,
        width: `${this.GRID_W - 1}px`,
        height: `${this.GRID_H - 1}px`
      }
      return style
    }
  },
  methods: {
    onContextMenu () {
      this.bus.$emit('openContextMenu', {
        x: this.x * this.GRID_W,
        y: (this.y + 1) * this.GRID_H,
        item: this.item
      })
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
  margin: 7px;
  width: calc(100% - 14px);
  height: calc(100% - 14px);
  font-size: 11px;
  line-height: 11px;
  position: relative;
  background-color: black;

  display: flex;
  justify-content:center;
  align-content:center;
  flex-direction:column; /* column | row */

  text-align: center;
  color: white;
  font-family: Consolar, Courier New, Courier, monospace;

  white-space: pre-wrap;      /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap;     /* Opera <7 */
  white-space: -o-pre-wrap;   /* Opera 7 */
  word-wrap: break-word;      /* IE */

  overflow: hidden;
  vertical-align: middle;
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
