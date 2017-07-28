<template>
    <section class="row-shipping-method">
        <header>SHIPPING METHOD</header>
        <div class="item">
            <VCheckbox :value="shippingMethods[0]" class="item">
                <p>Standard Shipping(Free Over $499) <span class="text-danger">($5.99)</span></p>
                <p class="text-warning">6 - 10 Bussiness days</p>
            </VCheckbox>
        </div>
        <div class="item">
            <VCheckbox :value="shippingMethods[1]" class="item">
                <p>FEDEX EXPRESS <span class="text-danger">($9.99)</span></p>
                <p class="text-warning">6 - 10 Bussiness days</p>
                <p>Can Not Deliver To A.P.O.Box</p>
            </VCheckbox>
        </div>

        <div class="item">
            <VCheckbox :value="shippingMethods[2]" class="item">
                <p>FEDEX EXPRESS <span class="text-danger">($9.99)</span></p>
                <p class="text-warning">6 - 10 Bussiness days</p>
                <p>Can Not Deliver To A.P.O.Box</p>
            </VCheckbox>
        </div>
        <div class="row-insurance">
            <VSwitch>Add Ship Insurance To Your Order $0.99</VSwitch>
        </div>
    </section>
</template>
<script>
import VCheckbox from '@/packages/Checkbox/Checkbox'
import VSwitch from '@/packages/Switch/Switch'

export default {
    name: 'ShippingMethod',

    props: {
        shippingMethods: {
            type: Array
        }
    },

    components: {
        VCheckbox, VSwitch
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-shipping-method {
    margin-top:3*$gutter;
    
    >header {background: $background;
        font-size: $big;
        color: $darkest;
        padding: 3*$gutter;
        border-bottom: 1px solid $lightest;
    }
    >.item {background: $background;
        display: flex;
        box-sizing: content-box;
        padding: 3*$gutter;
        border-bottom: 1px solid $lightest;
        >p{font-size: $big;color: $darkest;}
    }
    .row-insurance{padding:3*$gutter;margin-top:3*$gutter;background: $background;}
}
</style>
