<template>
    <div v-on="$listeners" class="swiper-slide">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'SwiperItem',
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';

</style>
