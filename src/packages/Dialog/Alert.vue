<template>
    <a-dialog :isShow.sync="isShow" :align="align" :hasClose="false" class="atom-alert">
        <template v-if="undefined !== title" slot="header">{{title}}</template>
        {{content}}
        <a-button  slot="footer" type="white" @click="ok" class="border-none border-top">{{okText}}</a-button>                
    </a-dialog>
</template>
<script>
import ADialog from '../../packages/Dialog/Dialog';
import AButton from '../../packages/Button/Button';
import AButtonGroup from '../../packages/Button/ButtonGroup';
export default {
    name: 'AtomAlert',

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
            default:  'bottom'
        },

        // 点击ok后运行
        onOk: {
            type: Function
        },
        
        // 按钮文字
        okText: {
            type: String
        }
    },

    methods: {
        ok() {
            this.isShow = false;
            // 防止在onOk中再次$alert的时候, 切换不明显
            this.$nextTick(() => {
                this.onOk();
            });
        },
    },
}
</script>