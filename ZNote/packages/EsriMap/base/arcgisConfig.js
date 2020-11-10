let apiBasePath = "https://js.arcgis.com/4.14/"; 

let arcgisConfig = {
    setBasePath (basePath) {
        apiBasePath = basePath;
    },
    getStylePath () {
        return apiBasePath + "esri/themes/light/main.css";
    },
    getScriptPath () {
        return apiBasePath;
    }
}

export default arcgisConfig;

export const DefaultLoadModules = [
    "esri/Basemap",
    "esri/Color",
    "esri/config",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/geometry/Circle",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/Polyline",
    "esri/geometry/SpatialReference",
    "esri/geometry/support/webMercatorUtils",
    "esri/layers/BaseTileLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/MapImageLayer",
    'esri/layers/support/TileInfo',
    'esri/layers/TileLayer',
    "esri/layers/WebTileLayer",
    "esri/layers/WMTSLayer",
    "esri/Map",
    "esri/request",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/views/draw/Draw",
    "esri/views/MapView",
    "esri/views/SceneView",
]