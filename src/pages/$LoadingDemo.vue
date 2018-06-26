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
            this.$loading('加载中');
            setTimeout(() => {
                this.$loading.close();
            }, 3000);
        },
    },
};
</script>