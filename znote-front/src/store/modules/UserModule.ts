import Vue from 'vue'
import axios from '../../plugins/axios'
import store from '@/store'
import { Md5 } from 'ts-md5'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { APIModule } from "@/store/modules/APIModule";
import { Location } from 'vue-router'

@Module({
    name: 'User', namespaced: true, dynamic: true, store
})
export default class UserStore extends VuexModule {
    UserId = '';
    UserName = '';
    LoginName = '';
    PasswordMD5 = '';
    Token = '';

    /** 是否有Token */
    get HasToken() {
        return !!this.Token;
    }
    /** 是否登陆 */
    get IsLogin() {
        return !!this.UserId;
    }

    /** 将Token保存到state和cookie中
     * @param token Token值，为空时清空state和cookie中的信息
     */
    @Mutation
    SetToken(token?: string) {
        this.Token = token || '';
        Vue.$cookies.set('Token', this.Token);
    }
    /** 将用户信息保存的state中
     * @param userInfo 用户信息，为空时清空state中的信息
     */
    @Mutation
    SetUserInfo(userInfo?: Record<string, string>) {
        userInfo = userInfo || {};
        this.UserId = userInfo.userbh;
        this.UserName = userInfo.user_name;
        this.LoginName = userInfo.login_name;
        this.PasswordMD5 = userInfo.password;
    }


    /** 初始化（只在程序加载时调用一次？） */
    @Action
    Init(): void {
        // token
        const token = Vue.$cookies.get('Token');
        this.SetToken(token);
        // 
        this.CheckToken();
    }

    /** 检查Token是否存在并有效 */
    @Action
    async CheckToken() {
        if (!this.HasToken) {
            this.ToLogin();
        } else {
            try {
                const response = await axios.get(APIModule.UserInfoAPI);
                this.SetUserInfo(response.data);
                this.SetToken(response.data.token);
            }
            catch (error) {
                this.ToLogin();
            }
        }
    }

    /** 退出登录
     * @param isRedirect 重新登陆后是否跳回原来的页面
     */
    @Action
    Logout(isRedirect = false) {
        this.SetToken();
        this.SetUserInfo();
        const localtion: Location = {
            path: '/login',
        };
        if (isRedirect) {
            localtion.query = {
                redirect: store.state.$router.currentRoute.fullPath
            }
        }
        store.state.$router.push(localtion);
    }

    /** 清空用户数据并跳转到登陆页面,登陆成功后可以重定向回原来的页面 */
    @Action
    ToLogin() {
        this.Logout(true);
        // store.commit('TabModule/Clear'); // 清空菜单列表等信息

    }

    /** 登陆 */
    @Action
    async Login({ loginname, password, }: Record<string, string | boolean>) {
        try {
            const formData = new FormData();
            formData.append('loginname', loginname as string);
            formData.append('password', Md5.hashStr(password as string).toString());
            const response = await axios.post(APIModule.LoginAPI, formData);
            this.SetUserInfo(response.data);
            this.SetToken(response.data.token);
        }
        catch (error) {
            this.SetUserInfo();
            this.SetToken();
        }
    }


    // @Action // 加载用户信息
    // async LoadUserInfo() {
    //     const url = this.context.rootGetters('API/SystemListAPI');
    //     const response = await axios.get(url);
    //     const tree = response.data;
    //     this.context.commit('TabModule/SetMenuTree', tree, { root: true });
    //     this.context.commit('TabModule/SetHomePage', tree[0], { root: true });
    //     this.context.commit('TabModule/OpenNewPage', tree[0], { root: true });
    // }
}

export const UserModule = getModule(UserStore);
