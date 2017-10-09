<template>
    <virtual-scroll v-model="pos">
        <p>{{pos.scrollTop}}</p>
        <p v-for="n in 5" :key="n">{{n}}</p>
        <v-input v-model="pos.scrollTop"></v-input>
        <p v-for="n in 15" :key="n+5">{{n+5}}</p>
    </virtual-scroll>
</template>
<script>
import VInput from '@/packages/Input/Input';
import VirtualScroll from '@/packages/VirtualScroll/VirtualScroll'
export default {
    name: 'Test',

    data() {
        return {
            pos: { scrollLeft: 0, scrollTop: 60 },
        };
    },

    methods: {

    },

    components: { VirtualScroll, VInput }
}
</script>
<style scoped lang="scss">
p {
    padding: 15px;
    &:nth-of-type(2n+1) {
        background: #eee;
    }
}
</style>
