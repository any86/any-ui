<template>

        <div class="page-find">
            <canvas ref="qrcode"></canvas>
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
                <template slot="body">
                    <p style="padding:15px;">我是内容1000000</p>
                </template>
            </CollapseItem>
            <CollapseItem v-model="show[2]">
                <template slot="header">我是标题1</template>
                <template slot="body">
                    <p style="padding:15px;">我是内容1000000</p>
                </template>
            </CollapseItem>
            <VFooter></VFooter>
        </div>
</template>
<script>
import QRCode from 'qrcode'
import Drawer from '@/packages/Drawer/Drawer'

import {
    Carousel,
    CarouselItem
} from '@/packages/Carousel'
import CollapseItem from '@/packages/Collapse/CollapseItem'
import List from '@/packages/List/List.vue'
import ListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VFooter from '@/components/Footer'
export default {
    name: 'Find',
    data() {
        return {
            isSideShow: false,
            url: '',
            switchV: true,
            show: [true, false, false],
            msg: '分类'
        }
    },
    mounted() {
        QRCode.toCanvas(this.$refs.qrcode,
            window.location.href, {
                toSJISFunc: QRCode.toSJIS
            },
            function(error) {
                if (error) console.error(error)
                console.log('success!')
            })

    },
    components: {
        Carousel,
        CollapseItem,
        CarouselItem,
        ListItem,
        List,
        VSwitch,
        VFooter,
        Drawer
    }
}
</script>
<style scoped lang="scss">
</style>
