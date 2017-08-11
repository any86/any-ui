<template>
    <RingType></RingType>
</template>
<script>
import NameNecklaceType from './Detail/NameNecklaceType'
import RingType from './Detail/RingType'
import CharmType from './Detail/CharmType'
export default {
    name: 'Detail',

    data() {
        return {
            dataSource: {}
        };
    },

    mounted() {

    },

    methods: {

    },

    components: {
        RingType,
        NameNecklaceType,
        CharmType,
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
