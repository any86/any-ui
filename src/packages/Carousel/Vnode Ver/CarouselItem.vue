<template>
    <div class="atom-carousel-item" :style="{width: `${itemWidth}%`, marginRight: `${$parent.spaceBetween}px`}">
        <v-lazy-load :src="src" :preLoad-rate="20" @loaded="isImgLoaded = true" style="margin:auto;"/>
        <v-spinner-ripple v-show="!isImgLoaded" class="item__loading"/>
        <slot></slot>
    </div>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad';
import VSpinnerRipple from '@/packages/Spinner/Ripple';
export default {
    name: 'CarouselItem',

    // inject: ['perView'],

    props: {
        value: {
            type: [Number, String],
            default: 0
        },

        src: {
            type: String
        },

        
    },

    data() {
        return {
            index: 0,
            width: 0,
            viewWidth: 0,
            isImgLoaded: false,
        };
    },

    mounted() {
        this.viewWidth = this.$parent.viewWidth;
        // this.index = this.$parent.count;
        // this.$parent.count++;
    },

    computed: {
        // /**
        //  * 加载图片
        //  * @argument {String} 图片地址
        //  */
        // lazyLoad(src) {
        //     let img = new Image();
        //     img.src = src;
        //     img.onload = e => {

        //     };
        // },

        itemWidth() {
            return 100 / this.$parent.slidesPerView;
        },

        className() {
            return {
                // 'atom-carousel-item--prev': this.$parent.prevIndex === this.index,
                // 'atom-carousel-item--active': this.$parent.activeIndex === this.index,
                // 'atom-carousel-item--next': this.$parent.nextIndex === this.index
            };
        }
    },

    components: {VLazyLoad, VSpinnerRipple}
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
@import '../../scss/mixin.scss';
.atom-carousel-item {
    position: relative;
    height: 100%;
    flex-shrink: 0;
    width: 100%;
    transition-duration: 1000ms;
    transition-property: transform;
    transition-timing-function: ease-in-out;
    >.item__loading{
        @include fulScreen;
    }
    &--prev {
        display: block;
    }

    &--active {
        display: block;
    }

    &--next {
        display: block;
    }
}
</style>
