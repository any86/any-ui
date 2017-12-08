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
        // if(0 == this.$parent.activeIndex && this.$parent.count == this.index) {
        //     this.order = -1;
        // }
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

    watch: {
        ['$parent.headOrder'](headerOrder){
            // 如果当前是最后一项, 那么改变order为-1;
            if(this.$parent.count -1 === this.index) {
                if(-1 == headerOrder) {
                    this.order = this.index;
                } else {
                    this.order = -1;
                }
            }
        },

        ['$parent.lastOrder'](lastOrder){
            // 如果本页是第一张
            if(0 === this.index) {
                if(0 == lastOrder) {
                    this.order = this.$parent.count;
                }
            }
        }
    },

    components: {VLazyLoad, VSpinnerRipple}
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
@import '../../scss/mixin.scss';

</style>
