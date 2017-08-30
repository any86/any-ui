<template>
    <ScrollView>
        <div id="base"></div>

        <h1>SVG</h1>
        <img width="100%" :src="destDataURL" />

        <div class="cell">
            <VInput v-model="text"></VInput>
        </div>

        <svg ref="svg" width="100%" viewBox="0 0 300 300" externalResourcesRequired="true">
            <path ref="circle" id="circle" d="M71.848,172.678c40.339,3.897,98.644,9.831,175.932-2.033" stroke="rgba(0,0,0,0)" fill="none" style="stroke-width: 2px;"></path>
            <image transform="rotate(90deg)" overflow="visible" width="300" height="300" :xlink:href="srcDataURL">
            </image>
            <text :x="centerX" text-anchor="middle" font-size="36px" font-family="BeautifulES" externalResourcesRequired="true" class="svg-text">
                <textPath xlink:href="#circle">{{text}}</textPath>
            </text>
        </svg>

        <canvas ref="canvas" style="display:block;"></canvas>

        <button @click="ok" class="button button-danger button-block fixed-bottom">确定</button>
    </ScrollView>
</template>
<script>
import {
    fabric
} from 'fabric'
import VInput from '@/packages/Input/Input'
export default {
    name: 'Svg',

    data() {
        return { centerX: 0, centerY: 0, text: '', canvas: null, ctx: null, isLoadingImg: false, url: './static/SL013-IN.png', srcDataURL: '', destDataURL: '', canvasWidth: 1000, canvasHeight: 1000 };
    },

    async mounted() {
        this.centerX = this.$refs.circle.getTotalLength() / 2;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.ctx = this.canvas.getContext('2d');
        // 为svg准备背景图的base64
        var image = await imageLoader(this.url);
        this.ctx.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
        this.srcDataURL = this.canvas.toDataURL("image/png", 1.0);

    },

    methods: {
        async ok() {
            const response = await this.$api.getFont();
            const font = `<style id="svg_font_style">${response.data.font}</style>`
            var svg_xml = new XMLSerializer().serializeToString(this.$refs.svg);
            var svg_xml = svg_xml.replace(/(<svg[^>]*>)/, '$1' + font);
            var image = await imageLoader("data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg_xml))));
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ctx.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
            this.destDataURL = this.canvas.toDataURL("image/png", 1.0);
        }
    },

    components: { VInput }
}

</script>
<style scoped lang="scss">
@import '../scss/theme.scss';

#base {
    background: red;
    display: inline-block;
    height: 60px;
    position: relative;
    width: 100px;
}

#base:after {
    border-left: 50px solid goldenrod;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    content: "";
    height: 0;
    left: 100px;
    position: absolute;
    width: 0;
}
#base:before {
    border-left: 48px solid red;
    border-top: 28px solid transparent;
    border-bottom: 28px solid transparent;
    content: "";
    height: 0;
    left: 100px;
    top:2px;
    position: absolute;
    width: 0;
    z-index: 1;
}

img {
    display: block;
}

.svg-text {
    font-family: BeautifulES;
}
</style>
