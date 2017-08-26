!function(n,l,v){function F(a,d,c){caches.open(q).then(function(e){var b={};d.headers.forEach(function(a,e){b[e]=a});b["x-abtf-sw"]=m();c&&c.max_age&&(b["x-abtf-sw-expire"]=c.max_age);d.blob().then(function(f){f=new Response(f,{status:d.status,statusText:d.statusText,headers:b});e.put(a,f)})})}function D(a){a&&("string"==typeof a&&(a=new Request(a,{mode:"no-cors"})),r(a).then(function(d){return d||(console.info("Abtf.sw() \u27a4 preload",a.url),p(a,{conditions:null}))}))}function r(a){return caches.open(q).then(function(d){return d.match(a)})}
function y(a,d){return a=new Request(a),r(a).then(function(a){return a?a.blob().then(function(e){return new Response(e,{status:503,statusText:"Offline",headers:a.headers})}):l(d)["catch"](function(a){throw a;})})}function G(a,d,c,e){var b=c.headers.get("etag"),f=c.headers.get("last-modified");b||f?(c=new Request(a.url,{method:"HEAD",headers:a.headers,mode:"no-cors"}),l(c).then(function(k){var c=!1,g=k.headers.get("etag");k=k.headers.get("last-modified");return(g&&g!==b?c=!0:k&&k!==f&&(c=!0),c)?(console.info("Abtf.sw() \u27a4 HEAD \u27a4 update",
a.url),c=p(a,d),e&&(c=c.then(e)),c):null})["catch"](function(){var b=p(a,d);return e&&(b=b.then(e)),b})):(console.warn("Abtf.sw() \u27a4 HEAD \u27a4 no etag or last-modified",a.url),c=p(a,d),e&&(c=c.then(e)))}function p(a,d,c){return l(a).then(function(e){if(e.ok&&400>e.status&&d){var b=!0;d.conditions&&(d.conditions.forEach(function(f){if(b)switch(f.type){case "url":f.regex?(c=w(f.pattern))?(g=c.test(a.url),f.not?g&&(b=!1):g||(b=!1)):b=!1:(g=-1!==a.url.indexOf(f.pattern),f.not?g&&(b=!1):g||(b=!1));
break;case "header":var d=e.headers.get(f.name);if(d)if(f.regex){var c=w(f.pattern);c?(g=c.test(d),f.not?g&&(b=!1):g||(b=!1)):b=!1}else if("object"==typeof f.pattern)if(f.pattern.operator)if(d=parseFloat(d),c=parseFloat(f.pattern.value),isNaN(d)||isNaN(c))b=!1;else{switch(f.pattern.operator){case "<":g=d<c;break;case ">":g=d>c;break;case "=":var g=d===c;break;default:b=!1}b&&(f.not?g&&(b=!1):g||(b=!1))}else b=!1;else-1===d.indexOf(f.pattern)&&(b=!1);else b=!1}}),b?console.info("Abtf.sw() \u27a4 cache condition \u27a4 cache",
a.url,d.conditions):console.info("Abtf.sw() \u27a4 cache condition \u27a4 no cache",a.url,d.conditions));b&&F(a,e.clone(),d)}return e})["catch"](function(e){return c?c(a,null,e):null})}function E(){z||(!A||A<m()-10)&&(z=!0,A=m(),caches.keys().then(function(a){return a&&0!==a.length?Promise.all(a.map(function(a){if(0!==a.indexOf(q))return console.info("Abtf.sw() \u27a4 old cache deleted",a),caches["delete"](a);caches.open(a).then(function(c){c.keys().then(function(e){if(console.info("Abtf.sw() \u27a4 prune cache",
a,"size:",e.length,t),e.length<t)return this;var b=[],f=[],d=[];return e.forEach(function(a){f.push(a);d.push(c.match(a))}),Promise.all(d).then(function(a){var e=m();return a.forEach(function(a,d){if(a&&a.headers){var k=a.headers.get("x-abtf-sw");if(k){var g=a.headers.get("x-abtf-sw-expire");if(g&&k&&k<m()-g)return console.info("Abtf.sw() \u27a4 cache \u27a4 expired",a.url),void c["delete"](f[d])}else k=e;!1!==b&&b.push({t:k,r:f[d]})}}),b&&b.length>t&&(b.sort(function(a,e){return a.t>e.t?-1:a.t<e.t?
1:0}),b.slice(t).forEach(function(a){c["delete"](a.r)})),this})})})})).then(function(){z=!1}):Promise.resolve()}))}function w(a){if(a=a.match(H)){try{var d=new RegExp(a[1],a[2])}catch(c){}return d||!1}}function m(){return Math.round(Date.now()/1E3)}function x(){return l("./abtf-pwa-config.json",{mode:"no-cors"}).then(function(a){if(a&&a.ok&&400>a.status)return a.json().then(function(a){if(console.info("Abtf.sw() \u27a4 config "+(h?"updated":"loaded"),a),a){a instanceof Array&&(a={policy:a});a.policy&&
(h=a.policy,u=m());var c=[];a.policy&&a.policy.forEach(function(a){a.offline&&-1===c.indexOf(a.offline)&&c.push(a.offline)});a.preload&&a.preload.forEach(function(a){-1===c.indexOf(a)&&c.push(a)});c.forEach(function(a){D(a)})}});throw h=!1,Error("service worker config not found: ./abtf-pwa-config.json");})["catch"](function(a){throw h=!1,a;})}function B(a){return(new Promise(function(d,c){if(h&&d(h),!h||!u||a&&a>u){var e=!h;x().then(function(){e&&(h?d(h):c())})["catch"](function(){e&&c()})}else if(u<
m()-300){var b=new Request("./abtf-pwa-config.json",{method:"HEAD",mode:"no-cors"});l(b).then(function(a){var b=!0;a&&a.ok&&(a=a.headers.get("last-modified"))&&a<=u&&(b=!1);b&&x()})["catch"](function(){x()})}}))["catch"](function(a){throw a;})}var q,h=!1,u=!1,t=1E3;v.prototype.add||(v.prototype.add=function(a){return this.addAll([a])});v.prototype.addAll||(v.prototype.addAll=function(a){function d(a){this.name="NetworkError";this.code=19;this.message=a}var c=this;return d.prototype=Object.create(Error.prototype),
Promise.resolve().then(function(){if(1>arguments.length)throw new TypeError;return a=a.map(function(a){return a instanceof Request?a:String(a)}),Promise.all(a.map(function(a){"string"==typeof a&&(a=new Request(a));var b=(new URL(a.url)).protocol;if("http:"!==b&&"https:"!==b)throw new d("Invalid scheme");return l(a.clone())["catch"](function(a){throw a;})}))}).then(function(e){return Promise.all(e.map(function(b,e){return c.put(a[e],b)}))}).then(function(){})});CacheStorage.prototype.match||(CacheStorage.prototype.match=
function(a,d){var c=this;return this.keys().then(function(e){var b;return e.reduce(function(e,k){return e.then(function(){return b||c.open(k).then(function(b){return b.match(a,d)}).then(function(a){return b=a})})},Promise.resolve())})});n.addEventListener("install",function(a){a.waitUntil(x().then(function(){n.skipWaiting()})["catch"](function(){n.skipWaiting()}))});n.addEventListener("activate",function(a){a.waitUntil(n.clients.claim())});var C,H=/^\/(.*)\/([gimuy]+)?$/,A=!1,z=!1;n.addEventListener("fetch",
function(a){if("GET"===a.request.method){var d=!1;if(["wp-admin/","wp-login."].forEach(function(c){d||(c=new RegExp("^([^/]+)?//"+n.location.host+"(:[0-9]+)?/"+c),(c.test(a.request.url)||c.test(a.request.referrer))&&(d=!0))}),!(d||a.request.url.match(/\&preview=true/)||a.request.url.match(/\&preview_nonce=/))){if(h&&q)return a.respondWith(B().then(function(c){if(!c||0===c.length)return l(a.request)["catch"](function(a){throw a;});if(C)try{clearTimeout(C)}catch(b){}C=setTimeout(E,500);var e=!1;if(c.forEach(function(b){if(!e&&
b.match&&0!==b.match.length){var c=!0;b.match.forEach(function(b){if(c)switch(b.type){case "url":if(b.regex)(d=w(b.pattern))?(f=d.test(a.request.url),b.not?f&&(c=!1):f||(c=!1)):c=!1;else if(b.pattern instanceof Array){var e=!1;b.pattern.forEach(function(b){e||-1!==a.request.url.indexOf(b)&&(e=!0)});b.not?e&&(c=!1):e||(c=!1)}else f=-1!==a.request.url.indexOf(b.pattern),b.not?f&&(c=!1):f||(c=!1);break;case "header":switch(b.name.toLowerCase()){case "referer":case "referrer":f=a.request.referrer;break;
default:f=a.request.headers.get(b.name)}if(f)if(b.regex){var d=w(b.pattern);d?(f=d.test(f),b.not?f&&(c=!1):f||(c=!1)):c=!1}else{var f=-1!==f.indexOf(b.pattern);b.not?f&&(c=!1):f||(c=!1)}else b.not||(c=!1)}});c&&(e=b)}}),!e)return console.info("Abtf.sw() \u27a4 policy \u27a4 no match",a.request.url),l(a.request)["catch"](function(a){throw a;});switch(console.info("Abtf.sw() \u27a4 policy \u27a4 match",a.request.url,e),e.strategy){case "cache":return r(a.request).then(function(b){if(b&&e.cache.max_age&&
b.headers.get("x-abtf-sw")<m()-e.cache.max_age&&(b=!1),b){var c=!0,d=e.cache.update_interval?!isNaN(parseInt(e.cache.update_interval))&&parseInt(e.cache.update_interval):!1;if(d){var h=b.headers.get("x-abtf-sw");h&&parseInt(h)>m()-d&&(c=!1)}return c&&function(a,b){setTimeout(function(){var c;if(e.cache.head_update&&(c=function(){clients.matchAll().then(function(b){b.forEach(function(b){b.postMessage([2,a.url])})})}),e.cache.head_update)console.info("Abtf.sw() \u27a4 HEAD \u27a4 verify",a.url),G(a,
e.cache,b,c);else{console.info("Abtf.sw() \u27a4 update cache",a.url);var d=p(a,e.cache);c&&d.then(c)}},10)}(a.request.clone(),b.clone()),console.info("Abtf.sw() \u27a4 from cache",a.request.url),b}return p(a.request,e.cache,function(b,c,d){return e.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 offline page",b.url),y(e.offline,b.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 empty 404 response",b.url,c,d),c||l(a.request.clone())["catch"](function(a){throw a;
}))})});case "event":return r(a.request).then(function(b){return b&&e.cache.max_age&&b.headers.get("x-abtf-sw")<m()-e.cache.max_age&&(b=!1),b?(console.info("Abtf.sw() \u27a4 from cache",a.request.url),b):p(a.request,null,function(b,c){return e.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 offline page",b.url),y(e.offline,b.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 empty 404 response",b.url,c),c||l(a.request)["catch"](function(a){throw a;
}))})});default:return p(a.request,e.cache,function(b,c,d){return console.warn("Abtf.sw() \u27a4 network failed",b.url,c||d),r(b).then(function(d){return d?(console.info("Abtf.sw() \u27a4 fallback from cache",b.url),d):e.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 offline page",b.url),y(e.offline,b.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 empty 404 response",b.url),c||l(a.request)["catch"](function(a){throw a;}))})})}}));B()}}});n.addEventListener("message",function(a){if(a&&
a.data&&a.data instanceof Array){if(1===a.data[0]){a.data[1]&&!isNaN(parseInt(a.data[1]))&&B(parseInt(a.data[1]));a.data[3]&&!isNaN(parseInt(a.data[3]))&&(t=parseInt(a.data[3]));var d="abtf:"+(a.data[2]?a.data[2]+":":"");d!==q&&(q=d,console.info("Abtf.sw() \u27a4 cache prefix changed",q));E()}if(2===a.data[0]&&a.data[1]){var c;"string"==typeof a.data[1]||a.data[1]instanceof Request?c=[a.data[1]]:a.data[1]instanceof Array&&(c=a.data[1]);c&&c.forEach(function(a){D(a)})}}})}(self,self.fetch,Cache);
