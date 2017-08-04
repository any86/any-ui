<template>
    <v-popup v-model="_isShow">
        <header>
            <span @click="cancel" class="button button-cancel">cancel</span>
            <span @click="ok" class="button button-ok">ok</span>
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

        cancel() {
            this.$emit('update:isShow', false);
        },

        ok() {
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
header {
    overflow: hidden;
    .button {
        padding: $gutter * 3 $gutter * 5;
        font-size: $bigger;
        display: block; // &:active {}
    }
    .button-cancel {
        float: left; // text-align: left;
        color: $light;
    }

    .button-ok {
        color: $base;
        float: right; // text-align: right;
    }
}
</style>
