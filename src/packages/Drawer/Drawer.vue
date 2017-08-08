<template>
    <div class="component-drawer" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
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
import VMask from '@/packages/Dialog/Mask';
export default {
    name: 'Drawer',

    props: {
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
            isShowMask: false,
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

    methods: {
        /**
         * 触摸屏幕
         */
        touchstart(e) {
            this.touch.status = 0;
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;

        },
        /**
         * 开始滑动
         */
        touchmove(e) {
            // 触碰起点只能是边缘内的才能拖拽
            if (this.isFromEdge) {
                this.touch.status = 1;
                this.touch.distanceX = e.touches[0].clientX - this.touch.startX;
                this.touch.distanceY = e.touches[0].clientY - this.touch.startY;
                // 计算抽屉的宽度, 即可滑动的最大距离
                this.sideWidth = this.$refs.side.offsetWidth;
                // 关闭状态 && 正向(→)拖拽
                // 那么拉出抽屉
                if (!this.value && 0 < this.touch.distanceX) {
                    // 当前抽屉的滑动距离
                    var translateXNew = this.touch.translateXOld + this.touch.distanceX;
                    // 如果超过阈值
                    // 如果X轴拖拽
                    // 那么禁止页面滚动
                    if (this.sensitivity < Math.abs(this.touch.distanceX) && this.isMoveAlongX) {
                        // 关闭Mask
                        this.isShowMask = true;
                        // 位移要减去阈值
                        translateXNew -= this.sensitivity;
                        // 边界判断
                        // 如果合理范围, 移动
                        // 如果超过side的宽度, 停止移动
                        // 如果反向超过最小距离, 停止移动
                        if (this.sideWidth >= translateXNew && 0 <= translateXNew) {
                            this.touch.translateXNew = translateXNew;
                            // 超过最大距离
                        } else if (this.sideWidth < translateXNew) {
                            this.touch.translateXNew = this.sideWidth;
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
                if (this.sideWidth * 0.2 < this.touch.translateXNew) {
                    this.$emit('input', true);
                } else if(this.value) {
                    if (this.value) {
                        this.$emit('input', false);
                    } else {
                        this.touch.translateXNew = 0;
                        this.isShowMask = false;
                    }
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
            if (value) {
                this.isShowMask = true;
                this.touch.translateXNew = this.sideWidth;
            } else {
                this.isShowMask = false;
                this.touch.translateXNew = 0;
            }
            this.touch.translateXOld = this.touch.translateXNew;
        }
    },

    computed: {
        /**
         * touch的起点是否是边缘
         */
        isFromEdge() {
            // return true;
            return 100 > this.touch.startX;
            // 如果是支持左右2个抽屉的话, 需要如下判断
            // return 30 > this.touch.startX || window.screen.width - 30 < this.touch.startX;
        },
        /**
         * 是否沿着Y轴拖拽
         */
        isMoveAlongY() {
            return 0 < Math.abs(this.touch.distanceY) - Math.abs(this.touch.distanceX);
        },
        /**
         * 是否沿着Y轴拖拽
         */
        isMoveAlongX() {
            return 0 < Math.abs(this.touch.distanceX) - Math.abs(this.touch.distanceY);
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
    height: 100%;
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
