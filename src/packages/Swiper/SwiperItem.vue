<template>
    <div v-if="undefined == to" v-on="$listeners" class="swiper-slide">
        <slot></slot>
    </div>
    <router-link v-else :to="to" v-on="$listeners" class="swiper-slide">
        <slot></slot>
    </router-link>
</template>
<script>
export default {
    name: 'SwiperItem',

    props: ['to'],

    data() {
        return { ready: false };
    },

    mounted() {
        this.$nextTick(() => {
            this.ready = true;
        });
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.swiper-slide {
    position: relative;
}
</style>
