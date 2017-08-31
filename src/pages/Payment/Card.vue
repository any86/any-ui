<template>
    <section class="row-card">
        <VPopup v-model="isShowDatePicker">
            <VPicker v-model="date" :dataSource="dateList"></VPicker>
        </VPopup>
        <div class="item">
            <header>Payment Type</header>
            <ul>
                <li v-for="n in 10">{{n}}</li>
            </ul>
        </div>
        <div class="item">
            <header>Card Number</header>
            <VInput v-model="cardCode" :type="'bankCode'" :placeholder="'please input something'"></VInput>
        </div>

        <div @click="selectDateTime" class="item">
            <header>Expire Date</header>
            <p>{{null != date[0] && null != date[1] ? date[0] + ' / ' + date[1] : 'pick up datetime'}}</p>
        </div>

        <div class="item">
            <header>CSV</header>
            <VInput v-model="csv" :placeholder="'please input something'"></VInput>
        </div>

        <div class="item">
            <VSwitch v-model="isShipSame">Ship To The Same Address</VSwitch>
        </div>

    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'
import VSwitch from '@/packages/Switch/Switch'
import VPicker from '@/packages/Picker/Picker'
import VPopup from '@/packages/Dialog/Popup'


export default {
    name: 'Card',

    data() {
        return {
            date: [null, null],
            dateList: [
                [{
                    label: 1,
                    value: 1
                }, {
                    label: 12,
                    value: 12
                }],
                [{
                    label: 2018,
                    value: 2018
                }]
            ],
            isShowDatePicker: false,
            cardCode: '',
            csv: '',
            isShipSame: false
        };
    },

    methods: {
        selectDateTime(){
            this.isShowDatePicker = true;
        }
    },

    components: {
        VInput,VSwitch,
        VPicker,
        VPopup
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-card {
    background: $background;
    >.item {
        border-bottom: 1px solid $lightest;
        padding: $gutter;
        >header {
            font-size: $normal;
        }
        >p {
            font-size: $normal;
            color: $dark;
        }
        >ul {
            margin-top: $gutter;
            display: flex;
            overflow-x: scroll;
            >li {
                flex: 1 0 15%;
                height: .8rem;
                margin-right: $gutter;
                border: 1px solid rgba(0, 0, 0, 0);
                background: #ddd;
                &.active {
                    border: 1px solid $dark;
                }
            }
        }
    }
}
</style>
