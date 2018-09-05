<template>
    <main class="demo-page fill">
        <p class="text-center">当前值: {{activeValue}}</p>
        <a-text-field readonly label="年" v-model="activeLabel.year" @focus="showPicker('year')"></a-text-field>
        <a-text-field readonly label="月" v-model="activeLabel.month" @focus="showPicker('month')"></a-text-field>

        <a-button type="primary" outline  @click="showPickerAll" class="gutter-top">打开</a-button>
    </main>
</template>
<script>
import dayjs from 'dayjs';
export default {
    name: 'ApiPickerDemo',

    data() {
        return {
            isShow: false,
            year: [{ label: '2019年', value: 2019 }, { label: '2018年', value: 2018 }, { label: '2017年', value: 2017 }],
            month: [{ label: '1月', value: 1 }, { label: '2月', value: 2 }, { label: '3月', value: 3 }],
            activeLabel: { year: '2018年', month: '2月' },
            activeValue: { year: 2018, month: 2 },
        };
    },

    methods: {
        showPicker(key) {
            this.$picker([this[key]], {
                value: [this.activeValue[key]], // 必填
                onOk: acitves => {
                    let { value, label } = acitves[0];
                    this.activeValue[key] = value;
                    this.activeLabel[key] = label;
                },
            });
        },

        showPickerAll() {
            this.$picker([this.year, this.month], {
                value: [this.activeValue.year, this.activeValue.month], // 必填
                onOk: value => {
                    this.$alert(value);
                },
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
