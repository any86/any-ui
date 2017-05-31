<template>
    <ScrollView class="page-presale">
        <!-- tabs -->
        <Tabs v-model="tabSelect">
            <TabsItem>tab1a</TabsItem>
            <TabsItem>表单示例</TabsItem>
            <TabsItem>tab5</TabsItem>
            <TabsItem>tab6</TabsItem>
            <TabsItem>longtab3</TabsItem>
            <TabsItem>longlonglonglonglonglongtab4</TabsItem>
        </Tabs>
        <Swiper v-model="tabSelect" :autoplay="false">
            <SwiperItem>
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
            </SwiperItem>
            <SwiperItem>
                <list>
                    <list-item>
                        <VSwitch v-model="bool">SWITCH</VSwitch>
                    </list-item>
                    <list-item>
                        <VRadio v-model="radioV" :selfValue="1">单选1</VRadio>
                    </list-item>

                    <list-item>
                        <VRadio v-model="radioV":selfValue="2">单选2</VRadio>
                    </list-item>

                    <list-item :hasArrow="true">纯文字菜单1</list-item>
                    <list-item :hasArrow="true">纯文字菜单2</list-item>
                    <list-item :hasArrow="true">纯文字菜单3</list-item>

                </list>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ccc;font-size: 1rem;line-height: 4rem;text-align: center;">2</div>
            </SwiperItem>
        </Swiper>
        <Spinner style="margin-top:20%;">loading</Spinner>
    </ScrollView>
</template>
<script>
import List from '@/packages/List/List.vue'
import ListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VRadio from '@/packages/Radio/Radio.vue'



import Spinner from '@/packages/Spinner/Spinner.vue'
import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
import Badge from '@/packages/Badge/Badge'
export default {
    name: 'Presale',

    data() {
        return {
            radioV: 1,
            bool: true,
            tabSelect: 1,
            titles: ['tab1', 'tab2', 'tab3', 'tab4'],
            acitve: 0
        };
    },

    components: {
        List,
        ListItem,
        VRadio,
        VSwitch,
        Spinner,
        Tabs,
        TabsItem,
        Badge,
        Swiper,
        SwiperItem,
    }
}
</script>
<style scoped lang="scss">
.page-presale {
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
}
</style>
