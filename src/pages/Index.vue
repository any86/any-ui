<template>
    <ScrollView v-model="scrollY" class="page-index">
        <!-- 轮播 -->
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
            <!-- 分页 -->
            <div slot="addon" class="page">
                <span :class="{active: 0 == swiperRealIndex}" @click="swiperIndex = 1"></span>
                <span :class="{active: 1 == swiperRealIndex}" @click="swiperIndex = 2"></span>
                <span :class="{active: 2 == swiperRealIndex}" @click="swiperIndex = 3"></span>
            </div>
        </Swiper>
        <LayoutCategoryThumb style="margin-top:.3rem" :dataSource="categoryThumbs"></LayoutCategoryThumb>
        <LayoutLooks style="margin-top:.7rem" :dataSource="looks"></LayoutLooks>
        <!-- INSTAGRAM -->
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
    </ScrollView>
</template>
<script>
import VCheckbox from '@/packages/Checkbox/Checkbox';

import VInput from '@/packages/Input/Input';

import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
import Badge from '@/packages/Badge/Badge'
import VButton from '@/packages/Button/Button'
import LazyLoad from '@/packages/LazyLoad/LazyLoad'
// 布局
import LayoutCategoryThumb from './Index/CategoryThumb'
import LayoutLooks from './Index/Looks'


export default {
    name: 'Index',

    data() {
        return {
            bool: 1,
            scrollY: 0,
            swiperIndex: 0,
            swiperRealIndex: 0,
            categoryThumbs: [],
            looks: {},
        };
    },

    mounted() {
        this.$axios.get('./static/index.json').then(response => {
            this.categoryThumbs = {
                ...this.categoryThumbs,
                ...response.data['category-thumbs']
            };

            this.looks = {
                ...this.looks,
                ...response.data['looks']
            };


        });
    },

    methods: {
        click() {
            this.$input().then(value => {
                alert(value);
            }).catch((e) => {
                alert(e)
            });
        },



    },

    components: {
        Tabs,
        TabsItem,
        Badge,
        Swiper,
        SwiperItem,
        VButton,
        VInput,
        LazyLoad,
        LayoutCategoryThumb,
        LayoutLooks,
        VCheckbox
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-index {
    box-sizing: border-box;
    padding: 0 .3rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .row-swiper {
        background: #eee;
        .swiper-item {
            height: 3.66rem;
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
}
</style>
