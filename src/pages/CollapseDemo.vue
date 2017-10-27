<template>
    <v-infinite-scroll v-model="scrollTop">
        <v-tabs v-model="index">
            <v-tabs-item>
                <v-badge>哈尔滨</v-badge>
            </v-tabs-item>
            <v-tabs-item>齐齐哈尔</v-tabs-item>
            <v-tabs-item>
                <v-badge text="new">哈尔滨</v-badge>
            </v-tabs-item>
        </v-tabs>

        <v-cell :arrow="0">支持简单模式
            <v-badge text="22" slot="extra">新消息</v-badge>
        </v-cell>

        <v-collapse :is-accordion="true">
            <v-collapse-item :is-open="true">
                <template slot="header">
                    支持简单模式{{index}}
                    <v-badge text="320"></v-badge>
                </template>
                支持简单模式，即不指定icon，label将垂直居中显示。
                <v-q-r-code/>
            </v-collapse-item>
            <v-collapse-item title="使用图钉" :is-open="false">
                使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。
            </v-collapse-item>
            <v-collapse-item title="当页面加载时" :is-open="false">
                当页面加载时，元素将获得焦点 (注意：autofocus 在移动版 Safari 上不工作)。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：
            </v-collapse-item>
        </v-collapse>

        <v-group>
            <v-button :block="true" :radius="true" type="success">
                简单
            </v-button>
        </v-group>



        <v-group>
            <v-button :block="true" :radius="true" type="info">
                <v-badge>困难</v-badge>
            </v-button>
        </v-group>
        <v-group>
            <v-button :block="true" :radius="true" type="info">
                <v-badge>困难</v-badge>
            </v-button>
        </v-group>

        <v-group>
            <v-button :block="true" :radius="true" type="info">
                <v-badge>困难</v-badge>
            </v-button>
        </v-group>

        <v-group>
            <v-button :block="true" :radius="true" type="info">
                <v-badge>困难</v-badge>
            </v-button>
        </v-group>

        <v-group>
            <v-button :block="true" :radius="true" type="info">
                <v-badge>困难</v-badge>
            </v-button>
        </v-group>

        <div class="flex fixed-bottom" style="width:100%;">
            <v-button :block="true" type="warning" :disabled="true">
                商城
            </v-button>
            <v-button :block="true">开始</v-button>
        </div>
    </v-infinite-scroll>
</template>
<script>



import Mock from 'mockjs';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
import VDivider from '@/packages/Divider/Divider';
import VQRCode from '@/packages/QRCode/QRCode';
import VGroup from '@/packages/Group/Group';
import VBadge from '@/packages/Badge/Badge';
import VCell from '@/packages/Cell/Cell';
import VCollapse from '@/packages/Collapse/Collapse';
import VCollapseItem from '@/packages/Collapse/CollapseItem';
import VTabs from '@/packages/Tabs/Tabs';
import VTabsItem from '@/packages/Tabs/TabsItem';
import VButton from '@/packages/Button/Button';

export default {
    name: 'CollapseDemo',

    data() {
        return {
            scrollTop: 0,
            index: 1,
            dataSource: Mock.mock({
                'list|4': ["@image('300x300')"],
                'list2|6': ["@image('400x400')"]
            })
        };
    },

    components: {
        VCell,VDivider,
        VCollapseItem,
        VCollapse,
        VQRCode,
        VBadge,
        VTabs,
        VTabsItem,
        VButton,
        VGroup,VInfiniteScroll
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
main {
    overflow: scroll;
}
</style>