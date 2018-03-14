<template>
    <main>
        <!-- <a-popup :is-show.sync="isShow" from="left">
            <a-virtual-scroller :isStopPropagation="true" @scroll="scroll">
                <a-input v-model="text" class="border fill" style="margin-top: 100px; width:100%;"/>
                <div v-for="(image, n) in images" :key="image" class="border-bottom fill">
                    <a-lazy-load ref="lazyload" :src="image" class="image"/>
                    <h4 align="center">第{{n}}行信息</h4>
                </div>
            </a-virtual-scroller>
        </a-popup> -->

        <a-mask :is-show.sync="isShow">
            <a-input v-model="text" class="border fill" style="margin-top: 100px; width:60%;"/>
        </a-mask>
        <a-cell class="gutter-top">
            <a-button :is-block="true" type="success" @click="isShow=true">打开</a-button>
        </a-cell>
        <a-cell v-for="n in 70" :key="n" class="border-bottom fill">{{n}}</a-cell>
    </main>
</template>
<script>
const images = ['https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR05_1.png', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR06_3.png', 'https://static.soufeel.com/media/catalog/product/cache/0/thumbnail/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR09_1.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/R/2/R215_2.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR17_3.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/R/CR20.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL374.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL401.png', 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/C/X/CXL219.png'];
export default {
    name: 'TabsDemo',

    data() {
        return {
            text: '',
            images: [],
            isShow: false,
            pos1: {
                y: 0,
                x: 0
            },

            pos2: {
                y: 0,
                x: 0
            }
        };
    },

    mounted() {
        setTimeout(() => {
            this.images = images;
        }, 500);
    },

    methods: {
        scroll() {
            this.$refs.lazyload.forEach(img => {
                img.lazyload();
            });
        }
    },

    watch: {
        // ['pos1.y'](scrollTop){
        //     log(scrollTop)
        // },
        // ['pos2.y'](scrollTop){
        //     log(scrollTop)
        //     this.$refs.lazyload.forEach(img=>{
        //         img.lazyload();
        //     })
        // }
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';

.image {
    padding: $gutter;
    margin: auto;
    height: 300px;
}
</style>
