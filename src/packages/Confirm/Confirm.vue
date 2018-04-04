<template>
    <v-dialog :is-show.sync="isShow" :align="align" :has-close="false">
        <template v-if="!!title" slot="header">{{title}}</template>
        {{content}}
        <section slot="footer" class="flex-row border-top">
            <v-button @click="cancel" :is-block="true" :is-round="false" type="white" class="border-none border-right">{{cancelText}}</v-button>
            <v-button @click="ok" :is-block="true" :is-ghost="true" :is-round="false" type="primary" class="border-none">{{okText}}</v-button>
        </section>
    </v-dialog>
</template>
<script>
import VDialog from '@/packages/Dialog';
import VButton from '@/packages/Button'
export default {
    name: 'AtomConfirm',

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
            default:  'bottom'
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
            this.isShow = false;
            this.$nextTick(() => {
                this.onOk();
            });
        },

        cancel() {
            this.isShow = false;
            this.$nextTick(() => {
                this.onCancel();
            });
        }
    },

    components: { VDialog, VButton }
};
</script>