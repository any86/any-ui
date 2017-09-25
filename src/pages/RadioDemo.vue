<template>
    <main>
        <v-group>
            <template slot="header">
                正常情况
            </template>
            <v-cell :arrow="0">
                带箭头
            </v-cell>

            <v-cell>
                <v-radio v-model="select1" :value="1">选项1</v-radio>
            </v-cell>

            <v-cell>
                <v-radio v-model="select1" :value="2">选项2</v-radio>
            </v-cell>

            <v-cell>
                <v-button v-model="is1">123</v-button>
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
    </main>
</template>
<script>
import VRadio from '@/packages/Radio/Radio';
import VButton from '@/packages/Button/Button';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
export default {
    name: 'RadioDemo',

    data() {
        return {
            is1: false,
            select1: 1,
            select2: 1,

        };
    },

    methods: {
        click(e) {
        }
    },

    components: {
        VCell, VRadio, VGroup, VButton
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.m-icon{background: url(../assets/close.svg) center center;background-size: 100%; width: 32px;height: 32px;display: inline-block;}
</style>
