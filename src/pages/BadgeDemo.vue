<template>
    <a-scroll-view class="demo-page">
        <a-cell>
            购物车<a-badge :value="10"/>
        </a-cell>   

        <a-cell>
            <a-badge :value="13">新好友</a-badge>
        </a-cell>   

        <a-cell>
            <a-badge>邮件</a-badge>
        </a-cell>  

        <a-cell @click="$router.push({path: '/tabs'})">
            与Tabs结合, 点击查看
        </a-cell>  
    </a-scroll-view>
</template>0
<script>
export default {
    name: 'BadgeDemo'
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
