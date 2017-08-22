<template>
    <section class="row">
        <v-swiper :value="swiperActiveIndex" @change-start="changeSwiperStart" class="slider">
            <v-swiper-item v-for="item in dataSource.sliders" :key="item.src">
                <img :src="item.src" :key="item.src" class="item-img">
            </v-swiper-item>
        </v-swiper>
        <!-- 缩略图 -->
        <ul v-if="'thumb' == pageType" class="thumb">
            <li v-for="(item, i) in dataSource.sliders" :key="item.src" :class="{active: swiperActiveIndex == i}" @click="changeSwiperByThumb(i)">
                <img :src="item.src" />
            </li>
        </ul>
    
        <ul v-else class="dot">
            <li v-for="(item, i) in dataSource.sliders" :key="item.src" :class="{active: swiperActiveIndex == i}" @click="changeSwiperByThumb(i)">
            </li>
        </ul>
    </section>
</template>
<script>

import VSwiper from '@/packages/Swiper/Swiper.vue'
import VSwiperItem from '@/packages/Swiper/SwiperItem.vue'
export default {
    name: 'Slider',

    props: {
        pageType: {
            default: 'dot'
        },

        dataSource: {
            type: Object,
            default() {
                return {
                    sliders: [
                        { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/Z/N/ZNL32_2.jpg' },
                        { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/Z/N/ZNL32_2.png' },
                        { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/Z/N/ZNL32.png' }, { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/R/5/R507_2.jpg' },
                    ]
                };
            }
        }
    },

    data() {
        return {
            swiperActiveIndex: 0,
        };
    },

    methods: {
        changeSwiperStart(swiper) {
            this.swiperActiveIndex = swiper.activeIndex;
        },

        changeSwiperByThumb(index) {
            this.swiperActiveIndex = index;
        }
    },

    components: {
        VSwiper, VSwiperItem,
    }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.slider {
    .item-img {
        width: 100%;
        display: block;
        margin:auto;
    }
}

.thumb {
    display: flex;
    margin: $gutter auto;
    li {
        flex: 1;
        opacity: .5;
        border: 1px solid $light;
        margin: $gutter / 4;
        &.active {
            opacity: 1;
        }
        img {
            display: block;
            width: 100%;
        }
    }
}

.dot {
    display: table;
    margin: auto;
    li {
        width: .15rem;
        height: .15rem;
        background: $lighter;
        border-radius: 100%;
        flex: 0 1 .15rem;
        justify-content: center;
        display: inline-block;
        margin: 0 $gutter/4;
        &.active {
            background: $darkest;
        }
    }
}
</style>
