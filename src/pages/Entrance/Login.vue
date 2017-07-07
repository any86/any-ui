<template>
    <section class="log-in">
        <div class="row">
            <VInput v-model="email" :placeholder="'Email'"></VInput>
        </div>
        <div class="row">
            <VInput v-model="password" :type="'password'" :placeholder="'Password'"></VInput>
        </div>
		
		<button class="button-block login">LOGIN</button>
		<button class="button-block login-with-facebook">LOGIN WITH FACEBOOK</button>
		<router-link tag="a" :to="{path: '/forget'}" class="forget">Forget Password</router-link>
    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'
export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    components: {
        VInput
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.log-in {
	width: 100%;
	padding: $gutter * 3;
    >.row {
        border-bottom: 1px solid $lightest;
        margin: $gutter * 3 auto;
    }
	
	>.button-block{margin: $gutter * 3 auto;width: 100%;height: 1rem;}
	>.login{background: $base;color: $sub;}
    >.login-with-facebook{background: $primary;color: $sub;}
    >.forget{float: right;
		&:after{clear:both;}
    }
}
</style>
