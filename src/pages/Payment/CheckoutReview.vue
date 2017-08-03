<template>
    <section class="row-checkout-review">
        <header>CHECKOUT REVIEW</header>
        <ul>
            <li>
                <span class="title">Subtotal</span>
                <span>$20.00</span>
            </li>
            <li>
                <span class="title">Shipping Price</span>
                <span>$0.00</span>
            </li>
            <li>
                <span class="title">Coupon</span>
                <span>$10.00</span>
            </li>
        </ul>

        <a class="btn btn-place">
            $20 | PLACE HOLDER
        </a>
    </section>
</template>
<script>
export default {
    name: 'checkoutReview',

    props: {
        dataSource: {
            type: Array
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-checkout-review {
    background: $background;
    margin-top: $gutter * 3;
    >header {
        font-size: $big;
        color: $darkest;
        padding: 3*$gutter;
        border-bottom: 1px solid $lightest;
    }
    >ul {
        li {
            display: flex;
            padding: $gutter * 3;
            .title {
                flex: 1;
            }
        }
    }

    >.btn-place{height: 1rem;line-height: 1rem;text-align: center; width: 100%;background: $base;color:$sub;display: block;font-size: $big;}
}
</style>
