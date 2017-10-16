<template>
    <div class="atom-drawer">
        <span class="atom-drawer__side" ref="side" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}">
            <slot name="side"></slot>
        </span>
        <main class="atom-drawer__main" :style="mainTranslateXStyle">
            <span @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="{width: `${handlerWidth}px`}" class="main__handler"></span>
            <slot></slot>
            <v-mask :fixed="false" :isShow="isMaskShow" @click="hide"></v-mask>
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
            default: 20
        },

        speed: {
            type: Number,
            default: 300
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
            translateX: 0,
            transitionDuration: 0
        };
    },

    beforeMount() {
        // 暂时没弄懂, 为什么不加nextTick, 获取的宽度是200, 因为如果只打印$refs.side宽度是小于200的
        // 猜测可能是生成二维码哪里的问题, 稍后测试
        // syslog(this.$refs.side.offsetWidth)
        this.$nextTick(() => {
            this.sideWidth = getWidth(this.$refs.side);
            this.viewWidth = getWidth(this.$el);
            this.translateX = 0 - this.sideWidth;
        });
    },

    methods: {
        touchstart(e) {
            this.transitionDuration = 0;
        },

        touchmove(e) {
            const point = e.touches ? e.touches[0] : e;
            if (this.sideWidth >= point.pageX) {
                // 因为是边缘操作, 起始x坐标== 0, 
                // 所以就没有把位置移动用当前x坐标-起始x坐标, 
                // 直接用当前x坐标表示移动距离, 逻辑更精简, 
                // 反正视觉上不太容易被发现不是从最边缘抽出
                // 参考了DrawerLayout.js
                this.translateX = point.pageX - this.sideWidth;
            } else {
                this.translateX = 0;
            }

            // 并没有针对是x/y哪个轴线拖拽做判断
        },

        touchend() {
            this.transitionDuration = this.speed;
            this.snap();
        },

        /**
         * 自动啮合
         * snap: 咔哒一声关上, 哈哈, 有道翻译, 真有道
         */
        snap() {
            if (Math.abs(this.translateX) < this.sideWidth / 2) {
                this.translateX = 0;
            } else {
                this.translateX = 0 - this.sideWidth;
            }
        },

        show() {
            this.transitionDuration = this.speed;
            this.translateX = 0;
        },

        hide() {
            this.transitionDuration = this.speed;
            this.translateX = 0 - this.sideWidth;
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
        isMaskShow() {
            return 0 - this.sideWidth < this.translateX
        },

        mainTranslateXStyle() {
            return { transform: `translate3d(${this.sideWidth + this.translateX}px, 0, 0)`, transitionDuration: `${this.transitionDuration}ms` };
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
