<template>
    <a-scroll-view class="demo-page">
        <a-cell>
            购物车<v-badge :value="10"/>
        </a-cell>   

        <a-cell>
            <v-badge :value="13">新好友</v-badge>
        </a-cell>   

        <a-cell>
            <v-badge>邮件</v-badge>
        </a-cell>  

        <a-cell @click="$router.push({path: '/tabs'})">
            与Tabs结合, 点击查看
        </a-cell>  
    </a-scroll-view>
</template>
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
