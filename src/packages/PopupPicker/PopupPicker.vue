<template>
    <a-popup :is-show.sync="_isShow" class="atom-popup-picker">
        <header>
            <span @click="cancel" class=" button-cancel">{{cancelText || t('popupPicker.cancel')}}</span>
            <span v-if="!!$slots.default" class="title">
                <slot></slot>
            </span>
            <span @click="ok" class="button-ok">{{okText || t('popupPicker.ok')}}</span>
        </header>
        <a-picker ref="picker" v-model="tempValue" :data-source="dataSource" @column-change="columnChange" @change="change"/>
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
            tempValue: [],
        };
    },

    created() {
        this.tempValue = [...this.value];
        this.active = {};
        this.actives = [];
    },

    methods: {
        /**
         * 改变值
         * @param {Object} {rowIndex, value, label} 当前列的选中行的数据
         */
        columnChange(active) {
            // 同步当前值到tempValue
            // 驱动picker同步UI变化
            const { columnIndex, rowIndex, value } = active;
            this.tempValue.splice(columnIndex, 1, value);
            this.active = active;
            this.$emit('column-change', active);
        },

        change(actives) {
            this.actives = actives;
            this.$emit('change', actives);
        },

        /**
         * 点击确定
         */
        ok() {
            this.$emit('ok', this.actives);
            this.$emit('input', this.tempValue);
            this.$emit('update:isShow', false);
        },

        /**
         * 点击取消
         */
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