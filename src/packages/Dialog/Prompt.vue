<template>
    <a-dialog :isShow="isShow" :align="align" :hasClose="false" class="atom-prompt">
        <template slot="header">{{title}}</template>
        <div class="border fill-sm border-rounded">
            <a-input ref="input" v-model="value" :placeholder="placeHolder"/>
        </div>

        <a-button-group slot="footer" class="border-top">
            <a-button @click="cancel" type="white">{{cancelText}}</a-button>
            <a-button @click="ok" type="primary">{{okText}}</a-button>
        </a-button-group>
    </a-dialog>
</template>
<script>
import ADialog from '../../packages/Dialog/Dialog';
import AInput from '../../packages/Input/Input';
import AButton from '../../packages/Button/Button';
import AButtonGroup from '../../packages/Button/ButtonGroup';

export default {
    name: 'AtomPrompt',

    components: { ADialog, AInput, AButton, AButtonGroup },

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

        // 对齐方式
        align: {
            type: String
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
        },

        placeHolder: {
            type: String
        }
    },

    data: () => ({ value: '' }),

    methods: {
        ok() {
            this.$emit('update:isShow', false);
            this.$nextTick(() => {
                this.onOk(this.value);
            });
        },

        cancel() {
            this.$emit('update:isShow', false);
            this.$nextTick(() => {
                this.onCancel();
            });
        }
    },

    watch: {
        isShow(value) {
            if (value) {
                // 初始化value为空
                this.value = '';

                // 自动focus
                const $input = this.$refs.input.$el.querySelector('input');
                this.$nextTick(() => {
                    $input.focus();
                });
            }
        }
    }
};
</script>