<template>
    <v-dialog :isShow.sync="isShow" :align="align" :hasClose="false">
        <template v-if="undefined !== title" slot="header">{{title}}</template>
        {{content}}
        <a slot="footer" @click="ok" class="button-ok">{{okText}}</a>
    </v-dialog>
</template>
<script>
import VDialog from '../../packages/Dialog/Dialog'
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

    components: { VDialog }
}
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.button-ok {
    user-select: none;
    border-top: 1px solid $lightest;
    width: 100%;
    text-align: center;
    display: block;
    color: $darkest;
    text-align: center;
    padding: $gutter 0;
}
</style>
