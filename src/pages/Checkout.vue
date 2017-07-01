<template>
    <ScrollView v-model="scrollY" class="page-checkout">
        <LayoutHeader></LayoutHeader>
        <main>
            <LayoutUserInfo :isSameAddress.sync="isSameAddress"></LayoutUserInfo>
            <LayoutShippingMethod :shippingMethods.sync="shippingMethods"></LayoutShippingMethod>
            <LayoutSelectCard></LayoutSelectCard>
            <LayoutCouponCode></LayoutCouponCode>
            <LayoutCheckoutReview></LayoutCheckoutReview>
        </main>
        <footer></footer>
    </ScrollView>
</template>
<script>
import LayoutHeader from './Checkout/Header'
import LayoutUserInfo from './Checkout/UserInfo'
import LayoutShippingMethod from './Checkout/ShippingMethod'
import LayoutSelectCard from './Checkout/SelectCard'
import LayoutCouponCode from './Checkout/CouponCode'
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
        LayoutSelectCard,
        LayoutCouponCode,
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
