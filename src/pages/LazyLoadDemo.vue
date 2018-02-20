<template>
    <v-scroll-view  class="demo-page" >
        <v-segment v-model="index" @input="changeSegment" class="gutter-top">
            <v-segment-item>竖着排</v-segment-item>
            <v-segment-item>横着排</v-segment-item>
        </v-segment>

        <div v-show="0 == index" class="list">
            <div class="list__item" v-for="item in images" :key="item">
                <v-lazy-load :src="item" class="image"/>
            </div>
        </div>

        <div v-show="1 == index" class="list-v">
            <div class="list-v__item" v-for="item in images" :key="item">
                <v-lazy-load :src="item" class="image" ref="lazy"/>
            </div>
        </div>
    </v-scroll-view>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad';
import VScrollView from '@/packages/ScrollView/ScrollView';
import VCell from '@/packages/Cell/Cell';
import VSegment from '@/packages/Segment/Segment';
import VSegmentItem from '@/packages/Segment/SegmentItem';

const images = [
    'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR05_1.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR06_3.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR09_1.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/2/R215_2.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR17_3.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR20.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL374.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL401.png',
    'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL219.png'
];
export default {
    name: 'LazyLoadDemo',

    data() {
        return {
            images,
            imageSpc:
                'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL433.png',
            isShow: true,
            index: 0
        };
    },

    mounted() {},

    methods: {
        changeSegment() {
            this.$refs.lazy.forEach(el => {
                el.$el.lazyload();
            });
        },

        changeSrc(){
            this.images.splice(0,1,this.imageSpc);
        }
    },

    components: {
        VScrollView,
        VCell,
        VLazyLoad,
        VSegment,
        VSegmentItem
    }
};
</script>
<style scop lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}

.seg {
    width: 230px;
    height: 50px;
    border: 1px solid $base;
    margin: $gutter auto;
    display: flex;
    align-items: center;
    label {
        flex: 1;
        display: block;
        input {
            display: none;
        }
        span {
            text-align: center;
            color: $base;
            display: block;
        }
        input:checked + span {
            background: $base;
            color: $sub;
            height: 50px;
            line-height: 50px;
        }
    }
}

.list {
    width: 100%;
    &__item {
        padding: 15px;
        img {
            width: 60%;
            display: block;
            margin: auto;
        }
    }
}

.list-v {
    width: 100%;
    display: flex;
    overflow: scroll;
    &__item {
        flex: 0 0 60%;
        img {
            margin: $gutter auto;
            width: 100%;
        }
    }
}
</style>
