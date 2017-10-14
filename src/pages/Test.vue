<template>
    <virtual-scroll v-model="pos" :lock-y="false" :lock-x="true">
        <v-cell><v-switch v-model="isShow">显示</v-switch></v-cell>
        <v-picker :dataSource="dataSource" v-model="value"></v-picker>
        <!-- <div style="background:linear-gradient(-45deg,#69c,#444);width:500px;height:500px;"></div> -->
        <p v-for="n in 5" :key="n">{{n}}</p>
        <p>
            <v-input v-model="pos.scrollTop"></v-input>
        </p>
        <p v-for="n in 35" :key="n+5">{{n+5}}</p>

    </virtual-scroll>
</template>
<script>
import Mock from 'mockjs'
import VSwitch from '@/packages/Switch/Switch';
import VCell from '@/packages/Cell/Cell';
import VPicker from '@/packages/Picker/Picker';
import VInput from '@/packages/Input/Input';
import VirtualScroll from '@/packages/Scroller/Scroller'
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
export default {
    name: 'Test',

    data() {
        return {
            pos: { scrollLeft: 0, scrollTop: 0 },
            isShow: false,
            list: Mock.mock({
                'list|20': [{
                    'label|+1': 1,
                    'value|+1': 1
                }]
            }),
            value: [12, 15],
            scrollTop: 0,
            isBottom: false,
            dataSource: []
        };
    },
    created() {
        this.dataSource.push(this.list.list, this.list.list);
    },
    methods: {

    },

    watch: {
        pos(v) {
        }
    },

    components: { VirtualScroll, VInput, VInfiniteScroll, VPicker, VSwitch, VCell }
}
</script>
<style scoped lang="scss">
p {
    padding: 15px;
    &:nth-of-type(2n+1) {
        background: #eee;
    }
}
</style>
