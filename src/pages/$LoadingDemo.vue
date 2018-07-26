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
            this.$loading('我加载...');
            // this.$toast('加载中', { type: 'loading', time: 0 });
            setTimeout(() => {
                this.$loading.close();
                // this.$toast.close();
                    this.$toast('加载中1', {type: 'success', time:3000});
                
            }, 1200);

            // this.$loading.close();
            // setTimeout(() => {
            //     this.$toast.close();
            //     setTimeout(()=>{
            //         this.$toast('提示');
            //     }, 1000)
            // }, 1000);
        },
    },
};
</script>