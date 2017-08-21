<template>
    <section>
        <img class="icon" src="../../../assets/selected.svg" />
        <h4 class="title">You've just added this product to the cart </h4>
        <h5> Raindrop Necklace XNL160 <a>x{{amount}}</a></h5>
        <footer class="flex gutter">
            <button class="button button-block button-default flex-item">Continue Shopping</button>
            <button class="button button-block button-danger flex-item">View Cart & Checkout</button>
        </footer>
        
    </section>
</template>
<script>
export default {
    name: 'SuccessDialogContent',

    props: {
        amount: {
            default: 1
        }
    },

    data() {
        return {

        };
    }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.icon {
    margin: auto;
    width: 2rem;
}
.title{text-align: center;}
h5{text-align: center;
    a{color:$danger;}
}
</style>
