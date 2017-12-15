<template>
    <div class="atom-carousel-item" :style="{order: index,  marginRight: `${$parent.spaceBetween}px`}">
        <slot></slot>
        <v-spinner-ripple  class="item__loading"/>
    </div>
</template>
<script>
import VSpinnerRipple from '@/packages/Spinner/Ripple';
export default {
    name: 'CarouselItem',

    // inject: ['perView'],

    data() {
        return {
            index: 0,
            width: 0,
            hasImage: true
        };
    },

    mounted() {
        // this.warpWidth = this.$parent.warpWidth;
        this.index = this.$parent.count;
        this.$parent.count++;
        this.$nextTick(()=>{
            if(0 === this.$parent.imageStore[this.index].length) {
                this.hasImage = false;
            }
        })
        
    },

    computed: {
        itemWidth() {
            return this.$parent.warpWidth / this.$parent.slidesPerView;
        }
    },
    components: { VSpinnerRipple }
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.atom-carousel-item {
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    > .item__loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 6;
        opacity: 0;
    }

    img[lazy-src] {
        opacity: 0;
        & + .item__loading {
            opacity: 1;
        }
    }

    img[lazy-status='done'] {
        animation: fadeIn 1000ms;
        & + .item__loading {
            display: none;
        }
    }




    /* 关于一页多张图片加载的逻辑, 慢慢想 */
    /* img:not([lazy-status='done']) {
        & + .item__loading {
            display: inline-block;
        }
    } */

}
</style>
