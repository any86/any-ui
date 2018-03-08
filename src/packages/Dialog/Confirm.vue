<template>
    <v-dialog :isShow.sync="isShow" :align="align" :hasClose="false">
        <template v-if="!!title" slot="header">{{title}}</template>
        {{content}}
        <div slot="footer" class="footer">
            <a class="button" @click="cancel">{{cancelText}}</a>
            <a class="button" @click="ok">{{okText}}</a>
        </div>
    </v-dialog>
</template>
<script>
import VDialog from '../../packages/Dialog/Dialog';
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

    components: { VDialog }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';

.footer {
    display: flex;
    overflow: hidden;
    border-top: 1px solid $lightest;
    .button {
        user-select: none;
        flex: 1;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
    }
    .button:first-child {
        border-right: 1px solid $lightest;
        color: $darkest;
    }
    .button:last-child {
        color: $primary;
    }
}
</style>
