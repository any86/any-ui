<template>
    <a-scroll-view>
        <a-button 
            v-for="n in 12" 
            :key="n"
            :type="value[1] == n ? 'primary' : 'light'" 
            size="sm" 
            @click="setMonth(n)" 
            class="gutter-top-sm gutter-left-sm">{{n}}月</a-button>
        <a-picker :data-source="[data1, data2]" v-model="value" class="gutter-top"/>
    </a-scroll-view>
    
</template>
<script>
import { APicker, AButton, AScrollView } from '@/packages'

export default {
    name: 'PickerDemo',

    data() {
        let data2 = [];
        let i = 0;
        while (i < 12) {
            i++;
            data2.push({ value: i, label: i + '月份' });
        }
        return {
            data1: [{ value: 1, label: '休息' }, { value: 2, label: '出差' }],
            data2: data2,
            value: [1, 2] // 对应dataSouce中的value字段
        };
    },

    methods: {
        setMonth(index) {
            this.value.splice(1, 1, index);
        }
    },

    components: {
        AScrollView,
        AButton,
        APicker
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
</style>
