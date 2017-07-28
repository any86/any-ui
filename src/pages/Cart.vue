<template>
    <ScrollView v-if="1 === status" v-model="scrollY" class="page-bag">
        <LayoutHeader :title="content.title"></LayoutHeader>
        <!-- 购物车列表 -->
        <LayoutGoodsList :scrollY="scrollY" @remove-goods="removeGoods">
        </LayoutGoodsList>
        <!-- 礼品列表 -->
        <LayoutGiftList :dataSource="content.giftList" :scrollY="scrollY"></LayoutGiftList>
        <!-- 推荐 -->
        <LayoutRecommend :dataSource="content.recommend" :scrollY="scrollY" @add-goods="addRecommendGoodsToCart">
        </LayoutRecommend>
        <!-- 优惠券和点券 -->
        <LayoutDiscount></LayoutDiscount>
    </ScrollView>
</template>
<script>
import * as types from "@/store/mutation-types";

// 模块
import LayoutHeader from './Cart/Header'
import LayoutGoodsList from './Cart/GoodsList'
import LayoutGiftList from './Cart/GiftList'
import LayoutRecommend from './Cart/Recommend'
import LayoutDiscount from './Cart/Discount'


export default {
    name: 'Cart',

    data() {
        return {
            status: -1,
            goodsListFromRecommend: [],
            scrollY: 0
        }
    },

    mounted() {
        this.$api.getCartPage().then(response => {
            this.status = response.data.status;
            this.content = {
                ...this.content,
                ...response.data.content
            };
        });
    },

    methods: {
        /*
         * 添加商品到购物车列表
         * 从推荐列表中移除
         */
        addRecommendGoodsToCart({ goods, index }) {

            this.goodsListFromRecommend.push(goods);
        },

        removeGoods(index) {
            // 刷新图片
            this.scrollY += 1;
            this.$nextTick(() => {
                this.scrollY -= 1;
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
        LayoutGoodsList,
        LayoutGiftList,
        LayoutRecommend,
        LayoutDiscount
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
