<template>
    <div :class="['component-scroll-view', ovh && 'ovh']" @touchstart.passive="touchstart" @touchmove.passive="touchmove" @touchend="touchend">
        <div ref="content" :style="{transform: `translate3d(${translateX}px, ${translateY}px, 0)`, transitionDuration: `${transitionDuration}ms`}" class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Core',

    props: {
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
        };
    },

    methods: {
        touchstart(e) {
            this.transitionDuration = 0;
            this.startTime = e.timeStamp;
            // 调用上次位置
            this.lastTranslateX = this.translateX;
            this.lastTranslateY = this.translateY;
            // 其实坐标
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        },

        touchmove(e) {
            this.translateX = e.touches[0].clientX - this.startX + this.lastTranslateX;
            this.translateY = e.touches[0].clientY - this.startY + this.lastTranslateY;
        },

        touchend(e) {
            const costTime = e.timeStamp - this.startTime;
            this.translateX += costTime;
            this.transitionDuration = 200;
        },

    },


    destroyed() {

    }
}
</script>
<style scoped lang=scss>
.component-scroll-view {
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
        min-height: 100%;
        width: 100%;
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transition-duration: 0ms;
    }
}
</style>
