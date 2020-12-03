import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import VueCookies from 'vue-cookies'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.use(VueCookies);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
