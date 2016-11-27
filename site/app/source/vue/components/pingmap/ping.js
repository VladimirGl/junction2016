
import store from '../../core/store';
import scale from '../../core/scale';
/**
* Module
*/
const ping = function() {
  'use strict';

  const WIDTH = 720;

  let ping = {};
  let _data;
  let _selector;
  let _svg;
  let _element;
  let _I = 1;
  let _made = false;
  const USER_AMOUNT = 1;
  const MAX_POINTS = USER_AMOUNT * 8;
  let _pinnedUsers = [];
  let _tips = [{}, {}, {}];
  let _shouldShowTip = false;

  let _accepted = [];

  let _points = [];
  let _text = [];
  let _colors = ['#45CCFF', '#FFD432', '#B243FF'];

    var xscale = d3.scale.linear()
                 .domain([0,50.0])
                 .range([0,720]),
      yscale = d3.scale.linear()
                 .domain([0,50])
                 .range([0,500]),
      map = d3.floorplan().xScale(xscale).yScale(yscale),
      imagelayer = d3.floorplan.imagelayer(),
      heatmap = d3.floorplan.heatmap(),
      vectorfield = d3.floorplan.vectorfield(),
      pathplot = d3.floorplan.pathplot(),
      overlays = d3.floorplan.overlays().editMode(true),
      mapdata = {};

    let screen = window.innerWidth;
    let base = 50;
    let __h = base;
    let __w = base;
    if(scale.should()) {
      __h = scale.getScaled(__h) *.95;
      __w = scale.getScaled(__w);
    }console.log(__h, __w);
    mapdata[imagelayer.id()] = [{
        url: 'images/room.png',
        x: 0,
        y: 0,
        height: __h,
        width: __w
         }];

    map.addLayer(imagelayer)
       //.addLayer(heatmap)
       //.addLayer(vectorfield)
       //.addLayer(pathplot)
      // .addLayer(overlays);

  function _init() {

       _accepted = [];

   _points = [];
         _text = [];
  }
  ping.make = ( selector)=>{
    _selector = selector;
    _element = document.querySelector(_selector);
    setSvg();
    	//mapdata[heatmap.id()] = data.heatmap;
    //	mapdata[overlays.id()] = data.overlays;
    //	mapdata[vectorfield.id()] = data.vectorfield;
  	//mapdata[pathplot.id()] = data.pathplot;
    make();
    //addListener();
    _init();

  };
  ping.addData = (data)=>{
    //Mp& add data
    let mapped = mapData(data);
    setData(mapped);

    //Remove
    if(_points.length >= MAX_POINTS) removePrevious();
    if(_text.length >= USER_AMOUNT * 8) removePreviousText();

    if(_shouldShowTip) ping.showTip();
  };

  ping.setPinned = (pinnedUsersList)=>{
    _pinnedUsers = pinnedUsersList;//.filter((item) => {return _accepted.indexOf(item) === -1;});

  };

  ping.showTip = ()=>{
    if(_pinnedUsers.length){
      _pinnedUsers.forEach( (user)=>{
        let pinPoint;
        let pinIndex;
        _points.map( (point, index)=>{
          if(point.active && point.id  === user ) {
            _shouldShowTip = true;
            pinPoint = point;
            pinIndex = index;
          }
        });
        if(pinPoint) shopwTip(pinPoint.self, pinPoint.id, pinPoint.accepted, pinIndex);
      });
    }
  };
  ping.hideTip = ()=>{
    _tip.hide();
    _shouldShowTip = false;
  };

  function shopwTip(target, id, accepted, index) {

    let element = d3.select(`.${target}`)[0];
    let activeTip;
     for (var i = 0; i < _tips.length; i++) {
       if(_tips[i].id === id) activeTip = _tips[i];
       else if(!_tips[i].active) activeTip = _tips[i];
     }
    activeTip.active = true;
    activeTip.id = id;
    activeTip.tip.show({id:id, accepted:accepted, index:index}, element[0])
    .offset([-10, 0]);
  }

  function removePrevious() {
    for (var i = 0; i < USER_AMOUNT; i++) {
      _svg.select(`.${_points[0].self}`).remove();
    //  console.log('REMOVE', _points[0].self);
      _points.shift();
    }
  }
  function removePreviousText() {
    if(_text.length) for (var i = 0; i < USER_AMOUNT; i++) {
      _svg.select(`.${_text[0].self}`).remove();
    //  console.log('REMOVE', _text[0].self);
      _text.shift();
    }
  }

  function setSvg() {

    let __h = (WIDTH* 0.69);
    let __w = WIDTH;
    if(scale.should()) {
      __h = scale.getScaled(__h);
      __w = scale.getScaled(__w);
    }

    _svg = d3.select(_selector).append("svg")
      .attr("height", __h).attr("width", __w);
      console.log((WIDTH* 0.69));

    // setTimeout(function () {
    //   // var svgElement = _element.querySelector('svg');
    //   // var panZoomTiger = svgPanZoom(svgElement, {
    //   //   panEnabled: false
    //   // });
    // }, 100);
  }

  function make() {
    _made = true;
    _svg.datum(mapdata).call(map);

        /* Initialize tooltip */
    _tips.forEach((item) => {
      item.tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {

          let end = "</div>";
          let accepted =  _accepted.indexOf(d.id) > -1 ?
            `<button action="section" class="btn tooltip-btn-large">Section profile</button>` :
            `<button action="accept" index="${d.index}" id="${d.id}" class="btn tooltip-btn-red">Accept</button>`;
          let markup = `
            <span>${d.id}</span>
            <div class="tooltip-side">
              <button action="show" class="btn tooltip-btn">Section</button>
          `;
          return markup + accepted + end;
        });

      item.active = false;
      _svg.call(item.tip);
      return item;
    });
    addTipListeners();
  }

  function addTipListeners() {
    let elements = document.querySelectorAll('.d3-tip');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', tipListener);
    }
  }
  function tipListener(event) {
    let action = event.target.getAttribute('action');
    if(action === 'show'){
      store.set('modal', true);
    }
    else if(action === 'accept'){
        console.log(event);
      let index = event.target.getAttribute('index');
      let id = event.target.getAttribute('id');
      _points[index].accepted = true;
      _accepted.push(id);
      event.target.style.display = "none";
      event.target.textContent = "Section profile";
      store.set("unpin_user", id);

    }
    else if( action === 'section'){
    store.set('router', '/profile');
    }
  }

  function addListener() {
    _element.addEventListener('click', (event)=>{ //console.log('add', event.x, event.y);
      setCircle(event.x, event.y, '5');
    });
  }

  function setCircle(x, y, id) {

    let selfId = '_' +id+getrandom();
    setPreviousCirclesNonActive(id);

    let activeUser = isActiveUser(id);

    let c = _svg.append("svg:circle")
   .attr("r", 20)
   .attr("cx", function(d) { return x; })
   .attr("cy", function(d) { return y + 25; })
   .attr('fill', getColor(id))
   .attr('class', ()=>{
     let s = selfId;
     s += activeUser ? ' circle-active' : ' circle';
     return s;
   });

    let instance = {x:x,y:y,id:id, self:selfId};
    if(activeUser) instance.active = true;
    _points.push(instance);
  }
  function setText(x, y, id) {

    let selfId = '_' +id+getrandom();
   _svg.append("text")
     .attr("x", function(d) { return x ; })
     .attr("y", y-70)
     .attr("dy", ".35em")
     .text(()=>{
       return `id: ${id}`;
     })
     .attr('class', selfId);

    _text.push({x:x,y:y,id:id, self:selfId});
  }

  function isActiveUser(id) {
    return _pinnedUsers.indexOf(id) > -1;
  }

  function setPreviousCirclesNonActive(id) {
    _points.forEach( (el,i,arr)=>{
      if(el.active && el.id == id ){
          _svg.select(`.${el.self}`).attr('fill', _colors[el.id]);
          console.log(el);
        }
    });
  }

  function getColor(id) {
    if (isActiveUser(id)){ //console.log('GET COLOR IS isActiveUser', id, _accepted, _accepted.indexOf(id) === -1);
      let c;
      c =  _accepted.indexOf(id) === -1 ? 'tomato' : _colors[id];
  //    console.log(c, 'CCCCC');
      return c;
    }
    else  {
    //  let rand = Math.floor(Math.random() * _colors.length);
      return _colors[id];
    }
  }

  function removeCircle() {
    let fade = _points[_points.length-_I];
     _svg.select(`.${fade.selfId}`).remove();
    _I ++;
  }
  function setData(data) {

    // if(data.length > 1)  data.forEach( (el,i,arr)=>{
    //   setCircle(el.x, el.y, el.id);
    // });
    data.forEach( (user)=>{
      user.data.forEach( (point)=>{
        setCircle(point.x, point.y, user.id);
      });
      let average = getAverage(user.data);
    //  setText(average.x, average.y, user.id);
    });
  }

  function getAverage(dataArr) {
    let avg = {};
    let sumX = 0;
    let sumY = 0;
    dataArr.forEach( (point)=>{
      sumX += point.x;
      sumY += point.y;
    });
    avg.x = sumX / dataArr.length;
    avg.y = sumY / dataArr.length;
    return avg;
  }

  function mapData(data) {

    let users = getUsersObj(data);
    let userArr = [];
    for(let k in users){
        userArr.push({
          id:k,
          data:users[k]
        });
    }
    return userArr;
  }
  function getUsersObj(data) {
    let users = {};
    data.forEach( (point)=>{
      users[point.id] = users[point.id] || [];
      users[point.id].push({x:point.x, y:point.y});
    });
    return users;
  }

  function getrandom() {
      return Math.random().toString(36).substring(7);
  }

  window.addData = (data, path)=>{
    // let fn = path ? pathplot.id : vectorfield.id;
    // mapdata[fn()] = data;
    // make();
    _svg.append("svg:circle")
   .attr("r", 4)
   .attr("cx", function(d) { return 50; })
   .attr("cy", function(d) { return 50; })
  };

  return ping;
};

export default ping();
