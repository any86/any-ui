<template>
    <ScrollView ref="scroll" v-model="scrollY" @scroll="liveScrollY=$event" class="page-detail">
        <VGoTop  @click="scrollY=0"></VGoTop>
        <LayoutHeader></LayoutHeader>
        <div class="divider"></div>
        <VBreadcrumb :dataSource="[{text: 'HOME'}, {text: 'CHspanRMS'}, {text: 'PHOTO CHspanRMS'}, {text: 'SHELL LOCKET'}]"></VBreadcrumb>
        <!-- charm tools -->
        <ImageTools :dataSource="dataSource.imageTools" :dataURL="userDataURL" @change="changeImageTools">
        </ImageTools>
        <div class="info-base">
            <h3>Shell Locket Photo Charm</h3>
            <h4 class="price">R$80.00
                <small>R$123</small>
            </h4>
    
            <h5>you save R$63</h5>
            <h6 class="gutter text-danger">(22% off)</h6>
    
            <div class="paypal gutter">
                <a>We now support </a>
                <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/product/view/pp-logo.png" alt="">
            </div>
    
            <VWarning>Buy now and pay over time
                <a class="text-info" @click="isShowDialogLearnMore = true"> learn more</a>
            </VWarning>
    
            <VWarning @click="isShowDialogMistakes = true">Avoid These Common Mistakes</VWarning>
    
            <VWarning>Failed to upload photos?
                <a class="text-danger" @click="isShowDialogFailUpload = true">click here</a>
            </VWarning>
            <VWarning>
                <a class="text text-danger">This item requires 1-3 days to handcraft.</a>
            </VWarning>
        </div>
        <!-- 吸附的tabs -->
        <VAffix :scrollY="liveScrollY" @mounted="getTabsTop" @click="scrollY = tabsTop">
            <v-tabs v-model="tabsIndex">
                <v-tabs-item>{{$lang.DETAIL_TABS_DETAILS}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_REVIEW}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_INFORMATION}}</v-tabs-item>
                <v-tabs-item>{{$lang.DETAIL_TABS_SHIPPING}}</v-tabs-item>
            </v-tabs>
        </VAffix>
    
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
        <LayoutFooterUpload :dataSource="dataSource.footerUpload" :isLockConfrim="'loading' == dataSource.imageTools.status" :overlayDataURL="overlayDataURL" @loaded="loadUserImg" @upload-done="uploadDone">
        </LayoutFooterUpload>
    
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
    
        <VMask v-model="isShowDialogMistakes">
            <VDialog v-model="isShowDialogMistakes">
                <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/product/photocharms-alert.jpg" width="100%">
            </VDialog>
        </VMask>
    
        <VMask v-model="isShowDialogFailUpload">
            <VDialog v-model="isShowDialogFailUpload">
                <div class="clickhere" id="ticket_notice" style="display: block;">
                    <p>1. Your photo dimension may not comply, please use another photo if possible.</p>
                    <p>2. If the error encountered on your mobile device, we suggest you to try on PC.</p>
                    <p>3. If you need help, please request a
                        <a href="javascript: void(0);" onclick="javascript: window.open('http://support.soufeel.com/visitor/index.php?/Default/LiveChat/Chat/Request/_sessionID=/_promptType=chat/_proactive=0/_filterDepartmentID=1/_randomNumber=56l1zet0776vzeumo149qew7vntoqexs/_fullName=/_email=/', 'livechatwin', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=0,resizable=1,width=600,height=680');" class="livechatlink">Live Chat</a> or contact us by
                        <a role="button" id="sub_ticket">Submit a ticket</a>
                    </p>
                </div>
            </VDialog>
        </VMask>
    
    </ScrollView>
</template>
<script>
import VAffix from '@/packages/Affix/Affix'
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'

import LayoutHeader from '@/components/Header'
import LayoutResult from './Charm/Result'
import LayoutFooterUpload from './Charm/FooterUpload'
import LayoutRecommend from './Common/Recommend'

import VBreadcrumb from '@/packages/Breadcrumb/Breadcrumb'
import ImageTools from '@/packages/ImageTools/ImageTools'
import VUpload from '@/packages/Upload/Upload'
import VMask from '@/packages/Dialog/Mask'
import VDialog from '@/packages/Dialog/Dialog'
import VStepper from '@/packages/Stepper/Stepper'
import VGoTop from '@/components/GoTop'
import VCircle from '@/packages/Progress/Circle'
import VWarning from '@/packages/Warning/Warning'

import VToast from '@/packages/Toast/Toast'

export default {
    name: 'CharmType',

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
            liveScrollY: 0,
            tabsIndex: 0,
            isShowMask: false,
            isShowDialogPreview: false,
            isShowDialogLearnMore: false,
            isShowDialogMistakes: false,
            isShowDialogFailUpload: false,
            tabsTop: 0,

        };
    },

    methods: {
        getTabsTop({ top }) {
            this.tabsTop = top;
        },

        uploadDone(base64) {
            this.isShowDialogPreview = true;
        },
        /**
         * 读取用户上传图片的base64
         */
        loadUserImg(dataURL) {
            this.userDataURL = dataURL;
        },

        /**
         *imageTools发生变化
         */
        changeImageTools(canvas) {
            this.overlayDataURL = canvas.toDataURL();
        }
    },

    components: {
        ImageTools, VBreadcrumb, VGoTop,
        Spinner, VAffix,
        VLazyLoad, VStepper,
        VTabs,
        VTabsItem,
        VUpload,
        VMask, VDialog,
        VCircle,
        VToast, VWarning,
        LayoutHeader,
        LayoutFooterUpload,
        LayoutResult, LayoutRecommend
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
