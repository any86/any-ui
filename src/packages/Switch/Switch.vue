<template>
    <label :style="{width: !!this.$slots.default && '100%'}" class="atom-switch" :class="{'atom-switch-disabled': disabled}">
        <span v-if="!!this.$slots.default" class="title">
            <slot></slot>
        </span>
        <input :disabled="disabled" :checked="value" @change="change" @click.stop="()=>{}" type="checkbox">
        <span class="appearance"></span>
    </label>
</template>
<script>
/**
 * 待解决: 为什么加了fastClick点击切换特别慢
 */
export default {
    name: 'AtomSwitch',

    props: {
        value: {
            type: Boolean
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        change(e) {
            if (!this.disabled) {
                this.$emit('input', e.target.checked);
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
$height: .5rem;
label.atom-switch {
    display: flex;
    align-items: center;
    >.title {
        display: block;
        flex: 1;
    }
    >input {
        display: none;
    }
    /*未禁用, 未选中*/
    >.appearance {
        user-select: none;
        position: relative;
        overflow: hidden;
        border: 1px solid $lightest;
        box-sizing: content-box;
        border-radius: $height;
        width: 1.8 * $height;
        height: $height;
        transition: all .5s ease;
        &:before {
            font-size: 0;
            content: " ";
            display: block;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            height: $height;
            width: $height;
            border-radius: $height;
            transition: all .3s ease;
            background: $sub;
            box-shadow: $shadowDown, $shadowUp;
        }
        &:after {
            font-size: 0;
            content: " ";
            display: block;
            position: absolute;
            z-index: 1;
            top: 0;
            right: 0;
            height: $height;
            width: 1.8 * $height;
            border-radius: $height;
            transition: all .3s ease;
            transform: scale(1);
            background: #fff;
        }
    }
    /* 未禁用, 已选中*/
    input:checked+.appearance {
        transition-duration: 0ms;
        border: 1px solid $base;
        background: $base;
        &:before {
            transform: translateX($height * 0.8);
        }
        &:after {
            transform: scale(0);
        }
    }
    /*已禁用, 未选中*/
    input:disabled+.appearance {
        &:before {
            background: $lighter;
        }
        &:after {
            background: $lighter;
        }
    }
    /* 已禁用, 已选中*/
    input:checked:disabled+.appearance {
        border: 1px solid $lighter;
        background: $lightest;
        &:before {
            background: $disabled;
        }
    }
}
</style>
