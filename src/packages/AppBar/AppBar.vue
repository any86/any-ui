<template>
    <header class="atom-app-bar">
        <span class="bar__left">
            <i v-if="hasArrow" @click="clickArrow" v-ripple="true" class="icon-back"></i>
            <slot name="left"></slot>
        </span>
        <span class="bar__center">
            <slot></slot>
        </span>
        <span class="bar__right">
            <slot name="right"></slot>
        </span>
    </header>
</template>
<script>
export default {
    name: 'AppBar',

    props: {
        hasArrow: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        clickArrow(){
            this.$emit('click-arrow');
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-app-bar {
    position: relative;
    z-index: 2;
    display: flex;
    height: 55px;
    line-height: 55px;
    box-shadow: $shadowDown;
    padding: 0 $gutter/2;
    background: $background;
    > span {
        display: flex;
        align-items: center;
        flex: 1;
        > .icon-back {
            display: inline-block;
            height: 32px;
            width: 32px;
            background: url('../../assets/back.svg');
            background-size: 100%;
        }
        &.bar__center {
            justify-content: center;
            font-size: $biggest;
        }
    }
}
</style>
