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
    /** 检查密码是否正确 */
    get CheckPasswordAPI(): string {
        return this.APIBaseUrl + '/User/CheckPassword';
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
    get FormSaveAPI() {
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
    get TodoGetListAPI() {
        return this.APIBaseUrl + '/Todo/GetList';
    }
    /** 放弃待办事项 */
    get TodoAbandonAPI() {
        return this.APIBaseUrl + '/Todo/Abandon';
    }
    /** 完成待办事项 */
    get TodoFinishAPI() {
        return this.APIBaseUrl + '/Todo/Finish';
    }
    /** 设为今日完成 */
    get TodoFinishTodayAPI() {
        return this.APIBaseUrl + '/Todo/FinishToday';
    }
    /** 获取待办信息 */
    get TodoGetInfo() {
        return this.APIBaseUrl + '/Todo/GetInfo';
    }

    // 翻译
    /** 百度翻译 */
    get TranslateBaidu() {
        return this.APIBaseUrl + '/Proxy/Translate';
    }
}

export const APIModule = getModule(APIStore);
