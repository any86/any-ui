<template>
    <section class="row-result">
        <router-link tag="a" to="/index">&lt; continue shoping </router-link>
        <VSpinner v-if="0 >= $store.state.cart.totalInfo.length"></VSpinner>
        <div v-else class="info">
            <ul class="title-group">
                <li v-for="item in $store.state.cart.totalInfo" :key="item.title">{{item.title}}</li>
            </ul>
            <ul class="content-group">
                <li v-for="item in $store.state.cart.totalInfo" :key="item.value">
                    <span class="danger">{{item.value}}</span>
                </li>
            </ul>
        </div>
        <p class="tip">You Order Qualifiles For Free Shipping</p>
        <div class="button button-checkout-width-paypal">Checkout With ...</div>
        <p>OR</p>
        <router-link to="/checkout" tag="div" class="button button-proceed-to-checkout">Proceed To Checkout</router-link>
        <p>OR</p>
        <div class="button button-paypal-credit">Paypal Credit</div>
        <p>Get 6 Months To Pay On $99+ See Terms</p>
    </section>
</template>
<script>
import VSpinner from '@/packages/Spinner/Spinner'
export default {
    name: 'Result',

    components: {
        VSpinner
    }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-result {
    margin-top: $gutter;
    padding: $gutter;
    background: $background;
    a {
        font-size: $big;
        display: block;
    }
    .info {
        display: flex;
        .title-group {
            flex: 1;
            margin-right: $gutter/3;
            display: block;
            width: 2rem;
            li {
                font-size: $big;
                text-align: right;
            }
        }
        .content-group {
            display: block;
            width: 2rem;
            li {
                font-size: $big;
                text-align: right;
            }
        }

        .danger {
            color: $danger;
            font-size: $big;
        }
    }

    >.tip {
        text-align: right;
        margin: $gutter 0 2*$gutter 0;
        color: $success;
    }

    >.button {
        width: 100%;
        line-height: 1rem;
        text-align: center;
        &+p {
            height: .6rem;
            line-height: .6rem;
            text-align: center;
        }
        &.button-checkout-width-paypal {
            border: 1px solid $light;
        }
        &.button-proceed-to-checkout {
            background: $warning;
            color: $sub;
        }
        &.button-paypal-credit {
            border: 1px solid $light;
        }
    }
}
</style>
