<template>
    <a v-ripple v-on="$listeners" v-bind="$attrs" class="atom-cell">
        <span v-if="$slots.title" class="atom-cell__title">
            <slot name="title"></slot>
        </span>

        <span :style="[bodyStyle, {textAlign}]" class="atom-cell__body">
            <div class="body__content">
                <slot></slot>
            </div>
            <p v-show="$slots.tip" class="body__tip">
                <slot name="tip"></slot>
            </p>
        </span>

        <span v-if="undefined !== $slots.extra" class="atom-cell__extra">
            <slot name="extra"></slot>
        </span>

        <i v-if="undefined !== arrow" class="atom-cell__arrow" value="more" :style="{transform: `rotate(${arrow}deg)`}"></i>
    </a>
</template>
<script>
export default {
    name: 'Cell',

    props: {
        bodyStyle: {
            type: String,
            default: () => {}
        },

        textAlign: {
            type: String,
            default: 'left'
        },

        arrow: {
            type: Number
        },

        hasRipple: {
            default: true
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-cell {
    position: relative;
    display: flex;
    padding: 0 $gutter;
    min-height: 1rem;
    background: $background;
    border-bottom: 1px solid $lightest;
    &__title {
        font-size: $big;
        align-self: center;
        min-width: 1rem;
    }

    &__body {
        display: block;
        flex: 1;
        position: relative;
        height: 100%;
        align-self: center;
        font-size: $big;

        > .body__tip {
            position: absolute;
            left: $gutter;
            color: rgba($danger, 1);
            font-size: $small;
        }
    }

    &__extra {
        font-size: $big;
        position: relative;
        align-self: center;
        text-align: right;
    }

    &__arrow {
        align-self: center;
        background: url(../../assets/more.svg) center center;
        background-size: 100%;
        width: 24px;
        height: 24px;
        display: inline-block;
        transition: transform $duration;
    }
}
</style>
