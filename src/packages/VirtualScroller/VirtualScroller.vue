<template>
    <div 
        @touchstart="touchstart" 
        @touchmove="touchmove" 
        @touchend="touchend" 
        class="atom-virtual-scroller">
        
        <!-- 内容前插槽 -->
        <slot name="before"></slot>
        
        <div 
            ref="body" 
            :style="style" 
            @transitionend="transitionend" 
            @webkitTransitionend="transitionend" 
            :class="bodyClass" 
            class="atom-virtual-scroller__body">

            <!-- 内容插槽 -->
            <slot></slot>
        </div>

        <!-- 内容后插槽 -->
        <slot name="after"></slot>

        <!-- 滚动条X -->
        <transition name="fade">
            <span 
                v-if="this.isHasBar && !this.isLockX" 
                :style="{width: `${barWidth}px`, left: `${barX}px`}" 
                class="atom-virtual-scroller__bar atom-virtual-scroller__bar--x">
            </span>
        </transition>

        <!-- 滚动条Y -->
        <transition name="fade">
            <span 
                v-if="this.isHasBar && !this.isLockY" 
                :style="{height: `${barHeight}px`, top: `${barY}px`}" 
                class="atom-virtual-scroller__bar atom-virtual-scroller__bar--y">
            </span>
        </transition>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '../../utils/dom';
import momentum from './momentum';
import debounce from 'lodash/debounce';
export default {
    name: 'AtomVirtualScroller',

    props: {
        isHasBar: {
            type: Boolean,
            default: false
        },

        preventDefaultException: {
            type: Object,
            default: () => ({ tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ })
        },

        isBounce: {
            type: Boolean,
            default: true
        },

        bounceTime: {
            type: Number,
            default: 600
        },

        speed: {
            type: [String, Number],
            default: 300
        },

        isDisabled: {
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

        isStopPropagation: {
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

        moveRatio: {
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
            isShowBar: false,
            isInTransition: false,
            transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
            isMoved: false,
            isDragging: false,
            isAnimating: false,
            isResting: false, // 是否正在执行复位动画
            startTime: 0,
            endTime: 0,
            transitionDuration: 0,
            warpWidth: 0,
            warpHeight: 0,
            startPointY: 0, // 手指坐标
            startPointX: 0,
            x: 0,
            y: 0,
            maxTranslateX: 0,
            maxTranslateY: 0,
            startX: 0,
            startY: 0,
            deltaX: 0,
            deltaY: 0,
            direction: undefined,
            // new
            distX: 0, // touchstart至touchend之间的距离
            distY: 0,
            isInTransition: false,
            bodyHeight: 0, // 内容高度
            bodyWidth: 0
        };
    },

    created() {
        // 初始位置
        this.x = -this.value.x || 0;
        this.y = -this.value.y || 0;
    },

    mounted() {
        this.updateSize();
        this.$updateSize = this.updateSize;
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
                this.warpWidth = getWidth(this.$el);
                this.bodyWidth = getWidth(this.$refs.body, {
                    isScroll: true
                });
            } else if (this.isLockX) {
                this.warpHeight = getHeight(this.$el);
                this.bodyHeight = getHeight(this.$refs.body, {
                    isScroll: true
                });
            }
        },

        /**
         * 获取动画过程中的body的实时的x
         */
        getPosition() {
            // https://github.com/nolimits4web/Swiper/blob/master/src/utils/utils.js
            // 写的兼容性不完整, 后期修改参考swiper.js的getPosition
            const style = getComputedStyle(this.$refs.body, null);
            const matrix = style.transform.split(',');
            return {
                x: Math.round(parseFloat(matrix[4] || matrix[12])),
                y: Math.round(parseFloat(matrix[5] || matrix[13]))
            };
        },

        /**
         *
         * @augment {Element} 元素
         * @augment {Regular} 正则
         */
        _getExceptionForPreventDefault(el, exceptions) {
            for (let key in exceptions) {
                if (exceptions[key].test(el[key])) {
                    return true;
                }
            }

            return false;
        },

        _fixBlur() {
            let activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                activeElement.blur();
            }
        },

        /**
         * 在iscroll中x,y指的是translate的x/y
         */
        touchstart(e) {
            // 禁用touch事件
            if (this.isDisabled) return;

            this._fixBlur();

            
            // isStopPropagation | preventDefault必须放在顶部, 不然下面的return false 会阻止代码运行
            this.isStopPropagation && e.stopPropagation();
            // 阻止浏览器默认行为

            this.isPreventDefault && !this._getExceptionForPreventDefault(e.target, this.preventDefaultException) && e.preventDefault();
            // ========== 计算滑动 ==========
            const point = e.touches ? e.touches[0] : e;

            // 动画时间0
            this.transitionDuration = 0;

            // 记录触摸时间
            this.startTime = getTime();

            let { x, y } = this.getPosition();
            this.startX = x;
            this.startY = y;
            this.x = this.startX;
            this.y = this.startY;

            // 重置touchmove距离
            this.distX = 0;
            this.distY = 0;

            this.isAnimating = false;

            // 记录当前触碰点在屏幕上的坐标
            this.startPointY = point.pageY;
            this.startPointX = point.pageX;

            // 记录滑动当前translate信息
            this.startX = this.x;
            this.startY = this.y;

            // 重置移动标记, 这个标记在后面会用来区分scroll-start事件
            this.isMoved = false;

            // 方向
            this.direction = undefined;

            // 定义组件事件
            this.$emit('before-scroll-start', this.position);
        },

        touchmove(e) {
            // 禁用touch事件[停止运行]
            if (this.isDisabled) return;

            this.isShowBar = true;

            // x/y都lock了[停止运行]
            if (this.isLockX && this.isLockY) return;

            this.isStopPropagation && e.stopPropagation();
            this.isPreventDefault && e.preventDefault();

            // 计时
            const now = getTime();

            // 基础位置数据
            const point = e.touches ? e.touches[0] : e;

            // 影响一次touchmove的移动距离
            let deltaX = point.pageX - this.startPointX;
            let deltaY = point.pageY - this.startPointY;

            // 本次移动的终点,作为下次移动起点
            this.startPointY = point.pageY;
            this.startPointX = point.pageX;

            // 当前触点和起始触点的偏移量
            this.distX += deltaX;
            this.distY += deltaY;

            const absDistX = Math.abs(this.distX);
            const absDistY = Math.abs(this.distY);

            // 如果x轴和y轴滑动距离都小于10px(灵敏度), 那么不响应
            if (now - this.endTime > 300 && this.sensitivity > absDistX && this.sensitivity > absDistY) return;

            // 拖拽的动画曲线
            this.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';

            // 一旦开始touchmove, 那么方向就定了, 除非重新touchstart
            if (undefined == this.direction && !(!this.isLockX && !this.isLockY)) {
                if (absDistX > absDistY + this.directionLockThreshold) {
                    this.direction = 'x';
                } else if (absDistY > absDistX + this.directionLockThreshold) {
                    this.direction = 'y';
                } else {
                    this.direction = 'n';
                }
            }

            // 确定方向后, 忽略其他方向的位移
            if ('x' === this.direction) {
                deltaY = 0;
            } else if ('y' === this.direction) {
                deltaX = 0;
            }

            if (!this.isLockX) {
                this.x += deltaX * (0 < this.x || this.minX > this.x ? this.moveRatio : 1);
            }

            if (!this.isLockY) {
                this.y += deltaY * (0 < this.y || this.minY > this.y ? this.moveRatio : 1);
            }

            // pull-down/pull-up
            if (0 < this.y) {
                this.$emit('pull-down', this.position);
            } else if (this.minY > this.y) {
                this.$emit('pull-up', this.position);
            }

            // pull-right/pull-left
            if (0 < this.x) {
                this.$emit('pull-right', this.position);
            } else if (this.minX > this.X) {
                this.$emit('pull-left', this.position);
            }

            // 当手指一直按住突然拖动, 那么重置起始值
            if (this.maxHolderTime < now - this.startTime) {
                this.startTime = now;
                this.startPointY = point.pageY;
                this.startPointX = point.pageX;
                this.startY = this.y;
                this.startX = this.x;
            }

            if (!this.isMoved) {
                this.$emit('scroll-start', this.position);
            }

            this.isMoved = true;

            // 派发组件事件
            this.$emit('scroll', this.position);
        },

        touchend(e) {
            // 禁用touch事件
            if (this.isDisabled) return;

            this.isStopPropagation && e.stopPropagation();
            this.isPreventDefault && !this._getExceptionForPreventDefault(e.target, this.preventDefaultException) && e.preventDefault();

            this.$emit('touchend', this.position);

            // touchmove阶段移动距离小于10px, 会造成false === isMoved
            if (!this.isMoved) {
                this.$emit('scroll-cancel');
            }

            const point = e.changedTouches ? e.changedTouches[0] : e;
            const distanceX = this.x - this.startX;
            const distanceY = this.y - this.startY;

            //  如果超出边界,后面的快速滑动判断跳过了
            if (this.resetPosition(this.bounceTime)) {
                return;
            }

            // 计算拖拽事件
            this.endTime = getTime();
            const timeDiff = this.endTime - this.startTime;

            // 200ms内的快速滑动才有缓冲动画
            if (200 > timeDiff) {
                this.isAnimating = true;
                // X轴缓动逻辑
                if (!this.isLockX) {
                    const { destination, duration } = momentum(this.x, this.startX, timeDiff, this.minX, this.isBounce ? this.warpWidth : 0, 0.0006);
                    this.scrollTo(destination, 0, duration);
                    // 稍后需要验证是否会出现duration为0的情况
                    if (0 === duration) {
                        this.$emit('scroll-end', this.position);
                    }
                }

                // Y轴缓动逻辑
                if (!this.isLockY) {
                    const { destination, duration } = momentum(this.y, this.startY, timeDiff, this.minY, this.isBounce ? this.warpHeight : 0, 0.0006);
                    this.scrollTo(0, destination, duration);
                    // 稍后需要验证是否会出现duration为0的情况
                    if (0 === duration) {
                        this.$emit('scroll-end', this.position);
                    }
                }
            } else {
                // 没有缓动, 已经停止滑动
                this.$emit('input', this.position);
                this.$emit('scroll-end', this.position);
            }
        },

        transitionend() {
            this.isAnimating = false;
            // 复位动画
            if (!this.resetPosition(this.bounceTime)) {
                this.isInTransition = false;
                this.isShowBar = false;
            }

            this.$emit('input', this.position);
            this.$emit('transition-end', {
                ...this.position,
                type: this.isResting ? 'reset' : 'inertia'
            });
            // 滑动停止
            this.$emit('scroll-end', {
                ...this.position,
                type: this.isResting ? 'reset' : 'inertia'
            });

            // 到达最底部
            if (Math.abs(this.minY) == this.position.y) {
                this.$emit('reach-bottom', {
                    ...this.position,
                    type: this.isResting ? 'reset' : 'inertia'
                });
            }

            if (this.isResting) this.isResting = false;
        },

        /**
         * [!!!应该增加对动画是快速拖拽触发的还是复位触发的!!!, 防止发生2次transiton-end而不知道是谁触发的]
         * 对发生超越边界的滚动进行复位
         * @augments {Number} time
         * @returns {Boolean} 是否发生超越边界
         * */
        resetPosition(time = 0) {
            // 当前值(活动)
            let x = this.x;
            let y = this.y;

            // 想最近点复位
            if ('x' === this.direction) {
                if (0 < this.x) {
                    x = 0;
                } else if (this.minX > this.x) {
                    x = this.minX;
                }
            } else if ('y' === this.direction) {
                if (0 < this.y) {
                    y = 0;
                } else if (this.minY > this.y) {
                    y = this.minY;
                }
            }

            // 如果没有发生超过边界
            if (x === this.x && y === this.y) {
                return false;
            }

            //滚动到最近边界
            this.scrollTo(x, y, time, 'cubic-bezier(0.25, 0.46, 0.45, 0.94)');
            this.isResting = true;
            this.$emit('rest-position');
            return true;
        },

        /**
         * 滚动到指定位置
         */
        scrollTo(x, y, duration, easing = 'cubic-bezier(0.1, 0.57, 0.1, 1)') {
            this.x = x;
            this.y = y;
            this.transitionDuration = duration;
            this.transitionTimingFunction = easing;
            this.isInTransition = 0 < duration;
        }
    },

    computed: {
        style() {
            return [
                {
                    transform: `translate3d(${Math.round(this.x)}px, ${Math.round(this.y)}px, 0)`,
                    transitionDuration: `${this.transitionDuration}ms`,
                    transitionTimingFunction: this.transitionTimingFunction
                },
                this.bodyStyle
            ];
        },

        /**
         * minY为负值
         */
        minY() {
            if (!this.isLockY) {
                if (this.warpHeight > this.bodyHeight) {
                    return 0;
                } else {
                    return this.warpHeight - this.bodyHeight;
                }
            }
        },

        maxY() {
            if (!this.isLockY) {
                return 0;
            }
        },

        /**
         * minX为负值
         */
        minX() {
            if (!this.isLockX) {
                return this.warpWidth - this.bodyWidth;
            }
        },

        maxX() {
            if (!this.isLockX) {
                return 0;
            }
        },

        /**
         * 运动数据
         */
        position() {
            return {
                x: -Math.round(this.x),
                y: -Math.round(this.y)
            };
        },

        barHeight() {
            let height = Math.round(Math.abs(this.warpHeight * this.warpHeight / this.minY));
            if (0 < this.y) {
                height = height - this.y;
            }
            return height;
        },

        barY() {
            let y = 0 < this.y ? 0 : this.y;
            return Math.round(Math.abs(y * (this.warpHeight - this.barHeight) / this.minY));
        },

        barWidth() {
            let width = Math.round(this.warpWidth * this.warpWidth / Math.abs(this.warpWidth - this.minX));
            if (0 < this.x) {
                width = width - this.x;
            }
            return width;
        },

        barX() {
            let x = 0 < this.x ? 0 : this.x;
            return Math.round(Math.abs(x * (this.warpWidth - this.barWidth) / this.minX));
        }
    },

    watch: {
        value: {
            deep: true,
            handler(value) {
                this.transitionDuration = this.speed;
                this.x = -value.x;
                this.y = -value.y;
            }
        },

        y() {
            this.$emit('scroll', this.position);
        },

        x() {
            this.$emit('scroll', this.position);
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
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

    &__body {
        position: relative;
        width: 100%;
        user-select: none;
        transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    &__bar {
        position: absolute;
        z-index: 9999;
        display: inline-block;
        background: rgba($darkest, 0.5);
        transition: top 500ms;
        transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
        &--x {
            left: 0;
            bottom: 1px;
            height: 2px;
        }

        &--y {
            top: 0;
            right: 1px;
            width: 2px;
        }
    }
}
</style>