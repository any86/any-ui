<template>
    <section class="row-gift">
        <header class="header">
            <Icon class="icon" value="gift"></Icon>
            <span class="text">
                <p class="text"> {{dataSource.title}}</p>
                <p class="text">One free gift for each qualified purchase.</p>
            </span>
        </header>
        <!--已选择-->
        <section class="row-gift-list">
            <section v-for="item in dataSource.children" :key="item.img" class="item">
                <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
                <span class="info">
                    <div class="row-1">
                        <a class="title">{{item.title}}</a>
                        <span class="price">FREE</span>
                    </div>
                    <div class="row-2">
                        <p class="info">Free gift</p>
                        <p class="count">x{{item.count}}</p>
                    </div>
                </span>
            </section>
        </section>
    
        <!--待选择-->
        <section class="row-gift-more">
            <section v-for="n in 2" :key="n">
                <h4 class="title">Free gift for ${{n}}00</h4>
                <main>
                    <VMask :value="true" :isFixed="false">
                        <span class="tip">spend more $15</span>
                    </VMask>
                    <VSwiper class="list" :options="{slidesPerView: 2}">
                        <VSwiperItem v-for="nn in 3" :key="nn" class="item">
                            <VLazyLoad class="img" :src="'xxxx'" :watch="scrollY"></VLazyLoad>
                            <span class="info">
                                <div class="row">
                                    <span class="tag">FREE</span>
                                    <span class="price">$20{{nn}}.00</span>
                                </div>
    
                                <!--<div class="button"><Icon value="check"></Icon></div>-->
    
                                <div class="button">Add It</div>
                            </span>
                        </VSwiperItem>
                    </VSwiper>
                </main>
    
            </section>
        </section>
    
    </section>
</template>
<script>
import VSwiper from '@/packages/Swiper/Swiper'
import VSwiperItem from '@/packages/Swiper/SwiperItem'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VMask from '@/packages/Dialog/Mask'
export default {
    name: 'GiftList',

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
        VLazyLoad, VSwiper, VSwiperItem, VMask
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .8rem;
.row-gift {
    margin: $gutter auto 0;
    background: $background;
    header {
        display: flex;
        padding: $gutter/3 $gutter;
        overflow: hidden;
        background: $background;
        border-bottom: 1px solid $lightest;
        box-sizing: content-box;
        .icon {
            font-size: $biggest;
            line-height: $headerHeight;
            color: $base;
        }
        .text {
            flex: 1;
            p {
                height: $headerHeight/2;
                line-height: $headerHeight/2;
                margin-left: 2*$gutter;
                &:nth-child(1) {
                    font-size: $big;
                }
                &:nth-child(2) {
                    font-size: $normal;
                    color: $light;
                }
            }
        }
    }

    .row-gift-list {
        .item {
            display: flex;
            overflow: hidden;
            padding: $gutter;
            border-bottom: 1px solid $lightest;
            min-width: 0;
            .img {
                align-self: center;
                display: block;
                width: 1.8rem;
                height: 1.8rem;
                margin-right: $gutter;
            }
            .info {
                flex: 1;
                min-width: 0;
                align-self: center;
                .row-1 {
                    height: .4rem;
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
                    margin-top:$gutter;
                    .info {
                        font-size: $big;
                        color: $light;
                        flex: 1;
                        line-height: .5rem;
                    }
                    .count {
                        font-size: $big;
                    }
                }
            }
        }
    }


    .row-gift-more {
        background: $background;
        overflow: hidden;
        >section {
            border-bottom: 1px solid $lightest;
            overflow: hidden;
            .title {
                margin: $gutter auto;
                text-align: center;
                display: block;
                width: 100%;
            }
            main {
                overflow: hidden;
                position: relative;
                .tip {
                    display:table;
                    margin:auto;
                    background: $sub;
                    color: $darkest;
                    border-radius: .6rem;
                    height: .6rem;line-height: .6rem;
                    margin-top: .7rem;
                    padding: 0 $gutter;
                }
                .list {
                    padding-bottom: $gutter;
                    .item {
                        border-right: 1px solid $lightest;
                        display: flex;
                        &:last-child {
                            border-right: none;
                        }
                        >.img {
                            margin: 0 $gutter 0 $gutter;
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        >.info {
                            margin-top:  $gutter;
                            padding-right:  $gutter;
                            flex: 1;
                            >.row {
                                display: flex;
                                >.tag {
                                    margin-right: $gutter;
                                    height: 0.2rem;
                                    line-height: 0.2rem;
                                }

                                >.price {
                                    font-size: $normal;
                                    flex: 1;
                                    height: 0.2rem;
                                    line-height: 0.2rem;
                                    text-decoration: line-through;
                                    color: $dark;
                                }
                            }

                            >.button {
                                display: inline-block;
                                padding: $gutter/3 0;
                                text-align: center;
                                border-radius: .5rem;
                                border: 1px solid $darkest;
                                margin-top: $gutter;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
