<template>
    <v-y-scroll v-model="y">
        <v-cell>
            <v-switch v-model="isShow">显示{{text2}}</v-switch>
        </v-cell>
        <v-picker :dataSource="dataSource" v-model="value"></v-picker>
        <p v-for="n in 5" :key="n">{{n}}</p>
        <p>
            <label>scroll = <input v-model="text2" /></label>
        </p>
        <p v-for="n in 35" :key="n+5">{{n+5}}</p>
    </v-y-scroll>
</template>
<script>
import Mock from 'mockjs'
import VSlider from '@/packages/Slider/Slider';
import VSliderItem from '@/packages/Slider/SliderItem';
import VSwitch from '@/packages/Switch/Switch';
import VCell from '@/packages/Cell/Cell';
import VPicker from '@/packages/Picker/Picker';
import VInput from '@/packages/Input/Input';
import VirtualScroll from '@/packages/Scroller/Scroller'
import VYScroll from '@/packages/Scroller/YScroller'
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
export default {
    name: 'Test',

    data() {
        return {
            isShow: false,
            list: Mock.mock({
                'list|20': [{
                    'label|+1': 1,
                    'value|+1': 1
                }]
            }),
            value: [12, 15],
            y: 0,
            isBottom: false,
            dataSource: [],
            text2: '123'
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

    components: { VirtualScroll, VInput, VInfiniteScroll, VPicker, VSwitch, VCell, VSlider, VSliderItem, VYScroll }
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
