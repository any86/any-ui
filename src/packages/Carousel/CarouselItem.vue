<template>
    <div class="atom-carousel-item" :style="{order: index, width: `${itemWidth}%`, marginRight: `${$parent.spaceBetween}px`}">
        <slot></slot>
        <v-spinner-ripple v-show="!isImgLoaded" class="item__loading" />
    </div>
</template>
<script>
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
        }
    },

    data() {
        return {
            index: 0,
            width: 0,
            viewWidth: 0,
            isImgLoaded: false
        };
    },

    mounted() {
        this.viewWidth = this.$parent.viewWidth;
        this.index = this.$parent.count;
        this.$parent.count++;
    },

    computed: {
        itemWidth() {
            return 100 / this.$parent.slidesPerView;
        }
    },
    components: { VSpinnerRipple }
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.atom-carousel-item {
    > .item__loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 6;
    }

    img[lazy-src] {
        opacity: 0;
    }

    img[lazy-status='done'] {
        animation: fadeIn 1000ms;
        &+.item__loading{
            display: none;
        }
    }
}
</style>
