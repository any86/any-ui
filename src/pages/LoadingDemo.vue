<template>
    <main class="fill">
        <a-cell>
            <a-loading name="android"/>
        </a-cell>

        <a-cell>
            <a-loading name="ripple"/>
        </a-cell>

        <a-cell>
            <a-loading name="three-dots"/>
        </a-cell>

        <a-button @click="open">this.$loading(), 3秒后自动关闭</a-button>
    </main>
</template>
<script>
import ALoading from '@/packages/Loading';
export default {
    name: 'LoadingDemo',

    components: { ALoading },

    methods: {
        open() {
            this.$loading();
            setTimeout(() => {
                this.$loading.close();
            }, 3000);
        }
    }
};
</script>
<style scoped lang="scss">
</style>
