KISSY.add("magix/body",function(h,f,a,b){var c=a.has,h=a.mix,d=a.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),p=document.body,i={},o={},r=65536,l=function(a,b,c){c?a.setAttribute(b,c):c=a.getAttribute(b);return c},b=h({processEvent:function(a){for(var b=a.target||a.srcElement;b&&1!=b.nodeType;)b=b.parentNode;var i=b,d=a.type,j=o[d]||(o[d]=RegExp("(?:^|,)"+d+"(?:,|$)"));if(!j.test(l(b,"mx-ie"))){for(var v="mx-"+d,k,t,e=[];i&&i!=p&&!(k=l(i,v),t=l(i,"mx-ie"),k||j.test(t));)e.push(i),
i=i.parentNode;if(k){d=l(i,"mx-owner");if(!d){j=i;for(t=this.VOM.all();j&&j!=p;)if(c(t,j.id)){l(i,"mx-owner",d=j.id);break}else j=j.parentNode}if(d)this.fire("event",{info:k,se:a,tId:b.id||(b.id="mx-e-"+r--),cId:i.id||(i.id="mx-e-"+r--),hld:d});else throw Error("miss mx-owner:"+k);}else for(;e.length;)a=e.shift(),t=l(a,"mx-ie"),j.test(t)||(t=t?t+","+d:d,l(a,"mx-ie",t))}},attachEvent:function(a){var b=this;if(i[a])i[a]++;else if(i[a]=1,d[a])b.onUnbubble(p,a);else p["on"+a]=function(a){(a=a||window.event)&&
b.processEvent(a)}},detachEvent:function(a){var b=i[a];0<b&&(b--,b||(d[a]?this.offUnbubble(p,a):p["on"+a]=null),i[a]=b)}},b);return a.mix(b,f)},{requires:["magix/impl/body","magix/magix","magix/event"]});
KISSY.add("magix/event",function(h,f){var a=f.safeExec;return{fire:function(b,c,d,h){var i="~"+b,o=this[i];if(o){c||(c={});if(!c.type)c.type=b;for(var b=o.length,f=b-1,l,s;b--;)l=h?b:f-b,s=o[l],s.d&&(o.splice(l,1),f--),a(s,c,this)}d&&delete this[i]},on:function(a,c,d){a="~"+a;this[a]||(this[a]=[]);f.isNumeric(d)?this[a].splice(d,0,c):(c.d=d,this[a].push(c))},un:function(a,c){f.isArray(a)||(a=[a]);for(var d=0,h=a.length;d<h;d++){var i="~"+a[d],o=this[i];if(o)if(c)for(var i=0,r=o.length;i<r;i++){if(o[i]==
c){o.splice(i,1);break}}else delete this[i]}}}},{requires:["magix/magix"]});KISSY.add("magix/impl/body",function(h,f){var a={};return{onUnbubble:function(b,c){var d=this;f.delegate(b,c,"*[mx-"+c+"]",a[c]=function(a){d.processEvent(a)})},offUnbubble:function(b,c){f.undelegate(b,c,"*[mx-"+c+"]",a[c]);delete a[c]}}},{requires:["event"]});
KISSY.add("magix/impl/magix",function(h,f){f=[].slice;return{libRequire:function(a,b){if(a){var c=this.isFunction(b),d=this.isArray(a);h.use(d?a.join(","):a,c?function(a){b.apply(a,f.call(arguments,1))}:this.noop)}else b()},libEnv:function(a){var b=a.appHome,c=location,d=c.protocol,f=a.appName;~b.indexOf(d)||(b=this.path(c.href,b));h.endsWith(b,"/")||(b+="/");a.appHome=b;var i=a.debug;i&&(i=0==b.indexOf(d+"//"+c.host));"~"==f.charAt(0)&&h.config({map:[[RegExp("/"+f+"/"),"/"]]});c="";(c=i?h.now():
a.appTag)&&(c+=".js");d=a.appCombine;h.isUndefined(d)&&(d=h.config("combine"));h.config({packages:[{name:f,path:b,debug:a.debug=i,combine:d,tag:c}]})},isArray:h.isArray,isFunction:h.isFunction,isObject:h.isObject,isRegExp:h.isRegExp,isString:h.isString,isNumber:h.isNumber}});
KISSY.add("magix/impl/router",function(h,f){var a=window;return{useState:function(){var b=this,c=location.href;f.on(a,"popstate",function(){var a=location.href==c;if(b.$firedPop||!a)b.$firedPop=!0,b.route()})},useHash:function(){var b=this;f.on(a,"hashchange",function(){b.route()})}}},{requires:["event"]});
KISSY.add("magix/impl/view",function(h,f,a){var b=function(){},c=h.Env.mods,d={wrapAsyn:1,extend:1},p=function(b,c,d){for(var f in c)h.isObject(c[f])?(a.has(b,f)||(b[f]={}),p(b[f],c[f],!0)):d&&(b[f]=c[f])};b.extend=function(c,d){var f=function(){f.superclass.constructor.apply(this,arguments);d&&a.safeExec(d,arguments,this)};f.extend=b.extend;return h.extend(f,this,c)};b.prepare=function(b,f){if(!b.wrapAsyn){for(var h in this)a.has(d,h)&&(b[h]=this[h]);h=b.prototype;for(var l=b;l.superclass;)l=l.superclass.constructor,
p(h,l.prototype);f.home=c[f.path].packageInfo.getBase();a.mix(h,f)}b.wrapAsyn()};a.mix(b.prototype,{fetchTmpl:function(a,b,c){f({url:a+(c?"?_="+h.now():""),success:b,error:function(a,c){b(c)}})}});return b},{requires:["ajax","magix/magix"]});
KISSY.add("magix/magix",function(h,f){var a=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,b=/[^\/]*$/,c=/[#?].*$/,d=/([^=&?\/#]+)=([^&=#?]*)/g,p=/^https?:\/\//i,i={},o=0,r={debug:false,iniFile:"~/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},l=i.hasOwnProperty,s=function(n){return function(a,e,b){switch(arguments.length){case 0:b=n;break;case 1:b=g.isObject(a)?j(n,a):q(n,a)?n[a]:null;break;case 2:null===e?(delete n[a],b=e):n[a]=b=e}return b}},m=function(n){this.c=[];this.x=
n||20;this.b=this.x+5},u=function(n){return new m(n)},q=function(n,a){return n?l.call(n,a):0},j=function(n,a,e){for(var b in a)if(!0===e)n[b]=a[b];else if(q(a,b)&&(!e||!q(e,b)))n[b]=a[b];return n};j(m.prototype,{get:function(a){var e=this.c,b,a="pathname"+a;if(q(e,a)&&(b=e[a],1<=b.f))b.f++,b.t=o++,b=b.v;return b},set:function(a,e){var b=this.c,a="pathname"+a,c=b[a];if(!q(b,a)){if(b.length>=this.b){b.sort(function(a,e){return e.f==a.f?e.t-a.t:e.f-a.f});for(var j=this.b-this.x;j--;)c=b.pop(),delete b[c.k]}c=
{};b.push(c);b[a]=c}c.k=a;c.v=e;c.f=1;c.t=o++;return c},del:function(a){var a="pathname"+a,e=this.c,b=e[a];if(b)b.f=-1E5,delete e[a]}});var v=u(60),k=u(),t=function(a,e,b,c,j,d){g.isArray(a)||(a=[a]);if(!e||!g.isArray(e)&&!e.callee)e=[e];for(c=0;c<a.length;c++)try{d=a[c],j=g.isFunction(d)&&d.apply(b,e)}catch(k){}return j},e=function(){},g={isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},mix:j,has:q,safeExec:t,noop:e,config:s(r),start:function(a){var b=this,a=j(r,a);b.libEnv(a);var c=
a.iniFile.replace("~",a.appName);b.libRequire(c,function(c){r=j(a,c,a);var d=a.progress;b.libRequire(["magix/router","magix/vom"],function(c,j){c.on("changed",function(a){a.loc?j.locationUpdated(a.loc):a.changed.isView()?j.remountRoot(a):j.locationChanged(a)});j.on("progress",d||e);b.libRequire(a.extensions,function(){c.start()})})});a.ready&&(t(a.ready),delete a.ready)},keys:Object.keys||function(a){var e=[],b;for(b in a)q(a,b)&&e.push(b);return e},local:s({}),path:function(e,j){var d=e+"\n"+j,g=
k.get(d);if(!g){e=e.replace(c,"").replace(b,"");"/"==j.charAt(0)?(g=e.indexOf("://"),-1==g?g=j:(g=e.indexOf("/",g+3),g=-1==g?e+j:e.substring(0,g)+j)):g=e+j;for(;a.test(g);)g=g.replace(a,"$1/");k.set(d,g)}return g},pathToObject:function(a,e){var b=v.get(a);if(!b){var b={},j={},g="";c.test(a)?g=a.replace(c,""):~a.indexOf("=")||(g=a);if(g&&p.test(g))var k=g.indexOf("/",8),g=-1==k?"/":g.substring(k);a.replace(d,function(a,b,c){if(e)try{c=decodeURIComponent(c)}catch(g){}j[b]=c});b.pathname=g;b.params=
j;v.set(a,b)}return b},objectToPath:function(a,e){var b=a.pathname,c=[],g=a.params,j,d;for(d in g)j=g[d],e&&encodeURIComponent(j),c.push(d+"="+j);return b+(b&&c.length?"?":"")+c.join("&")},tmpl:function(a,e){return 1==arguments.length?i[a]:i[a]=e},listToMap:function(a,e){var b,c,g={},j;this.isString(a)&&(a=a.split(","));if(a&&(j=a.length))for(b=0;b<j;b++)c=a[b],g[e?c[e]:c]=e?c:1;return g},createCache:u};return g.mix(g,f)},{requires:["magix/impl/magix"]});
KISSY.add("magix/router",function(h,f,a,b){var c=window,d=a.has,p=a.mix,i=document,o=/^UTF-8$/i.test(i.charset||i.characterSet||"UTF-8"),r=a.config(),l=a.createCache(),s=a.createCache(),m,u,q,j=65536,v=/#.*$/,k=/^[^#]*#?!?/,t=r.nativeHistory,e,g,n=function(e,b,c){if(e){c=this.params;a.isArray(e)||(e=e.split(","));for(var g=0;g<e.length&&!(b=d(c,e[g]));g++);}return b},w=function(){return d(this,"pathname")},x=function(){return d(this,"view")},y=function(){return this.hash.pathname!=this.query.pathname},
B=function(a){return this.hash.params[a]!=this.query.params[a]},z=function(a){return d(this.hash.params,a)},A=function(a){return d(this.query.params,a)},C=function(a){return this.params[a]},h=p({getView:function(e){if(!q){q={routes:r.routes||{},e404:r.notFoundView};var b=r.defaultView;if(!b)throw Error("unset defaultView");q.home=b;var c=r.defaultPathname||"";q.routes[c]=b;q.pathname=c}e||(e=q.pathname);b=q.routes;b=a.isFunction(b)?b.call(r,e):b[e];return{view:b?b:q.e404||q.home,pathname:b?e:q.e404?
e:q.pathname}},start:function(){var a=c.history;e=t&&a.pushState;g=t&&!e;e?this.useState():this.useHash();this.route()},parsePath:function(e){var e=a.pathToObject(e,o),b=e.pathname;b&&"/"!=b.charAt(0)&&g&&(e.pathname=a.path(c.location.pathname,b));return e},parseQH:function(a){var a=a||c.location.href,e=l.get(a);if(!e){var e=a.replace(v,""),b=a.replace(k,""),g=this.parsePath(e),j=this.parsePath(b),d={};p(d,g.params);p(d,j.params);e={pathnameDiff:y,paramDiff:B,hashOwn:z,queryOwn:A,get:C,href:a,srcQuery:e,
srcHash:b,query:g,hash:j,params:d};l.set(a,e)}return e},parseLoc:function(a){a=this.parseQH(a);if(!a.view){var e=this.getView(t?a.hash.pathname||a.query.pathname:a.hash.pathname);p(a,e)}return a},getChged:function(a,e){var b=e.href,c=a.href+"\n"+b,g=s.get(c);g||(c=b+"\n"+c,g=s.get(c));if(!g){var j,g={params:{}};if(a.pathname!=e.pathname)j=g.pathname=1;if(a.view!=e.view)j=g.view=1;var b=a.params,d=e.params,k;for(k in b)b[k]!=d[k]&&(j=1,g.params[k]=1);for(k in d)b[k]!=d[k]&&(j=1,g.params[k]=1);g.occur=
j;g.isParam=n;g.isPathname=w;g.isView=x;s.set(c,g)}return g},route:function(){var a=this.parseLoc(),e=u||{params:{},href:"~"},b=!u;u=a;e=this.getChged(e,a);e.occur&&(m=a,this.fire("changed",{location:a,changed:e,firstFire:b}))},navigate2:function(b){if(b&&a.isString(b)){var c=this.parsePath(b),b={};b.params=p({},c.params);b.pathname=c.pathname;if(b.pathname){if(g&&(c=m.query)&&(c=c.params))for(var k in c)d(c,k)&&!d(b.params,k)&&(b.params[k]="")}else k=p({},m.params),b.params=p(k,b.params),b.pathname=
m.pathname;k=a.objectToPath(b);if(e?k!=m.srcQuery:k!=m.srcHash)e?(this.$firedPop=1,history.pushState(j--,i.title,k),this.route()):(p(b,m,b),b.srcHash=k,b.hash={params:b.params,pathname:b.pathname},this.fire("changed",{loc:m=b}),location.hash="#!"+k)}},navigate:function(e,b){!b&&a.isObject(e)&&(b=e,e="");b&&(e=a.objectToPath({params:b,pathname:e},o));this.navigate2(e)}},b);return a.mix(h,f)},{requires:["magix/impl/router","magix/magix","magix/event"]});
KISSY.add("magix/vframe",function(h,f,a,b){var c=document,d=65536,p=window.CollectGarbage||f.noop,i=f.mix,h=f.config(),o=h.tagName,r=h.rootId,l=f.has,s,m=function(a){return"object"==typeof a?a:c.getElementById(a)};c.createElement(o);var u=/<script[^>]*>[\s\S]*?<\/script>/ig,q=function(a){this.id=a;this.vId=a+"_v";this.cS={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};i(q,{root:function(a){if(!s){var b=m(r);if(!b)b=c.createElement(o),b.id=r,c.body.insertBefore(b,c.body.firstChild);s=new q(r);
a.add(s)}return s}});i(i(q.prototype,a),{useAnimUpdate:f.noop,oldViewDestroy:f.noop,prepareNextView:f.noop,newViewCreated:f.noop,mountView:function(a,c){var k=this,d=m(k.id);d._bak?d._chgd=1:(d._bak=1,d._tmpl=d.innerHTML.replace(u,""));var e=k.vN&&k.useAnimUpdate();k.unmountView(e,1);if(a){var g=f.pathToObject(a),n=g.pathname,h=--k.sign;f.libRequire(n,function(a){if(h==k.sign){var j=k.owner;b.prepare(a,{$:m,path:n,vom:j});var f;e?(f=k.vId,k.prepareNextView()):f=k.id;var l=new a({owner:k,id:f,vId:k.vId,
vfId:k.id,location:j.getLocation()});k.view=l;l.on("interact",function(a){k.fire("viewInteract",{view:l});k.viewUsable=1;e&&k.newViewCreated(1);if(!a.tmpl){if(!e&&d._chgd)d.innerHTML=d._tmpl;k.mountZoneVframes(0,0,1)}l.on("rendered",function(){k.mountZoneVframes(0,0,1)});l.on("prerender",function(a){k.unmountZoneVframes(0,a.anim)})},0);l.load(i(g.params,c,!0))}})}},unmountView:function(a,b){if(this.view){this.unmountZoneVframes(0,a);this.childrenAlter({});this.fire("viewUnmount");this.view.destroy();
var c=m(this.id);if(!a&&c._bak)c.innerHTML=c._tmpl;a&&b&&this.oldViewDestroy();delete this.view;delete this.viewUsable;p()}this.un("viewInteract");this.sign--},mountVframe:function(a,b,c,d){var e=this.owner,g=e.get(a);if(!g)g=new q(a),g.pId=this.id,l(this.cS,a)||this.cC++,this.cS[a]=d,e.add(g);g.mountView(b,c);return g},mountZoneVframes:function(a,b,c){this.unmountZoneVframes(a);var a=a?a:m(this.vId)||m(this.id),a=m(a).getElementsByTagName(o),f=a.length,e={};if(f)for(var g=0,n,h;g<f;g++){n=a[g];h=
n.id||(n.id="magix_vf_"+d--);l(e,h)||this.mountVframe(h,n.getAttribute("mx-view"),b,c);n=m(n).getElementsByTagName(o);h=0;for(var i=n.length;h<i;h++)e[n[h].id||(n[h].id="magix_vf_"+d--)]=1}else this.childrenCreated({})},unmountVframe:function(a,b){var c=this.owner,d=c.get(a);if(d){var e=d.fcc;d.unmountView(b);c.remove(a,e);delete this.cS[a];this.cC--}},unmountZoneVframes:function(a){var b;if(a){b=m(a).getElementsByTagName(o);for(var c={},d=this.cS,e=b.length-1,g;0<=e;e--)g=b[e].id,l(d,g)&&(c[g]=1);
b=c}else b=this.cS;for(var f in b)this.unmountVframe(f);if(!a)this.cS={},this.cC=0},childrenCreated:function(a){var b=this.view;if(b&&!this.fcc)this.fcc=1,delete this.fca,b.fire("created",a),this.fire("created",a);b=this.owner;b.childCreated();if(b=b.get(this.pId)){var c=this.id,d=b.rM;l(d,c)||(d[c]=b.cS[c],b.rC++,b.rC==b.cC&&b.childrenCreated(a))}},childrenAlter:function(a){delete this.fcc;var b=this.view,c=this.id;if(b&&!this.fca)this.fca=1,b.fire("alter",a),this.fire("alter",a);if(b=this.owner.get(this.pId)){var c=
this.id,d=b.rM,e=d[c];l(d,c)&&(b.rC--,delete d[c],e&&b.childrenAlter(a))}},locationChanged:function(a,b){var c=this.view;if(c&&c.sign&&(c.location=a,c.rendered)){var d=c.olChanged(b),e={location:a,changed:b,prevent:function(){this.cs=[]},toChildren:function(a){a=a||[];f.isString(a)&&(a=a.split(","));this.cs=a}};d&&f.safeExec(c.locationChange,e,c);for(var c=e.cs||f.keys(this.cS),d=0,e=c.length,g=this.owner,h;d<e;d++)(h=g.get(c[d]))&&h.locationChanged(a,b)}},locationUpdated:function(a){var b=this.view;
if(b&&b.sign){b.location=a;var b=this.cS,c,d=this.owner,e;for(e in b)(c=d.get(e))&&c.locationUpdated(a)}}});return q},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(h,f,a,b,c){var d=a.safeExec,p=a.has,i=[],o=a.config(),r=/^~[^\/]*/,l=a.mix,s=a.listToMap("render,renderUI"),m=function(a){return function(){var b;this.sign&&(this.sign++,this.fire("rendercall"),b=a.apply(this,arguments));return b}},h=function(a){l(this,a);this.sign=1};l(h,{wrapAsyn:function(){if(!this["~~"]){this["~~"]=1;var b=this.prototype,c,d;for(d in b){c=b[d];var f=null;a.isFunction(c)&&c!=a.noop&&!c["~~"]&&p(s,d)&&(f=m(c),f["~~"]=c,b[d]=f)}}}});var u=h.prototype,
q=window.CollectGarbage||a.noop,j=/\smx-[^ohv][a-z]+\s*=/g,v={prevent:function(a){a=a||this.domEvent;a.preventDefault?a.preventDefault():a.returnValue=!1},stop:function(a){a=a||this.domEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},halt:function(a){this.prevent(a);this.stop(a)}},k=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,t=/(\w+):([^,]+)/g;l(u,b);l(u,{render:a.noop,locationChange:a.noop,init:a.noop,hasTmpl:!0,enableEvent:!0,enableAnim:!1,load:function(){var a=this,b=a.hasTmpl,c=arguments,
f=a.sign,h=function(){if(f==a.sign&&(a.delegateEvents(),a.fire("interact",{tmpl:b},1),d(a.init,c,a),d(a.render,i,a),!b&&!a.rendered))a.rendered=!0,a.fire("primed",null,1)};b&&!a.template?a.planTmpl(h):h()},updateViewId:function(){this.id=this.$(this.vId)?this.vId:this.vfId},beginUpdateHTML:function(){if(this.sign&&this.rendered){var a=this.enableAnim;this.fire("refresh",0,1);this.fire("prerender",{anim:a});var b=this.owner;a&&(d(b.oldViewDestroy,i,b),d(b.prepareNextView,i,b),this.updateViewId())}},
endUpdateHTML:function(){if(this.sign){if(this.rendered&&this.enableAnim){var a=this.owner;d(a.newViewCreated,i,a)}this.rendered||this.fire("primed",null,1);this.rendered=!0;this.fire("rendered");q()}},wrapMxEvent:function(a){return a?(""+a).replace(j,' mx-owner="'+this.vfId+'"$&'):a},setViewHTML:function(a){this.beginUpdateHTML();if(this.sign)this.$(this.id).innerHTML=this.wrapMxEvent(a);this.endUpdateHTML()},observeLocation:function(b){var c;if(!this.$ol)this.$ol={keys:[]};c=this.$ol;var d=c.keys;
if(a.isObject(b))c.pn=b.pathname,b=b.keys;if(b)c.keys=d.concat(a.isString(b)?b.split(","):b)},olChanged:function(a){var b=this.$ol;if(b){var c=0;b.pn&&(c=a.isPathname());c||(c=a.isParam(b.keys));return c}return 1},destroy:function(){this.fire("refresh",0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),b=null;if(a&&a.viewUsable)b=a.view;return b},planTmpl:function(b){var c=this,d=a.tmpl(c.path);if(void 0===d){var d=o.debug,
f=c.home+c.path.replace(r,"")+".html";c.fetchTmpl(f,function(d){c.template=a.tmpl(c.path,d);b()},d)}else c.template=d,b()},processEvent:function(a){if(this.enableEvent&&this.sign){var b=a.se,c=a.info.match(k),f=c[1],h=c[2],c=c[3],j=this.events;if(j){var i=j[b.type];if(v[h])v[h](b);if(i&&i[f]){var u={};c&&c.replace(t,function(a,b,c){u[b]=c});d(i[f],l({view:this,currentId:a.cId,targetId:a.tId,domEvent:b,events:j,params:u},v),i)}}}},delegateEvents:function(a){var b=this.events,a=a?c.detachEvent:c.attachEvent,
d;for(d in b)a.call(c,d)}});a.mix(h,f,{prototype:!0});a.mix(h.prototype,f.prototype);return h},{requires:["magix/impl/view","magix/magix","magix/event","magix/body"]});
KISSY.add("magix/vom",function(h,f,a,b,c){var d=a.has,p=0,i=0,o=0,r=0,l={},s,m=a.mix({all:function(){return l},add:function(a){if(!d(l,a.id))p++,l[a.id]=a,a.owner=m,m.fire("add",{vframe:a})},get:function(a){return l[a]},remove:function(a,b){var c=l[a];c&&(p--,b&&i--,delete l[a],m.fire("remove",{vframe:c}))},childCreated:function(){if(!r){i++;var a=i/p;o<a&&(m.fire("progress",{percent:o=a}),1==a&&(r=1,m.un("progress")))}},root:function(){return f.root(m)},remountRoot:function(a){var b=m.root();s=a.location;
b.mountView(s.view)},locationChanged:function(a){s=a.location;m.root().locationChanged(s,a.changed)},locationUpdated:function(a){s=a;m.root().locationUpdated(a)},getLocation:function(){return s}},b);c.VOM=m;c.on("event",function(a){var b=m.get(a.hld);(b=b&&b.view)&&b.processEvent(a)});return m},{requires:["magix/vframe","magix/magix","magix/event","magix/body"]});
(function(h){var f=function(){};if(!h.console)h.console={log:f,info:f,error:f};var a,b={};if(!h.Magix)h.Magix={config:function(a){for(var d in a)b[d]=a[d]},start:function(b){a=b}},KISSY.use("magix/magix",function(c,d){h.Magix=d;d.config(b);a&&d.start(a)})})(this);