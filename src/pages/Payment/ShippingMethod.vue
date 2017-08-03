<template>
    <section class="row-shipping-method">
        <header>SHIPPING METHOD</header>
        <div class="item">
            <VCheckbox :value="shippingMethods[0]" class="item">
                <p>Free Standard Shipping $0</p>
                <small>6 - 10 Bussiness days</small>
            </VCheckbox>
        </div>
        <div class="item">
            <VCheckbox :value="shippingMethods[1]" class="item">
                <p>Standard Shipping $10</p>
                <small>6 - 10 Bussiness days</small>
            </VCheckbox>
        </div>
    </section>
</template>
<script>
import VCheckbox from '@/packages/Checkbox/Checkbox'
export default {
    name: 'ShippingMethod',

    props: {
        shippingMethods: {
            type: Array
        }
    },

    components: {
        VCheckbox
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-shipping-method {
    background: $background;
    >header {
        font-size: $big;
        color: $dark;
        background: $lightest;
        padding: 3*$gutter;
    }
    >.item {
        display: flex;
        box-sizing: content-box;
        padding: 3*$gutter;
        border-bottom: 1px solid $lightest;
        p{font-size: $big;color: $darkest;}
        small{color: $darker;}
    }
}
</style>
