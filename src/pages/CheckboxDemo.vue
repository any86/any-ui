<template>
    <v-scroll-view class="full-screen">
        <v-group>
            <template slot="header">
                正常情况
            </template>

            <v-cell>
                <v-checkbox v-model="select1" :true-value="1" :false-value="2">选项1</v-checkbox>
            </v-cell>

            <v-cell>
                <v-checkbox v-model="select2" :true-value="1" :false-value="2">选项2</v-checkbox>
            </v-cell>

        </v-group>

        <v-group>
            <template slot="header">
                禁用状态
            </template>
            <v-cell>
                <v-checkbox v-model="select3" :true-value="1" :false-value="2" :disabled="true">选项1</v-checkbox>
            </v-cell>
            <v-cell>
                <v-checkbox v-model="select4" :true-value="1" :false-value="2" :disabled="true">选项2</v-checkbox>
            </v-cell>
        </v-group>
    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VCheckbox from '@/packages/Checkbox/Checkbox';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';

export default {
    name: 'CheckboxDemo',

    data() {
        return {
            select1: 1,
            select2: 2,
            select3: 1,
            select4: 2,
        };
    },

    methods: {
        click(e) {
        }
    },

    components: {
        VCell, VCheckbox, VGroup, VScrollView
    }
}
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.m-icon {
    background: url(../assets/close.svg) center center;
    background-size: 100%;
    width: 32px;
    height: 32px;
    display: inline-block;
}
</style>
