<template>
    <NameNecklaceType>
    </NameNecklaceType>
</template>
<script>
import NameNecklaceType from './Detail/NameNecklaceType'
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
        NameNecklaceType,
        CharmType
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
