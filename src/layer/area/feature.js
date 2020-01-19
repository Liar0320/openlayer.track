import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { getTrackFeatures } from '@/api/index';
import { getAreaStyle } from '@/style';

function createArea(coordinate) {
  const feature = new Feature({
    geometry: new Point(fromLonLat(coordinate)),
    createTime: new Date().getTime(),
  });

  // feature.setStyle(getAreaStyle());

  return feature;
}

// eslint-disable-next-line import/prefer-default-export
export const createAreaFeature = async () => {
  const list = await getTrackFeatures();

  return list.map(coordinates => {
    return createArea([coordinates[1][1], coordinates[1][0]]);
  });
};
