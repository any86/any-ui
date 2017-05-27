<template>
    <div class="page-find">
        <CollapseItem v-model="show[0]">
            <template slot="header">我是标题1</template>
            <template slot="body">  
                <p>1我是内容1000000</p>
                <p>2我是内容1000000</p>
                <p>3我是内容1000000</p>
                <p>4我是内容1000000</p>
                <p>5我是内容1000000</p>
            </template>

        </CollapseItem>

        <CollapseItem v-model="show[1]">
            <template slot="header">我是标题1</template>
            <template slot="body">我是内容1000000</template>
        </CollapseItem>


        <CollapseItem v-model="show[2]">
            <template slot="header">我是标题1</template>
            <template slot="body">我是内容1000000</template>
        </CollapseItem>
    </div>
</template>
<script>
import {Carousel, CarouselItem} from '@/packages/Carousel'
import CollapseItem from '@/packages/Collapse/CollapseItem'

export default {
    name: 'Find',
    data() {
        return {
            show: [false, true, true],
            msg: '分类'
        }
    },
    components: {
        Carousel,CollapseItem,
        CarouselItem
    }
}
</script>
<style scoped lang="scss">
</style>
