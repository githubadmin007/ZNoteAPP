import { esri } from '../../base/EsriHelper.js'
import ViewHelper from './ViewHelper.js'

export default function ($map) {
    let _viewLst = {};
    this.$map = $map;
    // 创建2D视图
    this.create2DView = function (id, settings) {
        if (_viewLst[id]) throw "id为“" + id + "”的view已存在";
        settings.map = settings.map || $map.map;
        let view = new esri.views.MapView(settings);
        _viewLst[id] = new ViewHelper(view);
        return _viewLst[id];
    }
    // 创建3D视图
    this.create3DView = function (id, settings) {
        if (_viewLst[id]) throw "id为“" + id + "”的view已存在";
        settings.map = settings.map || $map.map;
        let view = new esri.views.SceneView(settings);
        _viewLst[id] = new ViewHelper(view);
        return _viewLst[id];
    }
    // 获取视图帮助对象
    this.getView = function (id) {
        return _viewLst[id];
    }
}