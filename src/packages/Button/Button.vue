<template>
    <a v-on="$listeners" v-bind="$attrs" :class="[`button`, `button-${type}`, disabled && 'button-disabled ', size && `button-${size}`, block &&'button-block']">
        <slot></slot>
    </a>
</template>
<script>
export default {
    name: 'Button',

    data() {
        return {
            size: 'small',
            icon: '',
            type: 'default',
            block: false,
            disabled: false
        };
    },

    mounted() {
        if (undefined !== this.$attrs) {
            // 类型
            if ('' !== this.$attrs.type) {
                this.type = this.$attrs.type;
            }

            // 100%宽按钮
            this.block = ('' === this.$attrs.block || this.$attrs.block);

            // 禁用
            this.disabled = ('' === this.$attrs.disabled || this.$attrs.disabled);

            // 尺寸
            if ('' !== this.$attrs.size) {
                this.size = this.$attrs.size;
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';

// 纯色背景按钮
@mixin button($color) {
    background: $color;
    border-color: rgba($color, 1);
    color: $sub;
    &:not(.disabled):active {
        opacity: .7;
    }

    &-disabled {
        pointer-events: none;
        background: dark($color);
    }
}

// 幽灵按钮
@mixin button-outline($color) {
    background: $sub;
    border-color: $color;
    color: $color;
    &:not(.disabled):active {
        opacity: .7;
    }
}

.button {
    overflow: hidden;
    user-select: none;
    padding: $gutter $gutter*3;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    letter-spacing: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    transition: all 200ms;
    .icon-loading {
        align-self: center;
        width: .3rem;
        height: .3rem;
        display: block;
        margin-right: $gutter / 2;
    }

    .slot {
        flex: 1;
        align-self: center;
        line-height: 1.5;
    }
}

.button-block {
    width: 100%;
}

@each $color,
$value in $theme_colors {
    .button-#{$color} {
        @include button($value);
    }

    .button-outline-#{$color} {
        @include button-outline($value);
    }
}
</style>
