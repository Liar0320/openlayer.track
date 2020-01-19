/*
 * @Author: lich
 * @Date: 2020-01-17 22:48:30
 * @Last Modified by: lich
 * @Last Modified time: 2020-01-19 11:32:40
 * 样式表
 */
import { Style, Stroke, Fill, RegularShape, Icon } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { createStyleIconImage } from './util.ol';
import { planSvg } from './asstes/svg';

export const arcStyle = new Style({
  stroke: new Stroke({
    color: '#FF0000',
    width: 2,
  }),
});

export const docStyle = new Style({
  image: new CircleStyle({
    fill: new Fill({
      color: [255, 255, 255, 0.7],
    }),
    radius: 1,
  }),
});

export const area = new Style({
  image: new RegularShape({
    points: 5, // 顶点个数
    radius1: 20, // 外圈大小
    radius2: 10, // 内圈大小
    stroke: new Stroke({
      // 设置边的样式
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      // 设置五星填充样式
      color: 'blue',
    }),
  }),
});

export const createPlanStyle = (rotation = 0) => {
  return new Style({
    image: new Icon({
      img: createStyleIconImage(planSvg),
      imgSize: [30, 30],
      rotation: -1 * rotation + (Math.PI * 1) / 2,
    }),
  });
};

export const getAreaStyle = (ratio = 1) => {
  return new Style({
    image: new CircleStyle({
      stroke: new Stroke({
        color: `rgba(0,0,0,${1 - ratio})`,
        width: 1,
      }),
      radius: 10 * ratio,
    }),
  });
};

// const style = new Style({
//   stroke: new Stroke({
//     color: '#EAE911',
//     width: 2,
//   }),
// });
