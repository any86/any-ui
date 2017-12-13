<template>
    <v-scroll-view>
        <!-- <section style="width:300px;margin:auto;"> -->
        <v-carousel v-model="index" :is-loop="true" :speed="1000" :autoplay="{delay: 2000}" @change="activeIndex=$event.activeIndex">
            <v-carousel-item v-for="(image, n) in imageList" :key="image">
                <!-- <div :class="['carousel-item-' + (n+1)]" class="carousel-item">
                    {{n+1}}
                </div> -->
                <img :lazy-src="image" width="100%" height="200" />
            </v-carousel-item>
        </v-carousel>
        <!-- </section> -->
        <!-- <h1>{{index}}</h1> -->

        <button v-for="n in 3" :key="n" class="fill gutter" @click="index=n-1">{{n-1}}</button>

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
import VLazyLoad from '@/packages/LazyLoad/LazyLoad';

export default {
    name: 'CarouselDemo',

    data() {
        const longImages = ['http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/11/43/1143dc058ee817f1c08074ced118b5cf.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/b2/f9/b2f9453ff2b87e81867e003ea66551ea.png', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/4f/d7/4fd7010e128fdf69e4c3edcd30aa1f00.jpeg'];
        // const longImages = ['http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/11/43/1143dc058ee817f1c08074ced118b5cf.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/b2/f9/b2f9453ff2b87e81867e003ea66551ea.png'];
        return {
            index: 0,
            activeIndex: 0,
            imageList: longImages
        };
    },

    mounted() {
        // var swiper = new Swiper('.swiper-container', {
        //     slidesPerView: 1,
        //     spaceBetween: 30,
        //     speed: 300,
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

        // swiper.on('slideChange', e=>{
        //     log(e)
        // })
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
        VScrollView,
        VLazyLoad
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
    color: #ddd;
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