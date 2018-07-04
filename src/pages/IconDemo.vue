<template>
    <a-scroll-view class="demo-page fill">
        <a-icon name="plus" class="border gutter-top-sm"/>
        <a-icon name="arrow-left" class="border gutter-top-sm"/>
        <a-icon name="arrow-right" class="border gutter-top-sm"/>
        <a-icon name="arrow-up" class="border gutter-top-sm"/>
        <a-icon name="arrow-down" class="border gutter-top-sm"/>
        <a-icon name="minus" class="border  gutter-top-sm"/>
        <a-icon name="menu" class="border gutter-top-sm"/>
        <a-icon name="close" class="border gutter-top-sm"/>
        <a-icon name="tick" class="border gutter-top-sm"/>
        <a-icon name="star" class="border gutter-top-sm"/>
        <a-icon name="star-o" class="border gutter-top-sm"/>
        <a-icon name="star-half" class="border gutter-top-sm"/>
        <a-icon name="warning" class="border gutter-top-sm"/>
    </a-scroll-view>
</template>
<script>
import AIcon from '@/packages/Icon';

export default {
    name: 'IconDemo'
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
