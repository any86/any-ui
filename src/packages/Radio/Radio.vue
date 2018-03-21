<template>
    <!-- radio改为圆形, 为了区别checkbox-->
    <label :class="{'atom-radio--reverse': isReverse}" class="atom-radio">
        <span v-if="!!$slots.default" class="atom-radio__title">
            <slot></slot>
        </span>
        <input :class="{checked: isChecked}" :disabled="disabled" :value="value" :checked="isChecked" @change="change" @click.stop="()=>{}" type="radio">
        <span class="atom-radio__appearance"></span>
    </label>
</template>
<script>
export default {
    name: 'AtomRadio',

    model: {
        prop: 'referenceValue',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        // 外部参考值
        // checked: referenceValue == value
        referenceValue: {
            required: true
        },

        value: {
            required: true
        },

        isReverse: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        change() {
            if (!this.disabled) {
                this.$emit('change', this.value);
            }
        }
    },

    computed: {
        isChecked() {
            return this.value == this.referenceValue;
        }
    }
};
</script>