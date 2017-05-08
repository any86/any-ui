<template>
    <div class="flex-item" :style="{boxFlex: flex, flex}">
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
        }
    }
}
</script>

<style scoped lang="scss">
    // .flex-item{align-items: center;}
</style>
