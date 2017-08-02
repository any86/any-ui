<template>
    <ScrollView v-model="scrollY" class="page-billing-address">
        <LayoutHeader></LayoutHeader>
        <VCell class="item">
            <VInput v-model="form.firstName" :placeholder="'First Name'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="form.lastName" :placeholder="'Last Name'"></VInput>
        </VCell>
        <VCell class="item" :hasArrow="true" @click.native="selectZone(0)">Country</VCell>
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
            <VSwitch v-model="form.isShipSame">Ship The Same Address</VSwitch>
        </VCell>
        <button @click="save" class="button-save">SAVE</button>
    
        <!--选择区域-->
        <VPopup v-model="isShowSelect" class="popup">
            <header>
                <span class="button button-cancel" @click="cancelPopup">cancel</span>
                <span class="button button-ok" @click="okPopup">ok</span>
            </header>
            <VPicker :dataSource="zones" :value="form.zone" @change="changePicker"></VPicker>
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
            form: {
                firstName: '',
                lastName: '',
                zip: '',
                email: '',
                tel: '',
                zone: [null],
                isShipSame: false
            },
            zones: [[{}]],
            tempZones: [],
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
                const response = await this.$api.getCountry();
                this.zones[index].splice(0, this.zones[0].length);
                this.zones[index].push(...response.data);
                this.$store.commit('HIDE_LOADING');
                // 显示区域选择面板
                this.isShowSelect = true;
            } catch (error) {
                this.$alert(error);
            }
        },
        /**
         * 选择一个区域
         */
        changePicker({ index, value }) {
            this.tempZones[index] = value;
        },

        /**
         * 保存
         */
        async save() {
            const response = await this.$api.saveAddress(this.form);
            this.$alert(response.data.message);
        },

        cancelPopup() {

        },

        okPopup() {
            this.form.zone = [...this.tempZones];
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
                display: block;
                &:active {}
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
