import geoJson from '@/assets/countries.geo.json';
import { Country } from '@/types/country';

function isPointInPolygon(point: [
    number,
    number
], polygon: 
    [
        number,
        number
    ][]) {
    const [px, py] = point;
    let inside = false;
  
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
  
      const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
  
    return inside;
  }

export const getCountry = (lat: number, lng: number): Country | null => {
    const point: [
        number,
        number
    ] = [lng, lat];
  
    for (const feature of geoJson.features) {
      const { geometry } = feature;
      if (geometry.type === 'Polygon') {
        if (isPointInPolygon(point, geometry.coordinates[0] as [number, number][])) {
          return {
            alpha2: feature.properties.ISO_A2,
            alpha3: feature.properties.ISO_A3,
            name: feature.properties.NAME
          };
        }
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (isPointInPolygon(point, polygon[0] as [number, number][])) {
            return {
                alpha2: feature.properties.ISO_A2,
                alpha3: feature.properties.ISO_A3,
                name: feature.properties.NAME
            };
          }
        }
      }
    }
  
    return null;
};
