<template>
    <a v-on="$listeners" v-bind="$attrs" :class="classArray" class="btn">
        <slot></slot>
    </a>
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

        ghost: {
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
                `btn${this.ghost ? '-ghost' : ''}-${this.type}`,
                this.disabled && 'btn-disabled ',
                this.block && 'btn-block',
                this.radius && 'btn-radius'
            ];
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';

// 纯色背景按钮
@mixin btn($color) {
    background: $color;
    border-color: rgba($color, 1);
    color: $sub;

    // &:not(.btn-disabled):active {
    //     // opacity: 0.7;
    //     :after {
    //         transition: all 1000ms;
    //         width: 300px;
    //         transform: scale(2);
    //     }
    // }


    &:active {
        &:after {
            transition: all 200ms;
            width: 300px;
            transform: scale(2);
        }
    }


    &:after {
        content: ' ';
        display: block;
        position: absolute;
        z-index: 100;
        pointer-events: none;
        border-radius: 50%;
        transform: scale(1);
        background: #fff;
        opacity: .3;
        width: 200px;
        height: 200px;
    }

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

.btn {
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
    position: relative;
    overflow: hidden;
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
    }

    .btn-ghost-#{$color} {
        @include btn-ghost($value);
    }
}
</style>
