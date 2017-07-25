<template>
  <section class="log-in">
    <VLoading v-model="islogining"></VLoading>
    <div class="row">
      <VInput v-model="email" :placeholder="'Email'" @blur="checkEmail"></VInput>
    </div>
    <p :class="{showError: isEmailError}" class="tip">{{isEmailEmpty ? emailEmptyText : emailErrorText}}</p>
    <div class="row">
      <VInput v-model="password" :type="'password'" :placeholder="'Password'" @blur="checkPassword"></VInput>
    </div>
    <p :class="{showError: isPasswordEmpty}" class="tip">{{passwordEmptyext}}</p>
    <button class="button-block login" @click="login">LOGIN</button>
    <button class="button-block login-with-facebook">LOGIN WITH FACEBOOK</button>
    <router-link tag="a" :to="{path: '/forget'}" class="forget">Forget Password</router-link>
  </section>
</template>
<script>
import * as types from "@/store/mutation-types";
import { JSEncrypt } from 'jsencrypt'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import store from 'store'
import VLoading from '@/packages/Loading/Loading'
import VMask from '@/packages/Dialog/Mask'
import VInput from '@/packages/Input/Input'

export default {
  name: 'Login',

  data() {
    return {
      islogining: false,
      publicKey: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1oCqoAmQSAKNyrFfOXNCCVm1MoyWy64HdOJOduKXHN8joYrMbjA0O8eMMcmXP6yGSDwen5OtFGvUuTrvkWXvio83+c7m1VlMZWa3Y9vIf3tX4BcXFiyochmeJCXPS47U92g6oI3tCI+Hg2n+NuVCDTcb9hEOH6xSmDZuASQ2v9ACWjqG9IDmC+oNr5OhtZNos+4iGwmU8d64gHwzjUI3srcJ/FIEB3kSCg8NNeDVk/QdSriat2vOwSgM0w8uU3IVcK18ISe2ZxrrEuu55ZrTqzjwhwFWZ+mRcEMYzeYU1I2V44U+xgGsL9AiPrL4mg45B5K7BC3WK6Pun1AO8BwSjwIDAQAB-----END PUBLIC KEY-----',
      email: store.get('customer') ? store.get('customer').email : '',
      // email: 'zhangsan2@lisi.com',
      emailErrorText: 'email format is wrong!',
      emailEmptyText: 'email is not empty!',
      isEmailEmpty: false,
      isEmailError: false,

      password: '',
      // password: '123456',

      isPasswordEmpty: false,
      passwordEmptyext: 'password is not empty!'
    }
  },

  methods: {
    checkEmail() {
      this.isEmailError = !isEmail(this.email);
      this.isEmailEmpty = isEmpty(this.email);
      return !this.isEmailError && !this.isEmailEmpty;
    },

    checkPassword() {
      this.isPasswordEmpty = isEmpty(this.password);
      return !this.isPasswordEmpty;
    },

    login() {
      if (this.checkEmail() && this.checkPassword()) {
        // 加密
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(this.publicKey);
        const encryptPassword = jsEncrypt.encrypt(this.password);
        this.islogining = true;
        this.$api.login({
          username: this.email,
          password: encryptPassword
        }).then(response => {
          this.islogining = false;
          this.$store.commit(types.SET_CUSTOMER, response.data.customer);
          store.set('customer', response.data.customer);
          this.$router.push({ path: '/index' });
        });
      }
    },
  },

  components: {
    VInput,
    VLoading,
    VMask
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
    margin: $gutter auto;
  }

  >.tip {
    color: $danger;
    font-size: $small;
    opacity: 0;
    transform: translateY(50%);
    transition: all .3s;

    &.showError {
      opacity: 1;
      transform: translateY(0);
    }
  }

  >.button-block {
    margin: $gutter * 3 auto;
    width: 100%;
    height: 1rem;
  }
  >.login {
    background: $base;
    color: $sub;
  }
  >.login-with-facebook {
    background: $primary;
    color: $sub;
  }
  >.forget {
    float: right;
    &:after {
      clear: both;
    }
  }
}

</style>
