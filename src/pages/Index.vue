<template>
    <ScrollView class="page-index">
        <Spinner slot="background"></Spinner>
        <!-- 轮播 -->
        <Swiper v-model="swiperIndex" :realIndex.sync="swiperRealIndex" :loop="true" :autoplay="3000" class="swiper">
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
        <!-- 第二行 -->
        <div class="row-category-thumbs" ref="categoryThumbs">
            <router-link v-for="item in categoryThumbs" :key="item.title" :to="{path: item.path}" tag="span" class="item">
                <p>{{item.title}}</p>
                <LazyLoad class="img" :element="$refs.categoryThumbs" width="100%" height="1.5rem" :src="item.img"></LazyLoad>
            </router-link>
        </div>
        <!-- shop these looks -->
        <div class="row-looks">
            <h3 class="title">SHOP THESE LOOKS</h3>
            <div class="breadcrumb">
                <a v-for="(item, i) in looks.breadcrumb" @click="looks.activeIndex = i" :class="{active: looks.activeIndex == i}">{{item}}</a>
            </div>
            <Swiper v-if="looks.imgs" class="swiper" v-model="looks.activeIndex" :options="{onlyExternal: true}">
                <SwiperItem v-for="img in looks.imgs" :key="img">
                    <img :src="img" width="60%">
                </SwiperItem>
            </Swiper>
        </div>
    </ScrollView>
</template>
<script>
import VInput from '@/packages/Input/Input';

import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
import Badge from '@/packages/Badge/Badge'
import VButton from '@/packages/Button/Button'
import LazyLoad from '@/packages/LazyLoad/LazyLoad'

export default {
    name: 'Index',

    data() {
        return {
            swiperIndex: 0,
            swiperRealIndex: 0,

            categoryThumbs: [],

            looks: {
                activeIndex: 0
            },

            tabSelect: 0,
            titles: ['tab1', 'tab2', 'tab3', 'tab4'],
            acitve: 0
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
        }
    },

    components: {
        Tabs,
        TabsItem,
        Badge,
        Swiper,
        SwiperItem,
        VButton,
        VInput,
        LazyLoad
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-index {
    box-sizing: border-box;
    padding: 0 15px;
    .swiper {
        background: #eee;
        .swiper-item {
            height: 180px;
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
    .row-category-thumbs {
        margin-top: 15px;
        overflow: hidden;
        // border-top:1px solid $lightest;
        >.item {
            box-sizing: border-box;
            border-style: solid;
            border-color: $lightest;
            border-width: 0;
            border-bottom-width: 1px;
            display: flex;
            float: left;
            width: 50%;
            justify-content: space-between;
            p {
                width: 1rem;
                display: flex;
                margin: auto .2rem;
                box-sizing: border-box;
                font-size: $normal;
            }
            .img {
                flex: 1;
                margin: auto;
                box-sizing: border-box;
            }
            &:nth-child(2n+1) {
                border-right-width: 1px;
            }
        }
    }
    .row-looks {
        overflow: hidden;
        .title {
            margin: .3rem auto;
            text-align: center;
            display: block;
        }
        // 面包屑
        .breadcrumb {
            text-align: center;
            a {
                display: inline-block;
                &.active {
                    color: $base;
                }
            }
            a:not(:last-of-type) {
                &:after {
                    color: #000;
                    content: '/';
                    margin: auto 5px;
                }
            }
        }

        .swiper{background:#fff;}
    }
}
</style>
