import { esri } from '../../base/EsriHelper'
import { getSpatialReference } from './SpatialReference'

export function getExtent (type) {
    switch (type) {
        case 'FS2000': return new esri.geometry.Extent(
            636806.1763627448, 2505322.910348881,
            739828.8808111908, 2608333.671198159,
            getSpatialReference('FS2000')
        );
        case 'CGCS2000': return new esri.geometry.Extent(
            -180.0, -90.0, 
            180.0, 90.0, 
            getSpatialReference('CGCS2000')
        );
    }
    return null;
}
