!function(m,n,x){function I(a,b,f){caches.open(t).then(function(c){var e={};b.headers.forEach(function(a,c){e[c]=a});e["x-abtf-sw"]=l();f&&f.max_age&&(e["x-abtf-sw-expire"]=f.max_age);b.blob().then(function(d){d=new Response(d,{status:b.status,statusText:b.statusText,headers:e});c.put(a,d)})})}function F(a){if(a)return"string"==typeof a&&(a=new Request(a,{mode:"no-cors"})),u(a).then(function(b){return b||(console.info("Abtf.sw() \u27a4 preload",a.url),q(a,{conditions:null}))})}function u(a){return caches.open(t).then(function(b){return b.match(a).then(function(b){if(b){var c=
b.headers.get("x-abtf-sw-expire");if(c)var e=b.headers.get("x-abtf-sw");var d=b.headers.get("expire");d&&(d=y(d));c&&e<l()-c?(b=!1,console.info("Abtf.sw() \u27a4 cache expired by policy",a.url,"max age:",c)):d&&d<l()&&(b=!1,console.info("Abtf.sw() \u27a4 cache expired by HTTP expire",a.url,b.headers.get("expire")))}return b})})}function B(a,b){return a=new Request(a),u(a).then(function(a){return a?a.blob().then(function(c){return new Response(c,{status:503,statusText:"Offline",headers:a.headers})}):
n(b)["catch"](function(a){throw a;})})}function J(a,b,f,c){var e=f.headers.get("etag"),d=y(f.headers.get("last-modified"));e||d?(f=new Request(a.url,{method:"HEAD",headers:a.headers,mode:"no-cors"}),n(f).then(function(p){var g=!1,h=p.headers.get("etag");p=y(p.headers.get("last-modified"));return(h&&h!==e?g=!0:p&&p!==d&&(g=!0),g)?(console.info("Abtf.sw() \u27a4 HEAD \u27a4 update",a.url),g=q(a,b),c&&(g=g.then(c)),g):null})["catch"](function(){var d=q(a,b);return c&&(d=d.then(c)),d})):(console.warn("Abtf.sw() \u27a4 HEAD \u27a4 no etag or last-modified",
a.url),f=q(a,b),c&&(f=f.then(c)))}function q(a,b,f){return n(a).then(function(c){if(c.ok&&400>c.status&&b){var e=!0;b.conditions&&(b.conditions.forEach(function(d){if(e)switch(d.type){case "url":d.regex?(g=z(d.pattern))?(h=g.test(a.url),d.not?h&&(e=!1):h||(e=!1)):e=!1:(h=-1!==a.url.indexOf(d.pattern),d.not?h&&(e=!1):h||(e=!1));break;case "header":var b=c.headers.get(d.name);if(b)if(d.regex){var g=z(d.pattern);g?(h=g.test(b),d.not?h&&(e=!1):h||(e=!1)):e=!1}else if("object"==typeof d.pattern)if(d.pattern.operator)if(b=
parseFloat(b),g=parseFloat(d.pattern.value),isNaN(b)||isNaN(g))e=!1;else{switch(d.pattern.operator){case "<":h=b<g;break;case ">":h=b>g;break;case "=":var h=b===g;break;default:e=!1}e&&(d.not?h&&(e=!1):h||(e=!1))}else e=!1;else-1===b.indexOf(d.pattern)&&(e=!1);else e=!1}}),e?console.info("Abtf.sw() \u27a4 cache condition \u27a4 cache",a.url,b.conditions):console.info("Abtf.sw() \u27a4 cache condition \u27a4 no cache",a.url,b.conditions));e&&I(a,c.clone(),b)}return c})["catch"](function(c){return f?
f(a,null,c):null})}function G(){C||(!D||D<l()-10)&&(C=!0,D=l(),caches.keys().then(function(a){return a&&0!==a.length?Promise.all(a.map(function(a){if(0!==a.indexOf(t))return console.info("Abtf.sw() \u27a4 old cache deleted",a),caches["delete"](a);caches.open(a).then(function(b){b.keys().then(function(c){if(console.info("Abtf.sw() \u27a4 prune cache",a,"size:",c.length,v),!(c.length<v)){var e=[],d=[],f=[];return c.forEach(function(a){d.push(a);f.push(b.match(a))}),Promise.all(f).then(function(a){var c=
l();a.forEach(function(a,g){if(a&&a.headers){var h=a.headers.get("x-abtf-sw");if(h){var f=a.headers.get("x-abtf-sw-expire");if(f&&h&&h<l()-f)return console.info("Abtf.sw() \u27a4 cache \u27a4 expired",a.url),void b["delete"](d[g])}else h=c;!1!==e&&e.push({t:h,r:d[g]})}});e&&e.length>v&&(e.sort(function(a,c){return a.t>c.t?-1:a.t<c.t?1:0}),e.slice(v).forEach(function(a){b["delete"](a.r)}))})}})})})).then(function(){C=!1}):Promise.resolve()}))}function z(a){if(a=a.match(K)){try{var b=new RegExp(a[1],
a[2])}catch(f){}return b||!1}}function y(a){if(a)return isNaN(parseInt(a))?(a=Date.parse(a),isNaN(a)?void 0:Math.round(a/1E3)):a}function l(){return Math.round(Date.now()/1E3)}function A(){return r?Promise.resolve():(r=!0,n("./abtf-pwa-config.json?"+Math.round(Date.now()/1E3),{mode:"no-cors"}).then(function(a){if(r=!1,a&&a.ok&&400>a.status)return a.json().then(function(a){if(console.info("Abtf.sw() \u27a4 config "+(k?"updated":"loaded"),a),a){a instanceof Array&&(a={policy:a});a.policy&&(k=a.policy,
w=l());var b=[];a.a&&b.push(a.a);a.policy&&a.policy.forEach(function(a){a.offline&&-1===b.indexOf(a.offline)&&b.push(a.offline)});a.preload&&a.preload.forEach(function(a){-1===b.indexOf(a)&&b.push(a)});b.forEach(function(a){F(a)})}});throw k=!1,Error("service worker config not found: ./abtf-pwa-config.json");})["catch"](function(a){k=r=!1;setTimeout(function(){throw a;})}))}function H(a){(new Promise(function(b){if(!k||!w||a&&a>w){var f=!k;A().then(function(){f&&b(k?k:!1)})["catch"](function(){f&&
b(!1)})}else if(!r&&w<l()-300){r=!0;var c=new Request("./abtf-pwa-config.json?"+Math.round(Date.now()/1E3),{method:"HEAD",mode:"no-cors"});n(c).then(function(a){r=!1;var c=!0;a&&a.ok&&(a=y(a.headers.get("last-modified")))&&a<=w&&(c=!1);c&&A()})["catch"](function(){r=!1;A()})}else b(k)}))["catch"](function(a){setTimeout(function(){throw a;})})}var t,k=!1,w=!1,v=1E3;x.prototype.add||(x.prototype.add=function(a){return this.addAll([a])});x.prototype.addAll||(x.prototype.addAll=function(a){function b(a){this.name=
"NetworkError";this.code=19;this.message=a}var f=this;return b.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(1>arguments.length)throw new TypeError;return a=a.map(function(a){return a instanceof Request?a:String(a)}),Promise.all(a.map(function(a){"string"==typeof a&&(a=new Request(a));var c=(new URL(a.url)).protocol;if("http:"!==c&&"https:"!==c)throw new b("Invalid scheme");return n(a.clone())["catch"](function(a){throw a;})}))}).then(function(c){return Promise.all(c.map(function(c,
b){return f.put(a[b],c)}))}).then(function(){})});CacheStorage.prototype.match||(CacheStorage.prototype.match=function(a,b){var f=this;return this.keys().then(function(c){var e;return c.reduce(function(c,p){return c.then(function(){return e||f.open(p).then(function(c){return c.match(a,b)}).then(function(a){return e=a})})},Promise.resolve())})});m.addEventListener("install",function(a){a.waitUntil(A().then(function(){m.skipWaiting()})["catch"](function(){m.skipWaiting()}))});m.addEventListener("activate",
function(a){a.waitUntil(m.clients.claim())});var r,E,K=/^\/(.*)\/([gimuy]+)?$/,D=!1,C=!1;m.addEventListener("fetch",function(a){if("GET"===a.request.method){var b=!1;if(["wp-admin/","wp-login.php"].forEach(function(c){b||(c=new RegExp("^([^/]+)?//"+m.location.host+"(:[0-9]+)?/"+c),(c.test(a.request.url)||a.request.referrer&&c.test(a.request.referrer))&&(b=!0))}),!(b||a.request.url.match(/\&preview=true/)||a.request.url.match(/\&preview_nonce=/))&&(H(),k&&t)){var f=function(a,b){if(!b||0===b.length)return!1;
if(E)try{clearTimeout(E)}catch(p){}E=setTimeout(G,500);var d=!1;if(b.forEach(function(b){if(!d&&b.match&&0!==b.match.length){var c=!0;b.match.forEach(function(b){if(c)switch(b.type){case "url":if(b.regex)(f=z(b.pattern))?(g=f.test(a.request.url),b.not?g&&(c=!1):g||(c=!1)):c=!1;else if(b.pattern instanceof Array){var d=!1;b.pattern.forEach(function(b){d||-1!==a.request.url.indexOf(b)&&(d=!0)});b.not?d&&(c=!1):d||(c=!1)}else g=-1!==a.request.url.indexOf(b.pattern),b.not?g&&(c=!1):g||(c=!1);break;case "header":switch(b.name.toLowerCase()){case "referer":case "referrer":e=
a.request.referrer;break;default:var e=a.request.headers.get(b.name)}if(e)if(b.regex){var f=z(b.pattern);f?(g=f.test(e),b.not?g&&(c=!1):g||(c=!1)):c=!1}else{var g=-1!==e.indexOf(b.pattern);b.not?g&&(c=!1):g||(c=!1)}else b.not||(c=!1)}});c&&(d=b)}}),!d)return console.info("Abtf.sw() \u27a4 policy \u27a4 no match",a.request.url),!1;switch(console.info("Abtf.sw() \u27a4 policy \u27a4 match",a.request.url,d),d.strategy){case "never":return!1;case "cache":return u(a.request).then(function(b){if(b){var c=
!0,e=d.cache.update_interval?!isNaN(parseInt(d.cache.update_interval))&&parseInt(d.cache.update_interval):!1;if(e){var f=b.headers.get("x-abtf-sw");f&&parseInt(f)>l()-e&&(c=!1)}return c&&function(a,b){setTimeout(function(){var c;if(d.cache.head_update&&(c=function(){clients.matchAll().then(function(b){b.forEach(function(b){b.postMessage([2,a.url])})})}),d.cache.head_update)console.info("Abtf.sw() \u27a4 HEAD \u27a4 verify",a.url),J(a,d.cache,b,c);else{console.info("Abtf.sw() \u27a4 update cache",
a.url);var e=q(a,d.cache);c&&e.then(c)}},10)}(a.request.clone(),b.clone()),console.info("Abtf.sw() \u27a4 from cache",a.request.url),b}return q(a.request,d.cache,function(b,c,e){return d.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 offline page",b.url),B(d.offline,b.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 empty 404 response",b.url,c,e),c||n(a.request.clone())["catch"](function(a){throw a;}))})});case "event":return u(a.request).then(function(b){return b?
(console.info("Abtf.sw() \u27a4 from cache",a.request.url),b):q(a.request,null,function(b,c){return d.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 offline page",b.url),B(d.offline,b.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 empty 404 response",b.url,c),c||n(a.request)["catch"](function(a){throw a;}))})});default:return q(a.request,d.cache,function(b,c,e){return console.warn("Abtf.sw() \u27a4 network failed",b.url,c||e),u(b).then(function(e){return e?
(console.info("Abtf.sw() \u27a4 fallback from cache",b.url),e):d.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 offline page",b.url),B(d.offline,b.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 empty 404 response",b.url),c||n(a.request)["catch"](function(a){throw a;}))})})}}(a,k);if(!1!==f)return a.respondWith(f)}}});m.addEventListener("message",function(a){if(a&&a.data&&a.data instanceof Array){if(1===a.data[0]){a.data[1]&&!isNaN(parseInt(a.data[1]))&&H(parseInt(a.data[1]));a.data[3]&&
!isNaN(parseInt(a.data[3]))&&(v=parseInt(a.data[3]));var b="abtf:"+(a.data[2]?a.data[2]+":":"");b!==t&&(t=b,console.info("Abtf.sw() \u27a4 cache prefix changed",t));G()}if(2===a.data[0]||3===a.data[0])var f=a.ports[0]?function(b,c){a.ports[0].postMessage({error:b,status:c})}:!1;if(2===a.data[0])if(a.data[1]){var c;if("string"==typeof a.data[1]||a.data[1]instanceof Request?c=[a.data[1]]:a.data[1]instanceof Array&&(c=a.data[1]),c){var e=[];c.forEach(function(a){e.push(F(a))});f&&Promise.all(e).then(function(a){var b=
[];a.forEach(function(a){var c={url:a.url,status:a.status,statusText:a.statusText};a=a.headers.get("content-length");c.size=isNaN(parseInt(a))?-1:parseInt(a);b.push(c)});f(null,b)})["catch"](function(a){console.error("Abtf.sw() \u27a4 preload",a)})}else f&&f("invalid-data")}else f&&f("no-urls");3===a.data[0]&&(m.registration.showNotification(a.data[1],a.data[2]),f&&f(null,"sent"))}})}(self,self.fetch,Cache);
