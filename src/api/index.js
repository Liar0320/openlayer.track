import featuresSourceUrl from '../asstes/route.topojson';
// eslint-disable-next-line import/prefer-default-export
export const getTrackFeatures = () => {
  return fetch(featuresSourceUrl)
    .then(response => response.json())
    .then(res => {
      const { flights } = res;

      return flights;
    });
};
