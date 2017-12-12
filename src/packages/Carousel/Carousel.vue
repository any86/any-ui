<template>
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" class="atom-carousel">
        <div ref="body" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" @transitionEnd="transitionEnd" @webkitTransitionEnd="transitionEnd" class="atom-carousel__body">
            <slot></slot>
        </div>
        <h3>activeIndex: {{activeIndex}}</h3>
        <h3>translateX: {{translateX}}</h3>
        <h3>startTranslateX: {{startTranslateX}}</h3>
        <h3>realIndex: {{realIndex}}</h3>
    </div>
</template>

<script>
import { getHeight, getWidth } from '@/utils/dom';
import throttle from 'lodash/throttle';
import times from 'lodash/times';

export default {
    name: 'Carousel',

    // provide: {
    //     perView: 1
    // },

    props: {
        value: {
            default: 0
        },

        slidesPerView: {
            type: [Number, String],
            default: 1
        },

        isLoop: {
            type: Boolean,
            default: true
        },

        spaceBetween: {
            type: [Number, String],
            default: 0
        },

        threshold: {
            type: Number,
            default: 0
        },

        autoplay: {
            type: [Object, Boolean],
            default: () => ({
                delay: 1000
            })
        },

        speed: {
            type: Number,
            default: 300
        }
    },

    data: () => ({
        count: 0,
        indexCounter: 0,
        warpWidth: 0,
        activeIndex: 0,
        isAnimating: false,
        startTime: 0,
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        hasPaging: true,
        orderMatrix: [],
        timer: null,
        afterSliderTransitonend: () => {},
        isItemAllMounted: false
    }),

    created() {
        // this.slideTo(this.value, 0);
        // this.orderMatrix = this.calcMatrix(3);
    },

    beforeMount() {},

    mounted() {
        this.warpWidth = getWidth(this.$el);
        // 构造loop所需dom结构
        // 因为用了order控制顺序了, 就不用insertBefore了
        if (this.isLoop) {
            const headFakeNode = this.$children[this.$children.length - 1].$el.cloneNode(true);
            const lastFakeNode = this.$children[0].$el.cloneNode(true);
            headFakeNode.style.order = -1;
            lastFakeNode.style.order = this.count;
            this.$refs.body.appendChild(headFakeNode);
            this.$refs.body.appendChild(lastFakeNode);
        }
        this.slideTo(this.value, 0);
    },

    methods: {
        /**
         * 获取动画过程中的body的实时的translateX
         */
        getTranslateX() {
            // https://github.com/nolimits4web/Swiper/blob/master/src/utils/utils.js
            // 写的兼容性不完整, 后期修改参考swiper.js的getTranslate
            const style = getComputedStyle(this.$refs.body, null);
            const matrix = style.transform.split(',');
            return Math.round(matrix[4]);
        },

        touchStart(e) {
            e.stopPropagation();
            // e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            this.startPointX = point.pageX;
            this.startTranslateX = this.translateX;
            this.transitionDuration = 0;
            this.startTime = Date.now();
        },

        touchMove(e) {
            e.stopPropagation();
            e.preventDefault();
            // if(this.isAnimating) return;
            const point = e.touches ? e.touches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);
            if (this.isAnimating) {
                const currentTranslateX = this.getTranslateX();
                this.startTranslateX = currentTranslateX;
                // log(this.startTranslateX)
                // this.startPointX = point.pageX;
                this.translateX = this.startTranslateX;
                this.isAnimating = false;
            }
            this.translateX = this.startTranslateX + deltaX + this.threshold;

            // 边界自动复位
            if (this.isLoop) {
                if (this.count == this.activeIndex) {
                    // 正翻, 超过count代表已经到达尾部的fake
                    const offset = this.startTranslateX % this.warpWidth;
                    // 2种情况
                    // 1. 从静止状态拖拽
                    // 2. 从运动状态拖拽
                    if (0 === offset) {
                        this.slideTo(0, 0);
                    } else {
                        this.translateX = offset;
                        this.startTranslateX = this.translateX;
                        this.activeIndex = 0;
                    }
                } else if (-1 == this.activeIndex) {
                    // 回翻,
                    const offset = this.startTranslateX % this.warpWidth;
                    if (0 === offset) {
                        this.slideTo(this.count - 1, 0);
                    } else {
                        this.translateX = this.minTranslateX + (this.warpWidth + offset);
                        this.startTranslateX = this.translateX;
                        this.activeIndex = this.count - 1;
                    }
                }
            }

            // 超过阈值开始滑动
            // if (this.threshold < absDeltaX) {
            //     if (0 < deltaX) {
            //         // 向右拖拽0->-1 / 3->2->1
            //         this.translateX = this.startTranslateX + deltaX - this.threshold;
            //     } else {
            //         // 向左拖拽
            //         this.translateX = this.startTranslateX + deltaX + this.threshold;
            //     }
            // }
        },

        touchEnd(e) {
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);
            const absTranlateX = Math.abs(this.translateX);

            // 判断边界
            if (this.maxTranslateX >= this.translateX && this.minTranslateX <= this.translateX) {
                // 针对isLoop做activeIndex的偏移
                let activeIndex = absTranlateX / this.warpWidth - 1 + (this.isLoop ? 0 : 1);
                if (0.1 < 0 - deltaX / absDeltaX * Math.abs(activeIndex)) {
                    this.activeIndex = Math.ceil(activeIndex);
                } else {
                    this.activeIndex = Math.floor(activeIndex);
                }
            }

            this.slideTo(this.activeIndex);
        },

        slideTo(index, duration = this.speed, callback = () => {}) {
            this.isAnimating = 0 < duration && true;
            this.transitionDuration = duration;
            this.activeIndex = index;
            this.translateX = ((this.isLoop ? -1 : 0) - index) * this.warpWidth;
            this.startTranslateX = this.translateX;
            this.afterSliderTransitonend = callback;
        },

        transitionEnd() {
            this.isAnimating = false;
            this.transitionDuration = 0;
            // this.startTranslateX = this.translateX;
            this.afterSliderTransitonend(this.activeIndex);
        }
    },

    watch: {
        value(value) {
            // if (this.count > value && -1 < value) {
            // this.slideTo(value);
            // }
        },

        activeIndex(activeIndex) {
            // this.slideTo(activeIndex);
        }
    },

    computed: {
        maxTranslateX() {
            return 0;
        },

        minTranslateX() {
            return 0 - (this.count - (this.isLoop ? -1 : 1)) * this.warpWidth;
        },

        maxStep() {
            return this.warpWidth / this.slidesPerView;
        },

        lastIndex() {
            return this.count - 1;
        },

        realIndex(){
            let realIndex = this.activeIndex;
            if (this.count === this.activeIndex){
                realIndex = 0;
            } else if(-1 === this.activeIndex){
                realIndex = this.count - 1;
            }
            return realIndex;
        }
    },

    components: {}
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: 0.5rem;
.atom-carousel {
    position: relative;
    width: 100%;
    overflow: hidden;

    &__body {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        transition-duration: 0ms;

        >>>.atom-carousel-item {
            position: relative;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            transition-duration: 1000ms;
            transition-property: transform;
            transition-timing-function: ease-in-out;
        }
    }

    &__paging {
        position: absolute;
        bottom: 15px;
        left: 0;
        text-align: center;
        width: 100%;
        > .paging__button {
            display: inline-block;
            margin: 0 4px;
            height: 8px;
            width: 8px;
            border-radius: 8px;
            background: rgba($dark, 0.6);
            /* transition: all $duration; */
            &--active {
                width: 16px;
                /* transform: scale(1.2); */
                background: rgba($base, 0.7);
            }
        }
    }

    &__overlay {
        position: absolute;
        z-index: 1986;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
