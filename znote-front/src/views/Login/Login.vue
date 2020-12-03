<template>
    <v-row>
        <v-col md="6" offset-md="3">
            <v-form v-model="valid" style="width: 100%">
                <!-- 账号 -->
                <v-text-field
                    v-model="form.loginname"
                    label="账号"
                    @keydown.enter="Login"
                    :rules="rules.loginname"
                    dense
                    outlined
                ></v-text-field>
                <!-- 密码 -->
                <v-text-field
                    v-model="form.password"
                    label="密码"
                    type="password"
                    @keydown.enter="Login"
                    :rules="rules.password"
                    dense
                    outlined
                ></v-text-field>
            </v-form>
            <!-- 登录按钮 -->
            <v-btn color="primary" :disabled="!valid" block @click="Login">
                登录
            </v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CreateNotEmptyRule } from "../../assets/script/InputRule";
import { UserModule } from "@/store/modules";

@Component
export default class Login extends Vue {
    valid = false;
    form = {
        loginname: "",
        password: "",
    };
    rules = {
        loginname: [CreateNotEmptyRule("账号")],
        password: [CreateNotEmptyRule("密码")],
    };

    Login() {
        if (this.valid) {
            const loginname = this.form.loginname;
            const password = this.form.password;
            UserModule.Login({ loginname, password });
        }
    }
}
</script>
