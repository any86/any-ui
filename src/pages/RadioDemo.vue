<template>
    <a-scroll-view class="full-screen">
        <a-group>
            <template slot="header">
                正常情况(<a class="text-danger">搭配cell组件</a> & <a class="text-danger">a-ripple指令</a>)
            </template>

            <a-cell v-ripple="true">
                <a-radio  v-model="select1" :value="1">选项1</a-radio>
            </a-cell>

            <a-cell v-ripple="true">
                <a-radio v-model="select1" :value="2">选项2</a-radio>
            </a-cell>
        </a-group>

        <a-group>
            <template slot="header">
                反向(is-reverse: true, 用来应付阿拉伯等右对齐语种)
            </template>
            <a-cell v-ripple="true">
                <a-radio v-model="select2" :is-reverse="true" :value="1">选项1</a-radio>
            </a-cell>
            <a-cell v-ripple="true">
                <a-radio v-model="select2" :is-reverse="true" :value="2">选项2</a-radio>
            </a-cell>
        </a-group>


        <a-group>
            <template slot="header">
                多主题, 当前<a class="text-danger">android</a>
            </template>

            <a-cell v-ripple="true">
                <a-radio theme="android" v-model="select3" :value="1">选项1</a-radio>
            </a-cell>

            <a-cell v-ripple="true">
                <a-radio theme="android" v-model="select3" :value="2">选项2</a-radio>
            </a-cell>
        </a-group>
    </a-scroll-view>
</template>
<script>
import { AScrollView, ARadio, ACell, AGroup } from '@/packages'

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
        AScrollView,
        ARadio,
        ACell,
        AGroup
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
