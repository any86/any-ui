<template>
    <main>
        <a-tabs v-model="index1">
            <a-tabs-item>详情</a-tabs-item>
            <a-tabs-item>
                <a-badge value="5">评论</a-badge>
            </a-tabs-item>
            <a-tabs-item>规格</a-tabs-item>
            <a-tabs-item>认证</a-tabs-item>
        </a-tabs>

        <a-tabs v-model="index2" class="gutter-top">
            <a-tabs-item>
                <a-badge>国内</a-badge>
            </a-tabs-item>
            <a-tabs-item v-for="text in list2" :key="text">{{text}}</a-tabs-item>
        </a-tabs>
    </main>
</template>
<script>
import { ATabs, ATabsItem, ABadge } from '@/packages'

export default {
    name: 'TabsDemo',

    data() {
        return {
            index1: 0,
            index2: 1,
            list2: ['科技', '政治', '娱乐', '汽车', '电影', '音乐', '游戏', '天气', '直播', '微博', '微信', '生活常识', '怀孕', '养生', '计算机', '宠物', '时尚', '演员', '话剧', '非常6+1']
        };
    },

    methods: {},

    components: {
        ATabs,
        ATabsItem,
        ABadge
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
