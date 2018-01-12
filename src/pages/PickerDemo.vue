<template>
    <v-picker :data-source="[data1, data2]" v-model="value" />
</template>
<script>
import VPicker from '@/packages/Picker/Picker';

export default {
    name: 'PickerDemo',

    data() {
        let data2 = [];
        let i = 0;
        while(i <= 12) {
            i++;
            data2.push({value: i, label: i + '月份'});
        }
        return {
            data1: [{ value: 1, label: '休息' }, { value: 2, label: '出差' }],
            data2: data2,
            value: [1, 2]
        };
    },

    components: {
        VPicker
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
</style>
