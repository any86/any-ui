<template>
    <ScrollView ref="scroll" v-model="scrollY" class="page-detail">
        <div class="breadcrumb">
            <a>HOME</a>
            <a>CHARMS</a>
            <a>PHOTO CHARMS</a>
            <a>SHELL LOCKET</a>
        </div>
    
        <section class="row-info-base">
            <v-swiper class="slider">
                <v-swiper-item v-for="item in dataSource.sliders" :key="item.src">
                    <img :src="item.src" :key="item.src" class="item-img">
                </v-swiper-item>
            </v-swiper>
    
            <h3>Shell Locket Photo Charm</h3>
            <div class="price">
                <span class="old">$65.00</span>
                <span class="new">$40.00</span>
            </div>
            <p>you save $54.00</p>
        </section>
    
        <!-- 预览 -->
        <section class="row-preview">
            <h3>preview your font</h3>
            <p class="font-preview">{{text}}</p>
            <div class="input">
                <v-input v-model="text"></v-input>
                <span class="text">
                    <a class="text-danger">10</a> left</span>
            </div>
        </section>
    
        <!-- tabs -->
        <v-tabs v-model="tabsIndex">
            <v-tabs-item>Details</v-tabs-item>
            <v-tabs-item>Reviews</v-tabs-item>
            <v-tabs-item>Information</v-tabs-item>
            <v-tabs-item>Shipping</v-tabs-item>
        </v-tabs>
        <div v-show="0 == tabsIndex" class="row-info-detail">
            <p>Christmas with jingle-bell charms, etc. Soufeel Jewelry is perfect for any special day. Every 925 sterling silver charm bead can be chosen and bought by oneself to do the tie-in, arbitrary combination, choosing his/her beloved color to match elegant dressing style, 26 letters to create their own name or English abbreviations, and silver charms to compose splendid classic charm bracelet. With your combination, a bit more freedom to try, through your imagination, all sorts of different types of beads together, design your unique personalized bracelet from Soufeel Jewelry. Whether it is romantic sentiment, family motifs, hobby or an array of other themes, you can always find the perfect gift ideas to personalize your - or someone else’s - jewelry “For Every Memorable Day”.</p>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_03-mobile.jpg'" :watch="scrollY"></v-lazy-load>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_04-mobile.jpg'" :watch="scrollY"></v-lazy-load>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_01-mobile.jpg'" :watch="scrollY"></v-lazy-load>
        </div>
        <div v-show="1 == tabsIndex" class="reviews">
            Reviews
        </div>
        <div v-show="2 == tabsIndex" class="information">
            Information
        </div>
        <div v-show="3 == tabsIndex" class="shipping">
            Shipping
        </div>
    </ScrollView>
</template>
<script>
import VSwiper from '@/packages/Swiper/Swiper.vue'
import VSwiperItem from '@/packages/Swiper/SwiperItem.vue'
import VInput from '@/packages/Input/Input.vue'

import VSpinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'

import LayoutResult from './Charm/Result'
import LayoutFooterUpload from './Charm/FooterUpload'

export default {
    name: 'NormalType',

    data() {
        return {
            dataSource: {
                sliders: [
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/Z/N/ZNL32_2.jpg' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/Z/N/ZNL32_2.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/Z/N/ZNL32.png' },
                ]
            },
            text: '',
            scrollY: 0,
            tabsIndex: 0
        };
    },

    mounted() {

    },

    methods: {

    },

    components: {
        VSpinner, VInput,
        VLazyLoad,
        VTabs,
        VTabsItem, VSwiper, VSwiperItem
    },

    watch: {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.page-detail {
    section {
        padding: 3*$gutter;
    } // 面包屑
    .breadcrumb {
        margin: $gutter * 3;
        a {
            font-size: $small;
            display: inline-block;
            &.active {
                color: $base;
            }
        }
        a:not(:last-of-type) {
            &:after {
                color: #000;
                content: '>';
                margin: auto 5px;
            }
        }
    }
    .row-info-base {

        .slider {
            .item-img {
                width: 100%;
                display: block;
            }
        }
        .price {
            padding: $gutter * 3 0;
            .old {
                font-size: $bigger;
                color: $darkest;
                text-decoration: line-through;
            }
            .new {
                font-size: $bigger;
                color: $danger;
                margin-left: $gutter *3;
            }
        }
    }

    .row-preview {
        .font-preview {
            border: 1px dashed $lightest;
            padding: $gutter;
            height: 1rem;
            line-height: 1rem;
            font-family: CommercialScriptBT-Regular;
            font-size: 1rem;
            color: $base;
        }
        .input {
            margin-top: $gutter * 3;
            display: flex;
            border: 1px solid $lightest;
            padding: 0 $gutter * 3;
            span {
                display: block;
                flex: 1 0 auto;
                line-height: 1rem;
            }
        }
    }
    .row-info-detail {
        padding: 15px;
        p {
            line-height: 1.5;
            font-size: $normal;
        }
        .img {
            margin: $gutter * 3 auto;
            width: 100%;
            min-height: 7rem;
            overflow: hidden;
        }
        .img[lazy="done"] {
            animation: fadeIn 1s;
        }
    }
}
</style>
