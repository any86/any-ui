<template>
    <div :class="['component-scroll', ovh && 'ovh']">
        <div class="fixed-bottom">{{speed}}</div>
        <div ref="content" :style="{transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0)`, transitionDuration: `${transitionDuration}ms`}" @touchstart.passive="touchstart" @touchmove.prevent="touchmove" @touchend="touchend" class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth } from '@/packages/Tools/dom'
export default {
    name: 'Core',

    props: {
        sensitivity: {
            type: Number,
            default: 10
        },

        directionLockThreshold: {
            type: Number,
            default: 0
        },

        preventDefault: {
            type: Boolean,
            default: false
        },

        startX: {
            // 起始滚动条X左侧距离
            type: Number,
            default: 0
        },

        startY: {
            type: Number,
            default: 0
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
            version: 0.01,
            moved: false,
            speed: 0,
            startTime: 0,
            endTime: 0,
            pointTop: 0, // 手指坐标
            pointLeft: 0,
            directionX: 0,
            directionY: 0,
            isInTransition: false,
            transitionDuration: 0,
            viewWidth: 0,
            viewHeight: 0,
            startScrollLeft: 0, // 滚动条位置
            startScrollTop: 0,
            scrollLeft: 0,
            scrollTop: 0,
            maxScrollLeft: 0,
            maxScrollTop: 0,
            lockX: true,
            lockY: false,
        };
    },

    mounted() {
        this.viewWidth = getWidth(this.$el);
        this.viewHeight = getHeight(this.$el);
        this.maxScrollTop = getHeight(this.$refs.content) - this.viewHeight;
        this.maxScrollLeft = getWidth(this.$refs.content) - this.viewWidth;
    },

    methods: {
        touchstart(e) {
            const point = e.touches ? e.touches[0] : e;
            this.transitionDuration = 0;

            this.pointTop = point.pageY;
            this.pointLeft = point.pageX;

            this.startScrollTop = this.scrollTop;
            this.startScrollLeft = this.scrollLeft;

            this.preventDefault && e.preventDefault();
        },

        touchmove(e) {
            const point = e.touches ? e.touches[0] : e;
            const deltaTop = point.pageY - this.pointTop;
            const deltaLeft = point.pageX - this.pointLeft;
            const absDeltaTop = Math.abs(deltaTop);
            const absDeltaLeft = Math.abs(deltaLeft);
            // 灵敏度默认为10px;
            // 手指一动超过10px, 才开始拖拽;
            if (this.sensitivity < absDeltaTop || this.sensitivity < absDeltaLeft) {
                // 只滑动一个方向, 锁定其他方向
                if (this.lockX && !this.lockY) {
                    this.scrollTop = this.startScrollTop + deltaTop;
                } else if (this.lockY && !this.lockX) {
                    this.scrollLeft = this.startScrollLeft + deltaLeft;
                } else if (!this.lockX && !this.lockY) {
                    // 暂不处理, 自由移动
                    // absDeltaTop > absDeltaLeft + this.directionLockThreshold
                }
            }
            // 阻止默认行为(页面滚动)
            this.preventDefault && e.preventDefault();
        },

        touchend(e) {
            const point = e.changedTouches ? e.changedTouches[0] : e;
            
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
