<template>
    <ScrollView ref="scroll" v-model="scrollY" class="page-detail">
        <button class="fixed-bottom button-block button-danger">ADD TO CART</button>
        <v-breadcrumb :dataSource="[{text: 'HOME'}, {text: 'CHspanRMS'}, {text: 'PHOTO CHspanRMS'}, {text: 'SHELL LOCKET'}]"></v-breadcrumb>
        <!-- 轮播 -->
        <layout-slider></layout-slider>
        <!-- 基础信息 -->
        <layout-baseInfo></layout-baseInfo>
        <!-- 预览 -->
        <layout-preview></layout-preview>

        <layout-tip></layout-tip>

    
        <!-- tabs -->
        <v-tabs v-model="tabsIndex">
            <v-tabs-item>Details</v-tabs-item>
            <v-tabs-item>Reviews</v-tabs-item>
            <v-tabs-item>Information</v-tabs-item>
            <v-tabs-item>Shipping</v-tabs-item>
        </v-tabs>
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
    </ScrollView>
</template>
<script>
import LayoutSlider from './NameNecklace/Slider'
import LayoutBaseInfo from './NameNecklace/BaseInfo'
import LayoutPreview from './NameNecklace/Preview'
import LayoutTip from './NameNecklace/Tip'




import VBreadcrumb from '@/packages/Breadcrumb/Breadcrumb.vue'


import VSpinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'



export default {
    name: 'NormalType',

    data() {
        return {

            
            scrollY: 0,
            tabsIndex: 0,
        };
    },

    mounted() {

    },



    components: {
        LayoutSlider, LayoutBaseInfo, LayoutPreview,LayoutTip,
        VSpinner,
        VLazyLoad,
        VTabs,
        VTabsItem, VBreadcrumb
    },

    watch: {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.page-detail {

    
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
