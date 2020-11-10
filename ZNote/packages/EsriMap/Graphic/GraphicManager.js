import { esri } from '../base/EsriHelper.js'

export default function ($map) {
    this.$map = $map;
    var _graLayerLst = {};
    var _eventLst = {};
    // 获取GraphicLayer
    this.getGraphicLayer = function (layerid) {
        var layer;
        if (layerid) {
            layer = _graLayerLst[layerid];
        }
        else {
            layer = $map.map.graphics;
        }
        return layer;
    }
    // 创建GraphicLayer，如果图层已存在，会直接返回已存在的图层
    this.createGraphicLayer = function (layerid) {
        var layer = this.getGraphicLayer(layerid);
        if (!layer) {
            layer = new esri.layers.GraphicsLayer();
            layer.layerid = layerid;//图层id
            _graLayerLst[layerid] = layer;
            $map.map.add(layer);
        }            
        return layer;
    }
    // 显示图层
    this.showGraphicLayer = function (layerid) {
        let layer = this.getGraphicLayer(layerid);
        if (layer) {
            layer.visible = true;
        }
    }
    // 隐藏图层
    this.hideGraphicLayer = function (layerid) {
        let layer = this.getGraphicLayer(layerid);
        if (layer) {
            layer.visible = false;
        }
    }
    
    // 创建Graphic
    this._createGraphic = function (geometry, symbol, attributes) {
        var graphic = new esri.Graphic({
            geometry: geometry,
            symbol: symbol,
            attributes: attributes
        });
        // 部分symbol在创建graphic后为空
        if (!graphic.symbol) {
            graphic.setSymbol(symbol);
        }
        return graphic;
    }
    // 添加一个Graphic
    this.addGraphic = function (geometry, symbol, attributes, layerid) {
        var layer = this.createGraphicLayer(layerid);
        var gra = this._createGraphic(geometry, symbol, attributes);
        layer.add(gra);
        return gra;
    }
    // 添加多个Graphic
    this.addGraphics = function (geometrys, symbol, attributes, layerid) {
        var layer = this.createGraphicLayer(layerid);
        for (let i = 0; i < geometrys.length; i++) {
            var gra = this._createGraphic(geometrys[i], symbol, attributes);
            layer.add(gra);
        }
    }
    // 移除Graphic
    this.removeGraphic = function (key, value, layerid) {
        var layer = this.getGraphicLayer(layerid);
        if (!layer) return;
        // key不为空，移除符合条件的Graphic
        if (key) {
            for (var i = 0; i < layer.graphics.length; i++) {
                var g = layer.graphics.items[i];
                if (g == null || g.attributes == null) break;
                // graphic有key属性，且值相等或要删除的值为空
                if (g.attributes[key] != undefined && (value == null || g.attributes[key] == value)) {
                    layer.remove(g);
                    i--;
                }
            }
        }
        // key为空，移除整个图层
        else {
            layer.clear();
        }
    }
    // 移除符合筛选函数的Graphic
    this.removeGraphicByFilter = function (layerid, filter) {
        var layer = this.getGraphicLayer(layerid);
        if (!layer) return;
        for (var i = 0; i < layer.graphics.length; i++) {
            var g = layer.graphics.items[i];
            if (g == null || g.attributes == null) break;
            if (filter(g.attributes)){
                layer.remove(g);
                i--;
            }
        }
    }

    //触发事件
    this.callEvent = function (layerid, event, param) {
        if (_eventLst[layerid] && _eventLst[layerid][event] ) {
            for(let i = 0; i < _eventLst[layerid][event].length; i++){
                _eventLst[layerid][event][i](param);
            }
        }
    }
    /*绑定事件*//*    
        支持以下事件:
        1.点击：click
        2.鼠标移动：mouse-move
        3.鼠标进入：mouse-enter
        4.鼠标移出：mouse-leave
        注意事项：
        如果callback中有异步操作，且需要使用graphic对象时，请使用临时变量保存graphic，以免由于触发其他事件引起graphic对象改变
    */
    this.addEvent = function (layerid, event, callback) {
        if (!_eventLst[layerid]) {
            _eventLst[layerid] = {};
        }
        if (!_eventLst[layerid][event]) {
            _eventLst[layerid][event] = [];
        }
        _eventLst[layerid][event].push(callback);
    }
    //移除事件
    this.removeEvent = function (layerid, event, callback) {
        if (!_eventLst[layerid] || !_eventLst[layerid][event]) return;
        if (callback) {
            _eventLst[layerid][event].remove(callback);
        } else {
            _eventLst[layerid][event] = [];
        }
    }
}