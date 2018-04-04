<template>
    <a-scroll-view class="demo-page">
        <a-group>
            <template slot="header">
                通过
                <span class="text-danger">arrow属性</span>可以控制是否有箭头, 且可控制角度
            </template>

            <a-cell arrow-direction="up">arrow-direction=up</a-cell>
            <a-cell arrow-direction="right">arrow-direction=right</a-cell>
            <a-cell arrow-direction="down">arrow-direction=down</a-cell>
            <a-cell arrow-direction="left">arrow-direction=left</a-cell>
        </a-group>

        <a-group>
            <template slot="header">
                <span class="text-danger">extra插槽</span>让元素/组件右侧对齐
            </template>
            <a-cell>
                <template slot="extra">生活不止眼前的苟且</template>
            </a-cell>
            <a-cell>
                <template slot="extra">诗和远方</template>
            </a-cell>
        </a-group>
        <a-group>
            <template slot="header">
                适配<span class="text-danger">switch/radio/checkbox</span>等组件
            </template>

            <a-cell>
                <a-switch>是否登月</a-switch>
            </a-cell>
            <a-cell>
                <a-checkbox>是否开启舱门</a-checkbox>
            </a-cell>

            <a-cell>
                <a-radio v-model="radioValue" value="1">向左走</a-radio>
            </a-cell>

            <a-cell>
                <a-radio v-model="radioValue" value="2">向右走</a-radio>
            </a-cell>


        </a-group>

    </a-scroll-view>
</template>
<script>
import { ACell, AGroup, ACheckbox, ASwitch, AScrollView, ARadio } from '@/packages'

export default {
    name: 'CellDemo',

    data() {
        return {
            radioValue: 1
        };
    },

    components: {
        ACell,
        AGroup,
        ACheckbox,
        ASwitch,
        AScrollView,
        ARadio
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
    background: $lightest;
}
</style>
