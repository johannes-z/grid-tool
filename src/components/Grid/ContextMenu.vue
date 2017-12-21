<template>
  <div class="dropdown-menu" id="dropdown-menu" role="menu"
       :style="position" @click.stop>
    <div class="dropdown-content">
      <p class="menu-label">
        General
      </p>
      <a href="#" class="dropdown-item">
        <input class="input" type="text" placeholder="Token label"
               v-model.lazy="item.text">
      </a>

      <p class="menu-label">
        Actions
      </p>

      <a href="#" class="dropdown-item">
        Delete item
      </a>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['bus', 'GRID_W', 'GRID_H'],
  props: {
    x: Number,
    y: Number,
    item: Object
  },
  watch: {
    'item.text': function (newVal, oldVal) {
      this.bus.$emit('itemLabelChanged', this.item)
    }
  },
  computed: {
    position () {
      var x = this.x
      var y = this.y
      console.log({
        left: `${x + 1}px`,
        top: `${y + 1}px`
      })
      return {
        left: `${x + 1}px`,
        top: `${y + 1}px`
      }
    }
  }
}
</script>

<style scoped>
#dropdown-menu {
  position: absolute;
  display: block;
}
.menu-label {
  padding-left: 7px;
  margin-bottom: 0;
}
</style>
