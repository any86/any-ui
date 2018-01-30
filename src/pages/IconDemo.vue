<template>
    <a-scroll-view class="demo-page">
        <a-add class="border"/>
        <a-arrow class="border"/>
        <a-minus class="border"/>
    </a-scroll-view>
</template>
<script>
import AAdd from '@/packages/Icon/Add';
import AArrow from '@/packages/Icon/Arrow';
import AMinus from '@/packages/Icon/Minus';


export default {
    name: 'IconDemo',

    components: { AAdd,AArrow, AMinus }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
