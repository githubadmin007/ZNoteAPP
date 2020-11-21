import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
    name: 'API', namespaced: true, dynamic: true, store
})
export default class APIStore extends VuexModule {
    // APIBaseUrl = 'http://120.77.35.228:7040';
    APIBaseUrl = 'http://localhost/ZNoteAPI';

    // 登陆地址
    get LoginAPI(): string {
        return this.APIBaseUrl + '/User/Login';
    }
    // 获取用户信息
    get UserInfoAPI(): string {
        return this.APIBaseUrl + '/User/GetUserInfo';
    }
}

export const APIModule = getModule(APIStore);
