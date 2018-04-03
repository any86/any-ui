<template>
    <label :class="{
            'atom-radio--reverse': isReverse, 
            [`atom-radio--${type}`]: true
        }" class="atom-radio">
        <span v-if="!!$slots.default" class="atom-radio__title">
            <slot></slot>
        </span>
        
        <input :disabled="disabled" :value="value" :checked="isChecked" @change="change" @click.stop="()=>{}" type="radio">
        
        <!-- ios风格 -->
        <v-icon v-if="'ios' === theme" value="tick" size="18" :class="[`text-${type}`, `atom-radio__appearance--${theme}`]"/>
        <!-- android风格 -->
        <span v-else :class="[`atom-radio__appearance--${theme}`]"></span>
    </label>
</template>
<script>
import VIcon from '@/packages/Icon';
export default {
    name: 'AtomRadio',

    model: {
        prop: 'referenceValue',
        event: 'change'
    },

    props: {
        theme: {
            type: String,
            default: 'ios' // ios
        },

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
        },
        type: {
            type: String,
            default: 'primary'
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
    },

    components: {
        VIcon
    }
};
</script>