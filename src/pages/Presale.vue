<template>
    <ScrollView class="page-presale">
        <!-- tabs -->
        <Tabs v-model="tabSelect">
            <TabsItem>图片懒加载</TabsItem>
            <TabsItem>表单示例</TabsItem>
            <TabsItem>日历</TabsItem>
            <TabsItem>tab6</TabsItem>
            <TabsItem>longtab3</TabsItem>
            <TabsItem>longlonglonglonglonglongtab4</TabsItem>
        </Tabs>
        <Swiper v-model="tabSelect" :autoplay="false">
            <SwiperItem>
                

                <LazyLoad src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png">
                </LazyLoad>




                <div @click="move" class="box" :style="{left: left + 'px', top: top + 'px'}">1</div>
                <ul @click="reset" class="list">
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
                        <VSwitch v-model="bool">Switch</VSwitch>
                    </list-item>
                    <list-item>
                        <VRadio v-model="radioV" :selfValue="1">Radio1</VRadio>
                    </list-item>
                    <list-item>
                        <VRadio v-model="radioV" :selfValue="2">Radio2</VRadio>
                    </list-item>
                    <list-item>
                        <Slider v-model="rangeV">Slider</Slider>
                    </list-item>
                    <list-item>
                        <Stepper v-model="StepperV">Stepper</Stepper>
                    </list-item>
                    <list-item>
                        <VInput v-model="rangeV">Input</VInput>
                    </list-item>
                    <list-item @click.native="click" :hasArrow="true">Toast</list-item>
                    <list-item @click.native="click1" :hasArrow="true">纯文字菜单2</list-item>
                    <list-item :hasArrow="true">纯文字菜单3</list-item>
                </list>
            </SwiperItem>
            <SwiperItem>
                <DateTime v-model="date"></DateTime>
            </SwiperItem>


        </Swiper>
        <Spinner style="margin-top:20%;">loading</Spinner>
    </ScrollView>
</template>
<script>
import LazyLoad from '@/packages/LazyLoad/LazyLoad'


import List from '@/packages/List/List.vue'
import ListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VRadio from '@/packages/Radio/Radio.vue'
import Slider from '@/packages/Slider/Slider'
import Stepper from '@/packages/Stepper/Stepper'
import VInput from '@/packages/Input/Input'

import DateTime from '@/packages/DateTime/Date'


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
            top: 200, left: 0,
            date: '2017-01-01',
            inputV: '',
            StepperV: 3,
            rangeV: 10,
            radioV: 1,
            bool: true,
            tabSelect: 0,
            titles: ['tab1', 'tab2', 'tab3', 'tab4'],
            acitve: 0
        };
    },

    methods: {
        move(){
            this.top = 500;
            this.left = 500;
        },

        reset(){
            this.top = 200;
            this.left = 0;
        },

        click() {
            this.$toast('操作成功!', {
                type: 'success'
            });
        },

        click1() {
            this.$toast('操作失败!');
        }
    },

    components: {
        List,
        Stepper,
        DateTime,
        ListItem,
        VRadio,
        VSwitch,
        Spinner,
        Tabs,
        TabsItem,
        Badge,
        Swiper,
        SwiperItem,
        Slider,
        Stepper,
        VInput, LazyLoad
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-presale {
    .box {
        height: 50px;
        width: 50px;
        background: $base;
        border-radius: 100%;
        position: fixed;
        z-index: 1000000;
        transition: 1s left linear, 1s top cubic-bezier(0.44,-0.64, 1, 1);
    }
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
