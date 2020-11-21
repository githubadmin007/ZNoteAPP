import Vue from 'vue'
import store from '@/store'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';

@Module({
    name: 'Tab', namespaced: true, dynamic: true, store
})
export default class TabStore extends VuexModule {
    MenuTree: Array<any> = []

    // 设置菜单树
    @Mutation
    SetMenuTree(tree: Array<any>) {
        this.MenuTree = tree;
    }
    // 打开新页面
    @Mutation
    OpenNewPage(page: any) {
        if (page != null) {
            // var index = state.OpenedList.indexOf(page);
            // if (index < 0) {
            //     index = state.OpenedList.push(page) - 1;
            // }
            // state.CurrentPage = state.OpenedList[index];
            store.state.$router.push(page.path);
        }
    }
}

export const TabModule = getModule(TabStore);
