<template>
    <FlexBox class="container" direction="vertical" @touchstart.native="touchStart" @touchmove.native="touchMove" @touchend.native="touchEnd">
        <!-- <Modal :value="isShowSideBar" @input="closeModal"> -->
            <!-- <transition name="slide-right"> -->
                <div ref="sidebar" class="side-bar" :style="{transform: 'translateX('+translateX+')'}">
                    <slot name="side-bar">12345678</slot>
                </div>
            <!-- </transition> -->
        <!-- </Modal> -->
        <!-- 头部 -->
        <div ref="header" class="header-fixed">
            <slot name="header"></slot>
        </div>
        <!-- 主体 -->
        <FlexItem class="body" :style="{paddingBottom:footerHeight + 'px', paddingTop:headerHeight + 'px'}">
            <slot></slot>
        </FlexItem>
        <!-- 底部 -->
        <div ref="footer" class="footer-fixed">
            <slot name="footer"></slot>
        </div>
    </FlexBox>
</template>
<script>
import Modal from '../Dialog/Modal';
import FlexBox from '../Flexbox/FlexBox';
import FlexItem from '../Flexbox/FlexItem';

export default {
    name: 'StickyLayout',

    props: {
        isShowSideBar: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            containerWidth: 0,
            translateX: '-100%',
            sidebarWidth: 0,
            toucheX: {
                distance: 0,
                start: 0,
                now: 0
            },
            footerHeight: 0,
            headerHeight: 0,
            modal: {
                isShow: true
            }
        };
    },

    mounted() {
        this.sidebarWidth   = this.$refs.sidebar.offsetWidth;
        this.headerHeight   = this.$refs.header.offsetHeight;
        this.footerHeight   = this.$refs.footer.offsetHeight;
        this.containerWidth = this.$el.offsetWidth;

    },

    methods: {
        closeModal() {
            this.$emit('update:isShowSideBar', false);
        },

        touchStart(e){
             this.toucheX.start = e.touches[0].clientX;
        },

        touchMove(e){
            this.toucheX.now = e.touches[0].clientX;
            this.distance = this.toucheX.now - this.toucheX.start;
            if(this.sidebarWidth > this.distance) {
                this.translateX = 0 - this.sidebarWidth + this.toucheX.now - this.toucheX.start + 'px'
            }
        },

        touchEnd(){
            if(this.containerWidth / 2 > this.distance) {
                this.translateX = 0 - this.sidebarWidth + 'px';
            } else {
                this.translateX = 0;
            }
        }
    },

    components: {
        Modal,
        FlexBox,
        FlexItem
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.container {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    .side-bar {
        box-shadow: $shadowDown;
        z-index: $sideBarZIndex;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 80%;
        background: $background;
    }
    .header-fixed {
        position: fixed;
        z-index: $tabBarZIndex;
        top: 0;
        left: 0;
        width: 100%;
    }
    .footer-fixed {
        position: fixed;
        z-index: $tabBarZIndex;
        bottom: 0;
        left: 0;
        width: 100%;
    }
}
</style>
