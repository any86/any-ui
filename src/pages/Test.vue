<template>
    <main>
        <img :src="dataURL" style="display:block;" width="300" height="300" class="gutter-auto gutter-top"/>
        <canvas ref="canvas" width="300" height="300" class="border gutter-auto gutter-top"></canvas>
        
        <section v-if="isFontLoaded && isImgLoaded" class="fill">
            <a-textarea v-model="text"/>
        </section>
        <a-spinner-three-dots v-else/>
        <section class="fill">
            <a-button :is-block="true" @click="saveDataURL">开始</a-button>
            <a-button type="success" :is-block="true" @click="change" class="gutter-top gutter-bottom">换一个</a-button>
            
        </section>
    </main>
</template>
<script>
import axios from 'axios';
import WebFont from 'webfontloader';
export default {
    name: 'TestDemo',

    data() {
        return {
            chars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQKRSTUVWXYZ',
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
                families: ['Cochin'],
                urls: ['./static/fonts.css']
            },

            fontactive: (familyName, fvd) => {
                this.isFontLoaded = true;

                this.text = this.randomText();
                this.draw(this.text);
                this.convert();

            }
        });

        this.loadImg();
    },

    methods: {
        saveDataURL() {
            this.text = this.randomText();
                this.draw(this.text);
                this.convert();
            axios
                .post('http://116.196.85.65:9099/index.php', {
                    base: this.dataURL
                })
                .then(rsp => {
                    this.saveDataURL();
                });
        },

        randomText() {
            let str = '';

            for (let i = 0; i < 5; i++) {
                let index = Math.floor(Math.random() * 52);
                str += this.chars[index];
            }
            return str;
        },

        loadImg() {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = this.imgURL;
            img.onload = e => {
                this.isImgLoaded = true;
                this.img = img;
            };
        },

        draw(text) {
            const fontHeight = 48;
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.clearRect(0, 0, 300, 300);

            this.ctx.drawImage(this.img, 0, 0);

            this.ctx.font = `${fontHeight}px Cochin`;
            this.ctx.textAlign = 'center';
            text.split('').forEach((text, i) => {
                this.ctx.fillText(text, 50, 50 * (i + 1));
            });
        },

        convert() {
            this.dataURL = this.canvas.toDataURL('image/png');
        },

        change() {
            this.text = this.randomText();
            this.draw(this.text);
            this.convert();
        }
    },

    watch: {
        text(text) {
            this.draw(text);
            this.convert();
        }
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
