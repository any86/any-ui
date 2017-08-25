<template>
    <section class="row">
        <h3 align="center">Related Products</h3>
        <v-swiper :value="swiperActiveIndex" :options="{slidesPerView: 3}"  class="slider">
            <v-swiper-item v-for="item in dataSource" :key="item.src">
                <img :src="item.src" :key="item.src" class="item-img">
            </v-swiper-item>
        </v-swiper>
    </section>
</template>
<script>

import VSwiper from '@/packages/Swiper/Swiper.vue'
import VSwiperItem from '@/packages/Swiper/SwiperItem.vue'
export default {
    name: 'RelatedProducts',

    props: {
        dataSource: {
            type: Array,
            default() {
                return [
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/17f82f742ffe127f42dca9de82fb58b1/Z/N/ZNL32.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/17f82f742ffe127f42dca9de82fb58b1/Z/N/ZNL32.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/17f82f742ffe127f42dca9de82fb58b1/Z/N/ZNL32.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/17f82f742ffe127f42dca9de82fb58b1/Z/N/ZNL32.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/17f82f742ffe127f42dca9de82fb58b1/Z/N/ZNL32.png' }
                ];
            }
        }
    },

    data(){
        return {swiperActiveIndex: 0};
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
.item-img{display: block;width: 100%;padding: $gutter;}
</style>
