<template>
    <ScrollView ref="scroll" v-model="scrollY" class="page-detail">
        <VGoTop v-show="0 < scrollY" @click.native="gotop"></VGoTop>
        <LayoutHeader></LayoutHeader>
        <div class="divider"></div>
        <VBreadcrumb :dataSource="[{text: 'HOME'}, {text: 'CHspanRMS'}, {text: 'PHOTO CHspanRMS'}, {text: 'SHELL LOCKET'}]"></VBreadcrumb>
        <!-- 轮播 -->
        <LayoutSlider></LayoutSlider>
        <div class="info-base">
            <h4>Shell Locket Photo Charm</h4>
            <small>sku: XNL160</small>
            <div class="divider gutter"></div>
    
            <h4 class="price">R$80.00</h4>
            <span class="tag tag-success">news</span>
            <div class="paypal gutter">
                <a>We now support </a>
                <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/product/view/pp-logo.png" alt="">
            </div>
    
            <VWarning>Buy now and pay over time
                <a class="text-info" @click="isShowDialogLearnMore = true"> learn more</a>
            </VWarning>
    
        </div>
        <!-- 吸附的tabs -->
        <VAdsorb :scrollY="scrollY" @mounted="getTabsTop" @click="scrollY = tabsTop">
            <v-tabs v-model="tabsIndex">
                <v-tabs-item>{{$lang.DETAIL_TABS_DETAILS}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_REVIEW}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_INFORMATION}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_SHIPPING}}</v-tabs-item>
            </v-tabs>
        </VAdsorb>
    
        <div v-show="0 == tabsIndex" class="info-detail">
            <p>Christmas with jingle-bell charms, etc. Soufeel Jewelry is perfect for any special day. Every 925 sterling silver charm bead can be chosen and bought by oneself to do the tie-in, arbitrary combination, choosing his/her beloved color to match elegant dressing style, 26 letters to create their own name or English abbreviations, and silver charms to compose splendid classic charm bracelet. With your combination, a bit more freedom to try, through your imagination, all sorts of different types of beads together, design your unique personalized bracelet from Soufeel Jewelry. Whether it is romantic sentiment, family motifs, hobby or an array of other themes, you can always find the perfect gift ideas to personalize your - or someone else’s - jewelry “For Every Memorable Day”.</p>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_03-mobile.jpg'" :watch="scrollY"></v-lazy-load>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_04-mobile.jpg'" :watch="scrollY"></v-lazy-load>
            <v-lazy-load class="img" :src="'https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/personalized-charm-new/over1_01-mobile.jpg'" :watch="scrollY"></v-lazy-load>
        </div>
        <div v-show="1 == tabsIndex" class="reviews">
            Reviews
        </div>
        <div v-show="2 == tabsIndex" class="information">
            <table>
                <tr v-for="n in 10" :key="n">
                    <td width="50%">{{n}}
                    </td>
                    <td width="50%">{{n*2}}</td>
                </tr>
            </table>
        </div>
        <div v-show="3 == tabsIndex" class="shipping">
            You can choose the delivery method during checkout: USPS First Class Shipping- Cost: $5.99 - Free over $49 Please Allow up to 8 business days for delivery via USPS If Your order has Personalized Products, please allow up to 10 business days for USPS delivery. DHL Express Shipping- Cost: $19.95 - Free over $150 Please allow up to 3 business days for delivery via DHL If Your order has Personalized Products, please allow up to 5 business days for DHL delivery. Please note that the time frame mentioned above includes production time.
        </div>
    
        <!-- 底部上传按钮 -->
        <footer class="fixed-bottom flex">
            <VCell class="flex-item" :hasArrow="true">Checkout</VCell>
            <button class="button button-danger button-block flex-item">Add To Cart</button>
        </footer>
    
        <LayoutRecommend></LayoutRecommend>
    
        <VMask v-model="isShowDialogPreview">
            <VDialog v-model="isShowDialogPreview">
                <h3 slot="header">confrim your design</h3>
                <img :src="overlayDataURL" width="100%">
                <div class="count">
                    <h5>count: {{count}}</h5>
                    <span v-for="n in 10" :key="n" @click="count=n" :class="{active: n == count}">{{n}}</span>
                </div>
    
                <template slot="footer">
                    <div class="flex">
                        <button class="button button-default button-block flex-item">Add To Cart & Design Another</button>
                        <button class="button button-danger button-block flex-item">Checkout</button>
                    </div>
                </template>
            </VDialog>
        </VMask>
    
        <VMask v-model="isShowDialogLearnMore">
            <VDialog v-model="isShowDialogLearnMore">
                <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/product/view/pp-view.jpg" width="100%">
            </VDialog>
        </VMask>
    
    </ScrollView>
</template>
<script>
import LayoutHeader from '@/components/Header'
import LayoutSlider from './Common/GoodsSlider'
import LayoutResult from './Charm/Result'
import LayoutFooterUpload from './Charm/FooterUpload'
import LayoutRecommend from './Common/Recommend'

import VCell from '@/packages/Cell/Cell'
import VAdsorb from '@/packages/Adsorb/Adsorb'
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'
import VBreadcrumb from '@/packages/Breadcrumb/Breadcrumb'
import ImageTools from '@/packages/ImageTools/ImageTools'
import VMask from '@/packages/Dialog/Mask'
import VDialog from '@/packages/Dialog/Dialog'
import VStepper from '@/packages/Stepper/Stepper'
import VGoTop from '@/components/GoTop'
import VCircle from '@/packages/Progress/Circle'
import VWarning from '@/packages/Warning/Warning'
import VToast from '@/packages/Toast/Toast'

export default {
    name: 'NecklaceType',

    data() {
        return {
            dataSource: {
                imageTools: {
                    status: 'ready',
                },

                footerUpload: {
                    url: './mock/upload',
                    headers: {},
                    params: {},
                },
            },
            count: 1,
            upload: {},
            userDataURL: '',
            overlayDataURL: '',
            scrollY: 0,
            tabsIndex: 0,
            isShowDialogLearnMore: false,
            tabsTop: 0,

        };
    },

    methods: {
        getTabsTop({ top }) {
            this.tabsTop = top;
        },

        gotop() {
            this.scrollY = 0;
        }
    },

    components: {
        ImageTools, VBreadcrumb, VGoTop,
        Spinner, VAdsorb,
        VLazyLoad, VStepper,
        VTabs,
        VTabsItem,
        VMask, VDialog,
        VCircle, VCell,
        VToast, VWarning,
        LayoutHeader,
        LayoutFooterUpload,
        LayoutResult, LayoutRecommend, LayoutSlider
    },

    watch: {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.page-detail {
    padding-bottom: 1.5rem;
    .text-success {
        text-align: center;
        color: $dark;
        font-size: $biggest;
    }
    .info-base {
        padding: $gutter;
        .price {
            small {
                font-size: $normal;
                text-decoration: line-through;
            }
        }
    }
    .info-detail {
        padding: 15px;
        p {
            line-height: 1.5;
            font-size: $normal;
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


    .paypal {
        a {
            display: inline-block;
            vertical-align: middle;
        }
        img {
            display: inline-block;
            vertical-align: middle;
        }
    }
    .count {
        margin: $gutter auto;
        span {
            display: inline-block;
            height: .6rem;
            line-height: .6rem;
            width: .6rem;
            text-align: center;
            border: 1px solid $lightest;
            border-right: none;
            &:last-child {
                border-right: 1px solid $lightest;
            }
            &.active {
                border: 1px solid $base;
            }
        }
    }

    .shipping {
        padding: $gutter;
    }
}
</style>
