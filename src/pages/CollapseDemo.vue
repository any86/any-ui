<template>
    <v-scroll-view>
        <v-cell>
            <v-switch v-model="isAccordion">是否开启accordion模式</v-switch>
        </v-cell>
        <v-collapse :is-accordion="isAccordion">
            <v-collapse-item :is-open="true">
                <template slot="header">
                    props: is-accordion
                </template>
                设置is-accordion="ture"后, 同时只能打开一个选项卡
            </v-collapse-item>
            <v-collapse-item title="props: title" :is-open="false">
                collapse-item标签上设置可设置title/is-open属性
            </v-collapse-item>
            <v-collapse-item title="slot: header" :is-open="false">
                对了, collapse-item还支持name="header"的slot
            </v-collapse-item>
        </v-collapse>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VSwitch from '@/packages/Switch/Switch';
import VCollapse from '@/packages/Collapse/Collapse';
import VCollapseItem from '@/packages/Collapse/CollapseItem';
import VScrollView from '@/packages/ScrollView/ScrollView';

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
        VScrollView
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';

</style>