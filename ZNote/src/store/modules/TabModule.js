const TabModule = {
  namespaced: true,
  state: {
    MenuTree: [],
    OpenedList: [],
    CurrentPage: null,
    HomePage: null
  },
  getters: {},
  mutations: {
    // 清空
    Clear (state) {
      state.MenuTree = [];
      state.OpenedList = [];
      state.CurrentPage = null;
      state.HomePage = null;
    },
    // 设置菜单树
    SetMenuTree (state, tree) {
      state.MenuTree = tree;
    },
    // 设置主页
    SetHomePage (state, page) {
      state.HomePage = page;
    },
    // 打开新页面
    OpenNewPage (state, page) {
      if (page != null) {
        var index = state.OpenedList.indexOf(page);
        if (index < 0) {
          index = state.OpenedList.push(page) - 1;
        }
        state.CurrentPage = state.OpenedList[index];
        this.state.$router.push(state.CurrentPage.path);
      }
    },
    // 通过名称打开新页面
    OpenNewPageByName (state, name) {
      var page = state.OpenedList.find(page => page.name === name);
      this.commit('TabModule/OpenNewPage', page);
    },
    // 关闭指定页面
    ClosePage (state, page) {
      if (page != null) {
        var index = state.OpenedList.remove(page);
        if (index > -1) {
        }
      }
    },
    // 通过名称关闭指定页面
    ClosePageByName (state, name) {
      var page = state.OpenedList.find(page => page.name === name);
      this.commit('TabModule/ClosePage', page);
    }
  },
  actions: {}
}

export default TabModule
