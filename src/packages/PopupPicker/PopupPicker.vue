<template>
    <v-popup :is-show.sync="_isShow" class="atom-popup-pickcer">
        <header class="flex">
            <span @click="cancel" class="flex-item button-cancel">cancel</span>
            <span v-if="!!$slots.default" class="flex-item title">
                <slot></slot>
            </span>
            <span @click="ok" class="flex-item button-ok">ok</span>
        </header>
        <v-picker :data-source="dataSource" v-model="selfValue" @change="change"></v-picker>
    </v-popup>
</template>
<script>
import VPicker from '@/packages/Picker/Picker';
import VPopup from '@/packages/Popup/Popup';
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
        return {
            active: {
                index: null,
                value: null,
                label: null
            }, // 当前选项
            selfValue: []
        };
    },

    created() {
        this.selfValue = [...this.value];
    },

    methods: {
        change({ columnIndex, rowIndex, value, label }) {
            this.selfValue[columnIndex] = value;
            this.active = { columnIndex, rowIndex, value, label };
            this.$emit('change', this.active);
        },

        ok() {
            this.$emit('input', this.selfValue);
            this.$emit('update:isShow', false);
        },

        cancel() {
            this.$emit('update:isShow', false);
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
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
@mixin button() {
    user-select: none;
    text-align: center;
    font-size: $bigger;
    padding: $gutter $gutter*2;
}

.atom-popup-pickcer {
    header {
        overflow: hidden;
        border-bottom: 1px solid $lightest;
        .button-cancel {
            @include button;
            color: $light;
            text-align: left;
        }
        .title {
            align-self: center;
            text-align: center;
            font-size: $big;
            color: $darker;
        }
        .button-ok {
            @include button;
            color: $base;
            text-align: right;
        }
    }
}
</style>
