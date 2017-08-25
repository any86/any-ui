<template>
    <span :class="['com-button', type, !!disabled && 'disabled ', size, inline && 'inline', inline || 'block' ]" v-on="$listeners">
        <!-- 背景动画 -->
        <Icon v-if="'' != icon" v-show="!loading" :value="icon"></Icon>
        <slot></slot>
        <Icon v-show="loading" value="spinner spin"></Icon>
    </span>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Button',

    props: {
        inline: {
            type: Boolean
        },

        loading: {
            type: Boolean
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            size: 'small',
            icon: '',
            type: 'default'
        };
    },

    mounted() {
        // 类型
        var type = this.$el.getAttribute('type');
        if (null !== type) {
            this.type = type;
        }
        // 图标
        var icon = this.$el.getAttribute('icon');
        if (null !== type) {
            this.icon = icon;
        }
        // 尺寸
        var size = this.$el.getAttribute('size');
        if (null !== size) {
            this.size = size;
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
@mixin button($type) {
    background: $type;
    border-color: rgba($type, 1);
    color: #fff;
    &:active {
        opacity: .7;
    }
}

.small {
    padding: .1rem .2rem;
    font-size: .2rem;
}

.big {
    padding: .2rem .4rem;
    font-size: .3rem;
}

.inline {
    display: inline-block;
}

.block {
    width: 100%;
    display: block;
}

.com-button {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    letter-spacing: 1px;
    text-decoration: none;
    transition: .2s;
    border: 1px solid transparent;
}

.default {
    @include button($default);
    color: $default;
    background: #fff;
}

.ghost {
    @include button($base);
    color: $base;
    background: #fff;
}

.primary {
    @include button($primary);
}

.success {
    @include button($success);
}

.warning {
    @include button($warning);
}

.danger {
    @include button($danger);
}

.info {
    @include button($info);
}

.disabled {
    color: #c3cbd6;
    background-color: #f7f7f7;
    border: 1px solid #d7dde4;
    &:hover {
        cursor: not-allowed;
        opacity: 1;
    }
}

.v-enter-active {
    animation: in .2s;
}

.v-leave-active {
    animation: out .2s;
}

@keyframes in {
    0% {
        opacity: 0;
        transform: scale(2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(2);
    }
}
</style>
