<template>
    <v-scroll-view class="demo-page">
        <v-cell>
            <v-range v-model="value1"/>
            <v-tag type="primary" slot="extra">当前: {{value1}}</v-tag>
        </v-cell>

        <v-cell>
            <v-range v-model="value2" :min="10" :max="20"/>
            <v-tag type="primary" slot="extra">当前: {{value2}}</v-tag>
        </v-cell>

        <v-cell>
            <v-range v-model="value3" :min="0" :max="50" :step="2"/>
            <v-tag type="primary" slot="extra">当前: {{value3}}</v-tag>
        </v-cell>
    </v-scroll-view>
</template>
<script>
import VRange from '@/packages/Range/Range';
import VCell from '@/packages/Cell/Cell';
import VTag from '@/packages/Tag/Tag';
import VScrollView from '@/packages/ScrollView/ScrollView';
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
        VRange,
        VCell,
        VTag,
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
