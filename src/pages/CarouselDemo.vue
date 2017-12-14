<template>
    <v-scroll-view>
        <!-- <section style="width:300px;margin:auto;"> -->
        <v-carousel v-model="index" :load-prev-next="true"  :is-loop="true" :speed="300"  @change="activeIndex=$event.activeIndex">
            <v-carousel-item v-for="(image, n) in imageList" :key="image">
                <div :class="['carousel-item-' + (n+1)]" class="carousel-item">
                    {{n+1}}
                </div>
                <!-- <img :lazy-src="image" width="100%" height="200" /> -->
            </v-carousel-item>
        </v-carousel>
        <!-- </section> -->
        <!-- <h1>{{index}}</h1> -->

        <button v-for="n in 3" :key="n" class="fill gutter" @click="index=n-1">{{n-1}}</button>

        <!-- <div class="swiper-container" style="background:#eee; height:200px;">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="width:30%;">Slide 1</div>
                <div class="swiper-slide" style="width:60%;">Slide 2</div>
                <div class="swiper-slide" style="width:40%;">Slide 3</div>
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
        const longImages = ['http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/11/43/1143dc058ee817f1c08074ced118b5cf.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/b2/f9/b2f9453ff2b87e81867e003ea66551ea.png', 'https://dn-geekpark-new.qbox.me/uploads/image/file/65/36/653617a7ab15d06e1630389e7e5e058a.jpg', 'https://dn-geekpark-new.qbox.me/uploads/image/file/2d/cc/2dccb0fb30d695295c2566f43aa82fcd.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/97/cb/97cb0602bdf36aff4dd0586fd4f1ab41.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/50/6a/506a2477e321039984b438cce6961c6d.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/4f/d7/4fd7010e128fdf69e4c3edcd30aa1f00.jpeg', 'https://dn-geekpark-new.qbox.me/uploads/image/file/44/ed/44ed15cfada71a4063411cf20af31877.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/e0/b8/e0b850d7e31d4ee7ef1b829eda0423cf.JPG', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/d6/aa/d6aae7975bdb38da5c5982681b84ffd4.jpeg'];
        const imageList = [longImages[0], longImages[1], longImages[2]];
        return {
            index: 0,
            activeIndex: 0,
            imageList: imageList
        };
    },

    mounted() {
    //     var swiper = new Swiper('.swiper-container', {
    //         // slidesPerView: 1,
    //         slidesPerView: 'auto',
    //   spaceBetween: 30,
    //         spaceBetween: 30,
    //         speed: 300,
    //         loop: true,
    //         pagination: {
    //             el: '.swiper-pagination',
    //             clickable: true
    //         },
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev'
    //         }
    //     });
    //     swiper.on('slideChange', e=>{
    //         log(e)
    //     })
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
        width:80%;
    }
    &-2 {
        background: $success;
        width:30%;
    }

    &-3 {
        background: $info;
        width:45%;
    }
    &-4 {
        background: $warning;
        width:60%;
    }
}
</style>