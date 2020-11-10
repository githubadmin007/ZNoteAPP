<template>
  <div
    @contextmenu.prevent="contextmenu"
    @touchstart="TouchStart"
    @touchend="TouchEnd">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VEvent',
  data () {
    return {
      TouchTimeout: null, // 长按Timeout
      StartTouchEvent: null // 事件触发时自带的TouchEvent参数
    };
  },
  props: {
    presstime: {
      type: Number,
      default: 700
    }
  },
  methods: {
    TouchStart (evt) {
      this.StartTouchEvent = evt;
      this.TouchTimeout = setTimeout(() => {
        this.TouchTimeout = null;
        this.$emit('longpress', this.StartTouchEvent);
      }, this.touchtime);
      return false;
    },
    TouchEnd () {
      if (this.TouchTimeout) {
        clearTimeout(this.TouchTimeout);
        this.TouchTimeout = null;
      }
      return false;
    },
    contextmenu () {
      // this.$emit('longpress', this.TouchStartEvt);
      return false;
    }
  }
}
</script>
