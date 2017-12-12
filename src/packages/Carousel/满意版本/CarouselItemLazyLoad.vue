<template>
     <v-lazy-load :src="src" class="atom-carousel-item-lazy-load"/>
     <!-- <div>{{$parent.index}}</div> -->
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad';
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

    components: {VLazyLoad}
};
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
</style>
