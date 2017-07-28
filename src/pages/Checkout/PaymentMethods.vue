<template>
    <section class="row-payment-methods">
        <header>PAYMENT METHODS</header>
        <ul>
            <li></li>
        </ul>
    </section>
</template>
<script>
export default {
    name: 'paymentMethods',

    props: {
        dataSource: {
            type: Array
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-select-card {
    background: $lightest;
    >header {
        font-size: $big;
        color: $dark;
        padding: 3*$gutter;
        padding-bottom: 0;
    }

    >ul {
        li {
            border-bottom: 1px solid $lightest;
            &.active {}
        }
    }
}
</style>
