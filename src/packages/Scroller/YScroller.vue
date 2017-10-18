<template>
    <div class="atom-y-scroller" v-on="$listeners">
        <div ref="body" :style="[{transform: `translate3d(0, ${translateY}px, 0)`, transitionDuration: `${transitionDuration}ms`}, bodyStyle]" @transitionend="transitionend" @webkitTransitionend="transitionend" :class="bodyClass" class="atom-y-scroller__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getHeight, getWidth, getTime } from '@/utils/dom'
import debounce from 'lodash/debounce'
export default {
    name: 'YScroller',

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

        preventDefault: {
            type: Boolean,
            default: false
        },

        value: {
            type: Number,
            default: 0
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


            transitionDuration: 0,

            viewHeight: 0,

            translateY: 0,
            maxTranslateY: 0,
            startTranslateY: 0,
            events: ['touchstart', 'touchmove', 'touchend', 'transitionend', 'webkitTransitionend'],
        };
    },

    created() {
        // 初始scroll-body位置
        this.translateY = -this.value;
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
            this.viewHeight = getHeight(this.$el);
            this.maxTranslateY = getHeight(this.$refs.body, { isScroll: true }) - this.viewHeight;
        },

        touchstart(e) {
            e.stopPropagation();
            // 禁用touch事件
            if (this.disableTouch) return;
            const point = e.touches ? e.touches[0] : e;
            this.transitionDuration = 0;
            this.startTime = getTime();
            // 记录当前触碰点在屏幕上的坐标
            this.startPointY = point.pageY;

            // 记录滑动前scroll-body的translate信息
            this.startTranslateY = this.translateY;

            // 阻止浏览器默认行为
            this.preventDefault && e.preventDefault();
            this.$emit('scroll-start', { ...this.moveData, e });
        },
        touchmove(e) {
            e.stopPropagation();
            // 禁用touch事件
            if (this.disableTouch) return;

            // 这句没看懂iscroll的意义
            const now = getTime();
            // if(300 < now - this.endTime) return;

            // 基础位置数据
            const point = e.touches ? e.touches[0] : e;
            let deltaY = point.pageY - this.startPointY;
            let absDeltaY = Math.abs(deltaY);

            // 如果x轴和y轴滑动距离都小于10px(灵敏度), 那么不响应
            if (this.sensitivity > absDeltaY) return;

            // ========== 计算滑动 ==========




            // 移动
            this.moveRatio = this.isOutOfYLimit ? .5 : 1;
            this.translateY = this.startTranslateY + deltaY * this.moveRatio;

            // 控制translateY在范围内
            if (this.maxTranslateY < 0 - this.translateY) {
                this.translateY = 0 - this.maxTranslateY;
            } else if (0 < this.translateY) {
                this.translateY = 0;
            }

            // 当手指一直按住突然拖动, 那么重置起始值
            if (this.maxHolderTime < now - this.startTime) {
                this.startTime = now;
                this.startPointY = point.pageY;
                this.startTranslateY = this.translateY;
            }


            // 阻止默认行为(页面滚动)
            this.preventDefault && e.preventDefault();
            this.$emit('input', -this.translateY);
            this.$emit('scroll-move', { ...this.moveData, e });
        },

        touchend(e) {
            e.stopPropagation();
            // 禁用touch事件
            if (this.disableTouch) return;
            this.transitionDuration = 500;
            this.endTime = getTime();
            const point = e.changedTouches ? e.changedTouches[0] : e;

            // buffer
            if (this.hasBuffer) {
                this.bufferMove(point);
            }
            this.preventDefault && e.preventDefault();
            this.$emit('update:isAnimateMoving', true);
            this.$emit('input', -this.translateY);
            this.$emit('scroll-leave', { ...this.moveData, e });
        },

        transitionend() {
            if (this.disableTouch) return;
            // this.$emit('update:isAnimateMoving', false);
            this.$nextTick(() => {
                this.isAnimateMoving = false;
                this.$emit('scroll-end', 0 - this.translateY);
            });
        },
        /**
         * 开启缓冲运动
         */
        bufferMove(point) {
            const costTime = this.endTime - this.startTime;
            const deltaY = point.pageY - this.startPointY;
            this.isAnimateMoving = true;
            if (this.maxHolderTime > costTime) {
                const speedY = deltaY / costTime;
                this.translateY += speedY * 1000;
            }
            //自己复位
            this.hasReset && this.resetY();
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
                pointY: this.startPointY,
                deltaY: this.translateY - this.startTranslateY,
            };
        }
    },

    watch: {
        value(value) {
            // if (!this.isAnimateMoving) {
            this.transitionDuration = 500;
            this.translateY = 0 - value;
            // }
        }
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.updateSize);
        this.removeEvents(this.isBindBody ? this.$refs.body : this.$el);
    }

}
</script>
<style scoped lang=scss>
.atom-y-scroller {
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
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transition-duration: 0ms;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
}
</style>
