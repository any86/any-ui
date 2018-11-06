<template>
    <main class="fill">
        <a-button @click="open">打开</a-button>
    </main>
</template>
<script>
export default {
    name: 'ActionSheetDemo',

    mounted() {
        this.open();
    },

    methods: {
        open() {
            this.$action({
                onClickAction: index=>{
                    console.log(index);
                },
                title: '请选择一个水果',
                dataSource: [
                    {
                        type: 'danger',
                        content: '苹果',
                    },
                    {
                        content: '鸭梨',
                    },
                ],
            });
        },
    },
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
