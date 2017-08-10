<template>
    <div class="component-image-tool">
        <div ref="view" class="view">
            <canvas ref="canvas" style="display:block;"></canvas>
            <v-spinner v-show="isLoadingImg" class="spinner"></v-spinner>
        </div>
    
        <!-- 工具条 -->
        <div class="tools-bar">
            <span class="button" @click="moveLeft">
                <Icon value="arrow-left"></Icon>
            </span>
            <span class="button" @click="moveRight">
                <Icon value="arrow-right"></Icon>
            </span>
            <span class="button" @click="moveUp">
                <Icon value="arrow-up"></Icon>
            </span>
            <span class="button" @click="moveDown">
                <Icon value="arrow-down"></Icon>
            </span>
            <span class="button" @click="minusScale">
                <Icon value="minus"></Icon>
            </span>
            <span class="button" @click="addScale">
                <Icon value="plus"></Icon>
            </span>
            <span class="button" @click="rotateLeft">
                <Icon value="rotate-left"></Icon>
            </span>
            <span class="button" @click="rotateRight">
                <Icon value="rotate-right"></Icon>
            </span>
            <span class="button" @click="reset">
                <Icon value="refresh"></Icon>
            </span>
        </div>
    </div>
</template>
<script>
import {
    fabric
} from 'fabric'
import VSpinner from '@/packages/Spinner/Spinner'
export default {
    name: 'ImageTool',

    props: {
        dataURL: {
            type: String
        },

        status: {
            type: String,
        },

        dataSource: {},

    },

    data() {
        return {
            isLoadingImg: true,
            // demoImgUrl: 'https://static.soufeel.com/skin/frontend/smartwave/default/exclusive/images/base/C046-1.png',
            // frameImgUrl: 'https://static.soufeel.com/skin/frontend/smartwave/default/exclusive/images/base/C046.png',
            // 需要支持跨域
            demoImgUrl: './static/C046-1.png',
            frameImgUrl: './static/C046.png',
            uploadImg: null,
            demoImg: null,
            viewWidth: 0,
            viewHeight: 0,
            canvas: null,
            parameter: {
                scale: 1,
                angle: 0,
                top: 0,
                left: 0
            }
        };
    },

    async mounted() {
        // 暂时不知道为什么谷歌移动端测试下不响应touch
        // *************************************
        this.viewWidth = this.$refs.view.offsetWidth;
        // 生成一个画布
        this.canvas = new fabric.Canvas(this.$refs.canvas);

        this.canvas.centeredRotation = true;
        this.canvas.centeredScaling = true;
        // this.demoImgUrl = './static/cd.jpg'
        this.demoImg = await this.loadImage(this.demoImgUrl);
        this.canvas.setWidth(this.viewWidth);
        this.canvas.setHeight(this.viewWidth / this.demoImg.width * this.demoImg.height);
        // 加载示例图片
        this.canvas.add(this.demoImg);
        this.canvas.renderAll();

        this.parameter.scale = this.demoImg.getScaleX();
    },

    methods: {
        /**
         * 读取产品图片
         * 调成图片宽度自适应宽度
         */
        loadImage(url) {
            this.isLoadingImg = true;
            return new Promise((resolve, reject) => {
                fabric.Image.fromURL(url, (image, error) => {
                    if (error) {
                        reject();
                    } else {
                        image.scaleToWidth(this.viewWidth);
                        this.isLoadingImg = false;
                        resolve(image);
                    }
                }, { crossOrigin: 'anonymous' });
            });
        },

        moveLeft() {
            this.parameter.left = this.uploadImg.getLeft();
            this.parameter.left -= 5;
            this.uploadImg.setLeft(this.parameter.left);
            this.canvas.renderAll();
        },

        moveRight() {
            this.parameter.left = this.uploadImg.getLeft();
            this.parameter.left += 5;
            this.uploadImg.setLeft(this.parameter.left);
            this.canvas.renderAll();
        },

        moveUp() {
            this.parameter.top = this.uploadImg.getTop();
            this.parameter.top -= 5;
            this.uploadImg.setTop(this.parameter.top);
            this.canvas.renderAll();
        },

        moveDown() {
            this.parameter.top = this.uploadImg.getTop();
            this.parameter.top += 5;
            this.uploadImg.setTop(this.parameter.top);
            this.canvas.renderAll();
        },

        rotateLeft() {
            this.parameter.angle -= 5;
            this.uploadImg.rotate(this.parameter.angle);
            this.canvas.renderAll();
            this.parameter.top = this.uploadImg.getTop();
            this.parameter.left = this.uploadImg.getLeft();

        },

        rotateRight() {
            this.parameter.angle += 5;
            this.uploadImg.rotate(this.parameter.angle);
            this.canvas.renderAll();
            this.parameter.top = this.uploadImg.getTop();
            this.parameter.left = this.uploadImg.getLeft();

        },

        addScale() {
            this.parameter.scale = this.uploadImg.getScaleX() + 0.01;
            this.uploadImg.scale(this.parameter.scale);
            this.canvas.renderAll();
        },

        minusScale() {
            this.parameter.scale = this.uploadImg.getScaleX() - 0.01;
            this.uploadImg.scale(this.parameter.scale);
            this.canvas.renderAll();
        },

        reset() {
            this.parameter.top = 0;
            this.parameter.left = 0;
            this.parameter.angle = 0;
            this.uploadImg.scaleToWidth(this.viewWidth).set({
                top: this.parameter.top,
                left: this.parameter.left,
                angle: this.parameter.angle,
            });
            this.canvas.renderAll();
        },
    },

    watch: {
        async dataURL(value) {
            if ('' != value) {
                this.$emit('update:status', 'uploading');
                // 删除实例图片
                // 同时清空每次的合成图
                this.canvas.clear();

                this.uploadImg = await this.loadImage(value);
                const frameImage = await this.loadImage(this.frameImgUrl);
                this.canvas.add(this.uploadImg).setActiveObject(this.uploadImg);
                this.canvas.setOverlayImage(frameImage, this.canvas.renderAll.bind(this.canvas));
                // this.canvas.setOverlayImage(frameImage, this.canvas.renderAll.bind(this.canvas), { width: this.viewWidth, height: this.viewWidth });
                this.canvas.renderAll();
                this.$emit('update:status', 'done');

                // 图片需要支持跨域
                // this.$emit('done', this.canvas.toDataURL());
            }
        }
    },

    components: { VSpinner }
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

    .spinner {
        z-index: 10;
        position: absolute;
        top: 30%;
        right: 0;
        left: 0;
        margin: auto;
    }


    >.view {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 5.5rem;
    }
    >.tools-bar {
        padding: $gutter*2 0;
        display: flex;
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
