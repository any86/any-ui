<template>
    <main class="demo-page fill">
        <p class="text-center">当前值: {{value}}</p>
        <a-button type="primary" outline  @click="showPicker" class="gutter-top">打开</a-button>
    </main>
</template>
<script>
import dayjs from 'dayjs';
export default {
    name: 'ApiPickerDemo',

    data() {
        let years = [];
        for(let i = 0; i < 5; i++) {
            let year = dayjs().add(i, 'y').year();
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
            years,
            months,
            value: [dayjs().year(), dayjs().month()+1]
        };
    },

    methods: {
        showPicker() {
            this.$picker([this.years, this.months], {
                value: this.value, // 必填
                onOk:(value)=>{
                    this.$alert(value);
                }
            });
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
