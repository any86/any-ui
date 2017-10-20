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
export default {
    name: 'Swiper',

    props: {
        options: {
            type: Object
        },

        delay: {
            type: Number,
            default: 3000
        },

        loop: {
            type: Boolean,
            default: false
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
        // 合并配置
        let opts = Object.assign(
            {
                initialSlide: this.value,
                loop: this.loop,
                autoplay: {
                    delay: this.delay
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets'
                    // modifierClass: 'atom-swiper__pagination-',
                    // bulletClass: 'pagination-bullet',
                    // bulletActiveClass: 'pagination__bullet--active',
                    // currentClass: 'atom-swiper__pagination--current',
                    // totalClass: 'atom-swiper__pagination--total',
                    // hiddenClass: 'atom-swiper__pagination--hidden',
                    // progressbarFillClass: 'pagination__progressbar--fill',
                    // clickableClass: 'atom-swiper__pagination--clickable'
                }
            },
            this.options
        );
        this.swiper = new Swiper(this.$el, opts);

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
@import '~swiper/dist/css/swiper.css';
.swiper-pagination-bullet {
    
    &-active{
        border-radius: $big;
        background: rgba($base, .7);
        width: $big;;
    }
}
</style>
