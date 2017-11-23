<template>
    <div class="atom-swiper swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
export default {
    name: 'Swiper',

    props: {
        options: {
            type: Object,
            default: () => ({})
        },

        hasPagination: {
            type: Boolean,
            default: true
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
        // 默认配置
        const defaultOpts = {
            initialSlide: this.value,
            autoplay: {
                delay: 3000
            },
            loop: true,
            lazy: false,
            // autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets'
            }
        };

        // 合并用户配置
        let opts = Object.assign(defaultOpts, this.options);
        this.swiper = new Swiper(this.$el, defaultOpts);

        this.swiper.on('slideChange', swiper => {
            this.$emit('slide-change', this.swiper);
            this.$emit('input', this.swiper.realIndex);
        });

        this.swiper.on('slideChangeTransitionStart', swiper => {
            this.$emit('slide-change-transition-start', this.swiper);
        });

        this.swiper.on('slideChangeTransitionEnd', swiper => {
            this.$emit('slide-change-transition-end', this.swiper);
        });
    },

    watch: {
        value(value) {
            if (!this.swiper.animating) {
                this.swiper.slideTo(value);
            }
        }
    },

    destroy() {
        this.swiper.destroy();
        this.swiper = null;
    }
};
</script>
<style lang="scss">
@import '../../scss/theme.scss';
// @import '~swiper/dist/css/swiper.css';
.atom-swiper {
    position: relative;
}

.swiper-pagination-bullets {
    bottom: 10px;
    left: 0;
    width: 100%;
}

.swiper-pagination-bullet {
    &-active {
        border-radius: $big;
        background: rgba($base, 0.7);
        width: $big;
    }
}
</style>
