<template>
    <v-scroll-view>
        <!-- 默认 -->
        <v-group title="默认: 懒加载图片 | 每屏1图 | 预加载前/后各一张 | 自动播放 | 每页停留3000ms | 滑动速度300ms">
            <v-carousel v-model="activeIndex1" :delay="1000">
                <v-carousel-item v-for="image in longImages" :key="image">
                    <img :lazy-src="image" width="100%" height="200" />
                </v-carousel-item>
            </v-carousel>
        </v-group>

        <!-- 多图 -->
        <v-group title="每屏多图 | 循环 | 自动播放">
            <v-carousel v-model="activeIndex2" :slides-per-view="2.2" :delay="1000">
                <v-carousel-item v-for="image in shortImages" :key="image">
                    <img :lazy-src="image" width="100%" height="200" />
                </v-carousel-item>
            </v-carousel>
        </v-group>

        <!-- 外部控制 -->
        <v-group title="不循环 | 不自动播放 | 外部控制 | 不显示默认分页按钮">
            <v-carousel @init="carouselInit" v-model="activeIndex3" :real-index.sync="realIndex3" :is-auto-play="false" :is-loop="false" :has-page-btn="false">
                <v-carousel-item v-for="image in longImages" :key="image">
                    <img :lazy-src="image" width="100%" height="200" />
                </v-carousel-item>
            </v-carousel>
        </v-group>

        <v-button v-for="n in pageBtnCount" :key="n" type="primary" :class="{'btn-active': realIndex3+1 ==n}" @click="activeIndex3=n-1" class="gutter-sm">{{n-1}}</v-button>

    </v-scroll-view>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
import VCarousel from '@/packages/Carousel/Carousel';
import VCarouselItem from '@/packages/Carousel/CarouselItem';
import VScrollView from '@/packages/ScrollView/ScrollView';
import VButton from '@/packages/Button/Button';

export default {
    name: 'CarouselDemo',

    data() {
        const shortImages = ['https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR05_1.png', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR06_3.png', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR09_1.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/2/R215_2.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR17_3.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR20.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL374.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL401.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL219.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL433.png'];

        const longImages = ['http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/11/43/1143dc058ee817f1c08074ced118b5cf.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/b2/f9/b2f9453ff2b87e81867e003ea66551ea.png', 'https://dn-geekpark-new.qbox.me/uploads/image/file/65/36/653617a7ab15d06e1630389e7e5e058a.jpg', 'https://dn-geekpark-new.qbox.me/uploads/image/file/2d/cc/2dccb0fb30d695295c2566f43aa82fcd.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/97/cb/97cb0602bdf36aff4dd0586fd4f1ab41.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/50/6a/506a2477e321039984b438cce6961c6d.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/4f/d7/4fd7010e128fdf69e4c3edcd30aa1f00.jpeg', 'https://dn-geekpark-new.qbox.me/uploads/image/file/44/ed/44ed15cfada71a4063411cf20af31877.jpg', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/e0/b8/e0b850d7e31d4ee7ef1b829eda0423cf.JPG', 'http://ovsnhdoi9.bkt.clouddn.com/uploads/image/file/d6/aa/d6aae7975bdb38da5c5982681b84ffd4.jpeg'];
        return {
            pageBtnCount: 0,
            activeIndex1: 0,
            activeIndex2: 0,
            activeIndex3: 0,
            realIndex3: 0,
            longImages: longImages.slice(0, 8),
            shortImages
            // imageList:images.slice(0, 3),
        };
    },

    mounted() {
  
    },

    methods: {
        carouselInit({pageBtnCount}){
            this.pageBtnCount = pageBtnCount;
        }
    },

    components: {
        VCell,
        VGroup,
        VCarousel,
        VCarouselItem,
        VScrollView,
        VButton
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
    background: $dark;


    &-1 {
        background: $light;
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
    &-5 {
        background: $primary;
    }
}
.btn-active {
    background: $danger;
}
</style>