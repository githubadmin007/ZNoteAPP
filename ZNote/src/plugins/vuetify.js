import Vue from 'vue'
import Vuetify from 'vuetify'
import VuetifyEx from '../../packages/VuetifyEx'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VuetifyEx);

const opts = {};
export default new Vuetify(opts);
