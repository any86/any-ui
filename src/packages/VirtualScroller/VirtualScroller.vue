<template>
    <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" class="atom-virtual-scroller">
        <div ref="body" :style="style" @transitionend="transitionend" @webkitTransitionend="transitionend" :class="bodyClass" class="atom-virtual-scroller__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '@/utils/dom';
import momentum from '@/utils/momentum';
import debounce from 'lodash/debounce';
export default {
    name: 'VirtualScroller',

    props: {
        // isCalcByTouch: {
        //     type: Boolean,
        //     default: false
        // },

        isBounce: {
            type: Boolean,
            default: true
        },

        speed: {
            type: [String, Number],
            default: 300
        },

        isDisable: {
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

        isPreventDefault: {
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

        minMoveRatio: {
            type: Number,
            default: 0.3
        },

        directionLockThreshold: {
            type: Number,
            default: 5
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
        },

        bodyClass: {
            type: [Object, Array],
            default: () => {}
        }
    },

    data() {
        return {
            isDragging: false,
            isAnimating: false,
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
            moveRatio: 1,
            deltaX: 0,
            deltaY: 0,
            touchDirection: undefined
        };
    },

    created() {
        // 初始位置
        this.translateX = -this.value.scrollLeft;
        this.translateY = -this.value.scrollTop;
    },

    mounted() {
        this.updateSize();
        // window.addEventListener('resize', this.updateSize);
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

        /**
         * 获取动画过程中的body的实时的translateX
         */
        getTranslate() {
            // https://github.com/nolimits4web/Swiper/blob/master/src/utils/utils.js
            // 写的兼容性不完整, 后期修改参考swiper.js的getTranslate
            const style = getComputedStyle(this.$refs.body, null);
            const matrix = style.transform.split(',');
            return { x: Math.round(parseFloat(matrix[4] || matrix[12])), y: Math.round(parseFloat(matrix[5] || matrix[13])) };
        },

        touchstart(e) {
            // 防止scroll被隐藏的时候, 高度计算不对
            this.updateSize();
            // stopPropagation | preventDefault必须放在顶部, 不然下面的return false 会阻止代码运行
            this.stopPropagation && e.stopPropagation();
            // 阻止浏览器默认行为
            this.isPreventDefault && e.preventDefault();

            // 禁用touch事件
            if (this.isDisable) return;

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
            this.startTranslateX = this.translateX;
            this.startTranslateY = this.translateY;

            this.deltaX = 0;
            this.deltaY = 0;
            this.touchDirection = undefined;
            // 定义组件事件
            this.$emit('touch-start', { ...this.moveData, e });
        },

        touchmove(e) {
            this.stopPropagation && e.stopPropagation();

            // 禁用touch事件[停止运行]
            if (this.isDisable) return;
            // x/y都lock了[停止运行]
            if (this.isLockX && this.isLockY) return;
            const now = getTime();

            // 基础位置数据
            const point = e.touches ? e.touches[0] : e;
            let touchDeltaX = point.pageX - this.startPointX;
            let touchDeltaY = point.pageY - this.startPointY;
            this.startPointY = point.pageY;
            this.startPointX = point.pageX;
            // 总计的偏移量
            this.deltaX += touchDeltaX;
            this.deltaY += touchDeltaY;

            const absDeltaX = Math.abs(this.deltaX);
            const absDeltaY = Math.abs(this.deltaY);

            // 如果x轴和y轴滑动距离都小于10px(灵敏度), 那么不响应
            // if (now - this.endTime > 300 && this.sensitivity > absDeltaY && this.sensitivity > absDeltaX) return;

            // 一旦开始touchmove, 那么方向就定了, 除非重新touchstart
            if (undefined == this.touchDirection && !(!this.isLockX && !this.isLockY)) {
                if (absDeltaX > absDeltaY + this.directionLockThreshold) {
                    this.touchDirection = 'x';
                } else if (absDeltaY > absDeltaX + this.directionLockThreshold) {
                    this.touchDirection = 'y';
                } else {
                    this.touchDirection = 'n';
                }
            }

            // 确定方向后, 忽略其他方向的位移
            if ('x' === this.touchDirection) {
                touchDeltaY = 0;
            } else if ('y' === this.touchDirection) {
                touchDeltaX = 0;
            } else if ('n' === this.touchDirection) {
                touchDeltaY = 0;
                touchDeltaX = 0;
            }

            if (!this.isLockX) {
                this.translateX += touchDeltaX * (0 < this.translateX || this.minTranslateX > this.translateX ? 0.3 : 1);
            }

            if (!this.isLockY) {
                this.translateY += touchDeltaY * (0 < this.translateY || this.minTranslateY > this.translateY ? 0.3 : 1);
            }

            // 当手指一直按住突然拖动, 那么重置起始值
            if (this.maxHolderTime < now - this.startTime) {
                this.startTime = now;
                this.startPointY = point.pageY;
                this.startPointX = point.pageX;
                this.startTranslateY = this.translateY;
                this.startTranslateX = this.translateX;
            }

            // 拖拽正在移动的item
            if (this.isAnimating) {
                let { x, y } = this.getTranslate();
                this.startTranslateX = x;
                this.startTranslateY = y;
                this.translateX = this.startTranslateX;
                this.translateY = this.startTranslateY;
                this.isAnimating = false;
            }

            // 派发组件事件
            // this.$emit('input', {
            //     scrollTop: -this.translateY,
            //     scrollLeft: -this.translateX
            // });
            this.$emit('touch-move');
        },

        touchend(e) {
            this.stopPropagation && e.stopPropagation();
            // this.isPreventDefault && e.preventDefault();
            // // 禁用touch事件
            if (this.isDisable) return;

            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const timeDiff = this.endTime - this.startTime;
            

            const translateXDiff = this.translateX - this.startTranslateX;
            const translateYDiff = this.translateY - this.startTranslateY;
            // 150ms内的快速滑动才有缓冲动画
            if (150 > timeDiff) {
                this.isAnimating = true;
                
                if (!this.isLockX) {
                    const { destination, duration } = momentum(0, translateXDiff, timeDiff);
                    this.translateX = this.translateX - destination;
                    this.transitionDuration = duration;
                }

                if (!this.isLockY) {
                    const { destination, duration } = momentum(0, translateYDiff, timeDiff);
                    this.translateY = this.translateY - destination;
                    this.transitionDuration = duration;
                }
            }

            // 超过边界进行复位
            this.resetPosition();

            // 派发事件
            this.$emit('input', {
                scrollTop: -this.translateY,
                scrollLeft: -this.translateX
            });

            this.$emit('touch-end', { ...this.moveData, e });

            if (0 < this.speed) {
                this.$emit('animate-start');
            } else {
                this.$emit('animate-none-end');
            }
        },

        resetPosition() {
            if ('x' === this.touchDirection) {
                if (0 < this.translateX) {
                    this.translateX = 0;
                } else if (this.minTranslateX > this.translateX) {
                    this.translateX = this.minTranslateX;
                }
            } else if ('y' === this.touchDirection) {
                if (0 < this.translateY) {
                    this.translateY = 0;
                } else if (this.minTranslateY > this.translateY) {
                    this.translateY = this.minTranslateY;
                }
            } else if ('n' === this.touchDirection) {
            }
        },

        transitionend() {
            if (this.isDisable) return;
            this.isAnimating = false;
            this.$emit('transition-end');
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
                this.moveRatio = this.minMoveRatio;
            } else if (this.minTranslateY > translateY) {
                this.moveRatio = this.minMoveRatio;
            } else {
                this.moveRatio = 1;
            }
        },

        translateX(translateX) {
            if (this.maxTranslateX < translateX) {
                this.moveRatio = this.minMoveRatio;
            } else if (this.minTranslateX > translateX) {
                this.moveRatio = this.minMoveRatio;
            } else {
                this.moveRatio = 1;
            }
        },

        value: {
            deep: true,
            handler(value) {
                this.transitionDuration = this.speed;
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
        /* transition-timing-function: ease-out; */
        transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        .table {
            /* 没有display: table, 子元素的子元元素没法撑起其父元素的宽度 */
            display: table;
        }
    }
}
</style>