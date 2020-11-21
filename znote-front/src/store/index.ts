import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { StoreOptions } from 'vuex'
// import router from '@/router'

Vue.use(Vuex);

interface RootState {
    $router: VueRouter;
}

const store: StoreOptions<RootState> = {
    state: {
        $router: new VueRouter()
    },
    mutations: {
        SetRouter(state, router) {
            state.$router = router;
        }
    },
    actions: {
    },
    modules: {
    }
}

export default new Vuex.Store(store)
