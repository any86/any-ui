<template>
  <section class="log-in">
    <div class="row">
      <VInput v-model="email" :placeholder="'Email'"></VInput>
    </div>
    <div class="row">
      <VInput v-model="password" :type="'password'" :placeholder="'Password'"></VInput>
    </div>
    <button class="button-block login" @click="login">LOGIN</button>
    <button class="button-block login-with-facebook">LOGIN WITH FACEBOOK</button>
    <router-link tag="a" :to="{path: '/forget'}" class="forget">Forget Password</router-link>
  </section>
</template>
<script>
import {JSEncrypt} from 'jsencrypt'
import VInput from '@/packages/Input/Input'
export default {
  name: 'Login',

  data() {
    return {
      publicKey: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1oCqoAmQSAKNyrFfOXNCCVm1MoyWy64HdOJOduKXHN8joYrMbjA0O8eMMcmXP6yGSDwen5OtFGvUuTrvkWXvio83+c7m1VlMZWa3Y9vIf3tX4BcXFiyochmeJCXPS47U92g6oI3tCI+Hg2n+NuVCDTcb9hEOH6xSmDZuASQ2v9ACWjqG9IDmC+oNr5OhtZNos+4iGwmU8d64gHwzjUI3srcJ/FIEB3kSCg8NNeDVk/QdSriat2vOwSgM0w8uU3IVcK18ISe2ZxrrEuu55ZrTqzjwhwFWZ+mRcEMYzeYU1I2V44U+xgGsL9AiPrL4mg45B5K7BC3WK6Pun1AO8BwSjwIDAQAB-----END PUBLIC KEY-----',

      email: 'zhangsan1@lisi.com',

      password: '123456'
    }
  },

  mounted(){
    dir(JSEncrypt)
  },

  methods: {
    login() {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.publicKey);
      var encrypted = encrypt.encrypt(this.email);
      this.$api.login({
        password: encrypted,
        username: this.email
      }).then(response => {
        syslog(response);
      });
    },
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
