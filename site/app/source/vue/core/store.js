
import {ensureProperty} from './util';
/**
 * Simple store
 * @return {Object} store
 */
const store = function() {
  'use strict';

  let store = {};

  let STORES = [];
  let callbacks = [];

  store.listen = (name, cb)=> {
    callbacks = ensureProperty(callbacks, name, []);
    callbacks[name].push(cb);
  };
  store.set = (name, value)=> {
    let clone = value instanceof Array ? value.slice(0) : value;
    STORES = ensureProperty(STORES, name, []);
    STORES[name].push(clone);
    store.dispatch(name);
  };
  store.get = (name)=> {
    return STORES[name] ? STORES[name][STORES[name].length-1] : [];
  };
  store.dispatch = (name)=> {
    if(callbacks[name]) callbacks[name].forEach( cb => { cb( store.get(name) ); } );
  };

  return store;
};

export default store();
