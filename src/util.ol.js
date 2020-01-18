/*
 * @Author: lich
 * @Date: 2020-01-17 22:54:34
 * @Last Modified by: lich
 * @Last Modified time: 2020-01-18 22:45:47
 * ol的工具库
 */
import { LineString, Point } from 'ol/geom';
/**
 * @typedef {[number,number]} coord 坐标
 */

/**
 * 根据坐标点集合 生成线段
 * @param {coord[]} currentCoordinates
 */
function createGeometryLineString(currentCoordinates) {
  return new LineString(currentCoordinates);
}

/**
 * 根据坐标点生成point要素
 * @param {coord | []} currentCoordinates
 */
function createGeometryPoint(currentCoordinates = []) {
  return new Point(currentCoordinates);
}

/**
 * 根据经纬度获取旋转的弧度
 * @param {coord} start 起始点位置
 * @param {coord} end 终点位置
 */
export function getRotation(start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const rotation = Math.atan2(dy, dx);

  return rotation;
}

/** 从起始点到终点的时间间隔 */
const pointsPerMs = 2000;

/**
 * 根据endTime计算当前帧的属性 生成LineString线段 和 Point末端位置 和 末端的Rotation角度 和 当前帧是否为最后一帧 isReStart
 * @param {number} startTime
 * @param {number} endTime
 * @param {coord[]} longCoordinates
 */
export default function loopFrame(startTime, endTime, longCoordinates) {
  if (startTime === endTime) return false;
  let isReStart = false;
  let intervalRatio = (endTime - startTime) / pointsPerMs;

  if (intervalRatio > 1) intervalRatio = 1;

  const currentLen = parseInt(longCoordinates.length * intervalRatio, 10);
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
    /** 结束点坐标 */
    lastCoordinates,
    /** 从起始点到结束点的坐标集合 */
    currentCoordinates,
    /** 当前是否为最后一个点 */
    isReStart,
    /** 当前的角度 */
    rotation,
    /** 线段要素 */
    lineString: createGeometryLineString(currentCoordinates),
    /** 点要素 */
    point: createGeometryPoint(lastCoordinates),
  };
}

/**
 * 使用svg创建  HTMLImageElement
 * @param { string } svgStr svg字符串
 * @exmaple
 * <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="30" height="30">
 *    <path d="M256.004 390.23c-11.782 0-21.344 9.546-21.344 21.344v24.078c0 11.78 9.562 21.328 21.344 21.328s21.344-9.546 21.344-21.328v-24.078c0-11.798-9.562-21.344-21.344-21.344zM128.006 454.008c-11.78 0-21.342 9.546-21.342 21.328v25.234c0 11.782 9.562 21.328 21.342 21.328 11.782 0 21.344-9.546 21.344-21.328v-25.234c0-11.78-9.562-21.328-21.344-21.328zM767.996 390.23c-11.782 0-21.344 9.546-21.344 21.344v24.078c0 11.78 9.562 21.328 21.344 21.328s21.342-9.546 21.342-21.328v-24.078c0-11.798-9.56-21.344-21.342-21.344zM895.992 454.008c-11.782 0-21.344 9.546-21.344 21.328v25.234c0 11.782 9.562 21.328 21.344 21.328s21.344-9.546 21.344-21.328v-25.234c0-11.78-9.562-21.328-21.344-21.328z" fill="#CCD1D9" p-id="2094"></path><path d="M21.354 682.692c-4.876 0-9.624-1.688-13.468-4.812a21.39 21.39 0 0 1-7.876-16.562v-85.308c0-8.032 4.532-15.376 11.688-19.032l405.336-205.59c10.5-5.328 23.342-1.14 28.656 9.376 5.344 10.5 1.124 23.344-9.376 28.672l-8.874 165.7c11.53-2.406 22.812 5 25.218 16.532s-5 22.844-16.532 25.218l-410.43 85.34c-1.436 0.278-2.904 0.466-4.342 0.466zM1002.646 682.692c-1.438 0-2.876-0.188-4.344-0.468l-410.43-85.34c-11.53-2.376-18.936-13.688-16.53-25.218s13.686-18.938 25.216-16.532l-8.876-165.7c-10.498-5.328-14.716-18.172-9.374-28.672 5.31-10.516 18.154-14.704 28.686-9.376l405.304 205.59a21.336 21.336 0 0 1 11.688 19.032v85.308c0 6.438-2.876 12.5-7.876 16.562a21.314 21.314 0 0 1-13.464 4.814z" fill="#E6E9ED" p-id="2095"></path><path d="M451.626 748.942c-7-3.5-15.376-2.938-21.812 1.562l-122.03 85.34a21.346 21.346 0 0 0-9.124 17.468v85.376c0 6.876 3.312 13.312 8.906 17.312 3.688 2.624 8.032 4 12.438 4 2.312 0 4.624-0.376 6.844-1.124l125.778-42.688a21.286 21.286 0 0 0 14.468-20.812l-3.718-127.996a21.332 21.332 0 0 0-11.75-18.438zM716.214 835.844l-122.03-85.34c-6.438-4.5-14.81-5.062-21.81-1.562s-11.532 10.624-11.75 18.438l-3.718 127.996a21.286 21.286 0 0 0 14.468 20.812l125.778 42.688c2.218 0.75 4.532 1.124 6.844 1.124 4.406 0 8.75-1.376 12.438-4 5.594-4 8.906-10.438 8.906-17.312v-85.376c0-6.936-3.406-13.468-9.126-17.468z" fill="#4A89DC" p-id="2096"></path><path d="M575.032 960h-128a21.314 21.314 0 0 1-21.312-20.688c-0.876-28.75-21.344-704.798-21.344-747.298 0-26.688 10.094-62.156 25.75-90.358C451.25 63.626 480 42.688 511.032 42.688c31.032 0 59.782 20.938 80.874 58.968 15.656 28.202 25.782 63.67 25.782 90.358 0 42.5-20.468 718.548-21.344 747.298A21.32 21.32 0 0 1 575.032 960z" fill="#5D9CEC" p-id="2097"></path><path d="M573.656 184.468c-0.938-2.468-4.75-11.172-14.594-19.454-8.5-7.14-23.718-15.672-48.032-15.672-38.968 0-57.686 22.078-62.624 35.124-4.156 11.032 1.406 23.344 12.406 27.5 2.5 0.938 5.032 1.39 7.532 1.39a21.4 21.4 0 0 0 19.624-12.906c0.75-1.312 5.624-8.438 23.062-8.438s22.312 7.124 23.062 8.438c4.5 10.422 16.438 15.562 27.156 11.514 11.002-4.168 16.564-16.48 12.408-27.496z" fill="#F5F7FA" p-id="2098"></path><path d="M511.032 981.312c-11.782 0-21.344-9.532-21.344-21.312v-149.308c0-11.812 9.562-21.376 21.344-21.376s21.344 9.562 21.344 21.376V960c0 11.782-9.564 21.312-21.344 21.312z" fill="#4A89DC" p-id="2099">
 *    </path>
 * </svg>
 */
export function createStyleIconImage(svgStr) {
  function addSvgPrefix(str) {
    const prefix = 'data:image/svg+xml,';

    return prefix + escape(str);
  }

  const image = new Image();

  image.src = addSvgPrefix(svgStr);

  return image;
}
