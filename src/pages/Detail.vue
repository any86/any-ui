<template>
    <ScrollView ref="scroll" v-model="scrollY" class="page-detail">
        <div class="breadcrumb">
            <a>HOME</a>
            <a>CHARMS</a>
            <a>PHOTO CHARMS</a>
            <a>SHELL LOCKET</a>
        </div>
        <h1>{{overlayData}}</h1>
        


        <img style="padding:15px 15px 0 15px" width="100%" :src="overlaidBase64">
        <ImageTools :dataSource="static.imageTools" :file="upload.file" @change="reOverlay" @overlaid="overlaid"></ImageTools>
        <div class="info-base">
            <h3>Shell Locket Photo Charm</h3>
            <h4>$80.00</h4>
            <h5>Fits all major brands of bracelets</h5>
            <h5>This item requires 1-3 days to handcraft.</h5>
        </div>
        <v-tabs v-model="tabsIndex">
            <v-tabs-item>Details</v-tabs-item>
            <v-tabs-item>Reviews</v-tabs-item>
            <v-tabs-item>Information</v-tabs-item>
            <v-tabs-item>Shipping</v-tabs-item>
        </v-tabs>
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
            Information
        </div>
        <div v-show="3 == tabsIndex" class="shipping">
            Shipping
        </div>
        <!-- 上传进度 -->
        <VMask :value="'upload' == upload.status">
            <VCircle style="width:3rem;margin:2rem auto 0" v-model="upload.progress"></VCircle>
            <Spinner v-show="100 > upload.progress">{{upload.text}}</Spinner>
            <p v-show="100 == upload.progress" class="text-success">{{upload.textCongratulation}}</p>
        </VMask>

        <!-- 底部上传按钮 -->
        <LayoutFooterUpload :dataSource="static.footerUpload" @loaded="imageLoaded" ></LayoutFooterUpload>
    </ScrollView>
</template>
<script>
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VTabs from '@/packages/Tabs/Tabs'
import VTabsItem from '@/packages/Tabs/TabsItem'

import LayoutFooterUpload from './Detail/FooterUpload'

import ImageTools from '@/packages/ImageTools/ImageTools'
import VUpload from '@/packages/Upload/Upload'
import VMask from '@/packages/Dialog/Mask'
import VCircle from '@/packages/Progress/Circle'
import VToast from '@/packages/Toast/Toast'

export default {
    name: 'Detail',

    data() {
        return {
            overlayData: {
                x: 0, y: 0, scale: 1, rotate: 0
            },
            overlaidBase64: '',
            static: {
                imageTools: {
                    overlay: './static/C022.png',
                },
                footerUpload: {
                    url: './mock/upload',
                    headers: {},
                    params: {},
                },
            },
            upload: {
                file: null,
                position: {},
                textCongratulation: 'congratulation!',
                text: 'please wait upload...',
                url: './mock/upload',
                progress: 0,
                status: 'wait',
            },
            scrollY: 0,
            tabsIndex: 0
        };
    },

    mounted() {

    },

    methods: {
        reOverlay(overlayData){
            this.overlayData = overlayData;
        },

        imageLoaded(file){
            this.upload.file = file;
        },

        updateUploadStatus(status) {
            if ('success' == status) {
                setTimeout(() => {
                    this.upload.status = status;
                    this.upload.isFirst = false;
                }, 1000);
            } else {
                this.upload.status = status;
            }
        },

        overlaid(base64){
            this.overlaidBase64 = base64;
        }
    },

    components: {
        ImageTools,
        Spinner,
        VLazyLoad,
        VTabs,
        VTabsItem,
        VUpload,
        VMask,
        VCircle,
        VToast,
        LayoutFooterUpload

    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-detail {
    // 面包屑
    .breadcrumb {
        margin: $gutter * 3;
        a {
            font-size: $small;
            display: inline-block;
            &.active {
                color: $base;
            }
        }
        a:not(:last-of-type) {
            &:after {
                color: #000;
                content: '>';
                margin: auto 5px;
            }
        }
    }
    .text-success {
        text-align: center;
        color: $dark;
        font-size: $biggest;
    }
    .info-base {
        padding: 3*$gutter;
    }
    .info-detail {
        padding: 15px;
        p {
            line-height: 1.5;
            font-size: $normal;
        }
        .img {
            margin: $gutter * 3 auto;
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
