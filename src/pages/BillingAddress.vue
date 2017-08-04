<template>
    <ScrollView v-model="scrollY" class="page-billing-address">
        <LayoutHeader></LayoutHeader>
        <VCell class="item">
            <VInput v-model="form.firstname" :placeholder="'First Name'"></VInput>
        </VCell>
        <VCell class="item">
            <VInput v-model="form.lastname" :placeholder="'Last Name'"></VInput>
        </VCell>
    
        <!--国家-->
        <VCell class="item" :hasArrow="true" @click.native="isShowCountryPicker = true">
            <VInput :value="form.country" :hasRemove="false" :disabled="true" :placeholder="'select country'"></VInput>
        </VCell>
    
        <!--省-->
        <VCell class="item" :hasArrow="!isEmptyRegion" @click.native="isShowRegionPicker = true">
            <VInput :value="form.region" :disabled="!isEmptyRegion" :hasRemove="false" :placeholder="'select region'"></VInput>
        </VCell>
    
        <!--市-->
        <VCell class="item">
            <VInput v-model="form.city" :hasRemove="false" :placeholder="'select city'"></VInput>
        </VCell>
    
        <VCell class="item">
            <VInput v-model="form.postcode" :placeholder="'postcode Code'"></VInput>
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
    
        <!--选择国家-->
        <v-popup-picker v-if="!isEmptyCountry" :isShow.sync="isShowCountryPicker" :value="[form.country_id]" :dataSource="dataSource.country" @change="changeCountry"></v-popup-picker>
        <v-popup-picker v-if="!isEmptyRegion" :isShow.sync="isShowRegionPicker" :value="[form.region_id]" :dataSource="dataSource.region" @change="changeRegion"></v-popup-picker>
    </ScrollView>
</template>
<script>
import LayoutHeader from './BillingAddress/Header'
import VCell from '@/packages/Cell/Cell'
import VInput from '@/packages/Input/Input'
import VSwitch from '@/packages/Switch/Switch'
import VPopupPicker from '@/packages/PopupPicker/PopupPicker'


export default {
    name: 'BillingAddress',

    data() {
        return {
            scrollY: 0,
            isShowCountryPicker: false,
            isShowRegionPicker: false,
            form: {
                firstname: 'zhang',
                lastname: '',
                postcode: '',
                email: '',
                tel: '',
                country_id: null,
                country: '',
                region_id: null,
                region: '',
                city: '',
                isShipSameAddress: false
            },
            dataSource: {
                country: [[]],
                region: [[]],
            },
        }
    },

    mounted() {
        this.getCountryList();
    },

    methods: {
        /**
         * 选择国家
         */
        async getCountryList() {
            try {
                this.$store.commit('SHOW_LOADING');
                const response = await this.$api.getCountry();
                this.dataSource.country[0].splice(0, this.dataSource.country[0].length);
                this.dataSource.country[0].push(...response.data);
            } catch (error) {
                this.$alert(error);
            }
            this.$store.commit('HIDE_LOADING');
        },
        /**
         * 选择国家
         */
        changeCountry({ value, label }) {
            this.form.country_id = value;
            this.form.country = label;
            this.form.region = '';
            this.form.region_id = null;
            this.form.city = '';
            this.getRegion();
        },

        /**
         * 选择州/省
         */
        async getRegion() {
            try {
                this.$store.commit('SHOW_LOADING');
                const response = await this.$api.getRegion({ country: this.form.country_id });
                this.dataSource.region[0].splice(0, this.dataSource.region[0].length);
                this.dataSource.region[0].push(...response.data);
            } catch (error) {
                this.$alert(error);
            }
            this.$store.commit('HIDE_LOADING');
        },

        changeRegion({ value, label }) {
            this.form.region_id = value;
            this.form.region = label;
            this.form.city = '';
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
            this.isShowCountryPicker = false;
        },
        /** 
         * 确定区域选择
         */
        okPopup() {
            this.isShowCountryPicker = false;
        }
    },

    computed: {
        isEmptyCountry() {
            return 0 == this.dataSource.country[0].length;
        },

        isEmptyRegion() {
            return 0 == this.dataSource.region[0].length;
        },

        isEmptyCity() {
            return 0 == this.dataSource.city[0].length;
        }
    },

    components: {
        LayoutHeader,
        VInput,
        VCell,
        VSwitch,
        VPopupPicker
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
