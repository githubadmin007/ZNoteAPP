import VEvent from './src/VEvent.vue';

VEvent.install = function (Vue) {
  Vue.component(VEvent.name, VEvent);
};

export default VEvent;
