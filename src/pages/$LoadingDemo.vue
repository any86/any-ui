<template>
    <main class="fill">
        <a-button @click="open">this.$loading(), 3秒后自动关闭</a-button>
    </main>
</template>
<script>
export default {
    name: 'GlboalLoadingDemo',

    mounted(){
        this.open();
    },

    methods: {
        open() {
            this.$loading('加载中');
            // this.$loading.close();
            setTimeout(() => {
                this.$loading.close();
                this.$toast('提示');
                setTimeout(()=>{
                    
                }, 200)
            }, 1000);

        },
    },
};
</script>