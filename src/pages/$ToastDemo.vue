<template>
    <v-scroll-view class="demo-page">
        <v-cell @click="$toast('3秒后关闭')">默认样式, 3秒后自动关闭</v-cell>
        <v-cell @click="$toast('3秒后关闭', {type:'success'})"><a class="text-success">成功</a>样式, 3秒后自动关闭</v-cell>
        <v-cell @click="$toast('3秒后关闭', {type:'warning'})"><a class="text-warning">警告</a>样式, 3秒后自动关闭</v-cell>
        <v-cell @click="$toast('3秒后关闭', {type:'danger'})"><a class="text-danger">错误</a>样式, 3秒后自动关闭</v-cell>
        <v-cell @click="$toast('3秒后关闭', {type:'loading'})">加载中样式, 3秒后自动关闭</v-cell>
    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
export default {
    name: 'FingerDemo',

    data() {
        return {
            activeIndex: 0
        };
    },


    components: {
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
