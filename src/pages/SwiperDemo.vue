<template>
    <v-scroller v-model="pos">
        <v-cell>{{index}}</v-cell>
        <v-cell class="item" @click="index = 2">
            change  
        </v-cell>
        <v-swiper v-model="index" :hasPagination="true">
            <v-swiper-item v-for="n in 5" :key="n" class="swiper-item">{{n}}</v-swiper-item>
        </v-swiper>
        <v-cell v-for="n in 100" :key="n" class="item">
            {{n+15}}
        </v-cell>
    </v-scroller>
</template>
<script>
import Mock from 'mockjs'
import VScroller from '@/packages/Scroller/Scroller'
import VCell from '@/packages/Cell/Cell';
import VSwiper from '@/packages/Swiper/Swiper';
import VSwiperItem from '@/packages/Swiper/SwiperItem';
export default {
    name: 'SwiperDemo',

    data() {
        return {
            pos: {
                scrollLeft: 0,
                scrollTop: 0,
            },
            index: 0


        };
    },

    methods: {

    },

    components: { VSwiper, VSwiperItem, VScroller, VCell }
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

.item {
    &:nth-child(2n+1) {
        background: $white;
    }

    &:nth-child(2n) {
        background: $lightest;
    }
}

</style>
