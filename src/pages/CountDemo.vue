<template>
    <main>
        <v-cell :has-ripple="false">
            默认: 最小值0, 最大值10
            <v-count slot="extra" v-model="value1"/>
        </v-cell>

        <v-cell :has-ripple="false">
            最大值5
            <v-count :max="5" slot="extra" v-model="value2"/>
        </v-cell>

        <v-cell :has-ripple="false">
            每步2
            <v-count :step="2" slot="extra" v-model="value3"/>
        </v-cell>
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VCount from '@/packages/Count/Count';
import VSwitch from '@/packages/Switch/Switch';

export default {
    name: 'CountDemo',

    data() {
        return {
            value1: 10,
            value2: 1,
            value3: 1,
            
        };
    },

    mounted() {},

    components: {
        VCount,VSwitch,
        VCell
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
.item{padding:$gutter;
border:1px solid $lightest;
}
</style>
