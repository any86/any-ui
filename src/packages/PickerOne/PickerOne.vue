<template>
    <VPopup :value="isShow" @input="close" class="component-picker-one">
        <template slot="header">
            <span @click="ok" class="button-default button-link">ok</span>
        </template>
        <VPicker :value="[value]" :dataSource="[dataSource]" @change="change"></VPicker>
    </VPopup>
</template>
<script>
import VPopup from '@/packages/Dialog/Popup'
import VPicker from '@/packages/Picker/Picker'
export default {
    name: 'PickerOne',

    props: {
        dataSource: {
            type: Array,
            required: true
        },

        value: {

        },

        isShow: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            _value: null,
            _label: ''
        };
    },

    methods: {
        ok() {
            this.$emit('input', this._value);
            this.$emit('update:isShow', false);
            this.$emit('change', { value: this._value, label: this._label });
        },

        close() {
            this.$emit('update:isShow', false);
        },

        change({ value, label }) {
            this._value = value;
            this._label = label;
        }
    },

    components: { VPopup, VPicker }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';

.button-link {
    padding-right: $gutter;
    width: 50%;
    margin-left: 50%;
    display: block;
    text-align: right;
    font-size: $big;
}
</style>
