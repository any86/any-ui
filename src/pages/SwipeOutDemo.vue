<template>
    <a-scroll-view class="demo-page">
        <a-cell>
            <a-switch v-model="isShowRight">切换</a-switch>
        </a-cell>

        <a-swipe-out :is-show-right.sync="isShowRight">
            <template slot="left">
                <a-swipe-out-button type="info">更多</a-swipe-out-button>
                <a-swipe-out-button type="danger">禁用</a-swipe-out-button>
            </template>

            <h4 class="fill">胶泥</h4>
            <template slot="right">
                <a-swipe-out-button type="success">编辑文章</a-swipe-out-button>
                <a-swipe-out-button >删除</a-swipe-out-button>
            </template>
        </a-swipe-out>

    </a-scroll-view>
</template>
<script>
export default {
    name: 'ASwipeOutDemo',

    data() {
        return { isShowRight: false };
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
