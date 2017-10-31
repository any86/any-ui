<template>
    <button v-ripple="{background: rippleColor}" v-on="$listeners" v-bind="$attrs" :class="classArray" class="btn">
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

        block: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        radius: {
            type: Boolean,
            default: false
        },

        isGhost: {
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
            return [
                `btn${this.isGhost ? '-ghost' : ''}-${this.type}`,
                this.disabled && 'btn-disabled ',
                this.block && 'btn-block',
                this.radius && 'btn-radius'
            ];
        },

        rippleColor(){
            if(['default', 'light'].includes(this.type)) {
                return 'rgba(0,0,0, 0.1)';
            } else {
                return 'rgba(255,255,255, 0.5)';
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';

// 纯色背景按钮
@mixin btn($color) {
    background: $color;
    border-color: rgba($color, 0);
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
    position: relative;
    overflow: hidden;
    display: inline-block;
    user-select: none;
    vertical-align: middle;
    overflow: hidden;
    padding: $gutter $gutter*2;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    transition: all $duration;
    font-size: $big;

    .icon-loading {
        align-self: center;
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        margin-right: $gutter / 2;
    }
}
.btn-radius {
    border-radius: $borderRadius;
}
.btn-block {
    display: block;
    width: 100%;
}

@each $color, $value in $theme_colors {
    .btn-#{$color} {
        @include btn($value);
        @if 'default' == $color or 'light' == $color {
            color:$darkest;
        } 
        @else {
            color: $sub;
        }
    }

    .btn-ghost-#{$color} {
        @include btn-ghost($value);
    }
}
</style>
