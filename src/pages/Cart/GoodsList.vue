<template>
    <section class="row-goods-list">
        <transition-group v-if="0 < $store.state.cart.goodsList.length" name="list-complete" tag="main">
            <section v-for="(goods, i) in $store.state.cart.goodsList" :key="goods.item_id" class="goods">
                <VLazyLoad class="img" :src="goods.image" :watch="scrollY"></VLazyLoad>
                <main class="info">
                    <!-- 标题 & 删除按钮-->
                    <div class="row-1">
                        <a class="title">{{goods.name}}</a>
                        <img @click="removeGoodsFromCart(goods.item_id)" class="icon-remove" src="../../assets/close.svg">
                    </div>
                    <div class="row-2"></div>
                    <!-- 其他信息 -->
                    <div class="row-3">
                        <!-- <p class="info">{{goods.info}}</p> -->
                        <div class="price">
                            <span>{{goods.calculation_price}}</span>
                            <span>{{goods.info}}</span>
                        </div>
                        <VStepper :value="goods.qty" @input="changeCount($event, goods)" @click="showCountDialog(i)" class="steppr"></VStepper>
                    </div>
                </main>
            </section>
        </transition-group>
        <VSpinner v-else class="spinner"></VSpinner>
    </section>
</template>
<script>
import { SET_CART_STATUS } from '../../store/mutation-types.js'
import VStepper from '@/packages/Stepper/Stepper'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VCheckbox from '@/packages/Checkbox/Checkbox'
import VSpinner from '@/packages/Spinner/Spinner'
export default {
    name: 'GoodsList',

    props: {
        scrollY: {
            required: true
        }
    },

    data() {
        return {
            goodsList: []
        };
    },

    created() {
        // 获取购物车商品列表
        this.$store.dispatch('getGoodsListOfCart');
    },

    methods: {
        /**
         * 修改产品数量
         */
        async changeCount(count, goods) {
            this.$store.commit('SHOW_LOADING');
            // 编辑数量
            await this.$store.dispatch('editGoodsOfCart', {
                id: goods.item_id,
                qty: count,
                "options": {
                    "1631": "9240"
                }
            })
            // 重新获取列表
            await this.$store.dispatch('getGoodsListOfCart');
            this.$store.commit('HIDE_LOADING');
        },
        /**
         * 通过修改面板, 修改产品数量
         */
        async showCountDialog(index) {
            const goods = this.$store.state.cart.goodsList[index];
            const input = await this.$prompt('数量', {
                value: goods.qty
            });
            this.$store.commit('SHOW_LOADING');
            await this.$store.dispatch('editGoodsOfCart', {
                id: goods.item_id,
                qty: input,
                "options": {
                    "1631": "9240"
                }
            });
            await this.$store.dispatch('getGoodsListOfCart')
            this.$store.commit('HIDE_LOADING');
        },
        /**
         * 删除商品
         */
        async removeGoodsFromCart(id) {
            try {
                if (await this.$confirm('是否删除')) {
                    this.$store.commit('SHOW_LOADING');
                    await this.$store.dispatch('removeGoodsFromCart', [id]);
                    await this.$store.dispatch('getGoodsListOfCart');
                    this.$store.commit('HIDE_LOADING');
                }
            } catch (error) {

            }

        }
    },

    watch: {
        goodsAppend() {

        }
    },

    components: {
        VLazyLoad,
        VCheckbox,
        VStepper, VSpinner
    }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .88rem;
.row-goods-list {
    background: $background;
    >main {
        section {
            display: flex;
            min-width: 0;
            padding: 2*$gutter;
            transition: all .5s;
            border-bottom: 1px solid $lightest;
            &:nth-last-child {
                border-bottom: none;
            }
            .checkbox {
                align-self: center;
                margin-right: 2*$gutter;
            }
            .img {
                align-self: center;
                display: block;
                width: 1.8rem;
                height: 1.8rem;
                margin-right: 2*$gutter;
            }
            .info {
                flex: 1;
                min-width: 0;
                align-self: center;
                .row-1 {
                    height: .8rem;
                    display: flex;
                    .title {
                        flex: 1;
                        min-width: 0;
                        font-size: $big;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .icon-remove {
                        margin-top: -.1rem;
                        width: .4rem;
                        height: .4rem;
                    }
                }

                .row-2 {
                    height: .5rem;
                }
                .row-3 {
                    display: flex;
                    height: .5rem;
                    width: 100%;
                    margin-top: .1rem;
                    .info {
                        font-size: $big;
                        color: $light;
                        flex: 1;
                        line-height: .5rem;
                    }
                    .price {
                        flex: 1;
                        display: block;
                        span {
                            padding-right: $gutter;
                            font-size: $big;
                            &:nth-child(1) {
                                // text-decoration: line-through;
                                color: $dark;
                            }
                        }
                    }
                    .steppr {}
                }
            }
        }
    }
    .spinner {
        padding: 3*$gutter 0;
    }
}

.list-complete-enter,
.list-complete-leave-active {
    overflow: hidden;
    opacity: 0;
    transform: translateY(-30px);
}

.list-complete-leave-active {
    position: absolute;
}
</style>
