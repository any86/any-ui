<template>
    <a-scroll-view class="demo-page fill">
        <a-icon name="plus" class="border"/>
        <a-icon name="arrow" class="border"/>
        <a-icon name="minus" class="border"/>
        <a-icon name="menu" class="border"/>
        <a-icon name="close" class="border"/>
        <a-icon name="tick" class="border"/>
        <a-icon name="star" class="border"/>
        <a-icon name="star-o" class="border"/>
        <a-icon name="star-half" class="border"/>
        <a-icon name="warning" class="border"/>
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
