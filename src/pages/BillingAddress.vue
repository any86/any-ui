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
        <button @click="save" class="button-save">SAVE</button>
        <VPopup v-model="isShowSelect">
            <VPicker :dataSource="zones" v-model="dataSource.zone" @change="changePicker"></VPicker>
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
                zone: [0, 0, 0],
                isShipSame: false
            },

            zones: [
                [{
                    label: '请先选择省',
                    value: '0'
                }],
                [{
                    label: '请先选择市',
                    value: '0'
                }],
                [{
                    label: '请先选择区',
                    value: '0'
                }]
            ]
        }
    },

    methods: {
        selectZone() {
            this.isShowSelect = !this.isShowSelect;
            this.$api.getZone(1, {}).then(response => {
                this.zones[0].splice(0, this.zones[0].length);
                this.zones[0].push(...response.data);
            }).catch(err => {

            });
        },

        changePicker({
            index,
            value
        }) {
            if (this.zones.length - 1 > index) {
                // 清空后面已选
                this.zones.forEach((item, i) => {
                    if (index < i) {
                        this.zones[i].splice(0, this.zones[i].length);
                        this.zones[i].push({
                            value: 0,
                            label: '...'
                        });
                        this.dataSource.zone.splice(i, 1, 0);
                    }
                });

                // 给下一级填充数据
                this.$api.getZone(index + 2, {}).then(response => {
                    this.zones[index + 1].splice(0, this.zones[index + 1].length);
                    this.zones[index + 1].push(...response.data);
                    this.dataSource.zone.splice(index + 1, 1, this.zones[index + 1][0].value);
                }).catch(err => {

                });
            }
        },

        save() {
            this.$api.saveAddress(this.dataSource).then(response => {
                this.$alert(response.data.message);
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
