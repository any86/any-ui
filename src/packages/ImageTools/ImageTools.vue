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
      <span class="button" @click="reset"><Icon value="refresh"></Icon></span>
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
      angle: 0,
      top: 0,
      left: 0
    };
  },

  mounted() {
    const overlayImageUrl = './static/C022.png';
    const overlayImage = new Image();
    overlayImage.src = overlayImageUrl;
    overlayImage.onload = () => {
      this.viewWidth = this.$refs.view.offsetWidth;
      this.canvas = new fabric.Canvas('c');
      this.canvas.setWidth(this.viewWidth);
      this.canvas.setHeight(this.viewWidth / overlayImage.width * overlayImage.height);

      fabric.Image.fromURL('./static/bg.jpg', (image) => {
        this.image = image;
        this.image.set({
          width: this.viewWidth,
          height: this.viewWidth / this.image.width * this.image.height,
          left: 0,
          top: 0,
          hasControls: false,
          centeredScaling: true,
        });
        this.canvas.add(image);
        this.canvas.setOverlayImage(overlayImageUrl, this.canvas.renderAll.bind(this.canvas), { width: this.viewWidth, height: this.viewWidth / overlayImage.width * overlayImage.height });
        this.canvas.renderAll();
      });
    };

    overlayImage.onerror = () => {
      this.$alert('网络问题, 请重试!');
    };
  },

  methods: {
    moveLeft() {
      this.left = this.image.getLeft();
      this.left -= 5;
      this.image.setLeft(this.left);
      this.canvas.renderAll();
    },

    moveRight() {
      this.left = this.image.getLeft();
      this.left += 5;
      this.image.setLeft(this.left);
      this.canvas.renderAll();
    },

    moveUp() {
      this.top = this.image.getTop();
      this.top -= 5;
      this.image.setTop(this.top);
      this.canvas.renderAll();
    },

    moveDown() {
      this.top = this.image.getTop();
      this.top += 5;
      this.image.setTop(this.top);
      this.canvas.renderAll();
    },

    rotateLeft() {
      this.angle -= 5;
      this.image.rotate(this.angle);
      this.canvas.renderAll();
      this.top = this.image.getTop();
      this.left = this.image.getLeft();

    },

    rotateRight() {
      this.angle += 5;
      this.image.rotate(this.angle);
      this.canvas.renderAll();
      this.top = this.image.getTop();
      this.left = this.image.getLeft();

    },

    addScale() {
      this.scale += 0.1;
      this.image.scale(this.scale);
      this.canvas.renderAll();
    },

    minusScale() {
      this.scale -= 0.1;
      this.image.scale(this.scale);
      this.canvas.renderAll();
    },

    reset() {
      this.top = 0;
      this.left = 0;
      this.angle = 0;
      this.scale = 1;
      this.image.set({
        top: this.top,
        left: this.left,
        angle: this.angle,
        scaleX: this.scale,
        scaleY: this.scale
      });
      this.canvas.renderAll();
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
