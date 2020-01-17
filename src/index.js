import 'ol/ol.css';
import Map from 'ol/Map';
import { View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { trackLayerInstance } from './track.layer';

document.querySelector('#map').style.height = `${window.innerHeight}px`;

const collectionLonLat = {
  hangzhou: [120.12, 30.16],
};

window.map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat(collectionLonLat.hangzhou),
    zoom: 8,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    trackLayerInstance,
  ],
});
