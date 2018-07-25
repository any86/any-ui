<template>
    <main class="fill">
        <a-button @click="open">this.$loading(), 3秒后自动关闭</a-button>
    </main>
</template>
<script>
export default {
    name: 'GlboalLoadingDemo',

    methods: {
        open() {
            this.$loading('加载中1');
            // this.$loading.close();
            setTimeout(() => {
                this.$loading.close();
            }, 1000);

            this.$loading('加载中2');
            // this.$loading.close();
            setTimeout(() => {
                this.$loading.close();
            }, 1000);

            this.$loading('加载中3');
            // this.$loading.close();
            setTimeout(() => {
                this.$loading.close();
            }, 1000);
        },
    },
};
</script>