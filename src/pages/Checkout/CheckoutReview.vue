<template>
    <section class="row-checkout-review">
        <header>CHECKOUT REVIEW</header>
        <table>
            <tr>
                <td></td>
                <td>PRICE</td>
                <td>QTY</td>
                <td>SUBTOTAL</td>
            </tr>
            <tr>
                <td>Litter Fish Stopper</td>
                <td>$25.00</td>
                <td>1</td>
                <td>$25.00</td>
            </tr>
            <tr>
                <td>Free Packing Bag</td>
                <td>$0.00</td>
                <td>1</td>
                <td>$0.00</td>
            </tr>
            <tr>
                <td>Subtotal</td>
                <td></td>
                <td></td>
                <td>$25.00</td>
            </tr>
            <tr>
                <td>Shiping Instrance</td>
                <td></td>
                <td></td>
                <td>$0.90</td>
            </tr>
            <tr>
                <td>Grand Total</td>
                <td></td>
                <td></td>
                <td class="grand-total-price">$25.00</td>
            </tr>
        </table>
        <a class="btn btn-place">PLACE ORDER</a>
        <p class="text">By placing order, you agree the Terms And Conditions</p>
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
    margin-top: $gutter;
    padding-bottom: $gutter;
    
    >header {
        color: $darkest;
        padding: $gutter;
        border-bottom: 1px solid $lightest;
    }

    table {
        width: 100%;
        padding:$gutter;
        tr{
            td{padding:$gutter;}
            td:nth-child(3){text-align: center;}
            td:last-child{text-align: right;color: $danger;}
            td.grand-total-price{font-size: $biggest;}
        }
    }

    >.btn-place {
        margin: $gutter;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: $warning;
        color: $sub;
        display: block;
        font-size: $big;
    }
    .text{font-size: $normal;margin: $gutter;padding:$gutter;}


}
</style>
