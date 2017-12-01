<template>
    <button v-ripple="hasRipple" v-on="$listeners" :class="classArray" class="btn">
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

        isBlock: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },
        
        hasRipple: {
            default: true
        },

        hasRadius: {
            type: Boolean,
            default: false
        },

        isGhost: {
            type: Boolean,
            default: false
        },

        size: {
            type: String,
            default: ''
        },

        isCircle: {
            type: Boolean,
            default: false
        },

        isCenter: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {};
    },

    mounted() {},

    computed: {
        classArray() {
            return [`btn${this.isGhost ? '-ghost' : ''}-${this.type}`, this.disabled && 'btn-disabled ', this.isBlock && 'btn-block', this.hasRadius && 'btn-radius', ('sm' === this.size) && 'btn-sm', this.isCircle ? 'btn--circle' : ''];
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
@import '../../scss/function.scss';
$height:1rem;
// 纯色背景按钮
@mixin btn($color) {
    $lightness: lightness($color);
    background: $color;
    border-color: rgba($color, 0);
    color: color-yiq($color);
    width: $lightness;
    
    &-disabled {
        pointer-events: none;
        background: dark($color);
        
    }
}

// 幽灵按钮
@mixin btn-ghost($color) {
    background: $sub;
    border-color: $color;
    color: $color;
    &:not(.disabled):active {
        opacity: 0.7;
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
    overflow: hidden;
    padding: 0 $gutter;
    height: $height;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    transition: all $duration;
    font-size: $bigger;
    .icon-loading {
        align-self: center;
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        margin-right: $gutter / 2;
    }
}

.btn--circle{
    border-radius: $height;
}
.btn-radius {
    border-radius: $borderRadius;
}
.btn-block {
    display: block;
    width: 100%;
}

.btn-sm {
    height: $height/2;
    padding:0 $gutter/4;
    font-size: $small;
}

@each $color, $value in $theme_colors {
    .btn-#{$color} {
        @include btn($value);
        // @if 'default' == $color or 'light' == $color {
        //     background: $color;
        //     color: $darkest;
        // } @else {
        //     color: $sub;
        // }
    }

    .btn-ghost-#{$color} {
        @include btn-ghost($value);
        @if 'default' == $color or 'light' == $color {
            color: $darkest;
            border-color: $light;
        } @else {
            color: $color;
            border-color: $color;
        }
    }
}
</style>
