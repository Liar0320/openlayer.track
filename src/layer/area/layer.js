import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createAreaFeature } from './feature';

let featuresCollection = [];

const areaLayer = new VectorLayer({
  source: new VectorSource({
    // features: featuresCollection,
  }),
});

createAreaFeature().then(features => {
  featuresCollection = features;
  areaLayer.getSource().addFeatures(featuresCollection);
});

areaLayer.on('postrender', evt => {
  console.log('area');
});

// eslint-disable-next-line import/prefer-default-export
export const areaLayerInstance = areaLayer;
