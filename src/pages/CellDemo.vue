<template>
    <v-scroll-view class="demo-page">
        <v-group>
            <template slot="header">
                通过
                <span class="text-danger">arrow属性</span>可以控制是否有箭头, 且可控制角度
            </template>

            <v-cell :arrow="0">arrow = 0</v-cell>
            <v-cell :arrow="90">arrow = 90</v-cell>
            <v-cell :arrow="180">arrow = 180</v-cell>
            <v-cell :arrow="270">arrow = 270</v-cell>
        </v-group>

        <v-group>
            <template slot="header">
                <span class="text-danger">extra插槽</span>让元素/组件右侧对齐
            </template>
            <v-cell>
                <template slot="extra">生活不止眼前的苟且</template>
            </v-cell>
            <v-cell>
                <template slot="extra">诗和远方</template>
            </v-cell>
        </v-group>
        <v-group>
            <template slot="header">
                适配<span class="text-danger">switch/radio/checkbox</span>等组件
            </template>

            <v-cell>
                <v-switch>是否登月</v-switch>
            </v-cell>
            <v-cell>
                <v-checkbox>是否开启舱门</v-checkbox>
            </v-cell>

            <v-cell>
                <v-radio v-model="radioValue" value="1">向左走</v-radio>
            </v-cell>

            <v-cell>
                <v-radio v-model="radioValue" value="2">向右走</v-radio>
            </v-cell>


        </v-group>

    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
import VRadio from '@/packages/Radio/Radio';
import VSwitch from '@/packages/Switch/Switch';
import VCheckbox from '@/packages/Checkbox/Checkbox';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'CellDemo',

    data() {
        return {
            radioValue: 1
        };
    },

    components: {
        VCell,
        VScrollView,
        VGroup,
        VSwitch,
        VRadio,
        VCheckbox
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.demo-page{height: calc(100% - 55px);background: $lightest;}
</style>
