<template>
    <ScrollView v-model="scrollY" class="page-billing-address">
        <LayoutHeader></LayoutHeader>
        <VCell class="item">
            <VInput v-model="form.firstName" :placeholder="'First Name'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="form.lastName" :placeholder="'Last Name'"></VInput>
        </VCell>
        <VCell class="item" :hasArrow="true" @click.native="selectZone(0)">
            <VInput :value="zoneLabel[0]" :hasRemove="false" :disabled="true" :placeholder="'country'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="form.zip" :placeholder="'Zip Code'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="form.email" :placeholder="'Email Address'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="form.tel" :placeholder="'Telphone'"></VInput>
        </VCell>
        <VCell class="item item-dark">
            <VSwitch v-model="form.isShipSameAddress">Ship The Same Address</VSwitch>
        </VCell>
        <button @click="save" class="button-save">SAVE</button>
    
        <!--选择区域-->
        <VPopup v-model="isShowPicker" class="popup">
            <header>
                <span class="button button-cancel" @click="cancelPopup">cancel</span>
                <span class="button button-ok" @click="okPopup">ok</span>
            </header>
            <VPicker :dataSource="dataSource.zones" :value="form.zones" @change="changePicker"></VPicker>
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
            isShowPicker: false,
            form: {
                firstName: 'zhang',
                lastName: '',
                zip: '',
                email: '',
                tel: '',
                zones: [],
                isShipSameAddress: false
            },
            dataSource: {
                zones: [[{}]]
            },
            tempZones: [],
            zoneLabel: []
        }
    },

    methods: {
        /**
         * 区域选择
         * @param {Number} index 层级
         */
        async selectZone(index) {
            try {
                this.$store.commit('SHOW_LOADING');
                const response = await this.$api.getProvince({country: 'us'});
                this.dataSource.zones[index].splice(0, this.dataSource.zones[0].length);
                this.dataSource.zones[index].push(...response.data);
                // 显示区域选择面板
                this.isShowPicker = true;
            } catch (error) {
                this.$alert(error);
            }
            this.$store.commit('HIDE_LOADING');
        },
        /**
         * 选择一个区域
         */
        changePicker({ index, value, label }) {
            this.tempZones[index] = { value, label };
        },

        /**
         * 保存
         */
        async save() {
            try {
                const response = await this.$api.saveAddress(this.form);
                this.$alert(response.data.message);
            } catch (error) {
                this.$alert(error);
            }
        },
        /**
         * 取消区域选择
         */
        cancelPopup() {
            this.isShowPicker = false;
        },
        /** 
         * 确定区域选择
         */
        okPopup() {
            this.isShowPicker = false;

            this.form.zones = this.tempZones.map((item, index) => {
                this.zoneLabel[index] = item.label;
                return item.value;
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

    .popup {
        header {
            display: flex; // border-bottom: 1px solid $lightest;
            .button {
                padding: $gutter * 3;
                font-size: $bigger;
                flex: 1;
                display: block; // &:active {}
            }
            .button-cancel {
                text-align: left;
                color: $light;
            }

            .button-ok {
                color: $base;
                text-align: right;
            }
        }
    }


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
