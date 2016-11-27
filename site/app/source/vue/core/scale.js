/**
* Module
*/
const scale = function() {
  'use strict';

  let scale = {};

  const WIDTH = 720;
  const HEIGHT = 500;
  scale.getWidth = ()=>{
    return WIDTH;
  };

  scale.should = ()=>{
    let screen = window.innerWidth;
    return screen < WIDTH;
  };
  scale.getCoordinates = (pointArray)=>{
    let screen = window.innerWidth;
    let percent = screen / WIDTH;
    return pointArray.map((item) => {
      item.x = Math.floor(percent * item.x);
      item.y = Math.floor(percent * item.y);
      return item;
    });
  };
  scale.getHeatValues = (pointArray)=>{
    let screen = window.innerWidth;
    let percent = screen / WIDTH;
    let percentY = screen / (HEIGHT * scale.getWidthPercent() );
    return pointArray.map((item) => {
      item.x = Math.floor(percent * item.x);
      item.y = Math.floor(percentY * item.y);
      return item;
    });
  };
  scale.scaleValues = (pointArray)=>{
    let screen = window.innerWidth;
    let percent = screen / WIDTH;
    return pointArray.map((item) => {
      item.value = Math.floor(percent * item.value * 1.5);
      return item;
    });
  };
  scale.getScaled = (coord)=>{
    let screen = window.innerWidth;
    let percent = screen / WIDTH;
    return Math.floor(percent * coord);
  };
  scale.getWidthPercent = ()=>{
    let screen = window.innerWidth;
    return  screen / WIDTH;
  };

  return scale;
};

export default scale();
