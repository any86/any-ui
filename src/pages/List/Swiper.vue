<template>
    <Swiper v-model="swiperIndex" :realIndex.sync="swiperRealIndex" :loop="true" :autoplay="3000" :options="{           slidesPerView:1}" class="row-swiper">
        <SwiperItem>
            <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/new-soufeel-2017/home-new-soufeel-2017-mobile.jpg');"></div>
        </SwiperItem>
        <SwiperItem>
            <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/after-mothers-day-2017/home-after-mothers-day-2017-mobile.jpg');"></div>
        </SwiperItem>
        <SwiperItem>
            <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/presale/152/home-pre-sale-mobile.jpg');"></div>
        </SwiperItem>
    </Swiper>
</template>
<script>
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
export default {
    name: 'SwiperLayout',

    data() {
        return {
            swiperIndex: 0,
            swiperRealIndex: 0,
        };
    },

    mounted() {

    },

    methods: {


    },

    components: {
        Swiper,
        SwiperItem,
    }
}
</script>
<style scoped lang="scss">
.row-swiper {
    background: #eee;
    .swiper-item {
        height: 3.66rem;
        width: 100%;
        background: url() center center/cover no-repeat;
    }
}
</style>
