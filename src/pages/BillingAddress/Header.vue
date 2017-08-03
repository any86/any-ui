<template>
    <header>
        <Icon @click="goBack" class="icon" value="angle-left"></Icon>
        <span>BILLING ADDRESS</span>
        <Icon class="icon" value="search"></Icon>
    </header>
</template>
<script>
import * as types from "@/store/mutation-types";
export default {
    name: 'Header',

    methods: {
        goBack(){
            this.$router.go(-1);
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
    >span {
        line-height: $height - .2rem;
        font-size: $bigger;
        flex: 1;
        text-align: center;
    }
}
</style>
