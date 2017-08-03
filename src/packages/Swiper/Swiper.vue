<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'Swiper',

    props: {
        options: {}
    },

    data() {
        return {
            swiper: null,
        };
    },

    mounted() {
        // 生成实例
        this.swiper = new Swiper(this.$el, { 
            slidesPerView: 1,
            ...this.options
        });        
    },

    methods: {

    },

    watch: {
        // value(value) {
        //     this.swiper.stopAutoplay();
        //     this.$nextTick(() => {
        //         this.swiper.slideTo(value);
        //         this.swiper.startAutoplay();
        //     });
        // }
    },

    computed: {

    },

    destroy() {
        // this.swiper.destroy();
        // this.swiper = null;
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-swiper {
/*    width: 100%;
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
    .addon{position: absolute;top:0;left:0;right: 0;bottom: 0;z-index: 10;}*/
}
</style>
