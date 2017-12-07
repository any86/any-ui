<template>
    <main>
        <v-tabs v-model="index1">
            <v-tabs-item>详情</v-tabs-item>
            <v-tabs-item>
                <v-badge value="5">评论</v-badge>
            </v-tabs-item>
            <v-tabs-item>规格</v-tabs-item>
            <v-tabs-item>认证</v-tabs-item>
        </v-tabs>

        <v-tabs v-model="index2" class="gutter-top">
            <v-tabs-item>
                <v-badge>国内</v-badge>
            </v-tabs-item>
            <v-tabs-item v-for="text in list2" :key="text">{{text}}</v-tabs-item>
        </v-tabs>
    </main>
</template>
<script>
import VTabs from '@/packages/Tabs/Tabs';
import VTabsItem from '@/packages/Tabs/TabsItem';
import VBadge from '@/packages/Badge/Badge';

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
        VTabs,
        VTabsItem,
        VBadge
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
