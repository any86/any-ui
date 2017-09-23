<template>
    <v-dialog :isShow.sync="isShow" :align="'bottom'" :hasClose="false">
        <h4 slot="header" class="title">{{title}}</h4>
        {{content}}
        <a slot="footer" @click="ok" class="button-ok">{{btnOkText}}</a>
    </v-dialog>
</template>
<script>
import VDialog from '@/packages/Dialog/Dialog'
export default {
    name: 'Alert',

    props: {
        title: {
            type: String,
            default: '提示'
        },

        holdTime: {
            type: Number,
            default: -1
        },

        lock: {
            type: Boolean
        }
    },

    data() {
        return {
            okCallback: null, // 点击ok后运行
            isShow: false, // 是否显示
            content: '', // 内容
            btnOkText: '确定', // 按钮文字
        };
    },

    created() {
        // var h = this.$createElement;
        // this.$slots.default = [h('h1', )];
    },

    methods: {
        ok() {
            this.isShow = false;
            // 防止在okCallback中再次$alert的时候, 切换不明显
            this.$nextTick(() => {
                this.okCallback();
            });
        },
    },

    components: { VDialog }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.button-ok {
    border-top: 1px solid $lightest;
    width: 100%;
    text-align: center;
    display: block;
    color: $base;
    font-size: $normal;
    text-align: center;
    padding: $gutter 0;
}
</style>
