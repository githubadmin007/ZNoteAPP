import Vue from 'vue'
import Vuex from 'vuex'
import TabModule from './modules/TabModule'
import UserModule from './modules/UserModule'
import API from './modules/API'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    $router: null
  },
  mutations: {
    SetRouter (state, router) {
      state.$router = router;
    }
  },
  modules: {
    TabModule: TabModule,
    UserModule: UserModule,
    API: API
  }
})
