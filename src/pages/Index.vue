<template>
    <ScrollView class="page-index">
        <Spinner slot="background"></Spinner>
        <!-- 轮播 -->
        <Swiper v-model="swiperValue" :loop="true">
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ddd;font-size: 1rem;line-height: 4rem;text-align: center;">
                    1
                </div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ccc;font-size: 1rem;line-height: 4rem;text-align: center;">2</div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#bbb;font-size: 1rem;line-height: 4rem;text-align: center;">3</div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#69c;font-size: 1rem;line-height: 4rem;text-align: center;">4</div>
            </SwiperItem>
        </Swiper>
        <!-- tabs -->
       
       
        <Tabs v-model="tabSelect">
            <TabsItem>tab1a</TabsItem>
            <TabsItem>tab2b<Badge type="danger">3</Badge></TabsItem>
            <TabsItem>tab3c</TabsItem>
        </Tabs>


        <Carousel v-model="tabSelect" :autoplay="false">
            <CarouselItem>
                <ul class="list">
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB146.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB1008_2.jpg"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/D/Y/DY1053.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB146.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB1008_2.jpg"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/D/Y/DY1053.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB146.png"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB1008_2.jpg"></li>
                    <li><img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/D/Y/DY1053.png"></li>
                </ul>
            </CarouselItem>
            <CarouselItem>
                <div style="width:100%;height: 4rem;background:#ccc;font-size: 1rem;line-height: 4rem;text-align: center;">2</div>
            </CarouselItem>
        </Carousel>
    </ScrollView>
</template>
<script>
import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';
import {Carousel, CarouselItem} from '@/packages/Carousel'
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
import Badge from '@/packages/Badge/Badge'


export default {
    name: 'Index',

    data() {
        return {
            swiperValue: 0,
            tabSelect: 0,
            titles: ['tab1', 'tab2', 'tab3', 'tab4'],
            acitve: 0
        };
    },

    components: {
        Tabs,TabsItem,
        Badge,
        Swiper,
        SwiperItem,
        Carousel, CarouselItem,
    }
}
</script>
<style scoped lang="scss">
.list {
    display: block;
    overflow: hidden;
    li {
        float: left;
        width: 50%;
        box-sizing: border-box;
        display: block;
        img {
            display: block;
            width: 100%;
        }
    }
}
</style>
