<template>
    <button :type="nativeType" v-on="$listeners" :class="className" class="atom-btn">
        <slot></slot>
    </button>
</template>
<script>
import Ripple from '@/utils/ripple/src/ripple.js';
export default {
    name: 'Button',

    props: {
        type: {
            type: String,
            default: 'default'
        },

        nativeType: {
            type: String,
            default: 'button' // button / submit / reset
        },

        isBlock: {
            type: Boolean,
            default: false
        },

        isDisabled: {
            type: Boolean,
            default: false
        },

        hasRipple: {
            default: true
        },

        isGhost: {
            type: Boolean,
            default: false
        },

        isRound: {
            type: Boolean,
            default: false
        },

        isCenter: {
            type: Boolean,
            default: false
        },

        isLoading: {
            type: Boolean,
            default: false
        },
    },

    mounted(){
        new Ripple(this.$el);
    },

    computed: {
        className() {
            return {
                ['atom-btn--' + this.type]: !this.isGhost,
                ['atom-btn--ghost-' + this.type]: this.isGhost,
                'atom-btn--disabled': this.isDisabled,
                'atom-btn--block': this.isBlock,
                'atom-btn--round': this.isRound,
                'atom-btn--loading': this.isLoading,
                'atom-btn--radius': !this.isBlock
            };
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
@import '../../scss/function.scss';
$height: 1rem;

// 纯色背景按钮
@mixin btn($color) {
    $lightness: lightness($color);
    background: $color;
    border-color: transparent;
    color: color-yiq($color);
    // width: $lightness;
    @if (98% < $lightness) {
        border: 1px solid $lightness;
    } @else {
        border: 1px solid transparent;
    }
    &:before {
        border-color: transparent transparent color-yiq($color) color-yiq($color);
    }
}

// 幽灵按钮
@mixin btn-ghost($color) {
    // $r: red($color);
    // $g: green($color);
    // $b: blue($color);
    $lightness: lightness($color);
    // @debug $color;
    background: transparent;
    border-radius: $radius;
    @if (98% < $lightness) {
        border: 1px solid $dark;
        color: $darker;
    } @else {
        border: 1px solid $color;
        color: $color;
    }
    &:before {
        border-color: transparent transparent $color $color;
    }
}

button {
    -webkit-appearance: none;
    outline: none;
    border: 0 none;
    border-radius: 0;
}

.atom-btn {
    overflow: hidden;
    display: inline-block;
    user-select: none;
    vertical-align: top;
    padding: 0 $gutter*2;
    height: $height;
    line-height: $height;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    font-size: $big;
    transition: all $duration;
    &--loading {
        pointer-events: none;
        opacity: 0.7;
        &:before {
            content: '';
            display: inline-block;
            height: 12px;
            width: 12px;
            border-style: solid;
            border-width: 2px;
            border-radius: 50%;
            margin-right: $gutter/2;
            animation: rotation infinite $duration*2 linear;
        }
    }

    &--disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    &--round {
        border-radius: $height !important;
    }

    &--block {
        display: block;
        width: 100%;
    }

    &--radius{
        border-radius: $radius;
    }
}

@each $key, $value in $theme_colors {
    .atom-btn--#{$key} {
        @include btn($value);
    }

    .atom-btn--ghost-#{$key} {
        @include btn-ghost($value);
    }
}

@keyframes rotation {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
