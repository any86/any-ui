<template>
    <main>
        <a-cell :has-ripple="false">
            默认: 最小值0, 最大值10
            <a-counter slot="extra" v-model="value1"/>
        </a-cell>

        <a-cell :has-ripple="false">
            最大值5
            <a-counter :max="5" slot="extra" v-model="value2"/>
        </a-cell>

        <a-cell :has-ripple="false">
            每步2
            <a-counter :step="2" slot="extra" v-model="value3"/>
        </a-cell>
    </main>
</template>
<script>
import { ACell, ACounter } from '@/packages'

export default {
    name: 'CounterDemo',

    data() {
        return {
            value1: 10,
            value2: 1,
            value3: 1,
        };
    },

    components: {
        ACell,
        ACounter
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
.item {
    padding: $gutter;
    border: 1px solid $lightest;
}
</style>
