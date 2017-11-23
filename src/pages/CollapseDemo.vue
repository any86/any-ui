<template>
    <v-infinite-scroll>
        <v-cell>
            <v-switch v-model="isAccordion">是否开启accordion模式</v-switch>
        </v-cell>
        <v-collapse :is-accordion="isAccordion">
            <v-collapse-item :is-open="true">
                <template slot="header">
                    is-accordion?
                </template>
                设置is-accordion="ture"后, 同时只能打开一个选项卡
            </v-collapse-item>
            <v-collapse-item title="title属性" :is-open="false">
                collapse-item标签上设置可设置title/is-open属性
            </v-collapse-item>
            <v-collapse-item title="slot" :is-open="false">
                对了, collapse-item还支持name="header"的slot
            </v-collapse-item>
        </v-collapse>


        <v-cell>
            <h4>props</h4>
        </v-cell>
        <v-cell>
            is-accordion : 是否一次只能展开一个选项卡
        </v-cell>
    </v-infinite-scroll>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VSwitch from '@/packages/Switch/Switch';
import VCollapse from '@/packages/Collapse/Collapse';
import VCollapseItem from '@/packages/Collapse/CollapseItem';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';

export default {
    name: 'CollapseDemo',

    data() {
        return {
            isAccordion: true
        };
    },

    components: {
        VCell,
        VSwitch,
        VCollapseItem,
        VCollapse,
        VInfiniteScroll
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';

</style>