!function(p,h,v){function G(a,c,b){caches.open(r).then(function(d){var f={};c.headers.forEach(function(a,d){f[d]=a});f["x-abtf-sw"]=k();b&&b.max_age&&(f["x-abtf-sw-expire"]=b.max_age);c.blob().then(function(b){b=new Response(b,{status:c.status,statusText:c.statusText,headers:f});d.put(a,b)})})}function E(a){a&&("string"==typeof a&&(a=new Request(a,{mode:"no-cors"})),t(a).then(function(c){return c||n(a,{conditions:null})}))}function t(a){return caches.open(r).then(function(c){return c.match(a)})}function z(a,
c){return a=new Request(a),t(a).then(function(a){return a?a.blob().then(function(d){return new Response(d,{status:503,statusText:"Offline",headers:a.headers})}):h(c)["catch"](function(a){throw a;})})}function H(a,c,b,d){var f=b.headers.get("etag"),g=b.headers.get("last-modified");f||g?(b=new Request(a.url,{method:"HEAD",headers:a.headers,mode:"no-cors"}),h(b).then(function(b){var l=!1,e=b.headers.get("etag");b=b.headers.get("last-modified");return(e&&e!==f?l=!0:b&&b!==g&&(l=!0),l)?(l=n(a,c),d&&(l=
l.then(d)),l):null})["catch"](function(){var b=n(a,c);return d&&(b=b.then(d)),b})):(b=n(a,c),d&&(b=b.then(d)))}function n(a,c,b){return h(a).then(function(d){if(d.ok&&400>d.status&&c){var b=!0;c.conditions&&c.conditions.forEach(function(g){if(b)switch(g.type){case "url":g.regex?(f=w(g.pattern))?(e=f.test(a.url),g.not?e&&(b=!1):e||(b=!1)):b=!1:(e=-1!==a.url.indexOf(g.pattern),g.not?e&&(b=!1):e||(b=!1));break;case "header":var c=d.headers.get(g.name);if(c)if(g.regex){var f=w(g.pattern);f?(e=f.test(c),
g.not?e&&(b=!1):e||(b=!1)):b=!1}else if("object"==typeof g.pattern)if(g.pattern.operator)if(c=parseFloat(c),f=parseFloat(g.pattern.value),isNaN(c)||isNaN(f))b=!1;else{switch(g.pattern.operator){case "<":e=c<f;break;case ">":e=c>f;break;case "=":var e=c===f;break;default:b=!1}b&&(g.not?e&&(b=!1):e||(b=!1))}else b=!1;else-1===c.indexOf(g.pattern)&&(b=!1);else b=!1}});b&&G(a,d.clone(),c)}return d})["catch"](function(d){return b?b(a,null,d):null})}function F(){A||(!B||B<k()-10)&&(A=!0,B=k(),caches.keys().then(function(a){return a&&
0!==a.length?Promise.all(a.map(function(a){if(0!==a.indexOf(r))return caches["delete"](a);caches.open(a).then(function(a){a.keys().then(function(b){if(b.length<x)return this;var d=[],c=[],q=[];return b.forEach(function(b){c.push(b);q.push(a.match(b))}),Promise.all(q).then(function(b){var g=k();return b.forEach(function(b,f){if(b&&b.headers){var e=b.headers.get("x-abtf-sw");if(e){var l=b.headers.get("x-abtf-sw-expire");if(l&&e&&e<k()-l)return void a["delete"](c[f])}else e=g;!1!==d&&d.push({t:e,r:c[f]})}}),
d&&d.length>x&&(d.sort(function(a,b){return a.t>b.t?-1:a.t<b.t?1:0}),d.slice(x).forEach(function(b){a["delete"](b.r)})),this})})})})).then(function(){A=!1}):Promise.resolve()}))}function w(a){if(a=a.match(I)){try{var c=new RegExp(a[1],a[2])}catch(b){}return c||!1}}function k(){return Math.round(Date.now()/1E3)}function y(){return h("./abtf-pwa-config.json",{mode:"no-cors"}).then(function(a){if(a&&a.ok&&400>a.status)return a.json().then(function(a){if(a){a instanceof Array&&(a={policy:a});a.policy&&
(m=a.policy,u=k());var b=[];a.policy&&a.policy.forEach(function(a){a.offline&&-1===b.indexOf(a.offline)&&b.push(a.offline)});a.preload&&a.preload.forEach(function(a){-1===b.indexOf(a)&&b.push(a)});b.forEach(function(a){E(a)})}});throw m=!1,Error("service worker config not found: ./abtf-pwa-config.json");})["catch"](function(a){throw m=!1,a;})}function C(a){return(new Promise(function(c,b){if(m&&c(m),!m||!u||a&&a>u){var d=!m;y().then(function(){d&&(m?c(m):b())})["catch"](function(){d&&b()})}else if(u<
k()-300){var f=new Request("./abtf-pwa-config.json",{method:"HEAD",mode:"no-cors"});h(f).then(function(a){var b=!0;a&&a.ok&&(a=a.headers.get("last-modified"))&&a<=u&&(b=!1);b&&y()})["catch"](function(){y()})}}))["catch"](function(a){throw a;})}var r,m=!1,u=!1,x=1E3;v.prototype.add||(v.prototype.add=function(a){return this.addAll([a])});v.prototype.addAll||(v.prototype.addAll=function(a){function c(a){this.name="NetworkError";this.code=19;this.message=a}var b=this;return c.prototype=Object.create(Error.prototype),
Promise.resolve().then(function(){if(1>arguments.length)throw new TypeError;return a=a.map(function(a){return a instanceof Request?a:String(a)}),Promise.all(a.map(function(a){"string"==typeof a&&(a=new Request(a));var b=(new URL(a.url)).protocol;if("http:"!==b&&"https:"!==b)throw new c("Invalid scheme");return h(a.clone())["catch"](function(a){throw a;})}))}).then(function(d){return Promise.all(d.map(function(d,c){return b.put(a[c],d)}))}).then(function(){})});CacheStorage.prototype.match||(CacheStorage.prototype.match=
function(a,c){var b=this;return this.keys().then(function(d){var f;return d.reduce(function(d,q){return d.then(function(){return f||b.open(q).then(function(b){return b.match(a,c)}).then(function(a){return f=a})})},Promise.resolve())})});p.addEventListener("install",function(a){a.waitUntil(y().then(function(){p.skipWaiting()})["catch"](function(){p.skipWaiting()}))});p.addEventListener("activate",function(a){a.waitUntil(p.clients.claim())});var D,I=/^\/(.*)\/([gimuy]+)?$/,B=!1,A=!1;p.addEventListener("fetch",
function(a){if("GET"===a.request.method&&!(a.request.url.match(/wp-admin/)||a.request.url.match(/preview=true/)||a.request.url.match(/\/wp-login\./))){if(m&&r)return a.respondWith(C().then(function(c){if(!c||0===c.length)return h(a.request)["catch"](function(a){throw a;});if(D)try{clearTimeout(D)}catch(d){}D=setTimeout(F,500);var b=!1;if(c.forEach(function(d){if(!b&&d.match&&0!==d.match.length){var c=!0;d.match.forEach(function(b){if(c)switch(b.type){case "url":if(b.regex)(f=w(b.pattern))?(e=f.test(a.request.url),
b.not?e&&(c=!1):e||(c=!1)):c=!1;else if(b.pattern instanceof Array){var d=!1;b.pattern.forEach(function(b){d||-1!==a.request.url.indexOf(b)&&(d=!0)});b.not?d&&(c=!1):d||(c=!1)}else e=-1!==a.request.url.indexOf(b.pattern),b.not?e&&(c=!1):e||(c=!1);break;case "header":if(e=a.request.headers.get(b.name))if(b.regex){var f=w(b.pattern);f?(e=f.test(e),b.not?e&&(c=!1):e||(c=!1)):c=!1}else{var e=-1!==e.indexOf(b.pattern);b.not?e&&(c=!1):e||(c=!1)}else b.not||(c=!1)}});c&&(b=d)}}),!b)return h(a.request)["catch"](function(a){throw a;
});switch(b.strategy){case "cache":return t(a.request).then(function(c){if(c&&b.cache.max_age&&c.headers.get("x-abtf-sw")<k()-b.cache.max_age&&(c=!1),c){var d=!0,g=b.cache.update_interval?!isNaN(parseInt(b.cache.update_interval))&&parseInt(b.cache.update_interval):!1;if(g){var q=c.headers.get("x-abtf-sw");q&&parseInt(q)>k()-g&&(d=!1)}return d&&function(a,c){setTimeout(function(){var d;if(b.cache.head_update&&(d=function(){clients.matchAll().then(function(b){b.forEach(function(b){b.postMessage([2,
a.url])})})}),b.cache.head_update)H(a,b.cache,c,d);else{var e=n(a,b.cache);d&&e.then(d)}},10)}(a.request.clone(),c.clone()),c}return n(a.request,b.cache,function(c,d){return b.offline?z(b.offline,c.clone()):d||h(a.request.clone())["catch"](function(a){throw a;})})});case "event":return t(a.request).then(function(c){return c&&b.cache.max_age&&c.headers.get("x-abtf-sw")<k()-b.cache.max_age&&(c=!1),c||n(a.request,null,function(c,d){return b.offline?z(b.offline,c.clone()):d||h(a.request)["catch"](function(a){throw a;
})})});default:return n(a.request,b.cache,function(c,f){return t(c).then(function(d){return d||(b.offline?z(b.offline,c.clone()):f||h(a.request)["catch"](function(a){throw a;}))})})}}));C()}});p.addEventListener("message",function(a){if(a&&a.data&&a.data instanceof Array){if(1===a.data[0]){a.data[1]&&!isNaN(parseInt(a.data[1]))&&C(parseInt(a.data[1]));a.data[3]&&!isNaN(parseInt(a.data[3]))&&(x=parseInt(a.data[3]));var c="abtf:"+(a.data[2]?a.data[2]+":":"");c!==r&&(r=c);F()}if(2===a.data[0]&&a.data[1]){var b;
"string"==typeof a.data[1]||a.data[1]instanceof Request?b=[a.data[1]]:a.data[1]instanceof Array&&(b=a.data[1]);b&&b.forEach(function(a){E(a)})}}})}(self,self.fetch,Cache);
