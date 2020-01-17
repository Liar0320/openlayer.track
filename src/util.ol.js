import { LineString, Point } from 'ol/geom';

const pointsPerMs = 2000;

function createGeometryLineString(currentCoordinates) {
  return new LineString(currentCoordinates);
}

function createGeometryPoint(currentCoordinates = []) {
  return new Point(currentCoordinates);
}

/** 根据经纬度获取旋转的弧度 */
export function getRotation(start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const rotation = Math.atan2(dy, dx);

  return rotation;
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

  const currentLen = parseInt(longCoordinates.length * intervalRatio);
  const currentCoordinates = longCoordinates.slice(0, currentLen);

  if (intervalRatio === 1) {
    isReStart = true;
  }

  const lastCoordinates = currentCoordinates[currentLen - 1] || [];
  let rotation = 0;

  if (currentLen >= 2) {
    rotation = getRotation(
      currentCoordinates[currentCoordinates.length - 2],
      currentCoordinates[currentCoordinates.length - 1],
    );
  }

  return {
    lastCoordinates,
    currentCoordinates,
    isReStart,
    rotation,
    // gemo: createGeometryPoint(longCoordinates[currentLen - 1]),
    gemo: createGeometryLineString(currentCoordinates),
  };
}

/** 使用svg创建样式 */
export function createStyleIconImage(svgStr) {
  function addSvgPrefix(str) {
    const prefix = 'data:image/svg+xml,';

    return prefix + escape(str);
  }

  const image = new Image();

  image.src = addSvgPrefix(svgStr);

  return image;
}
