<template>
    <a-scroll-view class="demo-page">
        <a-swipe-out>
            AtomSwipeOut
            <template slot="right">
                <a-button type="danger">删除</a-button>
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
