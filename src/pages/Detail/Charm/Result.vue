<template>
    <img :src="dataSource" />
</template>
<script>
import FileAPI from 'fileapi'
export default {
    name: 'Result',

    props: {
        dataSource: {}
    },

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
img {
    display: block;
    width: 100%;
}
</style>
