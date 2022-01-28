import axios from '../../plugins/axios'
import store from '@/store'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { APIModule, UserModule } from "@/store/modules";
import { Md5 } from 'ts-md5'

export interface Page {
    systembh: string;
    name: string;
    cname: string;
    icon: string;
    path: string;
    encrypt: string;
}

const LoginPage: Page = {
    systembh: '',
    name: 'login',
    cname: '登陆',
    icon: '',
    path: '/login',
    encrypt: ''
}

@Module({
    name: 'Tab', namespaced: true, dynamic: true, store
})
export default class TabStore extends VuexModule {
    MenuTree: Array<Page> = [];
    CurrentPage: Page = LoginPage;
    HomePage: Page = LoginPage;

    /** 设置菜单树 */
    @Mutation
    SetMenuTree(tree: Array<Page> = []) {
        this.MenuTree = tree;
    }
    /** 设置主页 */
    @Mutation
    SetHomePage(page: Page) {
        this.HomePage = page;
    }
    /** 设置当前页 */
    @Mutation
    SetCurrentPage(page: Page) {
        // var index = state.OpenedList.indexOf(page);
        // if (index < 0) {
        //     index = state.OpenedList.push(page) - 1;
        // }
        this.CurrentPage = page;
        store.state.$router.push(page.path);
    }
    /** 打开新页面 */
    @Action
    async OpenNewPage(page: Page) {
        if (page == this.CurrentPage) {
            return;
        }
        if (page.encrypt == '是') {
            const password = prompt("请输入密码");
            if (password) {
                const formData = new FormData();
                formData.append('password', Md5.hashStr(password).toString());
                const response = await axios.post(APIModule.CheckPasswordAPI, formData);
                if (response.data) {
                    this.SetCurrentPage(page);
                } else {
                    alert('密码错误');
                }
            }
        } else {
            this.SetCurrentPage(page);
        }
    }

    /** 通过名称打开新页面 */
    @Action
    OpenNewPageByName(name: string) {
        const page = this.MenuTree.find((page: Page) => page.name === name);
        if (page) {
            this.OpenNewPage(page);
        }
    }

    /** 刷新菜单列表 */
    @Action
    async RefreshMenuTree() {
        this.SetMenuTree();
        if (UserModule.IsLogin) {
            try {
                const response = await axios.post(APIModule.SystemListAPI);
                this.SetMenuTree(response.data);
                if (response.data.length > 0) {
                    this.SetHomePage(response.data[0]);
                    this.OpenNewPage(response.data[0]);
                }
            }
            catch {
                // 
            }
        }
    }
}

export const TabModule = getModule(TabStore);
