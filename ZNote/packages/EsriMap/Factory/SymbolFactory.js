import { esri } from '../base/EsriHelper.js'

export default {
    //创建PictureMarkerSymbol对象
    createPictureMarkerSymbol: function (url, width, height, xoffset, yoffset) {
        var symbol = new esri.symbols.PictureMarkerSymbol(url, width, height);
        if (xoffset != undefined && yoffset != undefined) {
            symbol.setOffset(xoffset, yoffset);
        }
        return symbol;
    },
    // 创建SimpleFillSymbol对象
    createSimpleFillSymbol: function (fillcolor, linecolor, linesize) {
        if (fillcolor.__proto__ !== Array.prototype) {
            fillcolor = [fillcolor.r, fillcolor.g, fillcolor.b, fillcolor.a];
        }
        if (linecolor.__proto__ !== Array.prototype) {
            linecolor = [linecolor.r, linecolor.g, linecolor.b];
        }
        var symbol = new esri.symbols.SimpleFillSymbol(
            esri.symbols.SimpleFillSymbol.STYLE_SOLID,
            this.createSimpleLineSymbol(linecolor, linesize),
            new esri.Color(fillcolor)
        );
        return symbol;
    },
    //创建SimpleLineSymbol对象
    createSimpleLineSymbol: function (color, size) {
        size = size || color.size || color[3] || 2;
        if (color.__proto__ !== Array.prototype) {
            color = [color.r, color.g, color.b];
        }
        var symbol = new esri.symbols.SimpleLineSymbol(
            esri.symbols.SimpleLineSymbol.STYLE_SOLID,
            new esri.Color(color),
            size
        );
        return symbol;
    }
}