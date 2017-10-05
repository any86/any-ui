<template>
    <v-scroll-view v-model="pos" class="full-screen page-index">

        <v-cell border>
            <v-switch v-model="isSdk">是否支持sdk</v-switch>
        </v-cell>

        <v-cell>
            <div style="background:#69c; width:1000px;height:1000px;"></div>            
        </v-cell>

        <v-cell>
            <v-input v-model="text"></v-input>
        </v-cell>
        <v-cell border>
            <v-radio v-model="which" :value="1">中文</v-radio>
        </v-cell>
        <v-cell border>
            <v-radio v-model="which" :value="2">英文</v-radio>
        </v-cell>

        <v-cell border @click="$alert('用户体验?')">
            Alert
        </v-cell>

        <v-cell border @click="$confirm('是否开启蓝牙?')">
            Confirm
        </v-cell>

        <v-dialog :isShow.sync="isSdk">
            <h1 class="h11">sdk</h1>
        </v-dialog>

        <!-- <div style="height:1000px; width: 1000px;"></div> -->
        <v-cell v-for="img in images" :key="img"><img width="100%" :src="img"/></v-cell>
        <v-cell>{{pos}}</v-cell>
        <v-cell v-for="n in 20" :key="n" class="abc">第{{n}}次</v-cell>
        <v-cell>
            <v-input v-model="text"></v-input>
        </v-cell>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
import VSwitch from '@/packages/Switch/Switch';
import VRadio from '@/packages/Radio/Radio';
import VDialog from '@/packages/Dialog/Dialog';
import VScrollView from '@/packages/ScrollView/Core';


export default {
    name: 'Index',

    data() {
        return {
            images: [
                'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png',
                'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1276.png',
                'https://static.soufeel.com/media/catalog/product/cache/1/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/K/S/KSZ03.png',
                'https://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/X/S/XS1438_2.png',
                'https://static.soufeel.com/skin/frontend/smartwave/default/custom/images/catalog/soufeel-charms/charm-recommend-10.jpg'
            ],
            isSdk: false,
            which: 1,
            pos: { x: 10, y: 10 },
            text: '123213'

        };
    },

    components: {
        VCell, VSwitch, VRadio, VDialog, VScrollView, VInput
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-index {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; // position: relative;
    // height: 100%;
    // width: 100%;
    display: flex;
    flex-direction: column;

    .scroll-view {
        flex: 1;
        padding: 0 .3rem .3rem .3rem;
    }


    .abc{
        background: #eee;
        &:nth-child(2n+1){
            background: #fff;
        }
    }
}
</style>
