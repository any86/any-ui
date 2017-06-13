<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <slot name="addon"></slot>    
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'Swiper',

    props: {
        value: {
            type: [Number, String],
            default: 0
        },

        delay: {
            type: Number,
            default: 2000
        },

        speed: {
            type: Number,
            default: 1000
        },

        loop: {
            type: Boolean,
            default: false

        },

        autoplay: {
            type: Number,
            default: 0
        },

        realIndex: {

        },

        options: {}
    },

    data() {
        return {
            swiper: {},
        };
    },

    mounted() {
        // 生成实例
        this.swiper = new Swiper(this.$el, {
            initialSlide: this.value,
            slidesPerView: 'auto',
            loop: this.loop,
            autoplay: this.autoplay,
            onSlideChangeEnd: swiper => {
                this.$emit('input', swiper.activeIndex);
                if (undefined != this.realIndex) {
                    this.$emit('update:realIndex', swiper.realIndex);
                }
            },
            ...this.options
        });
    },

    methods: {

    },

    watch: {
        value(value) {
            this.swiper.stopAutoplay();
            this.$nextTick(() => {
                this.swiper.slideTo(value);
                this.swiper.startAutoplay();
            });
        }
    },

    computed: {

    },

    destroy() {
        this.swiper.destroy();
        this.swiper = null;
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    >.pages {
        position: absolute;
        z-index: 3;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
        >a {
            margin-right: 5px;
            border-radius: 100%;
            display: inline-block;
            width: 12px;
            height: 12px;
            line-height: 12px;
            text-align: center;
            background: $light;
            color: #fff;
            &.active {
                background: $base;
            }
        }
    }
    .addon{position: absolute;top:0;left:0;right: 0;bottom: 0;z-index: 10;}
}
</style>
