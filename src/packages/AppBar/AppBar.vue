<template>
    <header class="atom-app-bar">
        <span class="bar__left">
            <a-icon @click="clickArrow" v-ripple="true" value="arrow" :angel="180" :size="24"/>
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
import AIcon from '../Icon'
export default {
    name: 'AtomAppBar',

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
    },

    components: {AIcon}
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
    > .bar__left, .bar__right {
        display: flex;
        align-items: center;
        flex: 1;
    }

    >.bar__center {
            justify-content: center;
            font-size: $bigger;
        }
}
</style>
