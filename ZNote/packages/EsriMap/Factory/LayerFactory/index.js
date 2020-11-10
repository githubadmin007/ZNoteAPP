import { esri } from '../../base/EsriHelper'
import { getTileInfo } from './TileInfo'
import { getSpatialReference } from './SpatialReference'
import { getExtent } from './Extent'

export default {
    // 创建WebTileLayer
    createWebTileLayer (url, type, id, title) {
        id = id || new Date().toString();
        return new esri.layers.WebTileLayer(url, {
            id: id,
            title: title,
            tileInfo: getTileInfo(type),
            spatialReference: getSpatialReference(type),
            fullExtent: getExtent(type)
        });
    },
    createMapImageLayer (url, id, title) {
        return new esri.layers.MapImageLayer({
            id: id,
            title: title,
            url: url
        })
    },
    createTileLayer (url, id, title) {
        return new esri.layers.TileLayer({
            id: id,
            title: title,
            url: url
        })
    }
}