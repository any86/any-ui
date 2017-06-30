<template>
    <section class="row-coupon-code">
        <span>COUPON CODE</span>
        <Icon class="icon" value="angle-right"></Icon>
    </section>
</template>
<script>
export default {
    name: 'CouponCode',
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-coupon-code {
    display: flex;
    padding: $gutter *4 $gutter *3;
    background: $background;

    >span{flex:1;font-size: $big;color:$darkest;}
    >.icon{font-size: $bigger;}
}
</style>
