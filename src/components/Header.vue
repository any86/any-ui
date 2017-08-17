<template>
    <header>
        <Icon value="bars" @click.stop="showSide"></Icon>
        <Icon value="search" style="margin-left:15px;"></Icon>
        <img class="logo" src="../assets/logo.png">
        <Icon value="user" style="margin-right:15px;"></Icon>
        <router-link :to="{path: '/cart'}">
            <Icon value="shopping-bag"></Icon>
        </router-link>
    </header>
</template>
<script>
import * as types from "@/store/mutation-types";
export default {
    name: 'Header',

    methods: {
        showSide() {
            if (!this.$store.state.isShowSide) {
                this.$store.commit(types.SHOW_SIDE);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
$height: 1.2rem;
header {
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: $headerZIndex;
    display: flex;
    padding: 0 $gutter;
    background: $background;
    height: $height;
    width: 100%;
    i {
        font-size: .4rem;
        line-height: $height;
    }
    img.logo {
        text-align: center;
        display: table;
        margin: auto;
        height: 30px;
    }
}
</style>
