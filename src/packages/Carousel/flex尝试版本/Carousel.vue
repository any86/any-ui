<template>
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" class="atom-carousel">
        <div ref="body" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" @transitionEnd="transitionEnd" @webkitTransitionEnd="transitionEnd" class="atom-carousel__body">
            <div v-if="isLoop" :style="{order: orderMatrix[0]}" class="atom-carousel-item"></div>
            <slot></slot>
            <div v-if="isLoop" :style="{order: orderMatrix[count + 1]}" class="atom-carousel-item"></div>
        </div>
        <h2>{{orderMatrix}}</h2>
        <h3>{{activeIndex}}</h3>
        <h2>{{translateX}}</h2>
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
            default: 30
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
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        hasPaging: true,
        orderMatrix: [],
        timer: null,
        afterSliderTransitonend: () => {}
    }),

    created() {
        // this.slideTo(this.value, 0);
        // this.orderMatrix = this.calcMatrix(3);
    },

    mounted() {
        this.warpWidth = getWidth(this.$el);
        this.slideTo(this.value, 0);
        this.orderMatrix = this.calcMatrix(this.count);
        // if (this.isLoop) {
        //     this.timer = setInterval(() => {
        //         this.activeIndex++;
        //         this.slideTo(this.activeIndex, this.speed, index => {
        //             if (this.count - 1 == this.activeIndex) {
        //                 // 当到达最后一页, 准备fake第一页
        //                 this.orderMatrix = this.calcMatrix(this.count, this.lastIndex, 0);
        //             } else if (this.count == this.activeIndex) {
        //                 this.orderMatrix = this.calcMatrix(this.count);
        //                 this.slideTo(0, 0);
        //             }
        //         });
        //     }, this.autoplay.delay);
        // }
    },

    methods: {
        /**
         * 这里的index都是slider的索引, 不算入两端fake的slider
         * @argument {Number} length
         * @argument {Number} fromIndex
         * @argument {Number} toIndex
         */
        calcMatrix(length, fromIndex, toIndex) {
            let array = [];
            const lastIndex = length - 1;
            for (let i = -1; i <= length; i++) {
                array.push(i);
            }
            // 如果值传入length, 那么返回一般情况的排序
            if (1 < arguments.length) {
                if (lastIndex === fromIndex && 0 === toIndex) {
                    // 从尾部到头部
                    array[1] = array[length + 1];
                    array[length + 1] = 0;
                } else if (0 === fromIndex && lastIndex === toIndex) {
                    // 从头部到尾部
                    array[0] = lastIndex;
                    array[length] = -1;
                }
            }
            return array;
        },

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
            clearInterval(this.timer);
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
                this.translateX = this.startTranslateX;
                this.isAnimating = false;
            }

            // 在滑动发生前做些对2端faker的定位处理
            // 如果, 阈值范围内, 那么进行order交换操作
            // 反之, 拖拽超过阈值, 可以滑动
            if (this.threshold < absDeltaX) {
                // 向右拖拽情况
                if (0 < deltaX) {
                    //  交换order
                    // 如果当前第一张
                    if (0 === this.activeIndex) {
                        this.orderMatrix = this.calcMatrix(this.count, 0, this.lastIndex);
                    } else if (-1 === this.activeIndex) {
                        // 返回一般情况矩阵
                        this.orderMatrix = this.calcMatrix(this.count);
                        this.slideTo(this.count - 1, 0);
                    } else if (this.count === this.activeIndex) {
                        this.orderMatrix = this.calcMatrix(this.count);
                        this.slideTo(0, 0);
                    } else {
                        this.orderMatrix = this.calcMatrix(this.count);
                    }
                } else {
                    // 向左拖拽
                    // 交换order
                    // 如果当前最后一张
                    if (this.count - 1 === this.activeIndex) {
                        // 和第一张交换位置
                        this.orderMatrix = this.calcMatrix(this.count, this.lastIndex, 0);
                    } else if (this.count === this.activeIndex) {
                        this.orderMatrix = this.calcMatrix(this.count);
                        this.slideTo(0, 0);
                    } else if (-1 == this.activeIndex) {
                        this.orderMatrix = this.calcMatrix(this.count);
                        this.slideTo(this.lastIndex, 0);
                    } else {
                        this.orderMatrix = this.calcMatrix(this.count);
                    }
                }

                this.translateX = this.startTranslateX + deltaX - absDeltaX / deltaX * this.threshold;
            }

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
            this.$emit('change', { realIndex: this.realIndex, activeIndex: this.activeIndex });
        },

        realIndex(realIndex) {
            this.$emit('input', realIndex);
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
