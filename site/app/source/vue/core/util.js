

export const ensureProperty = (object, key, type)=> {
  object[key] = object[key] || type;
  //ref...
  return object;
};

export const mapProperties = (object, fn)=> {
  let mapped = {};
  for(let k in object){
      mapped[k] = fn(object[k]);
  }
  return mapped;
};

export const toArray = (object, setKeyTo, setValueTo)=> {
  let arr = [];
  for(let k in object){
    let o = {};
    o[setKeyTo] = k;
    o[setValueTo] = object[k];
    arr.push(o);
  }

  return arr;
};

export const objectKeysToArray = (object)=> {
  let arr = [];

  for(let k in object){
    arr.push({
      key:k,
      value:object[k]
    });
  }

  return arr;
};

export const arrayToObject = (array)=> {
  let object = {};

  array.forEach( (el)=>{
    object[ el.key ] = el.value;
  });

  return object;
};

export const trimProperties = (object, trimFn)=> {
  let trimmed = {};
  for(let k in object){
    let key = trimFn(k);
    trimmed[key] = object[k];
  }
  return trimmed;
};

export const isValidEmail = (s)=> {
  return s.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
};

export const setActive = (context, key, index, value)=> {

  context.active.name = value;
  context[key].map( (item)=>{ item.active = false; return item; } );

  context[key][index].active = true;
  context.$set(context[key], index, context[key][index]);
};
