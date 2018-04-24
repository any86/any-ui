<template>
    <main>
        <img :src="dataURL" style="display:block;" width="300" height="300" class="gutter-auto gutter-top"/>
        <canvas ref="canvas" width="300" height="300" class="border gutter-auto gutter-top"></canvas>
        
        <section v-if="isFontLoaded && isImgLoaded" class="fill">
            <a-textarea v-model="text"/>
        </section>
        <a-spinner-three-dots v-else/>
        <section class="fill">
            <a-button :is-block="true" @click="convert">转换</a-button>
        </section>
    </main>
</template>
<script>
import WebFont from 'webfontloader';
export default {
    name: 'TestDemo',

    data() {
        return {
            isFontLoaded: false,
            isImgLoaded: false,
            text: 'djiw',
            ctx: null,
            canvas: null,
            dataURL: '',
            img: null,
            imgURL: 'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/K/N/KNL02.jpg'
        };
    },

    async mounted() {
        WebFont.load({
            custom: {
                families: ['Cochin', 'CommercialScript'],
                urls: ['./static/fonts.css']
            },

            fontactive: (familyName, fvd) => {
                this.isFontLoaded = true;
                this.draw();
                // log(familyName, fvd)
            }
        });

        this.loadImg();
    },

    methods: {
        loadImg(){
            const img = new Image();
            img.src = this.imgURL;
            img.onload = e=>{
                this.isImgLoaded = true;
                this.img = img;
            };
        },

        draw() {
            const fontHeight = 48;
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.clearRect(0, 0, 300, 300);
            this.ctx.font = `${fontHeight}px Cochin`;
            this.ctx.textAlign = 'center';
            this.text.split('').forEach((text, i) => {
                this.ctx.fillText(text, 50, 50 * (i + 1));
            });
        },

        convert() {
            this.dataURL = this.canvas.toDataURL('image/png');
        }
    },

    watch: {
        text() {
            this.draw();
        }
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
