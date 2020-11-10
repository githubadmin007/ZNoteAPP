import Vue from 'vue'
import PopupWindow from './PopupWindow.vue';

let instances = [];
let seed = 1;

const WindowManager = function (options) {
    options = options || {};
    let id = options.id || 'window_' + seed++;
    if (typeof options === 'string') {
        options = {
            title: '',
            src: options
        };
    }
    options.id = id;
    // 实例化
    let WindowConstructor = Vue.extend(PopupWindow);
    let instance = new WindowConstructor({
        propsData: options
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.Show();
    let close = instance.Close;
    instance.Close = () => close( () => WindowManager.close(id) );
    instances.push(instance);
    return instances;
}

WindowManager.close = function (option) {
    let id = typeof option === 'string' ? option : option.id;
    let index = instances.findIndex(instance => instance.id === id);
    let $el = instances[index].$el;
    document.body.removeChild($el);
    instances.splice(index, 1);
}

WindowManager.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        // WindowManager.close(instances[i]);
        instances[i].Close();
    }
  };

export default WindowManager;
