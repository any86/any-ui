<template>
    <v-dialog :isShow.sync="isShow" :hasClose="false">
        <h4 slot="header" class="title">{{title}}</h4>
        <!-- <p>{{content}}</p> -->
        <div>
            <v-input v-model="value" :placeholder="content" class="input"></v-input>
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
            okCallback: null,
            cancellCallback: null,
            isShow: false,
            title: '提示',
            content: ''
        };
    },

    methods: {
        ok() {
            this.isShow = false;
            this.$nextTick(() => {
                this.okCallback(this.value);
            });

        },

        cancel() {
            this.isShow = false;
            this.$nextTick(() => {
                this.cancellCallback();
            });
        }
    },

    watch: {
        isShow(value) {
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
}

.footer {
    display: flex;
    overflow: hidden;
    border-top: 1px solid $lightest;
    .button {
        flex: 1;
        line-height: .4rem;
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
