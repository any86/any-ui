<template>
    <button :type="nativeType" v-ripple="{disabled: !hasRipple}" v-on="$listeners" :class="className" class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'Button',

    props: {
        type: {
            type: String,
            default: 'default'
        },

        nativeType: {
            type: String,
            default: 'button' //button / submit / reset
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

        size: {
            type: String,
            default: ''
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
        }
    },

    computed: {
        className() {
            return {
                ['btn--' + this.type]: !this.isGhost,
                ['btn--ghost-' + this.type]: this.isGhost,
                'btn--disabled': this.isDisabled,
                'btn--block': this.isBlock,
                'btn--round': this.isRound,
                'btn--loading': this.isLoading
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
    border-color: rgba($color, 0);
    color: color-yiq($color);
    border-radius: $radius;
    // width: $lightness;
    @if (98% < $lightness) {
        border: 1px solid $lightest;
    } @else {
        border: 1px solid transparent;
    }
    &:before {
        border-color: transparent transparent color-yiq($color) color-yiq($color);
    }
}

// 幽灵按钮
@mixin btn-ghost($color) {
    background: $sub;
    border-color: $color;
    color: $color;
    border-radius: $radius;
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

.btn {
    overflow: hidden;
    display: inline-block;
    user-select: none;
    vertical-align: top;
    padding: 0 $gutter;
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
        opacity: 0.5;
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
}

@each $color, $value in $theme_colors {
    .btn--#{$color} {
        @include btn($value);
    }

    .btn--ghost-#{$color} {
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
