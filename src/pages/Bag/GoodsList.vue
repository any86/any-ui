<template>
    <section class="row-goods-list">
        <header>
            <Icon class="icon" value="line-chart"></Icon>
            <p class="text">{{dataSource.title}}</p>
            <p class="btn-piece-togethe">{{dataSource.linkText}}</p>
        </header>
        <VSwiperOut v-model="isCheckedList[i]" v-for="(item, i) in dataSource.children" :key="item.id" @touchstart="closeOther(i)">
            <section class="item-container">
                <VCheckbox class="checkbox"></VCheckbox>
                <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
                <span class="info">
                    <div class="row-1">
                        <a class="title">{{item.title}}</a>
                        <span class="price">{{item.price}}</span>
                </div>
                <div class="row-2">
                    <p class="info">{{item.info}}</p>
                    <VStepper class="steppr" v-model="countList[i]"></VStepper>
                </div>
                </span>
            </section>
            <template slot="actions">
                <VSwiperOutButton class="btn-del">remove</VSwiperOutButton>
            </template>
        </VSwiperOut>
    </section>
</template>
<script>
import VSwiperOut from '@/packages/SwiperOut/SwiperOut'
import VSwiperOutButton from '@/packages/SwiperOut/SwiperOutButton'
import VStepper from '@/packages/Stepper/Stepper'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VCheckbox from '@/packages/Checkbox/Checkbox'

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
            countList: [],
            isCheckedList: []
        };
    },

    created() {
        this.dataSource.children.forEach(item => {
            this.countList.push(~~item.count);
            this.isCheckedList.push(false);
        })
    },

    methods: {
        closeOther(selfIndex) {
            this.isCheckedList.forEach((item, i) => {
                if (i != selfIndex) {
                    this.isCheckedList[i] = false;
                }
            });
        }
    },
    components: {
        VLazyLoad,
        VSwiperOut,
        VSwiperOutButton,
        VCheckbox,
        VStepper,
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .88rem;
.row-goods-list {
    background: $background;
    header {
        height: $headerHeight;
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid $lightest;
        padding: 0 3*$gutter;
        .icon {
            line-height: $headerHeight;
            font-size: $biggest;
            display: block;
            float: left;
            color: $base;
        }
        .text {
            font-size: $big;
            display: block;
            float: left;
            margin-left: 2*$gutter;
            line-height: $headerHeight;
        }
        .btn-piece-togethe {
            display: block;
            float: right;
            text-align: right;
            font-size: $big;
            color: $base;
            line-height: $headerHeight;
        }
    }
    .item-container {
        display: flex;
        min-width: 0;
        border-bottom: 1px solid $lightest;
        height: 2.4rem;
        padding: 0 2*$gutter;
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
                .steppr {}
            }
        }
    }
    .btn-del {
        background: $darkest;
        color: $sub;
        padding: 0 3*$gutter;
    }
}
</style>
