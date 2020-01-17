/*
 * @Author: lich
 * @Date: 2020-01-17 22:49:05
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-01-17 22:55:16
 * 利用arc创建lineString要素
 */
/* eslint-disable import/prefer-default-export */
// @ts-ignore
import { LineString } from 'ol/geom';
import { Feature } from 'ol';
import featuresSourceUrl from './asstes/route.topojson';

/**
 * 根据起始点，结束点 创建LineString 线段
 * @param {[[number,number],[number,number]]} coordinate
 */
function createFeature(coordinate) {
  const features = [];
  const from = coordinate[0];
  const to = coordinate[1];

  // create an arc circle between the two locations
  const arcGenerator = new arc.GreatCircle(
    { x: from[1], y: from[0] },
    { x: to[1], y: to[0] },
  );

  const arcLine = arcGenerator.Arc(100, { offset: 0.5 });

  if (arcLine.geometries.length === 1) {
    /** @FIXME: 使用arcLine会产生跨坐标 */
    const getcoords = arcLine.geometries[0].coords.map(coords => {
      if (coords[0] < 0) coords[0] += 360;
      if (coords[0] > 350) {
        coords[0] -= 360;
      }

      return coords;
    });

    const line = new LineString(getcoords);

    line.transform('EPSG:4326', 'EPSG:3857');

    const feature = new Feature({
      geometry: line,
      finished: false,
    });

    features.push(feature);
  }

  return features;
}

export const getTrackFeatures = () => {
  return fetch(featuresSourceUrl)
    .then(response => response.json())
    .then(res => {
      const { flights } = res;
      let features = [];

      if (flights instanceof Array) {
        flights.forEach(coordinate => {
          // eslint-disable-next-line no-underscore-dangle
          const _features = createFeature(coordinate);

          features = features.concat(_features);
        });
      }

      return features;
    });
};
