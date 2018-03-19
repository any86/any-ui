<template>
    <v-popup :is-show.sync="_isShow" class="atom-popup-pickcer">
        <header>
            <span @click="cancel" class=" button-cancel">{{cancelText || $_locale.popupPicker.cancel}}</span>
            <span v-if="!!$slots.default" class="title">
                <slot></slot>
            </span>
            <span @click="ok" class="button-ok">{{okText || $_locale.popupPicker.ok}}</span>
        </header>
        <v-picker v-model="tempValue" :data-source="dataSource" @change="change"/>
    </v-popup>
</template>
<script>
import VPicker from '../../packages/Picker/Picker';
import VPopup from '../../packages/Popup/Popup';
export default {
    name: 'AtomPopupPicker',

    props: {
        dataSource: {
            type: Array
        },

        value: {
            type: Array
        },

        isShow: {
            type: Boolean
        },

        okText: {
            type: String,
        },

        cancelText: {
            type: String,
        }
    },

    data() {
        return {
            active: {
                index: null,
                value: null,
                label: null
            }, // 当前选项
            tempValue: []
        };
    },

    created() {
        this.tempValue = [...this.value];
    },

    methods: {
        change({ columnIndex, rowIndex, value, label }) {
            this.tempValue[columnIndex] = value;
            this.active = { columnIndex, rowIndex, value, label };
            this.$emit('change', this.active);
        },

        ok() {
            this.$emit('ok');
            this.$emit('input', this.tempValue);
            this.$emit('update:isShow', false);
        },

        cancel() {
            this.$emit('cancel');
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

    watch: {
        _isShow() {
            this.tempValue = [...this.value];
        }
    },

    components: { VPicker, VPopup }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
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
        display: flex;
        .button-cancel {
            @include button;
            color: $light;
            flex: 1;
            font-size: $big;
        }
        .title {
            align-self: center;
            text-align: center;
            font-size: $big;
            color: $darkest;
            font-weight: bold;
        }
        .button-ok {
            @include button;
            color: $darkest;
            flex: 1;
            font-size: $big;
        }
    }
}
</style>
