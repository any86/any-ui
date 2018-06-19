<template>
    <v-scroll-view class="full-screen">
        <v-group>
            <template slot="header">
                正常情况(<a class="text-danger">搭配cell组件</a> & <a class="text-danger">v-ripple指令</a>)
            </template>

            <v-cell v-ripple="true">
                <v-radio  v-model="select1" :value="1">选项1</v-radio>
            </v-cell>

            <v-cell v-ripple="true">
                <v-radio v-model="select1" :value="2">选项2</v-radio>
            </v-cell>
        </v-group>

        <v-group>
            <template slot="header">
                反向(is-reverse: true, 用来应付阿拉伯等右对齐语种)
            </template>
            <v-cell v-ripple="true">
                <v-radio v-model="select2" :is-reverse="true" :value="1">选项1</v-radio>
            </v-cell>
            <v-cell v-ripple="true">
                <v-radio v-model="select2" :is-reverse="true" :value="2">选项2</v-radio>
            </v-cell>
        </v-group>


        <v-group>
            <template slot="header">
                多主题, 当前<a class="text-danger">android</a>
            </template>

            <v-cell v-ripple="true">
                <v-radio theme="android" v-model="select3" :value="1">选项1</v-radio>
            </v-cell>

            <v-cell v-ripple="true">
                <v-radio theme="android" v-model="select3" :value="2">选项2</v-radio>
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
            select3: 1,
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
