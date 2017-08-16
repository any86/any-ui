<template>
    <section class="row-discount">
        <div class="row-ponits">
            <VSwitch v-model="isUsed">
                <p>
                    <Icon value="map" class="icon"></Icon>
                    you have
                    <span>100</span> points available, can be used as
                    <span>$10</span>
                </p>
            </VSwitch>
        </div>
        <div class="row-coupon-code">
            <a>
                <Icon value="map" class="icon"></Icon>coupon-code</a>
            <div class="input-code">
                <VInput v-model="couponCode" class="input"></VInput>
                <span @click="useCoupon" class="button-apply">Apply Coupon</span>
                <span @click="restoreCoupon" class="button-apply">Restore Coupon</span>
    
            </div>
        </div>
    </section>
</template>
<script>
import VSwitch from '@/packages/Switch/Switch'
import VInput from '@/packages/Input/Input'

export default {
    name: 'Discount',

    props: {
        dataSource: {
            // required: true
        },

        scrollY: {
            // required: true
        }
    },

    data() {
        return {
            isUsed: false,
            couponCode: ''
        };
    },

    methods: {
        async useCoupon() {
            try {
                this.$store.commit('SHOW_LOADING');
                await this.$store.dispatch('useCoupon', this.couponCode);
                await this.$store.dispatch('getTotalOfCart');
                this.$store.commit('HIDE_LOADING');
            } catch (error) {

            }
        },

        async restoreCoupon() {
            try {
                this.$store.commit('SHOW_LOADING');
                await this.$store.dispatch('restoreCoupon', this.couponCode);
                await this.$store.dispatch('getTotalOfCart');
                this.$store.commit('HIDE_LOADING');
            } catch (error) {

            }
        },

    },

    components: {
        VSwitch,
        VInput
    }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-discount {
    background: $background;
    .row-ponits {
        display: flex;
        padding: $gutter;
        border-bottom: 1px solid $lightest;
        .icon {
            margin-right: $gutter;
            color: $base;
        }
        p {
            flex: 1;
            margin: auto;
            font-size: $normal;
            span {
                color: $danger;
            }
        }
    }

    .row-coupon-code {
        overflow: hidden;
        .icon {
            margin: $gutter;
            color: $base;
        }
        .input-code {

            margin: $gutter;
            display: flex;
            height: 1rem;
            align-items: center;
            border: 1px solid $lightest;
            .input {
                padding-left: $gutter;
                flex: 1;
            }

            .button-apply {
                background: $base;
                color: $sub;
                display: block;
                line-height: 1rem;
                padding: 0 $gutter;
                color: $sub;
                font-size: $big;
            }
        }
    }
}
</style>
