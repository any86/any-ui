<template>
    <section class="row-shop-instagram">
        <h2 align="center">SHOP INSTAGRAM</h2>
        <Swiper :loop="true" :options="{spaceBetween: 30}" class="swiper">
            <SwiperItem style="width:40%;">
                <div class="swiper-item" style="background-image: url('http://desk.fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/0A/ChMkJ1i9XJmIJnFtABXosJGWaOkAAae8QGrHE8AFejI057.jpg');"></div>
            </SwiperItem>
            <SwiperItem style="width:40%;">
                <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/after-mothers-day-2017/home-after-mothers-day-2017-mobile.jpg'); "></div>
            </SwiperItem>
            <SwiperItem style="width:40%;">
                <div class="swiper-item" style="background-image: url('https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/presale/152/home-pre-sale-mobile.jpg');"></div>
            </SwiperItem>
        </Swiper>
    </section>
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

    components: {
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 2rem;
.row-shop-instagram {
    .swiper {
        height: $height;
        .swiper-item {
            height: $height;
            width: 100%;
            background: url() center center/cover no-repeat;
        }
    }
}
</style>
