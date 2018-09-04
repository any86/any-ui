<template>
    <a-popup :is-show.sync="_isShow" class="atom-popup-pickcer">
        <header>
            <span @click="cancel" class=" button-cancel">{{cancelText || t('popupPicker.cancel')}}</span>
            <span v-if="!!$slots.default" class="title">
                <slot></slot>
            </span>
            <span @click="ok" class="button-ok">{{okText || t('popupPicker.ok')}}</span>
        </header>
        <a-picker ref="picker" v-model="tempValue" :data-source="dataSource" @change="change"/>
    </a-popup>
</template>
<script>
import Locale from '@/mixin/Locale';
import APicker from '@/packages/Picker/Picker';
import APopup from '@/packages/Popup/Popup';
export default {
    name: 'AtomPopupPicker',

    mixins: [Locale],

    props: {
        dataSource: {
            type: Array,
        },

        value: {
            type: Array,
            default() {
                return [];
            },
        },

        isShow: {
            type: Boolean,
        },

        okText: {
            type: String,
        },

        cancelText: {
            type: String,
        },
    },

    data() {
        return {
            active: {
                index: undefined,
                value: undefined,
                label: undefined,
            }, // 当前选项
            tempValue: [],
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
            this.$emit('ok', this.tempValue);
            this.$emit('input', this.tempValue);
            this.$emit('update:isShow', false);
        },

        cancel() {
            this.$emit('cancel');
            this.$emit('update:isShow', false);
        },
    },

    computed: {
        _isShow: {
            get() {
                return this.isShow;
            },

            set(value) {
                this.$emit('update:isShow', false);
            },
        },
    },

    watch: {
        _isShow(isShow) {
            if (isShow) {
                this.$nextTick(() => {
                    this.$refs.picker.updateSize();
                });
            }
            this.tempValue = [...this.value];
        },
    },

    components: { APicker, APopup },
};
</script>