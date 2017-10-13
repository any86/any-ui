<template>
    <virtual-scroll v-model="pos" :lock-x="true" :lock-y="false">
        <p v-for="n in 5" :key="n">{{n}}</p>
        <p v-for="n in 35" :key="n+5">{{n+5}}</p>
    </virtual-scroll>
</template>
<script>
import VInput from '@/packages/Input/Input';
import VirtualScroll from '@/packages/Scroller/Scroller'
export default {
    name: 'Test',

    data() {
        return {
            pos: { scrollLeft: 0, scrollTop: 0 },
        };
    },

    methods: {

    },

    watch: {
        pos(v){
            syslog(v.scrollTop, v.scrollLeft)
        }
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
