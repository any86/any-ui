<template>
    <v-scroll-view v-model="pos" class="full-screen page-index">
        <v-cell border>1</v-cell>
        <v-cell border>
            <v-switch v-model="isSdk">是否支持sdk</v-switch>
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

        <div style="height:1000px; width: 1000px;background:#69c;">
            {{pos}}
        </div>

    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VSwitch from '@/packages/Switch/Switch';
import VRadio from '@/packages/Radio/Radio';
import VDialog from '@/packages/Dialog/Dialog';
import VScrollView from '@/packages/ScrollView/Core';


export default {
    name: 'Index',

    data() {
        return {
            isSdk: false,
            which: 1,
            pos: {x: 10, y:10}

        };
    },

    components: {
        VCell, VSwitch, VRadio, VDialog, VScrollView
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
}
</style>
