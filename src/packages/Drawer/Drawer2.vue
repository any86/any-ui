<template>
    <div class="atom-drawer">
        <span class="atom-drawer__side" ref="side" :style="{transform: `translate3d(${avaitTranslateXPercent}%, 0, 0)`}">
            <slot name="side"></slot>
        </span>
        <main class="atom-drawer__main">
            <span @touchstart="touchstart" @touchmove="touchmove" :style="{width: `${handlerWidth}px`}" class="main__handler"></span>
            <slot></slot>
            <v-mask :fixed="false" :isShow="isShowMask" @click="hide"></v-mask>
        </main>
    </div>
</template>
<script>
//https://github.com/react-native-community/react-native-drawer-layout/blob/master/src/DrawerLayout.js
import { getWidth } from '@/utils/dom'
import VMask from '@/packages/Dialog/Mask';
export default {
    name: 'Drawer',

    props: {
        sensitivity: {
            type: Number,
            default: 30
        },

        handlerWidth: {
            type: Number,
            default: 10
        },

        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            sideWidth: 0,
            viewWidth: 0,
            isShowMask: false,
            translateXPercent: 0,
        };
    },

    mounted() {
        // 暂时没弄懂, 为什么不加nextTick, 获取的宽度是200, 因为如果只打印$refs.side宽度是小于200的
        // syslog(this.$refs.side.offsetWidth)
        this.$nextTick(() => {
            this.sideWidth = getWidth(this.$refs.side);
            this.viewWidth = getWidth(this.$el);
        });

    },

    methods: {
        
        touchstart(e) {
            const point = e.touches ? e.touches[0] : e;
            this.translateXPercent = point.pageX / this.sideWidth * 100;
        },

        touchmove(e) {
            const point = e.touches ? e.touches[0] : e;
            this.translateXPercent = point.pageX / this.sideWidth * 100;
            this.isShowMask = true;
        },

        touchend() {

        },

        /**
         * 咔哒一声关上, 哈哈, 有道翻译
         */
        snap(){

        },

        hide(){
            this.isShowMask = false;
            
        }
    },

    watch: {
        value(value) {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        }
    },

    computed: {
        avaitTranslateXPercent() {
            return 0 > this.translateXPercent - 100 ? this.translateXPercent - 100 : 0;
        }
    },

    components: {
        VMask
    }
}
</script>

<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-drawer {
    position: relative;
    overflow: hidden;
    height: 100%;
    &__side {
        position: absolute;
        z-index: $drawerZIndex;
        left: 0;
        top: 0;
        background: $background;
        display: block;
        overflow: hidden;
        max-width: 80%;
        height: 100%;
        transform: translateX(-100%);
    }

    &__main {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        flex: 1 0 100%;
        min-width: 0;
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        overflow: hidden;
        .main__handler {
            height: 100%;
            position: absolute;
            z-index: 99999;
            background: rgba(0, 0, 0, 0);
        }
    }
}
</style>
