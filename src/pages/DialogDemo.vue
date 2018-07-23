<template>
    <main class="fill flex">
        <a-dialog align="center" :is-show.sync="isShow">
            <a-cell>正常</a-cell>
            <a-cell>困难</a-cell>
            <a-cell>地狱</a-cell>

            <a-button type="primary"  class="gutter-top">开始游戏</a-button>
            <a-button outline  @click="isShow=false" class="gutter-top">离开</a-button>
        </a-dialog>

        <a-button outline  type="primary" @click="handle('bottom')" class="gutter-top flex-item--center">
            打开dialog
        </a-button>
    </main>
</template>
<script>
export default {
    name: 'DialogDemo',

    data() {
        return {
            isShow: false,
        };
    },

    methods: {
        handle(from) {
            this.isShow = true;
        },
    },
};
</script>
<style scoped lang="scss">
</style>
