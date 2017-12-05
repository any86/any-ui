<template>
    <v-dialog :isShow.sync="isShow" :hasClose="false">
        <template slot="header">{{title}}</template>
        <div class="input">
            <v-input ref="input" v-model="value" :placeholder="content"></v-input>
        </div>
        <div slot="footer" class="footer">
            <a class="button" @click="cancel">取消</a>
            <a class="button" @click="ok">确定</a>
        </div>
    </v-dialog>
</template>
<script>
import VDialog from '@/packages/Dialog/Dialog'
import VInput from '@/packages/Input/Input'

export default {
    name: 'Prompt',

    data() {
        return {
            value: '',
            onOk: ()=>{},
            onCancel: ()=>{},
            isShow: false,
            title: '提示',
            content: ''
        };
    },

    mounted(){
        this.$nextTick(()=>{
            console.dir(this.$refs.input.$el.querySelector('input'));
        })
    },

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
            const $input = this.$refs.input.$el.querySelector('input');
            this.$nextTick(()=>{
                $input.focus();
            });
            // console.log(this.$refs.input.$el.querySelector('input'))
            // 初始化value为空
            if (value) {
                this.value = '';
            }
        }
    },

    components: { VDialog, VInput }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.input {
    border: 1px solid $lightest;
    padding:$gutter/1.2 0;
}

.footer {
    display: flex;
    overflow: hidden;
    border-top: 1px solid $lightest;
    .button {
        user-select: none;
        flex: 1;
        line-height: $prompt_button_height;
        text-align: center;
    }
    .button:first-child {
        border-right: 1px solid $lightest;
    }
    .button:last-child {
        color: $base;
    }
}
</style>
