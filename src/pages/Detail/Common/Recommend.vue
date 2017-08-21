<template>
    <section class="row-recommend">
        <h3>{{$lang.DETAIL_WE_ALSO_RECOMEND}}</h3>
        <VSwiper :options="{slidesPerView :2}" class="slider">
            <VSwiperItem v-for="item in dataSource" :key="item.src" class="item">
                <img class="img" :src="item.src">
                <h5>xxxx</h5>
                <div class="price">
                    <span>$10</span>
                    <span>$20</span>
                </div>
            </VSwiperItem>
        </VSwiper>
    </section>
</template>
<script>
import VSwiper from '@/packages/Swiper/Swiper'
import VSwiperItem from '@/packages/Swiper/SwiperItem'
export default {
    name: 'Recommend',

    props: {
        dataSource: {
            type: Array,
            default() {
                return [
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/X/S/XS1587_1_.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/X/S/XS1583_4.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/4/6/46125_1.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png' },
                    { src: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/0/C021A-us.png' }
                ];
            }
        }
    },

    methods: {

    },

    components: {
        VSwiper, VSwiperItem

    }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.row-recommend {
    h3 {
        padding: $gutter 0;
        text-align: center;
        border-top: 1px solid $lightest;
    }
    .slider {
        border-top: 1px solid $lightest;
        border-bottom: 1px solid $lightest;
        .item {
            border-right: 1px solid $lightest;
            &:last-chilid() {
                border-right: none;
            }
            img {
                display: block;
                width: 2rem;
                height: 2rem;
                margin: auto;
            }

            h5 {
                text-align: center;
                color: $light;
            }
            .price {
                display: table;
                margin: auto;
                span:nth-child(2n+1) {
                    margin-right: $gutter/2;
                }
                span:nth-child(2n) {
                    color: $light;
                }
            }
        }
    }
}
</style>
