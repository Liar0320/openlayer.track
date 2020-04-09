import Map from 'ol/Map';
import { View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';
import { trackLayerInstance } from './layer/track/track.layer';
import { areaLayerInstance } from './layer/area/layer';

document.querySelector('#map').style.height = `${window.innerHeight}px`;

const collectionLonLat = {
  hangzhou: [120.12, 30.16],
};

window.map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat(collectionLonLat.hangzhou),
    zoom: 1,
    multiWorld: false,
    /** 限制当前屏幕内的范围  view.calculateExtent() */
    extent: [
      -6665811.10870122,
      -7201514.726165477,
      33409205.576877266,
      14249780.67741473,
    ],
  }),
  layers: [
    new TileLayer({
      // source: new OSM({
      //   // wrapX: false,
      // }),
      source: new XYZ({
        url: `https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`,
      }),
    }),
    trackLayerInstance,
    areaLayerInstance,
  ],
});
