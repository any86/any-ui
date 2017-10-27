<template>
    <v-drawer v-model="isShowDrawer" :mode="'overlay'">
        <ul class="menu" slot="side">
            <router-link tag="li" :to="{path: '/index'}">What's New<v-tag type="primary" :is-ghost="false">shose</v-tag></router-link>
            <router-link :to="{path: '/checkout'}" tag="li">Checkout <v-tag type="success" :is-ghost="false">shose</v-tag></router-link>
            <router-link :to="{path: '/payment'}" tag="li">payment <v-tag type="warning" :is-ghost="false">shose</v-tag></router-link>
            <li>All Personalized</li>
            <li>Personalized</li>
        </ul>
        <v-infinite-scroll @scroll-bottom="isBottom=true" v-model="scrollTop" :isListenBottom="true">
            <v-tabs v-model="tabsIndex">
                <v-tabs-item v-for="text in tabs.list" :key="text">{{text}}</v-tabs-item>
            </v-tabs>
            <v-cell><v-stepper v-model="tabsIndex"></v-stepper></v-cell>
            <v-cell>
                <v-switch v-model="isShowDrawer">打开弹窗</v-switch>
            </v-cell>
            <!-- <v-popup-picker :isShow.sync="isShow" :dataSource="dataSource" v-model="value">请选择数字</v-popup-papicker> -->
            <v-picker :dataSource="dataSource" v-model="value"></v-picker>

            <v-cell @click="renderHandler" :arrow="0">
                render
                <v-tag type="primary">shose</v-tag>
                <v-tag type="success">isShor</v-tag>
                <v-tag type="info">打开</v-tag>
                <v-tag type="warning">警告render</v-tag>
            </v-cell>

            <v-cell v-for="n in 5" :key="n" class="abc">第{{n}}次</v-cell>
            <v-cell>
                <v-input placeholder="请输入数字" v-model="value[0]"><span style="width:60px;display:inline-block;">生产月份</span></v-input>
            </v-cell>

            <v-cell>
                <v-input v-model="value[1]"><span style="width:60px;display:inline-block;">日期</span></v-input>
            </v-cell>

            <v-cell v-for="n in 5" :key="n" class="abc">第{{n}}次</v-cell>

            <v-affix>
                <v-cell class="fixed">{{scrollTop}}</v-cell>
            </v-affix>

            <v-cell v-for="n in 50" :key="n" class="abc">第{{5+n}}次</v-cell>
            <v-spinner v-show="isBottom"></v-spinner>
        </v-infinite-scroll>
    </v-drawer>
</template>
<script>
import QRCode from 'qrcode';

import VDrawer from '@/packages/Drawer/Drawer';
import VSpinner from '@/packages/Spinner/Spinner';
import VAffix from '@/packages/Affix/Affix';
import VTabs from '@/packages/Tabs/Tabs';
import VTabsItem from '@/packages/Tabs/TabsItem';
import VStepper from '@/packages/Stepper/Stepper';

import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
import VSwitch from '@/packages/Switch/Switch';
import VRadio from '@/packages/Radio/Radio';
import VDialog from '@/packages/Dialog/Dialog';
import VPicker from '@/packages/Picker/Picker';
import VPopupPicker from '@/packages/PopupPicker/PopupPicker';
import VTag from '@/packages/Tag/Tag';

import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';

import Mock from 'mockjs';
export default {
    name: 'Index',

    data() {
        return {
            tabsIndex: 2,
            isShowDrawer: false,
            isShow: false,
            list: Mock.mock({
                'list|20': [
                    {
                        'label|+1': 1,
                        'value|+1': 1
                    }
                ]
            }),
            tabs: Mock.mock({
                'list|10': ['@province()']
            }),
            value: [12, 15],
            scrollTop: 0,
            isBottom: false,
            dataSource: [],
            map: { a: 1, b: 2 },
            list2: [1, 2, 3]
        };
    },

    created() {
        this.dataSource.push(this.list.list, this.list.list);
    },

    mounted() {

    },

    methods: {
        
        renderHandler(){
            this.$alert(321)
        }
    },

    components: {
        VCell,
        VSwitch,
        VRadio,
        VDialog,
        VInfiniteScroll,
        VInput,
        VPicker,
        VSpinner,
        VAffix,
        VPopupPicker,
        VDrawer,
        VTabs,VTag,
        VTabsItem,VStepper
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.fixed {
    background: rgba(#69c, 1) !important;
    color: #fff !important;
    text-align: center;
    box-shadow: $shadowDown;
}

.scroll-view {
    flex: 1;
    padding: 0 0.3rem 0.3rem 0.3rem;
}
.menu {
    display: block;
    background: $background;
    li {
        padding: $gutter;
        display: block;
        border-bottom: 1px solid $lightest;
    }
}

.abc {
    background: #eee;
    &:nth-child(2n + 1) {
        background: #fff;
    }
}
</style>
