<template>
    <span :class="{'atom-badge--dot': undefined === text}" class="atom-badge">
        <slot></slot>
        <span v-if="undefined !== text" class="atom-badge__text">{{text}}</span>
    </span>
</template>
<script>
export default {
    name: 'Badge',

    props: {
        text: {
            type: [Number, String]
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$dotSize: 8px;
.atom-badge {
    position: relative;
    display: inline-block;
    font-size: 100%;
    &--dot {
        &:after {
            content: ' ';
            position: absolute;
            top: 0;
            right: -$dotSize;
            z-index: 2;
            display: block;
            width: $dotSize;
            height: $dotSize;
            border-radius: 100%;
            background: $base;
        }
    }

    &__text {
        // vertical-align: middle;
        text-align: center;
        white-space: nowrap;
        padding: 0 $gutter/2;
        border-radius: $gutter*2;
        background: $base;
        color:$sub;
    }
}
</style>
