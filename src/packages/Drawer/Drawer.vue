<template>
    <div class="component-drawer" :style="{height}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="scroll-body" :style="{transform: `translate3d(${touch.translateXNew}px, 0, 0)`, 'transition-duration': 2 == touch.status ? '200ms' : '0ms'}">
            <span class="side" ref="side">
                <slot name="side"></slot>
            </span>
            <main>
                <slot></slot>
                <VMask :animate="false" :fixed="false" :value="isShowMask"></VMask>
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
            default: 0
        },

        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
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
        touchStart(e) {
            this.touch.status = 0;
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;

        },

        touchMove(e) {
            this.touch.status = 1;
            this.touch.distanceX = e.touches[0].clientX - this.touch.startX;
            this.touch.distanceY = e.touches[0].clientY - this.touch.startY;

            const translateXNew = this.touch.translateXOld + this.touch.distanceX;

            if (this.sensitivity < Math.abs(this.touch.distanceX) - Math.abs(this.touch.distanceY)) {
                // 如果是关闭状态, 且是正向拖拽, 那么打开mask
                if(!this.value && 0 < this.touch.distanceX) {
                    this.isShowMask = true;
                }
                
                if (this.sideWidth >= translateXNew && 0 <= translateXNew) {
                    this.touch.translateXNew = translateXNew;
                } else if (this.sideWidth < translateXNew) {
                    this.touch.translateXNew = this.sideWidth;
                } else {
                    this.touch.translateXNew = 0;
                }

                // 如果X轴拖拽, 禁止页面滚动
                if (Math.abs(this.touch.distanceY) < Math.abs(this.touch.distanceX)) {
                    e.preventDefault();
                }
            }

        },

        touchEnd(e) {
            this.touch.status = 2;
            if (this.sensitivity < Math.abs(this.touch.distanceX) - Math.abs(this.touch.distanceY)) {
                // 侧边栏展开状态
                if (this.value) {
                    if (this.sideWidth * 0.2 < 0 - this.touch.distanceX) {
                        this.touch.translateXNew = 0;
                        this.isShowMask = false;
                        this.$emit('input', false);
                    } else {
                        this.touch.translateXNew = this.sideWidth;
                    }
                } else {
                    if (this.sideWidth * 0.2 < this.touch.distanceX) {
                        this.touch.translateXNew = this.sideWidth;
                        this.$emit('input', true);
                    } else {
                        this.touch.translateXNew = 0;
                    }
                }
                this.touch.translateXOld = this.touch.translateXNew;
            }

        },
    },

    watch: {

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
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            flex: 1 0 100%;
            min-width: 0;
            height: 100%;
        }
        .side {
            position: absolute;
            left: 0;
            top: 0;
            background: $background;
            display: block;
            overflow: hidden;
            max-width: 80%;
            height: 100%;
            transform: translateX(-100%);
        }
        // main {
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
