<template>
    <a-scroll-view class="demo-page">
        <a-cell @click="$toast('3秒后关闭')">默认样式, 3秒后自动关闭</a-cell>
        <a-cell @click="$toast('3秒后关闭', {type:'success'})"><a class="text-success">成功</a>样式, 3秒后自动关闭</a-cell>
        <a-cell @click="$toast('3秒后关闭', {type:'warning'})"><a class="text-warning">警告</a>样式, 3秒后自动关闭</a-cell>
        <a-cell @click="$toast('3秒后关闭', {type:'danger'})"><a class="text-danger">错误</a>样式, 3秒后自动关闭</a-cell>
        <a-cell @click="$toast('3秒后关闭', {type:'loading'})">加载中样式, 3秒后自动关闭</a-cell>
        <section class="fill">
            <a-button @click="test">测试</a-button>
        </section>
    </a-scroll-view>
</template>
<script>
export default {
    name: 'GlboalToastDemo',

    data() {
        return {
            activeIndex: 0,
        };
    },

    methods: {
        test() {
            this.$loading('测试');
            // setTimeout(() => {
            //     this.$loading.close();
            //     this.$toast('开始');
            // }, 1000);
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
