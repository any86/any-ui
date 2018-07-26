<template>
    <main class="fill">
        <a-button @click="open">this.$loading(), 3秒后自动关闭</a-button>
    </main>
</template>
<script>
export default {
    name: 'GlboalLoadingDemo',

    mounted() {
        this.open();
    },

    methods: {
        open() {
            this.$loading('加载数据...');
            setTimeout(() => {
                this.$loading.close();
                this.$toast('加载完成', { type: 'success'});
            }, 1200);
        },
    },
};
</script>