<template>
    <ScrollView v-if="1 === status" v-model="scrollY" class="page-bag">
        <LayoutHeader :title="content.title" ></LayoutHeader>
        <!-- 购物车列表 -->
        <LayoutGoodsList :dataSource="content.goodsList" :scrollY="scrollY" @remove-goods="refreshLazyLoad"></LayoutGoodsList>
        <!-- 礼品列表 -->
        <LayoutGiftList :dataSource="content.giftList" :scrollY="scrollY"></LayoutGiftList>
        <!-- 更多礼品 -->
        <LayoutGiftMore :dataSource="content.giftMore" :scrollY="scrollY"></LayoutGiftMore>
        <!-- 推荐 -->
        <LayoutRecommend :dataSource="content.recommend" :scrollY="scrollY"></LayoutRecommend>
    </ScrollView>
</template>
<script>
import * as types from "@/store/mutation-types";

// 模块
import LayoutHeader from './Bag/Header'
import LayoutGoodsList from './Bag/GoodsList'
import LayoutGiftList from './Bag/GiftList'
import LayoutGiftMore from './Bag/GiftMore'
import LayoutRecommend from './Bag/Recommend'

export default {
    name: 'Bag',

    data() {
        return {
            status: -1,
            content: {
                title: "",
                goodsList: [],
                giftList: {},
                giftMore: []
            },
            scrollY: 0
        }
    },

    mounted() {
        this.$api.getBagPage().then(response => {
            this.status = response.data.status;
            this.content = {...this.content,
                ...response.data.content
            };
        });
    },

    methods: {
        refreshLazyLoad(){
            this.scrollY+= 1;
            this.$nextTick(()=>{
                this.scrollY-= 1;
            });
        },

        closeOther(selfIndex) {
            this.content.goodsList.forEach((item, i) => {
                if (i != selfIndex) {
                    this.content.goodsList[i].isOpen = false;
                }
            });
        }
    },

    components: {
        LayoutHeader,
        LayoutGiftMore,
        LayoutGoodsList,
        LayoutGiftList,
        LayoutRecommend,
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-bag {
    background: #efefef;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
