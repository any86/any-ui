<template>
    <FlexBox class="container" direction="vertical">
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
       
    },

    data() {
        return {
            headerHeight: 0,
            footerHeight: 0
        };
    },

    mounted() {
        this.headerHeight = this.$refs.header.offsetHeight;
        this.footerHeight = this.$refs.footer.offsetHeight;
    },

    methods: {

    },

    components: {
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
    &-blur {
        filter: blur(2px);
    }
}
</style>
