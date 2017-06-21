<template>
    <section class="row-gift-list">
        <header class="header">
            <Icon class="icon" value="gift"></Icon>
            <p class="text">{{dataSource.title}}</p>
        </header>
        <section v-for="item in dataSource.children" class="item">
            <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
            <span class="info">
                <div class="row-1">
                    <a class="title">{{item.title}}</a>
                    <span class="price">FREE</span>
            </div>
            <div class="row-2">
                <p class="info">free gift</p>
                <p class="count">x{{item.count}}</p>
            </div>
            </span>
        </section>
    </section>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'

export default {
    name: 'GoodsList',

    props: {
        dataSource: {
            required: true
        },

        scrollY: {
            required: true
        }
    },

    data() {
        return {
            goodsList: []
        };
    },

    mounted() {
        this.goodsList = JSON.parse(JSON.stringify(this.dataSource));
    },

    methods: {
        closeOther(selfIndex) {
            this.goodsList.forEach((item, i) => {
                if (i != selfIndex) {
                    this.goodsList[i].isOpen = false;
                }
            });
        }
    },
    components: {
        VLazyLoad,
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .88rem;
.row-gift-list {
    margin: 3*$gutter auto 0;
    background: $background;
    header {
        padding: 0 3*$gutter;
        display: flex;
        height: $headerHeight;
        overflow: hidden;
        background: $background;
        border-bottom: 1px solid $lightest;
        .icon {
            float: left;
            font-size: $biggest;
            line-height: $headerHeight;
            color: $base;
        }
        .text {
            float: left;
            font-size: $big;
            line-height: $headerHeight;
            margin-left: 2*$gutter;
        }
    }
    .item {
        display: flex;
        overflow: hidden;
        padding: 2*$gutter;
        border-bottom: 1px solid $lightest;
        min-width: 0;
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
                height: .5rem;
                display: flex;
                .title {
                    display: block;
                    flex: 1;
                    min-width: 0;
                    font-size: $big;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .price {
                    width: 1rem;
                    display: block;
                    text-align: right;
                    font-size: $big;
                }
            }
            .row-2 {
                display: flex;
                height: .5rem;
                margin-top: .1rem;
                .info {
                    font-size: $big;
                    color: $light;
                    flex: 1;
                    line-height: .5rem;
                }
                .count{font-size: $big;}
            }
        }
    }
}
</style>
