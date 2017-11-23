<template>
    <section v-once class="atom-swiper-lazy-load">
        <img v-bind="$attrs" :data-src="src" class="swiper-lazy atom-swiper-lazy" style="margin:auto;">
        <i class="atom-swiper-lazy-preloader"></i>
    </section>
</template>
<script>
export default {
    name: 'SwiperLazyLoad',

    props: {
        src: {
            type: String
        }
    },

    mounted() {
        if (!this.$parent.$parent.options.lazy) {
            this.$parent.$parent.options.lazy = {
                preloaderClass: 'atom-swiper-lazy-preloader',
                loadPrevNext: true
            };
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$size: 0.5rem;
.atom-swiper-lazy-load {
    .atom-swiper-lazy {
        max-width: 100%;
    }
    .atom-swiper-lazy-preloader {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -$size/2;
        margin-left: -$size/2;
        display: inline-block;
        width: $size;
        height: $size;
        transform-origin: 50%;
        animation: rotate 1s 0s ease-in-out infinite;
        background: $primary;
        border-radius: 100%;
        //  background: $background;
        // border: 4px solid $base;
        // border-right-color: transparent;
    }
}

@keyframes rotate {
    0% {
        transform: scale(0);
        opacity: 0.5;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
