<template>
    <a-scroll-view class="demo-page">
        <a-cell>
            <a-range v-model="value1"/>
            <a-tag type="primary" slot="extra">当前: {{value1}}</a-tag>
        </a-cell>

        <a-cell>
            <a-range v-model="value2" :min="10" :max="20"/>
            <a-tag type="primary" slot="extra">当前: {{value2}}</a-tag>
        </a-cell>

        <a-cell>
            <a-range v-model="value3" :min="0" :max="50" :step="2"/>
            <a-tag type="primary" slot="extra">当前: {{value3}}</a-tag>
        </a-cell>
    </a-scroll-view>
</template>
<script>
import { AScrollView, ATag, ACell, ARange } from '@/packages'

export default {
    name: 'RangeDemo',

    data() {
        return {
            value1: 50,
            value2: 10,
            value3: 0
        };
    },

    methods: {},

    computed: {},

    components: {
        AScrollView,
        ATag,
        ACell,
        ARange
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
