<template>
    <ScrollView v-model="scrollY" class="page-canvas">
        <canvas id="c" width="300" height="300" style="border:1px solid #ccc;"></canvas>
        <input type="text" v-model="aa">
        <input type="text" v-model="rotate" placeholder="rotate">
        <img :src="src" width="100%">
    </ScrollView>
</template>
<script>
import {
    fabric
} from 'fabric'
export default {
    name: 'Canvas',

    data() {
        return {
            canvas: null,
            scrollY: 0,
            aa: 150,
            rotate: 45,
            ctx: null,
            src: ''
        }
    },

    mounted() {
        this.bg();

        // const canvas = document.getElementById("c")
        // const ctx = canvas.getContext("2d");
        // ctx.lineWidth = 1;
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(0, 1);
        // ctx.stroke();
        // var dataURL = canvas.toDataURL();
        // syslog(dataURL)



        // const offsetScreenCanvas = document.createElement('canvas')
        // const ctx1 = offsetScreenCanvas.getContext("2d");
        // const img1 = new Image();   
        // img1.src = 'https://static.soufeel.com/skin/frontend/smartwave/default/images/home/home-Sweet-03.png'
        // img1.onload = () => {
        //     ctx1.drawImage(img1, 0, 0, 100, 100);
        // };

        // ctx1.rotate(90);

        // ctx.drawImage(offsetScreenCanvas,0, 0);

    },

    methods: {
        bg() {
            // const ctx = document.createElement('canvas').getContext("2d");
            const canvas = document.getElementById("c")
            const ctx = canvas.getContext("2d");
            this.canvas = canvas;
            this.ctx = ctx;
            const WIDTH = 300;
            const HEIGTH = 300;
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = './static/bg.jpg'
            img.onload = () => {
                dir(img.width)
                    // ctx.save();
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, WIDTH, HEIGTH / img.width * img.height);
                // ctx.restore();
                this.overlay(ctx);
            };
        },


        overlay(ctx) {
            const scale = 1;
            const img1 = new Image();
            // img1.crossOrigin = "Anonymous";
            img1.crossOrigin = "anonymous";
            img1.src = './static/C022.png'
            img1.onload = () => {
                ctx.save();
                ctx.translate(150, 150);
                // ctx.rotate(`parseInt(this.rotate) * Math.PI / 180);
                ctx.translate(-150, -150);
                syslog(img1.width, img1.height)
                // ctx.drawImage(img1, 0, 0, img1.width, img1.height, this.aa - img1.width / 2 * scale, this.aa - img1.height / 2 * scale, img1.width * scale, img1.height * scale);
                ctx.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, 300, 300);
                var dataURL = this.canvas.toDataURL();
                this.src = dataURL
                ctx.restore();
            };
        }
    },

    watch: {
        aa() {

            this.bg();
        }
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
