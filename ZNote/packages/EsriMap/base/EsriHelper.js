import esriLoader from 'esri-loader';
import EMap from '../Map/EMap';
import { whenLoaded } from './EsriState'
import SymFactory from '../Factory/SymbolFactory.js';
import LayerFactory from '../Factory/LayerFactory';

let esri = {};
let loadedModuleLst = [];// 已加载的模块列表

// 加载未加载的模块，并保存到esri对象中
function _loadModules (unloadedLst, options) {
    return new Promise((resolve, reject) => {
        if (unloadedLst.length > 0) {
            esriLoader.loadModules(unloadedLst, options)
            .then(moduleLst => {
                for (let i = 0; i < unloadedLst.length; i++) {
                    let modulePath = unloadedLst[i];
                    let pathArr = modulePath.split("/");
                    if (pathArr.length > 0 && pathArr[0] == "esri") {
                        let objCursor = esri;//游标，按模块路径逐层遍历
                        for (let j = 1; j < pathArr.length; j++) {
                            if (j < pathArr.length - 1) {
                                if (objCursor[pathArr[j]] == undefined) {
                                    objCursor[pathArr[j]] = {};
                                }
                                objCursor = objCursor[pathArr[j]];//进入下一层
                            }
                            else {
                                objCursor[pathArr[j]] = moduleLst[i];
                                loadedModuleLst[modulePath] = moduleLst[i];
                            }
                        }
                    }
                }
                resolve();
            })
            .catch(e => {
                reject(e);
            });
        }
        else {
            resolve();
        }
    });
}
// 加载esri模块，以esri.XX.XX的形式返回
function loadModules (moduleNameLst, options) {
    return new Promise((resolve, reject) => {
        let unloadedLst = moduleNameLst.filter( m => !loadedModuleLst[m] );
        _loadModules(unloadedLst, options)
        .then(() => {
            resolve(moduleNameLst.map( m => loadedModuleLst[m]));
        })
        .catch(e => {
            reject(e);
        });
    });
}

// 创建底图
function createBaseMap (settings) {
    let basemap = new esri.Basemap(settings);
    return basemap;
}

// 创建EMap，管理esri.Map及所有地图相关功能
function createMap (settings) {
    let $map = new EMap(settings);
    return $map;
}

export { esri }

export default {
    loadModules,
    createBaseMap,
    createMap,
    SymFactory,
    LayerFactory,
    esri,
    whenLoaded
}
