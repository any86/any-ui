<template>
    <section class="row-user-info">
        <header class="header-title">
            <a class="text-danger">1</a> Billing Address</header>
        <VCell border="true">
            <router-link :to="{path: '/billingAddress'}" tag="div" class="button-circle">
                <i class="iconfont icon-add"></i>
            </router-link>
            <p class="button-desc">Add Billing Address</p>
        </VCell>

        <VCell :to="{path: 'billingAddress'}" :hasArrow="true" class="info">
            <div class="contact">
                <h4 class="name">Seven</h4>
                <span class="mobile">13813877821</span>
            </div>
            <div class="address">
                <p>118 xjkljqw adssdlfjk #405</p>
                <p>LA USA UK AK CK</p>
            </div>
        </VCell>
        
        <VCell border="true">
            <VSwitch :value="isSameAddress" @input="change">Ship The Same Address</VSwitch>
        </VCell>


        <VCell :to="{path: 'billingAddress'}" :hasArrow="true" class="info">
            <div class="contact">
                <h4 class="name">Seven</h4>
                <span class="mobile">13813877821</span>
            </div>
            <div class="address">
                <p>118 xjkljqw adssdlfjk #405</p>
                <p>LA USA UK AK CK</p>
            </div>
        </VCell>

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

    .button-circle {
        display: block;
        margin: $gutter auto;
        border-radius: 100%;
        width: 1rem;
        text-align: center;
        line-height: 1rem;
        height: 1rem;
        border: 1px solid $light;
        .iconfont {
            font-size: $biggest;
            color: $dark;
        }
    }
    .button-desc {
        text-align: center;
        font-size: $normal;
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
