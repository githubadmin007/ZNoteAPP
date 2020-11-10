import EView from './View/index.js'
import BaseMapBar from './BaseMapBar'
import EsriHelper from './base/EsriHelper.js'
import { default as arcgisConfig, DefaultLoadModules } from './base/arcgisConfig.js';
import { setEsriLoaded } from './base/EsriState'

const components = [
    EView,
    BaseMapBar
];

const install = function(Vue, options = {}) {
    EsriHelper.loadModules(DefaultLoadModules, {
        url: arcgisConfig.getScriptPath()
    }).then(() => {
        setEsriLoaded();
    });

    options.used = true;

    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$EsriHelper = EsriHelper;
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.0.1',
    install,
    EView,
    BaseMapBar
}