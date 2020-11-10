import Form from './Form'

const components = [
    Form
];

const install = function(Vue, options = {}) {
    options.used = true;

    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.0.1',
    install,
    Form
}
