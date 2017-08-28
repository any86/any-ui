<template>
    <section>
        <svg ref="svg" style="width:80%;margin-left:10%;" viewBox="0 0 300 300" externalResourcesRequired="true">
            <path ref="circle" id="circle" d="M71.848,172.678c40.339,3.897,98.644,9.831,175.932-2.033" stroke="rgba(0,0,0,0)" fill="none" style="stroke-width: 2px;"></path>
            <image overflow="visible" width="300" height="300" :xlink:href="srcDataURL">
            </image>
            <text :x="centerX" text-anchor="middle" :font-size="`${fontSize.value * 3}px`" :font-family="fontStyle.value" externalResourcesRequired="true" class="svg-text">
                <textPath xlink:href="#circle">{{text}}</textPath>
            </text>
        </svg>
        <VTooltip>
            <div class="border">
                <VInput v-model="text" placeholder="请输入" @focus="inputFont"></VInput>
            </div>
</VTooltip>
        <!-- 选字体样式和尺寸  -->
        <div class="flex">
            <span @click="isShowSelectFontStyle=true" class="select gutter-top gutter-right flex-item flex">
                <a class="flex-item">{{fontStyle.label}}</a>
                <i class="iconfont icon-moreunfold"></i>
            </span>

            <span @click="isShowSelectFontSize=true" class="select  gutter-top flex-item flex">
                <a class="flex-item">{{fontSize.label}}</a>
                <i class="iconfont icon-moreunfold"></i>
            </span>
        </div>

        <p class="text-danger">Please Note: No 9 or emoji can be used.</p>

        <VPickerOne :isShow.sync="isShowSelectFontStyle" v-model="fontStyle.value" :dataSource="[{label:'BeautifulES', value:'BeautifulES'}, {label:'ping fang', value:'ping fang'}]" @change="changeFontStyle"></VPickerOne>

        <VPickerOne :isShow.sync="isShowSelectFontSize" v-model="fontSize.value" :dataSource="[{label:'14', value:14}, {label:'16', value:16}]" @change="changeFontSize"></VPickerOne>
    </section>
</template>
<script>
import VButton from '@/packages/Button/Button'
import VTooltip from '@/packages/Tooltip/Tooltip'

import VCell from '@/packages/Cell/Cell'
import VInput from '@/packages/Input/Input'
import VPopupPicker from '@/packages/PopupPicker/PopupPicker'
import VPickerOne from '@/packages/PickerOne/PickerOne'

export default {
    name: 'CurveEngrave',

    data() {
        return {
            centerX: 0,
            centerY: 0,
            text: '',
            canvas: null,
            ctx: null,
            isLoadingImg: false,
            url: './static/SL013-IN.png',
            srcDataURL: '',
            destDataURL: '',
            canvasWidth: 1000,
            canvasHeight: 1000,

            fontStyle: { value: 'BeautifulES', label: 'BeautifulES' },
            fontSize: { value: 14, label: '14' },
            isShowSelectFontStyle: false,
            isShowSelectFontSize: false
        };
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
        },

        changeFontStyle({ label }) {
            this.fontStyle.label = label;
        },

        changeFontSize({ label }) {
            this.fontSize.label = label;
        },

        inputFont(e) {
            syslog(e.target.getBoundingClientRect().top);
        }
    },

    components: { VInput, VPopupPicker, VCell, VButton, VPickerOne,  VTooltip}
}

</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
section {
    .select {
        height: .8rem;
        line-height: .8rem;
        a {
            text-align: center;
            color: $darkest;
            padding: 0 $gutter;
        }

        .iconfont {
            margin-right: $gutter;
        }
    }
}
</style>
