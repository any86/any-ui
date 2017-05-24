<template>
    <ScrollView class="page-index">

        <Spinner slot="background"></Spinner>
        <!-- 轮播 -->
        <Swiper style="height: 4rem;">
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ddd;font-size: 32px;line-height: 4rem;text-align: center;">1</div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ccc;font-size: 32px;line-height: 4rem;text-align: center;">2</div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#bbb;font-size: 32px;line-height: 4rem;text-align: center;">3</div>
            </SwiperItem>
        </Swiper>
        <!-- tabs -->
        <Tabs>
            <TabsItem title="tab1">
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
            </TabsItem>
            <TabsItem title="tab2">
                2222
            </TabsItem>
            <TabsItem title="tab3">33333</TabsItem>
            <TabsItem title="tab4tab4">4444</TabsItem>
            <TabsItem title="tab5">5555</TabsItem>
            <TabsItem title="tab6">666</TabsItem>
            <TabsItem title="tab7">777</TabsItem>
        </Tabs>
    </ScrollView>
</template>
<script>
import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
import Badge from '@/packages/Badge/Badge'


export default {
    name: 'Index',

    data() {
        return {
            acitve: 0
        };
    },

    components: {
        Tabs,Badge,
        TabsItem,
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped lang="scss">
.list {
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
