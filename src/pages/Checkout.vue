<template>
    <ScrollView v-model="scrollY" class="page-checkout">
        <RowHeader></RowHeader>
        <main>
            <RowStep class="border-top"></RowStep>
            <RowAddress :isSameAddress.sync="isSameAddress" class="gutter-top "></RowAddress>
            <RowShippingMethod :shippingMethods.sync="shippingMethods"></RowShippingMethod>
            <RowPaymentMethods></RowPaymentMethods>
            <RowCheckoutReview></RowCheckoutReview>
        </main>
        <footer></footer>
    </ScrollView>
</template>
<script>
import RowHeader from '@/components/Header'
import RowStep from './Checkout/Step'
import RowAddress from './Checkout/Address'
import RowShippingMethod from './Checkout/ShippingMethod'
import RowPaymentMethods from './Checkout/PaymentMethods'
import RowCheckoutReview from './Checkout/CheckoutReview'

export default {
    name: 'Checkout',

    data() {
        return {
            scrollY: 0,
            isSameAddress: false,
            shippingMethods: [true, false],
            dataSource: {}
        };
    },

    // mounted(){
    //     this.$loading.close();
    // },

    methods: {

    },

    components: {
        RowHeader,
        RowStep,
        RowAddress,
        RowShippingMethod,
        RowPaymentMethods,
        RowCheckoutReview

    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-checkout {
    background: $lightest;
}
</style>
