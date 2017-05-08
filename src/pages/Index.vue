<template>
    <ScrollView>
        <Tabs>
            <TabsItem title="标签1">
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
            <TabsItem title="标签2">2222</TabsItem>
            <TabsItem title="标签3">33333</TabsItem>
        </Tabs>
    </ScrollView>
</template>
<script>
import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';

export default {
    name: 'Index',

    components: {
        Tabs,
        TabsItem
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
