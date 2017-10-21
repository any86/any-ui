<template>
    <v-infinite-scroll v-model="scrollTop">
        <v-tabs v-model="index">
            <v-tabs-item v-for="text in tabs.list" :key="text">{{text}}</v-tabs-item>
        </v-tabs>

        <v-swiper v-model="index">
            <v-swiper-item v-for="text in tabs.list" :key="text">
                <v-cell v-for="n in 30" :key="n">{{n}} : {{text}}</v-cell>
            </v-swiper-item>
        </v-swiper>
        <v-popup v-model="isShow">
            <v-cell><button class="button button-danger">xxx xxx</button></v-cell>
            <v-cell v-for="n in 10" :key="n">{{n}}</v-cell>
        </v-popup>
    </v-infinite-scroll>
</template>
<script>
import Mock from 'mockjs';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
import VAffix from '@/packages/Affix/Affix';
import VTabs from '@/packages/Tabs/Tabs';
import VTabsItem from '@/packages/Tabs/TabsItem';
import VCell from '@/packages/Cell/Cell';
import VSwiper from '@/packages/Swiper/Swiper';
import VSwiperItem from '@/packages/Swiper/SwiperItem';

import VPopup from '@/packages/Dialog/Popup';

export default {
    name: 'TabsDemo',

    data() {
        return {
            scrollTop: 0,
            tabs: Mock.mock({
                'list|2': ['@province()']
            }),
            isShow: true,
            index: 0
        };
    },

    methods: {},

    components: {
        VSwiper,
        VSwiperItem,
        VInfiniteScroll,
        VCell,
        VTabs,
        VTabsItem,
        VAffix,
        VPopup
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.swiper-item {
    height: 300px;
    &:nth-child(2n + 1) {
        background: $info;
    }

    &:nth-child(2n) {
        background: $success;
    }
}

.item {
    &:nth-child(2n + 1) {
        background: $white;
    }

    &:nth-child(2n) {
        background: $lightest;
    }
}
</style>
