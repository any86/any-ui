<template>
    <ScrollView class="page-index">
        <Spinner slot="background"></Spinner>
        <!-- 轮播 -->
        <Swiper v-model="swiperValue" :loop="true">
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
        <!-- 第二行 -->
        <div class="category-thumbs" ref="categoryThumbs">
            <li v-for="item in categoryThumbs">
                <router-link :to="{path: item.path}">
                    <p>{{item.name}}</p>
                    <LazyLoad class="img" :element="$refs.categoryThumbs"  width="100%" height="4rem" :src="item.img"></LazyLoad>
                    <!-- <img width="160" :src="item.img"> -->
                </router-link>
            </li>
        </div>
    </ScrollView>
</template>
<script>
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
            categoryThumbs: [],
            swiperValue: 0,
            tabSelect: 0,
            titles: ['tab1', 'tab2', 'tab3', 'tab4'],
            acitve: 0
        };
    },

    mounted(){
        this.$axios.get('./static/index.json').then(response=>{
            this.categoryThumbs = response.data['category-thumbs'];
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
        VButton,LazyLoad
    }
}
</script>
<style scoped lang="scss">
.page-index {
    box-sizing: border-box;
    padding: 0 15px;
    .swiper-item {
        height: 180px;
        width: 100%;
        background: url() center center/cover no-repeat;
    }
    .category-thumbs {
        >li {
            display: flex;
            float: left;
            width: 50%;
            p{width: 1rem;}
            .img{flex:1;}
        }
    }
}
</style>
