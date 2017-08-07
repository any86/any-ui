<template>
    <header>
        <Icon class="icon" value="bars" @click.native="showSide"></Icon>
        <span>CHECKOUT</span>
        <Icon @click.native="$router.push({path: '/search'})" class="icon" value="search" ></Icon>
    </header>
</template>
<script>
import * as types from "@/store/mutation-types";
export default {
    name: 'Header',

    methods: {
        showSide(){
            this.$store.commit(types.SHOW_SIDE);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
$height: 1.2rem;
header {
	box-sizing: border-box;
    display: flex;
    padding: 0 3*$gutter;
    background: $background;
    height: $height;
    width: 100%;
    border-bottom: 1px solid $lightest;
    >.icon {
        font-size: .4rem;
        line-height: $height - .2rem;
    }
    >span{line-height: $height - .2rem;font-size: $bigger;flex:1;text-align: center;}

}
</style>
