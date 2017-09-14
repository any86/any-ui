<template>
    <ScrollView v-model="scrollY" class="page-payment">
        <RowHeader></RowHeader>
        <RowCard></RowCard>
        <RowShippingMethod :shippingMethods.sync="shippingMethods"></RowShippingMethod>
        <RowCheckoutReview></RowCheckoutReview>
    </ScrollView>
</template>
<script>
import * as types from "@/store/mutation-types";
// 模块
import RowHeader from '@/components/Header'
import RowCard from './Payment/Card'
import RowShippingMethod from './Payment/ShippingMethod'
import RowCheckoutReview from './Payment/CheckoutReview'
export default {
    name: 'Payment',

    data() {
        return {
            status: -1,
            shippingMethods: [true, false],
            scrollY: 0
        }
    },

    // mounted(){
    //     this.$loading.close();
    // },

    methods: {

    },

    components: {
        RowHeader, RowCard, RowShippingMethod, RowCheckoutReview
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
