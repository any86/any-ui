<template>
    <v-dialog :isShow.sync="isShow" :align="align" :hasClose="false" class="atom-prompt">
        <template slot="header">{{title}}</template>
        <div class="atom-prompt__input">
            <v-input ref="input" v-model="value" :placeholder="placeHolder"/>
        </div>
        <div slot="footer" class="atom-prompt__footer">
            <a class="button" @click="cancel">{{cancelText}}</a>
            <a class="button" @click="ok">{{okText}}</a>
        </div>
    </v-dialog>
</template>
<script>
import VDialog from '../../packages/Dialog/Dialog';
import VInput from '../../packages/Input/Input';

export default {
    name: 'AtomPrompt',

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
            type: String,
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

    data: ()=>({value: ''}),

    methods: {
        ok() {
            this.isShow = false;
            this.$nextTick(() => {
                this.onOk(this.value);
            });
        },

        cancel() {
            this.isShow = false;
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
    },

    components: { VDialog, VInput }
};
</script>