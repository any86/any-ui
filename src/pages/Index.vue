<template>
    <main class="page-index">
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
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VSwitch from '@/packages/Switch/Switch';
import VRadio from '@/packages/Radio/Radio';

export default {
    name: 'Index',

    data() {
        return {
            isSdk: true,
            which: 1

        };
    },

    components: {
        VCell, VSwitch, VRadio
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
