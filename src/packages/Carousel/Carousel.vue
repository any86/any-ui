<template>
    <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" class="atom-carousel">
        <div :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" class="atom-carousel__body">
            <div v-if="isLoop" :style="{order: -2}" class="atom-carousel-item"></div>
            <slot></slot>
            <div v-if="isLoop" :style="{order: count}" class="atom-carousel-item"></div>
        </div>
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
            default: 10
        }
    },

    data: () => ({
        count: 0,
        indexCounter: 0,
        viewWidth: 0,
        activeIndex: 0,
        isAnimating: false,
        startPointX: 0,
        transitionDuration: 0,
        translateX: 0,
        startTranslateX: 0,
        hasPaging: true,
        fakeVNodes: null
    }),

    created() {
        // this.slideTo(this.value, 0);
    },

    beforeMount() {
        this.viewWidth = getWidth(this.$el);
        this.slideTo(this.value, 0);
    },

    mounted() {},

    methods: {
        touchStart(e) {
            e.stopPropagation();
            e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            this.startPointX = point.pageX;
            this.startTranslateX = this.translateX;
            this.transitionDuration = 0;
        },

        touchMove(e) {
            e.stopPropagation();
            e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);

            // 拖拽超过阈值才可以滑动
            if (this.threshold < absDeltaX) {
                this.translateX = this.startTranslateX + deltaX + this.threshold;
            }
        },

        touchEnd(e) {
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const deltaX = point.pageX - this.startPointX;
            const absDeltaX = Math.abs(deltaX);

            // 判断边界
            if (this.maxTranslateX >= this.translateX && this.minTranslateX <= this.translateX) {
                // next / prev
                if (15 < absDeltaX) {
                    this.activeIndex -= absDeltaX / deltaX;
                }
            }

            this.slideTo(this.activeIndex);
        },

        slideTo(index, duration = 300) {
            this.isAnimating = 0 < duration && true;
            this.transitionDuration = duration;
            this.activeIndex = index;
            this.translateX = ((this.isLoop ? -1 : 0) - index) * this.viewWidth;
            this.startTranslateX = this.translateX;
        },

        transitionEnd() {
            this.isAnimating = false;
            this.transitionDuration = 0;
        }
    },

    watch: {
        value(value) {
            // if (this.count > value && -1 < value) {
                this.slideTo(value);
            // }
        }
    },

    computed: {
        maxTranslateX() {
            return 0;
        },

        minTranslateX() {
            return 0 - (this.count - 1) * this.viewWidth;
        },

        maxStep() {
            return this.viewWidth / this.slidesPerView;
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
