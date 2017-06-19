<template>
    <a class="component-swiper-out-button">
        <slot></slot>
    </a>
</template>
<script>
export default {
    name: 'SwiperOutButton'
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-swiper-out-button {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: $big;
}
</style>
