<template>
    <div class="component-image-tool">
        <div class="preview" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <div :class="['image', 2 != touch.status && 'transition']" :style="{transform: 'rotate('+rotate+'deg) scale(' + scale + ') translate3d(' + touch.x.translateNew + 'px, ' + touch.y.translateNew + 'px, 0)'}">
                <img src="../../assets/avator.jpeg">
            </div>
            <div class="mask"><img src="../../assets/C022.png"></div>
        </div>
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
export default {
    name: 'ImageTool',

    props: {
        value: {

        }
    },

    data() {
        return {
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

    methods: {
        moveLeft(){
            this.touch.x.translateNew-= 10;
            // this.touch.x.translateOld-= 10;

        },

        moveRight(){
            this.touch.x.translateNew+= 10;
        },

        moveUp(){
            this.touch.y.translateNew-= 10;
        },

        moveDown(){
            this.touch.y.translateNew+= 10;
        },

        rotateLeft(){
            this.rotate-= 10;
        },

        rotateRight(){
            this.rotate+= 10;
        },

        addScale(){
            this.scale = this.scale * 1.1;
        },

        minusScale(){
            this.scale = this.scale / 1.1;
        },

        refresh(){
            this.scale = 1;
            this.rotate = 0;
            this.touch.x.translateNew = 0;
            this.touch.y.translateNew = 0;
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
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-image-tool {
    padding: $gutter*3 $gutter*3 0 $gutter*3;
    box-sizing: border-box;
    position: relative;
    // background: $lightest;
    width: 100%;
    // box-shadow: $shadowUp $shadowDown;
    >.preview {
        position: relative;
        overflow: hidden;
        height: 5rem;
        width: 100%;
        >.image {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            >img {
                display: block;
                max-width: 100%;
            }
        }
        >.mask {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            >img {
                display: block;
                width: 100%;
            }
        }
    }
    >.tools-bar {
        padding: $gutter*2 0;
        box-sizing: border-box;
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
.transition {transition:all .3s;}
</style>
