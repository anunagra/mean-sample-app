/*!
* angular-cache
* @version 4.3.2 - Homepage <http://jmdobry.github.io/angular-cache/>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2013-2015 Jason Dobry <http://www.pseudobry.com>
* @license MIT <https://github.com/jmdobry/angular-cache/blob/master/LICENSE>
*
* @overview angular-cache is a very useful replacement for Angular's $cacheFactory.
*/

!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b(require("angular")):"function"==typeof define&&define.amd?define(["angular"],b):"object"==typeof exports?exports.angularCacheModuleName=b(require("angular")):a.angularCacheModuleName=b(a.angular)}(this,function(a){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var e=c(1),f=c(2);f.utils.equals=e.equals,f.utils.isObject=e.isObject,f.utils.fromJson=e.fromJson;var g=function i(){d(this,i),this.$get=function(){return f.BinaryHeap}},h=function j(){d(this,j),this.defaults=f.defaults,this.$get=["$q",function(a){return f.utils.Promise=a,f}]};e.module("angular-cache",[]).provider("BinaryHeap",g).provider("CacheFactory",h),a.exports="angular-cache",a.exports.name="angular-cache"},function(b,c,d){b.exports=a},function(a,b,c){!function(b,c){a.exports=c()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){function d(a,b){return o(a,b)}var e=c(1),f=null;try{f=window.Promise}catch(g){}var h={isNumber:function(a){return"number"==typeof a},isString:function(a){return"string"==typeof a},isObject:function(a){return null!==a&&"object"==typeof a},isFunction:function(a){return"function"==typeof a},fromJson:function(a){return JSON.parse(a)},equals:function(a,b){return a===b},Promise:f},i=function(a){var b=[],c=void 0;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b},j=function(a){return a&&"function"==typeof a.then},k=function(a){return h.isNumber(a)?a.toString():a},l=function(a){var b={},c=void 0;for(c in a)a.hasOwnProperty(c)&&(b[c]=c);return b},m={capacity:Number.MAX_VALUE,maxAge:Number.MAX_VALUE,deleteOnExpire:"none",onExpire:null,cacheFlushInterval:null,recycleFreq:1e3,storageMode:"memory",storageImpl:null,disabled:!1,storagePrefix:"cachefactory.caches.",storeOnResolve:!1,storeOnReject:!1},n={},o=function(a,b){if(a in n)throw new Error(a+" already exists!");if(!h.isString(a))throw new Error("cacheId must be a string!");var c={},d={},f=null,g=new e(function(a){return a.expires},h.equals),o=new e(function(a){return a.accessed},h.equals),p=n[a]={$$id:a,destroy:function(){clearInterval(this.$$cacheFlushIntervalId),clearInterval(this.$$recycleFreqId),this.removeAll(),f&&(f().removeItem(this.$$prefix+".keys"),f().removeItem(this.$$prefix)),f=null,c=null,o=null,g=null,this.$$prefix=null,delete n[this.$$id]},disable:function(){this.$$disabled=!0},enable:function(){delete this.$$disabled},get:function(a,b){var e=this;if(Array.isArray(a)){var g=function(){var c=a,d=[];return c.forEach(function(a){var c=e.get(a,b);null!==c&&void 0!==c&&d.push(c)}),{v:d}}();if("object"==typeof g)return g.v}else if(a=k(a),this.$$disabled)return;if(b=b||{},!h.isString(a))throw new Error("key must be a string!");if(b&&!h.isObject(b))throw new Error("options must be an object!");if(b.onExpire&&!h.isFunction(b.onExpire))throw new Error("options.onExpire must be a function!");var i=void 0;if(f){if(d[a])return d[a];var j=f().getItem(this.$$prefix+".data."+a);if(!j)return;i=h.fromJson(j)}else{if(!(a in c))return;i=c[a]}var l=i.value,m=(new Date).getTime();return f?(o.remove({key:a,accessed:i.accessed}),i.accessed=m,o.push({key:a,accessed:m})):(o.remove(i),i.accessed=m,o.push(i)),"passive"===this.$$deleteOnExpire&&"expires"in i&&i.expires<m?(this.remove(a),this.$$onExpire?this.$$onExpire.call(this,a,i.value,b.onExpire):b.onExpire&&b.onExpire.call(this,a,i.value),l=void 0):f&&f().setItem(this.$$prefix+".data."+a,JSON.stringify(i)),l},info:function(a){if(a){var b=void 0;if(f){var d=f().getItem(this.$$prefix+".data."+a);return d?(b=h.fromJson(d),{created:b.created,accessed:b.accessed,expires:b.expires,isExpired:(new Date).getTime()-b.created>this.$$maxAge}):void 0}return a in c?(b=c[a],{created:b.created,accessed:b.accessed,expires:b.expires,isExpired:(new Date).getTime()-b.created>this.$$maxAge}):void 0}return{id:this.$$id,capacity:this.$$capacity,maxAge:this.$$maxAge,deleteOnExpire:this.$$deleteOnExpire,onExpire:this.$$onExpire,cacheFlushInterval:this.$$cacheFlushInterval,recycleFreq:this.$$recycleFreq,storageMode:this.$$storageMode,storageImpl:f?f():void 0,disabled:!!this.$$disabled,size:o&&o.size()||0}},keys:function(){if(f){var a=f().getItem(this.$$prefix+".keys");return a?h.fromJson(a):[]}return i(c)},keySet:function(){if(f){var a=f().getItem(this.$$prefix+".keys"),b={};if(a)for(var d=h.fromJson(a),e=0;e<d.length;e++)b[d[e]]=d[e];return b}return l(c)},put:function(a,b,e){var i=this;e=e||{};var l="storeOnResolve"in e?!!e.storeOnResolve:this.$$storeOnResolve,m="storeOnReject"in e?!!e.storeOnReject:this.$$storeOnReject,n=function(b,c){return function(e){if(b&&(delete d[a],h.isObject(e)&&"status"in e&&"data"in e?(e=[e.status,e.data,e.headers(),e.statusText],i.put(a,e)):i.put(a,e)),c){if(h.Promise)return h.Promise.reject(e);throw e}return e}};if(!this.$$disabled&&null!==b&&void 0!==b){if(a=k(a),!h.isString(a))throw new Error("key must be a string!");var p=(new Date).getTime(),q={key:a,value:j(b)?b.then(n(l,!1),n(m,!0)):b,created:p,accessed:p};if(q.expires=q.created+this.$$maxAge,f){if(j(q.value))return d[a]=q.value,d[a];var r=f().getItem(this.$$prefix+".keys"),s=r?h.fromJson(r):[],t=f().getItem(this.$$prefix+".data."+a);t&&this.remove(a),g.push({key:a,expires:q.expires}),o.push({key:a,accessed:q.accessed}),f().setItem(this.$$prefix+".data."+a,JSON.stringify(q));for(var u=!1,v=0;v<s.length;v++)if(s[v]===a){u=!0;break}u||s.push(a),f().setItem(this.$$prefix+".keys",JSON.stringify(s))}else c[a]&&this.remove(a),g.push(q),o.push(q),c[a]=q,delete d[a];return o.size()>this.$$capacity&&this.remove(o.peek().key),b}},remove:function(a){if(a+="",delete d[a],!f){var b=c[a]?c[a].value:void 0;return o.remove(c[a]),g.remove(c[a]),c[a]=null,delete c[a],b}var e=f().getItem(this.$$prefix+".data."+a);if(e){var i=h.fromJson(e);o.remove({key:a,accessed:i.accessed}),g.remove({key:a,expires:i.expires}),f().removeItem(this.$$prefix+".data."+a);var j=f().getItem(this.$$prefix+".keys"),k=j?h.fromJson(j):[],l=k.indexOf(a);return l>=0&&k.splice(l,1),f().setItem(this.$$prefix+".keys",JSON.stringify(k)),i.value}},removeAll:function(){if(f){o.removeAll(),g.removeAll();var a=f().getItem(this.$$prefix+".keys");if(a)for(var b=h.fromJson(a),e=0;e<b.length;e++)this.remove(b[e]);f().setItem(this.$$prefix+".keys",JSON.stringify([]))}else{o.removeAll(),g.removeAll();for(var i in c)c[i]=null;c={}}d={}},removeExpired:function(){for(var a=(new Date).getTime(),b={},c=void 0,d=void 0;(d=g.peek())&&d.expires<=a;)b[d.key]=d.value?d.value:null,g.pop();if(f)for(c in b){var e=f().getItem(this.$$prefix+".data."+c);e&&(b[c]=h.fromJson(e).value,this.remove(c))}else for(c in b)this.remove(c);if(this.$$onExpire)for(c in b)this.$$onExpire.call(this,c,b[c]);return b},setCacheFlushInterval:function(a){if(null===a)delete this.$$cacheFlushInterval;else{if(!h.isNumber(a))throw new Error("cacheFlushInterval must be a number!");if(0>a)throw new Error("cacheFlushInterval must be greater than zero!");a!==this.$$cacheFlushInterval&&(this.$$cacheFlushInterval=a,clearInterval(this.$$cacheFlushIntervalId),function(a){a.$$cacheFlushIntervalId=setInterval(function(){a.removeAll()},a.$$cacheFlushInterval)}(this))}},setCapacity:function(a){if(null===a)delete this.$$capacity;else{if(!h.isNumber(a))throw new Error("capacity must be a number!");if(0>a)throw new Error("capacity must be greater than zero!");this.$$capacity=a}for(var b={};o.size()>this.$$capacity;)b[o.peek().key]=this.remove(o.peek().key);return b},setDeleteOnExpire:function(a,b){if(null===a)delete this.$$deleteOnExpire;else{if(!h.isString(a))throw new Error("deleteOnExpire must be a string!");if("none"!==a&&"passive"!==a&&"aggressive"!==a)throw new Error('deleteOnExpire must be "none", "passive" or "aggressive"!');this.$$deleteOnExpire=a}b!==!1&&this.setRecycleFreq(this.$$recycleFreq)},setMaxAge:function(a){if(null===a)this.$$maxAge=Number.MAX_VALUE;else{if(!h.isNumber(a))throw new Error("maxAge must be a number!");if(0>a)throw new Error("maxAge must be greater than zero!");this.$$maxAge=a}var b=void 0,d=void 0,e=void 0;if(g.removeAll(),f){var j=f().getItem(this.$$prefix+".keys");for(d=j?h.fromJson(j):[],b=0;b<d.length;b++){e=d[b];var k=f().getItem(this.$$prefix+".data."+e);if(k){var l=h.fromJson(k);this.$$maxAge===Number.MAX_VALUE?l.expires=Number.MAX_VALUE:l.expires=l.created+this.$$maxAge,g.push({key:e,expires:l.expires})}}}else for(d=i(c),b=0;b<d.length;b++)e=d[b],this.$$maxAge===Number.MAX_VALUE?c[e].expires=Number.MAX_VALUE:c[e].expires=c[e].created+this.$$maxAge,g.push(c[e]);return"aggressive"===this.$$deleteOnExpire?this.removeExpired():{}},setOnExpire:function(a){if(null===a)delete this.$$onExpire;else{if(!h.isFunction(a))throw new Error("onExpire must be a function!");this.$$onExpire=a}},setOptions:function(a,b){if(a=a||{},b=!!b,!h.isObject(a))throw new Error("cacheOptions must be an object!");"storagePrefix"in a?this.$$storagePrefix=a.storagePrefix:b&&(this.$$storagePrefix=m.storagePrefix),this.$$prefix=this.$$storagePrefix+this.$$id,"disabled"in a?this.$$disabled=!!a.disabled:b&&(this.$$disabled=m.disabled),"storageMode"in a||"storageImpl"in a?this.setStorageMode(a.storageMode||m.storageMode,a.storageImpl||m.storageImpl):b&&this.setStorageMode(m.storageMode,m.storageImpl),"storeOnResolve"in a?this.$$storeOnResolve=!!a.storeOnResolve:b&&(this.$$storeOnResolve=m.storeOnResolve),"storeOnReject"in a?this.$$storeOnReject=!!a.storeOnReject:b&&(this.$$storeOnReject=m.storeOnReject),"capacity"in a?this.setCapacity(a.capacity):b&&this.setCapacity(m.capacity),"deleteOnExpire"in a?this.setDeleteOnExpire(a.deleteOnExpire,!1):b&&this.setDeleteOnExpire(m.deleteOnExpire,!1),"maxAge"in a?this.setMaxAge(a.maxAge):b&&this.setMaxAge(m.maxAge),"recycleFreq"in a?this.setRecycleFreq(a.recycleFreq):b&&this.setRecycleFreq(m.recycleFreq),"cacheFlushInterval"in a?this.setCacheFlushInterval(a.cacheFlushInterval):b&&this.setCacheFlushInterval(m.cacheFlushInterval),"onExpire"in a?this.setOnExpire(a.onExpire):b&&this.setOnExpire(m.onExpire)},setRecycleFreq:function(a){if(null===a)delete this.$$recycleFreq;else{if(!h.isNumber(a))throw new Error("recycleFreq must be a number!");if(0>a)throw new Error("recycleFreq must be greater than zero!");this.$$recycleFreq=a}clearInterval(this.$$recycleFreqId),"aggressive"===this.$$deleteOnExpire?!function(a){a.$$recycleFreqId=setInterval(function(){a.removeExpired()},a.$$recycleFreq)}(this):delete this.$$recycleFreqId},setStorageMode:function(a,b){if(!h.isString(a))throw new Error("storageMode must be a string!");if("memory"!==a&&"localStorage"!==a&&"sessionStorage"!==a)throw new Error('storageMode must be "memory", "localStorage" or "sessionStorage"!');var c=!1,d={};if("string"==typeof this.$$storageMode&&this.$$storageMode!==a){var e=this.keys();if(e.length){for(var g=0;g<e.length;g++)d[e[g]]=this.get(e[g]);for(g=0;g<e.length;g++)this.remove(e[g]);c=!0}}if(this.$$storageMode=a,b){if(!h.isObject(b))throw new Error("storageImpl must be an object!");if(!("setItem"in b&&"function"==typeof b.setItem))throw new Error('storageImpl must implement "setItem(key, value)"!');if(!("getItem"in b&&"function"==typeof b.getItem))throw new Error('storageImpl must implement "getItem(key)"!');if(!("removeItem"in b)||"function"!=typeof b.removeItem)throw new Error('storageImpl must implement "removeItem(key)"!');f=function(){return b}}else if("localStorage"===this.$$storageMode)try{localStorage.setItem("cachefactory","cachefactory"),localStorage.removeItem("cachefactory"),f=function(){return localStorage}}catch(i){f=null,this.$$storageMode="memory"}else if("sessionStorage"===this.$$storageMode)try{sessionStorage.setItem("cachefactory","cachefactory"),sessionStorage.removeItem("cachefactory"),f=function(){return sessionStorage}}catch(i){f=null,this.$$storageMode="memory"}if(c)for(var j in d)this.put(j,d[j])},touch:function(a){var b=this;if(a){var c=this.get(a,{onExpire:function(a,c){return b.put(a,c)}});c&&this.put(a,c)}else for(var d=this.keys(),e=0;e<d.length;e++)this.touch(d[e])}};return p.setOptions(b,!0),p};d.createCache=o,d.defaults=m,d.info=function(){var a=i(n),b={size:a.length,caches:{}};for(var c in m)m.hasOwnProperty(c)&&(b[c]=m[c]);for(var d=0;d<a.length;d++){var e=a[d];b.caches[e]=n[e].info()}return b},d.get=function(a){return n[a]},d.keySet=function(){return l(n)},d.keys=function(){return i(n)},d.destroy=function(a){n[a]&&(n[a].destroy(),delete n[a])},d.destroyAll=function(){for(var a in n)n[a].destroy();n={}},d.clearAll=function(){for(var a in n)n[a].removeAll()},d.removeExpiredFromAll=function(){var a={};for(var b in n)a[b]=n[b].removeExpired();return a},d.enableAll=function(){for(var a in n)n[a].$$disabled=!1},d.disableAll=function(){for(var a in n)n[a].$$disabled=!0},d.touchAll=function(){for(var a in n)n[a].touch()},d.utils=h,d.BinaryHeap=e,a.exports=d},function(a,b,c){!function(b,c){a.exports=c()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){function d(a,b,c){for(var d=a[c],e=b(d);c>0;){var f=Math.floor((c+1)/2)-1,g=a[f];if(e>=b(g))break;a[f]=d,a[c]=g,c=f}}function e(a,b){if(a||(a=function(a){return a}),b||(b=function(a,b){return a===b}),"function"!=typeof a)throw new Error('BinaryHeap([weightFunc][, compareFunc]): "weightFunc" must be a function!');if("function"!=typeof b)throw new Error('BinaryHeap([weightFunc][, compareFunc]): "compareFunc" must be a function!');this.weightFunc=a,this.compareFunc=b,this.heap=[]}var f=function(a,b,c){for(var d=a.length,e=a[c],f=b(e);;){var g=2*(c+1),h=g-1,i=null;if(d>h){var j=a[h],k=b(j);f>k&&(i=h)}if(d>g){var l=a[g],m=b(l);m<(null===i?f:b(a[h]))&&(i=g)}if(null===i)break;a[c]=a[i],a[i]=e,c=i}},g=e.prototype;g.push=function(a){this.heap.push(a),d(this.heap,this.weightFunc,this.heap.length-1)},g.peek=function(){return this.heap[0]},g.pop=function(){var a=this.heap[0],b=this.heap.pop();return this.heap.length>0&&(this.heap[0]=b,f(this.heap,this.weightFunc,0)),a},g.remove=function(a){for(var b=this.heap.length,c=0;b>c;c++)if(this.compareFunc(this.heap[c],a)){var e=this.heap[c],g=this.heap.pop();return c!==b-1&&(this.heap[c]=g,d(this.heap,this.weightFunc,c),f(this.heap,this.weightFunc,c)),e}return null},g.removeAll=function(){this.heap=[]},g.size=function(){return this.heap.length},a.exports=e}])})}])})}])});
//# sourceMappingURL=angular-cache.min.map