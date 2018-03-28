<template>
    <v-dialog :isShow.sync="isShow" :align="align" :hasClose="false" class="atom-alert">
        <template v-if="undefined !== title" slot="header">{{title}}</template>
        {{content}}
        <section slot="footer" class="border-top">
            <v-button slot="footer" :is-block="true" type="white" @click="ok" class="border-none">{{okText}}</v-button>                
        </section>
    </v-dialog>
</template>
<script>
import VDialog from '../../packages/Dialog/Dialog'
import VButton from '../../packages/Button/Button'

export default {
    name: 'AtomAlert',

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

    components: { VDialog,VButton }
}
</script>