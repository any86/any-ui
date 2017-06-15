<template>
    <header>
        <Icon value="bars" @click.native="showSideBar"></Icon>
        <Icon value="search" style="margin-left:15px;"></Icon>
        <img class="logo" src="../../assets/logo.png">
        <Icon value="user" style="margin-right:15px;"></Icon>
        <Icon value="shopping-bag"></Icon>
    </header>
</template>
<script>
import * as types from "@/store/mutation-types";
export default {
    name: 'Header',

    methods: {
        showSideBar(){
            this.$store.commit(types.SHOW_SIDE_BAR);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
$height: 1.2rem;
header {
	box-sizing: border-box;
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: $headerZIndex;
    display: flex;
    padding: 0 3*$gutter;
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
