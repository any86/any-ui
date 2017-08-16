<template>
    <section class="row-user-info">
        <header class="header-title">Ship Address</header>
        <v-cell :to="{path: 'billingAddress'}" :hasArrow="true" class="info">
            <div class="contact">
                <span class="name">Seven</span>
                <span class="mobile">13813877821</span>
            </div>
            <div class="address">
                <p>118 xjkljqw adssdlfjk #405</p>
                <p>LA USA UK AK CK</p>
            </div>
        </v-cell>
        <v-cell :to="{path: 'billingAddress'}" :hasArrow="true">
            Add Shipping Address
        </v-cell>
        <div class="is-same-address">
            <VSwitch :value="isSameAddress" @input="change">Ship The Same Address</VSwitch>
        </div>
    </section>
</template>
<script>
import VSwitch from '@/packages/Switch/Switch'
import VCell from '@/packages/Cell/Cell'

export default {
    name: 'UserInfo',

    props: {
        isSameAddress: {
            type: Boolean
        }
    },

    methods: {
        change(value) {
            this.$emit('update:isSameAddress', value);
        }
    },

    components: {
        VSwitch, VCell
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-user-info {
    background: $background;
    >div {
        border-bottom: 1px solid $lightest;
        padding: $gutter;
        &:last-child {
            border-bottom: none;
        }
    }
    >.info {
        >.contact {
            >.name {
                font-size: $big;
            }
            >.mobile {
                margin-left: $gutter;
                font-size: $big;
            }
        }
        >.address {
            >p {
                font-size: $big;
                color: $light;
            }
        }
    }
}
</style>
