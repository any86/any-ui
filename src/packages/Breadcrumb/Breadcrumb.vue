<template>
    <div class="component-breadcrumb">
        <span v-for="item in dataSource">{{item.text}}</span>
    </div>
</template>
<script>
export default {
    name: 'Breadcrumb',

    props: {
        dataSource: {
            type: Array
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.component-breadcrumb {
    margin: $gutter;
    span {
        font-size: $small;
        display: inline-block;
        color: $darker;
        &.active {
            color: $base;
        }
    }
    span:not(:last-of-type) {
        &:after {
            
            content: '>';
            margin: auto 5px;
        }
    }
}
</style>
