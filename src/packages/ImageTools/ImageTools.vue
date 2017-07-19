<template>
  <div class="component-image-tool">
    <div ref="view" class="view">
      <canvas id="c" style="display:block;"></canvas>
    </div>
    <!-- 工具条 -->
    <div class="tools-bar">
      <span class="button" @click="moveLeft"><Icon value="arrow-left"></Icon></span>
      <span class="button" @click="moveRight"><Icon value="arrow-right"></Icon></span>
      <span class="button" @click="moveUp"><Icon value="arrow-up"></Icon></span>
      <span class="button" @click="moveDown"><Icon value="arrow-down"></Icon></span>
      <span class="button" @click="minusScale"><Icon value="minus"></Icon></span>
      <span class="button" @click="addScale"><Icon value="plus"></Icon></span>
      <span class="button" @click="rotateLeft"><Icon value="rotate-left"></Icon></span>
      <span class="button" @click="rotateRight"><Icon value="rotate-right"></Icon></span>
      <span class="button" @click="refresh"><Icon value="refresh"></Icon></span>
    </div>
  </div>
</template>
<script>
import {
  fabric
} from 'fabric'
export default {
  name: 'ImageTool',

  props: {
    dataURL: {
      type: String
    },

    dataSource: {}
  },

  data() {
    return {
      viewWidth: 0,
      viewHeight: 0,
      canvas: null,
      image: null,
      dataUrl: null,
      scale: 1,
      rotate: 0,
      top: 0,
      left: 0
    };
  },

  mounted() {
    this.viewWidth = this.$refs.view.offsetWidth;
    this.canvas = new fabric.Canvas('c');
    this.canvas.setWidth(this.viewWidth);
    this.canvas.setHeight(this.viewWidth / 5 * 4);

    fabric.Image.fromURL('./static/bg.jpg', (image) => {
      this.image = image;

      this.image.set({
        width: this.viewWidth,
        height: this.viewWidth / this.image.width * this.image.height,
        left: 0,
        top: 0,
        hasControls: false,
        centeredScaling: true,
        // left: this.overlayData.x,
        // top: this.overlayData.y,
        // scaleX: this.overlayData.scale,
        // scaleY: this.overlayData.scale
      });
      this.canvas.add(image);
      this.canvas.setOverlayImage('./static/C022.png', this.canvas.renderAll.bind(this.canvas), { width: 381, height: 300 });
      this.canvas.renderAll();
    });
  },

  methods: {
    moveLeft() {

    },

    moveRight() {},

    moveUp() {

    },

    moveDown() {

    },

    rotateLeft() {

    },

    rotateRight() {

    },

    addScale() {

    },

    minusScale() {

    },

    refresh() {

    },

  },
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-image-tool {
  padding: $gutter*3 $gutter*3 0 $gutter*3;
  position: relative;
  overflow: hidden;
  background: #f7f8f9;
  width: 100%;
  >.view {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  >.tools-bar {
    padding: $gutter*2 0;
    display: flex;
    border-top: 1px solid $lighter;
    >.button {
      flex: 1;
      color: $dark;
      font-size: .4rem;
      text-align: center;
      &:active {
        color: $light;
      }
    }
  }
}

</style>
