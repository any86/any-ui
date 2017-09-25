<template>
    <a :class="[`component-button`, `button-${type}`, disabled && 'button-disabled ', size && `button-${size}`, block &&'button-block']" v-on="$listeners">
        <!-- 背景动画 -->
        <!-- <Icon v-if="'' != icon" v-show="!loading" :value="icon"></Icon> -->
        <slot></slot>
        <!-- <Icon v-show="loading" value="spinner spin"></Icon> -->
    </a>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Button',

    props: {
        loading: {
            type: Boolean
        }
    },

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
    },

    methods: {
        click() {
            this.$emit('click');
        }
    },

    components: {
        Icon
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

.component-button {
    position: relative;
    display: inline-block;
    overflow: hidden;
    user-select: none;
    padding: $gutter/2 $gutter*2;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    letter-spacing: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: $borderRadius;
    transition: all 200ms;
}

.button-disabled {
    pointer-events: none;
    opacity: .65;
}

.button-block {
    width: 100%;
    display: block;
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
