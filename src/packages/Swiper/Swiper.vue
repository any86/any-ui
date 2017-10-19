<template>
    <div class="atom-swiper swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div v-if="hasPagination" class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
export default {
    name: 'Swiper',

    props: {
        options: {
            type: Object
        },

        hasPagination: {
            type: Boolean,
            default: false
        },

        value: {
            type: [Number, String],
            default: 0
        }
    },

    data() {
        return {
            swiper: null
        };
    },

    mounted() {
        // 生成实例
        this.swiper = new Swiper(this.$el, {
            slidesPerView: 1,
            pagination: '.swiper-pagination',
            touchMoveStopPropagation: true
        });

        this.swiper.on('slideChange', swiper => {
            dir(swiper);
            this.$emit('input', this.value);
            this.$emit('change-start', swiper);
        });
    },

    watch: {
        // value(value) {
        //     this.swiper.slideTo(value);
        // }
    },

    destroy() {
        this.swiper.destroy();
        this.swiper = null;
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
</style>
