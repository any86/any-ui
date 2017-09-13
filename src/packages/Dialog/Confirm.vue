<template>
    <v-dialog :isShow.sync="isShow" :hasClose="false">
        <h4 slot="header" class="title">{{title}}</h4>
        {{content}}
        <div slot="footer" class="footer">
            <a class="button" @click="cancel">取消</a>
            <a class="button" @click="ok">确定</a>
        </div>
    </v-dialog>
</template>
<script>
import VDialog from '@/packages/Dialog/Dialog'
export default {
    name: 'Confirm',

    data() {
        return {
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
                this.okCallback();
            });
        },

        cancel() {
            this.isShow = false;
            this.$nextTick(() => {
                this.cancellCallback();
            });
        }
    },

    components: { VDialog }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';

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
