import View from './src/View'

View.install = function(Vue) {
    Vue.component(View.name, View);
}

export default View;