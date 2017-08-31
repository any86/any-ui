<template>
    <section class="row-checkout-review">
        <header>CHECKOUT REVIEW</header>

        <ul class="goods-list">
            <li>
                <span class="image">
                    <img src="https://www.soufeel.com/media/catalog/category/YB146.png" alt="">
                </span>
                <span class="info">
                    <div class="flex">
                        <a class="title flex-item"> xxx xxx xxxxxxx xxx </a>
                        <span class="price">$10</span>
                    </div>

                    <p class="count">x1</p>
                </span>
            </li>
        </ul>

        <div class="review">
            <div class="titles">
                <p>Subtotal</p>
                <p>Shipping Fees</p>
                <p>Shipping Insurance</p>
                <p>Grand Total</p>
            </div>

            <div class="contents">
                <p>$20.00</p>
                <p>$20.00</p>
                <p>$20.00</p>
                <p>$20.00</p>
            </div>
        </div>

        <a class="button button-block button-warning gutter-top">PLACE ORDER</a>
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

    >header {
        color: $darkest;
        padding: $gutter;
        border-bottom: 1px solid $lightest;
    }


    .goods-list {
        li {
            padding: $gutter;
            display: flex;
            .image {
                width: 2.4rem;
                height: 2.4rem;
                border: 1px solid $lightest;
                display: block;
                img {
                    display: block;
                    width: 100%;
                }
            }

            .info {
                flex: 1;
                align-self: center;
                padding: $gutter;
                .title {
                    color: $darkest;
                    font-size: $big;
                    padding-right: $gutter;
                    text-overflow: ellipsis;
                }

                .price {
                    color: $darkest;
                    font-size: $big;
                }

                .count {
                    color: $light;
                    font-size: $big;
                }
            }
        }
    }

    .review {
        display: flex;
        .titles {
            flex: 1;
            padding: $gutter;
                vertical-align:bottom;
            
            
            p {
                height:.6rem;
                text-align: right;
            }
        }
        .contents {
            padding: $gutter;
                vertical-align:bottom;
            
            p {
                height:.6rem;
                text-align: right;
                &:last-child{
                    font-size: $bigger;
                    color:$danger;
                    line-height:.3rem;
                }
            }
        }
    }
}
</style>
