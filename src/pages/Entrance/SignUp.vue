<template>
    <section class="sign-up">
        <div class="row">
            <VInput v-model="firstName" :placeholder="'FIRSTNAME'"></VInput>
        </div>
        <div class="row">
            <VInput v-model="lastName" :placeholder="'LASTNAME'"></VInput>
        </div>
        <div class="row">
            <VInput v-model="email" :type="'email'" :placeholder="'EMAIL'"></VInput>
        </div>
        <div class="row">
            <VInput v-model="password" :type="'password'" :placeholder="'PASSWORD'"></VInput>
        </div>
        <div class="row">
            <VInput v-model="passwordConfirm" :type="'password'" :placeholder="'CONFIRM PASSWORD'"></VInput>
        </div>
        <div class="row-agree">
            <VCheckbox :reverse="true" v-model="isAgree">I have read and agree to the terms of service</VCheckbox>
        </div>
    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'
import VCheckbox from '@/packages/Checkbox/Checkbox'

export default {
    name: 'Login',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            isAgree: false
        }
    },
    components: {
        VInput,
        VCheckbox
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.sign-up {
    width: 100%;
    padding: $gutter * 3;
    >.row {
        border-bottom: 1px solid $lightest;
        margin: $gutter * 3 auto;
    }
    >.row-agree {
        display: flex;
        >p {
            flex: 1;
            display: flex;
            margin: auto .2rem;
        }
    }
}
</style>
