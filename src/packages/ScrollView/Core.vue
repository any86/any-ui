<template>
    <div :class="['component-scroll', ovh && 'ovh']">
        <div class="fixed-bottom">{{speed}}</div>
        <div ref="content" :style="{transform: `translate3d(${translateX}px, ${translateY}px, 0)`, transitionDuration: `${transitionDuration}ms`}" @touchstart.passive="touchstart" @touchmove.prevent="touchmove" @touchend="touchend" class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight } from '@/packages/Tools/dom'
export default {
    name: 'Core',

    props: {
        lockX: {
            type: Boolean,
            default: true
        },

        lockY: {
            type: Boolean,
            default: false
        },

        keyboardOffset: {
            type: Number,
            default: 0
        },

        preLoad: {
            type: Number,
            default: 1.3
        },

        ovh: {
            type: Boolean,
            default: false
        },

        value: {
            type: Object,
            default: { x: 0, y: 0 }
        }
    },

    data() {
        return {
            speed: 0,
            startX: 0,
            startY: 0,
            startTime: 0,
            endX: 0,
            endY: 0,
            lastTranslateX: 0,
            lastTranslateY: 0,
            translateX: 0,
            translateY: 0,
            transitionDuration: 0,
            windowHeight: 0,
            maxTranslateX: 0
        };
    },

    mounted() {
        this.windowHeight = getHeight(window);
        this.minTranslateX = 0 - (getHeight(this.$refs.content) - this.windowHeight);
    },

    methods: {
        touchstart(e) {
            this.transitionDuration = 0;
            this.startTime = e.timeStamp;
            // 调用上次位置
            this.lastTranslateX = this.translateX;
            this.lastTranslateY = this.translateY;
            // 其实坐标
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        },

        touchmove(e) {
            if (this.lockY) {
                this.translateX = e.touches[0].pageX - this.startX + this.lastTranslateX;

            }

            if (this.lockX) {
                this.translateY = e.touches[0].pageY - this.startY + this.lastTranslateY;
                this.limitY();
            }
        },

        touchend(e) {
            // 滑动用时
            const costTime = e.timeStamp - this.startTime;
            // 移动距离
            const deltaX = e.changedTouches[0].pageX - this.startX;
            const deltaY = e.changedTouches[0].pageY - this.startY;
syslog(costTime)
            var  continueDelta = 0;
            if (300 > costTime) {
                this.speed = deltaY / costTime;
                continueDelta = this.speed * 800;
            }

            if (this.lockX) {
                this.translateY += continueDelta;
                this.limitY();
            }

            if (this.lockY) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    this.translateX += continueDelta;
                }
            }

            this.transitionDuration = 1000;
        },

        limitY() {
            if (0 < this.translateY) {
                // 向下拉
                this.translateY = 0;
            } else if (this.minTranslateX > this.translateY) {
                // 向上拉
                this.translateY = this.minTranslateX;
            }
        },

        reset() { }
    },


    destroyed() {

    }
}
</script>
<style scoped lang=scss>
.component-scroll {
    touch-action: pan-x;
    touch-action: pan-y;
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    &.ovh {
        overflow: hidden;
    }
    >.scroll-content {
        position: relative;
        /* min-height: 100%; */
        width: 100%;
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transition-duration: 0ms;
    }
}
</style>
