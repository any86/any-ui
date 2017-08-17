<template>
    <section class="page-list">
        <LayoutHeader ref="header"></LayoutHeader>
        <ScrollView ref="scroll" v-model="scrollY" class="scroll-list" @reach-bottom="getMore" :ovh="isPopupShow">
    
            <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/namenecklacebannner/namenecklace-banner_01-mobile.jpg" width="100%">
            <!-- 列表和筛选条件 -->
    
            <!-- 筛选条件 -->
            <LayoutFilter ref="filter" :scrollY="scrollY" @open="openFilterList" @select="selectFilterOption" :isOpen="isPopupShow" :activeIndex="activeIndex">
            </LayoutFilter>
    
            <ul class="list">
                <VMask v-model="isPopupShow" :isFixed="false" :zIndex="5"></VMask>
                <li v-for="item in list" class="item" :key="item.id">
                    <router-link :to="{path: 'detail', query: {id: item.entity_id}}" tag="a">
                        <VLazyLoad class="img" :src="item.image_url" :watch="scrollY"></VLazyLoad>
                    </router-link>
                    <h5 align="center">{{item.title}}</h5>
                    <div class="price">
                        <span class="final">{{item.final_price_with_tax}}</span>
                        <span class="regular">{{item.regular_price_with_tax}}</span>
                    </div>
                    <span v-if="'simple' == item.type_id" @click="addToCart" class="button-buy">{{lang.ADD_TO_CART}}</span>
                    <span v-else class="button-buy">{{lang.DESIGN_YOUR_OWN}}</span>
                </li>
            </ul>
    
            <Spinner v-show="isShowSpinner && !isEnd"></Spinner>
            <p v-if="isEnd" class="empty">there is nothing</p>
        </ScrollView>
        <VGoTop v-show="0 < scrollY" @click.native="gotop"></VGoTop>
    </section>
</template>
<script>
import VMask from '@/packages/Dialog/Mask'
import VGoTop from '@/components/GoTop'
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'

// 公共头尾
import LayoutHeader from '@/components/Header'
import LayoutFilter from './List/Filter'
import LayoutFooter from '@/components/Footer'

export default {
    name: 'List',

    data() {
        return {
            lang: {},
            status: -1,
            isShowSide: false,
            isShowSpinner: true,
            ovh: false,
            scrollY: 0,
            isEnd: false,
            isScrollUp: false,
            isScrollDown: false,
            isLoading: true,
            isPopupShow: false,
            //过滤
            activeIndex: [0, 0],
            // 列表
            list: [],
            order: 2,
            dir: 'desc',
            page: 1,
            limit: 20,
        };
    },

    mounted() {
        this.$api.getListPage().then(response => {
            this.lang = response.data
        });

        this.refresh();
    },

    methods: {
        addToCart() {
            console.log(1);
        },

        gotop() {
            this.scrollY = 0;
        },

        openFilterList() {
            const offsetTop = this.$refs.filter.$el.offsetTop + 1;
            this.scrollY = offsetTop;
            this.isPopupShow = !this.isPopupShow;
        },


        selectFilterOption(value) {
            this.isPopupShow = false;
        },

        afterPopupLeave() {
            this.isShowSpinner = true;
        },

        async refresh() {
            this.isLoading = true;
            this.isEnd = false;
            this.list = [];
            const params = {
                page: 1,
                limit: this.limit,
                trend: this.trend
            };

            const response = await this.$api.getGoodsList(params);
            this.isLoading = false;
            if (200 == response.status) {
                this.list.push(...response.data);
            }
        },

        getMore() {
            if (!this.isLoading) {
                this.isLoading = true;
                this.page++;
                const params = {
                    page: this.page,
                    limit: this.limit,
                    trend: this.trend
                };
                this.$api.getGoodsList(params).then(response => {
                    if (200 == response.status) {
                        this.list.push(...response.data);
                        this.isLoading = false;
                    } else {
                        this.isEnd = true;
                    }
                });
            }
        }
    },

    watch: {
        ['$store.state.currency']() {
            this.refresh();
        },

        trend() {
            this.isPopupShow = false;
            this.refresh();
        },

        scrollY(newValue, oldValue) {

        },

        isPopupShow(value) {
            this.ovh = value;
        }
    },

    components: {
        Spinner,
        VLazyLoad,
        VPopup,
        LayoutHeader,
        LayoutFilter,
        LayoutFooter,
        VMask,
        VGoTop
    }
}

</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .scroll-list {
        flex: 1;
        position: relative;
        .list {
            position: relative;
            overflow: hidden;
            display: flex;
            flex-flow: row wrap;
            >.item {
                padding: .1rem;
                flex: 0 0 50%;
                overflow: hidden;
                >a {
                    display: block;
                    width: 100%;
                    >.img {
                        overflow: hidden;
                        margin: auto;
                        width: 3rem;
                        height: 3rem;
                    } // >.img[lazy="loading"] {}
                    >.img[lazy="done"] {
                        animation: zoomIn 1s;
                    }
                }
                .price {
                    display: table;
                    margin: auto;
                    .final {
                        padding: .1rem;
                    }
                    .regular {
                        padding: .1rem;
                        color: $light;
                        text-decoration: line-through;
                    }
                }

                .button-buy {
                    text-align: center;
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    background: $base; // border:1px solid $base;
                    border-radius: 4px;
                    color: $sub;
                    display: block;
                    margin-top: .3rem;
                }
            }
        }
        .spinner {
            margin: 30px auto;
        }
        .empty {
            text-align: center;
            font-size: .3rem;
            color: $light;
            margin: 30px auto;
        }
    }
    .footer-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
}
</style>
