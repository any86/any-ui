<template>
    <v-scroller v-model="pos" :lock-y="true" :lock-x="lockX" class="atom-drawer" 
    :body-style="bodyStyle" :has-reset="false" :min-scroll-left="0" :max-scroll-left="sideWidth" 
    :has-buffer="false" :prevent-default="false" 
    @scroll-start="scrollStart" @scroll-move="scrollMove" @scroll-leave="scrollLeave">
        <span class="atom-drawer__side" ref="side">
            <slot name="side"></slot>
        </span>
        <main class="atom-drawer__main">
            <slot></slot>
            <v-mask :fixed="false" :isShow="isShowMask" @click="hide"></v-mask>
        </main>
    </v-scroller>
</template>
<script>
import VMask from '@/packages/Dialog/Mask';
import VScroller from '@/packages/Scroller/Scroller'
export default {
    name: 'Drawer',

    props: {
        sensitivity: {
            type: Number,
            default: 30
        },

        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            edge: '',
            pos: { scrollLeft: 0, scrollTop: 0 },
            bodyStyle: {
                position: 'relative',
                display: 'flex',
                height: '100%'
            },
            sideWidth: 0,
            isShowMask: false,
            lockX: false,
            startPointX: 0,
        };
    },

    mounted() {
        // 暂时没弄懂, 为什么不加nextTick, 获取的宽度是200, 因为如果只打印$refs.side宽度是小于200的
        // syslog(this.$refs.side.offsetWidth)
        this.$nextTick(() => {
            this.sideWidth = this.$refs.side.offsetWidth;
        });
        
    },

    methods: {
        show() {
            this.pos.scrollLeft = -this.sideWidth;
            this.isShowMask = true;
        },

        hide() {
            this.pos.scrollLeft = 0;
            this.isShowMask = false;
        },

        scrollStart({ scrollLeft, pointX, deltaX, edge }) {
            this.edge = edge;
            this.startPointX = pointX;
            this.lockX = 'left' !== edge;
        },

        scrollMove({ scrollLeft, pointX, deltaX }) {
            this.isShowMask = true;
        },

        scrollLeave({ scrollLeft, pointX, deltaX }) {
            syslog(scrollLeft)
            if ((0 - scrollLeft) > this.sideWidth / 5) {
                this.show();
            } else {
                this.hide();
            }
        }
    },

    watch: {
        value(value){
            if(value) {
                this.show();
            } else {
                this.hide();
            }
        }
    },

    components: {
        VMask, VScroller
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
    }
}
</style>
