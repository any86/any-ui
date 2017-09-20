<template>
    <v-popup v-model="_isShow">
        <header class="flex">
            <span @click="ok" class="flex-item button-cancel">cancel</span>
            <span @click="ok" class="flex-item button-ok">ok</span>
        </header>
        <v-picker :dataSource="dataSource" :value="value" @change="change"></v-picker>
    </v-popup>
</template>
<script>
import VPicker from '@/packages/Picker/Picker'
import VPopup from '@/packages/Dialog/Popup'

export default {
    name: 'PopupPicker',

    props: {
        dataSource: {
            type: Array
        },

        value: {
            type: Array
        },

        isShow: {
            type: Boolean
        }
    },

    data() {
        return { active: { index: null, value: null, label: null } };
    },

    methods: {
        change({ index, value, label }) {
            this.active.index = index;
            this.active.value = value;
            this.active.label = label;
        },

        ok() {
            const value = this.value;
            value[this.active.index] = this.active.value;
            this.$emit('input', value);
            this.$emit('update:isShow', false);
            this.$emit('change', { index: this.active.index, value: this.active.value, label: this.active.label });
        }
    },

    computed: {
        _isShow: {
            get() {
                return this.isShow;
            },

            set(value) {
                this.$emit('update:isShow', false);
            }
        }
    },

    components: { VPicker, VPopup }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
@mixin button() {
    text-align: center;
    font-size: $bigger;
    padding: $gutter $gutter*2;
}

header {
    overflow: hidden;
    border-bottom: 1px solid $lightest;
    .button-cancel {
        @include button;
        color: $light;
        text-align: left;
    }

    .button-ok {
        @include button;
        color: $base;
        text-align: right;
    }
}
</style>
