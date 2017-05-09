<template>
    <div :class="['flex-box', 'vertical' == direction && 'vertical']">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'FlexBox',

    props: {
        direction: {
            type: String,
            default: 'horizontal'
        }
    }
}
</script>

<style scoped lang="scss">
.flex-box{display: box;display: flex-box; display: flex;}
.vertical{box-direction: normal;box-orient: vertical;flex-direction: column;}
</style>
