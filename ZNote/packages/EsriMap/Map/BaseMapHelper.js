export default function (basemap) {
    var _baseLayerLst = {};
    this.basemap = basemap;
    this.id = basemap.id;
    this.title = basemap.title;
    this.thumbnailUrl = basemap.thumbnailUrl;
    // 获取baseLayer
    this.getBaseLayer = function (layerid) {
        let layer = null;
        if (layerid) {
            layer = _baseLayerLst[layerid];
        }
        return layer;
    }
    // 创建baseLayer
    this.addBaseLayer = function (layer, layerid) {
        layerid = layerid || layer.id
        if (_baseLayerLst[layerid]) {
            throw 'id为' + layerid + '的图层已存在!';
        }
        this.basemap.baseLayers.push(layer);
        _baseLayerLst[layerid] = layer;
    }
}