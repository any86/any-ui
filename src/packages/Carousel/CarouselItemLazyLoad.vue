<template>
    <img/>
</template>
<script>
export default {
    name: 'CarouselItemLazyLoad',

    props: {
        src: {
            type: String
        }
    },

    data() {
        return {
            isRefresh: false
        };
    },

    mounted(){

    },
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
</style>
