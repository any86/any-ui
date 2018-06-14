<template>
    <a-scroll-view class="demo-page fill">
        <a-icon value="plus" class="border"/>
        <a-icon value="arrow" class="border"/>
        <a-icon value="minus" class="border"/>
        <a-icon value="menu" class="border"/>
        <a-icon value="close" class="border"/>
        <a-icon value="tick" class="border"/>
        <a-icon value="star" class="border"/>
        <a-icon value="star-o" class="border"/>
        <a-icon value="star-half" class="border"/>
        <a-icon value="warning" class="border"/>
    </a-scroll-view>
</template>
<script>
import AIcon from '@/packages/Icon';

export default {
    name: 'IconDemo',

    components: {AIcon}
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
