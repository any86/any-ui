<template>
    <v-scroll-view class="demo-page">
        <v-group>
            <template slot="header">
                我就是
                <span class="text-danger">header插槽</span>
            </template>
            <v-cell>
                <template slot="extra">锄禾日当午</template>
            </v-cell>
        <v-cell>
                <template slot="extra">馒头就红薯</template>
            </v-cell>
        </v-group>
        <v-group>
            <template slot="header">
                我带
                <span class="text-danger">margin-top, </span>值为scss文件中配置的
                <span class="text-danger">$gutter</span>
            </template>
            <v-cell>
                <template slot="extra">床前明月光</template>
            </v-cell>
            <v-cell>
                <template slot="extra">玻璃爱上霜</template>
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
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
    background: $lightest;
}
</style>
