<template>
    <v-scroller v-model="pos">
        <v-cell>{{text}}</v-cell>
        <v-cell :has-ripple="false"><v-input placeholder="快点输入" type="bankCode" v-model="text"></v-input></v-cell>
        <v-popup v-model="isShow">
            <v-cell @click="handler" text-align="center">本地相册</v-cell>
            <v-cell text-align="center">拍照</v-cell>
            <v-cell text-align="center" >取消</v-cell>
        </v-popup>
        <v-cell :has-ripple="false">
            <v-switch v-model="isShow">显示{{text2}}</v-switch>
        </v-cell>
        <v-picker :dataSource="dataSource" v-model="value"></v-picker>
        
        <v-cell v-for="n in 5" :key="n">{{n}}</v-cell>
        <p v-for="n in 35" :key="n+5">{{n+5}}</p>
    </v-scroller>
</template>
<script>
import Mock from 'mockjs';
import VPopup from '@/packages/Dialog/Popup';
import VButton from '@/packages/Button/Button';
import VDivider from '@/packages/Divider/Divider';
import VSlider from '@/packages/Slider/Slider';
import VSliderItem from '@/packages/Slider/SliderItem';
import VSwitch from '@/packages/Switch/Switch';
import VCell from '@/packages/Cell/Cell';
import VPicker from '@/packages/Picker/Picker';
import VInput from '@/packages/Input/Input';
import VirtualScroll from '@/packages/Scroller/Scroller';
import VScroller from '@/packages/Scroller/Scroller';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
export default {
    name: 'Test',

    data() {
        return {
            text: '',
            isShow: false,
            list: Mock.mock({
                'list|20': [
                    {
                        'label|+1': 1,
                        'value|+1': 1
                    }
                ]
            }),
            value: [12, 15],
            pos: { scrollTop: 0, scrollLeft: 0 },
            isBottom: false,
            dataSource: [],
            text2: '123'
        };
    },
    created() {
        this.dataSource.push(this.list.list, this.list.list);
    },
    methods: {
        handler(){
            this.$prompt(123, {
                onOk: text=>{
                    alert(text)
                }
            })
        }
    },

    watch: {
    },

    components: {
        VButton,
        VirtualScroll,
        VInput,
        VInfiniteScroll,
        VPicker,
        VSwitch,
        VCell,
        VSlider,
        VSliderItem,
        VScroller,VDivider,
        VPopup
    }
};
</script>
<style scoped lang="scss">
p {
    padding: 15px;
    &:nth-of-type(2n + 1) {
        background: #eee;
    }
}
</style>
