import { LineString, Point } from 'ol/geom';

const pointsPerMs = 2000;

function createGeometryLineString(currentCoordinates) {
  return new LineString(currentCoordinates);
}

function createGeometryPoint(currentCoordinates = []) {
  return new Point(currentCoordinates);
}

/**
 * @param {number} startTime
 * @param {number} endTime
 * @param {[number,number][]} longCoordinates
 */
export default function loopFrame(startTime, endTime, longCoordinates) {
  if (startTime === endTime) return false;
  let isReStart = false;
  let intervalRatio = (endTime - startTime) / pointsPerMs;

  if (intervalRatio > 1) intervalRatio = 1;

  const currentLen = longCoordinates.length * intervalRatio;
  const currentCoordinates = longCoordinates.slice(0, currentLen);

  if (intervalRatio === 1) {
    isReStart = true;
  }

  return {
    lastCoordinates: longCoordinates[currentLen - 1],
    currentCoordinates,
    isReStart,
    // gemo: createGeometryPoint(longCoordinates[currentLen - 1]),
    gemo: createGeometryLineString(currentCoordinates),
  };
}
