<template>
    <section class="row-shipping-method">
        <header>
            <h4><a class="text-danger">2</a> SELECT SHIPPING METHOD</h4>
            <p>xsad asdsaret 234j== 3412</p>
        </header>
        <VRadio v-model="shippingMethods" :selfValue="0" class="item">
            <p>Standard Shipping(Free Over $499)
                <span class="text-danger">($5.99)</span>
            </p>
            <p class="text-warning">6 - 10 Bussiness days</p>
        </VRadio>
    
        <VRadio v-model="shippingMethods" :selfValue="1" class="item">
            <p>FEDEX EXPRESS
                <span class="text-danger">($9.99)</span>
            </p>
            <p class="text-warning">6 - 10 Bussiness days</p>
            <p>Can Not Deliver To A.P.O.Box</p>
        </VRadio>
    
        <VRadio v-model="shippingMethods" :selfValue="2" class="item">
            <p>FEDEX EXPRESS
                <span class="text-danger">($9.99)</span>
            </p>
            <p class="text-warning">6 - 10 Bussiness days</p>
            <p>Can Not Deliver To A.P.O.Box</p>
        </VRadio>
        <div class="row-insurance">
            <VSwitch>Add Ship Insurance To Your Order $0.99</VSwitch>
        </div>
    </section>
</template>
<script>
import VRadio from '@/packages/Radio/Radio'
import VSwitch from '@/packages/Switch/Switch'

export default {
    name: 'ShippingMethod',

    props: {

    },

    data() {
        return { shippingMethods: 0 };
    },

    components: {
        VRadio, VSwitch
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-shipping-method {
    margin-top: $gutter;

    >header {
        background: $background;
        font-size: $big;
        color: $darkest;
        padding: $gutter/2 $gutter;
        border-bottom: 1px solid $lightest;
        p{color:$light;font-size: $normal;}
    }
    >.item {
        background: $background;
        border-bottom: 1px solid $lightest;
        box-sizing: content-box;
        padding: $gutter;
        >p {
            font-size: $big;
            color: $darkest;
        }
    }
    .row-insurance {
        padding: $gutter;
        margin-top: $gutter;
        background: $background;
    }
}
</style>
