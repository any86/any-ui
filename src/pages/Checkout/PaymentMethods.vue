<template>
    <section class="row-payment-methods">
        <header>PAYMENT METHODS</header>
        <ul>
            <li>
                <VCheckbox v-model="paymentType">PayPal</VCheckbox>
            </li>
            <li>
                <VCheckbox v-model="paymentType">CREDIT CARD</VCheckbox>
                <div v-show="paymentType" class="creadit-card-detail-panel">
                    <VInput v-model="card" class="input" :placeholder="'card number'"></VInput>
                    <VInput v-model="expireDate" class="input" :placeholder="'expire date'"></VInput>
                    <VInput v-model="secureCode" class="input" :placeholder="'secure code'"></VInput>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
import VCheckbox from '@/packages/Checkbox/Checkbox'
import VInput from '@/packages/Input/Input'

export default {
    name: 'paymentMethods',

    props: {
        dataSource: {
            type: Array
        }
    },

    data() {
        return {
            card: '',
            expireDate: '',
            secureCode: '',
            paymentType: 0
        };
    },

    components: { VCheckbox, VInput }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-payment-methods {
    background: $background;
    margin-top: $gutter * 3;
    >header {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: $big;
        color: $darkest;
        padding: 0 3*$gutter;
        padding-bottom: 0;
    }

    >ul {
        li {
            padding: $gutter * 3;
            border-top: 1px solid $lightest;
            .creadit-card-detail-panel {
                margin-top: $gutter * 5;
                .input {
                    margin-top: $gutter*3;
                    padding-left: 3*$gutter;
                    border: 1px solid $lightest;
                }
            }
            &.active {}
        }
    }
}
</style>
