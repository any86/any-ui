<template>
    <section>
        <div class="swiper-container gallery-top">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="background-image:url(https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/presale/152/home-pre-sale-mobile.jpg)"></div>
                <div class="swiper-slide" style="background-image:url(https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/new-soufeel-2017/home-new-soufeel-2017-mobile.jpg)"></div>
                <div class="swiper-slide" style="background-image:url(https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/after-mothers-day-2017/home-after-mothers-day-2017-mobile.jpg)"></div>
                <div class="swiper-slide" style="background:#ccc">4</div>
                <div class="swiper-slide" style="background:#ccc">5</div>
            </div>
        </div>
        <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="item"><img width="100%" src="http://jer.soufeel.org/media/catalog/product/F/J/FJ1092.png"></div>
                </div>
                <div class="swiper-slide">
                    <div class="item"><img width="100%" src="http://jer.soufeel.org/media/catalog/product/F/J/FJ1093.png"></div>
                </div>
                <div class="swiper-slide">
                    <div class="item"><img width="100%" src="http://jer.soufeel.org/media/catalog/product/F/J/FJ1141.png"></div>
                </div>
                <div class="swiper-slide">
                    <div class="item"><img width="100%" src="http://jer.soufeel.org/media/catalog/product/F/J/FJ1148.png"></div>
                </div>
                <div class="swiper-slide">
                    <div class="item"><img width="100%" src="http://jer.soufeel.org/media/catalog/product/F/J/FJ1149.png"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
    name: 'SwiperLayout',

    data() {
        return {

        };
    },

    mounted() {
        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 0,
            slidesPerView: 1,

        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            visibilityFullFit: true,
            // centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: .3,
            slideToClickedSlide: true,
            onlyExternal: true,
            onSlideClick: function() {
                alert(galleryThumbs.clickedSlideIndex)
                galleryThumbs.swipeTo(galleryThumbs.clickedSlideIndex)
            }
        });
        // galleryTop.params.control = galleryThumbs;
        // galleryThumbs.params.control = galleryTop;
    },

    methods: {


    },

    components: {}
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 6rem;
$galleryTopHeight: 3.8rem;
$triangleHeight: .3rem;
section {
    height: $height;
    position: relative;
    overflow: hidden;
    .swiper-container {
        overflow-x: hidden;
        width: 100%;
    }
    .swiper-slide {
        height: 100%;
        background-size: cover;
        background-position: center;
    }
    .gallery-top {
        height: $galleryTopHeight;
        width: 100%;
    }
    // 缩略图
    .gallery-thumbs {
        overflow: visible;
        position: absolute;
        top: $galleryTopHeight;
        height: $height - $galleryTopHeight;
    }
    .gallery-thumbs .swiper-slide {
        width: 28%;
        height: 100%;
        position: relative;
        padding: 2*$gutter;
        .item {
            position: relative;
            height: 100%;
            width: 100%;
            border: 1px solid $lightest;
            text-align: center;
            font-size: $biggest;
        }
    }
    .gallery-thumbs .swiper-slide-active {
        border: 1px solid $base;
        &:before {
            content: ' ';
            position: absolute;
            z-index: 2000;
            top: -$triangleHeight;
            left: 0;
            right: 0;
            margin: auto;
            width: 0;
            height: 0;
            border-left: $triangleHeight solid rgba(0, 0, 0, 0);
            border-right: $triangleHeight solid rgba(0, 0, 0, 0);
            border-bottom: $triangleHeight solid $sub;
        }
    }
}
</style>
