<template>
    <v-scroll-view class="demo-page">
        <v-cell v-for="n in 3" :key="n">我的代号: 00{{n}}</v-cell>
        <v-affix :offset-top="55">
            <div class="fixed-item">offset-top="55", 固定在距离顶部55px的位置</div>    
        </v-affix>
        <v-cell v-for="n in 42" :key="n">我的代号: 00{{n+3}}</v-cell>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VAffix from '@/packages/Affix/Affix';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'AffixDemo',

    data() {
        return {
        };
    },

    components: {
        VCell,
        VScrollView,
        VAffix
    }
};
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
