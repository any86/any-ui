<template>
    <div class="page-forget full-screen">
        <LayoutHeader></LayoutHeader>
        <div class="row">
            <p>please enter you email for find password please enter you email for find password</p>
        </div>
        <div class="row">
            <VInput :type="'email'" v-model="email" :placeholder="'EMAIL ADDRESS'"></VInput>
        </div>
        <button>SUBMIT</button>
    </div>
</template>
<script>
import LayoutHeader from '@/components/Header'
import VInput from '@/packages/Input/Input'
export default {
    name: 'Forget',

    data() {
        return {
            email: ''
        };
    },

    components: {
        LayoutHeader,
        VInput
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-forget {
    padding: $gutter * 3;
    >.row {
        border-bottom: 1px solid $lighter;
        min-height: 1rem;
        display: flex;
        align-items: center;
        >p {
            font-size: $normal;
        }
    }
    >button {
        background: $base;
        color: $sub;
        height: 1rem;
        width: 100%;
        margin-top: $gutter * 3;
    }
}
</style>
