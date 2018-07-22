<template>
    <a-dialog :is-show="isShow" :align="align" :has-close="false">
        <template v-if="!!title" slot="header">{{title}}</template>
        {{content}}
        <a-button-group slot="footer" class="border-top">
            <a-button @click="cancel" type="white">{{cancelText}}</a-button>
            <a-button @click="ok" type="primary">{{okText}}</a-button>
        </a-button-group>
    </a-dialog>
</template>
<script>
import ADialog from '../../packages/Dialog/Dialog';
import AButton from '../../packages/Button/Button';
import AButtonGroup from '../../packages/Button/ButtonGroup';
export default {
    name: 'AtomConfirm',

    components: { ADialog, AButton, AButtonGroup },

    props: {
        // 是否显示
        isShow: {
            type: Boolean
        },

        // 标题
        title: {
            type: String,
            default: ''
        },

        // 内容
        content: {
            type: String,
            default: ''
        },

        // 对齐方式
        align: {
            type: String,
            default: 'bottom'
        },

        // 点击ok后运行
        onOk: {
            type: Function
        },

        // 点击cancel
        onCancel: {
            type: Function
        },

        // 按钮文字
        okText: {
            type: String
        },

        // 取消文字
        cancelText: {
            type: String
        }
    },

    methods: {
        ok() {
            this.$emit('update:isShow', false);
            this.$nextTick(() => {
                this.onOk();
            });
        },

        cancel() {
            this.$emit('update:isShow', false);
            this.$nextTick(() => {
                this.onCancel();
            });
        }
    }
};
</script>