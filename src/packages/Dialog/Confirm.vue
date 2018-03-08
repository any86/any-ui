<template>
    <v-dialog :isShow.sync="isShow" :align="'bottom'" :hasClose="false">
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

    data() {
        return {
            afterOk: null,
            afterCancel: null,
            isShow: false,
            title: '',
            content: '',
            cancelText: 'cancel',
            okText: 'confirm'
        };
    },

    methods: {
        ok() {
            this.isShow = false;
            this.$nextTick(() => {
                this.afterOk();
            });
        },

        cancel() {
            this.isShow = false;
            this.$nextTick(() => {
                this.afterCancel();
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
