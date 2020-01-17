import { Style, Stroke, Fill, RegularShape, Icon } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { createStyleIconImage } from './util.ol';
import { planSvg } from './asstes/svg';

export const arcStyle = new Style({
  stroke: new Stroke({
    // color: [0, 122, 122, 0.7],
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
      rotation,
      // color: '#FF0000',
      // crossOrigin: 'anonymous',
      // src: plane,
    }),
  });
};

// const style = new Style({
//   stroke: new Stroke({
//     color: '#EAE911',
//     width: 2,
//   }),
// });
