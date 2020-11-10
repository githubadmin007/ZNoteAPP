<template>
  <div class="v-context-menu" v-show="Visible">
    <div class="menu" ref="menu">
      <slot v-bind:data="data">VContextMenu</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VContextMenu',
  data () {
    return {
      Visible: false,
      data: null
    }
  },
  methods: {
    Show () {
      this.Visible = true;
    },
    Hide () {
      this.Visible = false;
    },
    SetData (data) {
      this.data = data;
    },
    SetPosition (x, y) {
      this.$refs.menu.style.left = x + 'px';
      this.$refs.menu.style.top = y + 'px';
    },
    ShowAt (x, y) {
      this.SetPosition(x, y);
      this.Show();
    }
  },
  mounted () {
    this.$nextTick(function () {
      document.addEventListener('click', this.Hide);
    });
  },
  beforeDestroy () {
    document.removeEventListener('click', this.Hide);
  }
}
</script>

<style scoped>
  .v-context-menu {
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: fixed;
    pointer-events: none;
  }
    .v-context-menu .menu {
      min-width: 100px;
      min-height: 100px;
      top: 0px;
      left: 0px;
      background-color: #fff;
      position: fixed;
      pointer-events: auto;
    }
</style>
