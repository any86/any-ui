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