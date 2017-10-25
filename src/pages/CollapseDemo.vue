<template>
    <v-collapse :is-accordion="true">
        <v-collapse-item :is-open="false">
            <template slot="header">支持简单模式{{index}}</template>
            支持简单模式，即不指定icon，label将垂直居中显示。
            <v-q-r-code :value="11"/>
        </v-collapse-item>
        <v-collapse-item title="使用图钉" :is-open="true">
            使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。
        </v-collapse-item>
        <v-collapse-item title="当页面加载时" :is-open="false">
            当页面加载时，元素将获得焦点 (注意：autofocus 在移动版 Safari 上不工作)。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：
        </v-collapse-item>
    </v-collapse>
</template>
<script>
import Mock from 'mockjs';
import VQRCode from '@/packages/QRCode/QRCode';
import VCollapse from '@/packages/Collapse/Collapse';
import VCollapseItem from '@/packages/Collapse/CollapseItem';

export default {
    name: 'CollapseDemo',

    data() {
        return {
            index: 1,
            dataSource: Mock.mock({
                'list|4': ["@image('300x300')"],
                'list2|6': ["@image('400x400')"]
            })
        };
    },

    components: {
        VCollapseItem,
        VCollapse,
        VQRCode
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
</style>
