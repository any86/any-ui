<template>
    <ScrollView class="page-ring-diy">
        <div class="preview">
            <h4>preview your choose</h4>
            <svg ref="svg" style="margin-left:10%; width:80%;" viewBox="0 0 300 300" externalResourcesRequired="true">
                <path ref="circle" id="circle" d="M71.848,172.678c40.339,3.897,98.644,9.831,175.932-2.033" stroke="rgba(0,0,0,0)" fill="none" style="stroke-width: 2px;"></path>
                <!-- <image overflow="visible" width="300" height="300" xlink:href="https://static.soufeel.com/media/catalog/product/cache/0/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/C/R/CR02_5.png"></image> -->
                <image overflow="visible" width="300" height="300" xlink:href="../../../static/SL013-IN.png"></image>
                <text :x="centerX" text-anchor="middle">
                    <textPath xlink:href="#circle">{{text}}</textPath>
                </text>
            </svg>
        </div>

        <ul>
            <li v-if="1 == conditions.type" v-for="(conditions, i) in dataSource.conditions" :key="conditions.key" class="cell">
                <h4>Crystals {{i+1}}</h4>
                <section class="condition">
                    <VSwiper :options="{slidesPerView :'auto'}">
                        <VSwiperItem v-for="(item, j) in conditions.children" :key="j" class="small">
                            <img class="small-img" :src="item.src">
                        </VSwiperItem>
                    </VSwiper>
                </section>
            </li>
            <li class="cell">
                <h4>ABC Engravings 1</h4>
                <VInput v-model="text" placeholder="please input" class="custom-input"></VInput>
            </li>
            <li class="cell">Ring Size</li>
        </ul>
    </ScrollView>
</template>
<script>
import VCell from '@/packages/Cell/Cell'
import VInput from '@/packages/Input/Input'
import VSpinner from '@/packages/Spinner/Spinner.vue'
import VSwiper from '@/packages/Swiper/Swiper.vue'
import VSwiperItem from '@/packages/Swiper/SwiperItem.vue'

export default {
    name: 'RingDiy',

    data() {
        return {
            text: 1,
            dataSource: {
                conditions: [{
                    type: 1,
                    key: 'key1',
                    children: [
                        { id: 1, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW29188.png' },
                        { id: 2, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW25308.png' },
                        { id: 3, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26141.png' },
                        { id: 4, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW177427.png' },
                        { id: 5, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW28555.png' },
                        { id: 6, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png' }
                    ]
                }, {
                    type: 1,
                    key: 'key2',
                    children: [
                        { id: 1, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW29188.png' },
                        { id: 2, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW25308.png' },
                        { id: 3, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26141.png' },
                        { id: 4, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW177427.png' },
                        { id: 5, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW28555.png' },
                        { id: 6, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png' }
                    ]
                }, {
                    type: 2,
                    key: 'key3',
                    children: [
                        { id: 1, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW29188.png' },
                        { id: 2, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW25308.png' },
                        { id: 3, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26141.png' },
                        { id: 4, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW177427.png' },
                        { id: 5, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW28555.png' },
                        { id: 6, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png' }
                    ]
                }, {
                    type: 3,
                    key: 'key4',
                    children: [
                        { id: 1, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW29188.png' },
                        { id: 2, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW25308.png' },
                        { id: 3, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26141.png' },
                        { id: 4, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW177427.png' },
                        { id: 5, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW28555.png' },
                        { id: 6, src: 'https://static.soufeel.com/media/textdesign/diamond/display/SW26077.png' }
                    ]
                }]
            },
            centerX: 0,
            scrollY: 0,
            tabsIndex: 0,
        };
    },

    mounted() {
        this.centerX = this.$refs.circle.getTotalLength() / 2;
    },

    methods: {
        preview() {

        }
    },

    components: {
        VSpinner, VCell, VSwiper, VSwiperItem, VInput
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
        h4 {
            position: absolute;
            bottom: 0;
            left: 0;
            line-height: 1.5;
            padding: $gutter;
            right: 0;
            color: $base;
            text-align: center;
        }
    }

    ul {
        >li {
            >section {
                padding-top: $gutter / 4;
                .small {
                    width: .6rem;
                    height: .6rem;
                }
                .small-img {
                    width: .6rem;
                    height: .6rem;
                    display: block;
                }
            }

            >.custom-input {
                height: 0.8rem;
            }
        }
    }
}
</style>
