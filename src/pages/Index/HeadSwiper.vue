<template>
    <Swiper class="row-swiper">
        <SwiperItem>
            <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/new-soufeel-2017/home-new-soufeel-2017-mobile.jpg');"></div>
        </SwiperItem>
        <SwiperItem>
            <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/after-mothers-day-2017/home-after-mothers-day-2017-mobile.jpg');"></div>
        </SwiperItem>
        <SwiperItem>
            <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/presale/152/home-pre-sale-mobile.jpg');"></div>
        </SwiperItem>
        <!-- 分页 -->
        <div slot="addon" class="page">
            <span :class="{active: 0 == swiperRealIndex}" @click="swiperIndex = 1"></span>
            <span :class="{active: 1 == swiperRealIndex}" @click="swiperIndex = 2"></span>
            <span :class="{active: 2 == swiperRealIndex}" @click="swiperIndex = 3"></span>
        </div>
    </Swiper>
</template>
<script>
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'

export default {
    name: 'HeadSwiper',

    props: {
        dataSource: {
            // required: true
        }
    },

    data() {
        return {
            swiperIndex: 0,
            swiperRealIndex: 0
        };
    },

    components: {Swiper, SwiperItem}
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 3.66rem;
.row-swiper {
    background: #eee;
    .swiper-item {
        height: $height;
        width: 100%;
        background: url() center center/cover no-repeat;
    }
    .page {
        position: absolute;
        z-index: 10;
        bottom: 10px;
        margin: auto;
        left: 0;
        right: 0;
        text-align: center;
        >span {
            height: 8px;
            width: 8px;
            border-radius: 100%;
            border: 1px solid #000;
            display: inline-block;
            margin: 0 2px;
            &.active {
                background: #000;
            }
        }
    }
}
</style>
