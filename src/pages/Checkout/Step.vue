<template>
    <section class="row-step">
        <span>1.Add Address</span>
        <span>2.Select Shipping Method</span>
        <span>3.Pay</span>
    </section>
</template>
<script>
export default {
    name: 'Step',
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
$height: 1rem;
.row-step {
    background: $background;
    display: flex;
    height: $height;
    >span {
        flex: 1 0 auto;
        padding: $gutter;
        position: relative;
        &:not(:last-child) {
            &:before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                border-left: $gutter solid $lightest;
                border-top: $height/2 solid transparent;
                border-bottom: $height/2 solid transparent;
                height: 0;
                width: 0;
            }
            &:after {
                content: '';
                position: absolute;
                top: 0;
                right: 1px;
                border-left: $gutter solid $background;
                border-top: $height/2 solid transparent;
                border-bottom: $height/2 solid transparent;
                height: 0;
                width: 0;
            }
        }
    }
}
</style>
