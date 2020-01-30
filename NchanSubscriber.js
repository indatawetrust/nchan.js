/*
 * NchanSubscriber
 * usage: var sub = new NchanSubscriber(url, opt);
 *
 * opt = {
 *   subscriber: 'longpoll', 'eventsource', or 'websocket',
 *     //or an array of the above indicating subscriber type preference
 *   reconnect: undefined or 'session' or 'persist'
 *     //if the HTML5 sessionStore or localStore should be used to resume
 *     //connections interrupted by a page load
 *   shared: true or undefined
 *     //share connection to same subscriber url between browser windows and tabs
 *     //using localStorage.
 * }
 *
 * sub.on("message", function(message, message_metadata) {
 *   // message is a string
 *   // message_metadata may contain 'id' and 'content-type'
 * });
 *
 * sub.on('connect', function(evt) {
 *   //fired when first connected.
 * });
 *
 * sub.on('disconnect', function(evt) {
 *   // when disconnected.
 * });
 *
 * sub.on('error', function(code, message) {
 *   //error callback. not sure about the parameters yet
 * });
 *
 * sub.reconnect; // should subscriber try to reconnect? true by default.
 * sub.reconnectTimeout; //how long to wait to reconnect? does not apply to EventSource, which reconnects on its own.
 * sub.lastMessageId; //last message id. useful for resuming a connection without loss or repetition.
 *
 * sub.start(); // begin (or resume) subscribing
 * sub.stop(); // stop subscriber. do not reconnect.
 */

//Thanks Darren Whitlen ( @prawnsalad ) for your feedback


;(function (global, moduleName, factory) { // eslint-disable-line
  "use strict";
  /* eslint-disable no-undef */
  var newModule = factory(global);
  if (typeof module === "object" && module != null && module.exports) {
    module.exports = newModule;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return newModule; });
  } else {
    global[moduleName] = newModule;
  }
  /* eslint-enable no-undef */
})(typeof window !== "undefined" ? window : this, "NchanSubscriber", function factory(global, undefined) { // eslint-disable-line

// https://github.com/axios/axios - axios v0.19.2 | (c) 2020 by Matt Zabriskie
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(4),a=n(22),u=n(10),c=r(u);c.Axios=s,c.create=function(e){return r(a(c.defaults,e))},c.Cancel=n(23),c.CancelToken=n(24),c.isCancel=n(9),c.all=function(e){return Promise.all(e)},c.spread=n(25),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";function r(e){return"[object Array]"===j.call(e)}function o(e){return"undefined"==typeof e}function i(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function s(e){return"[object ArrayBuffer]"===j.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function u(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function c(e){return"string"==typeof e}function f(e){return"number"==typeof e}function p(e){return null!==e&&"object"==typeof e}function d(e){return"[object Date]"===j.call(e)}function l(e){return"[object File]"===j.call(e)}function h(e){return"[object Blob]"===j.call(e)}function m(e){return"[object Function]"===j.call(e)}function y(e){return p(e)&&m(e.pipe)}function g(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function v(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function x(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function w(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function b(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=b(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)w(arguments[n],e);return t}function E(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=E(t[n],e):"object"==typeof e?t[n]=E({},e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)w(arguments[n],e);return t}function S(e,t,n){return w(t,function(t,r){n&&"function"==typeof t?e[r]=C(t,n):e[r]=t}),e}var C=n(3),j=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:s,isBuffer:i,isFormData:a,isArrayBufferView:u,isString:c,isNumber:f,isObject:p,isUndefined:o,isDate:d,isFile:l,isBlob:h,isFunction:m,isStream:y,isURLSearchParams:g,isStandardBrowserEnv:x,forEach:w,merge:b,deepMerge:E,extend:S,trim:v}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(2),i=n(5),s=n(6),a=n(7),u=n(22);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=u(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),i(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}if(i){var a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(8),s=n(9),a=n(10);e.exports=function(e){r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||a.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(12):"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(e=n(12)),e}var i=n(2),s=n(11),a={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:o(),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){u.headers[e]={}}),i.forEach(["post","put","patch"],function(e){u.headers[e]=i.merge(a)}),e.exports=u},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(13),i=n(5),s=n(16),a=n(19),u=n(20),c=n(14);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password||"";d.Authorization="Basic "+btoa(h+":"+m)}var y=s(e.baseURL,e.url);if(l.open(e.method.toUpperCase(),i(y,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l.onreadystatechange=function(){if(l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?a(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:l.status,statusText:l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null}},l.onabort=function(){l&&(f(c("Request aborted",e,"ECONNABORTED",l)),l=null)},l.onerror=function(){f(c("Network Error",e,null,l)),l=null},l.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),f(c(t,e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=n(21),v=(e.withCredentials||u(y))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),r.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){var o=n.config.validateStatus;!o||o(n.status)?e(n):t(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(17),o=n(18);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),s===!0&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){t=t||{};var n={},o=["url","method","params","data"],i=["headers","auth","proxy"],s=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];r.forEach(o,function(e){"undefined"!=typeof t[e]&&(n[e]=t[e])}),r.forEach(i,function(o){r.isObject(t[o])?n[o]=r.deepMerge(e[o],t[o]):"undefined"!=typeof t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):"undefined"!=typeof e[o]&&(n[o]=e[o])}),r.forEach(s,function(r){"undefined"!=typeof t[r]?n[r]=t[r]:"undefined"!=typeof e[r]&&(n[r]=e[r])});var a=o.concat(i).concat(s),u=Object.keys(t).filter(function(e){return a.indexOf(e)===-1});return r.forEach(u,function(r){"undefined"!=typeof t[r]?n[r]=t[r]:"undefined"!=typeof e[r]&&(n[r]=e[r])}),n}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});

 // https://github.com/component/emitter
function Emitter(t){return t?mixin(t):void 0}function mixin(t){for(var e in Emitter.prototype)t[e]=Emitter.prototype[e];return t}Emitter.prototype.on=Emitter.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},Emitter.prototype.once=function(t,e){function i(){this.off(t,i),e.apply(this,arguments)}return i.fn=e,this.on(t,i),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i=this._callbacks["$"+t];if(!i)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,s=0;s<i.length;s++)if(r=i[s],r===e||r.fn===e){i.splice(s,1);break}return this},Emitter.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),i=this._callbacks["$"+t];if(i){i=i.slice(0);for(var r=0,s=i.length;s>r;++r)i[r].apply(this,e)}return this},Emitter.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},Emitter.prototype.hasListeners=function(t){return!!this.listeners(t).length};// eslint-disable-line

// https://github.com/madriska/react-native-event-source
var reTrim=/^(\s|\u00A0)+|(\s|\u00A0)+$/g;var EventSource=function(url){var eventsource=this,interval=500,lastEventId=null,cache='',eventType;if(!url||typeof url!='string'){throw new SyntaxError('Not enough arguments')}
this.URL=url;this.readyState=this.CONNECTING;this._pollTimer=null;this._xhr=null;function pollAgain(interval){eventsource._pollTimer=setTimeout(function(){poll.call(eventsource)},interval)}
function poll(){try{if(eventsource.readyState==eventsource.CLOSED)return;var xhr=new XMLHttpRequest();xhr.open('GET',eventsource.URL,!0);xhr.setRequestHeader('Accept','text/event-stream');xhr.setRequestHeader('Cache-Control','no-cache');xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');if(lastEventId!=null)xhr.setRequestHeader('Last-Event-ID',lastEventId);cache='';xhr.timeout=50000;xhr.onreadystatechange=function(){if(this.readyState==3||(this.readyState==4&&this.status==200)){if(eventsource.readyState==eventsource.CONNECTING){eventsource.readyState=eventsource.OPEN;eventsource.dispatchEvent('open',{type:'open'})}
var responseText='';try{responseText=this.responseText||''}catch(e){}
var parts=responseText.substr(cache.length).split("\n"),data=[],i=0,line='';cache=responseText;for(;i<parts.length;i++){line=parts[i].replace(reTrim,'');if(line.indexOf('event')==0){eventType=line.replace(/event:?\s*/,'')}else if(line.indexOf('retry')==0){retry=parseInt(line.replace(/retry:?\s*/,''));if(!isNaN(retry)){interval=retry}}else if(line.indexOf('data')==0){data.push(line.replace(/data:?\s*/,''))}else if(line.indexOf('id:')==0){lastEventId=line.replace(/id:?\s*/,'')}else if(line.indexOf('id')==0){lastEventId=null}else if(line==''){if(data.length){var event=new MessageEvent(data.join('\n'),eventsource.url,lastEventId);eventsource.dispatchEvent(eventType||'message',event);data=[];eventType=undefined}}}
if(this.readyState==4)pollAgain(interval)}else if(eventsource.readyState!==eventsource.CLOSED){if(this.readyState==4){pollAgain(interval)}else if(this.readyState==0){pollAgain(interval)}}};xhr.onerror=function(e){eventsource.readyState=eventsource.CONNECTING;eventsource.dispatchEvent('error',{type:'error',message:this.responseText})}
xhr.send();setTimeout(function(){if(!0||xhr.readyState==3)xhr.abort()},xhr.timeout);eventsource._xhr=xhr}catch(e){eventsource.dispatchEvent('error',{type:'error',data:e.message})}};poll()};EventSource.prototype={close:function(){this.readyState=this.CLOSED;clearInterval(this._pollTimer);this._xhr.abort()},CONNECTING:0,OPEN:1,CLOSED:2,dispatchEvent:function(type,event){var handlers=this['_'+type+'Handlers'];if(handlers){for(var i=0;i<handlers.length;i++){handlers[i].call(this,event)}}
if(this['on'+type]){this['on'+type].call(this,event)}},addEventListener:function(type,handler){if(!this['_'+type+'Handlers']){this['_'+type+'Handlers']=[]}
this['_'+type+'Handlers'].push(handler)},removeEventListener:function(type,handler){var handlers=this['_'+type+'Handlers'];if(!handlers){return}
for(var i=handlers.length-1;i>=0;--i){if(handlers[i]===handler){handlers.splice(i,1);break}}},onerror:null,onmessage:null,onopen:null,readyState:0,URL:''};var MessageEvent=function(data,origin,lastEventId){this.data=data;this.origin=origin;this.lastEventId=lastEventId||''};MessageEvent.prototype={data:null,type:'message',lastEventId:'',origin:''};

var ughbind = (Function.prototype.bind
  ? function ughbind(fn, thisObj) {
    return fn.bind(thisObj);
  }
  : function ughbind(fn, thisObj) {
    return function() {
      fn.apply(thisObj, arguments);
    };
  }
);

"use strict";
function NchanSubscriber(url, opt) {
  if(this === window) {
    throw "use 'new NchanSubscriber(...)' to initialize";
  }

  this.url = url;
  opt = opt || {};

  //which transport should i use?
  if(typeof opt === "string") {
    opt = {subscriber: opt};
  }
  if(opt.transport && !opt.subscriber) {
    opt.subscriber = opt.transport;
  }
  if(typeof opt.subscriber === "string") {
    opt.subscriber = [ opt.subscriber ];
  }
  this.desiredTransport = opt.subscriber;

  if(opt.shared) {
    this.shared = true;

    this.masterCheckInterval = 10000;
    this.masterIntervalCheckID;

    var pre = "NchanSubscriber:" + url + ":shared:";
    this.sharedKeys = {
      status: pre + "status",
      statusLastUpdate: pre + "status:lastUpdated",

      masterCreated: pre + "master:created",

      masterLastSeen: pre + "master:lastSeen",

      slaves: pre + "slaves",
      masterLottery: pre + "lottery",
      masterLotteryTime: pre + "lotteryTime",

      msg: pre + "msg",
      msgId: pre + "msg:id",
      msgContentType: pre + "msg:content-type",

      error: pre + "error"
    };

    if (!("localStorage" in global)) {
      throw "localStorage unavailable for use in shared NchanSubscriber";
    }
    this.sharedStorage = global.localStorage;
  }

  this.lastMessageId = opt.id || opt.msgId;
  this.reconnect = typeof opt.reconnect == "undefined" ? true : opt.reconnect;
  this.reconnectTimeout = opt.reconnectTimeout || 1000;


  var saveConnectionState;
  if(!opt.reconnect) {
    saveConnectionState = function() {};
  }
  else {
    var index = "NchanSubscriber:" + url + ":lastMessageId";
    var storage;
    if(opt.reconnect == "persist") {
      storage = ("localStorage" in global) && global.localStorage;
      if(!storage)
        throw "can't use reconnect: 'persist' option: localStorage not available";
    }
    else if(opt.reconnect == "session") {
      storage = ("sessionStorage" in global) && global.sessionStorage;
      if(!storage)
        throw "can't use reconnect: 'session' option: sessionStorage not available";
    }
    else {
      throw "invalid 'reconnect' option value " + opt.reconnect;
    }
    saveConnectionState = ughbind(function(msgid) {
      if(this.sharedRole != "slave") {
        storage.setItem(index, msgid);
      }
    }, this);
    this.lastMessageId = storage.getItem(index);
  }

  var onUnloadEvent = ughbind(function() {
    if(this.running) {
      this.stop();
    }
    if(this.sharedRole == "master") {
      storage.setItem(this.sharedKeys.status, "disconnected");
    }
  }, this);
  // global.addEventListener('beforeunload', onUnloadEvent, false);
  // // swap `beforeunload` to `unload` after DOM is loaded
  // global.addEventListener('DOMContentLoaded', function() {
  //   global.removeEventListener('beforeunload', onUnloadEvent, false);
  //   global.addEventListener('unload', onUnloadEvent, false);
  // }, false);


  var notifySharedSubscribers;
  if(opt.shared) {
    notifySharedSubscribers = ughbind(function(name, data) {
      if(this.sharedRole != "master") {
        return;
      }

      if(name == "message") {
        storage.setItem(this.sharedKeys.msgId, data[1] && data[1].id || "");
        storage.setItem(this.sharedKeys.msgContentType, data[1] && data[1]["content-type"] || "");
        storage.setItem(this.sharedKeys.msg, data[0]);
      }
      else if(name == "error") {
        //TODO
      }
      else if(name == "connecting") {
        storage.setItem(this.sharedKeys.status, "connecting");
      }
      else if(name == "connect") {
        storage.setItem(this.sharedKeys.status, "connected");
      }
      else if(name == "reconnect") {
        storage.setItem(this.sharedKeys.status, "reconnecting");
      }
      else if(name == "disconnect") {
        storage.setItem(this.sharedKeys.status, "disconnected");
      }
    }, this);
  }
  else {
    notifySharedSubscribers = function(){};
  }

  var restartTimeoutIndex;
  var stopHandler = ughbind(function() {
    if(!restartTimeoutIndex && this.running && this.reconnect && !this.transport.reconnecting && !this.transport.doNotReconnect) {
      //console.log("stopHAndler reconnect plz", this.running, this.reconnect);
      notifySharedSubscribers("reconnect");
      restartTimeoutIndex = global.setTimeout(ughbind(function() {
        restartTimeoutIndex = null;
        this.stop();
        this.start();
      }, this), this.reconnectTimeout);
    }
    else {
      notifySharedSubscribers("disconnect");
    }
  }, this);

  this.on("message", function msg(msg, meta) {
    this.lastMessageId=meta.id;
    if(meta.id) {
      saveConnectionState(meta.id);
    }
    notifySharedSubscribers("message", [msg, meta]);
    //console.log(msg, meta);
  });
  this.on("error", function fail(code, text) {
    stopHandler(code, text);
    notifySharedSubscribers("error", [code, text]);
    //console.log("failure", code, text);
  });
  this.on("connect", function() {
    this.connected = true;
    notifySharedSubscribers("connect");
  });
  this.on("__disconnect", function fail(code, text) {
    this.connected = false;
    this.emit("disconnect", code, text);
    stopHandler(code, text);
    //console.log("__disconnect", code, text);
  });
}

Emitter(NchanSubscriber.prototype);

NchanSubscriber.prototype.initializeTransport = function(possibleTransports) {
  if(possibleTransports) {
    this.desiredTransport = possibleTransports;
  }
  if(this.sharedRole == "slave") {
    this.transport = new this.SubscriberClass["__slave"](ughbind(this.emit, this)); //try it
  }
  else {
    var tryInitializeTransport = ughbind(function(name) {
      if(!this.SubscriberClass[name]) {
        throw "unknown subscriber type " + name;
      }
      try {
        this.transport = new this.SubscriberClass[name](ughbind(this.emit, this)); //try it
        return this.transport;
      } catch(err) { /*meh...*/ }
    }, this);

    var i;
    if(this.desiredTransport) {
      for(i=0; i<this.desiredTransport.length; i++) {
        if(tryInitializeTransport(this.desiredTransport[i])) {
          break;
        }
      }
    }
    else {
      for(i in this.SubscriberClass) {
        if (this.SubscriberClass.hasOwnProperty(i) && i[0] != "_" && tryInitializeTransport(i)) {
          break;
        }
      }
    }
  }
  if(! this.transport) {
    throw "can't use any transport type";
  }
};

NchanSubscriber.prototype.setSharedRole = function(role) {
  if(role == "master" && this.sharedRole != "master") {
    var now = new Date().getTime()/1000;
    this.sharedStorage.setItem(this.sharedKeys.masterCreated, now);
    this.sharedStorage.setItem(this.sharedKeys.masterLastSeen, now);
  }
  this.sharedRole = role;
  return this;
};

var maybePromotingToMaster;

NchanSubscriber.prototype.maybePromoteToMaster = function() {
  if(!(this.running || this.starting)) {
    //console.log("stopped Subscriber won't be promoted to master");
    return this;
  }
  if(maybePromotingToMaster) {
    //console.log("already maybePromotingToMaster");
    return;
  }
  maybePromotingToMaster = true;

  //console.log("maybe promote to master");
  var processRoll;

  var lotteryRoundDuration = 2000;
  var currentContenders = 0;

  //roll the dice
  var roll = Math.random();
  var bestRoll = roll;

  var checkRollInterval;
  var checkRoll = ughbind(function(dontProcess) {
    var latestSharedRollTime = parseFloat(this.sharedStorage.getItem(this.sharedKeys.masterLotteryTime));
    var latestSharedRoll = parseFloat(this.sharedStorage.getItem(this.sharedKeys.masterLottery));
    var notStale = !latestSharedRollTime || (latestSharedRollTime > (new Date().getTime() - lotteryRoundDuration * 2));
    if(notStale && latestSharedRoll && (!bestRoll || latestSharedRoll > bestRoll)) {
      bestRoll = latestSharedRoll;
    }
    if(!dontProcess) {
      processRoll();
    }
  }, this);

  checkRoll(true);
  this.sharedStorage.setItem(this.sharedKeys.masterLottery, roll);
  this.sharedStorage.setItem(this.sharedKeys.masterLotteryTime, new Date().getTime() / 1000);

  var rollCallback = ughbind(function(ev) {
    if(ev.key != this.sharedKeys.masterLottery)
      return;
    //console.log(ev);
    if(ev.newValue) {
      currentContenders += 1;
      var newVal = parseFloat(ev.newValue);
      var oldVal = parseFloat(ev.oldValue);
      if(oldVal > newVal) {
        this.sharedStorage.setItem(this.sharedKeys.masterLottery, oldVal);
      }

      if(!bestRoll || newVal >= bestRoll) {
        //console.log("new bestRoll", newVal);
        bestRoll = newVal;
      }
    }
  }, this);
  global.addEventListener("storage", rollCallback);

  var finish = ughbind(function() {
    //console.log("finish");
    maybePromotingToMaster = false;
    //console.log(this.sharedRole);
    global.removeEventListener("storage", rollCallback);
    if(checkRollInterval) {
      clearInterval(checkRollInterval);
    }
    if(this.sharedRole == "master") {
      this.sharedStorage.removeItem(this.sharedKeys.masterLottery);
      this.sharedStorage.removeItem(this.sharedKeys.masterLotteryTime);
    }
    if(this.running) {
      this.stop();
      this.initializeTransport();
      this.start();
    }
    else {
      this.initializeTransport();
      if(this.starting) {
        this.start();
      }
    }
  }, this);

  processRoll = ughbind(function() {
    //console.log("roll, bestroll", roll, bestRoll);
    if(roll < bestRoll) {
      //console.log("loser");
      this.setSharedRole("slave");
      finish();
    }
    else if(roll >= bestRoll) {
      //var now = new Date().getTime() / 1000;
      //var lotteryTime = parseFloat(this.sharedStorage.getItem(this.sharedKeys.masterLotteryTime));
      //console.log(lotteryTime, now - lotteryRoundDuration/1000);
      if(currentContenders == 0) {
        //console.log("winner, no more contenders!");
        this.setSharedRole("master");
        finish();
      }
      else {
        //console.log("winning, but have contenders", currentContenders);
        currentContenders = 0;
      }
    }
  }, this);

  checkRollInterval = global.setInterval(checkRoll, lotteryRoundDuration);
};

NchanSubscriber.prototype.demoteToSlave = function() {

  //console.log("demote to slave");
  if(this.sharedRole != "master") {
    throw "can't demote non-master to slave";
  }
  if(this.running) {
    this.stop();
    this.setSharedRole("slave");
    this.initializeTransport();
    this.start();
  }
  else {
    this.initializeTransport();
  }
};

var storageEventListener;

NchanSubscriber.prototype.start = function() {
  if(this.running)
    throw "Can't start NchanSubscriber, it's already started.";

  this.starting = true;

  if(this.shared) {
    if(!this.sharedRole) {
      var status = this.sharedStorage.getItem(this.sharedKeys.status);
      storageEventListener = ughbind(function(ev) {
        if(ev.key == this.sharedKeys.status) {
          if(ev.newValue == "disconnected") {
            if(this.sharedRole == "slave") {
              //play the promotion lottery
              //console.log("status changed to disconnected, maybepromotetomaster", ev.newValue, ev.oldValue);
              this.maybePromoteToMaster();
            }
            else if(this.sharedRole == "master") {
              //do nothing
            }
          }
        }
        else if(ev.key == this.sharedKeys.masterCreated && this.sharedRole == "master" && ev.newValue) {
          //a new master has arrived. demote to slave.
          this.demoteToSlave();
        }
      }, this);
      global.addEventListener("storage", storageEventListener);
      if(status == "disconnected") {
        //console.log("status == disconnected, maybepromotetomaster");
        this.maybePromoteToMaster();
      }
      else {
        this.setSharedRole(status ? "slave" : "master");
        this.initializeTransport();
      }
    }

    if(this.sharedRole == "master") {
      this.sharedStorage.setItem(this.sharedKeys.status, "connecting");
      this.transport.listen(this.url, this.lastMessageId);
      this.running = true;
      delete this.starting;

      //master checkin interval
      this.masterIntervalCheckID = global.setInterval(ughbind(function() {
        this.sharedStorage.setItem(this.sharedKeys.masterLastSeen, new Date().getTime() / 1000);
      }, this), this.masterCheckInterval * 0.8);
    }
    else if(this.sharedRole == "slave") {
      this.transport.listen(this.url, this.sharedKeys);
      this.running = true;
      delete this.starting;

      //slave check if master is around
      this.masterIntervalCheckID = global.setInterval(ughbind(function() {
        var lastCheckin = parseFloat(this.sharedStorage.getItem(this.sharedKeys.masterLastSeen));
        if(!lastCheckin || lastCheckin < (new Date().getTime() / 1000) - this.masterCheckInterval / 1000) {
          //master hasn't checked in for too long. assume it's gone.
          this.maybePromoteToMaster();
        }
      }, this), this.masterCheckInterval);
    }
  }
  else {
    if(!this.transport) {
      this.initializeTransport();
    }
    this.transport.listen(this.url, this.lastMessageId);
    this.running = true;
    delete this.starting;
  }
  return this;
};

NchanSubscriber.prototype.stop = function() {
  if(!this.running)
    throw "Can't stop NchanSubscriber, it's not running.";

  this.running = false;
  if(storageEventListener) {
    global.removeEventListener("storage", storageEventListener);
  }
  this.transport.cancel();
  if(this.masterIntervalCheckID) {
    clearInterval(this.masterIntervalCheckID);
    delete this.masterIntervalCheckID;
  }
  return this;
};

function addLastMsgIdToQueryString(url, msgid) {
  if(msgid) {
    var m = url.match(/(\?.*)$/);
    url += (m ? "&" : "?") + "last_event_id=" + encodeURIComponent(msgid);
  }
  return url;
}

NchanSubscriber.prototype.SubscriberClass = {
  'websocket': (function() {
    function WSWrapper(emit) {
      WebSocket;
      this.emit = emit;
    }

    WSWrapper.prototype.websocketizeURL = function(url) {
      var m = url.match(/^((\w+:)?\/\/([^\/]+))?(\/)?(.*)/);
      var protocol = m[2];
      var host = m[3];
      var absolute = m[4];
      var path = m[5];

      var loc;
      if(typeof window == "object") {
        loc = window.location;
      }

      if(!protocol && loc) {
        protocol = loc.protocol;
      }
      if(protocol == "https:") {
        protocol = "wss:";
      }
      else if(protocol == "http:") {
        protocol = "ws:";
      }
      else {
        protocol = "wss:"; //default setting: secure
      }

      if(!host && loc) {
        host = loc.host;
      }

      if(!absolute) {
        path = loc ? loc.pathname.match(/(.*\/)[^/]*/)[1] + path : "/" + path;
      }
      else {
        path = "/" + path;
      }

      return protocol + "//" + host + path;
    };

    WSWrapper.prototype.listen = function(url, msgid) {
      url = this.websocketizeURL(url);
      url = addLastMsgIdToQueryString(url, msgid);
      //console.log(url);
      if(this.listener) {
        throw "websocket already listening";
      }
      this.listener = new WebSocket(url, 'ws+meta.nchan');
      var l = this.listener;
      l.onmessage = ughbind(function(evt) {
        var m = evt.data.match(/^id: (.*)\n(content-type: (.*)\n)?\n/m);
        this.emit('message', evt.data.substr(m[0].length), {'id': m[1], 'content-type': m[3]});
      }, this);

      l.onopen = ughbind(function(evt) {
        this.emit('connect', evt);
        //console.log("connect", evt);
      }, this);

      l.onerror = ughbind(function(evt) {
        //console.log("error", evt);
        this.emit('error', evt, l);
        delete this.listener;
      }, this);

      l.onclose = ughbind(function(evt) {
        this.emit('__disconnect', evt);
        delete this.listener;
      }, this);
    };

    WSWrapper.prototype.cancel = function() {
      if(this.listener) {
        this.listener.close();
        delete this.listener;
      }
    };

    return WSWrapper;
  })(),

  'eventsource': (function() {
    function ESWrapper(emit) {
      EventSource;
      this.emit = emit;
    }

    ESWrapper.prototype.listen= function(url, msgid) {
      url = addLastMsgIdToQueryString(url, msgid);
      if(this.listener) {
        throw "there's a ES listener running already";
      }
      this.listener = new EventSource(url);
      var l = this.listener;
      l.onmessage = ughbind(function(evt){
        //console.log("message", evt);
        this.emit('message', evt.data, {id: evt.lastEventId});
      }, this);

      l.onopen = ughbind(function(evt) {
        this.reconnecting = false;
        //console.log("connect", evt);
        this.emit('connect', evt);
      }, this);

      l.onerror = ughbind(function(evt) {
        //EventSource will try to reconnect by itself
        //console.log("onerror", this.listener.readyState, evt);
        if(this.listener.readyState == EventSource.CONNECTING && !this.reconnecting) {
          if(!this.reconnecting) {
            this.reconnecting = true;
            this.emit('__disconnect', evt);
          }
        }
        else {
          this.emit('__disconnect', evt);
          //console.log('other __disconnect', evt);
        }
      }, this);
    };

    ESWrapper.prototype.cancel= function() {
      if(this.listener) {
        this.listener.close();
        delete this.listener;
      }
    };

    return ESWrapper;
  })(),

  'longpoll': (function () {
    function Longpoll(emit) {
      this.headers = {};
      this.longPollStartTime = null;
      this.maxLongPollTime = 5*60*1000; //5 minutes
      this.emit = emit;
    }

    Longpoll.prototype.listen = function(url, msgid) {
      if(this.req) {
        throw "already listening";
      }
      if(url) { this.url=url; }
      var setHeader = ughbind(function(incoming, name) {
        if(incoming) { this.headers[name]= incoming; }
      }, this);

      if(msgid) {
        this.headers = {"Etag": msgid};
      }

      this.reqStartTime = new Date().getTime();

      var  requestCallback;
      requestCallback = ughbind(function (code, response_text, req) {
        setHeader(req.getResponseHeader('Last-Modified'), 'If-Modified-Since');
        setHeader(req.getResponseHeader('Etag'), 'If-None-Match');

        if(code >= 200 && code <= 210) {
          //legit reply
          var content_type = req.getResponseHeader('Content-Type');
          if (!this.parseMultipartMixedMessage(content_type, response_text, req)) {
            this.emit("message", response_text || "", {'content-type': content_type, 'id': this.msgIdFromResponseHeaders(req)});
          }

          this.reqStartTime = new Date().getTime();
          this.req = axios({url: this.url, headers: this.headers, transformResponse: [function (data) { return data; }]})
            .then(function (response) {
              requestCallback(response.status, response.data, response.request);
            });
        }
        else if((code == 0 && response_text == "Error" && req.readyState == 4) || (code === null && response_text != "Abort")) {
          //console.log("abort!!!");
          this.emit("__disconnect", code || 0, response_text);
          delete this.req;
        }
        else if(code !== null) {
          //HTTP error
          this.emit("error", code, response_text);
          delete this.req;
        }
        else {
          //don't care about abortions
          delete this.req;
          this.emit("__disconnect");
          //console.log("abort!");
        }
      }, this);

      this.reqStartTime = new Date().getTime();
      this.req = axios({url: this.url, headers: this.headers, transformResponse: [function (data) { return data; }]})
        .then(function (response) {
          requestCallback(response.status, response.data, response.request);
        });
      this.emit("connect");

      return this;
    };

    Longpoll.prototype.parseMultipartMixedMessage = function(content_type, text, req) {
      var m = content_type && content_type.match(/^multipart\/mixed;\s+boundary=(.*)$/);
      if(!m) {
        return false;
      }
      var boundary = m[1];

      var msgs = text.split("--" + boundary);
      if(msgs[0] != "" || !msgs[msgs.length-1].match(/--\r?\n/)) { throw "weird multipart/mixed split"; }

      msgs = msgs.slice(1, -1);
      for(var i in msgs) {
        m = msgs[i].match(/^(.*)\r?\n\r?\n([\s\S]*)\r?\n$/m);
        var hdrs = m[1].split("\n");

        var meta = {};
        for(var j in hdrs) {
          var hdr = hdrs[j].match(/^([^:]+):\s+(.*)/);
          if(hdr && hdr[1] == "Content-Type") {
            meta["content-type"] = hdr[2];
          }
        }

        if(i == msgs.length - 1) {
          meta["id"] = this.msgIdFromResponseHeaders(req);
        }
        this.emit('message', m[2], meta);
      }
      return true;
    };

    Longpoll.prototype.msgIdFromResponseHeaders = function(req) {
      var lastModified, etag;
      lastModified = req.getResponseHeader('Last-Modified');
      etag = req.getResponseHeader('Etag');
      if(lastModified) {
        return "" + Date.parse(lastModified)/1000 + ":" + (etag || "0");
      }
      else if(etag) {
        return etag;
      }
      else {
        return null;
      }
    };

    Longpoll.prototype.cancel = function() {
      if(this.req) {
        this.req.abort();
        delete this.req;
      }
      return this;
    };

    return Longpoll;
  })(),

  '__slave': (function() {
    function LocalStoreSlaveTransport(emit) {
      this.emit = emit;
      this.doNotReconnect = true;
    }

    LocalStoreSlaveTransport.prototype.listen = function(url, keys) {
      this.keys = keys;

      var storage = global.localStorage;

      this.statusChangeChecker = ughbind(function(ev) {
        if(ev.key == this.keys.msg) {
          var msgId = storage.getItem(this.keys.msgId);
          var contentType = storage.getItem(this.keys.msgContentType);
          this.emit('message', storage.getItem(this.keys.msg), {'id': msgId == "" ? undefined : msgId, 'content-type': contentType == "" ? undefined : contentType});
        }
      }, this);
      global.addEventListener("storage", this.statusChangeChecker);
    };

    LocalStoreSlaveTransport.prototype.cancel = function() {
      global.removeEventListener("storage", this.statusChangeChecker);
    };

    return LocalStoreSlaveTransport;
  })()

};

return NchanSubscriber;
});
