<template>
    <v-scroll-view>
        <!-- <section style="width:300px;margin:auto;"> -->
        <v-carousel v-model="index" :is-loop="true" :speed="1000" :autoplay="{delay: 3000}">
            <v-carousel-item v-for="n in 3" :key="n">
                <div :class="['carousel-item', 'carousel-item-'+n]">{{n}}</div>
            </v-carousel-item>
        </v-carousel>
        <!-- </section> -->

        <!-- <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>

            <div class="swiper-pagination"></div>

            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div> -->

    </v-scroll-view>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import faker from 'faker';
import VCell from '@/packages/Cell/Cell';
import VSwitch from '@/packages/Switch/Switch';
import VCarousel from '@/packages/Carousel/Carousel';
import VCarouselItem from '@/packages/Carousel/CarouselItem';
import VScrollView from '@/packages/ScrollView/ScrollView';

export default {
    name: 'CarouselDemo',

    data() {
        const image = faker.image.food(400, 240);
        return {
            index: 0,
            imageList: [image + '?id=1', image + '?id=2', image + '?id=3']
        };
    },

    mounted() {
        // var swiper = new Swiper('.swiper-container', {
        //     slidesPerView: 1,
        //     spaceBetween: 30,
        //     speed: 3000,
        //     loop: true,
        //     pagination: {
        //         el: '.swiper-pagination',
        //         clickable: true
        //     },
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev'
        //     }
        // });
    },

    methods: {
        handle() {
            alert(123);
        }
    },

    components: {
        VCell,
        VSwitch,
        VCarousel,
        VCarouselItem,
        VScrollView
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';

.swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
}
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.carousel-item {
    height: 200px;
    line-height: 200px;
    color: $sub;
    font-size: $biggest;
    text-align: center;

    &-1 {
        background: $dark;
    }
    &-2 {
        background: $success;
    }

    &-3 {
        background: $info;
    }
    &-4 {
        background: $warning;
    }
}
</style>