import Vue from 'vue'
import Vuetify from 'vuetify'
import VuetifyEx from 'vuetify-ex/src/core/index'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify-ex/lib/VuetifyEx.css'

Vue.use(Vuetify);
Vue.use(VuetifyEx);

const opts = {};
export default new Vuetify(opts);
