<template>
  <div class="component-drawer" :style="{height}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="scroll-body" :style="{transform: `translate3d(${touch.translateXNew}px, 0, 0)`, 'transition-duration': 1 != touch.status ? '300ms' : '0ms'}">
      <span class="side" ref="side">
        <slot name="side"></slot>
      </span>
      <main>
        <slot></slot>
        <VMask :fixed="false" :value="isShowMask" @touchstart.native="close"></VMask>
      </main>
    </div>
  </div>
</template>
<script>
import VMask from '@/packages/Dialog/Mask'
export default {
  name: 'Drawer',

  props: {
    height: {
      default: '100%'
    },

    sensitivity: {
      type: Number,
      default: 30
    },

    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isFromEdge: false,
      isShowMask: false,
      screenHeight: -1,
      sideWidth: -1,
      touch: {
        status: 0,
        startX: 0,
        translateXOld: 0,
        translateXNew: 0,
        distanceX: 0,
        distanceY: 0,
      }
    };
  },

  mounted() {
    this.screenHeight = window.screen.height;
    this.sideWidth = this.$refs.side.offsetWidth;
  },

  methods: {
    touchstart(e) {
      this.touch.status = 0;
      this.touch.startX = e.touches[0].clientX;
      this.touch.startY = e.touches[0].clientY;
      // 判断是否从边缘开始拖拽
      this.isFromEdge = 100 > this.touch.startX || this.sideWidth - 100 < this.touch.startX;
    },

    touchmove(e) {
      if (this.isFromEdge) {
        this.touch.status = 1;
        this.touch.distanceX = e.touches[0].clientX - this.touch.startX;
        this.touch.distanceY = e.touches[0].clientY - this.touch.startY;
        // 关闭状态 && 正向拖拽
        if (!this.value && 0 < this.touch.distanceX) {
          // 新位置
          const translateXNew = this.touch.translateXOld + this.touch.distanceX;
          // 如果X轴拖拽, 或者打开状态,  禁止页面滚动
          if (this.sensitivity < Math.abs(this.touch.distanceX) - Math.abs(this.touch.distanceY) || this.value) {
            this.isShowMask = true;
            // 合法范围内
            if (this.sideWidth >= translateXNew && 0 <= translateXNew) {
              this.touch.translateXNew = translateXNew;
              // 超过最大距离
            } else if (this.sideWidth < translateXNew) {
              this.touch.translateXNew = this.sideWidth;
              // 反向超过最小距离
            } else {
              this.touch.translateXNew = 0;
            }
            e.preventDefault();
          }
        }
      }
    },

    touchend(e) {
      if (this.isFromEdge) {
        this.touch.status = 2;
        if (this.sideWidth * 0.2 < this.touch.translateXNew && !this.value) {
          this.$emit('input', true);
        } else {
          this.$emit('input', false);
        }
        this.touch.translateXOld = this.touch.translateXNew;
      }
    },

    close() {
      this.isShowMask = false;
      this.touch.translateXNew = 0;
      this.$emit('input', false);
    },
  },

  watch: {
    value(value) {
      syslog(value)
      if (value) {
        this.isShowMask = true;
        this.touch.translateXNew = this.sideWidth;
      } else {
        this.isShowMask = false;
        this.touch.translateXNew = 0;
      }
    }
  },

  components: {
    VMask
  }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-drawer {
  position: relative;
  overflow: hidden;
  .scroll-body {
    position: relative;
    display: flex;
    height: 100%;
    transition-duration: 0ms;
    transition-timing-function: ease-in-out;
    transition-property: transform;
    main {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      flex: 1 0 100%;
      min-width: 0;
      height: 100%;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      overflow: hidden;
    }
    .side {
      position: absolute;
      z-index: $drawerZIndex;
      left: 0;
      top: 0;
      background: $background;
      display: block;
      overflow: hidden;
      max-width: 80%;
      height: 100%;
      transform: translateX(-100%) scale(1);
    } // main {
    //     position: relative;
    //     padding: 0;
    //     flex: 1 0 100%;
    //     min-width: 0;
    // }
    // aside {
    //     position: absolute;
    //     right: 0;
    //     top: 0;
    //     background: $base;
    //     display: block;
    //     transform: translateX(100%);
    // }
  }
}
</style>
