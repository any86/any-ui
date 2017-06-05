<template>
    <div class="page-find">
        <CollapseItem v-model="show[0]">
            <template slot="header">我是标题A</template>
            <template slot="body">
                <list>
                    <list-item>
                        <VSwitch v-model="switchV">Switch</VSwitch>
                    </list-item>
                    <list-item :hasArrow="true">Toast</list-item>
                    <list-item :hasArrow="true">纯文字菜单2</list-item>
                    <list-item :hasArrow="true">纯文字菜单3</list-item>
                </list>
            </template>
        </CollapseItem>
        <CollapseItem v-model="show[1]">
            <template slot="header">我是标题1</template>
            <template slot="body"><p style="padding:15px;">我是内容1000000</p></template>
        </CollapseItem>
        <CollapseItem v-model="show[2]">
            <template slot="header">我是标题1</template>
            <template slot="body"><p style="padding:15px;">我是内容1000000</p></template>
        </CollapseItem>
    </div>
</template>
<script>
import {
    Carousel,
    CarouselItem
} from '@/packages/Carousel'
import CollapseItem from '@/packages/Collapse/CollapseItem'
import List from '@/packages/List/List.vue'
import ListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'

export default {
    name: 'Find',
    data() {
        return {
            switchV: true,
            show: [true, false, false],
            msg: '分类'
        }
    },
    components: {
        Carousel,
        CollapseItem,
        CarouselItem,
        ListItem, List,VSwitch,
    }
}
</script>
<style scoped lang="scss">
</style>
