/*
 * @Author: lich
 * @Date: 2020-01-17 22:50:36
 * @Last Modified by: lich
 * @Last Modified time: 2020-01-18 22:57:01
 * 利用 postrender 渲染， 实现动画效果
 */
/**
 * @typedef {import("ol/Feature").default} feature
 */
/* eslint-disable import/prefer-default-export */
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { getVectorContext } from 'ol/render';
import { createTrackFeatures } from './track.feature';
import { arcStyle, createPlanStyle } from '../../style';
import loopFrame from '../../util.ol';

/** 创建图层 */
const trackLayer = new VectorLayer({
  source: new VectorSource(),
  // style: arcStyle,
});

/** @type {feature[]} */
let featureCollection = [];
/** 往图层中添加 矢量元素 */

createTrackFeatures().then((_featureCollection = []) => {
  featureCollection = _featureCollection;
  trackLayer.getSource().addFeatures(featureCollection);
});

/**
 * @param {feature} feature
 */
const getCoordinates = feature => feature.getGeometry().getCoordinates();

/**
 * 图层 在映射帧呈现后触发
 * 每帧触发前
 * 画一条全路程轨迹 在路程的开始结尾创建一个 地标（landmark-start）（landmark-end）
 * 创建一个点 使点根据轨迹运行， 往复。          movingArm
 */
trackLayer.on('postrender', evt => {
  /** 获取向量的上下文 */
  const vectorContext = getVectorContext(evt);
  const { time } = evt.frameState;

  featureCollection.forEach(feature => {
    let starTime = feature.get('startTime');

    if (typeof starTime !== 'number') {
      feature.set('startTime', time);
      starTime = time;
    }

    const current = loopFrame(starTime, time, getCoordinates(feature));

    if (current === false) return;
    /** 设置线段样式 */
    vectorContext.setStyle(arcStyle);
    /** 绘制线段 */
    vectorContext.drawGeometry(current.lineString);

    /** 设置点样式 */
    vectorContext.setStyle(createPlanStyle(current.rotation));
    /** 绘制当前坐标的样式 */
    vectorContext.drawGeometry(current.point);

    if (current.isReStart) {
      feature.set('startTime', time);
    }
  });

  window.map.render();
});

export const trackLayerInstance = trackLayer;
