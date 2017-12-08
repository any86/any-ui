<template>
    <div class="atom-carousel-item" :style="{order: order, width: `${itemWidth}%`, marginRight: `${$parent.spaceBetween}px`}">
        <!-- <v-lazy-load :src="src" :preLoad-rate="20" @loaded="isImgLoaded = true" style="margin:auto;"/> -->
        <!-- <v-spinner-ripple v-show="!isImgLoaded" class="item__loading"/> -->
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
            order: 0
        };
    },

    mounted() {
        this.viewWidth = this.$parent.viewWidth;
        this.order = this.index = this.$parent.count;
        this.$parent.count++;
        // this.order = -1;
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

</style>
