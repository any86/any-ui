<template>
    <ScrollView v-model="scrollY" class="page-billing-address">
        <LayoutHeader></LayoutHeader>
        <VCell class="item">
            <VInput v-model="dataSource.firstName" :placeholder="'First Name'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="dataSource.lastName" :placeholder="'Last Name'"></VInput>
        </VCell>
        <VCell class="item" :hasArrow="true" @click.native="selectZone">select one</VCell>
        <VCell class="item">
            <VInput v-model="dataSource.zip" :placeholder="'Zip Code'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="dataSource.email" :placeholder="'Email Address'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="dataSource.tel" :placeholder="'Telphone'"></VInput>
        </VCell>
        <VCell class="item item-dark">
            <VSwitch v-model="dataSource.isShipSame">Ship The Same Address</VSwitch>
        </VCell>
        <button class="button-save">SAVE</button>
        <VPopup v-model="isShowSelect">
            <VPicker :dataSource="picker" v-model="dataSource.pickerValue" @change="changePicker"></VPicker>
        </VPopup>
    </ScrollView>
</template>
<script>
import LayoutHeader from './BillingAddress/Header'
import VCell from '@/packages/Cell/Cell'
import VInput from '@/packages/Input/Input'
import VSwitch from '@/packages/Switch/Switch'
import VPopup from '@/packages/Dialog/Popup'
import VPicker from '@/packages/Picker/Picker'
export default {
    name: 'BillingAddress',

    data() {
        return {
            scrollY: 0,
            isShowSelect: false,
            dataSource: {
                firstName: '',
                lastName: '',
                zip: '',
                email: '',
                tel: '',
                pickerValue: [0, 0],
                isShipSame: false
            },

            picker: [
                [{
                    label: '请先选择年',
                    value: '0'
                }],
                [{
                    label: '请先选择月',
                    value: '0'
                }]
            ]
        }
    },

    methods: {
        selectZone() {
            this.isShowSelect = !this.isShowSelect;
            this.$api.getZoneLevel1().then(response => {
                this.picker[0].splice(0, this.picker[0].length);
                this.picker[0].push(...response.data);
            }).catch(err => {

            });
        },

        changePicker({
            index,
            value
        }) {

            this.$api.getZone(index + 1, {}).then(response => {
                this.picker[index + 1].splice(0, this.picker[index + 1].length);
                this.picker[index + 1].push(...response.data);
                this.dataSource.pickerValue[indx+1] = 0;
            }).catch(err => {

            });
        }
    },

    components: {
        LayoutHeader,
        VInput,
        VCell,
        VSwitch,
        VPopup,
        VPicker
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-billing-address {
    background: $lightest;
    .item {
        background: $background;
        border-bottom: 1px solid $lightest;
    }
    .item-dark {
        background: $lightest;
    }
    .button-save {
        background: $base;
        width: 100%;
        height: 1rem;
        text-align: center;
        color: $sub;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>
