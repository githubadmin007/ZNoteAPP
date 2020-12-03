import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
    name: 'API', namespaced: true, dynamic: true, store
})
export default class APIStore extends VuexModule {
    // APIBaseUrl = 'http://120.77.35.228:7040';
    APIBaseUrl = 'http://localhost/ZNoteAPI';

    /** 登陆地址 */
    get LoginAPI(): string {
        return this.APIBaseUrl + '/User/Login';
    }
    /** 获取用户信息 */
    get UserInfoAPI(): string {
        return this.APIBaseUrl + '/User/GetUserInfo';
    }
    /** 系统列表 */
    get SystemListAPI() {
        return this.APIBaseUrl + '/System/GetSystem';
    }

    // 表单
    /** 获取表单信息 */
    get FormGetInfoAPI() {
        return this.APIBaseUrl + '/form/GetFormInfo';
    }
    /** 获取字段候选值 */
    get FormGetFieldsAPI() {
        return this.APIBaseUrl + '/form/GetFields';
    }
    /** 保存表单数据 */
    get FormSaveAPI(){
        return this.APIBaseUrl + '/form/Save';
    }
    // /** 获取表单字段 */
    // get FormGetFieldItems() {
    //     return this.APIBaseUrl + '/form/GetFieldItems';
    // }
    // /** 获取字段限制规则 */
    // get FormGetFieldRules() {
    //     return this.APIBaseUrl + '/form/GetFieldRules';
    // }

    // Todo
    /** 获取待办事项 */
    get TodoGetList() {
        return this.APIBaseUrl + '/Todo/GetList';
    }
}

export const APIModule = getModule(APIStore);
