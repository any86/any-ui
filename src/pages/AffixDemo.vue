<template>
    <a-scroll-view class="demo-page">
        <a-cell v-for="n in 3" :key="n">我的代号: 00{{n}}</a-cell>
        <a-affix :offset-top="55">
            <div class="fixed-item">offset-top="55", 固定在距离顶部55px的位置</div>    
        </a-affix>
        <a-cell v-for="n in 42" :key="n">我的代号: 00{{n+3}}</a-cell>
    </a-scroll-view>
</template>
<script>
export default {
    name: 'AffixDemo'
}
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);

    .fixed-item{
        padding:15px;
        box-shadow: $shadowDown;
        background: rgba($primary, .3);
    }
}

</style>
