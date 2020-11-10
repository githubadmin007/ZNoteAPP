import { esri } from '../base/EsriHelper.js'
import BaseMapHelper from './BaseMapHelper.js'

export default function ($map) {
    this.currentId = null;
    let _baseMapLst = this.baseMapLst = {};
    this.$map = $map;
    // 设置当前BaseMap
    this.setCurrentById = function (id) {
        let $basemap = this.getBaseMap(id);
        if ($basemap) {
            $map.map.basemap = $basemap.basemap;
            this.currentId = id;
        }
    }
    // 获取BaseMap
    this.getBaseMap = function (id) {
        let basemap = null;
        if (id) {
            basemap = _baseMapLst[id];
        }
        return basemap;
    }
    // 创建BaseMap
    this.createBaseMap = function (baseLayers, id, title, thumbnailUrl) {
        let basemap = this.getBaseMap(id);
        if (!basemap) {
            let _basemap = new esri.Basemap({ baseLayers, id, title, thumbnailUrl });
            basemap = new BaseMapHelper(_basemap);
            _baseMapLst[id] = basemap;
            _baseMapLst = this.baseMapLst = Object.assign({}, _baseMapLst);// 复制一下对象，使之能被Vue监听到
        }            
        return basemap;
    }
    // 通过id创建BaseMap
    this.createBaseMapFromId = function (fromId, id, title, thumbnailUrl) {
        let basemap = this.getBaseMap(id);
        if (!basemap) {
            let _basemap = esri.Basemap.fromId(fromId);
            if (id) _basemap.id = id;
            if (title) _basemap.title = title;
            if (thumbnailUrl) _basemap.thumbnailUrl = thumbnailUrl;
            basemap = new BaseMapHelper(_basemap);
            _baseMapLst[_basemap.id] = basemap;
            _baseMapLst = this.baseMapLst = Object.assign({}, _baseMapLst);// 复制一下对象，使之能被Vue监听到
        }            
        return basemap;
    }
}