<template>
    <section class="row-payment-methods">
        <header>PAYMENT METHODS</header>
        <ul>
            <li>
                <VRadio v-model="paymentType" :selfValue="0">PayPal</VRadio>
            </li>
            <li>
                <VRadio v-model="paymentType" :selfValue="1">CREDIT CARD</VRadio>
                <div v-show="paymentType" class="creadit-card-detail-panel">
                    <VInput v-model="card" type="bankCode" class="input" :placeholder="'card number'"></VInput>
                    <VInput :value="expireDate" class="input" :placeholder="'expire date'" @focus="isShowDatePicker=true">
                    </VInput>
                    <VInput v-model="secureCode" class="input" :placeholder="'secure code'"></VInput>
                </div>
            </li>
        </ul>
        <VPopup v-model="isShowDatePicker">
            <VPicker v-model="pickerValue" :dataSource="pickerDataSource"></VPicker>
        </VPopup>
        
    </section>
</template>
<script>
import VPicker from '@/packages/Picker/Picker'
import VRadio from '@/packages/Radio/Radio'
import VInput from '@/packages/Input/Input'
import VPopup from '@/packages/Dialog/Popup'


export default {
    name: 'paymentMethods',

    props: {
        dataSource: {
            type: Array
        }
    },

    data() {
        return {
            isShowDatePicker: false,
            card: '',
            secureCode: '',
            paymentType: 1,
            pickerValue: [2018, '01'],
            pickerDataSource: [
                [{label:2018, value: 2018}, {label:2017, value:2017}],
                [{label: '01', value: '01'}, {label:'02', value:'02'}, {label:'03', value:'03'}]
            ]
        };
    },

    computed: {
        expireDate(){
            const pickerValue = [...this.pickerValue];
            return pickerValue.reverse().join(' / ');
        }
    },

    components: { VPicker, VInput, VRadio, VPopup }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-payment-methods {
    background: $background;
    margin-top: $gutter;
    >header {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: $big;
        color: $darkest;
        padding: 0 $gutter;
        padding-bottom: 0;
    }

    >ul {
        li {
            padding: $gutter;
            border-top: 1px solid $lightest;
            .creadit-card-detail-panel {
                margin-top: $gutter;
                .input {
                    height: 1rem;
                    margin-top: $gutter;
                    padding-left: $gutter;
                    border: 1px solid $lightest;
                }
            }
            // &.active {}
        }
    }
}
</style>
