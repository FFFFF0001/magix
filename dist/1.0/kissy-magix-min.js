KISSY.add("magix/body",function(k,a,t){var v=a.has,i=a.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),h=document.body,q={},p={},u=65536,o=function(n,e,g){g?n.setAttribute(e,g):g=n.getAttribute(e);return g},r,s={process:function(n){for(var e=n.target||n.srcElement;e&&1!=e.nodeType;)e=e.parentNode;var g=e,a=n.type,i=p[a]||(p[a]=RegExp("(?:^|,)"+a+"(?:,|$)"));if(!i.test(o(e,"mx-ie"))){for(var m="mx-"+a,l,d,c=[];g&&g!=h&&!(l=o(g,m),d=o(g,"mx-ie"),l||i.test(d));)c.push(g),
g=g.parentNode;if(l){a=o(g,"mx-owner");if(!a){i=g;for(d=r.all();i&&i!=h;)if(v(d,i.id)){o(g,"mx-owner",a=i.id);break}else i=i.parentNode}if(a)(a=(a=r.get(a))&&a.view)&&a.processEvent({info:l,se:n,tId:e.id||(e.id="mx-e-"+u--),cId:g.id||(g.id="mx-e-"+u--)});else throw Error("miss mx-owner:"+l);}else for(;c.length;)n=c.shift(),d=o(n,"mx-ie"),i.test(d)||(d=d?d+","+a:a,o(n,"mx-ie",d))}},on:function(a,e){var g=this;q[a]?q[a]++:(r=e,q[a]=1,i[a]?g.unbubble(0,h,a):h["on"+a]=function(a){(a=a||window.event)&&
g.process(a)})},un:function(a){var e=q[a];0<e&&(e--,e||(i[a]?this.unbubble(1,h,a):h["on"+a]=null),q[a]=e)}};s.unbubble=function(a,e,g){(a?t.undelegate:t.delegate).call(t,e,g,"[mx-"+g+"]",s.process)};return s},{requires:["magix/magix","event","sizzle"]});
KISSY.add("magix/event",function(k,a){var t=a.safeExec;return{fire:function(a,i,h,q){var p="~"+a,k=this[p];if(k){i||(i={});if(!i.type)i.type=a;for(var a=k.length,o=a-1,r,s;a--;){r=q?a:o-a;s=k[r];if(s.d||s.r)k.splice(r,1),o--;s.d||t(s.f,i,this)}}h&&delete this[p]},on:function(k,i,h){k="~"+k;k=this[k]||(this[k]=[]);a.isNumeric(h)?k.splice(h,0,{f:i}):k.push({f:i,r:h})},un:function(a,i){var h="~"+a,k=this[h];if(k)if(i)for(var h=k.length-1,p;0<=h;h--){if(p=k[h],p.f==i&&!p.d){p.d=1;break}}else delete this[h]}}},
{requires:["magix/magix"]});
KISSY.add("magix/magix",function(k){var a=[].slice,t=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,v=/\/[^\/]*$/,i=/[#?].*$/,h=/([^=&?\/#]+)=([^&=#?]*)/g,q=/^https?:\/\//i,p={},u=0,o={debug:false,iniFile:"app/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},r=p.hasOwnProperty,s=function(c){return function(a,f,b){switch(arguments.length){case 0:b=c;break;case 1:b=d.isObject(a)?w(c,a):g(c,a)?c[a]:null;break;case 2:null===f?(delete c[a],b=f):c[a]=b=f}return b}},n=function(c){this.c=
[];this.x=c||20;this.b=this.x+5},e=function(c){return new n(c)},g=function(c,a){return c?r.call(c,a):0},w=function(c,a,f){for(var b in a)if(!f||!g(f,b))c[b]=a[b];return c};w(n.prototype,{get:function(c){var a=this.c,f,c="pathname"+c;if(g(a,c)&&(f=a[c],1<=f.f))f.f++,f.t=u++,f=f.v;return f},set:function(c,a){var f=this.c,c="pathname"+c,b=f[c];if(!g(f,c)){if(f.length>=this.b){f.sort(function(b,c){return c.f==b.f?c.t-b.t:c.f-b.f});for(var j=this.b-this.x;j--;)b=f.pop(),delete f[b.k]}b={};f.push(b);f[c]=
b}b.k=c;b.v=a;b.f=1;b.t=u++;return b},del:function(c){var c="pathname"+c,a=this.c,f=a[c];if(f)f.f=-1E5,f.v="",delete a[c]},has:function(c){return g(this.c,"pathname"+c)}});var x=e(60),m=e(),l=function(c,a,f,b,j,y){d.isArray(c)||(c=[c]);if(!a||!d.isArray(a)&&!a.callee)a=[a];for(b=0;b<c.length;b++)try{y=c[b],j=d.isFunction(y)&&y.apply(f,a)}catch(m){}return j},d={isNumeric:function(c){return!isNaN(parseFloat(c))&&isFinite(c)},mix:w,has:g,safeExec:l,noop:function(){},config:s(o),start:function(c){var a=
this,c=w(o,c);a.libEnv(c);a.libRequire(c.iniFile,function(f){o=w(c,f,c);var b=c.progress;a.libRequire(["magix/router","magix/vom"],function(j,f){j.on("!ul",f.locChged);j.on("changed",f.locChged);b&&f.on("progress",b);a.libRequire(c.extensions,j.start)})});c.ready&&(l(c.ready),delete c.ready)},keys:Object.keys||function(c){var a=[],f;for(f in c)g(c,f)&&a.push(f);return a},local:s({}),path:function(c,a){var f=c+"\n"+a,b=m.get(f);if(!b){q.test(a)?b=a:(c=c.replace(i,"").replace(v,"")+"/","/"==a.charAt(0)?
(b=q.test(c)?8:0,b=c.indexOf("/",b),b=c.substring(0,b)+a):b=c+a);for(;t.test(b);)b=b.replace(t,"$1/");m.set(f,b)}return b},pathToObject:function(c,a){var f=x.get(c);if(!f){var f={},b={},j="";i.test(c)?j=c.replace(i,""):~c.indexOf("=")||(j=c);if(j&&q.test(j))var d=j.indexOf("/",8),j=-1==d?"/":j.substring(d);c.replace(h,function(c,f,j){if(a)try{j=decodeURIComponent(j)}catch(d){}b[f]=j});f.pathname=j;f.params=b;x.set(c,f)}return f},objectToPath:function(c,a){var f=c.pathname,b=[],j=c.params,d,m;for(m in j)d=
j[m],a&&encodeURIComponent(d),b.push(m+"="+d);return f+(f&&b.length?"?":"")+b.join("&")},tmpl:function(c,a){return 1==arguments.length?{v:p[c],h:g(p,c)}:p[c]=a},listToMap:function(a,d){var f,b,j={},m;this.isString(a)&&(a=a.split(","));if(a&&(m=a.length))for(f=0;f<m;f++)b=a[f],j[d?b[d]:b]=d?b:1;return j},createCache:e};return w(d,{libRequire:function(c,d){c?k.use(c.toString(),function(c){d&&d.apply(c,a.call(arguments,1))}):d&&d()},libEnv:function(a){var d=a.appHome,f=location,b=a.appName,d=this.path(f.href,
d+"/");a.appHome=d;var j=a.debug;j&&(j=0==d.indexOf(f.protocol+"//"+f.host+"/"));f="";(f=j?k.now():a.appTag)&&(f+=".js");k.config({packages:[{name:b,path:d,debug:a.debug=j,combine:a.appCombine,tag:f}]})},isArray:k.isArray,isFunction:k.isFunction,isObject:k.isObject,isRegExp:k.isRegExp,isString:k.isString,isNumber:k.isNumber})});
KISSY.add("magix/router",function(k,a,t,v){var i=window,h=a.has,q=a.mix,p=document,u=/^UTF-8$/i.test(p.charset||p.characterSet||"UTF-8"),o=a.config(),r=a.createCache(),s=a.createCache(),n,e,g,w=65536,x=/#.*$/,m=/^[^#]*#?!?/,l=o.nativeHistory,d,c,A=function(b,c,d){if(b){d=this.params;a.isArray(b)||(b=b.split(","));for(var j=0;j<b.length&&!(c=h(d,b[j]));j++);}return c},f=function(){return h(this,"pathname")},b=function(){return h(this,"view")},j=function(){return this.hash.pathname!=this.query.pathname},
y=function(b){return this.hash.params[b]!=this.query.params[b]},B=function(b){return h(this.hash.params,b)},C=function(b){return h(this.query.params,b)},D=function(b){return this.params[b]},z=q({getView:function(b){if(!g){g={routes:o.routes||{},e404:o.notFoundView};var c=o.defaultView;if(!c)throw Error("unset defaultView");g.home=c;var d=o.defaultPathname||"";g.routes[d]=c;g.pathname=d}b||(b=g.pathname);c=g.routes;c=a.isFunction(c)?c.call(o,b):c[b];return{view:c?c:g.e404||g.home,pathname:c?b:g.e404?
b:g.pathname}},start:function(){var b=z,a=i.history;d=l&&a.pushState;c=l&&!d;d?b.useState():b.useHash();b.route()},path:function(b){var b=a.pathToObject(b,u),d=b.pathname;d&&c&&(b.pathname=a.path(i.location.pathname,d));return b},parseQH:function(b,a){var b=b||i.location.href,c=z,d=r.get(b);if(!d){var d=b.replace(x,""),f=b.replace(m,""),e=c.path(d),g=c.path(f),h={};q(h,e.params);q(h,g.params);d={pathnameDiff:j,paramDiff:y,hashOwn:B,queryOwn:C,get:D,href:b,srcQuery:d,srcHash:f,query:e,hash:g,params:h};
r.set(b,d)}a&&!d.view&&(c=c.getView(l?d.hash.pathname||d.query.pathname:d.hash.pathname),q(d,c));return d},getChged:function(a,c){var d=c.href,j=a.href+"\n"+d,m=s.get(j);m||(j=d+"\n"+j,m=s.get(j));if(!m){var e,m={params:{}};if(a.pathname!=c.pathname)e=m.pathname=1;if(a.view!=c.view)e=m.view=1;var d=a.params,g=c.params,l;for(l in d)d[l]!=g[l]&&(e=1,m.params[l]=1);for(l in g)d[l]!=g[l]&&(e=1,m.params[l]=1);m.occur=e;m.isParam=A;m.isPathname=f;m.isView=b;s.set(j,m)}return m},route:function(){var b=z,
a=b.parseQH(0,1),c=e||{params:{},href:"~"},d=!e;e=a;c=b.getChged(c,a);c.occur&&(n=a,b.fire("changed",{location:a,changed:c,force:d}))},navigate:function(b,j){var f=z;!j&&a.isObject(b)&&(j=b,b="");j&&(b=a.objectToPath({params:j,pathname:b},u));if(b){var m=f.path(b),e={};e.params=q({},m.params);e.pathname=m.pathname;if(e.pathname){if(c&&(m=n.query)&&(m=m.params))for(var l in m)h(m,l)&&!h(e.params,l)&&(e.params[l]="")}else l=q({},n.params),e.params=q(l,e.params),e.pathname=n.pathname;l=a.objectToPath(e);
if(d?l!=n.srcQuery:l!=n.srcHash)d?(f.poped=1,history.pushState(w--,p.title,l),f.route()):(q(e,n,e),e.srcHash=l,e.hash={params:e.params,pathname:e.pathname},f.fire("!ul",{loc:n=e}),location.hash="#!"+l)}}},t);z.useState=function(){var b=z,a=location.href;v.on(i,"popstate",function(){var c=location.href==a;if(b.poped||!c)b.poped=1,b.route()})};z.useHash=function(){v.on(i,"hashchange",z.route)};return z},{requires:["magix/magix","magix/event","event"]});
KISSY.add("magix/vframe",function(k,a,t,v){var i=document,h=65536,q=window.CollectGarbage||a.noop,p=a.mix,k=a.config(),u=k.tagName,o=k.rootId,r=a.has,s,n,e=function(a){return"object"==typeof a?a:i.getElementById(a)};i.createElement(u);var g=/<script[^>]*>[\s\S]*?<\/script>/ig,w,x=function(a){this.id=a;this.cM={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};p(x,{root:function(a,l){if(!s){w=l;var d=e(o);if(!d)d=i.createElement(u),d.id=o,i.body.insertBefore(d,i.body.firstChild);s=new x(o);a.add(s)}return s}});
p(p(x.prototype,t),{mountView:function(m,l){var d=this,c=e(d.id);c._bak?c._chgd=1:(c._bak=1,c._tmpl=c.innerHTML.replace(g,""));d.unmountView();if(m){var h=a.pathToObject(m),f=h.pathname,b=--d.sign;a.libRequire(f,function(a){if(b==d.sign){var m=d.owner;v.prepare(a);var g=new a({owner:d,id:d.id,$:e,path:f,vom:m,location:w});d.view=g;g.on("interact",function(b){d.fire("viewInteract",{view:g});d.viewUsable=1;if(!b.tmpl){if(c._chgd)c.innerHTML=c._tmpl;d.mountZoneVframes(0,0,1)}g.on("rendered",function(){d.mountZoneVframes(0,
0,1)});g.on("prerender",function(){d.unmountZoneVframes()})},0);l=l||{};g.load(p(l,h.params,l))}})}},unmountView:function(){if(this.view){n||(n={caused:this.id});this.unmountZoneVframes();this.cAlter(n);this.view.destroy();var a=e(this.id);if(a&&a._bak)a.innerHTML=a._tmpl;delete this.view;delete this.viewUsable;n=0;this.fire("viewUnmounted");q()}this.un("viewInteract");this.sign--},mountVframe:function(a,e,d,c){var g=this.owner,f=g.get(a);if(!f)f=new x(a),f.pId=this.id,r(this.cM,a)||this.cC++,this.cM[a]=
c,g.add(f);f.mountView(e,d);return f},mountZoneVframes:function(a,l,d){this.unmountZoneVframes(a);var a=e(a||this.id).getElementsByTagName(u),c=a.length,g={};if(c)for(var f=0,b,j,y,i;f<c;f++){b=a[f];j=b.id||(b.id="magix_vf_"+h--);r(g,j)||(y=b.getAttribute("mx-view"),i=b.getAttribute("mx-defer"),(!i||y)&&this.mountVframe(j,y,l,d));b=e(b).getElementsByTagName(u);j=0;for(y=b.length;j<y;j++)g[b[j].id||(b[j].id="magix_vf_"+h--)]=1}this.cC==this.rC&&this.cCreated({})},unmountVframe:function(a){var a=a||
this.id,e=this.owner,d=e.get(a);if(d){var c=d.fcc;d.unmountView();e.remove(a,c);if((e=e.get(d.pId))&&r(e.cM,a))delete e.cM[a],e.cC--}},unmountZoneVframes:function(a){if(a){for(var a=e(a).getElementsByTagName(u),g={},d=this.cM,c=a.length-1,h;0<=c;c--)h=a[c].id,r(d,h)&&(g[h]=1);a=g}else a=this.cM;for(var f in a)this.unmountVframe(f)},cCreated:function(a){var e=this.view;if(e&&!this.fcc)this.fcc=1,delete this.fca,e.fire("created",a),this.fire("created",a);var d=this.owner;d.vfCreated();e=this.id;if((d=
d.get(this.pId))&&!r(d.rM,e))d.rM[e]=d.cM[e],d.rC++,d.rC==d.cC&&d.cCreated(a)},cAlter:function(a){delete this.fcc;if(!this.fca){var e=this.view,d=this.id;if(e)this.fca=1,e.fire("alter",a),this.fire("alter",a);if((e=this.owner.get(this.pId))&&r(e.rM,d)){var c=e.rM[d];e.rC--;delete e.rM[d];c&&e.cAlter(a)}}},locChged:function(e,g){var d=this.view;if(d&&d.sign&&d.rendered){var c=d.olChanged(g),h={location:e,changed:g,prevent:function(){this.cs=[]},toChildren:function(b){b=b||[];a.isString(b)&&(b=b.split(","));
this.cs=b}};c&&a.safeExec(d.locationChange,h,d);for(var d=h.cs||a.keys(this.cM),c=0,h=d.length,f=this.owner,b;c<h;c++)(b=f.get(d[c]))&&b.locChged(e,g)}}});return x},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(k,a,t,v,i){var h=a.safeExec,q=a.has,p=[],u=a.config(),o=a.mix,r=a.listToMap("render,renderUI"),s=function(b){return function(){var a;this.sign&&(this.sign++,this.fire("rendercall"),a=b.apply(this,arguments));return a}},n=function(b){o(this,b);this.sign=1};o(n,{wrapAsyn:function(){if(!this["~"]){this["~"]=1;var b=this.prototype,c,d;for(d in r)c=b[d],a.isFunction(c)&&(b[d]=s(c))}}});var e=n.prototype,g=window.CollectGarbage||a.noop,w=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,
x=/\smx-owner\s*=/,m=/\smx-[^v][a-z]+\s*=/,l=function(b){return!x.test(b)&&m.test(b)?b+' mx-owner="'+l.t+'"':b},d={prevent:function(b){b=b||this.domEvent;b.preventDefault?b.preventDefault():b.returnValue=!1},stop:function(b){b=b||this.domEvent;b.stopPropagation?b.stopPropagation():b.cancelBubble=!0},halt:function(b){this.prevent(b);this.stop(b)}},c=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,A=/(\w+):([^,]+)/g;o(e,t);o(e,{render:a.noop,locationChange:a.noop,init:a.noop,hasTmpl:!0,enableEvent:!0,load:function(){var b=
this,a=b.hasTmpl,c=arguments,d=b.sign,e=q(b,"template"),f=function(f){if(d==b.sign){if(!e)b.template=b.wrapMxEvent(f);b.delegateEvents();b.fire("interact",{tmpl:a},1);h(b.init,c,b);h(b.render,p,b);if(!a&&!b.rendered)b.rendered=!0,b.fire("primed",null,1)}};a&&!e?b.fetchTmpl(f):f()},beginUpdateHTML:function(){this.sign&&this.rendered&&(this.fire("refresh",0,1),this.fire("prerender"))},endUpdateHTML:function(){if(this.sign)this.rendered||this.fire("primed",0,1),this.rendered=!0,this.fire("rendered"),
g()},wrapMxEvent:function(b){l.t=this.id;return(""+b).replace(w,l)},setViewHTML:function(b){this.beginUpdateHTML();if(this.sign)this.$(this.id).innerHTML=b;this.endUpdateHTML()},observeLocation:function(b){var c;if(!this.$ol)this.$ol={keys:[]};c=this.$ol;var d=c.keys;if(a.isObject(b))c.pn=b.pathname,b=b.keys;if(b)c.keys=d.concat(a.isString(b)?b.split(","):b)},olChanged:function(b){var a=this.$ol;if(a){var c=0;a.pn&&(c=b.isPathname());c||(c=b.isParam(a.keys));return c}return 1},destroy:function(){this.fire("refresh",
0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),c=null;if(a&&a.viewUsable)c=a.view;return c},processEvent:function(a){if(this.enableEvent&&this.sign){var e=a.se,f=a.info.match(c),g=f[1],i=f[2],f=f[3],l=this.events;if(l){var k=l[e.type];(i=d[i])&&i(e);if(k&&k[g]){var m={};f&&f.replace(A,function(a,b,c){m[b]=c});h(k[g],o({view:this,currentId:a.cId,targetId:a.tId,domEvent:e,events:l,params:m},d),k)}}}},delegateEvents:function(a){var c=
this.events,a=a?v.un:v.on,d=this.vom,e;for(e in c)a.call(v,e,d)}});var f=function(a,c,d){for(var e in c)k.isObject(c[e])?(q(a,e)||(a[e]={}),f(a[e],c[e],1)):d&&(a[e]=c[e])};n.prototype.fetchTmpl=function(b){var c=this,d=c.template;if(k.isUndefined(d))if(d=a.tmpl(c.path),d.h)b(d.v);else{var e=u.appHome+c.path+".html",g=f[e],d=function(d){b(a.tmpl(c.path,d))};g?g.push(d):(g=f[e]=[d],i({url:e+(u.debug?"?t="+k.now():""),success:function(a){h(g,a);delete f[e]},error:function(a,b){h(g,b);delete f[e]}}))}else b(d)};
n.extend=function(a,c){var d=function(){d.superclass.constructor.apply(this,arguments);c&&h(c,arguments,this)};d.extend=this.extend;return k.extend(d,this,a)};n.prepare=function(a){if(!a.wrapAsyn){a.wrapAsyn=this.wrapAsyn;a.extend=this.extend;for(var c=a.prototype,d=a.superclass;d;)d=d.constructor,f(c,d.prototype),d=d.superclass}a.wrapAsyn()};return n},{requires:["magix/magix","magix/event","magix/body","ajax"]});
KISSY.add("magix/vom",function(k,a,t,v){var i=t.has,h=t.mix,q=0,p=0,u=0,o=0,r={},s={},n=t.mix({all:function(){return r},add:function(a){if(!i(r,a.id))q++,r[a.id]=a,a.owner=n,n.fire("add",{vframe:a})},get:function(a){return r[a]},remove:function(a,g){var h=r[a];h&&(q--,g&&p--,delete r[a],n.fire("remove",{vframe:h}))},vfCreated:function(){if(!o){p++;var a=p/q;u<a&&n.fire("progress",{percent:u=a},o=1==a)}},root:function(){return a.root(n,s)},locChged:function(a){var g=a.loc,i;g?i=1:g=a.location;h(s,
g);if(!i)i=n.root(),a=a.changed,a.isView()?i.mountView(g.view):i.locChged(g,a)}},v);return n},{requires:["magix/vframe","magix/magix","magix/event"]});(function(k){var a=function(){};if(!k.console)k.console={log:a,info:a,error:a};var t,v={};if(!k.Magix)k.Magix={config:function(a){for(var h in a)v[h]=a[h]},start:function(a){t=a}},KISSY.use("magix/magix",function(a,h){k.Magix=h;h.config(v);t&&h.start(t)})})(this);