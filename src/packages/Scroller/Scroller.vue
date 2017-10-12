<template>
    <div :class="['atom-scroller', ovh && 'ovh']">
        <div ref="body" :style="[{transform: `translate3d(${translateX}px, ${translateY}px, 0)`, transitionDuration: `${transitionDuration}ms`}, bodyStyle]" @transitionend="transitionend" @webkitTransitionend="transitionend" :class="[{table: lockY}, bodyClass]" v-on="!isBindBody ? {} : events" class="atom-scroller__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '@/utils/dom'
export default {
    name: 'Scroller',

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
            default: () => ({ scrollLeft: 0, scrollTop: 0 }) // 注意返回对象, 要用括号包起来
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
        },

        isSelfMoving: {
            type: Boolean,
            default: false
        },

        bodyStyle: {
            type: Object,
            default: () => { }
        },

        bodyClass: {
            type: Object,
            default: () => { }
        },

        maxHolderTime: {
            type: Number,
            default: 100
        },

        isBindBody: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            version: 0.01,
            moveRatio: 1,
            speed: 0,
            startTime: 0,
            endTime: 0,
            startPointY: 0, // 手指坐标
            startPointX: 0,
            directionX: 0,
            directionY: 0,
            isInTransition: false,
            transitionDuration: 0,
            viewWidth: 0,
            viewHeight: 0,

            translateX: 0,
            translateY: 0,
            maxTranslateX: 0,
            maxTranslateY: 0,
            startTranslateX: 0,
            startTranslateY: 0,
            events:['touchstart', 'touchmove', 'touchend', 'transitionend', 'webkitTransitionend'],
        };
    },

    created() {
        // 初始scroll-body位置
        this.translateX = -this.value.scrollLeft;
        this.translateY = -this.value.scrollTop;
    },

    mounted() {
        this._addEvents(this.isBindBody ? this.$refs.body : this.$el);
        this._getAllSize();
    },

    methods: {
        /**
         * 绑定touch系列事件
         * @argument {Element}
         */
        _addEvents(el) {
            this.events.forEach(evnetName => {
                el.addEventListener(evnetName, this[evnetName], { passive: !this.preventDefault });
            });
        },
        /**
         * 解除绑定touch系列事件
         * @argument {Element}
         */
        _removeEvents(el) {
            this.events.forEach(name => {
                el.removeEventListener(evnetName, this[evnetName]);
            });
        },
        /**
         * 获取内容高/宽
         */
        _getAllSize() {
            if (this.lockY) {
                this.viewWidth = getWidth(this.$el);
                this.maxTranslateX = getWidth(this.$refs.body, { isScroll: true }) - this.viewWidth;
            } else if (this.lockX) {
                this.viewHeight = getHeight(this.$el);
                this.maxTranslateY = getHeight(this.$refs.body, { isScroll: true }) - this.viewHeight;
            }
        },

        touchstart(e) {
            this._getAllSize();
            const point = e.touches ? e.touches[0] : e;
            this.transitionDuration = 0;
            this.startTime = getTime();
            // 记录当前触碰点在屏幕上的坐标
            this.startPointY = point.pageY;
            this.startPointX = point.pageX;
            // 记录滑动前scroll-body的translate信息
            this.startTranslateY = this.translateY;
            this.startTranslateX = this.translateX;
            this.preventDefault && e.preventDefault();
            this.$emit('scroll-start', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
        },

        touchmove(e) {
            const point = e.touches ? e.touches[0] : e;
            const deltaY = point.pageY - this.startPointY;
            const deltaX = point.pageX - this.startPointX;
            const absdeltaY = Math.abs(deltaY);
            const absdeltaX = Math.abs(deltaX);
            const now = getTime();
            // 灵敏度默认为10px;
            // 手指移动超过10px, scroll-body才开始随手指滑动;
            if ((this.sensitivity < absdeltaY || this.sensitivity < absdeltaX)) {
                // 只滑动一个方向, 锁定其他方向
                // 看锁, 且看位移角度
                if (this.lockX && !this.lockY && absdeltaX < absdeltaY) {
                    // 当scroll-body的位置超出边界, 那么滑动距离 : 手指一动距离 = 1 : 2
                    this.moveRatio = (0 < this.translateY || this.maxTranslateY < 0 - this.translateY) ? .5 : 1;
                    this.translateY = this.startTranslateY + deltaY * this.moveRatio;
                } else if (this.lockY && !this.lockX && absdeltaX > absdeltaY) {
                    this.moveRatio = (0 < this.translateX || this.maxTranslateX < 0 - this.translateX) ? .5 : 1;
                    this.translateX = this.startTranslateX + deltaX;
                } else if (!this.lockX && !this.lockY) {
                    // 暂不处理, 自由移动
                }
            }

            // 当手指一直按住突然拖动, 那么重置起始值
            if (this.maxHolderTime < now - this.startTime) {
                this.startTime = now;
                
                this.startPointY = point.pageY;
                this.startPointX = point.pageX;
                this.startTranslateY = this.translateY;
                this.startTranslateX = this.translateX;
            }
            // 阻止默认行为(页面滚动)
            this.preventDefault && e.preventDefault();

            this.$emit('scroll-move', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
        },

        touchend(e) {
            this.transitionDuration = 500;
            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const costTime = this.endTime - this.startTime;

            if (this.lockY) {
                if (this.maxHolderTime > costTime) {
                    const deltaX = this.translateX - this.startTranslateX;
                    const speedX = deltaX / costTime;
                    this.translateX += speedX * 1000;
                }
                // 自动复位
                // this.isAllowRest && this.resetX();
            } else if (this.lockX) {
                if (this.maxHolderTime > costTime) {
                    const deltaY = this.translateY - this.startTranslateY;
                    const speedY = deltaY / costTime;
                    this.translateY += speedY * 1000;
                }
                // 自己复位
                this.isAllowRest && this.resetY();
            }

            // 后期可以在此处加入throhold做超出范围回弹动画
            // ******

            this.preventDefault && e.preventDefault();
            this.$emit('update:isSelfMoving', true);
            this.$emit('input', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            this.$emit('scroll-leave', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
        },
        transitionend() {
            this.$emit('update:isSelfMoving', false);
            this.$emit('scroll-end', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
        },

        resetX() {
            if (0 < this.translateX) {
                // 向下拉
                this.translateX = 0;
            } else if (this.maxTranslateX < 0 - this.translateX) {
                // 向上拉
                this.translateX = 0 - this.maxTranslateX;
            }
        },

        resetY() {
            if (0 < this.translateY) {
                this.translateY = 0;
            } else if (this.maxTranslateY < 0 - this.translateY) {
                this.translateY = 0 - this.maxTranslateY;
            }
        }
    },

    watch: {
        value: {
            deep: true,
            handler(value) {
                this.transitionDuration = 500;
                this.translateY = (value.scrollTop);
                this.translateX = (value.scrollLeft);
            }
        }
    },

    destroyed() {
        this._removeEvents(this.isBindBody ? this.$refs.body : this.$el);
    }

}
</script>
<style scoped lang=scss>
.atom-scroller {
    touch-action: pan-x;
    touch-action: pan-y;
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    >.atom-scroller__body {
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
