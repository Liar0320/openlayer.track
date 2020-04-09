import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { linear } from 'ol/easing';
import { createAreaFeature } from './feature';
import { getAreaStyle } from '@/style';

/** @type {import("ol/Feature").default[]} */
let featuresCollection = [];

const areaLayer = new VectorLayer({
  source: new VectorSource({
    // wrapX: false,
    // features: featuresCollection,
  }),
  style(featureLike) {
    // console.log(featureLike, number);

    return getAreaStyle(featureLike.get('elapsedRatio'));
  },
});

createAreaFeature().then(features => {
  featuresCollection = features;
  areaLayer.getSource().addFeatures(featuresCollection);
});

areaLayer.on('postrender', evt => {
  const { time } = evt.frameState;

  featuresCollection.forEach(feature => {
    const elapsed = (time - feature.get('createTime')) % 2000;

    feature.set('elapsedRatio', linear(elapsed / 2000));
  });
});

// eslint-disable-next-line import/prefer-default-export
export const areaLayerInstance = areaLayer;
