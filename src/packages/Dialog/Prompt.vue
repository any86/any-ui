<template>
    <v-dialog :isShow.sync="isShow" :hasClose="false">
        <template slot="header">{{title}}</template>
        <div class="input">
            <v-input ref="input" v-model="value" :placeholder="content"/>
        </div>
        <div slot="footer" class="footer">
            <a class="button" @click="cancel">取消</a>
            <a class="button" @click="ok">确定</a>
        </div>
    </v-dialog>
</template>
<script>
import VDialog from '../../packages/Dialog/Dialog';
import VInput from '../../packages/Input/Input';

export default {
    name: 'Prompt',

    data() {
        return {
            value: '',
            onOk: () => {},
            onCancel: () => {},
            isShow: false,
            title: '提示',
            content: ''
        };
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
<style scoped lang="scss">
@import '../../scss/variables.scss';
.input {
    border: 1px solid $lightest;
    padding-top: $gutter/1.2;
    padding-bottom: $gutter/1.2;
    padding-left: $gutter/2;
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
        color: $darker;
    }
    
    .button:last-child {
        color: $primary;
    }
}
</style>
