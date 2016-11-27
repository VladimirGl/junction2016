
import scale from '../../core/scale';
/**
* Module
*/
const heatInstance = function() {
  'use strict';

  let heatInstance = {};
  let instance;
  let _element;

  heatInstance.init = function(selector) {

    _element = getElement(selector);
    // create a heatmap instance
    instance = h337.create({
      container: _element,
      maxOpacity: 0.6,
      radius: 50,
      blur: 0.90,
      // backgroundColor with alpha so you can see through it
      backgroundColor: 'rgba(0, 0, 58, 0)'
    });

  //  addEvents(_element);
    addInitial();
    //addTestCases();
    return instance;
  };

  function addInitial() {
    var data = {
      max: 200,
      min: 0,
      data: []
    };
    instance.setData(data);
  }
  heatInstance.destroy = function () {
    let el = _element.querySelector('canvas');
    console.log(el);
    _element.removeChild(el);
  };
  heatInstance.setData = (data)=>{
    instance.addData(data);
    if(scale.should()){
      let c = _element.querySelector('canvas');
      c.style.height = 500 * scale.getWidthPercent() + "px";
      c.style.width = "100%";
    }
  };

  function addEvents(element) {
    element.parentElement.addEventListener('click', addTestPoint);
  }
  function getElement(s) {
    return document.querySelector(s);
  }

  function addTestCases() {
    let times = 5;
    let interval = window.setInterval(function () {
      if(times){
        times --;
        addPoint({ x: 500, y:times*100, value: 10 });
      }
      else window.clearInterval(interval);
    }, 1000);
  }

  function addPoint(point) {
    instance.addData(point);
  }

  function addTestPoint(event) {
    var x = event.layerX;
    var y = event.layerY;
    instance.addData({ x: x, y: y, value: 100 });
    console.log(event);
  }

  return heatInstance;
};

export default heatInstance();
