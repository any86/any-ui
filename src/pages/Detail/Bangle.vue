<template>
    <ScrollView v-model="scrollY" class="page-curve-engrave">
        <VGoTop v-show="0 < scrollY" @click.native="gotop"></VGoTop>
        <VBreadcrumb :dataSource="[{text: 'HOME'}, {text: 'CHspanRMS'}, {text: 'PHOTO CHspanRMS'}, {text: 'SHELL LOCKET'}]"></VBreadcrumb>
        <!-- 轮播 -->
        <LayoutSlider></LayoutSlider>

        <LayoutBaseInfo></LayoutBaseInfo>

        <LayoutTip></LayoutTip>

        <LayoutRelatedProducts></LayoutRelatedProducts>

        <LayoutOtherCustomerView></LayoutOtherCustomerView>

        <!-- 吸附的tabs -->
        <VAdsorb :scrollY="scrollY" @mounted="getTabsTop" @click="scrollY = tabsTop">
            <v-tabs v-model="tabsIndex">
                <v-tabs-item>{{$lang.DETAIL_TABS_DETAILS}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_REVIEW}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_INFORMATION}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_SHIPPING}}</v-tabs-item>
            </v-tabs>
        </VAdsorb>
        <div v-show="0 == tabsIndex" class="row-info-detail">
            <p>Christmas with jingle-bell charms, etc. Soufeel Jewelry is perfect for any special day. Every 925 sterling silver charm bead can be chosen and bought by oneself to do the tie-in, arbitrary combination, choosing his/her beloved color to match elegant dressing style, 26 letters to create their own name or English abbreviations, and silver charms to compose splendid classic charm bracelet. With your combination, a bit more freedom to try, through your imagination, all sorts of different types of beads together, design your unique personalized bracelet from Soufeel Jewelry. Whether it is romantic sentiment, family motifs, hobby or an array of other themes, you can always find the perfect gift ideas to personalize your - or someone else’s - jewelry “For Every Memorable Day”.</p>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_03-mobile.jpg'" :watch="scrollY"></v-lazy-load>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_04-mobile.jpg'" :watch="scrollY"></v-lazy-load>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_01-mobile.jpg'" :watch="scrollY"></v-lazy-load>
        </div>
        <div v-show="1 == tabsIndex" class="reviews">
            Reviews
        </div>
        <div v-show="2 == tabsIndex" class="information">
            Information
        </div>
        <div v-show="3 == tabsIndex" class="shipping">
            Shipping
        </div>
        <!-- 底部上传按钮 -->
        <button @click="addToCart" class="button button-danger button-block fixed-bottom">ADD ENGRAVING</button>

        <VDialog v-model="isShowEngraving">
            <LayoutEngrave></LayoutEngrave>
            <button slot="footer" class="button button-danger button-block">ok</button>
        </VDialog>

    </ScrollView>
</template>
<script>
import LayoutBaseInfo from './Common/BaseInfo'
import LayoutSelectSize from './Common/SelectSize'
import LayoutSlider from './Common/GoodsSlider'
import LayoutTip from './Common/Tip'
import LayoutRelatedProducts from './Common/RelatedProducts'
import LayoutOtherCustomerView from './Common/OtherCustomerView'
import LayoutEngrave from './Bangle/CurveEngrave'


import VAdsorb from '@/packages/Adsorb/Adsorb'
import VGoTop from '@/components/GoTop'
import VBreadcrumb from '@/packages/Breadcrumb/Breadcrumb'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'
import VDialog from '@/packages/Dialog/Dialog'

export default {
    name: 'Bangle',

    data() {
        return {
            scrollY: 0,
            tabsIndex: 0,
            isShowEngraving: false
        };
    },

    methods: {
        addToCart() {
            this.isShowEngraving = true;
        },

        getTabsTop({ top }) {
            this.tabsTop = top;
        },

        gotop() {
            this.scrollY = 0;
        }
    },

    components: {
        VGoTop, VBreadcrumb, VLazyLoad, VTabs, VTabsItem, VAdsorb, VDialog,
        LayoutBaseInfo, LayoutSlider, LayoutRelatedProducts, LayoutTip, LayoutOtherCustomerView,LayoutEngrave
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.page-curve-engrave {
    padding: 0 $gutter;


    .row-info-detail {
        padding: $gutter;
        p {
            line-height: 1.5;
        }
        .img {
            margin: $gutter auto;
            width: 100%;
            min-height: 7rem;
            overflow: hidden;
        }
        .img[lazy="done"] {
            animation: fadeIn 1s;
        }
    }
}
</style>
