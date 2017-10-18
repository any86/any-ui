<template>
    <v-scroller v-model="pos" :is-lock-y="false" :is-lock-x="true">
        <div class="swiper-item">
            <h1>12321321</h1>
        </div>
        <v-swiper>
            <v-swiper-item v-for="n in 5" :key="n" class="swiper-item">{{n}}</v-swiper-item>
        </v-swiper>
    </v-scroller>
</template>
<script>
import Mock from 'mockjs'
import VScroller from '@/packages/Scroller/Scroller'
import VSwiper from '@/packages/Swiper/Swiper';
import VSwiperItem from '@/packages/Swiper/SwiperItem';
export default {
    name: 'SwiperDemo',

    data() {
        return {
            pos: { scrollLeft: 0, scrollTop: 0 },

        };
    },

    methods: {

    },

    components: { VSwiper, VSwiperItem, VScroller }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.swiper-item {
    height: 300px;
    &:nth-child(2n+1) {
        background: $info;
    }

    &:nth-child(2n) {
        background: $success;
    }
}
</style>
