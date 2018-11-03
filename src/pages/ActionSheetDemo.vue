<template>
    <main class="fill">
        <a-button @click="open">打开</a-button>
    </main>
</template>
<script>
export default {
    name: 'ActionSheetDemo',

    mounted() {
        this.$action({
            title: '请选择一个',
            dataSource: [
                {
                    content: '免费刻字',
                },
                {
                    content: '收费刻字(+$100)',
                },
            ],
        });

        // setTimeout(() => {
        //     this.$action.close();
        // }, 1000);
    },

    methods: {
        open() {
            this.$action({
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
