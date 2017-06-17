<template>
    <ScrollView v-model="scrollY" class="page-bag">
        <LayoutHeader :title="static.title"></LayoutHeader>
        <!-- 购物车 -->
        <VListView class="row-goods">
            <VListItem class="header">
                <Icon class="icon" value="line-chart"></Icon>
                <p class="text">Buy Two Save One</p>
                <p class="btn-piece-togethe">piece togethe > </p>
            </VListItem>
            <VListItem v-for="item in static.goodsList" :key="item.id" class="item">
                <span class="checkbox"><VCheckbox class="ui"></VCheckbox></span>
                <VLazyLoad class="img" :src="item.img" :watch="scrollY">
                </VLazyLoad>
                <span class="info-1">
                        <h4>{{item.title}}</h4>
                        <p>{{item.info}}</p>
                    </span>
                <span class="info-2">
                        <p>{{item.price}}</p>
                        <p>x{{item.count}}</p>
                    </span>
            </VListItem>
        </VListView>
        <!-- 礼品 -->
        <VListView class="row-gifts">
            <VListItem class="header">
                <Icon class="icon" value="gift"></Icon>
                <p class="text">CHOOSE YOU FREE GIFT</p>
            </VListItem>
            <VListItem v-for="item in static.gifts" :key="item.id" class="item">
                <VLazyLoad class="img" :src="item.img" :watch="scrollY">
                </VLazyLoad>
                <span class="info-1">
                        <h4>{{item.title}}</h4>
                        <p>{{item.info}}</p>
                    </span>
                <span class="info-2">
                        <p>FREE</p>
                        <p>x{{item.count}}</p>
                    </span>
            </VListItem>
        </VListView>
        <!-- 更多礼品 -->
        <LayoutGiftMore :dataSource="static.giftMore" :scrollY="scrollY"></LayoutGiftMore>
    </ScrollView>
</template>
<script>
import LayoutHeader from './Bag/Header'
import VListView from '@/packages/List/List'
import VListItem from '@/packages/List/ListItem'
import VBadge from '@/packages/Badge/Badge'
import VCheckbox from '@/packages/Checkbox/Checkbox'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'


import LayoutGiftMore from './Bag/GiftMore'


export default {
    name: 'Bag',

    data() {
        return {
            static: {
                title: '',
                goodsList: [],
                gifts: [],
                giftMore: []
            },
            scrollY: 0
        }
    },

    mounted() {
        this.$api.getBagPage().then(response => {
            this.static = {...this.static,
                ...response.data
            };
        });
    },

    components: {
        VListView,
        VListItem,
        VBadge,
        VCheckbox,
        LayoutHeader,
        VLazyLoad,

        LayoutGiftMore,
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
    .row-goods {
        .header {
            display: flex;
            height: .8rem;
            overflow: hidden;
            .icon {
                font-size: .4rem;
                display: block;
                float: left;
                color: $base;
            }
            .text {
                display: block;
                float: left;
                margin-left: 2*$gutter;
            }
            .btn-piece-togethe {
                display: block;
                float: right;
                text-align: right;
                font-size: $big;
                color: $base;
            }
        }
        .item {
            overflow: hidden;
            .checkbox {
                width: .8rem;
                height: 100%;
                display: flex;
                align-items: center;
                float: left;
            }
            .img {
                display: block;
                width: 1.6rem;
                height: 1.6rem;
                margin-left: $gutter;
                float: left;
            }
            .info-1 {
                flex: 1;
                margin-left: 3*$gutter;
                float: left;
                h4,
                p {
                    font-size: $big;
                }
            }
            .info-2 {
                display: block;
                font-size: $big;
                width: 50px;
                text-align: right;
                float: right;
                p {
                    font-size: $big;
                }
            }
        }
    }
    .row-gifts {
        margin: 3*$gutter auto 0;
        .header {
            display: flex;
            height: .8rem;
            overflow: hidden;
            .icon {
                float: left;
                font-size: .4rem;
                color: $base;
            }
            .text {
                float: left;
                line-height: .4rem;
                margin-left: 2*$gutter;
            }
        }
        .item {
            padding-left: .8rem;
            .img {
                display: block;
                float: left;
                width: 1.6rem;
                height: 1.6rem;
                margin-left: $gutter;
            }
            .info-1 {
                flex: 1;
                float: left;
                margin-left: 3*$gutter;
                h4,
                p {
                    font-size: $big;
                }
            }
            .info-2 {
                display: block;
                float: right;
                font-size: $big;
                width: 50px;
                text-align: right;
                p {
                    font-size: $big;
                }
            }
        }
    }

}
</style>
