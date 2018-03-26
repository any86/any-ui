<template>
    <v-popup :is-show.sync="_isShow" class="atom-popup-pickcer">
        <header>
            <span @click="cancel" class=" button-cancel">{{cancelText || $_t('popupPicker.cancel')}}</span>
            <span v-if="!!$slots.default" class="title">
                <slot></slot>
            </span>
            <span @click="ok" class="button-ok">{{okText || $_t('popupPicker.ok')}}</span>
        </header>
        <v-picker ref="picker" v-model="tempValue" :data-source="dataSource" @change="change"/>
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
        _isShow(isShow) {
            if(isShow) {
                this.$nextTick(()=>{
                    this.$refs.picker.updateSize();
                });
            }
            this.tempValue = [...this.value];
        }
    },

    components: { VPicker, VPopup }
};
</script>