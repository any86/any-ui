<template>
    <main class="page-index">
        <v-cell border>1</v-cell>
        <v-cell border>2</v-cell>
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell'
export default {
    name: 'Index',

    data() {
        return {
            
        };
    },

    mounted() {
       
    },

    watch: {

    },

    components: {
        VCell
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-index {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // position: relative;
    // height: 100%;
    // width: 100%;
    display: flex;
    flex-direction: column;

    .scroll-view {
        flex: 1;
        padding: 0 .3rem .3rem .3rem;
    }
}
</style>
