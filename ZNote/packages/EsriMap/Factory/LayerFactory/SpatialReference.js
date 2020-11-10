import { esri } from '../../base/EsriHelper'

export function getSpatialReference (type) {
    switch (type) {
        case 'FS2000': return new esri.geometry.SpatialReference({
            wkt: 'PROJCS["CGCS2000 3 Degree GK CM 113E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",700000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",113.0],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
        });
        case 'CGCS2000': return new esri.geometry.SpatialReference({
            wkid: 4490
        });
    }
    return null;
}
