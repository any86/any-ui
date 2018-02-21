<template>
    <a-scroll-view class="demo-page">
        <a-swipe-out>
            <template slot="left">
                <a-swipe-out-button class="bg-info">更多</a-swipe-out-button>
                <a-swipe-out-button class="bg-danger">禁用</a-swipe-out-button>
            </template>

                AtomSwipeOut
                
            
            <template slot="right">
                <a-swipe-out-button class="bg-success">编辑文章</a-swipe-out-button>
                <a-swipe-out-button class="bg-warning">删除</a-swipe-out-button>
            </template>
        </a-swipe-out>


        <a-button type="success">编辑</a-button>
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
