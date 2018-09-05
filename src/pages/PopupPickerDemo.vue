<template>
    <main class="demo-page flex">
        <a-popup-picker :is-show.sync="isShow" :data-source="[data1, data2]" v-model="value" @change="change" @input="input"/>
        <section class="flex-item--center gutter-top">
            <p class="text-center">当前值: {{value}}</p>
            <a-button type="primary" :is-ghost="true" :is-block="true" @click="isShow=true" class="gutter-top">打开</a-button>
        </section>
    </main>
</template>
<script>
import dayjs from 'dayjs';
export default {
    name: 'PopupPickerDemo',

    data() {
        let years = [];
        for (let i = 0; i < 5; i++) {
            let year = dayjs()
                .add(i, 'y')
                .year();
            years.push({ value: year, label: year });
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
            value: [dayjs().year(), dayjs().month() + 1],
        };
    },

    methods: {
        change(acitves){
            this.$alert(acitves, {title: 'event: change'});
        },

        input(value) {
            this.$alert(value, {title: 'event: input'});
        },
    },
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
