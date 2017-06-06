<template>
    <div class="page-presale">
        <VPopup from="up" v-model="pupupV">
            <h1 slot="header">Please Pickup Date</h1>
            <list-item>
                <VSwitch v-model="bool">Switch</VSwitch>
            </list-item>
            <list-item>
                <VRadio v-model="radioV" :selfValue="1">Radio1</VRadio>
            </list-item>
            <list-item>
                <VRadio v-model="radioV" :selfValue="2">Radio1</VRadio>
            </list-item>
            <list-item @click.native="click" :hasArrow="true">Toast</list-item>
            <list-item @click.native="click1" :hasArrow="true">纯文字菜单2</list-item>
            <list-item :hasArrow="true">纯文字菜单3</list-item>
            <list-item @click.native="click" :hasArrow="true">Toast</list-item>
            <list-item @click.native="click1" :hasArrow="true">纯文字菜单2</list-item>
            <list-item :hasArrow="true">纯文字菜单3</list-item>
            <list-item @click.native="click" :hasArrow="true">Toast</list-item>
            <list-item @click.native="click1" :hasArrow="true">纯文字菜单2</list-item>
            <list-item :hasArrow="true">纯文字菜单3</list-item>
            <list-item @click.native="click" :hasArrow="true">Toast</list-item>
            <list-item @click.native="click1" :hasArrow="true">纯文字菜单2</list-item>
            <list-item :hasArrow="true"  style="padding-bottom: 0px;">纯文字菜单3</list-item>
        </VPopup>
        <ScrollView ref="scroll">
            <!-- tabs -->
            <Tabs v-model="tabSelect">
                <TabsItem>图片懒加载</TabsItem>
                <TabsItem>表单示例</TabsItem>
                <TabsItem>日历</TabsItem>
                <TabsItem>进度条</TabsItem>
                <TabsItem>顶部弹出菜单</TabsItem>
                <TabsItem>longlonglonglonglonglongtab4</TabsItem>
            </Tabs>
            <Swiper v-model="tabSelect">
                <SwiperItem>
                    <div @click="move" class="box" :style="{left: left + 'px', top: top + 'px'}"></div>
                    <ul @click="reset" class="list">
                        <li v-for="item in imgs">
                            <LazyLoad :element="element" :event="'scroll'" :isLoad="isLoad" width="100%" height="4rem" :src="item"></LazyLoad>
                        </li>
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
                <SwiperItem>
                    <v-circle :value="circleV" style="width:3rem;"></v-circle>
                    <div style="padding:15px;">
                        <v-line :value="circleV"></v-line>
                    </div>
                    <Slider v-model="circleV"></Slider>
                </SwiperItem>
                <!-- popup -->
                <SwiperItem>
                    <VButton @click="pupupV = true" type="ghost" icon="remove" :loading="false" :disabled="false" :inline="false">打开popup</VButton>
                </SwiperItem>
            </Swiper>
            <Spinner style="margin-top:20%;">loading</Spinner>
        </ScrollView>
    </div>
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

import VCircle from '@/packages/Progress/Circle'
import VLine from '@/packages/Progress/Line'

import VButton from '@/packages/Button/Button'
import VPopup from '@/packages/Dialog/Popup'




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
            pupupV: false,
            circleV: 70,
            element: null,
            isLoad: false,
            imgs: ['http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png', 'http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB146.png', 'http://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/Y/B/YB1008_2.jpg', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/0/R087.png', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/R/0/R079_1.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/0/R031B.jpg', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/R/0/R033D_1.jpg', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/1/R147_1.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/1/R146.png', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/r/0/r035_1.jpg', 'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/product/product-view-tab1.jpg'],
            top: 200,
            left: 0,
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

    mounted() {
        this.element = this.$refs.scroll.$el;
    },

    methods: {
        move() {
            this.isLoad = true;
            this.top = 500;
            this.left = 500;
        },

        reset() {
            this.isLoad = false;
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
        VInput,
        LazyLoad,
        VCircle,
        VLine,
        VButton,
        VPopup,
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-presale {
    position: relative;height: 100%;width: 100%;
    .box {
        height: 50px;
        width: 50px;
        background: $base;
        border-radius: 100%;
        position: fixed;
        z-index: 1000000;
        transition: 1s left linear, 1s top cubic-bezier(0.44, -0.64, 1, 1);
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
