<template>
    <div class="v-row">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Row',

    props: {
        gutter: {
            default: 0
        }
    }
}
</script>
<style lang="scss" scoped>
.v-row {
    &:before{
        content: " ";
        display: table;
    }
    &:after {
        content: " ";
        display: table;
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
    }


    position: relative;
    zoom: 1;
    

}
</style>
