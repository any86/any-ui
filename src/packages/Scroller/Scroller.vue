<template>
    <div class="atom-scroller" v-on="$listeners">
        <div ref="body" :style="[{transform: `translate3d(${translateX}px, ${translateY}px, 0)`, transitionDuration: `${transitionDuration}ms`}, bodyStyle]" @transitionend="transitionend" @webkitTransitionend="transitionend" :class="bodyClass" class="atom-scroller__body">
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
            default: () => { }
        },

        bodyClass: {
            type: Object,
            default: () => { }
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
            isBufferMoving: false,
            moveRatio: 1,
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
            // stopPropagation | preventDefault必须放在顶部, 不然下面的return false 会阻止代码运行
            e.stopPropagation();
            // 阻止浏览器默认行为
            this.preventDefault && e.preventDefault();

            // 禁用touch事件
            if (this.isDisableTouch) return;

            // ========== 计算滑动 ========== 
            const point = e.touches ? e.touches[0] : e;
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
            e.stopPropagation();
            this.preventDefault && e.preventDefault();
            // 禁用touch事件[停止运行]
            if (this.isDisableTouch) return;

            // x/y都lock了[停止运行]
            if (this.isLockX && this.isLockY) return;

            // 这句没看懂iscroll的意义, 先直接拿过来[停止运行]
            const now = getTime();
            // if(300 < now - this.endTime) return;

            // 基础位置数据
            const point = e.touches ? e.touches[0] : e;
            let deltaY = point.pageY - this.startPointY;
            let deltaX = point.pageX - this.startPointX;
            let absDeltaY = Math.abs(deltaY);
            let absDeltaX = Math.abs(deltaX);

            // 如果x轴和y轴滑动距离都小于10px(灵敏度), 那么不响应
            if (this.sensitivity > absDeltaY && this.sensitivity > absDeltaX) return;

            // ========== 计算滑动 ==========
            if (!this.isLockX && this.isLockY) {
                // X轴可拖拽

                // 如果x轴向移动没超过y轴+阈值[停止运行]
                if (absDeltaX < absDeltaY + this.directionLockThreshold) return;

                // 如果X轴向内容没有溢出[停止运行]
                if (!this.isOverflowX) return;

                // 超出边界减慢拖拽移动速度
                this.moveRatio = this.isOutOfXLimit ? .3 : 1;
                this.translateX = this.startTranslateX + deltaX * this.moveRatio;
            } else if (this.isLockX && !this.isLockY) {
                // Y轴可拖拽
                if (absDeltaY < absDeltaX + this.directionLockThreshold) return;
                if (!this.isOverflowY) return;
                this.moveRatio = this.isOutOfYLimit ? .3 : 1;
                this.translateY = this.startTranslateY + deltaY * this.moveRatio;
            } else {
                // 自由移动, 最上面已经对禁用移动判断过了
                this.moveRatio = 1;
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
            // 派发组件事件
            this.$emit('input', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            this.$emit('scroll-move', { ...this.moveData, e });
        },

        touchend(e) {
            e.stopPropagation();
            this.preventDefault && e.preventDefault();
            // 禁用touch事件
            if (this.isDisableTouch) return;
            this.transitionDuration = 500;
            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;

            // 缓冲运动
            if (this.hasBufferMove) {
                this.bufferMove(point);
                // 派发事件
                this.$emit('buffer-move', true);
            }

            // 派发事件     
            this.$emit('input', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            this.$emit('scroll-leave', { ...this.moveData, e });
        },

        transitionend() {
            if (this.isDisableTouch) return;
            if (this.hasBufferMove) {
                this.$emit('buffer-move', false);
            }
            this.$nextTick(() => {
                this.isBufferMoving = false;
                this.$emit('scroll-end', { scrollTop: -this.translateY, scrollLeft: -this.translateX });
            });
        },
        /**
         * 开启缓冲运动
         */
        bufferMove(point) {
            const costTime = this.endTime - this.startTime;
            const deltaX = point.pageX - this.startPointX;
            const deltaY = point.pageY - this.startPointY;
            this.isBufferMoving = true;
            if (!this.isLockX && this.isLockY) {
                // X轴可拖拽
                if (this.maxHolderTime > costTime) {
                    const speedX = deltaX / costTime;
                    this.translateX += speedX * 1000;
                }
                // 自动复位
                this.hasReset && this.resetX();
            } else if (this.isLockX && !this.isLockY) {
                // Y轴可拖拽
                if (this.maxHolderTime > costTime) {
                    const speedY = deltaY / costTime;
                    this.translateY += speedY * 1000;
                }
                // 自动复位
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
        isOverflowX() {
            return 0 < this.maxTranslateX;
        },

        isOverflowY() {
            return 0 < this.maxTranslateY;
        },

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
                // if (!this.isBufferMoving) {
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
