<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- Add Pagination -->
        <!-- <div class="swiper-pagination"></div> -->
        <!-- Add Arrows -->
<!--         <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div> -->
    </div>
</template>
<script>
import swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'Swiper',

    props: {
        value: {
            type: Number,
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
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            swiper: {}
        };
    },

    mounted() {
        this.swiper = new Swiper(this.$el, {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            paginationClickable: true,
            loop: this.loop,
            onSlideChangeEnd: swiper=>{
                this.$emit('input', swiper.activeIndex);
            }
        });
    },

    methods: {

    },

    watch: {
        value(value){
            this.swiper.slideTo(value);
        }
    },

    computed: {

    },

    destroy(){
        this.swiper.destroy();
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
}
</style>
