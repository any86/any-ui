<template>
    <button v-ripple="hasRipple" :type="nativeType" v-on="$listeners" :class="className" class="atom-btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'AtomButton',

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

        isCircle: {
            type: Boolean,
            default: false
        },

        isRound: {
            type: Boolean,
            default: true
        },

        isCenter: {
            type: Boolean,
            default: false
        },

        isLoading: {
            type: Boolean,
            default: false
        },

        size: {
            type: String,
            default: '' //sm
        }
    },

    computed: {
        className() {
            return {
                'atom-btn--disabled': this.isDisabled,
                ['atom-btn-' + this.type]: !this.isGhost && !this.isDisabled, // 标准按钮
                ['atom-btn-ghost-' + this.type]: this.isGhost && !this.isDisabled, // 幽灵按钮
                'atom-btn--block': this.isBlock,
                'atom-btn--round': this.isCircle,
                'atom-btn--loading': this.isLoading,
                'atom-btn--radius': !this.isBlock || this.isRound,
                'atom-btn--sm' : 'sm' == this.size
            };
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
@import '../../scss/function.scss';
$height: 1rem;

// 纯色背景按钮
// 根据背景色亮度决定按钮字体颜色
@mixin btn($color) {
    $lightness: lightness($color);
    background: $color;
    border-color: $color;
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

    &[type='button'],
    [type='reset'],
    [type='submit'] {
        -webkit-appearance: button;
    }
}

.atom-btn {
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    user-select: none;
    vertical-align: middle;
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

    &--sm{
        height: $height*0.6;
        line-height: $height*0.6;
        padding: 0 $gutter*0.6;
    }

    &--disabled {
        pointer-events: none;
        color: rgba(0, 0, 0, 0.25);
        background-color: #f5f5f5;
        border-color: #d9d9d9;
    }

    &--round {
        border-radius: $height !important;
    }

    &--block {
        display: block;
        width: 100%;
    }

    &--radius {
        border-radius: $radius;
    }

    &--loading {
        pointer-events: none;
        opacity: 0.6;
        &:before {
            content: '';
            display: inline-block;
            height: 12px;
            width: 12px;
            // border-color: transparent transparent $lighter $lighter !important;
            border-style: solid;
            border-width: 2px;
            border-radius: 50%;
            margin-right: $gutter/2;
            animation: rotation infinite $duration*2 linear;
        }
    }
}

@each $key, $value in $theme_colors {
    .atom-btn-#{$key} {
        @include btn($value);
    }

    .atom-btn-ghost-#{$key} {
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
