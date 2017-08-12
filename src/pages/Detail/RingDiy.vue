<template>
    <ScrollView class="page-ring-diy">
        <div class="preview">
            <h5>Shell Locket2a Photo CharmShell Locket2a Photo Cet2a Photo Cet2a Photo Charm</h5>
            <img src="https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/C/R/CR02_5.png" />
        </div>
        <VCell :hasArrow="true" border @click="showPopup(0)">Crystals 1</VCell>
        <VCell :hasArrow="true" border @click="showPopup(1)">Crystals 2</VCell>
        <VCell :hasArrow="true" border @click="showPopup(2)">ABC Engravings</VCell>
        <VCell :hasArrow="true" border @click="showPopup(3)">Ring Size</VCell>
    
        <VPopup v-model="isShowPopup">
            <header slot="header">pick one</header>
            <section class="condition">
                <VSwiper :options="{slidesPerView :'auto'}">
                    <VSwiperItem class="small">
                        <img class="small-img" src="https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png">
                    </VSwiperItem>
                    <VSwiperItem class="small">
                        <img class="small-img" src="https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png">
                    </VSwiperItem>
                    <VSwiperItem class="small">
                        <img class="small-img" src="https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png">
                    </VSwiperItem>
                    <VSwiperItem class="small">
                        <img class="small-img" src="https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png">
                    </VSwiperItem>
                    <VSwiperItem class="small">
                        <img class="small-img" src="https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png">
                    </VSwiperItem>
                    <VSwiperItem class="small">
                        <img class="small-img" src="https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png">
                    </VSwiperItem>
                </VSwiper>
            </section>
        </VPopup>
    </ScrollView>
</template>
<script>
import VCell from '@/packages/Cell/Cell'
import VPopup from '@/packages/Dialog/Popup'
import VSpinner from '@/packages/Spinner/Spinner.vue'
import VSwiper from '@/packages/Swiper/Swiper.vue'
import VSwiperItem from '@/packages/Swiper/SwiperItem.vue'

export default {
    name: 'RingDiy',

    data() {
        return {
            dataSource: {

            },
            scrollY: 0,
            tabsIndex: 0,
            isShowPopup: true,
        };
    },

    methods: {
        showPopup(index) {
            this.isShowPopup = true;
        }
    },

    components: {
        VSpinner, VCell, VPopup, VSwiper, VSwiperItem
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.page-ring-diy {
    .preview {
        position: relative;
        padding: $gutter; // border-bottom: 1px solid $lightest;
        img {
            display: block;
            width: 100%;
        }
        h5 {
            position: absolute;
            bottom: 0;
            left: 0;
            line-height: 1.5;
            padding: $gutter;
            right: 0;
        }
    }
    .small {
        width: 1rem;
        height: 1rem;
    }
    .small-img {
        width: 1rem;
        height: 1rem;
        display: block;
    }
    .condition {
        padding: $gutter;
    }
}
</style>
