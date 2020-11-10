import { esri } from '../../base/EsriHelper'
import { getSpatialReference } from './SpatialReference'

const config_FS2000 = {
    "dpi": "90.714285714274296",
    "format": "image/png",
    "compressionQuality": 0,
    "rows": 256,
    "cols": 256,
    "origin": {
        "x": -4923200.0,
        "y": 1.00021E7
    },
    "lods": [
        { "level": 7, "resolution": 1222.994898823131, "scale": 4622333.68 },
        { "level": 8, "resolution": 611.4974494115655, "scale": 2311166.84 },
        { "level": 9, "resolution": 305.74872470578276, "scale": 1155583.42 },
        { "level": 10, "resolution": 152.87436235289138, "scale": 577791.71 },
        { "level": 11, "resolution": 76.43717985352637, "scale": 288895.85 },
        { "level": 12, "resolution": 38.2185912496825, "scale": 144447.93 },
        { "level": 13, "resolution": 19.10929430192194, "scale": 72223.96 },
        { "level": 14, "resolution": 9.55464715096097, "scale": 36111.98 },
        { "level": 15, "resolution": 4.777323575480485, "scale": 18055.99 },
        { "level": 16, "resolution": 2.3886631106595546, "scale": 9028 },
        { "level": 17, "resolution": 1.1943315553297773, "scale": 4514 },
        { "level": 18, "resolution": 0.5971657776648887, "scale": 2257 },
        { "level": 19, "resolution": 0.2985828888324443, "scale": 1128.5 },
        { "level": 20, "resolution": 0.14929144441622216, "scale": 564.25 },
        { "level": 21, "resolution": 0.074645722208111082, "scale": 282.125 }
    ]
}
const config_CGCS2000 = {
    "dpi": "90.714285714274296",
    "format": "image/png",
    "compressionQuality": 0,
    "rows": 256,
    "cols": 256,
    "origin": {
        "x": -180,
        "y": 90
    },
    "lods": [
        { "level": 1, "resolution": 0.703125, "scale": 295829355.4545656 },
        { "level": 2, "resolution": 0.3515625, "scale": 147914677.7272828 },
        { "level": 3, "resolution": 0.17578125, "scale": 73957338.8636414 },
        { "level": 4, "resolution": 0.087890625, "scale": 36978669.4318207 },
        { "level": 5, "resolution": 0.0439453125, "scale": 18489334.71591035 },
        { "level": 6, "resolution": 0.02197265625, "scale": 9244667.357955175 },
        { "level": 7, "resolution": 0.010986328125, "scale": 4622333.678977588 },
        { "level": 8, "resolution": 0.0054931640625, "scale": 2311166.839488794 },
        { "level": 9, "resolution": 0.00274658203125, "scale": 1155583.419744397 },
        { "level": 10, "resolution": 0.001373291015625, "scale": 577791.7098721985 },
        { "level": 11, "resolution": 0.0006866455078125, "scale": 288895.85493609926 },
        { "level": 12, "resolution": 0.00034332275390625, "scale": 144447.92746804963 },
        { "level": 13, "resolution": 0.000171661376953125, "scale": 72223.96373402482 },
        { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36111.98186701241 },
        { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18055.990933506204 },
        { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9027.995466753102 },
        { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4513.997733376551 },
        { "level": 18, "resolution": 0.000005364418029785155, "scale": 2256.998866688275 }
    ]
}

export function getTileInfo (type, minLod, maxLod) {
    minLod = minLod || 0;
    maxLod = maxLod || 21
    let TileConfig = null;
    switch (type) {
        case 'FS2000': 
            TileConfig = config_FS2000;
            break;
        case 'CGCS2000': 
            TileConfig = config_CGCS2000;
            break;
    }
    TileConfig.spatialReference = getSpatialReference(type);
    TileConfig.lods = TileConfig.lods.filter(lod => lod.level >= minLod && lod.level <= maxLod)
    return new esri.layers.support.TileInfo(TileConfig);
}
