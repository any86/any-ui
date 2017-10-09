<template>
    <v-infinite-scroll @scroll-bottom="isBottom=true" v-model="scrollTop" :isListenBottom="true" class="page-index">
        <!-- <v-popup-picker isShow="true" :dataSource="dataSource" v-model="value"></v-popup-picker> -->
        <v-picker :dataSource="dataSource" v-model="value"></v-picker>

        <v-cell>
            <v-input v-model="value[0]"></v-input>
        </v-cell>

        <v-cell>
            <v-input v-model="value[1]"></v-input>
        </v-cell>

        <v-cell v-for="n in 10" :key="n" class="abc">第{{n}}次</v-cell>

        <v-affix :scrollTop="scrollTop">
            <v-cell style="background:#bbb;">{{scrollTop}}</v-cell>
        </v-affix>

        <v-cell v-for="n in 20" :key="n" class="abc">第{{10+n}}次</v-cell>
        <v-spinner v-show="isBottom"></v-spinner>
    </v-infinite-scroll>
</template>
<script>
import VSpinner from '@/packages/Spinner/Spinner'
import VAffix from '@/packages/Affix/Affix'

import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
import VSwitch from '@/packages/Switch/Switch';
import VRadio from '@/packages/Radio/Radio';
import VDialog from '@/packages/Dialog/Dialog';
import VPicker from '@/packages/Picker/Picker2';
import VPopupPicker from '@/packages/PopupPicker/PopupPicker';

import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';

import Mock from 'mockjs'
export default {
    name: 'Index',

    data() {
        return {
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

    mounted() {
        // var t = 14.2
        // var a = 0
        // var arr = [10, 10, 10, 15, 16]
        // arr.map(item => {
        //     a += item;
        // });

        // arr.map(item => {
        //     syslog((item - item / a * t).toFixed(1));
        // })
    },

    methods: {
        bo(e) {
        }
    },

    components: {
        VCell, VSwitch, VRadio, VDialog, VInfiniteScroll, VInput, VPicker, VSpinner, VAffix, VPopupPicker
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.fixed-top {
    width: 100%;
    background: rgba(255, 255, 255, .7) !important;
    color: #fff !important;
    text-align: center;
}

.page-index {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;


    .scroll-view {
        flex: 1;
        padding: 0 .3rem .3rem .3rem;
    }


    .abc {
        background: #eee;
        &:nth-child(2n+1) {
            background: #fff;
        }
    }
}
</style>
