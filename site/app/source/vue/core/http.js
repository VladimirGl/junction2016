
/**
* Http module
* Makes requests
*
*/
const http = function() {

  'use strict';

  let http = {};
  //Private
  function request() {}

  //Public
  /**
  * Request
  * @param route - required
  * @param method - default GET
  * @param params - default {} if method!=GET
  * @param headers - optional
  * @return Promise.then response
  */
  http.request = function (route, method, params, headers, file) {

      let req = getReq(route, method, params, headers);
      req.open(method, route, true);
      if(headers) req.setRequestHeader(headers.name, headers.value);
      else setHeadersForParams(file);
      let parsedParams = file ? file : parseParams(params);

      return new Promise(function(resolve, reject) {

          if(!route) reject({status:"No route present"});
          if(method!=="GET"&&!params) params = "";

          //console.log("HTTP.req.send",route, method, parsedParams);
          try {
            if(parsedParams) req.send(parsedParams);
            else req.send();
          } catch (routeExeption) {
              reject({status:"408 Request Timeout"});
          }


          req.onreadystatechange = function() {

            if(req.readyState === 4){
              if(req.status === 200)  resolve( parseResponse(req.response) );
              else reject( req.response );
            }
          };
          req.ontimeout = function () {
            reject({status:"408 Request Timeout"});
          };
          req.onerror = function (err) {
            reject({status:err});
          };
      });

      /**
      * Method
      * @param bar
      */
      function setHeadersForParams (file) {
        if(!file) req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      }
  };
  http.get = function (route, headers) {
    return http.request(route,"GET", null, headers);
  };
  http.post = function (route, params, headers) {
    return http.request(route,"POST",params,headers);
  };
  http.put = function (route, params, headers) {
    return http.request(route,"PUT",params,headers);
  };
  http.delete = function (route, params, headers) {
    return http.request(route,"DELETE",params,headers);
  };
  http.file = function (route, method, params, headers) {
    let file = getFile(params);
  //  console.log("http file",file);
    return http.request(route, method, params, headers, file);
  };

  //Helper
  function getReq(route, method, params, headers) {

    let req = new XMLHttpRequest();
    method = method || "GET";
    return req;
  }

  function getFile(params) {
    let formData = new FormData();
    formData.append("file", params.file);
    delete params['file'];
    for(let k in params) formData.append(k, params[k]);
    return formData;
  }

  /**
  * Parse response to corrent form
  * @param req.respons
  */
  function parseResponse (r) {
    if(r[0] === "[" || r[0] === "{" ) return JSON.parse(r);
    return r;
  }

  /**
  * Parse parameters
  * @param params
  */
  function parseParams (params) {
      let s = "";

      getRecursive(params);
      if(s[s.length-1]==="&") s = s.substring(0,s.length-1);
      return s;
      //helper
      function getRecursive (p) {

        for (var prop in p) {
          if (p.hasOwnProperty(prop)) {
            if( prop instanceof(Object)&& !prop instanceof(Array) ) { return getRecursiveprop(prop);}
            else s += prop +"="+ encodeURIComponent(p[prop]) + "&";
          }
        }
      }
  }

  //promisePolyfill();
  return http;
};

const _export = http();
export const get = _export.get;
export const post = _export.post;
export const put = _export.put;
export default _export;
