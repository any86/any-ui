<template>
    <v-picker :data-source="[data1, data2]" v-model="value" />
</template>
<script>
import VPicker from '@/packages/Picker/Picker';

export default {
    name: 'PickerDemo',

    data() {
        return {
            data1: [{ value: 1, label: '休息' }, { value: 2, label: '出差' }],
            data2: [{ value: 1, label: '公交' }, { value: 2, label: '火车' }],
            value: [1, 2]
        };
    },

    components: {
        VPicker
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
</style>
