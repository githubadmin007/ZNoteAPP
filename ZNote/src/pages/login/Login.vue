<template>
  <v-row>
    <v-col md="6" offset-md="3">
        <v-form v-model="valid" style="width:100%;">
          <v-text-field v-model="form.loginname" label="账号" @keydown.enter="Login" :rules="rules.loginname" dense outlined></v-text-field>
          <v-text-field v-model="form.password" label="密码" type="password" @keydown.enter="Login" :rules="rules.password" dense outlined></v-text-field>
          <v-checkbox v-model="form.autologin" label="自动登录"></v-checkbox>
        </v-form>
        <v-btn color="primary" :disabled="!valid" block @click="Login">登录</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import md5 from 'js-md5'
import { mapGetters } from 'vuex'
import { CreateNotEmptyRule } from '../../assets/script/InputRule.js'

export default {
  name: 'login',
  data () {
    return {
      valid: false,
      form: {
        loginname: '',
        password: '',
        autologin: false
      },
      rules: {
        loginname: [CreateNotEmptyRule('账号')],
        password: [CreateNotEmptyRule('密码')]
      }
    }
  },
  computed: {
    ...mapGetters('API', ['LoginAPI'])
  },
  methods: {
    Login () {
      if (this.valid) {
        var loginname = this.form.loginname;
        var pw_md5 = md5(this.form.password);
        this.$store.dispatch('UserModule/Login', {loginname, pw_md5});
        this.$store.commit('UserModule/SetAutoLogin', this.form.autologin);
      }
    }
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
