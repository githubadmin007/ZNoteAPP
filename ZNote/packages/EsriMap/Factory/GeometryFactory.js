import { esri } from '../base/EsriHelper.js'

function GeometryFactory (spatialReference) {
    this.spatialReference = spatialReference;
    // 创建点
    this.createPoint = function (xy, spatialReference) {
        spatialReference = spatialReference || this.spatialReference;
        var point = new esri.geometry.Point({
            x: xy[0],
            y: xy[1],
            spatialReference: spatialReference
        });
        return point;
    };
    // 创建线
    this.createPolyline = function (paths, spatialReference) {
        spatialReference = spatialReference || this.spatialReference;
        var polyline = new esri.geometry.Polyline({
            paths: paths,
            spatialReference: spatialReference
        })
        return polyline;
    };
    // 创建面
    this.createPolygon = function (rings, spatialReference) {
        spatialReference = spatialReference || this.spatialReference;
        var polygon = new esri.geometry.Polygon({
            rings: rings,
            spatialReference: spatialReference
        })
        return polygon;
    };
    // 创建园
    this.createCircle = function (xy, radius, spatialReference) {
        spatialReference = spatialReference || this.spatialReference;
        let center = this.createPoint(xy, spatialReference);
        let circle = new esri.geometry.Circle({
            center: center,
            radius: radius,
            spatialReference: spatialReference
        });
        return circle;
    };
    // 创建Extent
    this.createExtent = function (x1, y1, x2, y2, spatialReference) {
        spatialReference = spatialReference || this.spatialReference;
        let extent = new esri.geometry.Extent(x1, y1, x2, y2, spatialReference);
        return extent;
    };
}


export default GeometryFactory
