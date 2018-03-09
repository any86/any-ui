<template>
    <v-scroll-view class="demo-page flex">
        <v-popup-picker :is-show.sync="isShow" :data-source="[data1, data2]" v-model="value">请选择开学日期</v-popup-picker>
        <section class="flex-item--center">
            <p class="text-center">当前值: {{value}}</p>
            <v-button type="primary" :is-ghost="true" :is-block="true" @click="isShow=true" class="gutter-top">打开</v-button>
        </section>
    </v-scroll-view>
</template>
<script>
import VPopupPicker from '@/packages/PopupPicker/PopupPicker';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
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
        VButton,
        VPopupPicker,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
