<template>
    <ScrollView v-model="scrollY" class="page-checkout">
        <LayoutHeader></LayoutHeader>
        <main>
            <LayoutUserInfo :isSameAddress.sync="isSameAddress"></LayoutUserInfo>
            <LayoutShippingMethod :shippingMethods.sync="shippingMethods"></LayoutShippingMethod>
            <LayoutPaymentMethods></LayoutPaymentMethods>
            <LayoutCheckoutReview></LayoutCheckoutReview>
        </main>
        <footer></footer>
    </ScrollView>
</template>
<script>
import LayoutHeader from './Checkout/Header'
import LayoutUserInfo from './Checkout/UserInfo'
import LayoutShippingMethod from './Checkout/ShippingMethod'
import LayoutPaymentMethods from './Checkout/PaymentMethods'
import LayoutCheckoutReview from './Checkout/CheckoutReview'

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

    mounted() {

    },

    methods: {

    },

    components: {
        LayoutHeader,
        LayoutUserInfo,
        LayoutShippingMethod,
        LayoutPaymentMethods,
        LayoutCheckoutReview

    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-checkout {
    background: $lightest;
    main {}
}
</style>
