<template>
    <v-drawer v-model="isShowDrawer" :mode="'overlay'">
        <ul class="menu" slot="side">
            <router-link tag="li" :to="{path: '/index'}">What's New
            </router-link>
            <router-link :to="{path: '/checkout'}" tag="li">Checkout
            </router-link>
            <router-link :to="{path: '/payment'}" tag="li">payment
            </router-link>
            <li>All Personalized</li>
            <li>Personalized</li>
        </ul>
        <v-infinite-scroll>
            <h1 align="center" class="gutter-top">atom-ui</h1>

            <v-collapse :is-accordion="true">
                <v-collapse-item>
                    <h4 slot="header">表单</h4>
                    <v-cell>Input</v-cell>
                    <v-cell>Textarea</v-cell>
                    <v-cell @click="$router.push({'path': '/demos/switch'})">Switch</v-cell>
                    <v-cell>Radio</v-cell>
                    <v-cell>Checkbox</v-cell>
                    <v-cell>Picker</v-cell>
                    <v-cell>Stepper</v-cell>
                    <v-cell>Button</v-cell>
                </v-collapse-item>

                <v-collapse-item title="对话框">
                    <v-cell>Alert</v-cell>
                    <v-cell>Confirm</v-cell>
                    <v-cell>Confirm</v-cell>
                    <v-cell>Popup</v-cell>
                    <v-cell>Dialog</v-cell>
                    <v-cell>Mask</v-cell>
                </v-collapse-item>

                <v-collapse-item title="容器">
                    <v-cell>InfiniteScroll</v-cell>
                    <v-cell>VirtualScroller</v-cell>
                    <v-cell @click="$router.push({'path': '/demos/collapse'})">Collapse</v-cell>
                </v-collapse-item>

            </v-collapse>
        </v-infinite-scroll>
    </v-drawer>
</template>
<script>
import QRCode from 'qrcode';
import VCell from '@/packages/Cell/Cell';
import VDrawer from '@/packages/Drawer/Drawer';
import VCollapse from '@/packages/Collapse/Collapse';
import VCollapseItem from '@/packages/Collapse/CollapseItem';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
export default {
    name: 'Index',

    data() {
        return {
            isShowDrawer: false
        };
    },

    created() {},

    mounted() {},

    methods: {},

    components: {
        VCell,
        VDrawer,
        VInfiniteScroll,
        VCollapse,
        VCollapseItem
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
