<template>
    <div class="flex-item" :style="{boxFlex: flex, flexGrow: flex, flexShrink: flex, flexBasis: 0, alignSelf}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'FlexItem',

    props: {
        flex: {
            type: Number,
            default: 1
        },
        alignSelf: {
            type: String,
            default: 'auto'
        }
    }
}
</script>
<style scoped lang="scss">
.flex-item {
    min-height: 1px;
}
</style>
