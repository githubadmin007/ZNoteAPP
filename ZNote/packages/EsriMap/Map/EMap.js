import { esri } from '../base/EsriHelper.js'
import ViewManager from '../View/src/ViewManager.js'
import GraphicManager from '../Graphic/GraphicManager.js'
import GeometryFactory from '../Factory/GeometryFactory'
import BaseMapMgr from './BaseMapManager.js'

export default function (settings) {
    this.map = new esri.Map(settings);
    this.ViewMgr = new ViewManager(this);
    this.GraphicMgr = new GraphicManager(this);
    this.BaseMapMgr = new BaseMapMgr(this);
    this.GeoFactory = new GeometryFactory(this);
}