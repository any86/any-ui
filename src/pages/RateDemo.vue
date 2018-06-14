<template>
    <v-scroll-view class="demo-page">
        <div class="fill border-bottom">
            <h4>默认为宽度/高度为24px</h4>
            <v-rate  v-model="value1" :count="5" class="gutter-top-sm"/>
        </div>

        <div class="fill">
            <h4>当前value: {{value2}} | 尺寸: 16px</h4>
            <v-rate v-model="value2" :size="16" :count="5" class="gutter-top-sm"/>
        </div>

        <div class="fill">
            <h4>当前value: {{value3}}</h4>
            <v-rate v-model="value3" :count="5" class="gutter-top-sm"/>
        </div>

        <div class="fill">
            <h4>readonly</h4>
            <v-rate :value="7" :count="10" :is-read-only="true" class="gutter-top-sm"/>
        </div>
    </v-scroll-view>
</template>
<script>
import VRate from '@/packages/Rate/Rate';
import VCell from '@/packages/Cell/Cell';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'RateDemo',

    data() {
        return {
            value1: 3.5,
            value2: 4.8,
            value3: 3.2,
        };
    },

    methods: {},

    computed: {},

    components: {
        VCell,
        VRate,
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
