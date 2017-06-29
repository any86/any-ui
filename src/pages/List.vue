<template>
    <section class="page-list">
        <LayoutHeader ref="header"></LayoutHeader>
        <div class="filter">
            <span @click="showPopup(0)">trend</span>
            <span @click="showPopup(1)">category</span>
            <span @click="showPopup(2)">sort</span>
        </div>
        <ScrollView ref="scroll" v-model="scrollY" class="scroll-list" @reach-bottom="getMore" :ovh="isPopupShow">
            <!-- 列表和筛选条件 -->
            <div class="content">
                <VPopup :isFixed="false" from="up" v-model="isPopupShow" @after-leave="afterPopupLeave" :style="{top: `${filter.isFixed ? filter.height : 0}px`}">
                    <template v-if="0 == popupIndex">
                        <v-list-item>
                            <v-radio v-model="trend" :selfValue="1">time</v-radio>
                        </v-list-item>
                        <v-list-item>
                            <v-radio v-model="trend" :selfValue="2">sale</v-radio>
                        </v-list-item>
                        <v-list-item>
                            <v-radio v-model="trend" :selfValue="3">store</v-radio>
                        </v-list-item>
                        <v-list-item>
                            <v-radio v-model="trend" :selfValue="4">age</v-radio>
                        </v-list-item>
                        <v-list-item>
                            <v-switch v-model="bool">remember</v-switch>
                        </v-list-item>
                    </template>
                    <h2 v-else-if="1 == popupIndex" slot="header">Please Pickup trend</h2>
                    <h2 v-else-if="2 == popupIndex" slot="header">Please Pickup sort</h2>
                </VPopup>
                <ul class="list">
                    <router-link v-for="item in list" class="item" tag="li" :to="{path: 'detail', query: {id: item.id}}" :key="item.id">
                        <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
                        <h5 align="center">{{item.title}}</h5>
                        <h6 align="center"><span>$</span>{{item.price}}</h6>
                    </router-link>
                </ul>
                <Spinner v-show="isShowSpinner && !isEnd"></Spinner>
                <p v-if="isEnd" class="empty">there is nothing</p>
            </div>
        </ScrollView>
        <!--         <transition name="fadeDown">
            <div v-show="isScrollUp" class="footer-fixed">
                <LayoutFooter></LayoutFooter>
            </div>
        </transition> -->
    </section>
</template>
<script>
import Drawer from '@/packages/Drawer/Drawer'

import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VList from '@/packages/List/List.vue'
import VListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VRadio from '@/packages/Radio/Radio.vue'

// 公共头尾
import LayoutHeader from './List/Header'
import LayoutFooter from '@/components/Footer'


export default {
    name: 'List',

    data() {
        return {
            isShowSide: false,


            isShowSpinner: true,
            ovh: false,
            scrollY: 100,
            swiperHeight: -1,
            filter: {
                offsetTop: -1,
                isFixed: false,
                top: -1,
                height: -1
            },
            header: {
                height: -1,
            },
            isEnd: false,
            isScrollUp: false,
            isScrollDown: false,


            bool: true,
            status: -1,
            isLoading: true,
            popupIndex: -1,
            isPopupShow: false,

            list: [],
            trend: 2,
            page: 1,
            limit: 20,
        };
    },

    mounted() {
        this.refresh();
        this.header.height = this.$refs.header.$el.offsetHeight;
    },

    methods: {
        showPopup(index) {
            this.isShowSpinner = false;
            this.$nextTick(() => {
                this.popupIndex = index;
                this.isPopupShow = true;
            });
            // var style = getComputedStyle(this.$refs.swiper.$el, null);
            // dir(style)
        },

        afterPopupLeave() {
            this.isShowSpinner = true;
        },

        refresh() {
            this.isEnd = false;
            this.list = [];
            const params = {
                page: 1,
                limit: this.limit,
                trend: this.trend
            };
            this.$api.getGoodsList(params).then(response => {
                if (0 == response.data.status) {
                    this.isEnd = true;
                } else {
                    this.list = response.data.content;
                    this.isLoading = false;
                }
            });
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
                    if (0 == response.data.status) {
                        this.isEnd = true;
                    } else {
                        this.list.push(...response.data.content);
                        this.isLoading = false;
                    }
                });
            }
        }
    },

    watch: {
        trend() {
            this.isPopupShow = false;
            this.refresh();
        },

        scrollY(newValue, oldValue) {
            this.filter.isFixed = this.filter.offsetTop < newValue;
            if (this.filter.isFixed) {
                this.filter.top = this.header.height;
            } else {
                this.filter.top = 0;
            }
            if (newValue >= oldValue) {
                this.isScrollDown = true;
                this.isScrollUp = false;
            } else {
                this.isScrollDown = false;
                this.isScrollUp = true;
            }


        },

        isPopupShow(value) {
            this.ovh = value;
        }
    },

    components: {
        VList,
        VListItem,
        Spinner,
        VLazyLoad,
        VPopup,
        VRadio,
        VSwitch,
        LayoutHeader,
        LayoutFooter,
        Drawer
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
    .filter {
        border-top: 1px solid $lightest;
        background: #fff;
        position: relative;
        height: 1rem;
        width: 100%;
        display: flex;
        >span {
            flex: 1;
            font-size: $big;
            line-height: .9rem;
            text-align: center;
            border-color: $lightest;
            border-style: solid;
            border-width: 1px 1px 1px 0;
            &:last-child {
                border-right-width: 0;
            }
        }
    }
    .scroll-list {
        height: 100%;
        position: relative;
        flex-basis: 100%;
        flex-shrink: 1;
        flex-grow: 1;
        .content {
            position: relative;
            overflow: hidden;
            .list {
                display: flex;
                flex-flow: row wrap;
                >.item {
                    flex: 0 0 50%;
                    >.img {
                        overflow: hidden;
                        margin: auto;
                        width: 3rem;
                        height: 3rem;
                    }
                    >.img[lazy="loading"] {}
                    >.img[lazy="done"] {
                        animation: zoomIn 1s;
                    }
                }
            }
            .spinner {
                // margin: 30px auto;
            }
            .empty {
                text-align: center;
                font-size: .3rem;
                color: $light;
                margin: 30px auto;
            }
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
