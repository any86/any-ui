<template>
    <div class="row-looks">
        <h3 class="title">SHOP THESE LOOKS</h3>
        <div class="breadcrumb">
            <a v-for="(item, i) in dataSource.breadcrumb" @click="activeIndex = i" :class="{active: activeIndex == i}">{{item}}</a>
        </div>
        <Swiper v-if="dataSource.swiper" class="swiper" v-model="activeIndex" :realIndex.sync="realIndex" :options="swiperOptions">
            <SwiperItem v-for="(swiperItem, i) in dataSource.swiper" :key="i" class="swiper-item">
                <transition-group class="item-img" name="fade" tag="div" @before-enter="beforeEnter" @enter="enter" :css="false">
                    <template v-for="item in swiperItem">
                        <!-- 图片 -->
                        <img class="transition" v-if="undefined != item.src" v-show="i == realIndex" :key="item" :src="item.src" :style="{width: item.width, height: item.height, top: item.top, left: item.left, position: 'absolute'}" :data-delay="item.delay" />
                        <!-- 文字 -->
                        <h4 class="transition" v-else-if="undefined != item.text" v-show="i == realIndex" :key="item" :style="{top: item.top, left: item.left, position: 'absolute', 'font-size': item.fontSize}" :data-delay="item.delay">{{item.text}}</h4>
                    </template>
                </transition-group>
                <ul class="list">
                    <li><img :src="dataSource.goodsImg[2*i]"></li>
                    <li><img :src="dataSource.goodsImg[2*i+1]"></li>
                </ul>
            </SwiperItem>
        </Swiper>
    </div>
</template>
<script>
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
export default {
    name: 'CategoryThumb',

    props: {
        dataSource: {
            required: true
        }
    },

    data() {
        return {
            activeIndex: 0,
            swiperOptions: {
                spaceBetween: 30
            },
            realIndex: 0
        }
    },

    methods: {
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transition = 'all 0s';
        },

        enter(el) {
            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transition = 'all 1s';
            }, el.dataset.delay)
        },
    },

    components: {
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-looks {
    overflow: hidden;
    .title {
        margin: .3rem auto;
        text-align: center;
        display: block;
    }
    // 面包屑
    .breadcrumb {
        text-align: center;
        a {
            font-size: $normal;
            display: inline-block;
            &.active {
                color: $base;
            }
        }
        a:not(:last-of-type) {
            &:after {
                color: #000;
                content: '/';
                margin: auto 5px;
            }
        }
    }
    .swiper {
        background: #fff;
        .swiper-item {
            .item-img {
                position: relative;
                width: 100%;
                height: 6rem;
                // width: 80%;
            }
            .list {
                display: flex;
                width: 100%;
                li {
                    flex: 1 0 50%;
                    box-sizing: border-box;
                    &:nth-child(2n+1) {
                        padding-right: 1.5*$gutter;
                    }
                    &:nth-child(2n+2) {
                        padding-left: 1.5*$gutter;
                    }
                    img {
                        display: block;
                        width: 100%;
                        background: #f2f8f4;
                    }
                }
            }
        }
        .cover {
            width: 4rem;
        }
    }
    // .transition{transition:all 1s;}
}
</style>
