<template>
    <a-scroll-view class="demo-page">
        <a-group>
            <template slot="header">
                我就是
                <span class="text-danger">header插槽</span>
            </template>
            <a-cell>
                <template slot="extra">锄禾日当午</template>
            </a-cell>
        <a-cell>
                <template slot="extra">馒头就红薯</template>
            </a-cell>
        </a-group>
        <a-group>
            <template slot="header">
                我带
                <span class="text-danger">margin-top, </span>值为scss文件中配置的
                <span class="text-danger">$gutter</span>
            </template>
            <a-cell>
                <template slot="extra">床前明月光</template>
            </a-cell>
            <a-cell>
                <template slot="extra">玻璃爱上霜</template>
            </a-cell>
        </a-group>

    </a-scroll-view>
</template>
<script>
import { AScrollView, ACell, AGroup, ARadio, ASwitch, ACheckbox } from '@/packages'

export default {
    name: 'CellDemo',

    data() {
        return {
            radioValue: 1
        };
    },

    components: {
        ACell,
        AScrollView,
        AGroup,
        ASwitch,
        ARadio,
        ACheckbox
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
