<template>
    <div class="component-cell">
        <span><slot></slot></span>
        <Icon v-if="hasArrow" class="icon" value="angle-right"></Icon>
    </div>
</template>
<script>
export default {
    name: 'Cell',

    props: {
        hasArrow: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-cell {
    display: flex;
    background: $background;
    padding: 0 2*$gutter;
    min-height: 1.2rem;
    >span {
        flex: 1;
        position: relative;
        align-self: center;
        font-size: $big;
        color: $dark;
    }
    >.icon {
        align-self: center;
        font-size: $biggest;
    }
}
</style>
