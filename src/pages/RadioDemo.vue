<template>
    <v-scroll-view class="full-screen">
        <v-group>
            <template slot="header">
                正常情况
            </template>

            <v-cell>
                <v-radio v-model="select1" :value="1">选项1</v-radio>
            </v-cell>

            <v-cell>
                <v-radio v-model="select1" :value="2">选项2</v-radio>
            </v-cell>

        </v-group>

        <v-group>
            <template slot="header">
                禁用状态
            </template>
            <v-cell>
                <v-radio v-model="select2" :value="1" :disabled="true">选项1</v-radio>
            </v-cell>
            <v-cell>
                <v-radio v-model="select2" :value="2" :disabled="true">选项2</v-radio>
            </v-cell>
        </v-group>
    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VRadio from '@/packages/Radio/Radio';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';

export default {
    name: 'RadioDemo',

    data() {
        return {
            select1: 1,
            select2: 1,
        };
    },

    methods: {
    },

    components: {
        VCell,
        VRadio,
        VGroup,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
