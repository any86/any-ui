<template>
    <v-cell :has-ripple="true">
        <v-count v-model="value" />
    </v-cell>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VCount from '@/packages/Count/Count';

export default {
    name: 'CountDemo',

    data() {
        return {
            value: 9
        };
    },

    components: {
        VCount,
        VCell
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
</style>
