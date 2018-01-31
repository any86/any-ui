<template>
    <a-scroll-view class="demo-page fill">
        <a-icon value="add" class="border"/>
        <a-icon value="arrow" class="border"/>
        <a-icon value="minus" class="border"/>
        <a-icon value="menu" class="border"/>
        <a-icon value="close" class="border"/>
        <a-icon value="tick" class="border"/>
        <a-icon value="tick" class="border"/>
        <a-icon value="star" class="border"/>
        <a-icon value="star-o" class="border"/>
    </a-scroll-view>
</template>
<script>
import AAdd from '@/packages/Icon/Add';
import AArrow from '@/packages/Icon/Arrow';
import AMinus from '@/packages/Icon/Minus';
import AMenu from '@/packages/Icon/Menu';
import AClose from '@/packages/Icon/Close';
import ATick from '@/packages/Icon/Tick';
import AStar from '@/packages/Icon/Star';
import AStarO from '@/packages/Icon/StarO';
import AIcon from '@/packages/Icon';

export default {
    name: 'IconDemo',

    components: {AIcon, AAdd, AArrow, AMinus, AMenu, AClose, ATick, AStar, AStarO }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
