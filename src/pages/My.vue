<template>
    <div class="page-my">
        <ScrollView :pullable="false">
            <div class="box">
                <div class="circle">
                    <img src="https://avatars0.githubusercontent.com/u/8264787?v=3&s=460">
                </div>
            </div>
            <div style="padding:15px;">
                <VInput v-model="date" placeholder="请输入" type="text" :disabled="false" :maxlength="2">日期</VInput>
                <input type="text" v-model="date">
                <VSwitch v-model="checked"></VSwitch>
                <VButton @click="click" type="ghost" icon="remove" :loading="false" :disabled="false" :inline="false">Ok</VButton>
                <Checkbox v-model="checked"></Checkbox>
                <ImageTools></ImageTools>
            </div>
        </ScrollView>
        <VPopup v-model="checked">
            <h1 slot="header">Please Pickup Date</h1>
            <VInput style="margin:15px;" v-model="pickerValue[0]" placeholder="请输入" type="text" :disabled="false" >年</VInput>
            <VInput style="margin:15px;" v-model="pickerValue[1]" placeholder="请输入" type="text" :disabled="false">月</VInput>
            <Picker v-model="pickerValue" :dataSource="picker"></Picker>
            <!-- <VDate v-model="date"></VDate> -->
            <!-- <VTime v-model="time"></VTime> -->
        </VPopup>
    </div>
</template>
<script>
import ImageTools from '@/packages/ImageTools/ImageTools'
import axios from 'axios';
import VPopup from '@/packages/Dialog/Popup'
import VDate from '@/packages/DateTime/Date'
import VTime from '@/packages/DateTime/Time'
import VButton from '@/packages/Button/Button'
import Checkbox from '@/packages/Checkbox/Checkbox'
import VSwitch from '@/packages/Switch/Switch'
import Upload from '@/packages/Upload/Upload'
import VInput from '@/packages/Input/Input'
import Picker from '@/packages/Picker/Picker'

export default {
    name: 'My',
    mounted() {

        axios.get('./mock/success')

    },
    data() {
        return {
            checked: true,
            date: '2017-01-01',
            time: '12:00:00',

            pickerValue: [2017, 3],

            picker: [
                [{
                    label: '2013年',
                    value: 2013
                },{
                    label: '2014年',
                    value: 2014
                },{
                    label: '2015年',
                    value: 2015
                },{
                    label: '2016年',
                    value: 2016
                }, {
                    label: '2017年',
                    value: 2017
                }, {
                    label: '2018年',
                    value: 2018
                }, {
                    label: '2019年',
                    value: 2019
                }, {
                    label: '2020年',
                    value: 2020
                }],
                [{
                    label: '1月',
                    value: 1
                }, {
                    label: '2月',
                    value: 2
                }, {
                    label: '3月',
                    value: 3
                }, {
                    label: '4月',
                    value: 4
                }, {
                    label: '5月',
                    value: 5
                }, {
                    label: '6月',
                    value: 6
                }, {
                    label: '7月',
                    value: 7
                }, {
                    label: '8月',
                    value: 8
                }, {
                    label: '9月',
                    value: 9
                }, {
                    label: '10月',
                    value: 10
                }, {
                    label: '11月',
                    value: 11
                }, {
                    label: '12月',
                    value: 12
                }]
            ]

        }
    },

    methods: {
        click() {
            this.$mask({
                VButton
            }, '<VButton></VButton>')
        }
    },
    components: {
        VButton,
        Checkbox,
        VSwitch,
        VPopup,
        VDate,
        VTime,
        Upload,
        VInput,
        ImageTools,
        Picker
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {
    position: relative;
    height: 100%;
    .box {
        padding: .3rem;
        background: $background;
        box-shadow: $shadowDown;
        .circle {
            width: 3rem;
            height: 3rem;
            border-radius: 100%;
            overflow: hidden;
            margin: auto;
            img {
                display: block;
                width: 100%;
            }
        }
    }
}
</style>
