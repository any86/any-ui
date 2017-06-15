<template>
    <div class="page-list">
        <!-- <Spinner v-if="-1 == status" style="margin-top:20%;">loading</Spinner> -->
        <!-- 页面 -->
        <ScrollView v-model="scrollY" class="scroll-list" @reach-bottom="getMore">
            <SwiperLayout></SwiperLayout>
            <div class="bar">
                <span @click="showPopup(0)">trend</span>
                <span @click="showPopup(1)">category</span>
                <span @click="showPopup(2)">sort</span>
            </div>
            <VPopup :isFixed="false" from="up" v-model="isPopupShow">
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
                <a v-for="item in list" class="item" tag="li" :to="{path: 'detail', query: {id: item.id}}" :key="item.id">
                    <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
                    <h5 align="center">{{item.title}}</h5>
                    <h6 align="center"><span>$</span>{{item.price}}</h6>
                </a>
            </ul>
            <p v-if="isEnd" class="empty">there is nothing</p>
            <Spinner class="spinner"></Spinner>
        </ScrollView>
    </div>
</template>
<script>
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VList from '@/packages/List/List.vue'
import VListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VRadio from '@/packages/Radio/Radio.vue'
// 布局
import SwiperLayout from './List/Swiper.layout'


export default {
    name: 'List',

    data() {
        return {
            scrollY: 0,
            bool: true,
            status: -1,
            isLoading: true,
            popupIndex: -1,
            isPopupShow: false,
            isEnd: false,
            list: [],
            trend: 2,
            page: 1,
            limit: 20,
        };
    },

    mounted() {
        this.refresh();
    },

    methods: {
        showPopup(index) {
            this.popupIndex = index;
            this.isPopupShow = true;
        },

        refresh() {
            this.isEnd = false;
            this.list = [];
            const params = {
                page: this.page,
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

        scrollY(){
            // this.$store.state.isShowHeader = false;
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
        SwiperLayout
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
    .bar {
        position: relative;
        height: .8rem;
        width: 100%;
        display: flex;
        >span {
            flex: 1;
            font-size: $big;
            line-height: .7rem;
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
                    animation: zoom 1s;
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
</style>
