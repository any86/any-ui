<template>
    <virtual-scroller v-model="pos">
        <v-cell :has-ripple="false" v-for="n in 30" :key="n">{{n}}</v-cell :has-ripple="false">
    </virtual-scroller>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VView from '@/packages/View/View';
import VirtualScroller from '@/packages/VirtualScroller/VirtualScroller';
export default {
    name: 'ScrollViewDemo',

    data() {
        return {
            pos: {
                scrollTop: 0,
                scrollLeft: 0
            }
        };
    },

    methods: {},

    components: {
        VCell,
        VView,
        VirtualScroller
    }
};
</script>
<style scoped lang="scss">

</style>
