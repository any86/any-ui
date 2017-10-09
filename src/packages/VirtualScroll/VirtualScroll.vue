<template>
    <div :class="['component-scroll', ovh && 'ovh']" @touchstart.passive="touchstart" @touchmove.prevent="touchmove" @touchend="touchend">
        <div ref="content" :style="{transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0)`, transitionDuration: `${transitionDuration}ms`}" class="scroll-body" :class="{table: lockY}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '@/utils/dom'
export default {
    name: 'VirtualScroll',

    props: {
        sensitivity: {
            type: Number,
            default: 10
        },

        threshold: {
            // 减速滑动时, 允许超出的最大距离
            type: Number,
            default: 100
        },

        preventDefault: {
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
        },

        lockX: {
            type: Boolean,
            default: true
        },

        lockY: {
            type: Boolean,
            default: false
        },

        isBounce: {
            type: Boolean,
            default: true
        },

        isAllowRest: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            version: 0.01,
            moved: false,
            moveRatio: 1,
            speed: 0,
            startTime: 0,
            endTime: 0,
            startPointTop: 0, // 手指坐标
            startPointLeft: 0,
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
        };
    },

    created() {
        this.scrollLeft = (this.value.scrollLeft);
        this.scrollTop = (this.value.scrollTop);
    },

    mounted() {
        this.getAllSize();
    },

    methods: {
        getAllSize() {
            this.viewWidth = getWidth(this.$el);
            this.viewHeight = getHeight(this.$el);
            this.maxScrollTop = getHeight(this.$refs.content, { isScroll: true }) - this.viewHeight;
            this.maxScrollLeft = getWidth(this.$refs.content, { isScroll: true }) - this.viewWidth;
            // scrollWidth
        },

        touchstart(e) {
            this.getAllSize();
            const point = e.touches ? e.touches[0] : e;
            this.transitionDuration = 0;
            this.startTime = getTime();

            this.startPointTop = point.pageY;
            this.startPointLeft = point.pageX;

            this.startScrollTop = this.scrollTop;
            this.startScrollLeft = this.scrollLeft;

            this.preventDefault && e.preventDefault();

            this.$emit('scroll-start', { scrollTop: this.scrollTop, scrollLeft: this.scrollLeft });
        },

        touchmove(e) {
            const point = e.touches ? e.touches[0] : e;
            const deltaTop = point.pageY - this.startPointTop;
            const deltaLeft = point.pageX - this.startPointLeft;
            const absDeltaTop = Math.abs(deltaTop);
            const absDeltaLeft = Math.abs(deltaLeft);
            const now = getTime();
            // 灵敏度默认为10px;
            // 手指一动超过10px, 才开始拖拽;
            if ((this.sensitivity < absDeltaTop || this.sensitivity < absDeltaLeft)) {
                // 只滑动一个方向, 锁定其他方向
                // 看锁, 且看位移角度
                if (this.lockX && !this.lockY && absDeltaLeft < absDeltaTop) {
                    // 当scroll-body的位置超出边界, 那么滑动距离 : 手指一动距离 = 1 : 2
                    this.moveRatio = (0 < this.scrollTop || this.maxScrollTop < 0 - this.scrollTop) ? .5 : 1;
                    this.scrollTop = this.startScrollTop + deltaTop * this.moveRatio;
                } else if (this.lockY && !this.lockX && absDeltaLeft > absDeltaTop) {
                    this.moveRatio = (0 < this.scrollLeft || this.maxScrollLeft < 0 - this.scrollLeft) ? .5 : 1;
                    this.scrollLeft = this.startScrollLeft + deltaLeft;
                } else if (!this.lockX && !this.lockY) {
                    // 暂不处理, 自由移动
                }
            }

            // 当手指一直按住突然拖动, 那么重置起始值
            if (300 < now - this.startTime) {
                this.startTime = now;
                this.startPointTop = point.pageY;
                this.startPointLeft = point.pageX;
                this.startScrollTop = this.scrollTop;
                this.startScrollLeft = this.scrollLeft;
            }
            // 阻止默认行为(页面滚动)
            this.preventDefault && e.preventDefault();

            this.$emit('scroll-move', { scrollTop: this.scrollTop, scrollLeft: this.scrollLeft });
        },

        touchend(e) {
            this.transitionDuration = 500;
            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const costTime = this.endTime - this.startTime;

            if (this.lockY) {
                if (300 > costTime) {
                    const deltaLeft = this.scrollLeft - this.startScrollLeft;
                    const speedX = deltaLeft / costTime;
                    this.scrollLeft += speedX * 1000;
                }
                // 复位
                this.isAllowRest && this.resetX();

            } else if (this.lockX) {
                if (300 > costTime) {
                    const deltaTop = this.scrollTop - this.startScrollTop;
                    const speedY = deltaTop / costTime;
                    this.scrollTop += speedY * 1000;
                }
                this.isAllowRest && this.resetY();
            }

            // 后期可以在此处加入throhold做超出范围回弹动画
            // ******

            this.preventDefault && e.preventDefault();
            this.$emit('input', { scrollTop: this.scrollTop, scrollLeft: this.scrollLeft });
            this.$emit('scroll-end', { scrollTop: this.scrollTop, scrollLeft: this.scrollLeft });
        },

        limitX() {
            if (0 < this.scrollLeft) {
                // 向右拉
                this.scrollLeft = 0;
            }
            else if (0 - this.maxScrollLeft > this.scrollLeft) {
                // 向左拉
                this.scrollLeft = 0 - this.maxScrollLeft;
            }
        },

        limitY() {
            if (this.threshold < this.scrollTop) {
                // 向下拉
                this.scrollTop = this.threshold;
            } else if (this.maxScrollTop < 0 - this.scrollTop) {
                // 向上拉
                this.scrollTop = 0 - this.maxScrollTop;
            }
        },

        resetX() {
            if (0 < this.scrollLeft) {
                // 向下拉
                this.scrollLeft = 0;
            } else if (this.maxScrollLeft < 0 - this.scrollLeft) {
                // 向上拉
                this.scrollLeft = 0 - this.maxScrollLeft;
            }
        },

        resetY() {
            if (0 < this.scrollTop) {
                this.scrollTop = 0;
            } else if (this.maxScrollTop < 0 - this.scrollTop) {
                this.scrollTop = 0 - this.maxScrollTop;
            }
        }
    },

    watch: {
        value: {
            deep: true,
            handler(value) {
                this.transitionDuration = 500;
                this.scrollTop = (value.scrollTop);
                this.scrollLeft = (value.scrollLeft);
            }
        }
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
    >.scroll-body {
        position: relative;
        width: 100%;
        user-select: none;
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transition-duration: 0ms;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        .table {
            /* 没有display: table, 子元素的子元元素没法撑起其父元素的宽度 */
            display: table;
        }
    }
}
</style>
