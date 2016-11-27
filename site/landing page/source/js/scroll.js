
/**
* Scroll to element
* @version 1.0
* @usage - put scroll attr to an element
* @listener 'scroll-to' on _id
*/
/**
* Module
*/
const scrollTo = function() {
  'use strict';

  let scrollTo = {};

  let OFFSET = 0;

  scrollTo.scroll = (element, offset) =>  {
    offset = offset || 0;
    var amount = getScrollVal(element);
    let speed = amount < 500 ? 10000 : 2000; 
    scrollToX(amount - offset, speed);
  };

  scrollTo.attach = (offset) => {
    OFFSET = offset;
    attach();
  };

  function attach(offset) {

    let selector = "[scroll-to]";
    let elements = document.querySelectorAll(selector);
    if(!elements) return;
    for (var i = 0; i < elements.length; i++) elements[i].addEventListener('click', listener);
  }

  function listener(event) {
    event.preventDefault();
    let target = event.currentTarget.getAttribute('href');
    scrollTo.scroll(document.querySelector(target), OFFSET);
  }

   function getScrollVal(e) {
     var parent = e.offsetParent;
     var o = e.offsetTop;
     while (parent) {
         o += parent.offsetTop;
         parent = parent.offsetParent;
     }
     return o;
   }

  function scrollToX(scrollTargetY, speed, easing) {
     // scrollTargetY: the target scrollY property of the window
     // speed: time in pixels per second
     // easing: easing equation to use

     var scrollY = window.scrollY,
         scrollTargetY = scrollTargetY || 0,
         speed = speed || 2000,
         easing = easing || 'easeInOutQuint',
         currentTime = 0;

     // min time .1, max time .8 seconds
     var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

     // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
     var PI_D2 = Math.PI / 2,
         easingEquations = {
       easeOutSine: function easeOutSine(pos) {
         return Math.sin(pos * (Math.PI / 2));
       },
       easeInOutSine: function easeInOutSine(pos) {
         return -0.5 * (Math.cos(Math.PI * pos) - 1);
       },
       easeInOutQuint: function easeInOutQuint(pos) {
         if ((pos /= 0.5) < 1) {
           return 0.5 * Math.pow(pos, 5);
         }
         return 0.5 * (Math.pow(pos - 2, 5) + 2);
       }
     };

     // add animation loop
     function tick() {
       currentTime += 1 / 60;

       var p = currentTime / time;
       var t = easingEquations[easing](p);

       if (p < 1) {
         requestAnimationFrame(tick);

          window.scrollTo(0, parseInt(scrollY + (scrollTargetY - scrollY) * t));
       } else {

         window.scrollTo(0, scrollTargetY);
       }
     }
     // call it once to get started
     tick();
   }

  return scrollTo;
};

export default scrollTo();
