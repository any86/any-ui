<template>
    <section class="row-shipping-method">
        <header>SHIPPING METHOD</header>
        <div class="item">
            <VCell border="true">
                <VRadio v-model="shippingMethodActive" :selfValue="0" class="item">
                    <p>Free Standard Shipping $0</p>
                    <small>6 - 10 Bussiness days</small>
                </VRadio>
            </VCell>
        </div>
        <div class="item">
            <VCell>
                <VRadio v-model="shippingMethodActive" :selfValue="1" class="item">
                    <p>Standard Shipping $10</p>
                    <small>6 - 10 Bussiness days</small>
                </VRadio>
            </VCell>
        </div>
    </section>
</template>
<script>
import VCell from '@/packages/Cell/Cell'
import VRadio from '@/packages/Radio/Radio'

export default {
    name: 'ShippingMethod',

    props: {
        shippingMethods: {
            type: Array
        }
    },

    data() {
        return { shippingMethodActive: 0 };
    },

    components: {
        VRadio, VCell
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-shipping-method {
    background: $background;
    >header {
        font-size: $normal;
        color: $dark;
        background: $lightest;
        padding: $gutter;
    }
    >.item {
        p {
            font-size: $normal;
            color: $darkest;
        }
        small {
            color: $darker;
        }
    }
}
</style>
