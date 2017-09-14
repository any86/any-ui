<template>
    <section class="page-list">
        <ScrollView ref="scroll" v-model="scrollY" class="scroll-list" @reach-bottom="getMore" :ovh="isPopupShow">
            <LayoutHeader ref="header"></LayoutHeader>
            <div :style="{height: `${iframeHeight}px`}" class="iframe">
                <iframe :style="{height: `${iframeHeight}px`}" src="./static/iframe.html" frameborder="0" scrolling="no" vsspace="0" hspace="0" marginwidth="0" marginheight="0" width="100%"></iframe>
            </div>

            <!-- 图钉 -->
            <VAffix :scrollY="scrollY" @click="scrollY=$event.top">
                <LayoutFilter ref="filter" @open="isPopupShow=!isPopupShow" @select="selectFilterOption" :isOpen="isPopupShow" :activeIndex="activeIndex">
                </LayoutFilter>
            </VAffix>

            <ul class="list">
                <VMask v-model="isPopupShow" :isFixed="false" :zIndex="5"></VMask>
                <li v-for="item in list" class="item" :key="item.id">
                    <router-link :to="{path: 'detail-a', query: {id: item.entity_id}}" tag="a">
                        <VLazyLoad class="img" :src="item.image_url" :watch="scrollY"></VLazyLoad>
                    </router-link>
                    <h5 class="title">{{item.title}}</h5>
                    <div class="price">
                        <span class="final">{{item.final_price_with_tax}}</span>
                        <span class="regular">{{item.regular_price_with_tax}}</span>
                    </div>
                    <span v-if="'simple' == item.type_id" @click="addToCart" class="button-buy">{{$lang.DETAIL_BUTTON_ADD_TO_CART}}</span>
                    <span v-else class="button-buy">{{$lang.DETAIL_BUTTON_DESIGN_YOUR_OWN}}</span>
                </li>
            </ul>
            <Spinner v-show="isShowSpinner && !isEnd"></Spinner>

            <p v-if="isEnd" class="empty">{{$lang.DETAIL_TEXT_THERE_IS_NOTHING}}</p>
        </ScrollView>
        <VGoTop v-show="0 < scrollY" @click.native="gotop"></VGoTop>
    </section>
</template>
<script>
import throttle from 'lodash/throttle'

import VAffix from '@/packages/Affix/Affix'
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
            iframeHeight: 0,
            isShowSpinner: true,
            scrollY: 0,
            isEnd: false,
            isLoading: true, // 用于锁定, 防止多次加载
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
        this.refresh();
        setInterval(() => {
            var height = localStorage.getItem('listIframeHeight');
            this.iframeHeight = height;
        }, 200);
    },

    methods: {
        addToCart() {
            this.$prompt('how much!', {
                onOk(value) {
                    this.$alert(value)
                },
                onCancel() {
                    this.$alert('cancel');
                }
            })
        },

        gotop() {
            this.scrollY = 0;
        },

        selectFilterOption(value) {
            this.isPopupShow = false;
            this.refresh();
        },

        afterPopupLeave() {
            this.isShowSpinner = true;
        },

        async refresh() {
            // this.$loading.open();
            this.isLoading = true;
            this.isEnd = false;

            const response = await this.$api.getGoodsList({
                page: 1,
                limit: this.limit,
                trend: this.trend
            });

            this.isLoading = false;
            if (200 == response.status) {
                this.list = [];
                this.list.push(...response.data);
                this.$loading.close();
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
        VGoTop,
        VAffix
    }
}

</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
@import '../scss/mixin.scss';

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
        .iframe {
            overflow: hidden;
        }
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
                .title {
                    width: 3rem;
                    margin: auto;
                    @include ellipsis(2);
                    text-align: left;
                    height: .64rem;
                    margin-top: $gutter/2;
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
