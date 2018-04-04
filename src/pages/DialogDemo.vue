<template>
    <a-scroll-view class="fill flex">
        <a-dialog :is-show.sync="isShow">
            <a-cell>正常</a-cell>
            <a-cell>困难</a-cell>
            <a-cell>地狱</a-cell>

            <a-button type="primary" :is-block="true" class="gutter-top">开始游戏</a-button>
            <a-button :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</a-button>
        </a-dialog>

        <a-button :is-ghost="true"  type="primary" @click="handle('bottom')" class="gutter-top flex-item--center">
            打开dialog
        </a-button>

    </a-scroll-view>
</template>
<script>
import { AScrollView, AButton, ACell, ADialog } from '@/packages'

export default {
    name: 'DialogDemo',

    data() {
        return {
            isShow: false
        };
    },

    methods: {
        handle(from) {
            this.isShow = true;
        }
    },

    components: {
        AScrollView,
        AButton,
        ACell,
        ADialog
    }
};
</script>
<style scoped lang="scss">

</style>
