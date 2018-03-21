<template>
    <label :style="{width: !!this.$slots.default && '100%'}" :class="[disabled && 'disabled']" class="component-checkbox">
        <span v-if="!!this.$slots.default" class="title" :class="{reverse}">
            <slot></slot>
        </span>
        <input v-model="checked" :disabled="disabled" :true-value="trueValue" :false-value="falseValue" type="checkbox" @click.stop="()=>{}">
        <span class="appearance"></span>
    </label>
</template>
<script>
export default {
    name: 'AtomCheckbox',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        'true-value': {
            default: true
        },

        'false-value': {
            default: false
        },

        reverse: {
            type: Boolean,
            default: false
        },

        value: {
            required: false
        }
    },

    data() {
        return {
            checked: false
        };
    },

    mounted() {
        this.checked = this.value;
    },

    watch: {
        value(value) {
            this.checked = value;
        },

        checked(value) {
            this.$emit('input', value);
        }
    }
}
</script>