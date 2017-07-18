<template>
    <div class="component-image-tool">
        <div class="view" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <img :class="['upload-image', 2 != touch.status && 'transition']"  width="100%" v-if="null != dataURL" :src="dataURL" :style="{transform: `translate3d(${touch.x.translateNew}px, ${touch.y.translateNew}px, 0) scale(${scale}) rotate(${rotate}deg)`}">
            <div class="overlay"><img src="../../assets/C022.png"></div>
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
import FileAPI from 'fileapi'
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
            dataUrl: null,
            scale: 1,
            rotate: 0,
            touch: {
                status: 0,
                x: {
                    start: 0,
                    current: 0,
                    distance: 0,
                    translateOld: 0,
                    translateNew: 0,
                },
                y: {
                    start: 0,
                    current: 0,
                    distance: 0,
                    translateOld: 0,
                    translateNew: 0,
                }
            }
        };
    },

    mounted() {
    },

    methods: {
        moveLeft() {
            this.touch.x.translateNew -= 5;
            this._emit();
        },

        moveRight() {
            this.touch.x.translateNew += 5;
            this._emit();
        },

        moveUp() {
            this.touch.y.translateNew -= 5;
            this._emit();
        },

        moveDown() {
            this.touch.y.translateNew += 5;
            this._emit();
        },

        rotateLeft() {
            this.rotate -= 5;
            this._emit();
        },

        rotateRight() {
            this.rotate += 5;
            this._emit();
        },

        addScale() {
            this.scale = (this.scale * 10 + 1) / 10;
            this._emit();
        },

        minusScale() {
            this.scale = (this.scale * 10 - 1) / 10;
            this._emit();
        },

        refresh() {
            this.scale = 1;
            this.rotate = 0;
            this.touch.x.translateNew = 0;
            this.touch.y.translateNew = 0;
            this._emit();
        },

        touchStart(e) {
            // 同步工具栏操作的位移
            this.touch.x.translateOld = this.touch.x.translateNew;
            this.touch.y.translateOld = this.touch.y.translateNew;
            // 初始化其他一些标记
            this.touch.status = 1;
            this.touch.x.start = e.touches[0].clientX;
            this.touch.y.start = e.touches[0].clientY;

        },

        touchMove(e) {
            this.touch.status = 2;
            this.touch.x.current = e.touches[0].clientX;
            this.touch.y.current = e.touches[0].clientY;
            this.touch.x.distance = this.touch.x.current - this.touch.x.start;
            this.touch.y.distance = this.touch.y.current - this.touch.y.start;

            this.touch.x.translateNew = this.touch.x.translateOld + this.touch.x.distance;
            this.touch.y.translateNew = this.touch.y.translateOld + this.touch.y.distance;
            // 阻止拖拽时候滚动条晃动
            e.preventDefault();
            e.stopPropagation();
        },

        touchEnd(e) {
            this.touch.status = 3;
            this.touch.x.translateOld = this.touch.x.translateNew;
            this.touch.y.translateOld = this.touch.y.translateNew;
            this._emit();
        },

        _emit() {
            this.$emit('change', {
                top: this.touch.y.translateNew,
                left: this.touch.x.translateNew,
                rotate: this.rotate,
                scale: this.scale
            });
        },
    },

    watch: {
        file(file) {
            // this.refresh();
            // 转换上传的图片为base64, 方便预览拖拽
            if (null != file) {
                FileAPI.readAsDataURL(file, evt => {
                    if (evt.type == 'load') {
                        // Success
                        var dataURL = evt.result;
                        this.dataUrl = dataURL;
                    } else if (evt.type == 'progress') {
                        var pr = evt.loaded / evt.total * 100;
                    } else {
                        // Error
                    }
                })
            }
        }
    }
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
        >.upload-image {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            // transform-origin: center center 0px;
            >img {
                display: block;
                max-width: 100%;
            }
        }
        >.overlay {
            opacity: 0;
            position: relative;
            z-index: 2;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            >img {
                display: block;
                width: 100%;
            }
        }
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

.transition {
    transition: all .3s;
}
</style>
