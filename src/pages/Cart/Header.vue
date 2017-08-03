<template>
    <header>
        <Icon @click.native="$router.back()" class="icon" value="angle-left"></Icon>
        <span class="title">{{title}}</span>
        <span class="button-edit">EDIT</span>
    </header>
</template>
<script>
export default {
    name: 'Header',

    props: {
        title: {
            type: String,
            required: true
        }
    },

    components: {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 1.2rem;
header {
    height: $height;
    width: 100%;
    background: $background;
    border-bottom: 1px solid $lightest;
    padding: 0 3*$gutter;
    display: flex;
    .icon {
        font-size: .6rem;
        line-height: $height;
    }
    .title {
        font-size: .4rem;
        line-height: $height;
        flex: 1;
        text-align: center;
    }
    .button-edit {
        font-size: .3rem;
        line-height: $height;
    }
}
</style>
