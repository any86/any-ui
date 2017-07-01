<template>
    <ScrollView  v-model="scrollY" class="page-payment">
        <LayoutHeader></LayoutHeader>
        <LayoutCard></LayoutCard>
        <LayoutShippingMethod :shippingMethods.sync="shippingMethods"></LayoutShippingMethod>
        <LayoutCheckoutReview></LayoutCheckoutReview>
    </ScrollView>
</template>
<script>
import * as types from "@/store/mutation-types";

// 模块
import LayoutHeader from './Payment/Header'
import LayoutCard from './Payment/Card'
import LayoutShippingMethod from './Payment/ShippingMethod'
import LayoutCheckoutReview from './Payment/CheckoutReview'




export default {
    name: 'Payment',

    data() {
        return {
            status: -1,
            shippingMethods: [true, false],
            scrollY: 0
        }
    },

    mounted() {

    },

    methods: {

    },

    components: {
        LayoutHeader,LayoutCard,LayoutShippingMethod, LayoutCheckoutReview
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-payment {
    background: #efefef;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
