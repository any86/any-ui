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
            this.$toast('加载中');
            setTimeout(() => {
                // this.$toast.close();
                this.$toast('加载中1');
            }, 1000);

            // this.$loading.close();
            // setTimeout(() => {
            //     this.$toast.close();
            //     setTimeout(()=>{
            //         this.$toast('提示');
            //     }, 1000)
            // }, 1000);
        }
    }
};
</script>