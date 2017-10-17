<template>
    <div class="atom-scroller" v-on="$listeners">
        <div ref="body" :style="[{transform: `translate3d(${translateX}px, ${translateY}px, 0)`, transitionDuration: `${transitionDuration}ms`}, bodyStyle]" @transitionend="transitionend" @webkitTransitionend="transitionend" :class="[{table: isLockY}, bodyClass]" class="atom-scroller__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '@/utils/dom'
import debounce from 'lodash/debounce'
export default {
    name: 'Scroller',

    props: {
        disableTouch: {
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
            default: false
        },

        value: {
            type: Object,
            default: () => ({ scrollLeft: 0, scrollTop: 0 }) // 注意返回对象, 要用括号包起来
        },

        minScrollTop: {
            type: Number
        },

        maxScrollTop: {
            type: Number
        },

        minScrollLeft: {
            type: Number
        },

        maxScrollLeft: {
            type: Number
        },

        isLockX: {
            type: Boolean,
            default: true
        },

        isLockY: {
            type: Boolean,
            default: false
        },

        lockThreshold: {
            type: Number,
            default: 15
        },

        hasBuffer: {
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

        isFreeScroll: {
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
            isAnimateMoving: false,
            moveRatio: 1,
            speed: 0,
            startTime: 0,
            endTime: 0,

            startPointY: 0, // 手指坐标
            startPointX: 0,

            directionX: 0,
            directionY: 0,
            directionLock: 'n',

            transitionDuration: 0,

            viewWidth: 0,
            viewHeight: 0,

            translateX: 0,
            translateY: 0,
            maxTranslateX: 0,
            maxTranslateY: 0,
            startTranslateX: 0,
            startTranslateY: 0,
            events: ['touchstart', 'touchmove', 'touchend', 'transitionend', 'webkitTransitionend'],
        };
    },

    created() {
        // 初始scroll-body位置
        this.translateX = -this.value.scrollLeft;
        this.translateY = -this.value.scrollTop;
    },

    mounted() {
        this.addEvents(this.isBindBody ? this.$refs.body : this.$el);
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    },

    methods: {
        /**
         * 绑定touch系列事件
         * @argument {Element}
         */
        addEvents(el) {
            this.events.forEach(evnetName => {
                el.addEventListener(evnetName, this[evnetName], { passive: !this.preventDefault });
            });
        },
        /**
         * 解除绑定touch系列事件
         * @argument {Element}
         */
        removeEvents(el) {
            this.events.forEach(evnetName => {
                el.removeEventListener(evnetName, this[evnetName]);
            });
        },
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
                this.maxTranslateX = getWidth(this.$refs.body, { isScroll: true }) - this.viewWidth;
            } else if (this.isLockX) {
                this.viewHeight = getHeight(this.$el);
                this.maxTranslateY = getHeight(this.$refs.body, { isScroll: true }) - this.viewHeight;
            }
        },

        touchstart(e) {
            if (this.disableTouch) return;
            const point = e.touches ? e.touches[0] : e;
            this.transitionDuration = 0;
            this.startTime = getTime();
            // 记录当前触碰点在屏幕上的坐标
            this.startPointY = point.pageY;
            this.startPointX = point.pageX;

            // 判断起点是否边缘
            let edge = '';
            // 四个角度肯定是不精准了, 不过暂时觉得没什么实际意义
            if (this.edgeThreshold > point.pageX) {
                edge = 'left';
            } else if (this.viewWidth - this.edgeThreshold < point.pageX) {
                edge = 'right';
            } else if (this.edgeThreshold > point.pageY) {
                edge = 'top';
            } else if (this.viewHeight - this.edgeThreshold < point.pageY) {
                edge = 'bottom';
            }

            // 记录滑动前scroll-body的translate信息
            this.startTranslateY = this.translateY;
            this.startTranslateX = this.translateX;
            e.stopPropagation();
            // 阻止浏览器默认行为
            this.preventDefault && e.preventDefault();
            this.$emit('scroll-start', { ...this.moveData, e, edge });
        },
        touchmove(e) {
            if (this.disableTouch) return;
            // 都lock了就不用计算了.
            if (this.isLockX && this.isLockY) return;
            // 如果不同时锁定
            // 基础位置数据
            const point = e.touches ? e.touches[0] : e;
            const deltaY = point.pageY - this.startPointY;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaY = Math.abs(deltaY);
            const absDeltaX = Math.abs(deltaX);
            const now = getTime();
            // 灵敏度默认为10px;
            // 手指移动超过10px, scroll-body才开始随手指滑动;
            if ((this.sensitivity < absDeltaY || this.sensitivity < absDeltaX)) {
                // 锁定X轴的移动
                // 锁定Y
                // 自由移动
                if (this.isLockX && !this.isLockY) {
                    // 当scroll-body的位置超出边界, 那么滑动距离 : 手指移动距离 = 1 : 2
                    this.moveRatio = this.isOutOfYLimit ? .5 : 1;
                    this.translateY = this.startTranslateY + deltaY * this.moveRatio;
                    this.directionLock = 'x';
                } else if (this.isLockY && !this.isLockX) {
                    this.moveRatio = this.isOutOfXLimit ? .5 : 1;
                    this.translateX = this.startTranslateX + deltaX * this.moveRatio;
                } else if (!this.isLockX && !this.isLockY) {
                    if (absDeltaY + this.lockThreshold < absDeltaY) {

                    } else if (absDeltaX + this.lockThreshold < absDeltaX) {

                    }
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

            // 限制滑动区域
            if (undefined !== this.maxScrollLeft && this.maxScrollLeft < this.translateX) {
                this.translateX = this.maxScrollLeft
            } else if (undefined !== this.minScrollLeft && this.minScrollLeft > this.translateX) {
                this.translateX = this.minScrollLeft
            }
            e.stopPropagation();
            // 阻止默认行为(页面滚动)
            this.preventDefault && e.preventDefault();
            this.$emit('input', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            this.$emit('scroll-move', { ...this.moveData, e });
        },

        touchend(e) {
            if (this.disableTouch) return;
            this.transitionDuration = 500;
            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;

            // buffer
            if (this.hasBuffer) {
                this.bufferMove();
            }
            e.stopPropagation();
            this.preventDefault && e.preventDefault();
            this.$emit('update:isAnimateMoving', true);
            this.$emit('input', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            this.$emit('scroll-leave', { ...this.moveData, e });
        },

        transitionend() {
            if (this.disableTouch) return;
            // this.$emit('update:isAnimateMoving', false);
            this.$nextTick(() => {
                this.isAnimateMoving = false;
                this.$emit('scroll-end', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            });
        },
        /**
         * 开启缓冲运动
         */
        bufferMove() {
            const costTime = this.endTime - this.startTime;
            if (this.isLockY) {
                if (this.maxHolderTime > costTime) {
                    const deltaX = this.translateX - this.startTranslateX;
                    const speedX = deltaX / costTime;
                    this.translateX += speedX * 1000;
                    this.isAnimateMoving = true;
                }
                // 自动复位
                this.hasReset && this.resetX();
            } else if (this.isLockX) {
                if (this.maxHolderTime > costTime) {
                    const deltaY = this.translateY - this.startTranslateY;
                    const speedY = deltaY / costTime;
                    this.translateY += speedY * 1000;
                    this.isAnimateMoving = true;
                }
                //自己复位
                this.hasReset && this.resetY();
            }
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

    computed: {
        isOutOfTopLimit() {
            return 0 < this.translateY;
        },

        isOutOfBottomLimit() {
            return this.maxTranslateY < 0 - this.translateY;
        },

        isOutOfLeftLimit() {
            return 0 < this.translateX;
        },

        isOutOfRightLimit() {
            return this.maxTranslateX < 0 - this.translateX;
        },

        isOutOfXLimit() {
            return this.isOutOfRightLimit || this.isOutOfLeftLimit;
        },

        isOutOfYLimit() {
            return this.isOutOfTopLimit || this.isOutOfBottomLimit;
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
                deltaY: this.translateY - this.startTranslateY,
            };
        }
    },

    watch: {
        value: {
            deep: true,
            handler(value) {
                // if (!this.isAnimateMoving) {
                this.transitionDuration = 500;
                this.translateY = -value.scrollTop;
                this.translateX = -value.scrollLeft;
                // }
            }
        }
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.updateSize);
        this.removeEvents(this.isBindBody ? this.$refs.body : this.$el);
    }

}
</script>
<style scoped lang=scss>
.atom-scroller {
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
