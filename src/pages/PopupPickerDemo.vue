<template>
    <a-scroll-view class="demo-page flex">
        <a-popup-picker :is-show.sync="isShow" :data-source="[data1, data2]" v-model="value"/>
        <section class="flex-item--center gutter-top">
            <p class="text-center">当前值: {{value}}</p>
            <a-button type="primary" :is-ghost="true" :is-block="true" @click="isShow=true" class="gutter-top">打开</a-button>
        </section>
    </a-scroll-view>
</template>
<script>
import { AScrollView, AButton, APopupPicker } from '@/packages'
import moment from 'moment'

export default {
    name: 'PopupPickerDemo',

    data() {
        let years = [];
        for(let i = 0; i < 5; i++) {
            let year = moment().add(i, 'y').year();
            years.push({value: year, label: year});
        }

        let months = [];
        let i = 1;
        while (i <= 12) {
            months.push({ value: i, label: i + '月份' });
            i++;
        }

        return {
            isShow: false,
            data1: years,
            data2: months,
            value: [moment().year(), moment().month()+1]
        };
    },

    components: {
        AButton,
        APopupPicker,
        AScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
