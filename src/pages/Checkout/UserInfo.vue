<template>
    <section class="row-user-info">
        <div class="info">
            <div class="contact">
                <span class="name">Seven</span>
                <span class="mobile">13813877821</span>
            </div>
            <div class="address">
                <p>118 xjkljqw adssdlfjk #405</p>
                <p>LA USA UK AK CK</p>
            </div>
        </div>
        <div class="is-same-address">
            <VSwitch :value="isSameAddress" @input="change">Ship The Same Address</VSwitch>
        </div>
    </section>
</template>
<script>
import VSwitch from '@/packages/Switch/Switch'
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
        VSwitch
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-user-info {
    background: $background;
    >div {
        border-bottom: 1px solid $lightest;
        padding: 3*$gutter;
        &:last-child {
            border-bottom: none;
        }
    }
    >.info {
        >.contact {
            >.name {
                font-size: $biggest;
            }
            >.mobile {
                font-size: $biggest;
            }
        }
        >.address {
            >p {
                color: $light;
            }
        }
    }
}
</style>
