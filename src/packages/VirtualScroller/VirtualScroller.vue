<template>
    <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" class="atom-virtual-scroller">
        <div ref="body" :style="style" @transitionend="transitionend" @webkitTransitionend="transitionend" :class="bodyClass" class="atom-virtual-scroller__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '@/utils/dom';
import debounce from 'lodash/debounce';
const DURATION = 500;
export default {
    name: 'VirtualScroller',

    props: {
        isDisableTouch: {
            type: Boolean,
            default: false
        },

        sensitivity: {
            type: Number,
            default: 10
        },

        threshold: {
            // 减速滑动时, 允许超出的最大距离
            type: Number,
            default: 100
        },

        edgeThreshold: {
            type: Number,
            default: 150
        },

        preventDefault: {
            type: Boolean,
            default: true
        },

        stopPropagation: {
            type: Boolean,
            default: false
        },

        value: {
            type: Object,
            default: () => ({ scrollLeft: 0, scrollTop: 0 }) // 注意返回对象, 要用括号包起来
        },

        isLockX: {
            type: Boolean,
            default: true
        },

        isLockY: {
            type: Boolean,
            default: false
        },

        directionLockThreshold: {
            type: Number,
            default: 15
        },

        hasBufferMove: {
            type: Boolean,
            default: true
        },

        bufferThreshold: {
            // 触发缓冲运动所需要的最小拖拽距离
            type: Number,
            default: 15
        },

        hasReset: {
            type: Boolean,
            default: true
        },

        bodyStyle: {
            type: Object,
            default: () => {}
        },

        bodyClass: {
            type: Object,
            default: () => {}
        },

        maxHolderTime: {
            type: Number,
            default: 300
        },

        isBindBody: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isMoving: false,
            speed: 0,
            startTime: 0,
            endTime: 0,
            transitionDuration: 0,
            viewWidth: 0,
            viewHeight: 0,
            startPointY: 0, // 手指坐标
            startPointX: 0,
            translateX: 0,
            translateY: 0,
            maxTranslateX: 0,
            maxTranslateY: 0,
            startTranslateX: 0,
            startTranslateY: 0,
            moveRatio: 1
        };
    },

    created() {
        // 初始位置
        this.translateX = -this.value.scrollLeft;
        this.translateY = -this.value.scrollTop;
    },

    mounted() {
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    },

    methods: {
        /**
         * 获取内容高/宽, 
         * 不加节流, 否者其他使用updateSize方法的实例没法触发, 会被节流掉
         * 反正手机端也不会频繁的触发resize
         * 没有理解为什么多个实例的方法会触发节流函数
         * 可能需要研究下webpack生成代码才有答案
         */
        updateSize() {
            if (this.isLockY) {
                this.viewWidth = getWidth(this.$el);
            } else if (this.isLockX) {
                this.viewHeight = getHeight(this.$el);
            }
        },

        touchstart(e) {
            // stopPropagation | preventDefault必须放在顶部, 不然下面的return false 会阻止代码运行
            this.stopPropagation && e.stopPropagation();
            // 阻止浏览器默认行为
            this.preventDefault && e.preventDefault();

            // 禁用touch事件
            if (this.isDisableTouch) return;

            // ========== 计算滑动 ==========
            const point = e.touches ? e.touches[0] : e;

            // 动画时间0
            this.transitionDuration = 0;

            // 记录触摸时间
            this.startTime = getTime();

            // 记录当前触碰点在屏幕上的坐标
            this.startPointY = point.pageY;
            this.startPointX = point.pageX;

            // 记录滑动当前translate信息
            this.startTranslateY = this.translateY;
            this.startTranslateX = this.translateX;
            // 定义组件事件
            this.$emit('scroll-start', { ...this.moveData, e });
        },

        touchmove(e) {
            this.stopPropagation && e.stopPropagation();
            this.preventDefault && e.preventDefault();
            // 禁用touch事件[停止运行]
            if (this.isDisableTouch) return;
            // x/y都lock了[停止运行]
            if (this.isLockX && this.isLockY) return;
            const now = getTime();
            // 这句没看懂iscroll的意图, 先直接拿过来[停止运行]
            // if(300 < now - this.endTime) return;
            // 基础位置数据
            const point = e.touches ? e.touches[0] : e;
            const deltaY = point.pageY - this.startPointY;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaY = Math.abs(deltaY);
            const absDeltaX = Math.abs(deltaX);

            // 如果x轴和y轴滑动距离都小于10px(灵敏度), 那么不响应
            if (this.sensitivity > absDeltaY && this.sensitivity > absDeltaX) return;
            // ========== 计算滑动 ==========

            if (!this.isLockX && this.isLockY) {
                // X轴可拖拽
                if (absDeltaX < absDeltaY + this.directionLockThreshold) return;
                // X位移
                this.translateX = this.startTranslateX + deltaX * this.moveRatio;
            } else if (this.isLockX && !this.isLockY) {
                // Y轴可拖拽
                if (absDeltaY < absDeltaX + this.directionLockThreshold) return;
                // Y位移
                this.translateY = this.startTranslateY + deltaY * this.moveRatio;
            } else {
                this.translateX = this.startTranslateX + deltaX * this.moveRatio;
                this.translateY = this.startTranslateY + deltaY * this.moveRatio;
            }
            // 当手指一直按住突然拖动, 那么重置起始值
            if (this.maxHolderTime < now - this.startTime) {
                this.startTime = now;
                this.startPointY = point.pageY;
                this.startPointX = point.pageX;
                this.startTranslateY = this.translateY;
                this.startTranslateX = this.translateX;
            }
            // // 派发组件事件
            // this.$emit('input', {
            //     scrollTop: -this.translateY,
            //     scrollLeft: -this.translateX
            // });
            // this.$emit('scroll-move', { ...this.moveData, e });
        },

        touchend(e) {
            this.stopPropagation && e.stopPropagation();
            this.preventDefault && e.preventDefault();
            // // 禁用touch事件
            if (this.isDisableTouch) return;
            this.transitionDuration = DURATION;
            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const timeDiff = this.endTime - this.startTime;

            if (!this.isLockY) {
                const translateYDiff = this.translateY - this.startTranslateY;
                // 150ms内的快速滑动才有缓冲动画
                if (150 > timeDiff) {
                    // log(this.translateY, timeDiff, translateYDiff)
                    this.translateY = this.translateY + timeDiff / 10 * translateYDiff;
                }
                // 复位
                if (this.maxTranslateY < this.translateY) {
                    this.translateY = this.maxTranslateY;
                } else if (this.minTranslateY > this.translateY) {
                    this.translateY = this.minTranslateY;
                }
            } else if (!this.isLockX) {
                const translateXDiff = this.translateX - this.startTranslateX;
                // 150ms内的快速滑动才有缓冲动画
                if (150 > timeDiff) {
                    // log(this.translateY, timeDiff, translateYDiff)
                    this.translateX = this.translateX + timeDiff / 10 * translateXDiff;
                }
                // 复位
                if (this.maxTranslateX < this.translateX) {
                    this.translateX = this.maxTranslateX;
                } else if (this.minTranslateX > this.translateX) {
                    this.translateX = this.minTranslateX;
                }
            }

            // 派发事件
            this.$emit('input', {
                scrollTop: -this.translateY,
                scrollLeft: -this.translateX
            });
            // console.log('touch-end')
            // this.$emit('scroll-leave', { ...this.moveData, e });
        },

        transitionend() {
            // if (this.isDisableTouch) return;
            // if (this.hasBufferMove) {
            //     this.$emit('scroll-buffer', false);
            // }
            // this.$nextTick(() => {
            //     this.isBufferMoving = false;
            //     this.$emit('scroll-end', {
            //         scrollTop: -this.translateY,
            //         scrollLeft: -this.translateX
            //     });
            // });
        }
    },

    computed: {
        style() {
            return [{ transform: `translate3d(${this.translateX}px, ${this.translateY}px, 0)`, transitionDuration: `${this.transitionDuration}ms` }, this.bodyStyle];
        },

        /**
         * minTranslateY为负值
         */
        minTranslateY() {
            return this.viewHeight - getHeight(this.$refs.body, { isScroll: true });
        },

        /**
         * minTranslateX为负值
         */
        minTranslateX() {
            return this.viewWidth - getWidth(this.$refs.body, { isScroll: true });
        },

        /**
         * 运动数据
         */
        moveData() {
            return {
                scrollTop: -this.translateY,
                scrollLeft: -this.translateX,
                pointY: this.startPointY,
                pointX: this.startPointX,
                deltaX: this.translateX - this.startTranslateX,
                deltaY: this.translateY - this.startTranslateY
            };
        }
    },

    watch: {
        translateY(translateY) {
            if (this.maxTranslateY < translateY) {
                this.moveRatio = 0.3;
            } else if (this.minTranslateY > translateY) {
                this.moveRatio = 0.3;
            } else {
                this.moveRatio = 1;
            }
        },

        translateX(translateX) {
            if (this.maxTranslateX < translateX) {
                this.moveRatio = 0.3;
            } else if (this.minTranslateX > translateX) {
                this.moveRatio = 0.3;
            } else {
                this.moveRatio = 1;
            }
        },

        value: {
            deep: true,
            handler(value) {
                this.transitionDuration = DURATION;
                this.translateX = -value.scrollLeft;
                this.translateY = -value.scrollTop;
            }
        }
    }
};
</script>
<style scoped lang=scss>
.atom-virtual-scroller {
    position: relative;
    touch-action: pan-x;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    > .atom-scroller__body {
        position: relative;
        width: 100%;
        user-select: none;
        transition-timing-function: ease-in-out;
        /* transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        .table {
            /* 没有display: table, 子元素的子元元素没法撑起其父元素的宽度 */
            display: table;
        }
    }
}
</style>
