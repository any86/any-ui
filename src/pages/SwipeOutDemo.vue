<template>
    <a-scroll-view class="demo-page">
        <a-swipe-out>
            AtomSwipeOut
            <template slot="right">
                <a-swipe-out-button type="success">编辑</a-swipe-out-button>
                <a-swipe-out-button type="danger">删除</a-swipe-out-button>
            </template>
        </a-swipe-out>
    </a-scroll-view>
</template>
<script>
export default {
    name: 'ASwipeOutDemo'
}
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);

}
</style>
