var aS=Object.defineProperty,cS=Object.defineProperties;var lS=Object.getOwnPropertyDescriptors;var Lv=Object.getOwnPropertySymbols;var uS=Object.prototype.hasOwnProperty,dS=Object.prototype.propertyIsEnumerable;var Ov=(n,e,t)=>e in n?aS(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Rt=(n,e)=>{for(var t in e||={})uS.call(e,t)&&Ov(n,t,e[t]);if(Lv)for(var t of Lv(e))dS.call(e,t)&&Ov(n,t,e[t]);return n},tn=(n,e)=>cS(n,lS(e));var Dn=null,Yl=!1,Kh=1,fS=null,Yn=Symbol("SIGNAL");function ze(n){let e=Dn;return Dn=n,e}function $l(){return Dn}var Va={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Jh(n){if(Yl)throw new Error("");if(Dn===null)return;Dn.consumerOnSignalRead(n);let e=Dn.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=Dn.recomputing;if(i&&(t=e!==void 0?e.nextProducer:Dn.producers,t!==void 0&&t.producer===n)){Dn.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===Dn&&(!i||pS(r,Dn)))return;let s=Eo(Dn),o={producer:n,consumer:Dn,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};Dn.producersTail=o,e!==void 0?e.nextProducer=o:Dn.producers=o,s&&Bv(n,o)}function Fv(){Kh++}function Qh(n){if(!(Eo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Kh)){if(!n.producerMustRecompute(n)&&!ip(n)){$h(n);return}n.producerRecomputeValue(n),$h(n)}}function ep(n){if(n.consumers===void 0)return;let e=Yl;Yl=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||hS(i)}}finally{Yl=e}}function tp(){return Dn?.consumerAllowSignalWrites!==!1}function hS(n){n.dirty=!0,ep(n),n.consumerMarkedDirty?.(n)}function $h(n){n.dirty=!1,n.lastCleanEpoch=Kh}function Kl(n){return n&&kv(n),ze(n)}function kv(n){n.producersTail=void 0,n.recomputing=!0}function np(n,e){ze(e),n&&Uv(n)}function Uv(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(Eo(n))do t=rp(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function ip(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(Qh(t),i!==t.version))return!0}return!1}function Jl(n){if(Eo(n)){let e=n.producers;for(;e!==void 0;)e=rp(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function Bv(n,e){let t=n.consumersTail,i=Eo(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)Bv(r.producer,r)}function rp(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!Eo(e)){let s=e.producers;for(;s!==void 0;)s=rp(s)}return t}function Eo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function sp(n){fS?.(n)}function pS(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function op(n,e){return Object.is(n,e)}function za(n,e){let t=Object.create(mS);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(Qh(t),Jh(t),t.value===Zl)throw t.error;return t.value};return i[Yn]=t,sp(t),i}var Yh=Symbol("UNSET"),Zh=Symbol("COMPUTING"),Zl=Symbol("ERRORED"),mS=tn(Rt({},Va),{value:Yh,dirty:!0,error:null,equal:op,kind:"computed",producerMustRecompute(n){return n.value===Yh||n.value===Zh},producerRecomputeValue(n){if(n.value===Zh)throw new Error("");let e=n.value;n.value=Zh;let t=Kl(n),i,r=!1;try{i=n.computation(),ze(null),r=e!==Yh&&e!==Zl&&i!==Zl&&n.equal(e,i)}catch(s){i=Zl,n.error=s}finally{np(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function gS(){throw new Error}var Hv=gS;function Vv(n){Hv(n)}function ap(n){Hv=n}var vS=null;function cp(n,e){let t=Object.create(Wv);t.value=n,e!==void 0&&(t.equal=e);let i=()=>zv(t);return i[Yn]=t,sp(t),[i,o=>lp(t,o),o=>Gv(t,o)]}function zv(n){return Jh(n),n.value}function lp(n,e){tp()||Vv(n),n.equal(n.value,e)||(n.value=e,yS(n))}function Gv(n,e){tp()||Vv(n),lp(n,e(n.value))}var Wv=tn(Rt({},Va),{equal:op,value:void 0,kind:"signal"});function yS(n){n.version++,Fv(),ep(n),vS?.(n)}function kt(n){return typeof n=="function"}function Ql(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var eu=Ql(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Ga(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var kn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(kt(i))try{i()}catch(s){e=s instanceof eu?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{jv(s)}catch(o){e=e??[],o instanceof eu?e=[...e,...o.errors]:e.push(o)}}if(e)throw new eu(e)}}add(e){var t;if(e&&e!==this)if(this.closed)jv(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Ga(t,e)}remove(e){let{_finalizers:t}=this;t&&Ga(t,e),e instanceof n&&e._removeParent(this)}};kn.EMPTY=(()=>{let n=new kn;return n.closed=!0,n})();var up=kn.EMPTY;function tu(n){return n instanceof kn||n&&"closed"in n&&kt(n.remove)&&kt(n.add)&&kt(n.unsubscribe)}function jv(n){kt(n)?n():n.unsubscribe()}var Ti={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var bo={setTimeout(n,e,...t){let{delegate:i}=bo;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=bo;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function nu(n){bo.setTimeout(()=>{let{onUnhandledError:e}=Ti;if(e)e(n);else throw n})}function Wa(){}var qv=dp("C",void 0,void 0);function Xv(n){return dp("E",void 0,n)}function Yv(n){return dp("N",n,void 0)}function dp(n,e,t){return{kind:n,value:e,error:t}}var Es=null;function Mo(n){if(Ti.useDeprecatedSynchronousErrorHandling){let e=!Es;if(e&&(Es={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Es;if(Es=null,t)throw i}}else n()}function Zv(n){Ti.useDeprecatedSynchronousErrorHandling&&Es&&(Es.errorThrown=!0,Es.error=n)}var bs=class extends kn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,tu(e)&&e.add(this)):this.destination=ES}static create(e,t,i){return new So(e,t,i)}next(e){this.isStopped?hp(Yv(e),this):this._next(e)}error(e){this.isStopped?hp(Xv(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?hp(qv,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},xS=Function.prototype.bind;function fp(n,e){return xS.call(n,e)}var pp=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){iu(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){iu(i)}else iu(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){iu(t)}}},So=class extends bs{constructor(e,t,i){super();let r;if(kt(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&Ti.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&fp(e.next,s),error:e.error&&fp(e.error,s),complete:e.complete&&fp(e.complete,s)}):r=e}this.destination=new pp(r)}};function iu(n){Ti.useDeprecatedSynchronousErrorHandling?Zv(n):nu(n)}function _S(n){throw n}function hp(n,e){let{onStoppedNotification:t}=Ti;t&&bo.setTimeout(()=>t(n,e))}var ES={closed:!0,next:Wa,error:_S,complete:Wa};var wo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function $v(n){return n}function Kv(n){return n.length===0?$v:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Yt=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=MS(t)?t:new So(t,i,r);return Mo(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=Jv(i),new i((r,s)=>{let o=new So({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[wo](){return this}pipe(...t){return Kv(t)(this)}toPromise(t){return t=Jv(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function Jv(n){var e;return(e=n??Ti.Promise)!==null&&e!==void 0?e:Promise}function bS(n){return n&&kt(n.next)&&kt(n.error)&&kt(n.complete)}function MS(n){return n&&n instanceof bs||bS(n)&&tu(n)}function SS(n){return kt(n?.lift)}function zr(n){return e=>{if(SS(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function _r(n,e,t,i,r){return new mp(n,e,t,i,r)}var mp=class extends bs{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var Qv=Ql(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var ti=(()=>{class n extends Yt{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new ru(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new Qv}next(t){Mo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Mo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Mo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?up:(this.currentObservers=null,s.push(t),new kn(()=>{this.currentObservers=null,Ga(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Yt;return t.source=this,t}}return n.create=(e,t)=>new ru(e,t),n})(),ru=class extends ti{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:up}};var ja=class extends ti{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var ey=new Yt(n=>n.complete());function ny(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function ty(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Ms(n){return this instanceof Ms?(this.v=n,this):new Ms(n)}function iy(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(m){return Promise.resolve(m).then(h,d)}}function a(h,m){i[h]&&(r[h]=function(_){return new Promise(function(g,p){s.push([h,_,g,p])>1||c(h,_)})},m&&(r[h]=m(r[h])))}function c(h,m){try{l(i[h](m))}catch(_){f(s[0][3],_)}}function l(h){h.value instanceof Ms?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,m){h(m),s.shift(),s.length&&c(s[0][0],s[0][1])}}function ry(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof ty=="function"?ty(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var sy=n=>n&&typeof n.length=="number"&&typeof n!="function";function oy(n){return kt(n?.then)}function ay(n){return kt(n[wo])}function cy(n){return Symbol.asyncIterator&&kt(n?.[Symbol.asyncIterator])}function ly(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function wS(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var uy=wS();function dy(n){return kt(n?.[uy])}function fy(n){return iy(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield Ms(t.read());if(r)return yield Ms(void 0);yield yield Ms(i)}}finally{t.releaseLock()}})}function hy(n){return kt(n?.getReader)}function py(n){if(n instanceof Yt)return n;if(n!=null){if(ay(n))return TS(n);if(sy(n))return CS(n);if(oy(n))return DS(n);if(cy(n))return my(n);if(dy(n))return AS(n);if(hy(n))return IS(n)}throw ly(n)}function TS(n){return new Yt(e=>{let t=n[wo]();if(kt(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function CS(n){return new Yt(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function DS(n){return new Yt(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,nu)})}function AS(n){return new Yt(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function my(n){return new Yt(e=>{RS(n,e).catch(t=>e.error(t))})}function IS(n){return my(fy(n))}function RS(n,e){var t,i,r,s;return ny(this,void 0,void 0,function*(){try{for(t=ry(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Ji(n,e){return zr((t,i)=>{let r=0;t.subscribe(_r(i,s=>{i.next(n.call(e,s,r++))}))})}var Er=new Yt(Wa);function su(n,e){return zr((t,i)=>{let r=0;t.subscribe(_r(i,s=>n.call(e,s,r++)&&i.next(s)))})}function Ss(n){return n<=0?()=>ey:zr((e,t)=>{let i=0;e.subscribe(_r(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function To(n,e){return zr((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(_r(i,c=>{r?.unsubscribe();let l=0,u=s++;py(n(c,u)).subscribe(r=_r(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}var gp;function ou(){return gp}function Qi(n){let e=gp;return gp=n,e}var gy=Symbol("NotFound");function Co(n){return n===gy||n?.name==="\u0275NotFound"}var Np="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",ke=class extends Error{code;constructor(e,t){super(Ao(e,t)),this.code=e}};function LS(n){return`NG0${Math.abs(n)}`}function Ao(n,e){return`${LS(n)}${e?": "+e:""}`}var Is=globalThis;function Dt(n){for(let e in n)if(n[e]===Dt)return e;throw Error("")}function fu(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(fu).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function hu(n,e){return n?e?`${n} ${e}`:n:e||""}var OS=Dt({__forward_ref__:Dt});function pu(n){return n.__forward_ref__=pu,n}function ni(n){return Ey(n)?n():n}function Ey(n){return typeof n=="function"&&n.hasOwnProperty(OS)&&n.__forward_ref__===pu}function We(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function mu(n){return FS(n,gu)}function FS(n,e){return n.hasOwnProperty(e)&&n[e]||null}function kS(n){let e=n?.[gu]??null;return e||null}function yp(n){return n&&n.hasOwnProperty(cu)?n[cu]:null}var gu=Dt({\u0275prov:Dt}),cu=Dt({\u0275inj:Dt}),ot=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=We({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Pp(n){return n&&!!n.\u0275providers}var Lp=Dt({\u0275cmp:Dt}),Op=Dt({\u0275dir:Dt}),Fp=Dt({\u0275pipe:Dt});var xp=Dt({\u0275fac:Dt}),Rs=Dt({__NG_ELEMENT_ID__:Dt}),vy=Dt({__NG_ENV_ID__:Dt});function Ns(n){return Up(n,"@Component"),n[Lp]||null}function kp(n){return Up(n,"@Directive"),n[Op]||null}function by(n){return Up(n,"@Pipe"),n[Fp]||null}function Up(n,e){if(n==null)throw new ke(-919,!1)}function Wr(n){return typeof n=="string"?n:n==null?"":String(n)}var My=Dt({ngErrorCode:Dt}),US=Dt({ngErrorMessage:Dt}),BS=Dt({ngTokenPath:Dt});function Bp(n,e){return Sy("",-200,e)}function vu(n,e){throw new ke(-201,!1)}function Sy(n,e,t){let i=new ke(e,n);return i[My]=e,i[US]=n,t&&(i[BS]=t),i}function HS(n){return n[My]}var _p;function wy(){return _p}function Un(n){let e=_p;return _p=n,e}function Hp(n,e,t){let i=mu(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;vu(n,"")}var VS={},ws=VS,zS="__NG_DI_FLAG__",Ep=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=Ts(t)||0;try{return this.injector.get(e,i&8?null:ws,i)}catch(r){if(Co(r))return r;throw r}}};function GS(n,e=0){let t=ou();if(t===void 0)throw new ke(-203,!1);if(t===null)return Hp(n,void 0,e);{let i=WS(e),r=t.retrieve(n,i);if(Co(r)){if(i.optional)return null;throw r}return r}}function pt(n,e=0){return(wy()||GS)(ni(n),e)}function ue(n,e){return pt(n,Ts(e))}function Ts(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function WS(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function bp(n){let e=[];for(let t=0;t<n.length;t++){let i=ni(n[t]);if(Array.isArray(i)){if(i.length===0)throw new ke(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=jS(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(pt(r,s))}else e.push(pt(i))}return e}function jS(n){return n[zS]}function Cs(n,e){let t=n.hasOwnProperty(xp);return t?n[xp]:null}function Ty(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function Cy(n){return n.flat(Number.POSITIVE_INFINITY)}function yu(n,e){n.forEach(t=>Array.isArray(t)?yu(t,e):e(t))}function Vp(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function $a(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function Dy(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function xu(n,e,t){let i=Io(n,e);return i>=0?n[i|1]=t:(i=~i,Dy(n,i,e,t)),i}function _u(n,e){let t=Io(n,e);if(t>=0)return n[t|1]}function Io(n,e){return qS(n,e,1)}function qS(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var Ps={},Ci=[],Ro=new ot(""),zp=new ot("",-1),Gp=new ot(""),Xa=class{get(e,t=ws){if(t===ws){let r=Sy("",-201);throw r.name="\u0275NotFound",r}return t}};function Ls(n){return{\u0275providers:n}}function Ay(n){return Ls([{provide:Ro,multi:!0,useValue:n}])}function Iy(...n){return{\u0275providers:Wp(!0,n),\u0275fromNgModule:!0}}function Wp(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return yu(e,o=>{let a=o;lu(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&Ry(r,s),t}function Ry(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];jp(r,s=>{e(s,i)})}}function lu(n,e,t,i){if(n=ni(n),!n)return!1;let r=null,s=yp(n),o=!s&&Ns(n);if(!s&&!o){let c=n.ngModule;if(s=yp(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)lu(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;yu(s.imports,u=>{lu(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&Ry(l,e)}if(!a){let l=Cs(r)||(()=>new r);e({provide:r,useFactory:l,deps:Ci},r),e({provide:Gp,useValue:r,multi:!0},r),e({provide:Ro,useValue:()=>pt(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;jp(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function jp(n,e){for(let t of n)Pp(t)&&(t=t.\u0275providers),Array.isArray(t)?jp(t,e):e(t)}var XS=Dt({provide:String,useValue:Dt});function Ny(n){return n!==null&&typeof n=="object"&&XS in n}function YS(n){return!!(n&&n.useExisting)}function ZS(n){return!!(n&&n.useFactory)}function uu(n){return typeof n=="function"}var Ka=new ot(""),au={},yy={},vp;function Ja(){return vp===void 0&&(vp=new Xa),vp}var di=class{},Ds=class extends di{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Sp(e,o=>this.processProvider(o)),this.records.set(zp,Do(void 0,this)),r.has("environment")&&this.records.set(di,Do(void 0,this));let s=this.records.get(Ka);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(Gp,Ci,{self:!0}))}retrieve(e,t){let i=Ts(t)||0;try{return this.get(e,ws,i)}catch(r){if(Co(r))return r;throw r}}destroy(){qa(this),this._destroyed=!0;let e=ze(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),ze(e)}}onDestroy(e){return qa(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){qa(this);let t=Qi(this),i=Un(void 0),r;try{return e()}finally{Qi(t),Un(i)}}get(e,t=ws,i){if(qa(this),e.hasOwnProperty(vy))return e[vy](this);let r=Ts(i),s,o=Qi(this),a=Un(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=ew(e)&&mu(e);u&&this.injectableDefInScope(u)?l=Do(Mp(e),au):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?Ja():this.parent;return t=r&8&&t===ws?null:t,c.get(e,t)}catch(c){let l=HS(c);throw l===-200||l===-201?new ke(l,null):c}finally{Un(a),Qi(o)}}resolveInjectorInitializers(){let e=ze(null),t=Qi(this),i=Un(void 0),r;try{let s=this.get(Ro,Ci,{self:!0});for(let o of s)o()}finally{Qi(t),Un(i),ze(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=ni(e);let t=uu(e)?e:ni(e&&e.provide),i=KS(e);if(!uu(e)&&e.multi===!0){let r=this.records.get(t);r||(r=Do(void 0,au,!0),r.factory=()=>bp(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=ze(null);try{if(t.value===yy)throw Bp("");return t.value===au&&(t.value=yy,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&QS(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{ze(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=ni(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Mp(n){let e=mu(n),t=e!==null?e.factory:Cs(n);if(t!==null)return t;if(n instanceof ot)throw new ke(-204,!1);if(n instanceof Function)return $S(n);throw new ke(-204,!1)}function $S(n){if(n.length>0)throw new ke(-204,!1);let t=kS(n);return t!==null?()=>t.factory(n):()=>new n}function KS(n){if(Ny(n))return Do(void 0,n.useValue);{let e=Py(n);return Do(e,au)}}function Py(n,e,t){let i;if(uu(n)){let r=ni(n);return Cs(r)||Mp(r)}else if(Ny(n))i=()=>ni(n.useValue);else if(ZS(n))i=()=>n.useFactory(...bp(n.deps||[]));else if(YS(n))i=(r,s)=>pt(ni(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=ni(n&&(n.useClass||n.provide));if(JS(n))i=()=>new r(...bp(n.deps));else return Cs(r)||Mp(r)}return i}function qa(n){if(n.destroyed)throw new ke(-205,!1)}function Do(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function JS(n){return!!n.deps}function QS(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function ew(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Sp(n,e){for(let t of n)Array.isArray(t)?Sp(t,e):t&&Pp(t)?Sp(t.\u0275providers,e):e(t)}function Eu(n,e){let t;n instanceof Ds?(qa(n),t=n):t=new Ep(n);let i,r=Qi(t),s=Un(void 0);try{return e()}finally{Qi(r),Un(s)}}function Ly(){return wy()!==void 0||ou()!=null}var Ai=0,Ve=1,Xe=2,cn=3,fi=4,hi=5,No=6,Po=7,Zt=8,Sr=9,tr=10,$t=11,Lo=12,qp=13,Os=14,pi=15,jr=16,Fs=17,nr=18,wr=19,Xp=20,Mr=21,bu=22,Qa=23,ii=24,ks=25,qr=26,ln=27,Oy=1,Yp=6,Xr=7,ec=8,Us=9,jt=10;function Yr(n){return Array.isArray(n)&&typeof n[Oy]=="object"}function Ii(n){return Array.isArray(n)&&n[Oy]===!0}function Zp(n){return(n.flags&4)!==0}function Bs(n){return n.componentOffset>-1}function Mu(n){return(n.flags&1)===1}function Hs(n){return!!n.template}function Oo(n){return(n[Xe]&512)!==0}function Vs(n){return(n[Xe]&256)===256}var $p="svg",Fy="math";function mi(n){for(;Array.isArray(n);)n=n[Ai];return n}function Kp(n,e){return mi(e[n])}function Ri(n,e){return mi(e[n.index])}function Su(n,e){return n.data[e]}function ky(n,e){return n[e]}function Jp(n,e,t,i){t>=n.data.length&&(n.data[t]=null,n.blueprint[t]=null),e[t]=i}function Tr(n,e){let t=e[n];return Yr(t)?t:t[Ai]}function wu(n){return(n[Xe]&128)===128}function Uy(n){return Ii(n[cn])}function ir(n,e){return e==null?null:n[e]}function Qp(n){n[Fs]=0}function em(n){n[Xe]&1024||(n[Xe]|=1024,wu(n)&&Fo(n))}function By(n,e){for(;n>0;)e=e[Os],n--;return e}function tc(n){return!!(n[Xe]&9216||n[ii]?.dirty)}function Tu(n){n[tr].changeDetectionScheduler?.notify(8),n[Xe]&64&&(n[Xe]|=1024),tc(n)&&Fo(n)}function Fo(n){n[tr].changeDetectionScheduler?.notify(0);let e=Gr(n);for(;e!==null&&!(e[Xe]&8192||(e[Xe]|=8192,!wu(e)));)e=Gr(e)}function tm(n,e){if(Vs(n))throw new ke(911,!1);n[Mr]===null&&(n[Mr]=[]),n[Mr].push(e)}function Hy(n,e){if(n[Mr]===null)return;let t=n[Mr].indexOf(e);t!==-1&&n[Mr].splice(t,1)}function Gr(n){let e=n[cn];return Ii(e)?e[cn]:e}function nm(n){return n[Po]??=[]}function im(n){return n.cleanup??=[]}function Vy(n,e,t,i){let r=nm(e);r.push(t),n.firstCreatePass&&im(n).push(i,r.length-1)}var Ze={lFrame:nx(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var wp=!1;function zy(){return Ze.lFrame.elementDepthCount}function Gy(){Ze.lFrame.elementDepthCount++}function rm(){Ze.lFrame.elementDepthCount--}function Wy(){return Ze.bindingsEnabled}function jy(){return Ze.skipHydrationRootTNode!==null}function sm(n){return Ze.skipHydrationRootTNode===n}function om(){Ze.skipHydrationRootTNode=null}function ct(){return Ze.lFrame.lView}function Zn(){return Ze.lFrame.tView}function Ni(n){return Ze.lFrame.contextLView=n,n[Zt]}function Pi(n){return Ze.lFrame.contextLView=null,n}function Li(){let n=am();for(;n!==null&&n.type===64;)n=n.parent;return n}function am(){return Ze.lFrame.currentTNode}function qy(){let n=Ze.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function ko(n,e){let t=Ze.lFrame;t.currentTNode=n,t.isParent=e}function cm(){return Ze.lFrame.isParent}function Xy(){Ze.lFrame.isParent=!1}function lm(){return wp}function um(n){let e=wp;return wp=n,e}function Yy(){let n=Ze.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function dm(){return Ze.lFrame.bindingIndex}function Zy(n){return Ze.lFrame.bindingIndex=n}function Uo(){return Ze.lFrame.bindingIndex++}function nc(n){let e=Ze.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function $y(){return Ze.lFrame.inI18n}function Ky(n,e){let t=Ze.lFrame;t.bindingIndex=t.bindingRootIndex=n,Cu(e)}function Jy(){return Ze.lFrame.currentDirectiveIndex}function Cu(n){Ze.lFrame.currentDirectiveIndex=n}function Qy(n){let e=Ze.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function ex(){return Ze.lFrame.currentQueryIndex}function Du(n){Ze.lFrame.currentQueryIndex=n}function tw(n){let e=n[Ve];return e.type===2?e.declTNode:e.type===1?n[hi]:null}function fm(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=tw(s),r===null||(s=s[Os],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=Ze.lFrame=tx();return i.currentTNode=e,i.lView=n,!0}function Au(n){let e=tx(),t=n[Ve];Ze.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function tx(){let n=Ze.lFrame,e=n===null?null:n.child;return e===null?nx(n):e}function nx(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function ix(){let n=Ze.lFrame;return Ze.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var hm=ix;function Iu(){let n=ix();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function rx(n){return(Ze.lFrame.contextLView=By(n,Ze.lFrame.contextLView))[Zt]}function Oi(){return Ze.lFrame.selectedIndex}function Zr(n){Ze.lFrame.selectedIndex=n}function pm(){let n=Ze.lFrame;return Su(n.tView,n.selectedIndex)}function Fi(){Ze.lFrame.currentNamespace=$p}function Cr(){nw()}function nw(){Ze.lFrame.currentNamespace=null}function mm(){return Ze.lFrame.currentNamespace}var sx=!0;function Ru(){return sx}function Nu(n){sx=n}function Tp(n,e=null,t=null,i){let r=ox(n,e,t,i);return r.resolveInjectorInitializers(),r}function ox(n,e=null,t=null,i,r=new Set){let s=[t||Ci,Iy(n)],o;return new Ds(s,e||Ja(),o||null,r)}var Di=class n{static THROW_IF_NOT_FOUND=ws;static NULL=new Xa;static create(e,t){if(Array.isArray(e))return Tp({name:""},t,e,"");{let i=e.name??"";return Tp({name:i},e.parent,e.providers,i)}}static \u0275prov=We({token:n,providedIn:"any",factory:()=>pt(zp)});static __NG_ELEMENT_ID__=-1},gi=new ot(""),Bo=(()=>{class n{static __NG_ELEMENT_ID__=iw;static __NG_ENV_ID__=t=>t}return n})(),Cp=class extends Bo{_lView;constructor(e){super(),this._lView=e}get destroyed(){return Vs(this._lView)}onDestroy(e){let t=this._lView;return tm(t,e),()=>Hy(t,e)}};function iw(){return new Cp(ct())}var ax=!1,cx=new ot(""),Ho=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ja(!1);debugTaskTracker=ue(cx,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Yt(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=We({token:n,providedIn:"root",factory:()=>new n})}return n})(),Dp=class extends ti{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,Ly()&&(this.destroyRef=ue(Bo,{optional:!0})??void 0,this.pendingTasks=ue(Ho,{optional:!0})??void 0)}emit(e){let t=ze(null);try{super.next(e)}finally{ze(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof kn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},br=Dp;function du(...n){}function gm(n){let e,t;function i(){n=du;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function lx(n){return queueMicrotask(()=>n()),()=>{n=du}}var vm="isAngularZone",Ya=vm+"_ID",rw=0,xn=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new br(!1);onMicrotaskEmpty=new br(!1);onStable=new br(!1);onError=new br(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=ax}=e;if(typeof Zone>"u")throw new ke(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,aw(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(vm)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new ke(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new ke(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,sw,du,du);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},sw={};function ym(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function ow(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){gm(()=>{n.callbackScheduled=!1,Ap(n),n.isCheckStableRunning=!0,ym(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Ap(n)}function aw(n){let e=()=>{ow(n)},t=rw++;n._inner=n._inner.fork({name:"angular",properties:{[vm]:!0,[Ya]:t,[Ya+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(cw(c))return i.invokeTask(s,o,a,c);try{return xy(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),_y(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return xy(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!lw(c)&&e(),_y(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Ap(n),ym(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Ap(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function xy(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function _y(n){n._nesting--,ym(n)}var Za=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new br;onMicrotaskEmpty=new br;onStable=new br;onError=new br;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function cw(n){return ux(n,"__ignore_ng_zone__")}function lw(n){return ux(n,"__scheduler_tick__")}function ux(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var er=class{_console=console;handleError(e){this._console.error("ERROR",e)}},$r=new ot("",{factory:()=>{let n=ue(xn),e=ue(di),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(er),t.handleError(i))})}}}),dx={provide:Ro,useValue:()=>{let n=ue(er,{optional:!0})},multi:!0},uw=new ot("",{factory:()=>{let n=ue(gi).defaultView;if(!n)return;let e=ue($r),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),ue(Bo).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function xm(){return Ls([Ay(()=>{ue(uw)})])}function Be(n,e){let[t,i,r]=cp(n,e?.equal),s=t,o=s[Yn];return s.set=i,s.update=r,s.asReadonly=fx.bind(s),s}function fx(){let n=this[Yn];if(n.readonlyFn===void 0){let e=()=>this();e[Yn]=n,n.readonlyFn=e}return n.readonlyFn}var Pu=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=dw}return n})();function dw(){return new Pu(ct(),Li())}var As=class{},ic=new ot("",{factory:()=>!0});var _m=new ot("");var Em=(()=>{class n{static \u0275prov=We({token:n,providedIn:"root",factory:()=>new Ip})}return n})(),Ip=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Rp=class{[Yn];constructor(e){this[Yn]=e}destroy(){this[Yn].destroy()}};function Bx(n){return{toString:n}.toString()}function bw(n){return typeof n=="function"}function Hx(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var Bu=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function Mw(n){return n.type.prototype.ngOnChanges&&(n.setInput=ww),Sw}function Sw(){let n=zx(this),e=n?.current;if(e){let t=n.previous;if(t===Ps)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function ww(n,e,t,i,r){let s=this.declaredInputs[i],o=zx(n)||Tw(n,{previous:Ps,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new Bu(l&&l.currentValue,t,c===Ps),Hx(n,e,r,t)}var Vx="__ngSimpleChanges__";function zx(n){return n[Vx]||null}function Tw(n,e){return n[Vx]=e}var hx=[];var bt=function(n,e=null,t){for(let i=0;i<hx.length;i++){let r=hx[i];r(n,e,t)}},ut=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ut||{});function Cw(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=Mw(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function Dw(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Ou(n,e,t){Gx(n,e,3,t)}function Fu(n,e,t,i){(n[Xe]&3)===t&&Gx(n,e,t,i)}function bm(n,e){let t=n[Xe];(t&3)===e&&(t&=16383,t+=1,n[Xe]=t)}function Gx(n,e,t,i){let r=i!==void 0?n[Fs]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Fs]+=65536),(a<s||s==-1)&&(Aw(n,t,e,c),n[Fs]=(n[Fs]&4294901760)+c+2),c++}function px(n,e){bt(ut.LifecycleHookStart,n,e);let t=ze(null);try{e.call(n)}finally{ze(t),bt(ut.LifecycleHookEnd,n,e)}}function Aw(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Xe]>>14<n[Fs]>>16&&(n[Xe]&3)===e&&(n[Xe]+=16384,px(a,s)):px(a,s)}var zo=-1,cc=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function Iw(n){return(n.flags&8)!==0}function Rw(n){return(n.flags&16)!==0}function Nw(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];Lw(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function Pw(n){return n===3||n===4||n===6}function Lw(n){return n.charCodeAt(0)===64}function td(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?mx(n,t,r,null,e[++i]):mx(n,t,r,null,null))}}return n}function mx(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function Wx(n){return n!==zo}function Hu(n){return n&32767}function Ow(n){return n>>16}function Vu(n,e){let t=Ow(n),i=e;for(;t>0;)i=i[Os],t--;return i}var Im=!0;function zu(n){let e=Im;return Im=n,e}var Fw=256,jx=Fw-1,qx=5,kw=0,rr={};function Uw(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Rs)&&(i=t[Rs]),i==null&&(i=t[Rs]=kw++);let r=i&jx,s=1<<r;e.data[n+(r>>qx)]|=s}function Xx(n,e){let t=Yx(n,e);if(t!==-1)return t;let i=e[Ve];i.firstCreatePass&&(n.injectorIndex=e.length,Mm(i.data,n),Mm(e,null),Mm(i.blueprint,null));let r=sg(n,e),s=n.injectorIndex;if(Wx(r)){let o=Hu(r),a=Vu(r,e),c=a[Ve].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function Mm(n,e){n.push(0,0,0,0,0,0,0,0,e)}function Yx(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function sg(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=Qx(r),i===null)return zo;if(t++,r=r[Os],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return zo}function Bw(n,e,t){Uw(n,e,t)}function Zx(n,e,t){if(t&8||n!==void 0)return n;vu(e,"NodeInjector")}function $x(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Sr],s=Un(void 0);try{return r?r.get(e,i,t&8):Hp(e,i,t&8)}finally{Un(s)}}return Zx(i,e,t)}function Kx(n,e,t,i=0,r){if(n!==null){if(e[Xe]&2048&&!(i&2)){let o=Gw(n,e,t,i,rr);if(o!==rr)return o}let s=Jx(n,e,t,i,rr);if(s!==rr)return s}return $x(e,t,i,r)}function Jx(n,e,t,i,r){let s=Vw(t);if(typeof s=="function"){if(!fm(e,n,i))return i&1?Zx(r,t,i):$x(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))vu(t);else return o}finally{hm()}}else if(typeof s=="number"){let o=null,a=Yx(n,e),c=zo,l=i&1?e[pi][hi]:null;for((a===-1||i&4)&&(c=a===-1?sg(n,e):e[a+8],c===zo||!vx(i,!1)?a=-1:(o=e[Ve],a=Hu(c),e=Vu(c,e)));a!==-1;){let u=e[Ve];if(gx(s,a,u.data)){let d=Hw(a,e,t,o,i,l);if(d!==rr)return d}c=e[a+8],c!==zo&&vx(i,e[Ve].data[a+8]===l)&&gx(s,a,e)?(o=u,a=Hu(c),e=Vu(c,e)):a=-1}}return r}function Hw(n,e,t,i,r,s){let o=e[Ve],a=o.data[n+8],c=i==null?Bs(a)&&Im:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=ku(a,o,t,c,l);return u!==null?Gu(e,o,u,a,r):rr}function ku(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let m=o[h];if(h<c&&t===m||h>=c&&m.type===t)return h}if(r){let h=o[c];if(h&&Hs(h)&&h.type===t)return c}return null}function Gu(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof cc){let a=s;if(a.resolving)throw Bp("");let c=zu(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?Un(a.injectImpl):null,f=fm(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&Cw(t,o[t],e)}finally{d!==null&&Un(d),zu(c),a.resolving=!1,hm()}}return s}function Vw(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Rs)?n[Rs]:void 0;return typeof e=="number"?e>=0?e&jx:zw:e}function gx(n,e,t){let i=1<<n;return!!(t[e+(n>>qx)]&i)}function vx(n,e){return!(n&2)&&!(n&1&&e)}var zs=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return Kx(this._tNode,this._lView,e,Ts(i),t)}};function zw(){return new zs(Li(),ct())}function Gw(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Xe]&2048&&!Oo(o);){let a=Jx(s,o,t,i|2,rr);if(a!==rr)return a;let c=s.parent;if(!c){let l=o[Xp];if(l){let u=l.get(t,rr,i&-5);if(u!==rr)return u}c=Qx(o),o=o[Os]}s=c}return r}function Qx(n){let e=n[Ve],t=e.type;return t===2?e.declTNode:t===1?n[hi]:null}function Ww(){return Xo(Li(),ct())}function Xo(n,e){return new Yo(Ri(n,e))}var Yo=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=Ww}return n})();function jw(n){return n instanceof Yo?n.nativeElement:n}function qw(){return this._results[Symbol.iterator]()}var Wu=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new ti}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=Cy(e);(this._changesDetected=!Ty(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=qw};function e_(n){return(n.flags&128)===128}var og=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(og||{}),t_=new Map,Xw=0;function Yw(){return Xw++}function Zw(n){t_.set(n[wr],n)}function Rm(n){t_.delete(n[wr])}var yx="__ngContext__";function Go(n,e){Yr(e)?(n[yx]=e[wr],Zw(e)):n[yx]=e}function n_(n){return r_(n[Lo])}function i_(n){return r_(n[fi])}function r_(n){for(;n!==null&&!Ii(n);)n=n[fi];return n}var $w;function ag(n){$w=n}var nd=new ot("",{factory:()=>Kw}),Kw="ng";var id=new ot(""),gc=new ot("",{providedIn:"platform",factory:()=>"unknown"});var rd=new ot("",{factory:()=>ue(gi).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var s_="r";var o_="di";var a_=!1,c_=new ot("",{factory:()=>a_});var xx=new WeakMap;function Jw(n,e){if(n==null||typeof n!="object")return;let t=xx.get(n);t||(t=new WeakSet,xx.set(n,t)),t.add(e)}var Qw=(n,e,t,i)=>{};function eT(n,e,t,i){Qw(n,e,t,i)}function cg(n){return(n.flags&32)===32}var tT=()=>null;function l_(n,e,t=!1){return tT(n,e,t)}function u_(n,e){let t=n.contentQueries;if(t!==null){let i=ze(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Du(s),a.contentQueries(2,e[o],o)}}}finally{ze(i)}}}function Nm(n,e,t){Du(0);let i=ze(null);try{e(n,t)}finally{ze(i)}}function d_(n,e,t){if(Zp(e)){let i=ze(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{ze(i)}}}var Bi=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Bi||{});var Pm=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Np})`}};function lg(n){return n instanceof Pm?n.changingThisBreaksApplicationSecurity:n}function nT(n,e){return n.createText(e)}function iT(n,e,t){n.setValue(e,t)}function f_(n,e,t){return n.createElement(e,t)}function ju(n,e,t,i,r){n.insertBefore(e,t,i,r)}function h_(n,e,t){n.appendChild(e,t)}function _x(n,e,t,i,r){i!==null?ju(n,e,t,i,r):h_(n,e,t)}function p_(n,e,t,i){n.removeChild(null,e,t,i)}function rT(n,e,t){n.setAttribute(e,"style",t)}function sT(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function m_(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&Nw(n,e,i),r!==null&&sT(n,e,r),s!==null&&rT(n,e,s)}function oT(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var g_="ng-template";function aT(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&oT(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(ug(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function ug(n){return n.type===4&&n.value!==g_}function cT(n,e,t){let i=n.type===4&&!t?g_:n.value;return e===i}function lT(n,e,t){let i=4,r=n.attrs,s=r!==null?fT(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!ki(i)&&!ki(c))return!1;if(o&&ki(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!cT(n,c,t)||c===""&&e.length===1){if(ki(i))return!1;o=!0}}else if(i&8){if(r===null||!aT(n,r,c,t)){if(ki(i))return!1;o=!0}}else{let l=e[++a],u=uT(c,r,ug(n),t);if(u===-1){if(ki(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(ki(i))return!1;o=!0}}}}return ki(i)||o}function ki(n){return(n&1)===0}function uT(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return hT(e,n)}function dT(n,e,t=!1){for(let i=0;i<e.length;i++)if(lT(n,e[i],t))return!0;return!1}function fT(n){for(let e=0;e<n.length;e++){let t=n[e];if(Pw(t))return e}return n.length}function hT(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function Ex(n,e){return n?":not("+e.trim()+")":e}function pT(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!ki(o)&&(e+=Ex(s,r),r=""),i=o,s=s||!ki(i);t++}return r!==""&&(e+=Ex(s,r)),e}function mT(n){return n.map(pT).join(",")}function gT(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!ki(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var An={};function dg(n,e,t,i,r,s,o,a,c,l,u){let d=ln+i,f=d+r,h=vT(d,f),m=typeof l=="function"?l():l;return h[Ve]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function vT(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:An);return t}function yT(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=dg(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function fg(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[Ai]=r,d[Xe]=i|4|128|8|64|1024,(l!==null||n&&n[Xe]&2048)&&(d[Xe]|=2048),Qp(d),d[cn]=d[Os]=n,d[Zt]=t,d[tr]=o||n&&n[tr],d[$t]=a||n&&n[$t],d[Sr]=c||n&&n[Sr]||null,d[hi]=s,d[wr]=Yw(),d[No]=u,d[Xp]=l,d[pi]=e.type==2?n[pi]:d,d}function xT(n,e,t){let i=Ri(e,n),r=yT(t),s=n[tr].rendererFactory,o=hg(n,fg(n,r,null,v_(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function v_(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function y_(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function hg(n,e){return n[Lo]?n[qp][fi]=e:n[Lo]=e,n[qp]=e,e}function le(n=1){x_(Zn(),ct(),Oi()+n,!1)}function x_(n,e,t,i){if(!i)if((e[Xe]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Ou(e,s,t)}else{let s=n.preOrderHooks;s!==null&&Fu(e,s,0,t)}Zr(t)}var sd=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(sd||{});function Lm(n,e,t,i){let r=ze(null);try{let[s,o,a]=n.inputs[t],c=null;(o&sd.SignalBased)!==0&&(c=e[s][Yn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):Hx(e,c,s,i)}finally{ze(r)}}var sr=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(sr||{}),_T;function pg(n,e){return _T(n,e)}var Wk=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Om=new WeakMap,sc=new WeakSet;function ET(n,e){let t=Om.get(n);if(!t||t.length===0)return;let i=e.parentNode,r=e.previousSibling;for(let s=t.length-1;s>=0;s--){let o=t[s],a=o.parentNode;o===e?(t.splice(s,1),sc.add(o),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&o===r||a&&i&&a!==i)&&(t.splice(s,1),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),o.parentNode?.removeChild(o))}}function bT(n,e){let t=Om.get(n);t?t.includes(e)||t.push(e):Om.set(n,[e])}var Gs=new Set,od=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(od||{}),Kr=new ot(""),bx=new Set;function qs(n){bx.has(n)||(bx.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var mg=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=We({token:n,providedIn:"root",factory:()=>new n})}return n})(),__=[0,1,2,3],E_=(()=>{class n{ngZone=ue(xn);scheduler=ue(As);errorHandler=ue(er,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){ue(Kr,{optional:!0})}execute(){let t=this.sequences.size>0;t&&bt(ut.AfterRenderHooksStart),this.executing=!0;for(let i of __)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let s=r.hooks[i];return s(r.pipelinedValue)},r.snapshot))}catch(s){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(s)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&bt(ut.AfterRenderHooksEnd)}register(t){let{view:i}=t;i!==void 0?((i[ks]??=[]).push(t),Fo(i),i[Xe]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,i){return i?i.run(od.AFTER_NEXT_RENDER,t):t()}static \u0275prov=We({token:n,providedIn:"root",factory:()=>new n})}return n})(),qu=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(e,t,i,r,s,o=null){this.impl=e,this.hooks=t,this.view=i,this.once=r,this.snapshot=o,this.unregisterOnDestroy=s?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let e=this.view?.[ks];e&&(this.view[ks]=e.filter(t=>t!==this))}};function gg(n,e){let t=e?.injector??ue(Di);return qs("NgAfterNextRender"),ST(n,t,e,!0)}function MT(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function ST(n,e,t,i){let r=e.get(mg);r.impl??=e.get(E_);let s=e.get(Kr,null,{optional:!0}),o=t?.manualCleanup!==!0?e.get(Bo):null,a=e.get(Pu,null,{optional:!0}),c=new qu(r.impl,MT(n),a?.view,i,o,s?.snapshot(null));return r.impl.register(c),c}var b_=new ot("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:ue(di)})});function M_(n,e,t){let i=n.get(b_);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function wT(n,e){let t=n.get(b_);if(e.detachedLeaveAnimationFns){for(let i of e.detachedLeaveAnimationFns)t.queue.delete(i);e.detachedLeaveAnimationFns=void 0}}function TT(n,e){for(let[t,i]of e)M_(n,i.animateFns)}function Mx(n,e,t,i){let r=n?.[qr]?.enter;e!==null&&r&&r.has(t.index)&&TT(i,r)}function Vo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;Ii(r)?c=r:Yr(r)&&(l=!0,r=r[Ai]);let u=mi(r);n===0&&i!==null?(Mx(a,i,s,t),o==null?h_(e,i,u):ju(e,i,u,o||null,!0)):n===1&&i!==null?(Mx(a,i,s,t),ju(e,i,u,o||null,!0),ET(s,u)):n===2?(a?.[qr]?.leave?.has(s.index)&&bT(s,u),sc.delete(u),Sx(a,s,t,d=>{if(sc.has(u)){sc.delete(u);return}p_(e,u,l,d)})):n===3&&(sc.delete(u),Sx(a,s,t,()=>{e.destroyNode(u)})),c!=null&&BT(e,n,t,c,s,i,o)}}function CT(n,e){S_(n,e),e[Ai]=null,e[hi]=null}function DT(n,e,t,i,r,s){i[Ai]=r,i[hi]=e,cd(n,i,t,1,r,s)}function S_(n,e){e[tr].changeDetectionScheduler?.notify(9),cd(n,e,e[$t],2,null,null)}function AT(n){let e=n[Lo];if(!e)return Sm(n[Ve],n);for(;e;){let t=null;if(Yr(e))t=e[Lo];else{let i=e[jt];i&&(t=i)}if(!t){for(;e&&!e[fi]&&e!==n;)Yr(e)&&Sm(e[Ve],e),e=e[cn];e===null&&(e=n),Yr(e)&&Sm(e[Ve],e),t=e&&e[fi]}e=t}}function vg(n,e){let t=n[Us],i=t.indexOf(e);t.splice(i,1)}function ad(n,e){if(Vs(e))return;let t=e[$t];t.destroyNode&&cd(n,e,t,3,null,null),AT(e)}function Sm(n,e){if(Vs(e))return;let t=ze(null);try{e[Xe]&=-129,e[Xe]|=256,e[ii]&&Jl(e[ii]),NT(n,e),RT(n,e),e[Ve].type===1&&e[$t].destroy();let i=e[jr];if(i!==null&&Ii(e[cn])){i!==e[cn]&&vg(i,e);let r=e[nr];r!==null&&r.detachView(n)}Rm(e)}finally{ze(t)}}function Sx(n,e,t,i){let r=n?.[qr];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&Gs.add(n[wr]),M_(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),IT(n,i)}else n&&Gs.delete(n[wr]),i(!1)},r)}function IT(n,e){let t=n[qr]?.running;if(t){t.then(()=>{n[qr].running=void 0,Gs.delete(n[wr]),e(!0)});return}e(!1)}function RT(n,e){let t=n.cleanup,i=e[Po];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[Po]=null);let r=e[Mr];if(r!==null){e[Mr]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Qa];if(s!==null){e[Qa]=null;for(let o of s)o.destroy()}}function NT(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof cc)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];bt(ut.LifecycleHookStart,a,c);try{c.call(a)}finally{bt(ut.LifecycleHookEnd,a,c)}}else{bt(ut.LifecycleHookStart,r,s);try{s.call(r)}finally{bt(ut.LifecycleHookEnd,r,s)}}}}}function PT(n,e,t){return LT(n,e.parent,t)}function LT(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[Ai];if(Bs(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Bi.None||r===Bi.Emulated)return null}return Ri(i,t)}function OT(n,e,t){return kT(n,e,t)}function FT(n,e,t){return n.type&40?Ri(n,t):null}var kT=FT,wx;function yg(n,e,t,i){let r=PT(n,i,e),s=e[$t],o=i.parent||e[hi],a=OT(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)_x(s,r,t[c],a,!1);else _x(s,r,t,a,!1);wx!==void 0&&wx(s,i,e,t,r)}function oc(n,e){if(e!==null){let t=e.type;if(t&3)return Ri(e,n);if(t&4)return Fm(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return oc(n,i);{let r=n[e.index];return Ii(r)?Fm(-1,r):mi(r)}}else{if(t&128)return oc(n,e.next);if(t&32)return pg(e,n)()||mi(n[e.index]);{let i=w_(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Gr(n[pi]);return oc(r,i)}else return oc(n,e.next)}}}return null}function w_(n,e){if(e!==null){let i=n[pi][hi],r=e.projection;return i.projection[r]}return null}function Fm(n,e){let t=jt+n+1;if(t<e.length){let i=e[t],r=i[Ve].firstChild;if(r!==null)return oc(i,r)}return e[Xr]}function xg(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Sr];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&Go(mi(c),i),t.flags|=2),!cg(t))if(l&8)xg(n,e,t.child,i,r,s,!1),Vo(e,n,a,r,c,t,s,i);else if(l&32){let u=pg(t,i),d;for(;d=u();)Vo(e,n,a,r,d,t,s,i);Vo(e,n,a,r,c,t,s,i)}else l&16?UT(n,e,i,t,r,s):Vo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function cd(n,e,t,i,r,s){xg(t,i,n.firstChild,e,r,s,!1)}function UT(n,e,t,i,r,s){let o=t[pi],c=o[hi].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Vo(e,n,t[Sr],r,u,i,s,t)}else{let l=c,u=o[cn];e_(i)&&(l.flags|=128),xg(n,e,l,u,r,s,!0)}}function BT(n,e,t,i,r,s,o){let a=i[Xr],c=mi(i);a!==c&&Vo(e,n,t,s,a,r,o);for(let l=jt;l<i.length;l++){let u=i[l];cd(u[Ve],u,n,e,s,a)}}function HT(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:sr.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=sr.Important),n.setStyle(t,i,r,s))}}function T_(n,e,t,i,r){let s=Oi(),o=i&2;try{Zr(-1),o&&e.length>ln&&x_(n,e,ln,!1);let a=o?ut.TemplateUpdateStart:ut.TemplateCreateStart;bt(a,r,t),t(i,r)}finally{Zr(s);let a=o?ut.TemplateUpdateEnd:ut.TemplateCreateEnd;bt(a,r,t)}}function C_(n,e,t){jT(n,e,t),(t.flags&64)===64&&qT(n,e,t)}function _g(n,e,t=Ri){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function VT(n,e,t,i){let s=i.get(c_,a_)||t===Bi.ShadowDom||t===Bi.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return zT(o),o}function zT(n){GT(n)}var GT=()=>null;function WT(n,e,t,i,r,s){if(n.type&3){let o=Ri(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function jT(n,e,t){let i=t.directiveStart,r=t.directiveEnd;Bs(t)&&xT(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||Xx(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=Gu(e,n,o,t);if(Go(c,e),s!==null&&KT(e,o-i,c,a,t,s),Hs(a)){let l=Tr(t.index,e);l[Zt]=Gu(e,n,o,t)}}}function qT(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=Jy();try{Zr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];Cu(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&XT(c,l)}}finally{Zr(-1),Cu(o)}}function XT(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function YT(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];dT(e,s.selectors,!1)&&(i??=[],Hs(s)?i.unshift(s):i.push(s))}return i}function ZT(n,e,t,i,r,s){let o=Ri(n,e);$T(e[$t],o,s,n.value,t,i,r)}function $T(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?Wr(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function KT(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];Lm(i,t,c,l)}}function D_(n,e,t,i,r){let s=ln+t,o=e[Ve],a=r(o,e,n,i,t);e[s]=a,ko(n,!0);let c=n.type===2;return c?(m_(e[$t],a,n),(zy()===0||Mu(n))&&Go(a,e),Gy()):Go(a,e),Ru()&&(!c||!cg(n))&&yg(o,e,a,n),n}function A_(n){let e=n;return cm()?Xy():(e=e.parent,ko(e,!1)),e}function JT(n,e){let t=n[Sr];if(!t)return;let i;try{i=t.get($r,null)}catch{i=null}i?.(e)}function I_(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];Lm(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];Lm(u,l,i,r),a=!0}return a}function QT(n,e){let t=Tr(e,n),i=t[Ve];eC(i,t);let r=t[Ai];r!==null&&t[No]===null&&(t[No]=l_(r,t[Sr])),bt(ut.ComponentStart);try{Eg(i,t,t[Zt])}finally{bt(ut.ComponentEnd,t[Zt])}}function eC(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Eg(n,e,t){Au(e);try{let i=n.viewQuery;i!==null&&Nm(1,i,t);let r=n.template;r!==null&&T_(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[nr]?.finishViewCreation(n),n.staticContentQueries&&u_(n,e),n.staticViewQueries&&Nm(2,n.viewQuery,t);let s=n.components;s!==null&&tC(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Xe]&=-5,Iu()}}function tC(n,e){for(let t=0;t<e.length;t++)QT(n,e[t])}function ld(n,e,t,i){let r=ze(null);try{let s=e.tView,a=n[Xe]&4096?4096:16,c=fg(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[jr]=l;let u=n[nr];return u!==null&&(c[nr]=u.createEmbeddedView(s)),Eg(s,c,t),c}finally{ze(r)}}function lc(n,e){return!e||e.firstChild===null||e_(n)}function uc(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(mi(s)),Ii(s)&&R_(s,i);let o=t.type;if(o&8)uc(n,e,t.child,i);else if(o&32){let a=pg(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=w_(e,t);if(Array.isArray(a))i.push(...a);else{let c=Gr(e[pi]);uc(c[Ve],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function R_(n,e){for(let t=jt;t<n.length;t++){let i=n[t],r=i[Ve].firstChild;r!==null&&uc(i[Ve],i,r,e)}n[Xr]!==n[Ai]&&e.push(n[Xr])}function N_(n){if(n[ks]!==null){for(let e of n[ks])e.impl.addSequence(e);n[ks].length=0}}var P_=[];function nC(n){return n[ii]??iC(n)}function iC(n){let e=P_.pop()??Object.create(sC);return e.lView=n,e}function rC(n){n.lView[ii]!==n&&(n.lView=null,P_.push(n))}var sC=tn(Rt({},Va),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Fo(n.lView)},consumerOnSignalRead(){this.lView[ii]=this}});function oC(n){let e=n[ii]??Object.create(aC);return e.lView=n,e}var aC=tn(Rt({},Va),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Gr(n.lView);for(;e&&!L_(e[Ve]);)e=Gr(e);e&&em(e)},consumerOnSignalRead(){this.lView[ii]=this}});function L_(n){return n.type!==2}function O_(n){if(n[Qa]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Qa])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[Xe]&8192)}}var cC=100;function F_(n,e=0){let i=n[tr].rendererFactory,r=!1;r||i.begin?.();try{lC(n,e)}finally{r||i.end?.()}}function lC(n,e){let t=lm();try{um(!0),km(n,e);let i=0;for(;tc(n);){if(i===cC)throw new ke(103,!1);i++,km(n,1)}}finally{um(t)}}function uC(n,e,t,i){if(Vs(e))return;let r=e[Xe],s=!1,o=!1;Au(e);let a=!0,c=null,l=null;s||(L_(n)?(l=nC(e),c=Kl(l)):$l()===null?(a=!1,l=oC(e),c=Kl(l)):e[ii]&&(Jl(e[ii]),e[ii]=null));try{Qp(e),Zy(n.bindingStartIndex),t!==null&&T_(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&Ou(e,h,null)}else{let h=n.preOrderHooks;h!==null&&Fu(e,h,0,null),bm(e,0)}if(o||dC(e),O_(e),k_(e,0),n.contentQueries!==null&&u_(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&Ou(e,h)}else{let h=n.contentHooks;h!==null&&Fu(e,h,1),bm(e,1)}hC(n,e);let d=n.components;d!==null&&B_(e,d,0);let f=n.viewQuery;if(f!==null&&Nm(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&Ou(e,h)}else{let h=n.viewHooks;h!==null&&Fu(e,h,2),bm(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[bu]){for(let h of e[bu])h();e[bu]=null}s||(N_(e),e[Xe]&=-73)}catch(u){throw s||Fo(e),u}finally{l!==null&&(np(l,c),a&&rC(l)),Iu()}}function k_(n,e){for(let t=n_(n);t!==null;t=i_(t))for(let i=jt;i<t.length;i++){let r=t[i];U_(r,e)}}function dC(n){for(let e=n_(n);e!==null;e=i_(e)){if(!(e[Xe]&2))continue;let t=e[Us];for(let i=0;i<t.length;i++){let r=t[i];em(r)}}}function fC(n,e,t){bt(ut.ComponentStart);let i=Tr(e,n);try{U_(i,t)}finally{bt(ut.ComponentEnd,i[Zt])}}function U_(n,e){wu(n)&&km(n,e)}function km(n,e){let i=n[Ve],r=n[Xe],s=n[ii],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&ip(s)),o||=!1,s&&(s.dirty=!1),n[Xe]&=-9217,o)uC(i,n,i.template,n[Zt]);else if(r&8192){let a=ze(null);try{O_(n),k_(n,1);let c=i.components;c!==null&&B_(n,c,1),N_(n)}finally{ze(a)}}}function B_(n,e,t){for(let i=0;i<e.length;i++)fC(n,e[i],t)}function hC(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Zr(~r);else{let s=r,o=t[++i],a=t[++i];Ky(o,s);let c=e[s];bt(ut.HostBindingsUpdateStart,c);try{a(2,c)}finally{bt(ut.HostBindingsUpdateEnd,c)}}}}finally{Zr(-1)}}function bg(n,e){let t=lm()?64:1088;for(n[tr].changeDetectionScheduler?.notify(e);n;){n[Xe]|=t;let i=Gr(n);if(Oo(n)&&!i)return n;n=i}return null}function H_(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function V_(n,e){let t=jt+e;if(t<n.length)return n[t]}function ud(n,e,t,i=!0){let r=e[Ve];if(pC(r,e,n,t),i){let o=Fm(t,n),a=e[$t],c=a.parentNode(n[Xr]);c!==null&&DT(r,n[hi],a,e,c,o)}let s=e[No];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function z_(n,e){let t=dc(n,e);return t!==void 0&&ad(t[Ve],t),t}function dc(n,e){if(n.length<=jt)return;let t=jt+e,i=n[t];if(i){let r=i[jr];r!==null&&r!==n&&vg(r,i),e>0&&(n[t-1][fi]=i[fi]);let s=$a(n,jt+e);CT(i[Ve],i);let o=s[nr];o!==null&&o.detachView(s[Ve]),i[cn]=null,i[fi]=null,i[Xe]&=-129}return i}function pC(n,e,t,i){let r=jt+i,s=t.length;i>0&&(t[r-1][fi]=e),i<s-jt?(e[fi]=t[r],Vp(t,jt+i,e)):(t.push(e),e[fi]=null),e[cn]=t;let o=e[jr];o!==null&&t!==o&&G_(o,e);let a=e[nr];a!==null&&a.insertView(n),Tu(e),e[Xe]|=128}function G_(n,e){let t=n[Us],i=e[cn];if(Yr(i))n[Xe]|=2;else{let r=i[cn][pi];e[pi]!==r&&(n[Xe]|=2)}t===null?n[Us]=[e]:t.push(e)}var Wo=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Ve];return uc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[Zt]}set context(e){this._lView[Zt]=e}get destroyed(){return Vs(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[cn];if(Ii(e)){let t=e[ec],i=t?t.indexOf(this):-1;i>-1&&(dc(e,i),$a(t,i))}this._attachedToViewContainer=!1}ad(this._lView[Ve],this._lView)}onDestroy(e){tm(this._lView,e)}markForCheck(){bg(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Xe]&=-129}reattach(){Tu(this._lView),this._lView[Xe]|=128}detectChanges(){this._lView[Xe]|=1024,F_(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new ke(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Oo(this._lView),t=this._lView[jr];t!==null&&!e&&vg(t,this._lView),S_(this._lView[Ve],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new ke(902,!1);this._appRef=e;let t=Oo(this._lView),i=this._lView[jr];i!==null&&!t&&G_(i,this._lView),Tu(this._lView)}};var jo=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=mC;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=ld(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new Wo(s)}}return n})();function mC(){return Mg(Li(),ct())}function Mg(n,e){return n.type&4?new jo(e,n,Xo(n,e)):null}function dd(n,e,t,i,r){let s=n.data[e];if(s===null)s=gC(n,e,t,i,r),$y()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=qy();s.injectorIndex=o===null?-1:o.injectorIndex}return ko(s,!0),s}function gC(n,e,t,i,r){let s=am(),o=cm(),a=o?s:s&&s.parent,c=n.data[e]=yC(n,a,t,e,i,r);return vC(n,c,s,o),c}function vC(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function yC(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return jy()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:mm(),attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function xC(n){let e=n[Yp]??[],i=n[cn][$t],r=[];for(let s of e)s.data[o_]!==void 0?r.push(s):_C(s,i);n[Yp]=r}function _C(n,e){let t=0,i=n.firstChild;if(i){let r=n.data[s_];for(;t<r;){let s=i.nextSibling;p_(e,i,!1),i=s,t++}}}var EC=()=>null,bC=()=>null;function Um(n,e){return EC(n,e)}function W_(n,e,t){return bC(n,e,t)}var j_=class{},fd=class{},Bm=class{resolveComponentFactory(e){throw new ke(917,!1)}},hd=class{static NULL=new Bm},Ws=class{};var q_=(()=>{class n{static \u0275prov=We({token:n,providedIn:"root",factory:()=>null})}return n})();var Uu={},Hm=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,Uu,i);return r!==Uu||t===Uu?r:this.parentInjector.get(e,t,i)}};function Xu(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=hu(r,a);else if(s==2){let c=a,l=e[++o];i=hu(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function vc(n,e=0){let t=ct();if(t===null)return pt(n,e);let i=Li();return Kx(i,t,ni(n),e)}function MC(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}TC(n,e,t,a,s,c,l)}s!==null&&i!==null&&SC(t,i,s)}function SC(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new ke(-301,!1);i.push(e[r],s)}}function wC(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function TC(n,e,t,i,r,s,o){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&Hs(h)&&(c=h,wC(n,t,f)),Bw(Xx(t,e),n,h.type)}NC(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=y_(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=td(t.mergedAttrs,h.hostAttrs),DC(n,t,e,d,h),RC(d,h,r),o!==null&&o.has(h)){let[_,g]=o.get(h);t.directiveToIndex.set(h.type,[d,_+t.directiveStart,g+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let m=h.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}CC(n,t,s)}function CC(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Tx(0,e,r,i),Tx(1,e,r,i),Dx(e,i,!1);else{let s=t.get(r);Cx(0,e,s,i),Cx(1,e,s,i),Dx(e,i,!0)}}}function Tx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),X_(e,s)}}function Cx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),X_(e,o)}}function X_(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Dx(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||ug(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function DC(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Cs(r.type,!0)),o=new cc(s,Hs(r),vc,null);n.blueprint[i]=o,t[i]=o,AC(n,e,i,y_(n,t,r.hostVars,An),r)}function AC(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;IC(o)!=a&&o.push(a),o.push(t,i,s)}}function IC(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function RC(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Hs(e)&&(t[""]=n)}}function NC(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function Y_(n,e,t,i,r,s,o,a){let c=e[Ve],l=c.consts,u=ir(l,o),d=dd(c,n,t,i,u);return s&&MC(c,e,d,ir(l,a),r),d.mergedAttrs=td(d.mergedAttrs,d.attrs),d.attrs!==null&&Xu(d,d.attrs,!1),d.mergedAttrs!==null&&Xu(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function Z_(n,e){Dw(n,e),Zp(e)&&n.queries.elementEnd(e)}function PC(n,e,t,i,r,s){let o=e.consts,a=ir(o,r),c=dd(e,n,t,i,a);if(c.mergedAttrs=td(c.mergedAttrs,c.attrs),s!=null){let l=ir(o,s);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&Xu(c,c.attrs,!1),c.mergedAttrs!==null&&Xu(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function LC(n,e,t){return n[e]=t}function or(n,e,t){if(t===An)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function Sg(n,e,t,i){let r=or(n,e,t);return or(n,e+1,i)||r}function OC(n,e,t,i,r){let s=Sg(n,e,t,i);return or(n,e+2,r)||s}function FC(n,e,t){return function i(r){let s=i.__ngNativeEl__;s!==void 0&&Jw(r,s);let o=Bs(n)?Tr(n.index,e):e;bg(o,5);let a=e[Zt],c=Ax(e,a,t,r),l=i.__ngNextListenerFn__;for(;l;)c=Ax(e,a,l,r)&&c,l=l.__ngNextListenerFn__;return c}}function Ax(n,e,t,i){let r=ze(null);try{return bt(ut.OutputStart,e,t),t(i)!==!1}catch(s){return JT(n,s),!1}finally{bt(ut.OutputEnd,e,t),ze(r)}}function kC(n,e,t,i,r,s,o,a){let c=Mu(n),l=!1,u=null;if(!i&&c&&(u=BC(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=Ri(n,t),f=i?i(d):d;eT(t,f,s,a),i||(a.__ngNativeEl__=d);let h=r.listen(f,s,a);if(!UC(s)){let m=i?_=>i(mi(_[n.index])):n.index;HC(m,e,t,s,a,h,!1)}}return l}function UC(n){return n.startsWith("animation")||n.startsWith("transition")}function BC(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Po],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function HC(n,e,t,i,r,s,o){let a=e.firstCreatePass?im(e):null,c=nm(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}var Vm=Symbol("BINDING");function $_(n){return n.debugInfo?.className||n.type.name||null}var zm=class extends hd{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Ns(e);return new fc(t,this.ngModule)}};function VC(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&sd.SignalBased)!==0};return r&&(s.transform=r),s})}function zC(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function GC(n,e,t){let i=e instanceof di?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Hm(t,i):t}function WC(n){let e=n.get(Ws,null);if(e===null)throw new ke(407,!1);let t=n.get(q_,null),i=n.get(As,null),r=n.get(Kr,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function jC(n,e){let t=K_(n);return f_(e,t,t==="svg"?$p:t==="math"?Fy:null)}function qC(n){if(n?.toLowerCase()==="script")throw new ke(905,!1)}function K_(n){return(n.selectors[0][0]||"div").toLowerCase()}var fc=class extends fd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=VC(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=zC(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=mT(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){bt(ut.DynamicComponentStart);let a=ze(null);try{let c=this.componentDef,l=GC(c,r||this.ngModule,e),u=WC(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate($_(c),()=>this.createComponentRef(u,l,t,i,s,o)):this.createComponentRef(u,l,t,i,s,o)}finally{ze(a)}}createComponentRef(e,t,i,r,s,o){let a=this.componentDef,c=XC(r,a,o,s),l=e.rendererFactory.createRenderer(null,a),u=r?VT(l,r,a.encapsulation,t):jC(a,l);qC(u?.tagName);let d=o?.some(Ix)||s?.some(m=>typeof m!="function"&&m.bindings.some(Ix)),f=fg(null,c,null,512|v_(a),null,null,e,l,t,null,l_(u,t,!0));f[ln]=u,Au(f);let h=null;try{let m=Y_(ln,f,2,"#host",()=>c.directiveRegistry,!0,0);m_(l,u,m),Go(u,f),C_(c,f,m),d_(c,m,f),Z_(c,m),i!==void 0&&ZC(m,this.ngContentSelectors,i),h=Tr(m.index,f),f[Zt]=h[Zt],Eg(c,f,null)}catch(m){throw h!==null&&Rm(h),Rm(f),m}finally{bt(ut.DynamicComponentEnd),Iu()}return new Yu(this.componentType,f,!!d)}};function XC(n,e,t,i){let r=n?["ng-version","21.2.25"]:gT(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[Vm].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[Vm].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=kp(d);c.push(f)}return dg(0,null,YC(s,o),1,a,c,null,null,null,[r],null)}function YC(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Ix(n){let e=n[Vm].kind;return e==="input"||e==="twoWay"}var Yu=class extends j_{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Su(t[Ve],ln),this.location=Xo(this._tNode,t),this.instance=Tr(this._tNode.index,t)[Zt],this.hostView=this.changeDetectorRef=new Wo(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=I_(i,r[Ve],r,e,t);this.previousInputValues.set(e,t);let o=Tr(i.index,r);bg(o,1)}get injector(){return new zs(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function ZC(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var yc=(()=>{class n{static __NG_ELEMENT_ID__=$C}return n})();function $C(){let n=Li();return J_(n,ct())}var Gm=class n extends yc{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Xo(this._hostTNode,this._hostLView)}get injector(){return new zs(this._hostTNode,this._hostLView)}get parentInjector(){let e=sg(this._hostTNode,this._hostLView);if(Wx(e)){let t=Vu(e,this._hostLView),i=Hu(e),r=t[Ve].data[i+8];return new zs(r,t)}else return new zs(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=Rx(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-jt}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=Um(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,lc(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let c=e&&!bw(e),l;if(c)l=t;else{let g=t||{};l=g.index,i=g.injector,r=g.projectableNodes,s=g.environmentInjector||g.ngModuleRef,o=g.directives,a=g.bindings}let u=c?e:new fc(Ns(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let p=(c?d:this.parentInjector).get(di,null);p&&(s=p)}let f=Ns(u.componentType??{}),h=Um(this._lContainer,f?.id??null),m=h?.firstChild??null,_=u.create(d,r,m,s,o,a);return this.insertImpl(_.hostView,l,lc(this._hostTNode,h)),_}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(Uy(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[cn],l=new n(c,c[hi],c[cn]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return ud(o,r,s,i),e.attachToViewContainerRef(),Vp(wm(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=Rx(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=dc(this._lContainer,t);i&&($a(wm(this._lContainer),t),ad(i[Ve],i))}detach(e){let t=this._adjustIndex(e,-1),i=dc(this._lContainer,t);return i&&$a(wm(this._lContainer),t)!=null?new Wo(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function Rx(n){return n[ec]}function wm(n){return n[ec]||(n[ec]=[])}function J_(n,e){let t,i=e[n.index];return Ii(i)?t=i:(t=H_(i,e,null,n),e[n.index]=t,hg(e,t)),JC(t,e,n,i),new Gm(t,n,e)}function KC(n,e){let t=n[$t],i=t.createComment(""),r=Ri(e,n),s=t.parentNode(r);return ju(t,s,i,t.nextSibling(r),!1),i}var JC=t1,QC=()=>!1;function e1(n,e,t){return QC(n,e,t)}function t1(n,e,t,i){if(n[Xr])return;let r;t.type&8?r=mi(i):r=KC(e,t),n[Xr]=r}var Wm=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},jm=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)tE(e,t).matches!==null&&this.queries[t].setDirty()}},qm=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=c1(e):this.predicate=e}},Xm=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Ym=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,n1(t,s)),this.matchTNodeWithReadOption(e,t,ku(t,e,s,!1,!1))}else i===jo?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,ku(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Yo||r===yc||r===jo&&t.type&4)this.addMatch(t.index,-2);else{let s=ku(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function n1(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function i1(n,e){return n.type&11?Xo(n,e):n.type&4?Mg(n,e):null}function r1(n,e,t,i){return t===-1?i1(e,n):t===-2?s1(n,e,i):Gu(n,n[Ve],t,e)}function s1(n,e,t){if(t===Yo)return Xo(e,n);if(t===jo)return Mg(e,n);if(t===yc)return J_(e,n)}function Q_(n,e,t,i){let r=e[nr].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(r1(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Zm(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=Q_(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=jt;d<u.length;d++){let f=u[d];f[jr]===f[cn]&&Zm(f[Ve],f,l,i)}if(u[Us]!==null){let d=u[Us];for(let f=0;f<d.length;f++){let h=d[f];Zm(h[Ve],h,l,i)}}}}}return i}function eE(n,e){return n[nr].queries[e].queryList}function o1(n,e,t){let i=new Wu((t&4)===4);return Vy(n,e,i,i.destroy),(e[nr]??=new jm).queries.push(new Wm(i))-1}function a1(n,e,t){let i=Zn();return i.firstCreatePass&&(l1(i,new qm(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),o1(i,ct(),e)}function c1(n){return n.split(",").map(e=>e.trim())}function l1(n,e,t){n.queries===null&&(n.queries=new Xm),n.queries.track(new Ym(e,t))}function tE(n,e){return n.queries.getByIndex(e)}function u1(n,e){let t=n[Ve],i=tE(t,e);return i.crossesNgTemplate?Zm(t,n,e,[]):Q_(t,n,i,e)}function nE(n,e,t){let i,r=za(()=>{i._dirtyCounter();let s=f1(i,n);if(e&&s===void 0)throw new ke(-951,!1);return s});return i=r[Yn],i._dirtyCounter=Be(0),i._flatValue=void 0,r}function iE(n){return nE(!0,!1,n)}function rE(n){return nE(!0,!0,n)}function d1(n,e){let t=n[Yn];t._lView=ct(),t._queryIndex=e,t._queryList=eE(t._lView,e),t._queryList.onDirty(()=>t._dirtyCounter.update(i=>i+1))}function f1(n,e){let t=n._lView,i=n._queryIndex;if(t===void 0||i===void 0||t[Xe]&4)return e?void 0:Ci;let r=eE(t,i),s=u1(t,i);return r.reset(s,jw),e?r.first:r._changesDetected||n._flatValue===void 0?n._flatValue=r.toArray():n._flatValue}var hc=class{};var pc=class extends hc{injector;componentFactoryResolver=new zm(this);instance=null;constructor(e){super();let t=new Ds([...e.providers,{provide:hc,useValue:this},{provide:hd,useValue:this.componentFactoryResolver}],e.parent||Ja(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function sE(n,e,t=null){return new pc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var h1=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=Wp(!1,t.type),r=i.length>0?sE([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=We({token:n,providedIn:"environment",factory:()=>new n(pt(di))})}return n})();function Bn(n){return Bx(()=>{let e=v1(n),t=tn(Rt({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===og.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(h1).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Bi.Emulated,styles:n.styles||Ci,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&qs("NgStandalone"),y1(t);let i=n.dependencies;return t.directiveDefs=Nx(i,p1),t.pipeDefs=Nx(i,by),t.id=x1(t),t})}function p1(n){return Ns(n)||kp(n)}function m1(n,e){if(n==null)return Ps;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=sd.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function g1(n){if(n==null)return Ps;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function wg(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone??!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function v1(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Ps,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Ci,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:m1(n.inputs,e),outputs:g1(n.outputs),debugInfo:null}}function y1(n){n.features?.forEach(e=>e(n))}function Nx(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function x1(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function _1(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=td(n.mergedAttrs,n.attrs);let u=n.tView=dg(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),ko(n,!1);let c=E1(t,e,n,i);Ru()&&yg(t,e,c,n),Go(c,e);let l=H_(c,e,c,n);e[i+ln]=l,hg(e,l),e1(l,n,e)}function Zu(n,e,t,i,r,s,o,a,c,l,u){let d=t+ln,f;if(e.firstCreatePass){if(f=dd(e,d,4,o||null,a||null),l!=null){let h=ir(e.consts,l);f.localNames=[];for(let m=0;m<h.length;m+=2)f.localNames.push(h[m],-1)}}else f=e.data[d];return _1(f,n,e,t,i,r,s,c),l!=null&&_g(n,f,u),f}var E1=b1;function b1(n,e,t,i){return Nu(!0),e[$t].createComment("")}var Tg=new ot("");function pd(n){return!!n&&typeof n.then=="function"}function Cg(n){return!!n&&typeof n.subscribe=="function"}var Dg=new ot("");function Ag(n){return Ls([{provide:Dg,multi:!0,useValue:n}])}var Ig=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=ue(Dg,{optional:!0})??[];injector=ue(Di);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=Eu(this.injector,r);if(pd(s))t.push(s);else if(Cg(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),oE=new ot("");function aE(){ap(()=>{let n="";throw new ke(600,n)})}function cE(n){return n.isBoundToModule}var M1=10;var Xs=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=ue($r);afterRenderManager=ue(mg);zonelessEnabled=ue(ic);rootEffectScheduler=ue(Em);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new ti;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=ue(Ho);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Ji(t=>!t))}constructor(){ue(Kr,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=ue(di);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=Di.NULL){return this._injector.get(xn).run(()=>{bt(ut.BootstrapComponentStart);let o=t instanceof fd;if(!this._injector.get(Ig).done){let m="";throw new ke(405,m)}let c;o?c=t:c=this._injector.get(hd).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=cE(c)?void 0:this._injector.get(hc),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(Tg,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),ac(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),bt(ut.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){bt(ut.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(od.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw bt(ut.ChangeDetectionEnd),new ke(101,!1);let t=ze(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,ze(t),this.afterTick.next(),bt(ut.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ws,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<M1;){bt(ut.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{bt(ut.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!tc(r))continue;let s=i&&!this.zonelessEnabled?0:1;F_(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>tc(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;ac(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(oE,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>ac(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new ke(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ac(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Jr(n,e,t,i){let r=ct(),s=Uo();if(or(r,s,e)){let o=Zn(),a=pm();ZT(a,r,n,e,t,i)}return Jr}var $m=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),s=this.detach(r);if(r-i>1){let o=this.detach(i);this.attach(i,s),this.attach(r,o)}else this.attach(i,s)}move(e,t){this.attach(t,this.detach(e))}};function Tm(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function S1(n,e,t,i){let r,s,o=0,a=n.length-1,c=void 0;if(Array.isArray(e)){ze(i);let l=e.length-1;for(ze(null);o<=a&&o<=l;){let u=n.at(o),d=e[o],f=Tm(o,u,o,d,t);if(f!==0){f<0&&n.updateValue(o,d),o++;continue}let h=n.at(a),m=e[l],_=Tm(a,h,l,m,t);if(_!==0){_<0&&n.updateValue(a,m),a--,l--;continue}let g=t(o,u),p=t(a,h),b=t(o,d);if(Object.is(b,p)){let D=t(l,m);Object.is(D,g)?(n.swap(o,a),n.updateValue(a,m),l--,a--):n.move(a,o),n.updateValue(o,d),o++;continue}if(r??=new $u,s??=Lx(n,o,a,t),Km(n,r,o,b))n.updateValue(o,d),o++,a++;else if(s.has(b))r.set(g,n.detach(o)),a--;else{let D=n.create(o,e[o]);n.attach(o,D),o++,a++}}for(;o<=l;)Px(n,r,t,o,e[o]),o++}else if(e!=null){ze(i);let l=e[Symbol.iterator]();ze(null);let u=l.next();for(;!u.done&&o<=a;){let d=n.at(o),f=u.value,h=Tm(o,d,o,f,t);if(h!==0)h<0&&n.updateValue(o,f),o++,u=l.next();else{r??=new $u,s??=Lx(n,o,a,t);let m=t(o,f);if(Km(n,r,o,m))n.updateValue(o,f),o++,a++,u=l.next();else if(!s.has(m))n.attach(o,n.create(o,f)),o++,a++,u=l.next();else{let _=t(o,d);r.set(_,n.detach(o)),a--}}}for(;!u.done;)Px(n,r,t,n.length,u.value),u=l.next()}for(;o<=a;)n.destroy(n.detach(a--));r?.forEach(l=>{n.destroy(l)})}function Km(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function Px(n,e,t,i,r){if(Km(n,e,i,t(i,r)))n.updateValue(i,r);else{let s=n.create(i,r);n.attach(i,s)}}function Lx(n,e,t,i){let r=new Set;for(let s=e;s<=t;s++)r.add(i(s,n.at(s)));return r}var $u=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function Hn(n,e,t,i,r,s,o,a){qs("NgControlFlow");let c=ct(),l=Zn(),u=ir(l.consts,s);return Zu(c,l,n,e,t,i,r,u,256,o,a),Rg}function Rg(n,e,t,i,r,s,o,a){qs("NgControlFlow");let c=ct(),l=Zn(),u=ir(l.consts,s);return Zu(c,l,n,e,t,i,r,u,512,o,a),Rg}function Vn(n,e){qs("NgControlFlow");let t=ct(),i=Uo(),r=t[i]!==An?t[i]:-1,s=r!==-1?Ku(t,ln+r):void 0,o=0;if(or(t,i,n)){let a=ze(null);try{if(s!==void 0&&z_(s,o),n!==-1){let c=ln+n,l=Ku(t,c),u=tg(t[Ve],c),d=W_(l,u,t),f=ld(t,u,e,{dehydratedView:d});ud(l,f,o,lc(u,d))}}finally{ze(a)}}else if(s!==void 0){let a=V_(s,o);a!==void 0&&(a[Zt]=e)}}var Jm=class{lContainer;$implicit;$index;constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-jt}};function Ng(n,e){return e}var Qm=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function $n(n,e,t,i,r,s,o,a,c,l,u,d,f){qs("NgControlFlow");let h=ct(),m=Zn(),_=c!==void 0,g=ct(),p=a?o.bind(g[pi][Zt]):o,b=new Qm(_,p);g[ln+n]=b,Zu(h,m,n+1,e,t,i,r,ir(m.consts,s),256),_&&Zu(h,m,n+2,c,l,u,d,ir(m.consts,f),512)}var eg=class extends $m{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-jt}at(e){return this.getLView(e)[Zt].$implicit}attach(e,t){let i=t[No];this.needsIndexUpdate||=e!==this.length,ud(this.lContainer,t,e,lc(this.templateTNode,i)),w1(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,T1(this.lContainer,e),C1(this.lContainer,e)}create(e,t){let i=Um(this.lContainer,this.templateTNode.tView.ssrId);return ld(this.hostLView,this.templateTNode,new Jm(this.lContainer,t,e),{dehydratedView:i})}destroy(e){ad(e[Ve],e)}updateValue(e,t){this.getLView(e)[Zt].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[Zt].$index=e}getLView(e){return D1(this.lContainer,e)}};function Kn(n){let e=ze(null),t=Oi();try{let i=ct(),r=i[Ve],s=i[t],o=t+1,a=Ku(i,o);if(s.liveCollection===void 0){let l=tg(r,o);s.liveCollection=new eg(a,i,l)}else s.liveCollection.reset();let c=s.liveCollection;if(S1(c,n,s.trackByFn,e),c.updateIndexes(),s.hasEmptyBlock){let l=Uo(),u=c.length===0;if(or(i,l,u)){let d=t+2,f=Ku(i,d);if(u){let h=tg(r,d),m=W_(f,h,i),_=ld(i,h,void 0,{dehydratedView:m});ud(f,_,0,lc(h,m))}else r.firstUpdatePass&&xC(f),z_(f,0)}}}finally{ze(e)}}function Ku(n,e){return n[e]}function w1(n,e){if(n.length<=jt)return;let t=jt+e,i=n[t],r=i?i[qr]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let s=i[Sr];wT(s,r),Gs.delete(i[wr]),r.detachedLeaveAnimationFns=void 0}}function T1(n,e){if(n.length<=jt)return;let t=jt+e,i=n[t],r=i?i[qr]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function C1(n,e){return dc(n,e)}function D1(n,e){return V_(n,e)}function tg(n,e){return Su(n,e)}function ng(n,e,t,i,r){I_(e,n,t,r?"class":"style",i)}function Ju(n,e,t,i){let r=ct(),s=r[Ve],o=n+ln,a=s.firstCreatePass?Y_(o,r,2,e,YT,Wy(),t,i):s.data[o];if(Bs(a)){let c=r[tr].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate($_(l),()=>(Ox(n,e,r,a,i),Ju))}}return Ox(n,e,r,a,i),Ju}function Ox(n,e,t,i,r){if(D_(i,t,n,e,lE),Mu(i)){let s=t[Ve];C_(s,t,i),d_(s,i,t)}r!=null&&_g(t,i)}function Pg(){let n=Zn(),e=Li(),t=A_(e);return n.firstCreatePass&&Z_(n,t),sm(t)&&om(),rm(),t.classesWithoutHost!=null&&Iw(t)&&ng(n,t,ct(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&Rw(t)&&ng(n,t,ct(),t.stylesWithoutHost,!1),Pg}function Dr(n,e,t,i){return Ju(n,e,t,i),Pg(),Dr}function W(n,e,t,i){let r=ct(),s=r[Ve],o=n+ln,a=s.firstCreatePass?PC(o,s,2,e,t,i):s.data[o];return D_(a,r,n,e,lE),i!=null&&_g(r,a),W}function $(){let n=Li(),e=A_(n);return sm(e)&&om(),rm(),$}function un(n,e,t,i){return W(n,e,t,i),$(),un}var lE=(n,e,t,i,r)=>(Nu(!0),f_(e[$t],i,mm()));function ar(){return ct()}function Qr(n,e,t){let i=ct(),r=Uo();if(or(i,r,e)){let s=Zn(),o=pm();WT(o,i,n,e,i[$t],t)}return Qr}var rc=void 0;function A1(n){let e=Math.floor(Math.abs(n)),t=n.toString().replace(/^[^.]*\.?/,"").length;return e===1&&t===0?1:5}var I1=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],rc,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],rc,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",rc,rc,rc],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",A1],Cm=Object.create(null);function md(n){let e=R1(n),t=Fx(e);if(t)return t;let i=e.split("-")[0];if(t=Fx(i),t)return t;if(i==="en")return I1;throw new ke(701,!1)}function Fx(n){if(!(n in Cm)){let e=Is.ng&&Is.ng.common&&Is.ng.common.locales&&Is.ng.common.locales[n];return e!==void 0&&(Cm[n]=e),e}return Cm[n]}var Ys=(function(n){return n[n.LocaleId=0]="LocaleId",n[n.DayPeriodsFormat=1]="DayPeriodsFormat",n[n.DayPeriodsStandalone=2]="DayPeriodsStandalone",n[n.DaysFormat=3]="DaysFormat",n[n.DaysStandalone=4]="DaysStandalone",n[n.MonthsFormat=5]="MonthsFormat",n[n.MonthsStandalone=6]="MonthsStandalone",n[n.Eras=7]="Eras",n[n.FirstDayOfWeek=8]="FirstDayOfWeek",n[n.WeekendRange=9]="WeekendRange",n[n.DateFormat=10]="DateFormat",n[n.TimeFormat=11]="TimeFormat",n[n.DateTimeFormat=12]="DateTimeFormat",n[n.NumberSymbols=13]="NumberSymbols",n[n.NumberFormats=14]="NumberFormats",n[n.CurrencyCode=15]="CurrencyCode",n[n.CurrencySymbol=16]="CurrencySymbol",n[n.CurrencyName=17]="CurrencyName",n[n.Currencies=18]="Currencies",n[n.Directionality=19]="Directionality",n[n.PluralCase=20]="PluralCase",n[n.ExtraData=21]="ExtraData",n})(Ys||{});function R1(n){return n.toLowerCase().replace(/_/g,"-")}var xc="en-US";var N1=xc;function uE(n){typeof n=="string"&&(N1=n.toLowerCase().replace(/_/g,"-"))}function dt(n,e,t){let i=ct(),r=Zn(),s=Li();return(s.type&3||t)&&kC(s,r,i,t,i[$t],n,e,FC(s,i,e)),dt}function St(n=1){return rx(n)}function gd(n,e,t,i){return d1(n,a1(e,t,i)),gd}function Lg(n=1){Du(ex()+n)}function Lu(n,e){return n<<17|e<<2}function js(n){return n>>17&32767}function P1(n){return(n&2)==2}function L1(n,e){return n&131071|e<<17}function ig(n){return n|2}function qo(n){return(n&131068)>>2}function Dm(n,e){return n&-131069|e<<2}function O1(n){return(n&1)===1}function rg(n){return n|1}function F1(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=js(o),c=qo(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Io(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=js(n[a+1]);n[i+1]=Lu(f,a),f!==0&&(n[f+1]=Dm(n[f+1],i)),n[a+1]=L1(n[a+1],i)}else n[i+1]=Lu(a,0),a!==0&&(n[a+1]=Dm(n[a+1],i)),a=i;else n[i+1]=Lu(c,0),a===0?a=i:n[c+1]=Dm(n[c+1],i),c=i;l&&(n[i+1]=ig(n[i+1])),kx(n,u,i,!0),kx(n,u,i,!1),k1(e,u,n,i,s),o=Lu(a,c),s?e.classBindings=o:e.styleBindings=o}function k1(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&Io(s,e)>=0&&(t[i+1]=rg(t[i+1]))}function kx(n,e,t,i){let r=n[t+1],s=e===null,o=i?js(r):qo(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];U1(c,e)&&(a=!0,n[o+1]=i?rg(l):ig(l)),o=i?js(l):qo(l)}a&&(n[t+1]=i?ig(r):rg(r))}function U1(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?Io(n,e)>=0:!1}var Ui={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function B1(n){return n.substring(Ui.key,Ui.keyEnd)}function H1(n){return V1(n),dE(n,fE(n,0,Ui.textEnd))}function dE(n,e){let t=Ui.textEnd;return t===e?-1:(e=Ui.keyEnd=z1(n,Ui.key=e,t),fE(n,e,t))}function V1(n){Ui.key=0,Ui.keyEnd=0,Ui.value=0,Ui.valueEnd=0,Ui.textEnd=n.length}function fE(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function z1(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function es(n,e,t){return hE(n,e,t,!1),es}function nn(n,e){return hE(n,e,null,!0),nn}function Og(n){W1($1,G1,n,!0)}function G1(n,e){for(let t=H1(e);t>=0;t=dE(e,t))xu(n,B1(e),!0)}function hE(n,e,t,i){let r=ct(),s=Zn(),o=nc(2);if(s.firstUpdatePass&&mE(s,n,o,i),e!==An&&or(r,o,e)){let a=s.data[Oi()];gE(s,a,r,r[$t],n,r[o+1]=J1(e,t),i,o)}}function W1(n,e,t,i){let r=Zn(),s=nc(2);r.firstUpdatePass&&mE(r,null,s,i);let o=ct();if(t!==An&&or(o,s,t)){let a=r.data[Oi()];if(vE(a,i)&&!pE(r,s)){let c=i?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(t=hu(c,t||"")),ng(r,a,o,t,i)}else K1(r,a,o,o[$t],o[s+1],o[s+1]=Z1(n,e,t),i,s)}}function pE(n,e){return e>=n.expandoStartIndex}function mE(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[Oi()],o=pE(n,t);vE(s,i)&&e===null&&!o&&(e=!1),e=j1(r,s,e,i),F1(r,s,e,t,o,i)}}function j1(n,e,t,i){let r=Qy(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Am(null,n,e,t,i),t=mc(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Am(r,n,e,t,i),s===null){let c=q1(n,e,i);c!==void 0&&Array.isArray(c)&&(c=Am(null,n,e,c[1],i),c=mc(c,e.attrs,i),X1(n,e,i,c))}else s=Y1(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function q1(n,e,t){let i=t?e.classBindings:e.styleBindings;if(qo(i)!==0)return n[js(i)]}function X1(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[js(r)]=i}function Y1(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=mc(i,o,t)}return mc(i,e.attrs,t)}function Am(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=mc(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function mc(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),xu(n,o,t?!0:e[++s]))}return n===void 0?null:n}function Z1(n,e,t){if(t==null||t==="")return Ci;let i=[],r=lg(t);if(Array.isArray(r))for(let s=0;s<r.length;s++)n(i,r[s],!0);else if(r instanceof Set)for(let s of r)n(i,s,!0);else if(typeof r=="object")for(let s in r)r.hasOwnProperty(s)&&n(i,s,r[s]);else typeof r=="string"&&e(i,r);return i}function $1(n,e,t){let i=String(e);i!==""&&!i.includes(" ")&&xu(n,i,t)}function K1(n,e,t,i,r,s,o,a){r===An&&(r=Ci);let c=0,l=0,u=0<r.length?r[0]:null,d=0<s.length?s[0]:null;for(;u!==null||d!==null;){let f=c<r.length?r[c+1]:void 0,h=l<s.length?s[l+1]:void 0,m=null,_;u===d?(c+=2,l+=2,f!==h&&(m=d,_=h)):d===null||u!==null&&u<d?(c+=2,m=u):(l+=2,m=d,_=h),m!==null&&gE(n,e,t,i,m,_,o,a),u=c<r.length?r[c]:null,d=l<s.length?s[l]:null}}function gE(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=O1(l)?Ux(c,e,t,r,qo(l),o):void 0;if(!Qu(u)){Qu(s)||P1(l)&&(s=Ux(c,null,t,r,a,o));let d=Kp(Oi(),t);HT(i,o,d,r,s)}}function Ux(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===An&&(f=d?Ci:void 0);let h=d?_u(f,i):u===i?f:void 0;if(l&&!Qu(h)&&(h=_u(c,i)),Qu(h)&&(a=h,o))return a;let m=n[r+1];r=o?js(m):qo(m)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=_u(c,i))}return a}function Qu(n){return n!==void 0}function J1(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=fu(lg(n)))),n}function vE(n,e){return(n.flags&(e?8:16))!==0}function Q(n,e=""){let t=ct(),i=Zn(),r=n+ln,s=i.firstCreatePass?dd(i,r,1,e,null):i.data[r],o=Q1(i,t,s,e);t[r]=o,Ru()&&yg(i,t,o,s),ko(s,!1)}var Q1=(n,e,t,i)=>(Nu(!0),nT(e[$t],i));function eD(n,e,t,i=""){return or(n,Uo(),t)?e+Wr(t)+i:An}function tD(n,e,t,i,r,s=""){let o=dm(),a=Sg(n,o,t,r);return nc(2),a?e+Wr(t)+i+Wr(r)+s:An}function nD(n,e,t,i,r,s,o,a=""){let c=dm(),l=OC(n,c,t,r,o);return nc(3),l?e+Wr(t)+i+Wr(r)+s+Wr(o)+a:An}function mt(n){return _n("",n),mt}function _n(n,e,t){let i=ct(),r=eD(i,n,e,t);return r!==An&&Fg(i,Oi(),r),_n}function zn(n,e,t,i,r){let s=ct(),o=tD(s,n,e,t,i,r);return o!==An&&Fg(s,Oi(),o),zn}function vd(n,e,t,i,r,s,o){let a=ct(),c=nD(a,n,e,t,i,r,s,o);return c!==An&&Fg(a,Oi(),c),vd}function Fg(n,e,t){let i=Kp(e,n);iT(n[$t],i,t)}function iD(n,e){let t=n[e];return t===An?void 0:t}function rD(n,e,t,i,r,s,o){let a=e+t;return Sg(n,a,r,s)?LC(n,a+2,o?i.call(o,r,s):i(r,s)):iD(n,a+2)}function kg(n,e){let t=Zn(),i,r=n+ln;t.firstCreatePass?(i=sD(e,t.pipeRegistry),t.data[r]=i,i.onDestroy&&(t.destroyHooks??=[]).push(r,i.onDestroy)):i=t.data[r];let s=i.factory||(i.factory=Cs(i.type,!0)),o,a=Un(vc);try{let c=zu(!1),l=s();return zu(c),Jp(t,ct(),r,l),l}finally{Un(a)}}function sD(n,e){if(e)for(let t=e.length-1;t>=0;t--){let i=e[t];if(n===i.name)return i}}function Ug(n,e,t,i){let r=n+ln,s=ct(),o=ky(s,r);return oD(s,r)?rD(s,Yy(),e,o.transform,t,i,o):o.transform(t,i)}function oD(n,e){return n[Ve].data[e].pure}var yE=(()=>{class n{applicationErrorHandler=ue($r);appRef=ue(Xs);taskService=ue(Ho);ngZone=ue(xn);zonelessEnabled=ue(ic);tracing=ue(Kr,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new kn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ya):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(ue(_m,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?lx:gm;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ya+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function xE(){return[{provide:As,useExisting:yE},{provide:xn,useClass:Za},{provide:ic,useValue:!0}]}function aD(){return typeof $localize<"u"&&$localize.locale||xc}var _c=new ot("",{factory:()=>ue(_c,{optional:!0,skipSelf:!0})||aD()});function En(n,e){return za(n,e?.equal)}function _E(n,e){return iE(e)}function ED(n,e){return rE(e)}var EE=(_E.required=ED,_E);var Bg=new ot(""),bD=new ot("");function Ec(n){return!n.moduleRef}function MD(n){let e=Ec(n)?n.r3Injector:n.moduleRef.injector,t=e.get(xn);return t.run(()=>{Ec(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get($r),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Ec(n)){let s=()=>e.destroy(),o=n.platformInjector.get(Bg);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(Bg);o.add(s),n.moduleRef.onDestroy(()=>{ac(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return wD(i,t,()=>{let s=e.get(Ho),o=s.add(),a=e.get(Ig);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(_c,xc);if(uE(c||xc),!e.get(bD,!0))return Ec(n)?e.get(Xs):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Ec(n)){let u=e.get(Xs);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return SD?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var SD;function wD(n,e,t){try{let i=t();return pd(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var yd=null;function TD(n=[],e){return Di.create({name:e,providers:[{provide:Ka,useValue:"platform"},{provide:Bg,useValue:new Set([()=>yd=null])},...n]})}function CD(n=[]){if(yd)return yd;let e=TD(n);return yd=e,aE(),DD(e),e}function DD(n){let e=n.get(id,null);Eu(n,()=>{e?.forEach(t=>t())})}function bE(){return!1}var AD=1e4;var DV=AD-1e3;function ME(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;bt(ut.BootstrapApplicationStart);try{let s=r?.injector??CD(i),o=[xE(),dx,...t||[]],a=new pc({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return MD({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{bt(ut.BootstrapApplicationEnd)}}var SE=null;function Mc(){return SE}function Vg(n){SE??=n}var bc=class{};var Wg=(function(n){return n[n.Decimal=0]="Decimal",n[n.Percent=1]="Percent",n[n.Currency=2]="Currency",n[n.Scientific=3]="Scientific",n})(Wg||{});var cr={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Zo(n,e){let t=md(n),i=t[Ys.NumberSymbols][e];if(typeof i>"u"){if(e===cr.CurrencyDecimal)return t[Ys.NumberSymbols][cr.Decimal];if(e===cr.CurrencyGroup)return t[Ys.NumberSymbols][cr.Group]}return i}function TE(n,e){return md(n)[Ys.NumberFormats][e]}var ID=/^(\d+)?\.((\d+)(-(\d+))?)?$/,wE=22,xd=".",Sc="0",RD=";",ND=",",zg="#";function PD(n,e,t,i,r,s,o=!1){let a="",c=!1;if(!isFinite(n))a=Zo(t,cr.Infinity);else{let l=FD(n);o&&(l=OD(l));let u=e.minInt,d=e.minFrac,f=e.maxFrac;if(s){let b=s.match(ID);if(b===null)throw new ke(2306,!1);let D=b[1],E=b[3],M=b[5];D!=null&&(u=Gg(D)),E!=null&&(d=Gg(E)),M!=null?f=Gg(M):E!=null&&d>f&&(f=d);let S=100;if(u>S||d>S||f>S)throw new ke(2306,!1)}kD(l,d,f);let h=l.digits,m=l.integerLen,_=l.exponent,g=[];for(c=h.every(b=>!b);m<u;m++)h.unshift(0);for(;m<0;m++)h.unshift(0);m>0?g=h.splice(m,h.length):(g=h,h=[0]);let p=[];for(h.length>=e.lgSize&&p.unshift(h.splice(-e.lgSize,h.length).join(""));h.length>e.gSize;)p.unshift(h.splice(-e.gSize,h.length).join(""));h.length&&p.unshift(h.join("")),a=p.join(Zo(t,i)),g.length&&(a+=Zo(t,r)+g.join("")),_&&(a+=Zo(t,cr.Exponential)+"+"+_)}return n<0&&!c?a=e.negPre+a+e.negSuf:a=e.posPre+a+e.posSuf,a}function CE(n,e,t){let i=TE(e,Wg.Decimal),r=LD(i,Zo(e,cr.MinusSign));return PD(n,r,e,cr.Group,cr.Decimal,t)}function LD(n,e="-"){let t={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=n.split(RD),r=i[0],s=i[1],o=r.indexOf(xd)!==-1?r.split(xd):[r.substring(0,r.lastIndexOf(Sc)+1),r.substring(r.lastIndexOf(Sc)+1)],a=o[0],c=o[1]||"";t.posPre=a.substring(0,a.indexOf(zg));for(let u=0;u<c.length;u++){let d=c.charAt(u);d===Sc?t.minFrac=t.maxFrac=u+1:d===zg?t.maxFrac=u+1:t.posSuf+=d}let l=a.split(ND);if(t.gSize=l[1]?l[1].length:0,t.lgSize=l[2]||l[1]?(l[2]||l[1]).length:0,s){let u=r.length-t.posPre.length-t.posSuf.length,d=s.indexOf(zg);t.negPre=s.substring(0,d).replace(/'/g,""),t.negSuf=s.slice(d+u).replace(/'/g,"")}else t.negPre=e+t.posPre,t.negSuf=t.posSuf;return t}function OD(n){if(n.digits[0]===0)return n;let e=n.digits.length-n.integerLen;return n.exponent?n.exponent+=2:(e===0?n.digits.push(0,0):e===1&&n.digits.push(0),n.integerLen+=2),n}function FD(n){let e=Math.abs(n)+"",t=0,i,r,s,o,a;for((r=e.indexOf(xd))>-1&&(e=e.replace(xd,"")),(s=e.search(/e/i))>0?(r<0&&(r=s),r+=+e.slice(s+1),e=e.substring(0,s)):r<0&&(r=e.length),s=0;e.charAt(s)===Sc;s++);if(s===(a=e.length))i=[0],r=1;else{for(a--;e.charAt(a)===Sc;)a--;for(r-=s,i=[],o=0;s<=a;s++,o++)i[o]=Number(e.charAt(s))}return r>wE&&(i=i.splice(0,wE-1),t=r-1,r=1),{digits:i,exponent:t,integerLen:r}}function kD(n,e,t){if(e>t)throw new ke(2307,!1);let i=n.digits,r=i.length-n.integerLen,s=Math.min(Math.max(e,r),t),o=s+n.integerLen,a=i[o];if(o>0){i.splice(Math.max(n.integerLen,o));for(let d=o;d<i.length;d++)i[d]=0}else{r=Math.max(0,r),n.integerLen=1,i.length=Math.max(1,o=s+1),i[0]=0;for(let d=1;d<o;d++)i[d]=0}if(a>=5)if(o-1<0){for(let d=0;d>o;d--)i.unshift(0),n.integerLen++;i.unshift(1),n.integerLen++}else i[o-1]++;for(;r<Math.max(0,s);r++)i.push(0);let c=s!==0,l=e+n.integerLen,u=i.reduceRight(function(d,f,h,m){return f=f+d,m[h]=f<10?f:f-10,c&&(m[h]===0&&h>=l?m.pop():c=!1),f>=10?1:0},0);u&&(i.unshift(u),n.integerLen++)}function Gg(n){let e=parseInt(n);if(isNaN(e))throw new ke(2305,!1);return e}function UD(n,e){return new ke(2100,!1)}var jg=(()=>{class n{_locale;constructor(t){this._locale=t}transform(t,i,r){if(!BD(t))return null;r||=this._locale;try{let s=HD(t);return CE(s,r,i)}catch(s){throw UD(n,s.message)}}static \u0275fac=function(i){return new(i||n)(vc(_c,16))};static \u0275pipe=wg({name:"number",type:n,pure:!0})}return n})();function BD(n){return!(n==null||n===""||n!==n)}function HD(n){if(typeof n=="string"&&!isNaN(Number(n)-parseFloat(n)))return Number(n);if(typeof n!="number")throw new ke(2309,!1);return n}function qg(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var wc=class{};var DE="browser";var Tc=class{_doc;constructor(e){this._doc=e}manager},_d=(()=>{class n extends Tc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(pt(gi))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),Md=new ot(""),$g=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof _d));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof _d);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new ke(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(pt(Md),pt(xn))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),Xg="ng-app-id";function AE(n){for(let e of n)e.remove()}function IE(n,e){let t=e.createElement("style");return t.textContent=n,t}function GD(n,e,t,i){let r=n.head?.querySelectorAll(`style[${Xg}="${e}"],link[${Xg}="${e}"]`);if(r)for(let s of r)s.removeAttribute(Xg),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function Zg(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Kg=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,GD(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,IE);i?.forEach(r=>this.addUsage(r,this.external,Zg))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(AE(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])AE(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,IE(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Zg(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(pt(gi),pt(nd),pt(rd,8),pt(gc))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),Yg={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Jg=/%COMP%/g;var NE="%COMP%",WD=`_nghost-${NE}`,jD=`_ngcontent-${NE}`,qD=!0,XD=new ot("",{factory:()=>qD});function YD(n){return jD.replace(Jg,n)}function ZD(n){return WD.replace(Jg,n)}function PE(n,e){return e.map(t=>t.replace(Jg,n))}var Qg=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,s,o,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Cc(t,o,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof bd?r.applyToHost(t):r instanceof Dc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Bi.Emulated:s=new bd(c,l,i,this.appId,u,o,a,d);break;case Bi.ShadowDom:return new Ed(c,t,i,o,a,this.nonce,d,l);case Bi.ExperimentalIsolatedShadowDom:return new Ed(c,t,i,o,a,this.nonce,d);default:s=new Dc(c,l,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(pt($g),pt(Kg),pt(nd),pt(XD),pt(gi),pt(xn),pt(rd),pt(Kr,8))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),Cc=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Yg[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(RE(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(RE(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new ke(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=Yg[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Yg[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(sr.DashCase|sr.Important)?e.style.setProperty(t,i,r&sr.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&sr.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=Mc().getGlobalEventTarget(this.doc,e),!e))throw new ke(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function RE(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Ed=class extends Cc{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c){super(e,r,s,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=PE(i.id,l);for(let d of l){let f=document.createElement("style");o&&f.setAttribute("nonce",o),f.textContent=d,this.shadowRoot.appendChild(f)}let u=i.getExternalStyles?.();if(u)for(let d of u){let f=Zg(d,r);o&&f.setAttribute("nonce",o),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Dc=class extends Cc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?PE(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Gs.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},bd=class extends Dc{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c){let l=r+"-"+i.id;super(e,t,i,s,o,a,c,l),this.contentAttr=YD(l),this.hostAttr=ZD(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var Sd=class n extends bc{supportsDOMEvents=!0;static makeCurrent(){Vg(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=$D();return t==null?null:KD(t)}resetBaseElement(){Ac=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return qg(document.cookie,e)}},Ac=null;function $D(){return Ac=Ac||document.head.querySelector("base"),Ac?Ac.getAttribute("href"):null}function KD(n){return new URL(n,document.baseURI).pathname}var JD=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),LE=["alt","control","meta","shift"],QD={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},eA={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},OE=(()=>{class n extends Tc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Mc().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),LE.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=QD[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),LE.forEach(o=>{if(o!==r){let a=eA[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(pt(gi))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})();async function e0(n,e,t){let i=Rt({rootComponent:n},tA(e,t));return ME(i)}function tA(n,e){return{platformRef:e?.platformRef,appProviders:[...oA,...n?.providers??[]],platformProviders:sA}}function nA(){Sd.makeCurrent()}function iA(){return new er}function rA(){return ag(document),document}var sA=[{provide:gc,useValue:DE},{provide:id,useValue:nA,multi:!0},{provide:gi,useFactory:rA}];var oA=[{provide:Ka,useValue:"root"},{provide:er,useFactory:iA},{provide:Md,useClass:_d,multi:!0},{provide:Md,useClass:OE,multi:!0},Qg,Kg,$g,{provide:Ws,useExisting:Qg},{provide:wc,useClass:JD},[]];var t0="Service workers are disabled or not supported by this browser",$o=class{serviceWorker;worker;registration;events;constructor(e,t){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=new Yt(i=>i.error(new ke(5601,!1)));else{let i=null,r=new ti;this.worker=new Yt(l=>(i!==null&&l.next(i),r.subscribe(u=>l.next(u))));let s=()=>{let{controller:l}=e;l!==null&&(i=l,r.next(i))};e.addEventListener("controllerchange",s),s(),this.registration=this.worker.pipe(To(()=>e.getRegistration().then(l=>{if(!l)throw new ke(5601,!1);return l})));let o=new ti;this.events=o.asObservable();let a=l=>{let{data:u}=l;u?.type&&o.next(u)};e.addEventListener("message",a),t?.get(Xs,null,{optional:!0})?.onDestroy(()=>{e.removeEventListener("controllerchange",s),e.removeEventListener("message",a)})}}postMessage(e,t){return new Promise(i=>{this.worker.pipe(Ss(1)).subscribe(r=>{r.postMessage(Rt({action:e},t)),i()})})}postMessageWithOperation(e,t,i){let r=this.waitForOperationCompleted(i),s=this.postMessage(e,t);return Promise.all([s,r]).then(([,o])=>o)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let t;return typeof e=="string"?t=i=>i.type===e:t=i=>e.includes(i.type),this.events.pipe(su(t))}nextEventOfType(e){return this.eventsOfType(e).pipe(Ss(1))}waitForOperationCompleted(e){return new Promise((t,i)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(su(r=>r.nonce===e),Ss(1),Ji(r=>{if(r.result!==void 0)return r.result;throw new Error(r.error)})).subscribe({next:t,error:i})})}get isEnabled(){return!!this.serviceWorker}},aA=(()=>{class n{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new ti;constructor(t){if(this.sw=t,!t.isEnabled){this.messages=Er,this.notificationClicks=Er,this.notificationCloses=Er,this.pushSubscriptionChanges=Er,this.subscription=Er;return}this.messages=this.sw.eventsOfType("PUSH").pipe(Ji(r=>r.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(Ji(r=>r.data)),this.notificationCloses=this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(Ji(r=>r.data)),this.pushSubscriptionChanges=this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(Ji(r=>r.data)),this.pushManager=this.sw.registration.pipe(Ji(r=>r.pushManager));let i=this.pushManager.pipe(To(r=>r.getSubscription()));this.subscription=new Yt(r=>{let s=i.subscribe(r),o=this.subscriptionChanges.subscribe(r);return()=>{s.unsubscribe(),o.unsubscribe()}})}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(t0));let i={userVisibleOnly:!0},r=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),s=new Uint8Array(new ArrayBuffer(r.length));for(let o=0;o<r.length;o++)s[o]=r.charCodeAt(o);return i.applicationServerKey=s,new Promise((o,a)=>{this.pushManager.pipe(To(c=>c.subscribe(i)),Ss(1)).subscribe({next:c=>{this.subscriptionChanges.next(c),o(c)},error:a})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(t0));let t=i=>{if(i===null)throw new ke(5602,!1);return i.unsubscribe().then(r=>{if(!r)throw new ke(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,r)=>{this.subscription.pipe(Ss(1),To(t)).subscribe({next:i,error:r})})}decodeBase64(t){return atob(t)}static \u0275fac=function(i){return new(i||n)(pt($o))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),cA=(()=>{class n{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=Er,this.unrecoverable=Er;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(t0));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let t=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new ke(5601,!1));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}static \u0275fac=function(i){return new(i||n)(pt($o))};static \u0275prov=We({token:n,factory:n.\u0275fac})}return n})(),kE=new ot("");function lA(){let n=ue(Ic);if(!("serviceWorker"in navigator&&n.enabled!==!1))return;let e=ue(kE),t=ue(xn),i=ue(Xs);t.runOutsideAngular(()=>{let r=navigator.serviceWorker,s=()=>r.controller?.postMessage({action:"INITIALIZE"});r.addEventListener("controllerchange",s),i.onDestroy(()=>{r.removeEventListener("controllerchange",s)})}),t.runOutsideAngular(()=>{let r,{registrationStrategy:s}=n;if(typeof s=="function")r=new Promise(o=>s().subscribe(()=>o()));else{let[o,...a]=(s||"registerWhenStable:30000").split(":");switch(o){case"registerImmediately":r=Promise.resolve();break;case"registerWithDelay":r=FE(+a[0]||0);break;case"registerWhenStable":r=Promise.race([i.whenStable(),FE(+a[0])]);break;default:throw new ke(5600,!1)}}r.then(()=>{i.destroyed||navigator.serviceWorker.register(e,{scope:n.scope,updateViaCache:n.updateViaCache,type:n.type}).catch(o=>console.error(Ao(5604,!1)))})})}function FE(n){return new Promise(e=>setTimeout(e,n))}function uA(){let n=ue(Ic),e=ue(Di),t=!0;return new $o(t&&n.enabled!==!1?navigator.serviceWorker:void 0,e)}var Ic=class{enabled;updateViaCache;type;scope;registrationStrategy};function UE(n,e={}){return Ls([aA,cA,{provide:kE,useValue:n},{provide:Ic,useValue:e},{provide:$o,useFactory:uA},Ag(lA)])}var BE={providers:[xm(),UE("ngsw-worker.js",{enabled:!bE(),registrationStrategy:"registerWhenStable:30000"})]};var Rc=[{id:"calm",name:"\u0647\u0627\u062F\u064A",tagline:"\u0627\u0644\u0641\u062C\u0631\u060C \u0627\u0644\u0637\u0631\u064A\u0642 \u0641\u0627\u0636\u064A",spawnRate:.55,minSpeed:50,maxSpeed:130,microbusMood:.15,multiplier:1},{id:"busy",name:"\u0632\u062D\u0645\u0629",tagline:"\u0627\u0644\u0633\u0627\u0639\u0629 \u0663 \u0627\u0644\u0639\u0635\u0631",spawnRate:.95,minSpeed:60,maxSpeed:160,microbusMood:.35,multiplier:1.5},{id:"chaos",name:"\u0645\u062F\u0639\u0643\u0629",tagline:"\u062E\u0645\u064A\u0633 \u0622\u062E\u0631 \u0627\u0644\u0634\u0647\u0631 \u0642\u0628\u0644 \u0627\u0644\u0639\u064A\u062F",spawnRate:1.45,minSpeed:70,maxSpeed:190,microbusMood:.6,multiplier:2.2}],$s=[{id:"fiat128",name:"\u0661\u0662\u0668",tagline:"\u0623\u0633\u0637\u0648\u0631\u0629 \u0627\u0644\u0634\u0648\u0627\u0631\u0639. \u0628\u062A\u0644\u0641 \u0641\u064A \u0623\u064A \u062E\u0631\u0645.",color:15921906,width:1.5,length:3.4,height:1.25,steering:1.35,grip:.9,lives:3,topSpeed:.9,price:0},{id:"lancer",name:"\u0644\u0627\u0646\u0633\u0631",tagline:"\u0628\u062A\u0637\u0644\u0639 \u0645\u0646 \u0639\u0646\u062F \u0627\u0644\u0631\u0627\u062F\u0627\u0631 \u0648\u0647\u0648 \u0644\u0633\u0647 \u0628\u064A\u0641\u0643\u0631.",color:12986408,width:1.7,length:4.4,height:1.3,steering:1.1,grip:1.05,lives:3,topSpeed:1,price:150},{id:"microbus",name:"\u0645\u064A\u0643\u0631\u0648\u0628\u0627\u0635",tagline:"\u062A\u0642\u064A\u0644\u060C \u0628\u064A\u0633\u062A\u062D\u0645\u0644\u060C \u0648\u0627\u0644\u0643\u0644 \u0628\u064A\u0639\u062F\u0651\u064A \u0644\u0647.",color:1402304,width:2,length:5,height:2,steering:.8,grip:.8,lives:4,topSpeed:.85,price:300},{id:"jeep",name:"\u062C\u064A\u0628",tagline:"\u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A \u0628\u064A\u062A\u0627\u0639\u0647. \u0627\u0644\u0631\u0645\u0644 \u0645\u0634 \u0628\u064A\u0647\u0632\u0651\u0647.",color:3369246,width:1.95,length:4.7,height:1.9,steering:1,grip:1.2,lives:4,topSpeed:.95,price:500}],gn=3.2;var n0=90;var lr=[{id:"ring",name:"\u0627\u0644\u0637\u0631\u064A\u0642 \u0627\u0644\u062F\u0627\u0626\u0631\u064A",place:"\u0627\u0644\u0642\u0627\u0647\u0631\u0629 \u0627\u0644\u0643\u0628\u0631\u0649",tagline:"\u0643\u0644 \u0645\u0635\u0631 \u0628\u062A\u0639\u062F\u0651\u064A \u0645\u0646 \u0647\u0646\u0627. \u0648\u0643\u0644 \u0627\u0644\u0645\u064A\u0643\u0631\u0648\u0628\u0627\u0635\u0627\u062A \u0643\u0645\u0627\u0646.",scenery:"city",landmarks:["cairoTower"],ground:13482378,haze:10406399,startPhase:.04,traffic:{car:5,microbus:3,tuktuk:1,truck:1.5,bus:.5},hazards:["bump","pothole","radar","cones"],lanes:4,density:1,speed:1,lon:31.33,lat:30.05,unlock:0,objectives:[{kind:"distance",target:2e3,text:"\u0643\u0645\u0651\u0644 \u0662 \u0643\u064A\u0644\u0648"},{kind:"nearMiss",target:8,text:"\u0668 \u062D\u0631\u0641\u0646\u0627\u062A"},{kind:"clean",target:1e3,text:"\u0643\u064A\u0644\u0648 \u0645\u0646 \u063A\u064A\u0631 \u062E\u0628\u0637\u0629"}]},{id:"mehwar",name:"\u0627\u0644\u0645\u062D\u0648\u0631",place:"\u0662\u0666 \u064A\u0648\u0644\u064A\u0648 \xB7 \u0666 \u0623\u0643\u062A\u0648\u0628\u0631",tagline:"\u0643\u0628\u0627\u0631\u064A \u0641\u0648\u0642 \u0643\u0628\u0627\u0631\u064A\u060C \u0648\u0627\u0644\u0646\u0627\u0633 \u0643\u0644\u0647\u0627 \u0631\u0627\u062C\u0639\u0629 \u0645\u0646 \u0627\u0644\u0634\u063A\u0644.",scenery:"city",landmarks:["compound"],ground:13219212,haze:11125984,startPhase:.2,traffic:{car:6,microbus:2,truck:1,bus:1},hazards:["radar","cones","pothole"],lanes:4,density:.8,speed:1.05,lon:31.05,lat:30.03,unlock:1,objectives:[{kind:"distance",target:3e3,text:"\u0643\u0645\u0651\u0644 \u0663 \u0643\u064A\u0644\u0648"},{kind:"speed",target:150,text:"\u0648\u0635\u0651\u0644 \u0661\u0665\u0660 \u0643\u0645/\u0633"},{kind:"coins",target:25,text:"\u0644\u0645 \u0662\u0665 \u0641\u0643\u0629"}]},{id:"haram",name:"\u0634\u0627\u0631\u0639 \u0627\u0644\u0647\u0631\u0645",place:"\u0627\u0644\u062C\u064A\u0632\u0629",tagline:"\u0627\u0644\u0623\u0647\u0631\u0627\u0645\u0627\u062A \u0642\u062F\u0627\u0645\u0643\u060C \u0648\u0623\u062A\u0648\u0628\u064A\u0633 \u0633\u064A\u0627\u062D\u0629 \u0641\u064A \u0643\u0644 \u062D\u0627\u0631\u0629.",scenery:"giza",landmarks:["pyramids"],ground:14205071,haze:15259048,startPhase:.12,traffic:{car:4,microbus:3,tuktuk:2,bus:2},hazards:["bump","pothole","cones"],lanes:3,density:1.1,speed:.85,lon:31.15,lat:29.99,unlock:1,objectives:[{kind:"distance",target:2500,text:"\u0643\u0645\u0651\u0644 \u0662.\u0665 \u0643\u064A\u0644\u0648"},{kind:"nearMiss",target:12,text:"\u0661\u0662 \u062D\u0631\u0641\u0646\u0629"},{kind:"clean",target:1500,text:"\u0643\u064A\u0644\u0648 \u0648\u0646\u0635 \u0645\u0646 \u063A\u064A\u0631 \u062E\u0628\u0637\u0629"}]},{id:"desert",name:"\u0627\u0644\u0637\u0631\u064A\u0642 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A",place:"\u0627\u0644\u0642\u0627\u0647\u0631\u0629 \u2014 \u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629",tagline:"\u0646\u0642\u0644 \u062A\u0642\u064A\u0644\u060C \u0634\u0628\u0648\u0631\u0629 \u0627\u0644\u0641\u062C\u0631\u060C \u0648\u0633\u0631\u0639\u0629 \u0645\u0641\u064A\u0634 \u0632\u064A\u0647\u0627.",scenery:"desert",landmarks:["windmills"],ground:14271642,haze:15851456,startPhase:.9,traffic:{car:4,truck:4,bus:1.5,microbus:1},hazards:["radar","sand","cones"],lanes:4,density:.35,speed:1.2,lon:30.4,lat:30.55,unlock:2,objectives:[{kind:"distance",target:5e3,text:"\u0643\u0645\u0651\u0644 \u0665 \u0643\u064A\u0644\u0648"},{kind:"speed",target:180,text:"\u0648\u0635\u0651\u0644 \u0661\u0668\u0660 \u0643\u0645/\u0633"},{kind:"clean",target:3e3,text:"\u0663 \u0643\u064A\u0644\u0648 \u0645\u0646 \u063A\u064A\u0631 \u062E\u0628\u0637\u0629"}]},{id:"corniche",name:"\u0643\u0648\u0631\u0646\u064A\u0634 \u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629",place:"\u0645\u0646 \u0627\u0644\u0645\u0646\u062A\u0632\u0647 \u0644\u0644\u0623\u0646\u0641\u0648\u0634\u064A",tagline:"\u0627\u0644\u0628\u062D\u0631 \u0639\u0644\u0649 \u064A\u0645\u064A\u0646\u0643\u060C \u0648\u0627\u0644\u0646\u0627\u0633 \u0643\u0644\u0647\u0627 \u0646\u0627\u0632\u0644\u0629 \u062A\u062A\u0645\u0634\u0649.",scenery:"sea",landmarks:["lighthouse"],ground:14076848,haze:12575743,startPhase:.22,traffic:{car:5,microbus:2,tuktuk:.5,bus:1},hazards:["bump","radar","pothole"],lanes:3,density:.9,speed:.8,lon:29.92,lat:31.21,unlock:2,objectives:[{kind:"distance",target:3e3,text:"\u0643\u0645\u0651\u0644 \u0663 \u0643\u064A\u0644\u0648"},{kind:"coins",target:30,text:"\u0644\u0645 \u0663\u0660 \u0641\u0643\u0629"},{kind:"nearMiss",target:10,text:"\u0661\u0660 \u062D\u0631\u0641\u0646\u0627\u062A"}]},{id:"sahel",name:"\u0637\u0631\u064A\u0642 \u0627\u0644\u0633\u0627\u062D\u0644",place:"\u0627\u0644\u0639\u0644\u0645\u064A\u0646 \u2014 \u0645\u0627\u0631\u064A\u0646\u0627",tagline:"\u0643\u0645\u0628\u0648\u0646\u062F\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0634\u0645\u0627\u0644\u060C \u0631\u0645\u0644 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646\u060C \u0648\u062C\u064A\u0628 \u0641\u064A \u0643\u0644 \u0639\u0631\u0628\u064A\u0629.",scenery:"coast",landmarks:["compound","windmills"],ground:15062704,haze:14216447,startPhase:.02,traffic:{car:6,bus:1,truck:1},hazards:["radar","sand"],lanes:4,density:.5,speed:1.15,lon:28.8,lat:30.95,unlock:3,objectives:[{kind:"distance",target:6e3,text:"\u0643\u0645\u0651\u0644 \u0666 \u0643\u064A\u0644\u0648"},{kind:"speed",target:170,text:"\u0648\u0635\u0651\u0644 \u0661\u0667\u0660 \u0643\u0645/\u0633"},{kind:"clean",target:4e3,text:"\u0664 \u0643\u064A\u0644\u0648 \u0645\u0646 \u063A\u064A\u0631 \u062E\u0628\u0637\u0629"}]},{id:"saeed",name:"\u0627\u0644\u0637\u0631\u064A\u0642 \u0627\u0644\u0632\u0631\u0627\u0639\u064A",place:"\u0627\u0644\u0635\u0639\u064A\u062F \xB7 \u0627\u0644\u0645\u0646\u064A\u0627 \u2014 \u0623\u0633\u064A\u0648\u0637",tagline:"\u063A\u064A\u0637\u0627\u0646 \u0648\u0642\u0635\u0628 \u0648\u062A\u0631\u0639\u0629\u060C \u0648\u062C\u0631\u0627\u0631 \u0628\u064A\u0637\u0644\u0639 \u0639\u0644\u064A\u0643 \u0645\u0646 \u063A\u064A\u0631 \u0645\u0627 \u062A\u062D\u0633.",scenery:"fields",landmarks:["canal","mosque"],ground:8364122,haze:13952707,startPhase:.15,traffic:{car:3,microbus:3,tuktuk:3,tractor:2,truck:1},hazards:["bump","pothole","cones"],lanes:2,density:1,speed:.75,lon:30.9,lat:27.6,unlock:3,objectives:[{kind:"distance",target:3e3,text:"\u0643\u0645\u0651\u0644 \u0663 \u0643\u064A\u0644\u0648"},{kind:"nearMiss",target:15,text:"\u0661\u0665 \u062D\u0631\u0641\u0646\u0629"},{kind:"clean",target:2e3,text:"\u0662 \u0643\u064A\u0644\u0648 \u0645\u0646 \u063A\u064A\u0631 \u062E\u0628\u0637\u0629"}]}];function HE(n){return lr.find(e=>e.id===n)??lr[0]}var ts=class n{status=Be("menu");mode=Be("endless");difficultyId=Be("busy");carId=Be("fiat128");routeId=Be("ring");difficulty=En(()=>Rc.find(e=>e.id===this.difficultyId())??Rc[1]);car=En(()=>$s.find(e=>e.id===this.carId())??$s[0]);route=En(()=>HE(this.routeId()));speed=Be(0);distance=Be(0);coins=Be(0);nearMisses=Be(0);lives=Be(3);maxLives=Be(3);nitro=Be(0);nitroActive=Be(!1);timeLeft=Be(n0);topSpeed=Be(0);cleanStreak=Be(0);bestClean=Be(0);dayPhase=Be(.04);level=Be(1);muted=Be(!1);offRoad=Be(!1);wheel=Be(0);braking=Be(!1);throttle=Be(!1);gear=En(()=>{let e=this.speed();return e<1?"N":e<25?"1":e<50?"2":e<85?"3":e<125?"4":"5"});quality=Be("high");score=En(()=>{let e=this.distance()+this.coins()*10+this.nearMisses()*50;return Math.round(e*this.difficulty().multiplier*(.8+this.route().speed*.2))});distanceKm=En(()=>(this.distance()/1e3).toFixed(2));objectives=En(()=>this.route().objectives.map(e=>tn(Rt({},e),{done:this.isMet(e),progress:this.progressOf(e)})));stars=En(()=>this.objectives().filter(e=>e.done).length);events=Be([]);eventId=0;isNight=En(()=>{let e=this.dayPhase();return e>.32&&e<.72});startRun(){let e=this.car();this.speed.set(0),this.distance.set(0),this.coins.set(0),this.nearMisses.set(0),this.lives.set(e.lives),this.maxLives.set(e.lives),this.nitro.set(0),this.nitroActive.set(!1),this.timeLeft.set(n0),this.topSpeed.set(0),this.cleanStreak.set(0),this.bestClean.set(0),this.level.set(1),this.offRoad.set(!1),this.dayPhase.set(this.route().startPhase),this.events.set([]),this.status.set("playing")}pause(){this.status()==="playing"&&this.status.set("paused")}resume(){this.status()==="paused"&&this.status.set("playing")}endRun(){this.status.set("over")}toMenu(){this.status.set("menu")}toMap(){this.status.set("map")}push(e,t,i){let r={id:++this.eventId,kind:e,text:t,delta:i};this.events.update(s=>[r,...s].slice(0,4)),setTimeout(()=>{this.events.update(s=>s.filter(o=>o.id!==r.id))},1800)}progressOf(e){switch(e.kind){case"distance":return this.distance();case"nearMiss":return this.nearMisses();case"coins":return this.coins();case"clean":return Math.max(this.bestClean(),this.cleanStreak());case"speed":return this.topSpeed()}}isMet(e){return this.progressOf(e)>=e.target}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var wd=class{constructor(e,t){this.ctx=e;this.out=e.createGain(),this.out.gain.value=.9;let i=e.createBiquadFilter();i.type="bandpass",i.frequency.value=1400,i.Q.value=.5,this.out.connect(i).connect(t)}ctx;bpm=104;lookahead=.12;next=0;step=0;timer=null;stopAt=null;out;scale=[164.8,174.6,207.7,220,246.9,261.6,311.1,329.6,349.2,415.3,440,493.9];leadNote=7;phrase=0;play(){this.stopAt=null,this.timer===null&&(this.next=this.ctx.currentTime+.05,this.timer=window.setInterval(()=>this.schedule(),40))}pauseSoon(){this.timer===null||this.stopAt!==null||(this.stopAt=this.ctx.currentTime+1.2)}schedule(){let e=60/this.bpm/4;for(;this.next<this.ctx.currentTime+this.lookahead;)this.playStep(this.step%32,this.next,e),this.next+=e,this.step++;this.stopAt!==null&&this.ctx.currentTime>this.stopAt&&(window.clearInterval(this.timer),this.timer=null,this.stopAt=null)}playStep(e,t,i){let r=e%16;if((r===0||r===6||r===8||r===14)&&this.kick(t),(r===4||r===12)&&this.clap(t),r===13&&e>=16&&this.clap(t,.5),r%2===1&&this.tek(t,r%4===3?1:.6),(r===0||r===8)&&this.bass(this.scale[0],t,i*3),(r===6||r===14)&&this.bass(this.scale[1],t,i*1.5),r===11&&this.bass(this.scale[2],t,i),e===0&&(this.phrase=(this.phrase+1)%4),r%2===0&&(this.phrase!==3||r<8)){let s=[1,1,-1,2,-1,-2,1,-1][e/2%8];this.leadNote=Math.max(3,Math.min(this.scale.length-1,this.leadNote+s)),this.lead(this.scale[this.leadNote],t,i*1.9,this.phrase===2)}}kick(e){let t=this.ctx.createOscillator();t.frequency.setValueAtTime(150,e),t.frequency.exponentialRampToValueAtTime(42,e+.12);let i=this.ctx.createGain();i.gain.setValueAtTime(.9,e),i.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(i).connect(this.out),t.start(e),t.stop(e+.25)}clap(e,t=1){for(let i=0;i<3;i++){let r=this.ctx.createOscillator();r.type="square",r.frequency.value=1800+i*400;let s=this.ctx.createGain();s.gain.setValueAtTime(.12*t,e+i*.012),s.gain.exponentialRampToValueAtTime(.001,e+i*.012+.07);let o=this.ctx.createBiquadFilter();o.type="bandpass",o.frequency.value=2200,r.connect(o).connect(s).connect(this.out),r.start(e+i*.012),r.stop(e+i*.012+.08)}}tek(e,t){let i=this.ctx.createOscillator();i.type="triangle",i.frequency.setValueAtTime(900,e),i.frequency.exponentialRampToValueAtTime(500,e+.05);let r=this.ctx.createGain();r.gain.setValueAtTime(.18*t,e),r.gain.exponentialRampToValueAtTime(.001,e+.06),i.connect(r).connect(this.out),i.start(e),i.stop(e+.07)}bass(e,t,i){let r=this.ctx.createOscillator();r.type="sawtooth",r.frequency.value=e/2;let s=this.ctx.createOscillator();s.type="square",s.frequency.value=e/4;let o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(900,t),o.frequency.exponentialRampToValueAtTime(180,t+i);let a=this.ctx.createGain();a.gain.setValueAtTime(.35,t),a.gain.setValueAtTime(.35,t+i*.7),a.gain.exponentialRampToValueAtTime(.001,t+i),r.connect(o),s.connect(o),o.connect(a).connect(this.out),r.start(t),s.start(t),r.stop(t+i),s.stop(t+i)}lead(e,t,i,r){let s=this.ctx.createOscillator();s.type="sawtooth",s.frequency.setValueAtTime(e*.94,t),s.frequency.exponentialRampToValueAtTime(e,t+.06);let o=this.ctx.createOscillator();o.type="square",o.frequency.value=e*1.005;let a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(.14,t+.02),a.gain.exponentialRampToValueAtTime(.001,t+i);let c=this.ctx.createBiquadFilter();if(c.type="lowpass",c.frequency.value=2600,r){let l=this.ctx.createOscillator();l.frequency.value=6;let u=this.ctx.createGain();u.gain.value=e*.02,l.connect(u).connect(s.frequency),l.start(t),l.stop(t+i)}s.connect(c),o.connect(c),c.connect(a).connect(this.out),s.start(t),o.start(t),s.stop(t+i),o.stop(t+i)}};var dA={engine:"sounds/engine.ogg",horn:"sounds/horn.ogg",radio:"sounds/radio.ogg"},Ko=class n{store=ue(ts);ctx=null;master=null;noiseBuffer=null;player=null;nitroOsc=null;nitroGain=null;voices=new Map;radio=null;radioGain=null;radioPan=null;samples={};engineSample=null;radioSample=null;lastHorn=0;unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=.55;let t=this.ctx.createDynamicsCompressor();t.threshold.value=-18,t.ratio.value=4,this.master.connect(t).connect(this.ctx.destination);let i=2;this.noiseBuffer=this.ctx.createBuffer(1,this.ctx.sampleRate*i,this.ctx.sampleRate);let r=this.noiseBuffer.getChannelData(0);for(let s=0;s<r.length;s++)r[s]=Math.random()*2-1;this.loadSamples()}startEngine(){if(!this.ctx||!this.master||this.player)return;this.player=this.voice("player",this.store.car().id==="microbus"?"microbus":this.store.car().id==="jeep"?"truck":"car");let e=this.ctx.createOscillator();e.type="triangle",e.frequency.value=180;let t=this.ctx.createGain();if(t.gain.value=0,e.connect(t).connect(this.master),e.start(),this.nitroOsc=e,this.nitroGain=t,this.samples.engine&&!this.engineSample){let i=this.ctx.createBufferSource();i.buffer=this.samples.engine,i.loop=!0,i.connect(this.player.gain),i.start(),this.engineSample=i}}engine(e,t,i){if(!this.ctx||!this.player||!this.nitroGain||!this.master)return;let r=this.ctx.currentTime,s=this.store.muted()||this.store.status()!=="playing";this.engineSample?(this.engineSample.playbackRate.setTargetAtTime(.6+e/160,r,.1),this.player.osc.frequency.setTargetAtTime(0,r,.1),this.player.gain.gain.setTargetAtTime(s?0:.35,r,.1)):this.drive(this.player,e,s?0:.16+e/900,0,r,!0),this.nitroGain.gain.setTargetAtTime(s||!t?0:.06,r,.05),this.nitroOsc&&this.nitroOsc.frequency.setTargetAtTime(160+e,r,.1);let o=new Set,a=null;i.slice(0,4).forEach((l,u)=>{let d=`${l.kind}-${u}`;o.add(d);let f=this.voices.get(d);(!f||f.kind!==l.kind)&&(f?.gain.disconnect(),f=this.voice(d,l.kind),this.voices.set(d,f));let h=Math.hypot(l.dx,l.dz),m=s?0:Math.max(0,.22-h/180);this.drive(f,l.speed,m,l.dx,r,!1),l.radio&&(!a||h<Math.hypot(a.dx,a.dz))&&(a=l)});for(let[l,u]of this.voices)o.has(l)||u.gain.gain.setTargetAtTime(0,r,.2);(!this.radioGain||!this.radioPan)&&(this.radioGain=this.ctx.createGain(),this.radioGain.gain.value=0,this.radioPan=this.ctx.createStereoPanner(),this.radioGain.connect(this.radioPan).connect(this.master));let c=a;if(c){let l=Math.hypot(c.dx,c.dz),u=s?0:Math.max(0,.5-l/70);if(this.radioGain.gain.setTargetAtTime(u,r,.15),this.radioPan.pan.setTargetAtTime(Math.max(-1,Math.min(1,c.dx/8)),r,.1),this.samples.radio){if(!this.radioSample){let d=this.ctx.createBufferSource();d.buffer=this.samples.radio,d.loop=!0,d.connect(this.radioGain),d.start(),this.radioSample=d}}else this.radio||(this.radio=new wd(this.ctx,this.radioGain)),this.radio.play()}else this.radioGain.gain.setTargetAtTime(0,r,.3),this.radio?.pauseSoon()}stopEngine(){if(!this.ctx)return;let e=this.ctx.currentTime;this.player?.gain.gain.setTargetAtTime(0,e,.05),this.nitroGain?.gain.setTargetAtTime(0,e,.05);for(let t of this.voices.values())t.gain.gain.setTargetAtTime(0,e,.05);this.radioGain?.gain.setTargetAtTime(0,e,.1),this.radio?.pauseSoon()}coin(){this.blip(880,1320,.09,"sine",.12)}nearMiss(){this.blip(520,760,.12,"triangle",.1)}nitroBurst(){this.blip(120,480,.35,"sawtooth",.12)}fine(){this.blip(440,220,.3,"square",.08)}horn(){let e=this.store.car().id;this.hornOf(e==="microbus"?"microbus":e==="jeep"?"truck":"car",0)}hornOf(e,t){if(!this.ctx||!this.master||this.store.muted())return;let i=this.ctx.currentTime;if(i-this.lastHorn<.15)return;if(this.lastHorn=i,this.samples.horn&&t===0){let a=this.ctx.createBufferSource();a.buffer=this.samples.horn,a.connect(this.master),a.start(i);return}let r=this.ctx.createStereoPanner();r.pan.value=Math.max(-1,Math.min(1,t/8));let s=this.ctx.createGain();s.gain.value=t===0?1:.6,s.connect(r).connect(this.master);let o=(a,c,l,u,d,f=0)=>{let h=this.ctx.createOscillator();h.type=c,h.frequency.setValueAtTime(a,i+l),f&&h.frequency.linearRampToValueAtTime(a+f,i+l+u);let m=this.ctx.createGain();m.gain.setValueAtTime(1e-4,i+l),m.gain.exponentialRampToValueAtTime(d,i+l+.015),m.gain.setValueAtTime(d,i+l+u-.03),m.gain.exponentialRampToValueAtTime(1e-4,i+l+u),h.connect(m).connect(s),h.start(i+l),h.stop(i+l+u+.02)};switch(e){case"truck":case"bus":o(146,"sawtooth",0,.9,.09),o(185,"sawtooth",0,.9,.07),o(110,"square",0,.9,.04);break;case"microbus":{[523,659,784,659,523,784].forEach((c,l)=>o(c,"square",l*.11,.1,.06));break}case"tuktuk":o(880,"square",0,.12,.05),o(880,"square",.16,.12,.05),o(1100,"square",.32,.22,.05);break;case"tractor":o(220,"square",0,.5,.05);break;default:o(392,"square",0,.38,.06),o(523,"square",0,.38,.05),o(394,"sawtooth",0,.38,.02);break}}crash(){if(!this.ctx||!this.master||!this.noiseBuffer||this.store.muted())return;let e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;let i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(1800,e),i.frequency.exponentialRampToValueAtTime(200,e+.4);let r=this.ctx.createGain();r.gain.setValueAtTime(.7,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.45),t.connect(i).connect(r).connect(this.master),t.start(e),t.stop(e+.5),this.blip(80,30,.3,"sine",.5);for(let s=0;s<5;s++)this.blip(2400+Math.random()*2e3,1800,.05,"triangle",.03)}bump(){this.blip(90,60,.18,"sine",.25)}gravel(e){if(!this.player)return;let t=this.ctx.currentTime;this.player.noiseGain.gain.setTargetAtTime(e?.12:this.noiseFor(this.player.kind),t,.1)}async loadSamples(){if(this.ctx)for(let[e,t]of Object.entries(dA))try{let i=await fetch(t);if(!i.ok||!(i.headers.get("content-type")??"").startsWith("audio"))continue;this.samples[e]=await this.ctx.decodeAudioData(await i.arrayBuffer())}catch{}}voice(e,t){let i=this.ctx,r=i.createOscillator();r.type=t==="tuktuk"?"square":"sawtooth";let s=i.createOscillator();s.type="triangle";let o=i.createBufferSource();o.buffer=this.noiseBuffer,o.loop=!0;let a=i.createGain();a.gain.value=this.noiseFor(t);let c=i.createBiquadFilter();c.type="lowpass",c.frequency.value=t==="tuktuk"?900:t==="car"||t==="player"?420:260,c.Q.value=1.2;let l=i.createGain();l.gain.value=0;let u=i.createStereoPanner();return r.connect(c),s.connect(c),o.connect(a).connect(c),c.connect(l).connect(u).connect(this.master),r.start(),s.start(),o.start(),{osc:r,sub:s,noise:o,noiseGain:a,filter:c,gain:l,pan:u,kind:t}}noiseFor(e){return e==="truck"||e==="bus"||e==="tractor"?.09:e==="microbus"?.06:e==="tuktuk"?.04:.025}drive(e,t,i,r,s,o){let a=[0,25,50,85,125,400],c=0;for(;c<a.length-2&&t>a[c+1];)c++;let u=.25+(t-a[c])/(a[c+1]-a[c])*.75,d,f=0;switch(e.kind){case"tuktuk":d=70+u*60,f=18+u*20;break;case"truck":case"bus":case"tractor":d=32+u*28,f=8+u*6;break;case"microbus":d=42+u*40,f=10+u*8;break;default:d=48+u*70;break}e.osc.frequency.setTargetAtTime(d,s,o?.06:.12),e.sub.frequency.setTargetAtTime(d/2,s,.1),e.filter.frequency.setTargetAtTime((e.kind==="tuktuk"?600:220)+u*500,s,.1);let h=f?1-.25*(.5+.5*Math.sin(s*f*Math.PI*2)):1;e.gain.gain.setTargetAtTime(i*h,s,.04),e.pan.pan.setTargetAtTime(Math.max(-1,Math.min(1,r/8)),s,.1)}blip(e,t,i,r,s){if(!this.ctx||!this.master||this.store.muted())return;let o=this.ctx.currentTime,a=this.ctx.createOscillator();a.type=r,a.frequency.setValueAtTime(e,o),a.frequency.exponentialRampToValueAtTime(t,o+i);let c=this.ctx.createGain();c.gain.setValueAtTime(s,o),c.gain.exponentialRampToValueAtTime(1e-4,o+i),a.connect(c).connect(this.master),a.start(o),a.stop(o+i+.02)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var mb=0,F0=1,gb=2;var yl=1,Cf=2,Ca=3,hs=0,fn=1,Nn=2,yi=0,Da=1,xl=2,k0=3,U0=4,vb=5;var ao=100,yb=101,xb=102,_b=103,Eb=104,bb=200,Mb=201,Sb=202,wb=203,B0=204,H0=205,Tb=206,Cb=207,Db=208,Ab=209,Ib=210,Rb=211,Nb=212,Pb=213,Lb=214,Qd=0,ef=1,tf=2,va=3,nf=4,rf=5,sf=6,of=7,Df=0,Ob=1,Fb=2,Yi=0,_l=1,El=2,bl=3,co=4,Ml=5,Sl=6,wl=7;var w0=300,ps=301,lo=302,Af=303,If=304,Tl=306,Wn=1e3,dr=1001,af=1002,Jt=1003,kb=1004;var Cl=1005;var dn=1006,Rf=1007;var ms=1008;var Qn=1009,V0=1010,z0=1011,Aa=1012,Nf=1013,Zi=1014,xi=1015,on=1016,Pf=1017,Lf=1018,Ia=1020,G0=35902,W0=35899,j0=1021,q0=1022,_i=1023,fr=1026,gs=1027,Of=1028,Ff=1029,vs=1030,kf=1031;var Uf=1033,Dl=33776,Al=33777,Il=33778,Rl=33779,Bf=35840,Hf=35841,Vf=35842,zf=35843,Gf=36196,Wf=37492,jf=37496,qf=37488,Xf=37489,Nl=37490,Yf=37491,Zf=37808,$f=37809,Kf=37810,Jf=37811,Qf=37812,eh=37813,th=37814,nh=37815,ih=37816,rh=37817,sh=37818,oh=37819,ah=37820,ch=37821,lh=36492,uh=36494,dh=36495,fh=36283,hh=36284,Pl=36285,ph=36286;var Gc=2300,cf=2301,Kd=2302,T0=2303,C0=2400,D0=2401,A0=2402;var Ub=3200;var Ll=0,Bb=1,Ur="",zt="srgb",Wc="srgb-linear",jc="linear",gt="srgb";var Jd=7680;var Hb=519,Vb=512,zb=513,Gb=514,mh=515,Wb=516,jb=517,gh=518,qb=519,X0=35044;var Y0="300 es",ji=2e3,ya=2001;function fA(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function hA(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function qc(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xb(){let n=qc("canvas");return n.style.display="block",n}var VE={},xa=null;function Xc(...n){let e="THREE."+n.shift();xa?xa("log",e,...n):console.log(e,...n)}function Yb(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ue(...n){n=Yb(n);let e="THREE."+n.shift();if(xa)xa("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function He(...n){n=Yb(n);let e="THREE."+n.shift();if(xa)xa("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function to(...n){let e=n.join(" ");e in VE||(VE[e]=!0,Ue(...n))}function Zb(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var $b={[Qd]:ef,[tf]:sf,[nf]:of,[va]:rf,[ef]:Qd,[sf]:tf,[of]:nf,[rf]:va},hr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zE=1234567,Vc=Math.PI/180,no=180/Math.PI;function Or(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(In[n&255]+In[n>>8&255]+In[n>>16&255]+In[n>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[t&63|128]+In[t>>8&255]+"-"+In[t>>16&255]+In[t>>24&255]+In[i&255]+In[i>>8&255]+In[i>>16&255]+In[i>>24&255]).toLowerCase()}function it(n,e,t){return Math.max(e,Math.min(t,n))}function Z0(n,e){return(n%e+e)%e}function pA(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function mA(n,e,t){return n!==e?(t-n)/(e-n):0}function zc(n,e,t){return(1-t)*n+t*e}function gA(n,e,t,i){return zc(n,e,1-Math.exp(-t*i))}function vA(n,e=1){return e-Math.abs(Z0(n,e*2)-e)}function yA(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function xA(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function _A(n,e){return n+Math.floor(Math.random()*(e-n+1))}function EA(n,e){return n+Math.random()*(e-n)}function bA(n){return n*(.5-Math.random())}function MA(n){n!==void 0&&(zE=n);let e=zE+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function SA(n){return n*Vc}function wA(n){return n*no}function TA(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function CA(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function DA(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function AA(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),h=s((i-e)/2),m=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*m,c*h,a*l);break;case"YXY":n.set(c*h,a*u,c*m,a*l);break;case"ZYZ":n.set(c*m,c*h,a*u,a*l);break;default:Ue("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Wi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function wt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var uo={DEG2RAD:Vc,RAD2DEG:no,generateUUID:Or,clamp:it,euclideanModulo:Z0,mapLinear:pA,inverseLerp:mA,lerp:zc,damp:gA,pingpong:vA,smoothstep:yA,smootherstep:xA,randInt:_A,randFloat:EA,randFloatSpread:bA,seededRandom:MA,degToRad:SA,radToDeg:wA,isPowerOfTwo:TA,ceilPowerOfTwo:CA,floorPowerOfTwo:DA,setQuaternionFromProperEuler:AA,normalize:wt,denormalize:Wi},Ee=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},pr=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],m=s[o+2],_=s[o+3];if(d!==_||c!==f||l!==h||u!==m){let g=c*f+l*h+u*m+d*_;g<0&&(f=-f,h=-h,m=-m,_=-_,g=-g);let p=1-a;if(g<.9995){let b=Math.acos(g),D=Math.sin(b);p=Math.sin(p*b)/D,a=Math.sin(a*b)/D,c=c*p+f*a,l=l*p+h*a,u=u*p+m*a,d=d*p+_*a}else{c=c*p+f*a,l=l*p+h*a,u=u*p+m*a,d=d*p+_*a;let b=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=b,l*=b,u*=b,d*=b}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],m=s[o+3];return e[t]=a*m+u*d+c*h-l*f,e[t+1]=c*m+u*f+l*d-a*h,e[t+2]=l*m+u*h+a*f-c*d,e[t+3]=u*m-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d-f*h*m;break;case"YXZ":this._x=f*u*d+l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d+f*h*m;break;case"ZXY":this._x=f*u*d-l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d-f*h*m;break;case"ZYX":this._x=f*u*d-l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d+f*h*m;break;case"YZX":this._x=f*u*d+l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d-f*h*m;break;case"XZY":this._x=f*u*d-l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d+f*h*m;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(GE.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(GE.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return i0.copy(this).projectOnVector(e),this.sub(i0)}reflect(e){return this.sub(i0.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},i0=new N,GE=new pr,je=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],m=i[8],_=r[0],g=r[3],p=r[6],b=r[1],D=r[4],E=r[7],M=r[2],S=r[5],C=r[8];return s[0]=o*_+a*b+c*M,s[3]=o*g+a*D+c*S,s[6]=o*p+a*E+c*C,s[1]=l*_+u*b+d*M,s[4]=l*g+u*D+d*S,s[7]=l*p+u*E+d*C,s[2]=f*_+h*b+m*M,s[5]=f*g+h*D+m*S,s[8]=f*p+h*E+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,m=t*d+i*f+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=h*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return to("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(r0.makeScale(e,t)),this}rotate(e){return to("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(r0.makeRotation(-e)),this}translate(e,t){return to("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(r0.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},r0=new je,WE=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jE=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function IA(){let n={enabled:!0,workingColorSpace:Wc,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===gt&&(r.r=Fr(r.r),r.g=Fr(r.g),r.b=Fr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===gt&&(r.r=ga(r.r),r.g=ga(r.g),r.b=ga(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ur?jc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Wc]:{primaries:e,whitePoint:i,transfer:jc,toXYZ:WE,fromXYZ:jE,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:WE,fromXYZ:jE,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),n}var Qe=IA();function Fr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ga(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Jo,lf=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Jo===void 0&&(Jo=qc("canvas")),Jo.width=e.width,Jo.height=e.height;let r=Jo.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Jo}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=qc("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Fr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Fr(t[i]/255)*255):t[i]=Fr(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},RA=0,_a=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:RA++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(s0(r[o].image)):s.push(s0(r[o]))}else s=s0(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function s0(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}var NA=0,o0=new N,ci=(()=>{class n extends hr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=dr,s=dr,o=dn,a=ms,c=_i,l=Qn,u=n.DEFAULT_ANISOTROPY,d=Ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:NA++}),this.uuid=Or(),this.name="",this.source=new _a(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(o0).x}get height(){return this.source.getSize(o0).y}get depth(){return this.source.getSize(o0).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){Ue(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){Ue(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==w0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wn:t.x=t.x-Math.floor(t.x);break;case dr:t.x=t.x<0?0:1;break;case af:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wn:t.y=t.y-Math.floor(t.y);break;case dr:t.y=t.y<0?0:1;break;case af:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=w0,n.DEFAULT_ANISOTROPY=1,n})(),Ht=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let D=(l+1)/2,E=(h+1)/2,M=(p+1)/2,S=(u+f)/4,C=(d+_)/4,y=(m+g)/4;return D>E&&D>M?D<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(D),r=S/i,s=C/i):E>M?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=S/r,s=y/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=C/s,r=y/s),this.set(i,r,s,t),this}let b=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(d-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},uf=class extends hr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new ci(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new _a(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gt=class extends uf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Yc=class extends ci{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var df=class extends ci{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var At=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,m,_,g)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Qo.setFromMatrixColumn(e,0).length(),s=1/Qo.setFromMatrixColumn(e,1).length(),o=1/Qo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,m=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+m*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=m+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,m=l*u,_=l*d;t[0]=f+_*a,t[4]=m*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-m,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,m=l*u,_=l*d;t[0]=f-_*a,t[4]=-o*d,t[8]=m+h*a,t[1]=h+m*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,m=a*u,_=a*d;t[0]=c*u,t[4]=m*l-h,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=h*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,m=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=m*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+m,t[10]=f-_*d}else if(e.order==="XZY"){let f=o*c,h=o*l,m=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=o*u,t[9]=h*d-m,t[2]=m*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(PA,e,LA)}lookAt(e,t,i){let r=this.elements;return ri.subVectors(e,t),ri.lengthSq()===0&&(ri.z=1),ri.normalize(),ns.crossVectors(i,ri),ns.lengthSq()===0&&(Math.abs(i.z)===1?ri.x+=1e-4:ri.z+=1e-4,ri.normalize(),ns.crossVectors(i,ri)),ns.normalize(),Td.crossVectors(ri,ns),r[0]=ns.x,r[4]=Td.x,r[8]=ri.x,r[1]=ns.y,r[5]=Td.y,r[9]=ri.y,r[2]=ns.z,r[6]=Td.z,r[10]=ri.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],m=i[2],_=i[6],g=i[10],p=i[14],b=i[3],D=i[7],E=i[11],M=i[15],S=r[0],C=r[4],y=r[8],w=r[12],A=r[1],L=r[5],F=r[9],z=r[13],O=r[2],H=r[6],K=r[10],j=r[14],ae=r[3],X=r[7],ie=r[11],se=r[15];return s[0]=o*S+a*A+c*O+l*ae,s[4]=o*C+a*L+c*H+l*X,s[8]=o*y+a*F+c*K+l*ie,s[12]=o*w+a*z+c*j+l*se,s[1]=u*S+d*A+f*O+h*ae,s[5]=u*C+d*L+f*H+h*X,s[9]=u*y+d*F+f*K+h*ie,s[13]=u*w+d*z+f*j+h*se,s[2]=m*S+_*A+g*O+p*ae,s[6]=m*C+_*L+g*H+p*X,s[10]=m*y+_*F+g*K+p*ie,s[14]=m*w+_*z+g*j+p*se,s[3]=b*S+D*A+E*O+M*ae,s[7]=b*C+D*L+E*H+M*X,s[11]=b*y+D*F+E*K+M*ie,s[15]=b*w+D*z+E*j+M*se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],m=e[3],_=e[7],g=e[11],p=e[15],b=c*h-l*f,D=a*h-l*d,E=a*f-c*d,M=o*h-l*u,S=o*f-c*u,C=o*d-a*u;return t*(_*b-g*D+p*E)-i*(m*b-g*M+p*S)+r*(m*D-_*M+p*C)-s*(m*E-_*S+g*C)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],u=e[10];return t*(o*u-a*l)-i*(s*u-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],m=e[12],_=e[13],g=e[14],p=e[15],b=t*a-i*o,D=t*c-r*o,E=t*l-s*o,M=i*c-r*a,S=i*l-s*a,C=r*l-s*c,y=u*_-d*m,w=u*g-f*m,A=u*p-h*m,L=d*g-f*_,F=d*p-h*_,z=f*p-h*g,O=b*z-D*F+E*L+M*A-S*w+C*y;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/O;return e[0]=(a*z-c*F+l*L)*H,e[1]=(r*F-i*z-s*L)*H,e[2]=(_*C-g*S+p*M)*H,e[3]=(f*S-d*C-h*M)*H,e[4]=(c*A-o*z-l*w)*H,e[5]=(t*z-r*A+s*w)*H,e[6]=(g*E-m*C-p*D)*H,e[7]=(u*C-f*E+h*D)*H,e[8]=(o*F-a*A+l*y)*H,e[9]=(i*A-t*F-s*y)*H,e[10]=(m*S-_*E+p*b)*H,e[11]=(d*E-u*S-h*b)*H,e[12]=(a*w-o*L-c*y)*H,e[13]=(t*L-i*w+r*y)*H,e[14]=(_*D-m*M-g*b)*H,e[15]=(u*M-d*D+f*b)*H,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,m=s*d,_=o*u,g=o*d,p=a*d,b=c*l,D=c*u,E=c*d,M=i.x,S=i.y,C=i.z;return r[0]=(1-(_+p))*M,r[1]=(h+E)*M,r[2]=(m-D)*M,r[3]=0,r[4]=(h-E)*S,r[5]=(1-(f+p))*S,r[6]=(g+b)*S,r[7]=0,r[8]=(m+D)*C,r[9]=(g-b)*C,r[10]=(1-(f+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Qo.set(r[0],r[1],r[2]).length(),a=Qo.set(r[4],r[5],r[6]).length(),c=Qo.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Hi.copy(this);let l=1/o,u=1/a,d=1/c;return Hi.elements[0]*=l,Hi.elements[1]*=l,Hi.elements[2]*=l,Hi.elements[4]*=u,Hi.elements[5]*=u,Hi.elements[6]*=u,Hi.elements[8]*=d,Hi.elements[9]*=d,Hi.elements[10]*=d,t.setFromRotationMatrix(Hi),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=ji,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),m,_;if(c)m=s/(o-s),_=o*s/(o-s);else if(a===ji)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===ya)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ji,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),m,_;if(c)m=1/(o-s),_=o/(o-s);else if(a===ji)m=-2/(o-s),_=-(o+s)/(o-s);else if(a===ya)m=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Qo=new N,Hi=new At,PA=new N(0,0,0),LA=new N(1,1,1),ns=new N,Td=new N,ri=new N,qE=new At,XE=new pr,io=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],m=s[10];switch(i){case"XYZ":this._y=Math.asin(it(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-it(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return qE.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qE,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return XE.setFromEuler(this),this.setFromQuaternion(XE,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Zc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},OA=0,YE=new N,ea=new pr,Ar=new At,Cd=new N,Nc=new N,FA=new N,kA=new pr,ZE=new N(1,0,0),$E=new N(0,1,0),KE=new N(0,0,1),JE={type:"added"},UA={type:"removed"},ta={type:"childadded",child:null},a0={type:"childremoved",child:null},Mn=(()=>{class n extends hr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:OA++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new N,i=new io,r=new pr,s=new N(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new At},normalMatrix:{value:new je}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return ea.setFromAxisAngle(t,i),this.quaternion.multiply(ea),this}rotateOnWorldAxis(t,i){return ea.setFromAxisAngle(t,i),this.quaternion.premultiply(ea),this}rotateX(t){return this.rotateOnAxis(ZE,t)}rotateY(t){return this.rotateOnAxis($E,t)}rotateZ(t){return this.rotateOnAxis(KE,t)}translateOnAxis(t,i){return YE.copy(t).applyQuaternion(this.quaternion),this.position.add(YE.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(ZE,t)}translateY(t){return this.translateOnAxis($E,t)}translateZ(t){return this.translateOnAxis(KE,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ar.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Cd.copy(t):Cd.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),Nc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ar.lookAt(Nc,Cd,this.up):Ar.lookAt(Cd,Nc,this.up),this.quaternion.setFromRotationMatrix(Ar),s&&(Ar.extractRotation(s.matrixWorld),ea.setFromRotationMatrix(Ar),this.quaternion.premultiply(ea.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(He("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(JE),ta.child=t,this.dispatchEvent(ta),ta.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(UA),a0.child=t,this.dispatchEvent(a0),a0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ar.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ar.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ar),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(JE),ta.child=t,this.dispatchEvent(ta),ta.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nc,t,FA),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nc,kA,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i,r=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){let o=this.children;for(let a=0,c=o.length;a<c;a++)o[a].updateWorldMatrix(!1,!0,r)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>tn(Rt({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>Rt({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),_=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),m.length>0&&(r.animations=m),_.length>0&&(r.nodes=_)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}return n.DEFAULT_UP=new N(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),st=class extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}},BA={type:"move"},Ea=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new st,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new st,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new st,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,i),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,m=.005;l.inputState.pinching&&f>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(BA)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new st;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Kb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Dd={h:0,s:0,l:0};function c0(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var we=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=Z0(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=c0(o,s,e+1/3),this.g=c0(o,s,e),this.b=c0(o,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=zt){function i(s){s!==void 0&&parseFloat(s)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let i=Kb[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}copyLinearToSRGB(e){return this.r=ga(e.r),this.g=ga(e.g),this.b=ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Qe.workingToColorSpace(Rn.copy(this),e),Math.round(it(Rn.r*255,0,255))*65536+Math.round(it(Rn.g*255,0,255))*256+Math.round(it(Rn.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Rn.copy(this),t);let i=Rn.r,r=Rn.g,s=Rn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=zt){Qe.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,i=Rn.g,r=Rn.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(Dd);let i=zc(is.h,Dd.h,t),r=zc(is.s,Dd.s,t),s=zc(is.l,Dd.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new we;we.NAMES=Kb;var $c=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ro=class extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new io,this.environmentIntensity=1,this.environmentRotation=new io,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Vi=new N,Ir=new N,l0=new N,Rr=new N,na=new N,ia=new N,QE=new N,u0=new N,d0=new N,f0=new N,h0=new Ht,p0=new Ht,m0=new Ht,Lr=class n{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Vi.subVectors(e,t),r.cross(Vi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Vi.subVectors(r,t),Ir.subVectors(i,t),l0.subVectors(e,t);let o=Vi.dot(Vi),a=Vi.dot(Ir),c=Vi.dot(l0),l=Ir.dot(Ir),u=Ir.dot(l0),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,m=(o*u-a*c)*f;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Rr)===null?!1:Rr.x>=0&&Rr.y>=0&&Rr.x+Rr.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Rr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Rr.x),c.addScaledVector(o,Rr.y),c.addScaledVector(a,Rr.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return h0.setScalar(0),p0.setScalar(0),m0.setScalar(0),h0.fromBufferAttribute(e,t),p0.fromBufferAttribute(e,i),m0.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(h0,s.x),o.addScaledVector(p0,s.y),o.addScaledVector(m0,s.z),o}static isFrontFacing(e,t,i,r){return Vi.subVectors(i,t),Ir.subVectors(e,t),Vi.cross(Ir).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vi.subVectors(this.c,this.b),Ir.subVectors(this.a,this.b),Vi.cross(Ir).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;na.subVectors(r,i),ia.subVectors(s,i),u0.subVectors(e,i);let c=na.dot(u0),l=ia.dot(u0);if(c<=0&&l<=0)return t.copy(i);d0.subVectors(e,r);let u=na.dot(d0),d=ia.dot(d0);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(na,o);f0.subVectors(e,s);let h=na.dot(f0),m=ia.dot(f0);if(m>=0&&h<=m)return t.copy(s);let _=h*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(i).addScaledVector(ia,a);let g=u*m-h*d;if(g<=0&&d-u>=0&&h-m>=0)return QE.subVectors(s,r),a=(d-u)/(d-u+(h-m)),t.copy(r).addScaledVector(QE,a);let p=1/(g+_+f);return o=_*p,a=f*p,t.copy(i).addScaledVector(na,o).addScaledVector(ia,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},mr=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(zi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(zi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=zi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,zi):zi.fromBufferAttribute(s,o),zi.applyMatrix4(e.matrixWorld),this.expandByPoint(zi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ad.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ad.copy(i.boundingBox)),Ad.applyMatrix4(e.matrixWorld),this.union(Ad)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zi),zi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pc),Id.subVectors(this.max,Pc),ra.subVectors(e.a,Pc),sa.subVectors(e.b,Pc),oa.subVectors(e.c,Pc),rs.subVectors(sa,ra),ss.subVectors(oa,sa),Ks.subVectors(ra,oa);let t=[0,-rs.z,rs.y,0,-ss.z,ss.y,0,-Ks.z,Ks.y,rs.z,0,-rs.x,ss.z,0,-ss.x,Ks.z,0,-Ks.x,-rs.y,rs.x,0,-ss.y,ss.x,0,-Ks.y,Ks.x,0];return!g0(t,ra,sa,oa,Id)||(t=[1,0,0,0,1,0,0,0,1],!g0(t,ra,sa,oa,Id))?!1:(Rd.crossVectors(rs,ss),t=[Rd.x,Rd.y,Rd.z],g0(t,ra,sa,oa,Id))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Nr=[new N,new N,new N,new N,new N,new N,new N,new N],zi=new N,Ad=new mr,ra=new N,sa=new N,oa=new N,rs=new N,ss=new N,Ks=new N,Pc=new N,Id=new N,Rd=new N,Js=new N;function g0(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Js.fromArray(n,s);let a=r.x*Math.abs(Js.x)+r.y*Math.abs(Js.y)+r.z*Math.abs(Js.z),c=e.dot(Js),l=t.dot(Js),u=i.dot(Js);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var rn=new N,Nd=new Ee,HA=0,bn=class extends hr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:HA++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=X0,this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Nd.fromBufferAttribute(this,t),Nd.applyMatrix3(e),this.setXY(t,Nd.x,Nd.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix3(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),r=wt(r,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Kc=class extends bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Jc=class extends bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var vt=class extends bn{constructor(e,t,i){super(new Float32Array(e),t,i)}},VA=new mr,Lc=new N,v0=new N,kr=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):VA.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lc.subVectors(e,this.center);let t=Lc.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Lc,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(v0.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lc.copy(e.center).add(v0)),this.expandByPoint(Lc.copy(e.center).sub(v0))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},zA=0,vi=new At,y0=new Mn,aa=new N,si=new mr,Oc=new mr,vn=new N,Wt=class n extends hr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zA++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fA(e)?Jc:Kc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vi.makeRotationFromQuaternion(e),this.applyMatrix4(vi),this}rotateX(e){return vi.makeRotationX(e),this.applyMatrix4(vi),this}rotateY(e){return vi.makeRotationY(e),this.applyMatrix4(vi),this}rotateZ(e){return vi.makeRotationZ(e),this.applyMatrix4(vi),this}translate(e,t,i){return vi.makeTranslation(e,t,i),this.applyMatrix4(vi),this}scale(e,t,i){return vi.makeScale(e,t,i),this.applyMatrix4(vi),this}lookAt(e){return y0.lookAt(e),y0.updateMatrix(),this.applyMatrix4(y0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(aa).negate(),this.translate(aa.x,aa.y,aa.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new vt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];si.setFromBufferAttribute(s),this.morphTargetsRelative?(vn.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(vn),vn.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(vn)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(si.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Oc.setFromBufferAttribute(a),this.morphTargetsRelative?(vn.addVectors(si.min,Oc.min),si.expandByPoint(vn),vn.addVectors(si.max,Oc.max),si.expandByPoint(vn)):(si.expandByPoint(Oc.min),si.expandByPoint(Oc.max))}si.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)vn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(vn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)vn.fromBufferAttribute(a,l),c&&(aa.fromBufferAttribute(e,l),vn.add(aa)),r=Math.max(r,i.distanceToSquared(vn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new bn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let y=0;y<i.count;y++)a[y]=new N,c[y]=new N;let l=new N,u=new N,d=new N,f=new Ee,h=new Ee,m=new Ee,_=new N,g=new N;function p(y,w,A){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,A),f.fromBufferAttribute(s,y),h.fromBufferAttribute(s,w),m.fromBufferAttribute(s,A),u.sub(l),d.sub(l),h.sub(f),m.sub(f);let L=1/(h.x*m.y-m.x*h.y);isFinite(L)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(L),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(L),a[y].add(_),a[w].add(_),a[A].add(_),c[y].add(g),c[w].add(g),c[A].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let y=0,w=b.length;y<w;++y){let A=b[y],L=A.start,F=A.count;for(let z=L,O=L+F;z<O;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let D=new N,E=new N,M=new N,S=new N;function C(y){M.fromBufferAttribute(r,y),S.copy(M);let w=a[y];D.copy(w),D.sub(M.multiplyScalar(M.dot(w))).normalize(),E.crossVectors(S,w);let L=E.dot(c[y])<0?-1:1;o.setXYZW(y,D.x,D.y,D.z,L)}for(let y=0,w=b.length;y<w;++y){let A=b[y],L=A.start,F=A.count;for(let z=L,O=L+F;z<O;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new N,s=new N,o=new N,a=new N,c=new N,l=new N,u=new N,d=new N;if(e)for(let f=0,h=e.count;f<h;f+=3){let m=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)vn.fromBufferAttribute(e,t),vn.normalize(),e.setXYZ(t,vn.x,vn.y,vn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*u;for(let p=0;p<u;p++)f[m++]=l[h++]}return new bn(f,u,d)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ff=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=X0,this.updateRanges=[],this.version=0,this.uuid=Or()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Or()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Or()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Gn=new N,Qc=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix4(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gn.fromBufferAttribute(this,t),Gn.applyNormalMatrix(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gn.fromBufferAttribute(this,t),Gn.transformDirection(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),r=wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),r=wt(r,this.array),s=wt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Xc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new bn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Xc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},x0=new N,GA=new N,WA=new je,Gi=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=x0.subVectors(i,t).cross(GA.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(x0),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||WA.getNormalMatrix(e),r=this.coplanarPoint(x0).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},jA=0,qi=class extends hr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jA++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Da,this.side=hs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=B0,this.blendDst=H0,this.blendEquation=ao,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=va,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hb,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jd,this.stencilZFail=Jd,this.stencilZPass=Jd,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Gi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ee().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ee().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ba=class extends qi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ca,Fc=new N,la=new N,ua=new N,da=new Ee,kc=new Ee,Jb=new At,Pd=new N,Uc=new N,Ld=new N,eb=new Ee,_0=new Ee,tb=new Ee,el=class extends Mn{constructor(e=new ba){if(super(),this.isSprite=!0,this.type="Sprite",ca===void 0){ca=new Wt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ff(t,5);ca.setIndex([0,1,2,0,2,3]),ca.setAttribute("position",new Qc(i,3,0,!1)),ca.setAttribute("uv",new Qc(i,2,3,!1))}this.geometry=ca,this.material=e,this.center=new Ee(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&He('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),la.setFromMatrixScale(this.matrixWorld),Jb.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ua.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&la.multiplyScalar(-ua.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;Od(Pd.set(-.5,-.5,0),ua,o,la,r,s),Od(Uc.set(.5,-.5,0),ua,o,la,r,s),Od(Ld.set(.5,.5,0),ua,o,la,r,s),eb.set(0,0),_0.set(1,0),tb.set(1,1);let a=e.ray.intersectTriangle(Pd,Uc,Ld,!1,Fc);if(a===null&&(Od(Uc.set(-.5,.5,0),ua,o,la,r,s),_0.set(0,1),a=e.ray.intersectTriangle(Pd,Ld,Uc,!1,Fc),a===null))return;let c=e.ray.origin.distanceTo(Fc);c<e.near||c>e.far||t.push({distance:c,point:Fc.clone(),uv:Lr.getInterpolation(Fc,Pd,Uc,Ld,eb,_0,tb,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Od(n,e,t,i,r,s){da.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(kc.x=s*da.x-r*da.y,kc.y=r*da.x+s*da.y):kc.copy(da),n.copy(e),n.x+=kc.x,n.y+=kc.y,n.applyMatrix4(Jb)}var Pr=new N,E0=new N,Fd=new N,kd=new N,tl=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pr.copy(this.origin).addScaledVector(this.direction,t),Pr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){E0.copy(e).add(t).multiplyScalar(.5),Fd.copy(t).sub(e).normalize(),kd.copy(this.origin).sub(E0);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Fd),a=kd.dot(this.direction),c=-kd.dot(Fd),l=kd.lengthSq(),u=Math.abs(1-o*o),d,f,h,m;if(u>0)if(d=o*c-a,f=o*a-c,m=s*u,d>=0)if(f>=-m)if(f<=m){let _=1/u;d*=_,f*=_,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-m?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=m?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(E0).addScaledVector(Fd,f),h}intersectSphere(e,t){if(e.radius<0)return null;Pr.subVectors(e.center,this.origin);let i=Pr.dot(this.direction),r=Pr.dot(Pr)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Pr)!==null}intersectTriangle(e,t,i,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,d=e.x-o.x,f=e.y-o.y,h=e.z-o.z,m=t.x-o.x,_=t.y-o.y,g=t.z-o.z,p=i.x-o.x,b=i.y-o.y,D=i.z-o.z,E=Math.abs(c),M=Math.abs(l),S=Math.abs(u),C,y,w,A,L,F,z,O,H,K,j,ae;if(E>=M&&E>=S?(w=c,F=d,H=m,ae=p,c>=0?(C=l,y=u,A=f,L=h,z=_,O=g,K=b,j=D):(C=u,y=l,A=h,L=f,z=g,O=_,K=D,j=b)):M>=S?(w=l,F=f,H=_,ae=b,l>=0?(C=u,y=c,A=h,L=d,z=g,O=m,K=D,j=p):(C=c,y=u,A=d,L=h,z=m,O=g,K=p,j=D)):(w=u,F=h,H=g,ae=D,u>=0?(C=c,y=l,A=d,L=f,z=m,O=_,K=p,j=b):(C=l,y=c,A=f,L=d,z=_,O=m,K=b,j=p)),w===0)return null;let X=C/w,ie=y/w,se=1/w,Oe=A-X*F,Pe=L-ie*F,Pt=z-X*H,at=O-ie*H,yt=K-X*ae,Y=j-ie*ae,ne=yt*at-Y*Pt,Te=Oe*Y-Pe*yt,qe=Pt*Pe-at*Oe;if(r){if(ne<0||Te<0||qe<0)return null}else if((ne<0||Te<0||qe<0)&&(ne>0||Te>0||qe>0))return null;let Me=ne+Te+qe;if(Me===0)return null;let Je=se*(ne*F+Te*H+qe*ae);return(Me>0?Je<0:Je>0)?null:this.at(Je/Me,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gr=class extends qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new io,this.combine=Df,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},nb=new At,Qs=new tl,Ud=new kr,ib=new N,Bd=new N,Hd=new N,Vd=new N,b0=new N,zd=new N,rb=new N,Gd=new N,te=class extends Mn{constructor(e=new Wt,t=new gr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){zd.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(b0.fromBufferAttribute(d,e),o?zd.addScaledVector(b0,u):zd.addScaledVector(b0.sub(t),u))}t.add(zd)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ud.copy(i.boundingSphere),Ud.applyMatrix4(s),Qs.copy(e.ray).recast(e.near),!(Ud.containsPoint(Qs.origin)===!1&&(Qs.intersectSphere(Ud,ib)===null||Qs.origin.distanceToSquared(ib)>(e.far-e.near)**2))&&(nb.copy(s).invert(),Qs.copy(e.ray).applyMatrix4(nb),!(i.boundingBox!==null&&Qs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qs)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=o[g.materialIndex],b=Math.max(g.start,h.start),D=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let E=b,M=D;E<M;E+=3){let S=a.getX(E),C=a.getX(E+1),y=a.getX(E+2);r=Wd(this,p,e,i,l,u,d,S,C,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){let b=a.getX(g),D=a.getX(g+1),E=a.getX(g+2);r=Wd(this,o,e,i,l,u,d,b,D,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=o[g.materialIndex],b=Math.max(g.start,h.start),D=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let E=b,M=D;E<M;E+=3){let S=E,C=E+1,y=E+2;r=Wd(this,p,e,i,l,u,d,S,C,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){let b=g,D=g+1,E=g+2;r=Wd(this,o,e,i,l,u,d,b,D,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function qA(n,e,t,i,r,s,o,a){let c;if(e.side===fn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===hs,a),c===null)return null;Gd.copy(a),Gd.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Gd);return l<t.near||l>t.far?null:{distance:l,point:Gd.clone(),object:n}}function Wd(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Bd),n.getVertexPosition(c,Hd),n.getVertexPosition(l,Vd);let u=qA(n,e,t,i,Bd,Hd,Vd,rb);if(u){let d=new N;Lr.getBarycoord(rb,Bd,Hd,Vd,d),r&&(u.uv=Lr.getInterpolatedAttribute(r,a,c,l,d,new Ee)),s&&(u.uv1=Lr.getInterpolatedAttribute(s,a,c,l,d,new Ee)),o&&(u.normal=Lr.getInterpolatedAttribute(o,a,c,l,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new N,materialIndex:0};Lr.getNormal(Bd,Hd,Vd,f.normal),u.face=f,u.barycoord=d}return u}var nl=class extends ci{constructor(e=null,t=1,i=1,r,s,o,a,c,l=Jt,u=Jt,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var il=class extends bn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fa=new At,sb=new At,jd=[],ob=new mr,XA=new At,Bc=new te,Hc=new kr,rl=class extends te{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new il(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,XA)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new mr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fa),ob.copy(e.boundingBox).applyMatrix4(fa),this.boundingBox.union(ob)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new kr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fa),Hc.copy(e.boundingSphere).applyMatrix4(fa),this.boundingSphere.union(Hc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Bc.geometry=this.geometry,Bc.material=this.material,Bc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hc.copy(this.boundingSphere),Hc.applyMatrix4(i),e.ray.intersectsSphere(Hc)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,fa),sb.multiplyMatrices(i,fa),Bc.matrixWorld=sb,Bc.raycast(e,jd);for(let o=0,a=jd.length;o<a;o++){let c=jd[o];c.instanceId=s,c.object=this,t.push(c)}jd.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new il(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new nl(new Float32Array(r*this.count),r,this.count,Of,xi));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<i.length;l++)o+=i[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;return s[c]=a,s.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},eo=new kr,YA=new Ee(.5,.5),qd=new N,Ma=class{constructor(e=new Gi,t=new Gi,i=new Gi,r=new Gi,s=new Gi,o=new Gi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ji,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],m=s[8],_=s[9],g=s[10],p=s[11],b=s[12],D=s[13],E=s[14],M=s[15];if(r[0].setComponents(l-o,h-u,p-m,M-b).normalize(),r[1].setComponents(l+o,h+u,p+m,M+b).normalize(),r[2].setComponents(l+a,h+d,p+_,M+D).normalize(),r[3].setComponents(l-a,h-d,p-_,M-D).normalize(),i)r[4].setComponents(c,f,g,E).normalize(),r[5].setComponents(l-c,h-f,p-g,M-E).normalize();else if(r[4].setComponents(l-c,h-f,p-g,M-E).normalize(),t===ji)r[5].setComponents(l+c,h+f,p+g,M+E).normalize();else if(t===ya)r[5].setComponents(c,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),eo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),eo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(eo)}intersectsSprite(e){eo.center.set(0,0,0);let t=YA.distanceTo(e.center);return eo.radius=.7071067811865476+t,eo.applyMatrix4(e.matrixWorld),this.intersectsSphere(eo)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(qd.x=r.normal.x>0?e.max.x:e.min.x,qd.y=r.normal.y>0?e.max.y:e.min.y,qd.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qd)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var as=class extends qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ab=new At,I0=new tl,Xd=new kr,Yd=new N,so=class extends Mn{constructor(e=new Wt,t=new as){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xd.copy(i.boundingSphere),Xd.applyMatrix4(r),Xd.radius+=s,e.ray.intersectsSphere(Xd)===!1)return;ab.copy(r).invert(),I0.copy(e.ray).applyMatrix4(ab);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),h=Math.min(l.count,o.start+o.count);for(let m=f,_=h;m<_;m++){let g=l.getX(m);Yd.fromBufferAttribute(d,g),cb(Yd,g,c,r,e,t,this)}}else{let f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let m=f,_=h;m<_;m++)Yd.fromBufferAttribute(d,m),cb(Yd,m,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function cb(n,e,t,i,r,s,o){let a=I0.distanceSqToPoint(n);if(a<t){let c=new N;I0.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var sl=class extends ci{constructor(e=[],t=ps,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Jn=class extends ci{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var cs=class extends ci{constructor(e,t,i=Zi,r,s,o,a=Jt,c=Jt,l,u=fr,d=1){if(u!==fr&&u!==gs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _a(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},hf=class extends cs{constructor(e,t=Zi,i=ps,r,s,o=Jt,a=Jt,c,l=fr){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ol=class extends ci{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ge=class n extends Wt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(d,2));function m(_,g,p,b,D,E,M,S,C,y,w){let A=E/C,L=M/y,F=E/2,z=M/2,O=S/2,H=C+1,K=y+1,j=0,ae=0,X=new N;for(let ie=0;ie<K;ie++){let se=ie*L-z;for(let Oe=0;Oe<H;Oe++){let Pe=Oe*A-F;X[_]=Pe*b,X[g]=se*D,X[p]=O,l.push(X.x,X.y,X.z),X[_]=0,X[g]=0,X[p]=S>0?1:-1,u.push(X.x,X.y,X.z),d.push(Oe/C),d.push(1-ie/y),j+=1}}for(let ie=0;ie<y;ie++)for(let se=0;se<C;se++){let Oe=f+se+H*ie,Pe=f+se+H*(ie+1),Pt=f+(se+1)+H*(ie+1),at=f+(se+1)+H*ie;c.push(Oe,Pe,at),c.push(Pe,Pt,at),ae+=6}a.addGroup(h,ae,w),h+=ae,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var al=class n extends Wt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],c=[],l=new N,u=new Ee;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let h=i+d/t*r;l.x=e*Math.cos(h),l.y=e*Math.sin(h),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new vt(o,3)),this.setAttribute("normal",new vt(a,3)),this.setAttribute("uv",new vt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Tt=class n extends Wt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],h=[],m=0,_=[],g=i/2,p=0;b(),o===!1&&(e>0&&D(!0),t>0&&D(!1)),this.setIndex(u),this.setAttribute("position",new vt(d,3)),this.setAttribute("normal",new vt(f,3)),this.setAttribute("uv",new vt(h,2));function b(){let E=new N,M=new N,S=0,C=(t-e)/i;for(let y=0;y<=s;y++){let w=[],A=y/s,L=A*(t-e)+e;for(let F=0;F<=r;F++){let z=F/r,O=z*c+a,H=Math.sin(O),K=Math.cos(O);M.x=L*H,M.y=-A*i+g,M.z=L*K,d.push(M.x,M.y,M.z),E.set(H,C,K).normalize(),f.push(E.x,E.y,E.z),h.push(z,1-A),w.push(m++)}_.push(w)}for(let y=0;y<r;y++)for(let w=0;w<s;w++){let A=_[w][y],L=_[w+1][y],F=_[w+1][y+1],z=_[w][y+1];(e>0||w!==0)&&(u.push(A,L,z),S+=3),(t>0||w!==s-1)&&(u.push(L,F,z),S+=3)}l.addGroup(p,S,0),p+=S}function D(E){let M=m,S=new Ee,C=new N,y=0,w=E===!0?e:t,A=E===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,g*A,0),f.push(0,A,0),h.push(.5,.5),m++;let L=m;for(let F=0;F<=r;F++){let O=F/r*c+a,H=Math.cos(O),K=Math.sin(O);C.x=w*K,C.y=g*A,C.z=w*H,d.push(C.x,C.y,C.z),f.push(0,A,0),S.x=H*.5+.5,S.y=K*.5*A+.5,h.push(S.x,S.y),m++}for(let F=0;F<r;F++){let z=M+F,O=L+F;E===!0?u.push(O,O+1,z):u.push(O+1,O,z),y+=3}l.addGroup(p,y,E===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xi=class n extends Tt{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},pf=class n extends Wt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let s=[],o=[];a(r),l(i),u(),this.setAttribute("position",new vt(s,3)),this.setAttribute("normal",new vt(s.slice(),3)),this.setAttribute("uv",new vt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(b){let D=new N,E=new N,M=new N;for(let S=0;S<t.length;S+=3)h(t[S+0],D),h(t[S+1],E),h(t[S+2],M),c(D,E,M,b)}function c(b,D,E,M){let S=M+1,C=[];for(let y=0;y<=S;y++){C[y]=[];let w=b.clone().lerp(E,y/S),A=D.clone().lerp(E,y/S),L=S-y;for(let F=0;F<=L;F++)F===0&&y===S?C[y][F]=w:C[y][F]=w.clone().lerp(A,F/L)}for(let y=0;y<S;y++)for(let w=0;w<2*(S-y)-1;w++){let A=Math.floor(w/2);w%2===0?(f(C[y][A+1]),f(C[y+1][A]),f(C[y][A])):(f(C[y][A+1]),f(C[y+1][A+1]),f(C[y+1][A]))}}function l(b){let D=new N;for(let E=0;E<s.length;E+=3)D.x=s[E+0],D.y=s[E+1],D.z=s[E+2],D.normalize().multiplyScalar(b),s[E+0]=D.x,s[E+1]=D.y,s[E+2]=D.z}function u(){let b=new N;for(let D=0;D<s.length;D+=3){b.x=s[D+0],b.y=s[D+1],b.z=s[D+2];let E=g(b)/2/Math.PI+.5,M=p(b)/Math.PI+.5;o.push(E,1-M)}m(),d()}function d(){for(let b=0;b<o.length;b+=6){let D=o[b+0],E=o[b+2],M=o[b+4],S=Math.max(D,E,M),C=Math.min(D,E,M);S>.9&&C<.1&&(D<.2&&(o[b+0]+=1),E<.2&&(o[b+2]+=1),M<.2&&(o[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function h(b,D){let E=b*3;D.x=e[E+0],D.y=e[E+1],D.z=e[E+2]}function m(){let b=new N,D=new N,E=new N,M=new N,S=new Ee,C=new Ee,y=new Ee;for(let w=0,A=0;w<s.length;w+=9,A+=6){b.set(s[w+0],s[w+1],s[w+2]),D.set(s[w+3],s[w+4],s[w+5]),E.set(s[w+6],s[w+7],s[w+8]),S.set(o[A+0],o[A+1]),C.set(o[A+2],o[A+3]),y.set(o[A+4],o[A+5]),M.copy(b).add(D).add(E).divideScalar(3);let L=g(M);_(S,A+0,b,L),_(C,A+2,D,L),_(y,A+4,E,L)}}function _(b,D,E,M){M<0&&b.x===1&&(o[D]=b.x-1),E.x===0&&E.z===0&&(o[D]=M/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}},cl=class n extends pf{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var sn=class n extends Wt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],m=[],_=[],g=[];for(let p=0;p<u;p++){let b=p*f-o;for(let D=0;D<l;D++){let E=D*d-s;m.push(E,-b,0),_.push(0,0,1),g.push(D/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let D=b+l*p,E=b+l*(p+1),M=b+1+l*(p+1),S=b+1+l*p;h.push(D,E,S),h.push(E,M,S)}this.setIndex(h),this.setAttribute("position",new vt(m,3)),this.setAttribute("normal",new vt(_,3)),this.setAttribute("uv",new vt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var oi=class n extends Wt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new N,f=new N,h=[],m=[],_=[],g=[];for(let p=0;p<=i;p++){let b=[],D=p/i,E=o+D*a,M=e*Math.cos(E),S=Math.sqrt(e*e-M*M),C=0;p===0&&o===0?C=.5/t:p===i&&c===Math.PI&&(C=-.5/t);for(let y=0;y<=t;y++){let w=y/t,A=r+w*s;d.x=-S*Math.cos(A),d.y=M,d.z=S*Math.sin(A),m.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),g.push(w+C,1-D),b.push(l++)}u.push(b)}for(let p=0;p<i;p++)for(let b=0;b<t;b++){let D=u[p][b+1],E=u[p][b],M=u[p+1][b],S=u[p+1][b+1];(p!==0||o>0)&&h.push(D,E,S),(p!==i-1||c<Math.PI)&&h.push(E,M,S)}this.setIndex(h),this.setAttribute("position",new vt(m,3)),this.setAttribute("normal",new vt(_,3)),this.setAttribute("uv",new vt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ll=class n extends Wt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],d=[],f=new N,h=new N,m=new N;for(let _=0;_<=i;_++){let g=o+_/i*a;for(let p=0;p<=r;p++){let b=p/r*s;h.x=(e+t*Math.cos(g))*Math.cos(b),h.y=(e+t*Math.cos(g))*Math.sin(b),h.z=t*Math.sin(g),l.push(h.x,h.y,h.z),f.x=e*Math.cos(b),f.y=e*Math.sin(b),m.subVectors(h,f).normalize(),u.push(m.x,m.y,m.z),d.push(p/r),d.push(_/i)}}for(let _=1;_<=i;_++)for(let g=1;g<=r;g++){let p=(r+1)*_+g-1,b=(r+1)*(_-1)+g-1,D=(r+1)*(_-1)+g,E=(r+1)*_+g;c.push(p,b,E),c.push(b,D,E)}this.setIndex(c),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function fo(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(lb(r))r.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(lb(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Pn(n){let e={};for(let t=0;t<n.length;t++){let i=fo(n[t]);for(let r in i)e[r]=i[r]}return e}function lb(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ZA(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function $0(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}var li={clone:fo,merge:Pn},$A=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,KA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$A,this.fragmentShader=KA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fo(e.uniforms),this.uniformsGroups=ZA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new we().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ee().fromArray(r.value);break;case"v3":this.uniforms[i].value=new N().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ht().fromArray(r.value);break;case"m3":this.uniforms[i].value=new je().fromArray(r.value);break;case"m4":this.uniforms[i].value=new At().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Sa=class extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},oe=class extends qi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new io,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},wa=class extends oe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return it(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ul=class extends qi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new io,this.combine=Df,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mf=class extends qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ub,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},gf=class extends qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ha(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function M0(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var ls=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},vf=class extends ls{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:C0,endingEnd:C0}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case D0:s=e,a=2*t-i;break;case A0:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case D0:o=e,c=2*i-t;break;case A0:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,m=(i-t)/(r-t),_=m*m,g=_*m,p=-f*g+2*f*_-f*m,b=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*m+1,D=(-1-h)*g+(1.5+h)*_+.5*m,E=h*g-h*_;for(let M=0;M!==a;++M)s[M]=p*o[u+M]+b*o[l+M]+D*o[c+M]+E*o[d+M];return s}},yf=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},xf=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_f=class extends ls{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(i-t)/(r-t),_=1-m;for(let g=0;g!==a;++g)s[g]=o[l+g]*_+o[c+g]*m;return s}let f=a*2,h=e-1;for(let m=0;m!==a;++m){let _=o[l+m],g=o[c+m],p=h*f+m*2,b=d[p],D=d[p+1],E=e*f+m*2,M=u[E],S=u[E+1],C=QA(i,t,b,M,r);s[m]=Qb(C,_,D,S,g)}return s}};function Qb(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function JA(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function QA(n,e,t,i,r){let s=(n-e)/(r-e);for(let o=0;o<8;o++){let a=Qb(s,e,t,i,r)-n;if(Math.abs(a)<1e-10)break;let c=JA(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var ai=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ha(t,this.TimeBufferType),this.values=ha(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ha(e.times,Array),values:ha(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),M0(e.settings)&&(i.settings={inTangents:ha(e.settings.inTangents,Array),outTangents:ha(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new xf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _f(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Gc:t=this.InterpolantFactoryMethodDiscrete;break;case cf:t=this.InterpolantFactoryMethodLinear;break;case Kd:t=this.InterpolantFactoryMethodSmooth;break;case T0:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ue("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gc;case this.InterpolantFactoryMethodLinear:return cf;case this.InterpolantFactoryMethodSmooth:return Kd;case this.InterpolantFactoryMethodBezier:return T0}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;M0(this.settings)&&(ub(this.settings.inTangents,e),ub(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){He("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){He("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&hA(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){He("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Kd,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let m=0;m!==i;++m){let _=t[d+m];if(_!==t[f+m]||_!==t[h+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,M0(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ub(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}ai.prototype.ValueTypeName="";ai.prototype.TimeBufferType=Float32Array;ai.prototype.ValueBufferType=Float32Array;ai.prototype.DefaultInterpolation=cf;var us=class extends ai{constructor(e,t,i){super(e,t,i)}};us.prototype.ValueTypeName="bool";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=Gc;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var Ef=class extends ai{constructor(e,t,i,r){super(e,t,i,r)}};Ef.prototype.ValueTypeName="color";var bf=class extends ai{constructor(e,t,i,r){super(e,t,i,r)}};bf.prototype.ValueTypeName="number";var Mf=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)pr.slerpFlat(s,0,o,l-a,o,l,c);return s}},dl=class extends ai{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Mf(this.times,this.values,this.getValueSize(),e)}};dl.prototype.ValueTypeName="quaternion";dl.prototype.InterpolantFactoryMethodSmooth=void 0;var ds=class extends ai{constructor(e,t,i){super(e,t,i)}};ds.prototype.ValueTypeName="string";ds.prototype.ValueBufferType=Array;ds.prototype.DefaultInterpolation=Gc;ds.prototype.InterpolantFactoryMethodLinear=void 0;ds.prototype.InterpolantFactoryMethodSmooth=void 0;var Sf=class extends ai{constructor(e,t,i,r){super(e,t,i,r)}};Sf.prototype.ValueTypeName="vector";var oo=class extends Mn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},fl=class extends oo{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},S0=new At,db=new N,fb=new N,Ta=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=Qn,this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ma,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;db.setFromMatrixPosition(e.matrixWorld),t.position.copy(db),fb.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fb),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){S0.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(S0,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=r?r.z/s.x:1,a=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===ya||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(S0)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Zd=new N,$d=new pr,ur=new N,hl=class extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zd,$d,ur),ur.x===1&&ur.y===1&&ur.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zd,$d,ur.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Zd,$d,ur),ur.x===1&&ur.y===1&&ur.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zd,$d,ur.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},os=new N,hb=new Ee,pb=new Ee,yn=class extends hl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=no*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Vc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return no*2*Math.atan(Math.tan(Vc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,t){return this.getViewBounds(e,hb,pb),t.subVectors(pb,hb)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Vc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},R0=class extends Ta{constructor(){super(new yn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=no*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},pl=class extends oo{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new R0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},N0=class extends Ta{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0}},ml=class extends oo{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new N0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},fs=class extends hl{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},P0=class extends Ta{constructor(){super(new fs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},gl=class extends oo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new P0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var pa=-90,ma=1,wf=class extends Mn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yn(pa,ma,e,t);r.layers=this.layers,this.add(r);let s=new yn(pa,ma,e,t);s.layers=this.layers,this.add(s);let o=new yn(pa,ma,e,t);o.layers=this.layers,this.add(o);let a=new yn(pa,ma,e,t);a.layers=this.layers,this.add(a);let c=new yn(pa,ma,e,t);c.layers=this.layers,this.add(c);let l=new yn(pa,ma,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===ji)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ya)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Tf=class extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vl=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=eI.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function eI(){this._document.hidden===!1&&this.reset()}var K0="\\[\\]\\.:\\/",tI=new RegExp("["+K0+"]","g"),J0="[^"+K0+"]",nI="[^"+K0.replace("\\.","")+"]",iI=/((?:WC+[\/:])*)/.source.replace("WC",J0),rI=/(WCOD+)?/.source.replace("WCOD",nI),sI=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",J0),oI=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",J0),aI=new RegExp("^"+iI+rI+sI+oI+"$"),cI=["material","materials","bones","map"],L0=class{constructor(e,t,i){let r=i||qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},qt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(tI,"")}static parseTrackName(t){let i=aI.exec(t);if(i===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);cI.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ue("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;He("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=L0,n})();qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qt.prototype.GetterByBindingType=[qt.prototype._getValue_direct,qt.prototype._getValue_array,qt.prototype._getValue_arrayElement,qt.prototype._getValue_toArray];qt.prototype.SetterByBindingTypeAndVersioning=[[qt.prototype._setValue_direct,qt.prototype._setValue_direct_setNeedsUpdate,qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_array,qt.prototype._setValue_array_setNeedsUpdate,qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_arrayElement,qt.prototype._setValue_arrayElement_setNeedsUpdate,qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qt.prototype._setValue_fromArray,qt.prototype._setValue_fromArray_setNeedsUpdate,qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fG=new Float32Array(1);var O0=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function Q0(n,e,t,i){let r=lI(i);switch(t){case j0:return n*e;case Of:return n*e/r.components*r.byteLength;case Ff:return n*e/r.components*r.byteLength;case vs:return n*e*2/r.components*r.byteLength;case kf:return n*e*2/r.components*r.byteLength;case q0:return n*e*3/r.components*r.byteLength;case _i:return n*e*4/r.components*r.byteLength;case Uf:return n*e*4/r.components*r.byteLength;case Dl:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Il:case Rl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hf:case zf:return Math.max(n,16)*Math.max(e,8)/4;case Bf:case Vf:return Math.max(n,8)*Math.max(e,8)/2;case Gf:case Wf:case qf:case Xf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case jf:case Nl:case Yf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $f:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Kf:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jf:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Qf:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case eh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case th:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case nh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ih:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case rh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case sh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case oh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ah:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ch:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case lh:case uh:case dh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case fh:case hh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Pl:case ph:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lI(n){switch(n){case Qn:case V0:return{byteLength:1,components:1};case Aa:case z0:case on:return{byteLength:2,components:1};case Pf:case Lf:return{byteLength:2,components:4};case Zi:case Nf:case xi:return{byteLength:4,components:1};case G0:case W0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function EM(){let n=null,e=!1,t=null,i=null;function r(s,o){i=n.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function dI(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,m)=>h.start-m.start);let f=0;for(let h=1;h<d.length;h++){let m=d[f],_=d[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,m=d.length;h<m;h++){let _=d[h];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var fI=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hI=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pI=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mI=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gI=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vI=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yI=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xI=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_I=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,EI=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bI=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,MI=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,SI=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wI=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,TI=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,CI=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,DI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,II=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RI=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,NI=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,PI=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,LI=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,OI=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,FI=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kI=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,UI=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,BI=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,HI=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,VI=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zI="gl_FragColor = linearToOutputTexel( gl_FragColor );",GI=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,WI=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,jI=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qI=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,XI=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,YI=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ZI=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$I=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,KI=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,JI=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,QI=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eR=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tR=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nR=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iR=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,rR=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,sR=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oR=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aR=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cR=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lR=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,uR=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dR=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fR=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hR=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pR=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,mR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_R=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ER=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bR=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,MR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,SR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,TR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,CR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,DR=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,AR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,RR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,NR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,OR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,FR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,UR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,BR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,HR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,VR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,zR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,GR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,WR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,XR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ZR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$R=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,KR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,JR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,QR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,e2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,t2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,n2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,o2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,c2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,f2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,x2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,E2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,b2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,M2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,C2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,R2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,P2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,L2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,k2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,V2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,z2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,j2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:fI,alphahash_pars_fragment:hI,alphamap_fragment:pI,alphamap_pars_fragment:mI,alphatest_fragment:gI,alphatest_pars_fragment:vI,aomap_fragment:yI,aomap_pars_fragment:xI,batching_pars_vertex:_I,batching_vertex:EI,begin_vertex:bI,beginnormal_vertex:MI,bsdfs:SI,iridescence_fragment:wI,bumpmap_pars_fragment:TI,clipping_planes_fragment:CI,clipping_planes_pars_fragment:DI,clipping_planes_pars_vertex:AI,clipping_planes_vertex:II,color_fragment:RI,color_pars_fragment:NI,color_pars_vertex:PI,color_vertex:LI,common:OI,cube_uv_reflection_fragment:FI,defaultnormal_vertex:kI,displacementmap_pars_vertex:UI,displacementmap_vertex:BI,emissivemap_fragment:HI,emissivemap_pars_fragment:VI,colorspace_fragment:zI,colorspace_pars_fragment:GI,envmap_fragment:WI,envmap_common_pars_fragment:jI,envmap_pars_fragment:qI,envmap_pars_vertex:XI,envmap_physical_pars_fragment:rR,envmap_vertex:YI,fog_vertex:ZI,fog_pars_vertex:$I,fog_fragment:KI,fog_pars_fragment:JI,gradientmap_pars_fragment:QI,lightmap_pars_fragment:eR,lights_lambert_fragment:tR,lights_lambert_pars_fragment:nR,lights_pars_begin:iR,lights_toon_fragment:sR,lights_toon_pars_fragment:oR,lights_phong_fragment:aR,lights_phong_pars_fragment:cR,lights_physical_fragment:lR,lights_physical_pars_fragment:uR,lights_fragment_begin:dR,lights_fragment_maps:fR,lights_fragment_end:hR,lightprobes_pars_fragment:pR,logdepthbuf_fragment:mR,logdepthbuf_pars_fragment:gR,logdepthbuf_pars_vertex:vR,logdepthbuf_vertex:yR,map_fragment:xR,map_pars_fragment:_R,map_particle_fragment:ER,map_particle_pars_fragment:bR,metalnessmap_fragment:MR,metalnessmap_pars_fragment:SR,morphinstance_vertex:wR,morphcolor_vertex:TR,morphnormal_vertex:CR,morphtarget_pars_vertex:DR,morphtarget_vertex:AR,normal_fragment_begin:IR,normal_fragment_maps:RR,normal_pars_fragment:NR,normal_pars_vertex:PR,normal_vertex:LR,normalmap_pars_fragment:OR,clearcoat_normal_fragment_begin:FR,clearcoat_normal_fragment_maps:kR,clearcoat_pars_fragment:UR,iridescence_pars_fragment:BR,opaque_fragment:HR,packing:VR,premultiplied_alpha_fragment:zR,project_vertex:GR,dithering_fragment:WR,dithering_pars_fragment:jR,roughnessmap_fragment:qR,roughnessmap_pars_fragment:XR,shadowmap_pars_fragment:YR,shadowmap_pars_vertex:ZR,shadowmap_vertex:$R,shadowmask_pars_fragment:KR,skinbase_vertex:JR,skinning_pars_vertex:QR,skinning_vertex:e2,skinnormal_vertex:t2,specularmap_fragment:n2,specularmap_pars_fragment:i2,tonemapping_fragment:r2,tonemapping_pars_fragment:s2,transmission_fragment:o2,transmission_pars_fragment:a2,uv_pars_fragment:c2,uv_pars_vertex:l2,uv_vertex:u2,worldpos_vertex:d2,background_vert:f2,background_frag:h2,backgroundCube_vert:p2,backgroundCube_frag:m2,cube_vert:g2,cube_frag:v2,depth_vert:y2,depth_frag:x2,distance_vert:_2,distance_frag:E2,equirect_vert:b2,equirect_frag:M2,linedashed_vert:S2,linedashed_frag:w2,meshbasic_vert:T2,meshbasic_frag:C2,meshlambert_vert:D2,meshlambert_frag:A2,meshmatcap_vert:I2,meshmatcap_frag:R2,meshnormal_vert:N2,meshnormal_frag:P2,meshphong_vert:L2,meshphong_frag:O2,meshphysical_vert:F2,meshphysical_frag:k2,meshtoon_vert:U2,meshtoon_frag:B2,points_vert:H2,points_frag:V2,shadow_vert:z2,shadow_frag:G2,sprite_vert:W2,sprite_frag:j2},ve={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},yr={basic:{uniforms:Pn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Pn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Pn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Pn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Pn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new we(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Pn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Pn([ve.points,ve.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Pn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Pn([ve.common,ve.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Pn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Pn([ve.sprite,ve.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:Pn([ve.common,ve.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:Pn([ve.lights,ve.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};yr.physical={uniforms:Pn([yr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};var vh={r:0,b:0,g:0},q2=new At,bM=new je;bM.set(-1,0,0,0,1,0,0,0,1);function X2(n,e,t,i,r,s){let o=new we(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(b){let D=b.isScene===!0?b.background:null;if(D&&D.isTexture){let E=b.backgroundBlurriness>0;D=e.get(D,E)}return D}function m(b){let D=!1,E=h(b);E===null?g(o,a):E&&E.isColor&&(g(E,1),D=!0);let M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||D)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(b,D){let E=h(D);E&&(E.isCubeTexture||E.mapping===Tl)?(l===void 0&&(l=new te(new Ge(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:fo(yr.backgroundCube.uniforms),vertexShader:yr.backgroundCube.vertexShader,fragmentShader:yr.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(q2.makeRotationFromEuler(D.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(bM),l.material.toneMapped=Qe.getTransfer(E.colorSpace)!==gt,(u!==E||d!==E.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new te(new sn(2,2),new Nt({name:"BackgroundMaterial",uniforms:fo(yr.background.uniforms),vertexShader:yr.background.vertexShader,fragmentShader:yr.background.fragmentShader,side:hs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(E.colorSpace)!==gt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function g(b,D){b.getRGB(vh,$0(n)),t.buffers.color.setClear(vh.r,vh.g,vh.b,D,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,D=1){o.set(b),a=D,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,g(o,a)},render:m,addToRenderList:_,dispose:p}}function Y2(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(L,F,z,O,H){let K=!1,j=d(L,O,z,F);s!==j&&(s=j,l(s.object)),K=h(L,O,z,H),K&&m(L,O,z,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,E(L,F,z,O),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function d(L,F,z,O){let H=O.wireframe===!0,K=i[F.id];K===void 0&&(K={},i[F.id]=K);let j=L.isInstancedMesh===!0?L.id:0,ae=K[j];ae===void 0&&(ae={},K[j]=ae);let X=ae[z.id];X===void 0&&(X={},ae[z.id]=X);let ie=X[H];return ie===void 0&&(ie=f(c()),X[H]=ie),ie}function f(L){let F=[],z=[],O=[];for(let H=0;H<t;H++)F[H]=0,z[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:O,object:L,attributes:{},index:null}}function h(L,F,z,O){let H=s.attributes,K=F.attributes,j=0,ae=z.getAttributes();for(let X in ae)if(ae[X].location>=0){let se=H[X],Oe=K[X];if(Oe===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(Oe=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(Oe=L.instanceColor)),se===void 0||se.attribute!==Oe||Oe&&se.data!==Oe.data)return!0;j++}return s.attributesNum!==j||s.index!==O}function m(L,F,z,O){let H={},K=F.attributes,j=0,ae=z.getAttributes();for(let X in ae)if(ae[X].location>=0){let se=K[X];se===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(se=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(se=L.instanceColor));let Oe={};Oe.attribute=se,se&&se.data&&(Oe.data=se.data),H[X]=Oe,j++}s.attributes=H,s.attributesNum=j,s.index=O}function _(){let L=s.newAttributes;for(let F=0,z=L.length;F<z;F++)L[F]=0}function g(L){p(L,0)}function p(L,F){let z=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;z[L]=1,O[L]===0&&(n.enableVertexAttribArray(L),O[L]=1),H[L]!==F&&(n.vertexAttribDivisor(L,F),H[L]=F)}function b(){let L=s.newAttributes,F=s.enabledAttributes;for(let z=0,O=F.length;z<O;z++)F[z]!==L[z]&&(n.disableVertexAttribArray(z),F[z]=0)}function D(L,F,z,O,H,K,j){j===!0?n.vertexAttribIPointer(L,F,z,H,K):n.vertexAttribPointer(L,F,z,O,H,K)}function E(L,F,z,O){_();let H=O.attributes,K=z.getAttributes(),j=F.defaultAttributeValues;for(let ae in K){let X=K[ae];if(X.location>=0){let ie=H[ae];if(ie===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(ie=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(ie=L.instanceColor)),ie!==void 0){let se=ie.normalized,Oe=ie.itemSize,Pe=e.get(ie);if(Pe===void 0)continue;let Pt=Pe.buffer,at=Pe.type,yt=Pe.bytesPerElement,Y=at===n.INT||at===n.UNSIGNED_INT||ie.gpuType===Nf;if(ie.isInterleavedBufferAttribute){let ne=ie.data,Te=ne.stride,qe=ie.offset;if(ne.isInstancedInterleavedBuffer){for(let Me=0;Me<X.locationSize;Me++)p(X.location+Me,ne.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Me=0;Me<X.locationSize;Me++)g(X.location+Me);n.bindBuffer(n.ARRAY_BUFFER,Pt);for(let Me=0;Me<X.locationSize;Me++)D(X.location+Me,Oe/X.locationSize,at,se,Te*yt,(qe+Oe/X.locationSize*Me)*yt,Y)}else{if(ie.isInstancedBufferAttribute){for(let ne=0;ne<X.locationSize;ne++)p(X.location+ne,ie.meshPerAttribute);L.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ne=0;ne<X.locationSize;ne++)g(X.location+ne);n.bindBuffer(n.ARRAY_BUFFER,Pt);for(let ne=0;ne<X.locationSize;ne++)D(X.location+ne,Oe/X.locationSize,at,se,Oe*yt,Oe/X.locationSize*ne*yt,Y)}}else if(j!==void 0){let se=j[ae];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(X.location,se);break;case 3:n.vertexAttrib3fv(X.location,se);break;case 4:n.vertexAttrib4fv(X.location,se);break;default:n.vertexAttrib1fv(X.location,se)}}}}b()}function M(){w();for(let L in i){let F=i[L];for(let z in F){let O=F[z];for(let H in O){let K=O[H];for(let j in K)u(K[j].object),delete K[j];delete O[H]}}delete i[L]}}function S(L){if(i[L.id]===void 0)return;let F=i[L.id];for(let z in F){let O=F[z];for(let H in O){let K=O[H];for(let j in K)u(K[j].object),delete K[j];delete O[H]}}delete i[L.id]}function C(L){for(let F in i){let z=i[F];for(let O in z){let H=z[O];if(H[L.id]===void 0)continue;let K=H[L.id];for(let j in K)u(K[j].object),delete K[j];delete H[L.id]}}}function y(L){for(let F in i){let z=i[F],O=L.isInstancedMesh===!0?L.id:0,H=z[O];if(H!==void 0){for(let K in H){let j=H[K];for(let ae in j)u(j[ae].object),delete j[ae];delete H[K]}delete z[O],Object.keys(z).length===0&&delete i[F]}}}function w(){A(),o=!0,s!==r&&(s=r,l(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:A,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:b}}function Z2(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let f=0;for(let h=0;h<u;h++)f+=l[h];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function $2(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==_i&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let y=C===on&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Qn&&C!==xi&&!y&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ue("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),D=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:D,maxFragmentUniforms:E,maxSamples:M,samples:S}}function K2(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Gi,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{let b=s?0:i,D=b*4,E=p.clippingState||null;c.value=E,E=u(m,f,D,h);for(let M=0;M!==D;++M)E[M]=t[M];p.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,m){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=h+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let D=0,E=h;D!==_;++D,E+=4)o.copy(d[D]).applyMatrix4(b,a),o.normal.toArray(g,E),g[E+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Na=4,J2=6,Q2=20,eN=256,Ol=new fs,eM=new we,ev=null,tv=0,nv=0,iv=!1,tN=new N,ho=new N,La=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=tN}=s;ev=this._renderer.getRenderTarget(),tv=this._renderer.getActiveCubeFace(),nv=this._renderer.getActiveMipmapLevel(),iv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ev,tv,nv),this._renderer.xr.enabled=iv,e.scissorTest=!1,Ra(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ps||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ev=this._renderer.getRenderTarget(),tv=this._renderer.getActiveCubeFace(),nv=this._renderer.getActiveMipmapLevel(),iv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:on,format:_i,colorSpace:Wc,depthBuffer:!1},r=tM(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tM(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=nN(s)),this._blurMaterial=rN(s,e,t),this._ggxMaterial=iN(s,e,t)}return r}_compileMaterial(e){let t=new te(new Wt,e);this._renderer.compile(t,Ol)}_sceneToCubeUV(e,t,i,r,s){let c=new yn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(eM),d.toneMapping=Yi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new te(new Ge,new gr({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,p=!1,b=e.background;b?b.isColor&&(g.color.copy(b),e.background=null,p=!0):(g.color.copy(eM),p=!0);for(let D=0;D<6;D++){let E=D%3;E===0?(c.up.set(0,l[D],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[D],s.y,s.z)):E===1?(c.up.set(0,0,l[D]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[D],s.z)):(c.up.set(0,l[D],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[D]));let M=this._cubeSize;Ra(r,E*M,D>2?M:0,M,M),d.setRenderTarget(r),p&&d.render(_,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ps||e.mapping===lo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=iM()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nM());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;Ra(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Ol)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=l*1.25,h=d*f,{_lodMax:m}=this,_=this._sizeLods[i],g=3*_*(i>m-Na?i-m+Na:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=m-t,Ra(s,g,p,3*_,2*_),r.setRenderTarget(s),r.render(a,Ol),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-i,Ra(e,g,p,3*_,2*_),r.setRenderTarget(e),r.render(a,Ol)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,o),this._blurPass(s,e,i,i,o)}_blurPass(e,t,i,r,s){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[r];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],d=3*u*(r>this._lodMax-Na?r-this._lodMax+Na:0),f=4*(this._cubeSize-u);Ra(t,d,f,3*u,2*u),o.setRenderTarget(t),o.render(c,Ol)}};function nN(n){let e=[],t=[],i=n,r=n-Na+1+J2;for(let s=0;s<r;s++){let o=Math.pow(2,i);e.push(o);let a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,f=6,h=3,m=new Float32Array(h*f*d),_=new Float32Array(h*f*d);for(let p=0;p<d;p++){let b=p%3*2/3-1,D=p>2?0:-1,E=[b,D,0,b+2/3,D,0,b+2/3,D+1,0,b,D,0,b+2/3,D+1,0,b,D+1,0];m.set(E,h*f*p);for(let M=0;M<f;M++){let S=u[M*2]*2-1,C=u[M*2+1]*2-1;p===0?ho.set(1,C,S):p===1?ho.set(-S,1,-C):p===2?ho.set(-S,C,1):p===3?ho.set(-1,C,-S):p===4?ho.set(-S,-1,C):ho.set(S,C,-1),ho.toArray(_,(p*f+M)*h)}}let g=new Wt;g.setAttribute("position",new bn(m,h)),g.setAttribute("outputDirection",new bn(_,h)),t.push(new te(g,null)),i>Na&&i--}return{lodMeshes:t,sizeLods:e}}function tM(n,e,t){let i=new Gt(n,e,t);return i.texture.mapping=Tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ra(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function iN(n,e,t){return new Nt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eN,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Eh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function rN(n,e,t){return new Nt({name:"SphericalGaussianBlur",defines:{SAMPLES:Q2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Eh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function nM(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function iM(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Eh(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var xh=class extends Gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new sl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ge(5,5,5),s=new Nt({name:"CubemapFromEquirect",uniforms:fo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:yi});s.uniforms.tEquirect.value=t;let o=new te(r,s),a=t.minFilter;return t.minFilter===ms&&(t.minFilter=dn),new wf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function sN(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===Af||h===If)if(e.has(f)){let m=e.get(f).texture;return a(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let _=new xh(m.height);return _.fromEquirectangularTexture(n,f),e.set(f,_),f.addEventListener("dispose",l),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let h=f.mapping,m=h===Af||h===If,_=h===ps||h===lo;if(m||_){let g=t.get(f),p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new La(n)),g=m?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let b=f.image;return m&&b&&b.height>0||_&&b&&c(b)?(i===null&&(i=new La(n)),g=m?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function a(f,h){return h===Af?f.mapping=ps:h===If&&(f.mapping=lo),f}function c(f){let h=0,m=6;for(let _=0;_<m;_++)f[_]!==void 0&&h++;return h===m}function l(f){let h=f.target;h.removeEventListener("dispose",l);let m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function oN(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&to("WebGLRenderer: "+i+" extension not supported."),r}}}function aN(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,m=d.attributes.position,_=0;if(m===void 0)return;if(h!==null){let b=h.array;_=h.version;for(let D=0,E=b.length;D<E;D+=3){let M=b[D+0],S=b[D+1],C=b[D+2];f.push(M,S,S,C,C,M)}}else{let b=m.array;_=m.version;for(let D=0,E=b.length/3-1;D<E;D+=3){let M=D+0,S=D+1,C=D+2;f.push(M,S,S,C,C,M)}}let g=new(m.count>=65535?Jc:Kc)(f,1);g.version=_;let p=s.get(d);p&&e.remove(p),s.set(d,g)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function cN(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function l(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,d*o,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,h);let _=0;for(let g=0;g<h;g++)_+=f[g];t.update(_,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function lN(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:He("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function uN(n,e,t){let i=new WeakMap,r=new Ht;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let A=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",A)};var h=A;f!==void 0&&f.texture.dispose();let m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],D=a.morphAttributes.color||[],E=0;m===!0&&(E=1),_===!0&&(E=2),g===!0&&(E=3);let M=a.attributes.position.count*E,S=1;M>e.maxTextureSize&&(S=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let C=new Float32Array(M*S*4*d),y=new Yc(C,M,S,d);y.type=xi,y.needsUpdate=!0;let w=E*4;for(let L=0;L<d;L++){let F=p[L],z=b[L],O=D[L],H=M*S*4*L;for(let K=0;K<F.count;K++){let j=K*w;m===!0&&(r.fromBufferAttribute(F,K),C[H+j+0]=r.x,C[H+j+1]=r.y,C[H+j+2]=r.z,C[H+j+3]=0),_===!0&&(r.fromBufferAttribute(z,K),C[H+j+4]=r.x,C[H+j+5]=r.y,C[H+j+6]=r.z,C[H+j+7]=0),g===!0&&(r.fromBufferAttribute(O,K),C[H+j+8]=r.x,C[H+j+9]=r.y,C[H+j+10]=r.z,C[H+j+11]=O.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new Ee(M,S)},i.set(a,f),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];let _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function dN(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var fN={[_l]:"LINEAR_TONE_MAPPING",[El]:"REINHARD_TONE_MAPPING",[bl]:"CINEON_TONE_MAPPING",[co]:"ACES_FILMIC_TONE_MAPPING",[Sl]:"AGX_TONE_MAPPING",[wl]:"NEUTRAL_TONE_MAPPING",[Ml]:"CUSTOM_TONE_MAPPING"};function hN(n,e,t,i,r,s){let o=new Gt(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Wt;l.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new vt([0,2,0,0,2,0],2));let u=new Sa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new te(l,u),f=new fs(-1,1,1,-1,0,1),h=null,m=null,_=!1,g,p=null,b=[],D=!1;this.setSize=function(E,M){o.setSize(E,M),a!==null&&a.setSize(E,M),c!==null&&c.setSize(E,M);for(let S=0;S<b.length;S++){let C=b[S];C.setSize&&C.setSize(E,M)}},this.setEffects=function(E){b=E,D=b.length>0&&b[0].isRenderPass===!0;let M=o.width,S=o.height;b.length>0&&a===null&&(a=new Gt(M,S,{type:on,depthBuffer:!1,stencilBuffer:!1}),c=new Gt(M,S,{type:on,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<b.length;C++){let y=b[C];y.setSize&&y.setSize(M,S)}},this.begin=function(E,M){if(_||E.toneMapping===Yi&&b.length===0)return!1;if(p=M,M!==null){let S=M.width,C=M.height;(o.width!==S||o.height!==C)&&this.setSize(S,C)}return D===!1&&E.setRenderTarget(o),g=E.toneMapping,E.toneMapping=Yi,!0},this.hasRenderPass=function(){return D},this.end=function(E,M){E.toneMapping=g,_=!0;let S=o,C=a;for(let y=0;y<b.length;y++){let w=b[y];w.enabled!==!1&&(w.render(E,C,S,M),w.needsSwap!==!1&&(S=C,C=C===a?c:a))}if(h!==E.outputColorSpace||m!==E.toneMapping){h=E.outputColorSpace,m=E.toneMapping,u.defines={},Qe.getTransfer(h)===gt&&(u.defines.SRGB_TRANSFER="");let y=fN[m];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,E.setRenderTarget(p),E.render(d,f),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var MM=new ci,ov=new cs(1,1),SM=new Yc,wM=new df,TM=new sl,rM=[],sM=[],oM=new Float32Array(16),aM=new Float32Array(9),cM=new Float32Array(4);function Oa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=rM[r];if(s===void 0&&(s=new Float32Array(r),rM[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function hn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function pn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function bh(n,e){let t=sM[e];t===void 0&&(t=new Int32Array(e),sM[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pN(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2fv(this.addr,e),pn(t,e)}}function gN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;n.uniform3fv(this.addr,e),pn(t,e)}}function vN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4fv(this.addr,e),pn(t,e)}}function yN(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),pn(t,e)}else{if(hn(t,i))return;cM.set(i),n.uniformMatrix2fv(this.addr,!1,cM),pn(t,i)}}function xN(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),pn(t,e)}else{if(hn(t,i))return;aM.set(i),n.uniformMatrix3fv(this.addr,!1,aM),pn(t,i)}}function _N(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),pn(t,e)}else{if(hn(t,i))return;oM.set(i),n.uniformMatrix4fv(this.addr,!1,oM),pn(t,i)}}function EN(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2iv(this.addr,e),pn(t,e)}}function MN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;n.uniform3iv(this.addr,e),pn(t,e)}}function SN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4iv(this.addr,e),pn(t,e)}}function wN(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function TN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2uiv(this.addr,e),pn(t,e)}}function CN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;n.uniform3uiv(this.addr,e),pn(t,e)}}function DN(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4uiv(this.addr,e),pn(t,e)}}function AN(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ov.compareFunction=t.isReversedDepthBuffer()?gh:mh,s=ov):s=MM,t.setTexture2D(e||s,r)}function IN(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||wM,r)}function RN(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||TM,r)}function NN(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||SM,r)}function PN(n){switch(n){case 5126:return pN;case 35664:return mN;case 35665:return gN;case 35666:return vN;case 35674:return yN;case 35675:return xN;case 35676:return _N;case 5124:case 35670:return EN;case 35667:case 35671:return bN;case 35668:case 35672:return MN;case 35669:case 35673:return SN;case 5125:return wN;case 36294:return TN;case 36295:return CN;case 36296:return DN;case 35678:case 36198:case 36298:case 36306:case 35682:return AN;case 35679:case 36299:case 36307:return IN;case 35680:case 36300:case 36308:case 36293:return RN;case 36289:case 36303:case 36311:case 36292:return NN}}function LN(n,e){n.uniform1fv(this.addr,e)}function ON(n,e){let t=Oa(e,this.size,2);n.uniform2fv(this.addr,t)}function FN(n,e){let t=Oa(e,this.size,3);n.uniform3fv(this.addr,t)}function kN(n,e){let t=Oa(e,this.size,4);n.uniform4fv(this.addr,t)}function UN(n,e){let t=Oa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function BN(n,e){let t=Oa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function HN(n,e){let t=Oa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function VN(n,e){n.uniform1iv(this.addr,e)}function zN(n,e){n.uniform2iv(this.addr,e)}function GN(n,e){n.uniform3iv(this.addr,e)}function WN(n,e){n.uniform4iv(this.addr,e)}function jN(n,e){n.uniform1uiv(this.addr,e)}function qN(n,e){n.uniform2uiv(this.addr,e)}function XN(n,e){n.uniform3uiv(this.addr,e)}function YN(n,e){n.uniform4uiv(this.addr,e)}function ZN(n,e,t){let i=this.cache,r=e.length,s=bh(t,r);hn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=ov:o=MM;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function $N(n,e,t){let i=this.cache,r=e.length,s=bh(t,r);hn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||wM,s[o])}function KN(n,e,t){let i=this.cache,r=e.length,s=bh(t,r);hn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||TM,s[o])}function JN(n,e,t){let i=this.cache,r=e.length,s=bh(t,r);hn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||SM,s[o])}function QN(n){switch(n){case 5126:return LN;case 35664:return ON;case 35665:return FN;case 35666:return kN;case 35674:return UN;case 35675:return BN;case 35676:return HN;case 5124:case 35670:return VN;case 35667:case 35671:return zN;case 35668:case 35672:return GN;case 35669:case 35673:return WN;case 5125:return jN;case 36294:return qN;case 36295:return XN;case 36296:return YN;case 35678:case 36198:case 36298:case 36306:case 35682:return ZN;case 35679:case 36299:case 36307:return $N;case 35680:case 36300:case 36308:case 36293:return KN;case 36289:case 36303:case 36311:case 36292:return JN}}var av=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=PN(t.type)}},cv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=QN(t.type)}},lv=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},rv=/(\w+)(\])?(\[|\.)?/g;function lM(n,e){n.seq.push(e),n.map[e.id]=e}function eP(n,e,t){let i=n.name,r=i.length;for(rv.lastIndex=0;;){let s=rv.exec(i),o=rv.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){lM(t,l===void 0?new av(a,n,e):new cv(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new lv(a),lM(t,d)),t=d}}}var Pa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);eP(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function uM(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var tP=37297,nP=0;function iP(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var dM=new je;function rP(n){Qe._getMatrix(dM,Qe.workingColorSpace,n);let e=`mat3( ${dM.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case jc:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function fM(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+iP(n.getShaderSource(e),a)}else return s}function sP(n,e){let t=rP(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var oP={[_l]:"Linear",[El]:"Reinhard",[bl]:"Cineon",[co]:"ACESFilmic",[Sl]:"AgX",[wl]:"Neutral",[Ml]:"Custom"};function aP(n,e){let t=oP[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var yh=new N;function cP(){Qe.getLuminanceCoefficients(yh);let n=yh.x.toFixed(4),e=yh.y.toFixed(4),t=yh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lP(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kl).join(`
`)}function uP(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function dP(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function kl(n){return n!==""}function hM(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pM(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var fP=/^[ \t]*#include +<([\w\d./]+)>/gm;function uv(n){return n.replace(fP,pP)}var hP=new Map;function pP(n,e){let t=Ke[e];if(t===void 0){let i=hP.get(e);if(i!==void 0)t=Ke[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return uv(t)}var mP=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mM(n){return n.replace(mP,gP)}function gP(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function gM(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var vP={[yl]:"SHADOWMAP_TYPE_PCF",[Ca]:"SHADOWMAP_TYPE_VSM"};function yP(n){return vP[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var xP={[ps]:"ENVMAP_TYPE_CUBE",[lo]:"ENVMAP_TYPE_CUBE",[Tl]:"ENVMAP_TYPE_CUBE_UV"};function _P(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":xP[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var EP={[lo]:"ENVMAP_MODE_REFRACTION"};function bP(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":EP[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var MP={[Df]:"ENVMAP_BLENDING_MULTIPLY",[Ob]:"ENVMAP_BLENDING_MIX",[Fb]:"ENVMAP_BLENDING_ADD"};function SP(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":MP[n.combine]||"ENVMAP_BLENDING_NONE"}function wP(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function TP(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=yP(t),l=_P(t),u=bP(t),d=SP(t),f=wP(t),h=lP(t),m=uP(s),_=r.createProgram(),g,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(kl).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(kl).join(`
`),p.length>0&&(p+=`
`)):(g=[gM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kl).join(`
`),p=[gM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yi?"#define TONE_MAPPING":"",t.toneMapping!==Yi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Yi?aP("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,sP("linearToOutputTexel",t.outputColorSpace),cP(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kl).join(`
`)),o=uv(o),o=hM(o,t),o=pM(o,t),a=uv(a),a=hM(a,t),a=pM(a,t),o=mM(o),a=mM(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Y0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Y0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let D=b+g+o,E=b+p+a,M=uM(r,r.VERTEX_SHADER,D),S=uM(r,r.FRAGMENT_SHADER,E);r.attachShader(_,M),r.attachShader(_,S),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(L){if(n.debug.checkShaderErrors){let F=r.getProgramInfoLog(_)||"",z=r.getShaderInfoLog(M)||"",O=r.getShaderInfoLog(S)||"",H=F.trim(),K=z.trim(),j=O.trim(),ae=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,M,S);else{let ie=fM(r,M,"vertex"),se=fM(r,S,"fragment");He("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+ie+`
`+se)}else H!==""?Ue("WebGLProgram: Program Info Log:",H):(K===""||j==="")&&(X=!1);X&&(L.diagnostics={runnable:ae,programLog:H,vertexShader:{log:K,prefix:g},fragmentShader:{log:j,prefix:p}})}r.deleteShader(M),r.deleteShader(S),y=new Pa(r,_),w=dP(r,_)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=r.getProgramParameter(_,tP)),A},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=nP++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=S,this}var CP=0,dv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new fv(e),t.set(e,i)),i}},fv=class{constructor(e){this.id=CP++,this.code=e,this.usedTimes=0}};function DP(n){return n===vs||n===Nl||n===Pl}function AP(n,e,t,i,r,s){let o=new Zc,a=new dv,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return c.add(y),y===0?"uv":`uv${y}`}function _(y,w,A,L,F,z){let O=L.fog,H=F.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?L.environment:null,j=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ae=e.get(y.envMap||K,j),X=ae&&ae.mapping===Tl?ae.image.height:null,ie=h[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Ue("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let se=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Oe=se!==void 0?se.length:0,Pe=0;H.morphAttributes.position!==void 0&&(Pe=1),H.morphAttributes.normal!==void 0&&(Pe=2),H.morphAttributes.color!==void 0&&(Pe=3);let Pt,at,yt,Y;if(ie){let Ot=yr[ie];Pt=Ot.vertexShader,at=Ot.fragmentShader}else{Pt=y.vertexShader,at=y.fragmentShader;let Ot=a.getVertexShaderStage(y),_t=a.getFragmentShaderStage(y);a.update(y,Ot,_t),yt=Ot.id,Y=_t.id}let ne=n.getRenderTarget(),Te=n.state.buffers.depth.getReversed(),qe=F.isInstancedMesh===!0,Me=F.isBatchedMesh===!0,Je=!!y.map,an=!!y.matcap,tt=!!ae,ht=!!y.aoMap,Lt=!!y.lightMap,rt=!!y.bumpMap&&y.wireframe===!1,Bt=!!y.normalMap,mn=!!y.displacementMap,Xn=!!y.emissiveMap,Vt=!!y.metalnessMap,Qt=!!y.roughnessMap,P=y.anisotropy>0,Tn=y.clearcoat>0,Mt=y.dispersion>0,T=y.retroreflectivity>0,v=y.iridescence>0,k=y.sheen>0,V=y.transmission>0,q=P&&!!y.anisotropyMap,ce=Tn&&!!y.clearcoatMap,de=Tn&&!!y.clearcoatNormalMap,Z=Tn&&!!y.clearcoatRoughnessMap,ee=v&&!!y.iridescenceMap,fe=v&&!!y.iridescenceThicknessMap,Re=k&&!!y.sheenColorMap,ge=k&&!!y.sheenRoughnessMap,he=!!y.specularMap,Ne=!!y.specularColorMap,Fe=!!y.specularIntensityMap,Ye=V&&!!y.transmissionMap,R=V&&!!y.thicknessMap,pe=!!y.gradientMap,J=!!y.alphaMap,me=y.alphaTest>0,_e=!!y.alphaHash,re=!!y.extensions,Le=Yi;y.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Le=n.toneMapping);let Ae={shaderID:ie,shaderType:y.type,shaderName:y.name,vertexShader:Pt,fragmentShader:at,defines:y.defines,customVertexShaderID:yt,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Me,batchingColor:Me&&F._colorsTexture!==null,instancing:qe,instancingColor:qe&&F.instanceColor!==null,instancingMorph:qe&&F.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Je,matcap:an,envMap:tt,envMapMode:tt&&ae.mapping,envMapCubeUVHeight:X,aoMap:ht,lightMap:Lt,bumpMap:rt,normalMap:Bt,displacementMap:mn,emissiveMap:Xn,normalMapObjectSpace:Bt&&y.normalMapType===Bb,normalMapTangentSpace:Bt&&y.normalMapType===Ll,packedNormalMap:Bt&&y.normalMapType===Ll&&DP(y.normalMap.format),metalnessMap:Vt,roughnessMap:Qt,anisotropy:P,anisotropyMap:q,clearcoat:Tn,clearcoatMap:ce,clearcoatNormalMap:de,clearcoatRoughnessMap:Z,dispersion:Mt,retroreflection:T,iridescence:v,iridescenceMap:ee,iridescenceThicknessMap:fe,sheen:k,sheenColorMap:Re,sheenRoughnessMap:ge,specularMap:he,specularColorMap:Ne,specularIntensityMap:Fe,transmission:V,transmissionMap:Ye,thicknessMap:R,gradientMap:pe,opaque:y.transparent===!1&&y.blending===Da&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:me,alphaHash:_e,combine:y.combine,mapUv:Je&&m(y.map.channel),aoMapUv:ht&&m(y.aoMap.channel),lightMapUv:Lt&&m(y.lightMap.channel),bumpMapUv:rt&&m(y.bumpMap.channel),normalMapUv:Bt&&m(y.normalMap.channel),displacementMapUv:mn&&m(y.displacementMap.channel),emissiveMapUv:Xn&&m(y.emissiveMap.channel),metalnessMapUv:Vt&&m(y.metalnessMap.channel),roughnessMapUv:Qt&&m(y.roughnessMap.channel),anisotropyMapUv:q&&m(y.anisotropyMap.channel),clearcoatMapUv:ce&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:ge&&m(y.sheenRoughnessMap.channel),specularMapUv:he&&m(y.specularMap.channel),specularColorMapUv:Ne&&m(y.specularColorMap.channel),specularIntensityMapUv:Fe&&m(y.specularIntensityMap.channel),transmissionMapUv:Ye&&m(y.transmissionMap.channel),thicknessMapUv:R&&m(y.thicknessMap.channel),alphaMapUv:J&&m(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Bt||P),vertexNormals:!!H.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!H.attributes.uv&&(Je||J),fog:!!O,useFog:y.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&Bt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Te,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Oe,morphTextureStride:Pe,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Le,decodeVideoTexture:Je&&y.map.isVideoTexture===!0&&Qe.getTransfer(y.map.colorSpace)===gt,decodeVideoTextureEmissive:Xn&&y.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(y.emissiveMap.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Nn,flipSided:y.side===fn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&y.extensions.multiDraw===!0||Me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let A in y.defines)w.push(A),w.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(p(w,y),b(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function p(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function b(y,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function D(y){let w=h[y.type],A;if(w){let L=yr[w];A=li.clone(L.uniforms)}else A=y.uniforms;return A}function E(y,w){let A=u.get(w);return A!==void 0?++A.usedTimes:(A=new TP(n,w,y,r),l.push(A),u.set(w,A)),A}function M(y){if(--y.usedTimes===0){let w=l.indexOf(y);l[w]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function S(y){a.remove(y)}function C(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:D,acquireProgram:E,releaseProgram:M,releaseShaderCache:S,programs:l,dispose:C}}function IP(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function RP(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function vM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function yM(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,m,_,g,p){let b=n[e];return b===void 0?(b={id:f.id,object:f,geometry:h,material:m,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},n[e]=b):(b.id=f.id,b.object=f,b.geometry=h,b.material=m,b.materialVariant=o(f),b.groupOrder=_,b.renderOrder=f.renderOrder,b.z=g,b.group=p),e++,b}function c(f,h,m,_,g,p,b){b.reversedDepth===!0&&(g=-g);let D=a(f,h,m,_,g,p);m.transmission>0?i.push(D):m.transparent===!0?r.push(D):t.push(D)}function l(f,h,m,_,g,p){let b=a(f,h,m,_,g,p);m.transmission>0?i.unshift(b):m.transparent===!0?r.unshift(b):t.unshift(b)}function u(f,h){t.length>1&&t.sort(f||RP),i.length>1&&i.sort(h||vM),r.length>1&&r.sort(h||vM)}function d(){for(let f=e,h=n.length;f<h;f++){let m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function NP(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new yM,n.set(i,[o])):r>=s.length?(o=new yM,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function PP(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new we};break;case"SpotLight":t={position:new N,direction:new N,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function LP(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var OP=0;function FP(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function kP(n){let e=new PP,t=LP(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);let r=new N,s=new At,o=new At;function a(l){let u=0,d=0,f=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let h=0,m=0,_=0,g=0,p=0,b=0,D=0,E=0,M=0,S=0,C=0,y=0,w=0,A=0;l.sort(FP);for(let F=0,z=l.length;F<z;F++){let O=l[F],H=O.color,K=O.intensity,j=O.distance,ae=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===vs?ae=O.shadow.map.texture:ae=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)u+=H.r*K,d+=H.g*K,f+=H.b*K;else if(O.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(O.sh.coefficients[X],K);A++}else if(O.isSunLight){let X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let ie=O.shadow,se=t.get(O);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),i.sunShadow[m]=se,i.sunShadowMap[m]=ae;let Oe=ie.getViewportCount();for(let Pe=0;Pe<Oe;Pe++)i.sunShadowMatrix[_+Pe]=ie.getMatrix(Pe),i.sunShadowCascade[_+Pe]=ie._cascadeData[Pe];_+=Oe,m++}i.sun[h]=X,h++}else if(O.isDirectionalLight){let X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let ie=O.shadow,se=t.get(O);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize=ie.mapSize,i.directionalShadow[g]=se,i.directionalShadowMap[g]=ae,i.directionalShadowMatrix[g]=O.shadow.matrix,M++}i.directional[g]=X,g++}else if(O.isSpotLight){let X=e.get(O);X.position.setFromMatrixPosition(O.matrixWorld),X.color.copy(H).multiplyScalar(K),X.distance=j,X.coneCos=Math.cos(O.angle),X.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),X.decay=O.decay,i.spot[b]=X;let ie=O.shadow;if(O.map&&(i.spotLightMap[y]=O.map,y++,ie.updateMatrices(O),O.castShadow&&w++),i.spotLightMatrix[b]=ie.matrix,O.castShadow){let se=t.get(O);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize=ie.mapSize,i.spotShadow[b]=se,i.spotShadowMap[b]=ae,C++}b++}else if(O.isRectAreaLight){let X=e.get(O);X.color.copy(H).multiplyScalar(K),X.halfWidth.set(O.width*.5,0,0),X.halfHeight.set(0,O.height*.5,0),i.rectArea[D]=X,D++}else if(O.isPointLight){let X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),X.distance=O.distance,X.decay=O.decay,O.castShadow){let ie=O.shadow,se=t.get(O);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize=ie.mapSize,se.shadowCameraNear=ie.camera.near,se.shadowCameraFar=ie.camera.far,i.pointShadow[p]=se,i.pointShadowMap[p]=ae,i.pointShadowMatrix[p]=O.shadow.matrix,S++}i.point[p]=X,p++}else if(O.isHemisphereLight){let X=e.get(O);X.skyColor.copy(O.color).multiplyScalar(K),X.groundColor.copy(O.groundColor).multiplyScalar(K),i.hemi[E]=X,E++}}D>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let L=i.hash;(L.sunLength!==h||L.directionalLength!==g||L.pointLength!==p||L.spotLength!==b||L.rectAreaLength!==D||L.hemiLength!==E||L.numSunShadows!==m||L.numDirectionalShadows!==M||L.numPointShadows!==S||L.numSpotShadows!==C||L.numSpotMaps!==y||L.numLightProbes!==A)&&(i.sun.length=h,i.directional.length=g,i.spot.length=b,i.rectArea.length=D,i.point.length=p,i.hemi.length=E,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+y-w,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,L.sunLength=h,L.directionalLength=g,L.pointLength=p,L.spotLength=b,L.rectAreaLength=D,L.hemiLength=E,L.numSunShadows=m,L.numDirectionalShadows=M,L.numPointShadows=S,L.numSpotShadows=C,L.numSpotMaps=y,L.numLightProbes=A,i.version=OP++)}function c(l,u){let d=0,f=0,h=0,m=0,_=0,g=0,p=u.matrixWorldInverse;for(let b=0,D=l.length;b<D;b++){let E=l[b];if(E.isSunLight){let M=i.sun[d];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(p),d++}else if(E.isDirectionalLight){let M=i.directional[f];M.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),f++}else if(E.isSpotLight){let M=i.spot[m];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),m++}else if(E.isRectAreaLight){let M=i.rectArea[_];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),o.identity(),s.copy(E.matrixWorld),s.premultiply(p),o.extractRotation(s),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){let M=i.point[h];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){let M=i.hemi[g];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:i}}function xM(n){let e=new kP(n),t=[],i=[],r=[];function s(f){d.camera=f,t.length=0,i.length=0,r.length=0}function o(f){t.push(f)}function a(f){i.push(f)}function c(f){r.push(f)}function l(){e.setup(t)}function u(f){e.setupView(t,f)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function UP(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new xM(n),e.set(r,[a])):s>=o.length?(a=new xM(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var BP=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HP=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,VP=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],zP=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],_M=new At,Fl=new N,sv=new N;function GP(n,e,t){let i=new Ma,r=new Ee,s=new Ee,o=new Ht,a=new mf,c=new gf,l={},u=t.maxTextureSize,d={[hs]:fn,[fn]:hs,[Nn]:Nn},f=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:BP,fragmentShader:HP}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let m=new Wt;m.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new te(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yl;let p=this.type;this.render=function(S,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Cf&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=yl);let w=n.getRenderTarget(),A=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),F=n.state;F.setBlending(yi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let z=p!==this.type;z&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=S.length;O<H;O++){let K=S[O],j=K.shadow;if(j===void 0){Ue("WebGLShadowMap:",K,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);let ae=j.getFrameExtents();r.multiply(ae),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,j.mapSize.y=s.y));let X=n.state.buffers.depth.getReversed();if(j.camera._reversedDepth=X,j.map===null||z===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===Ca){if(K.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new Gt(r.x,r.y,{format:vs,type:on,minFilter:dn,magFilter:dn,generateMipmaps:!1}),j.map.texture.name=K.name+".shadowMap",j.map.depthTexture=new cs(r.x,r.y,xi),j.map.depthTexture.name=K.name+".shadowMapDepth",j.map.depthTexture.format=fr,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Jt,j.map.depthTexture.magFilter=Jt}else K.isPointLight?(j.map=new xh(r.x),j.map.depthTexture=new hf(r.x,Zi)):(j.map=new Gt(r.x,r.y),j.map.depthTexture=new cs(r.x,r.y,Zi)),j.map.depthTexture.name=K.name+".shadowMap",j.map.depthTexture.format=fr,this.type===yl?(j.map.depthTexture.compareFunction=X?gh:mh,j.map.depthTexture.minFilter=dn,j.map.depthTexture.magFilter=dn):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=Jt,j.map.depthTexture.magFilter=Jt);j.camera.updateProjectionMatrix()}j.map.isWebGLCubeRenderTarget!==!0&&(j.map.width!==r.x||j.map.height!==r.y)&&j.map.setSize(r.x,r.y);let ie=j.map.isWebGLCubeRenderTarget?6:j.getViewportCount();K.isPointLight!==!0&&j.updateMatrices(K,y);for(let se=0;se<ie;se++){let Oe=j.getCamera(se);if(K.isPointLight){let Pe=j.camera,Pt=j.matrix,at=K.distance||Pe.far;at!==Pe.far&&(Pe.far=at,Pe.updateProjectionMatrix()),Fl.setFromMatrixPosition(K.matrixWorld),Pe.position.copy(Fl),sv.copy(Pe.position),sv.add(VP[se]),Pe.up.copy(zP[se]),Pe.lookAt(sv),Pe.updateMatrixWorld(),Pt.makeTranslation(-Fl.x,-Fl.y,-Fl.z),_M.multiplyMatrices(Pe.projectionMatrix,Pe.matrixWorldInverse),j._frustum.setFromProjectionMatrix(_M,Pe.coordinateSystem,Pe.reversedDepth)}if(j.map.isWebGLCubeRenderTarget)n.setRenderTarget(j.map,se),n.clear();else{se===0&&(n.setRenderTarget(j.map),n.clear());let Pe=j.getViewport(se);o.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),F.viewport(o)}i=j.getFrustum(se),E(C,y,Oe,K,this.type)}j.isPointLightShadow!==!0&&this.type===Ca&&b(j,y),j.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(w,A,L)};function b(S,C){let y=e.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,h.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),S.mapPass===null?S.mapPass=new Gt(r.x,r.y,{format:vs,type:on}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(C,null,y,f,_,null),h.uniforms.shadow_pass.value=S.mapPass.texture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(C,null,y,h,_,null)}function D(S,C,y,w){let A=null,L=y.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)A=L;else if(A=y.isPointLight===!0?c:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=A.uuid,z=C.uuid,O=l[F];O===void 0&&(O={},l[F]=O);let H=O[z];H===void 0&&(H=A.clone(),O[z]=H,C.addEventListener("dispose",M)),A=H}if(A.visible=C.visible,A.wireframe=C.wireframe,w===Ca?A.side=C.shadowSide!==null?C.shadowSide:C.side:A.side=C.shadowSide!==null?C.shadowSide:d[C.side],A.alphaMap=C.alphaMap,A.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,A.map=C.map,A.clipShadows=C.clipShadows,A.clippingPlanes=C.clippingPlanes,A.clipIntersection=C.clipIntersection,A.displacementMap=C.displacementMap,A.displacementScale=C.displacementScale,A.displacementBias=C.displacementBias,A.wireframeLinewidth=C.wireframeLinewidth,A.linewidth=C.linewidth,y.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let F=n.properties.get(A);F.light=y}return A}function E(S,C,y,w,A){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===Ca)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,S.matrixWorld);let z=e.update(S),O=S.material;if(Array.isArray(O)){let H=z.groups;for(let K=0,j=H.length;K<j;K++){let ae=H[K],X=O[ae.materialIndex];if(X&&X.visible){let ie=D(S,X,w,A);S.onBeforeShadow(n,S,C,y,z,ie,ae),n.renderBufferDirect(y,null,z,ie,S,ae),S.onAfterShadow(n,S,C,y,z,ie,ae)}}}else if(O.visible){let H=D(S,O,w,A);S.onBeforeShadow(n,S,C,y,z,H,null),n.renderBufferDirect(y,null,z,H,S,null),S.onAfterShadow(n,S,C,y,z,H,null)}}let F=S.children;for(let z=0,O=F.length;z<O;z++)E(F[z],C,y,w,A)}function M(S){S.target.removeEventListener("dispose",M);for(let y in l){let w=l[y],A=S.target.uuid;A in w&&(w[A].dispose(),delete w[A])}}}function WP(n,e){function t(){let R=!1,pe=new Ht,J=null,me=new Ht(0,0,0,0);return{setMask:function(_e){J!==_e&&!R&&(n.colorMask(_e,_e,_e,_e),J=_e)},setLocked:function(_e){R=_e},setClear:function(_e,re,Le,Ae,Ot){Ot===!0&&(_e*=Ae,re*=Ae,Le*=Ae),pe.set(_e,re,Le,Ae),me.equals(pe)===!1&&(n.clearColor(_e,re,Le,Ae),me.copy(pe))},reset:function(){R=!1,J=null,me.set(-1,0,0,0)}}}function i(){let R=!1,pe=!1,J=null,me=null,_e=null;return{setReversed:function(re){if(pe!==re){let Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),pe=re;let Ae=_e;_e=null,this.setClear(Ae)}},getReversed:function(){return pe},setTest:function(re){re?ne(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(re){J!==re&&!R&&(n.depthMask(re),J=re)},setFunc:function(re){if(pe&&(re=$b[re]),me!==re){switch(re){case Qd:n.depthFunc(n.NEVER);break;case ef:n.depthFunc(n.ALWAYS);break;case tf:n.depthFunc(n.LESS);break;case va:n.depthFunc(n.LEQUAL);break;case nf:n.depthFunc(n.EQUAL);break;case rf:n.depthFunc(n.GEQUAL);break;case sf:n.depthFunc(n.GREATER);break;case of:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=re}},setLocked:function(re){R=re},setClear:function(re){_e!==re&&(_e=re,pe&&(re=1-re),n.clearDepth(re))},reset:function(){R=!1,J=null,me=null,_e=null,pe=!1}}}function r(){let R=!1,pe=null,J=null,me=null,_e=null,re=null,Le=null,Ae=null,Ot=null;return{setTest:function(_t){R||(_t?ne(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(_t){pe!==_t&&!R&&(n.stencilMask(_t),pe=_t)},setFunc:function(_t,wi,$i){(J!==_t||me!==wi||_e!==$i)&&(n.stencilFunc(_t,wi,$i),J=_t,me=wi,_e=$i)},setOp:function(_t,wi,$i){(re!==_t||Le!==wi||Ae!==$i)&&(n.stencilOp(_t,wi,$i),re=_t,Le=wi,Ae=$i)},setLocked:function(_t){R=_t},setClear:function(_t){Ot!==_t&&(n.clearStencil(_t),Ot=_t)},reset:function(){R=!1,pe=null,J=null,me=null,_e=null,re=null,Le=null,Ae=null,Ot=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f={},h=new WeakMap,m=[],_=null,g=!1,p=null,b=null,D=null,E=null,M=null,S=null,C=null,y=new we(0,0,0),w=0,A=!1,L=null,F=null,z=null,O=null,H=null,K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ae=0,X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(X)[1]),j=ae>=1):X.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),j=ae>=2);let ie=null,se={},Oe=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),Pt=new Ht().fromArray(Oe),at=new Ht().fromArray(Pe);function yt(R,pe,J,me){let _e=new Uint8Array(4),re=n.createTexture();n.bindTexture(R,re),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<J;Le++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(pe+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return re}let Y={};Y[n.TEXTURE_2D]=yt(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=yt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=yt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=yt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(n.DEPTH_TEST),o.setFunc(va),rt(!1),Bt(F0),ne(n.CULL_FACE),ht(yi);function ne(R){u[R]!==!0&&(n.enable(R),u[R]=!0)}function Te(R){u[R]!==!1&&(n.disable(R),u[R]=!1)}function qe(R,pe){return f[R]!==pe?(n.bindFramebuffer(R,pe),f[R]=pe,R===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=pe),R===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function Me(R,pe){let J=m,me=!1;if(R){J=h.get(pe),J===void 0&&(J=[],h.set(pe,J));let _e=R.textures;if(J.length!==_e.length||J[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Le=_e.length;re<Le;re++)J[re]=n.COLOR_ATTACHMENT0+re;J.length=_e.length,me=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,me=!0);me&&n.drawBuffers(J)}function Je(R){return _!==R?(n.useProgram(R),_=R,!0):!1}let an={[ao]:n.FUNC_ADD,[yb]:n.FUNC_SUBTRACT,[xb]:n.FUNC_REVERSE_SUBTRACT};an[_b]=n.MIN,an[Eb]=n.MAX;let tt={[bb]:n.ZERO,[Mb]:n.ONE,[Sb]:n.SRC_COLOR,[B0]:n.SRC_ALPHA,[Ib]:n.SRC_ALPHA_SATURATE,[Db]:n.DST_COLOR,[Tb]:n.DST_ALPHA,[wb]:n.ONE_MINUS_SRC_COLOR,[H0]:n.ONE_MINUS_SRC_ALPHA,[Ab]:n.ONE_MINUS_DST_COLOR,[Cb]:n.ONE_MINUS_DST_ALPHA,[Rb]:n.CONSTANT_COLOR,[Nb]:n.ONE_MINUS_CONSTANT_COLOR,[Pb]:n.CONSTANT_ALPHA,[Lb]:n.ONE_MINUS_CONSTANT_ALPHA};function ht(R,pe,J,me,_e,re,Le,Ae,Ot,_t){if(R===yi){g===!0&&(Te(n.BLEND),g=!1);return}if(g===!1&&(ne(n.BLEND),g=!0),R!==vb){if(R!==p||_t!==A){if((b!==ao||M!==ao)&&(n.blendEquation(n.FUNC_ADD),b=ao,M=ao),_t)switch(R){case Da:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xl:n.blendFunc(n.ONE,n.ONE);break;case k0:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case U0:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:He("WebGLState: Invalid blending: ",R);break}else switch(R){case Da:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case k0:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case U0:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",R);break}D=null,E=null,S=null,C=null,y.set(0,0,0),w=0,p=R,A=_t}return}_e=_e||pe,re=re||J,Le=Le||me,(pe!==b||_e!==M)&&(n.blendEquationSeparate(an[pe],an[_e]),b=pe,M=_e),(J!==D||me!==E||re!==S||Le!==C)&&(n.blendFuncSeparate(tt[J],tt[me],tt[re],tt[Le]),D=J,E=me,S=re,C=Le),(Ae.equals(y)===!1||Ot!==w)&&(n.blendColor(Ae.r,Ae.g,Ae.b,Ot),y.copy(Ae),w=Ot),p=R,A=!1}function Lt(R,pe){R.side===Nn?Te(n.CULL_FACE):ne(n.CULL_FACE);let J=R.side===fn;pe&&(J=!J),rt(J),R.blending===Da&&R.transparent===!1?ht(yi):ht(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),s.setMask(R.colorWrite);let me=R.stencilWrite;a.setTest(me),me&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Xn(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function rt(R){L!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),L=R)}function Bt(R){R!==mb?(ne(n.CULL_FACE),R!==F&&(R===F0?n.cullFace(n.BACK):R===gb?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),F=R}function mn(R){R!==z&&(j&&n.lineWidth(R),z=R)}function Xn(R,pe,J){R?(ne(n.POLYGON_OFFSET_FILL),(O!==pe||H!==J)&&(O=pe,H=J,o.getReversed()&&(pe=-pe),n.polygonOffset(pe,J))):Te(n.POLYGON_OFFSET_FILL)}function Vt(R){R?ne(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function Qt(R){R===void 0&&(R=n.TEXTURE0+K-1),ie!==R&&(n.activeTexture(R),ie=R)}function P(R,pe,J){J===void 0&&(ie===null?J=n.TEXTURE0+K-1:J=ie);let me=se[J];me===void 0&&(me={type:void 0,texture:void 0},se[J]=me),(me.type!==R||me.texture!==pe)&&(ie!==J&&(n.activeTexture(J),ie=J),n.bindTexture(R,pe||Y[R]),me.type=R,me.texture=pe)}function Tn(){let R=se[ie];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Mt(){try{n.compressedTexImage2D(...arguments)}catch(R){He("WebGLState:",R)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(R){He("WebGLState:",R)}}function v(){try{n.texSubImage2D(...arguments)}catch(R){He("WebGLState:",R)}}function k(){try{n.texSubImage3D(...arguments)}catch(R){He("WebGLState:",R)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(R){He("WebGLState:",R)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(R){He("WebGLState:",R)}}function ce(){try{n.texStorage2D(...arguments)}catch(R){He("WebGLState:",R)}}function de(){try{n.texStorage3D(...arguments)}catch(R){He("WebGLState:",R)}}function Z(){try{n.texImage2D(...arguments)}catch(R){He("WebGLState:",R)}}function ee(){try{n.texImage3D(...arguments)}catch(R){He("WebGLState:",R)}}function fe(R){return d[R]!==void 0?d[R]:n.getParameter(R)}function Re(R,pe){d[R]!==pe&&(n.pixelStorei(R,pe),d[R]=pe)}function ge(R){Pt.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),Pt.copy(R))}function he(R){at.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),at.copy(R))}function Ne(R,pe){let J=l.get(pe);J===void 0&&(J=new WeakMap,l.set(pe,J));let me=J.get(R);me===void 0&&(me=n.getUniformBlockIndex(pe,R.name),J.set(R,me))}function Fe(R,pe){let me=l.get(pe).get(R);c.get(pe)!==me&&(n.uniformBlockBinding(pe,me,R.__bindingPointIndex),c.set(pe,me))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,se={},f={},h=new WeakMap,m=[],_=null,g=!1,p=null,b=null,D=null,E=null,M=null,S=null,C=null,y=new we(0,0,0),w=0,A=!1,L=null,F=null,z=null,O=null,H=null,Pt.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ne,disable:Te,bindFramebuffer:qe,drawBuffers:Me,useProgram:Je,setBlending:ht,setMaterial:Lt,setFlipSided:rt,setCullFace:Bt,setLineWidth:mn,setPolygonOffset:Xn,setScissorTest:Vt,activeTexture:Qt,bindTexture:P,unbindTexture:Tn,compressedTexImage2D:Mt,compressedTexImage3D:T,texImage2D:Z,texImage3D:ee,pixelStorei:Re,getParameter:fe,updateUBOMapping:Ne,uniformBlockBinding:Fe,texStorage2D:ce,texStorage3D:de,texSubImage2D:v,texSubImage3D:k,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:ge,viewport:he,reset:Ye}}function jP(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,u=new WeakMap,d=new Set,f,h=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return m?new OffscreenCanvas(T,v):qc("canvas")}function g(T,v,k){let V=1,q=Mt(T);if((q.width>k||q.height>k)&&(V=k/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ce=Math.floor(V*q.width),de=Math.floor(V*q.height);f===void 0&&(f=_(ce,de));let Z=v?_(ce,de):f;return Z.width=ce,Z.height=de,Z.getContext("2d").drawImage(T,0,0,ce,de),Ue("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ce+"x"+de+")."),Z}else return"data"in T&&Ue("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),T;return T}function p(T){return T.generateMipmaps}function b(T){n.generateMipmap(T)}function D(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,v,k,V,q,ce=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let de;V&&(de=e.get("EXT_texture_norm16"),de||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=v;if(v===n.RED&&(k===n.FLOAT&&(Z=n.R32F),k===n.HALF_FLOAT&&(Z=n.R16F),k===n.UNSIGNED_BYTE&&(Z=n.R8),k===n.UNSIGNED_SHORT&&de&&(Z=de.R16_EXT),k===n.SHORT&&de&&(Z=de.R16_SNORM_EXT)),v===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(Z=n.R8UI),k===n.UNSIGNED_SHORT&&(Z=n.R16UI),k===n.UNSIGNED_INT&&(Z=n.R32UI),k===n.BYTE&&(Z=n.R8I),k===n.SHORT&&(Z=n.R16I),k===n.INT&&(Z=n.R32I)),v===n.RG&&(k===n.FLOAT&&(Z=n.RG32F),k===n.HALF_FLOAT&&(Z=n.RG16F),k===n.UNSIGNED_BYTE&&(Z=n.RG8),k===n.UNSIGNED_SHORT&&de&&(Z=de.RG16_EXT),k===n.SHORT&&de&&(Z=de.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(Z=n.RG8UI),k===n.UNSIGNED_SHORT&&(Z=n.RG16UI),k===n.UNSIGNED_INT&&(Z=n.RG32UI),k===n.BYTE&&(Z=n.RG8I),k===n.SHORT&&(Z=n.RG16I),k===n.INT&&(Z=n.RG32I)),v===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),k===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),k===n.UNSIGNED_INT&&(Z=n.RGB32UI),k===n.BYTE&&(Z=n.RGB8I),k===n.SHORT&&(Z=n.RGB16I),k===n.INT&&(Z=n.RGB32I)),v===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),k===n.UNSIGNED_INT&&(Z=n.RGBA32UI),k===n.BYTE&&(Z=n.RGBA8I),k===n.SHORT&&(Z=n.RGBA16I),k===n.INT&&(Z=n.RGBA32I)),v===n.RGB&&(k===n.UNSIGNED_SHORT&&de&&(Z=de.RGB16_EXT),k===n.SHORT&&de&&(Z=de.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),v===n.RGBA){let ee=ce?jc:Qe.getTransfer(q);k===n.FLOAT&&(Z=n.RGBA32F),k===n.HALF_FLOAT&&(Z=n.RGBA16F),k===n.UNSIGNED_BYTE&&(Z=ee===gt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&de&&(Z=de.RGBA16_EXT),k===n.SHORT&&de&&(Z=de.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function M(T,v){let k;return T?v===null||v===Zi||v===Ia?k=n.DEPTH24_STENCIL8:v===xi?k=n.DEPTH32F_STENCIL8:v===Aa&&(k=n.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zi||v===Ia?k=n.DEPTH_COMPONENT24:v===xi?k=n.DEPTH_COMPONENT32F:v===Aa&&(k=n.DEPTH_COMPONENT16),k}function S(T,v){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Jt&&T.minFilter!==dn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function C(T){let v=T.target;v.removeEventListener("dispose",C),w(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function y(T){let v=T.target;v.removeEventListener("dispose",y),L(v)}function w(T){let v=i.get(T);if(v.__webglInit===void 0)return;let k=T.source,V=h.get(k);if(V){let q=V[v.__cacheKey];q.usedTimes--,q.usedTimes===0&&A(T),Object.keys(V).length===0&&h.delete(k)}i.remove(T)}function A(T){let v=i.get(T);n.deleteTexture(v.__webglTexture);let k=T.source,V=h.get(k);delete V[v.__cacheKey],o.memory.textures--}function L(T){let v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let q=0;q<v.__webglFramebuffer[V].length;q++)n.deleteFramebuffer(v.__webglFramebuffer[V][q]);else n.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)n.deleteFramebuffer(v.__webglFramebuffer[V]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let k=T.textures;for(let V=0,q=k.length;V<q;V++){let ce=i.get(k[V]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),o.memory.textures--),i.remove(k[V])}i.remove(T)}let F=0;function z(){F=0}function O(){return F}function H(T){F=T}function K(){let T=F;return T>=r.maxTextures&&Ue("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+r.maxTextures),F+=1,T}function j(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function ae(T,v){let k=i.get(T);if(T.isVideoTexture&&P(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&k.__version!==T.version){let V=T.image;if(V===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(k,T,v);return}}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+v)}function X(T,v){let k=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Te(k,T,v);return}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+v)}function ie(T,v){let k=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Te(k,T,v);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+v)}function se(T,v){let k=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&k.__version!==T.version){qe(k,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+v)}let Oe={[Wn]:n.REPEAT,[dr]:n.CLAMP_TO_EDGE,[af]:n.MIRRORED_REPEAT},Pe={[Jt]:n.NEAREST,[kb]:n.NEAREST_MIPMAP_NEAREST,[Cl]:n.NEAREST_MIPMAP_LINEAR,[dn]:n.LINEAR,[Rf]:n.LINEAR_MIPMAP_NEAREST,[ms]:n.LINEAR_MIPMAP_LINEAR},Pt={[Vb]:n.NEVER,[qb]:n.ALWAYS,[zb]:n.LESS,[mh]:n.LEQUAL,[Gb]:n.EQUAL,[gh]:n.GEQUAL,[Wb]:n.GREATER,[jb]:n.NOTEQUAL};function at(T,v){if(v.type===xi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===dn||v.magFilter===Rf||v.magFilter===Cl||v.magFilter===ms||v.minFilter===dn||v.minFilter===Rf||v.minFilter===Cl||v.minFilter===ms)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Oe[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Oe[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Oe[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Pe[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Pe[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Pt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Jt||v.minFilter!==Cl&&v.minFilter!==ms||v.type===xi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function yt(T,v){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",C));let V=v.source,q=h.get(V);q===void 0&&(q={},h.set(V,q));let ce=j(v);if(ce!==T.__cacheKey){q[ce]===void 0&&(q[ce]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),q[ce].usedTimes++;let de=q[T.__cacheKey];de!==void 0&&(q[T.__cacheKey].usedTimes--,de.usedTimes===0&&A(v)),T.__cacheKey=ce,T.__webglTexture=q[ce].texture}return k}function Y(T,v,k){return Math.floor(Math.floor(T/k)/v)}function ne(T,v,k,V){let ce=T.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,k,V,v.data);else{ce.sort((Re,ge)=>Re.start-ge.start);let de=0;for(let Re=1;Re<ce.length;Re++){let ge=ce[de],he=ce[Re],Ne=ge.start+ge.count,Fe=Y(he.start,v.width,4),Ye=Y(ge.start,v.width,4);he.start<=Ne+1&&Fe===Ye&&Y(he.start+he.count-1,v.width,4)===Fe?ge.count=Math.max(ge.count,he.start+he.count-ge.start):(++de,ce[de]=he)}ce.length=de+1;let Z=t.getParameter(n.UNPACK_ROW_LENGTH),ee=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Re=0,ge=ce.length;Re<ge;Re++){let he=ce[Re],Ne=Math.floor(he.start/4),Fe=Math.ceil(he.count/4),Ye=Ne%v.width,R=Math.floor(Ne/v.width),pe=Fe,J=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(n.UNPACK_SKIP_ROWS,R),t.texSubImage2D(n.TEXTURE_2D,0,Ye,R,pe,J,k,V,v.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Z),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function Te(T,v,k){let V=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=n.TEXTURE_3D);let q=yt(T,v),ce=v.source;t.bindTexture(V,T.__webglTexture,n.TEXTURE0+k);let de=i.get(ce);if(ce.version!==de.__version||q===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let J=Qe.getPrimaries(Qe.workingColorSpace),me=v.colorSpace===Ur?null:Qe.getPrimaries(v.colorSpace),_e=v.colorSpace===Ur||J===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=g(v.image,!1,r.maxTextureSize);ee=Tn(v,ee);let fe=s.convert(v.format,v.colorSpace),Re=s.convert(v.type),ge=E(v.internalFormat,fe,Re,v.normalized,v.colorSpace,v.isVideoTexture);at(V,v);let he,Ne=v.mipmaps,Fe=v.isVideoTexture!==!0,Ye=de.__version===void 0||q===!0,R=ce.dataReady,pe=S(v,ee);if(v.isDepthTexture)ge=M(v.format===gs,v.type),Ye&&(Fe?t.texStorage2D(n.TEXTURE_2D,1,ge,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,ge,ee.width,ee.height,0,fe,Re,null));else if(v.isDataTexture)if(Ne.length>0){Fe&&Ye&&t.texStorage2D(n.TEXTURE_2D,pe,ge,Ne[0].width,Ne[0].height);for(let J=0,me=Ne.length;J<me;J++)he=Ne[J],Fe?R&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,he.width,he.height,fe,Re,he.data):t.texImage2D(n.TEXTURE_2D,J,ge,he.width,he.height,0,fe,Re,he.data);v.generateMipmaps=!1}else Fe?(Ye&&t.texStorage2D(n.TEXTURE_2D,pe,ge,ee.width,ee.height),R&&ne(v,ee,fe,Re)):t.texImage2D(n.TEXTURE_2D,0,ge,ee.width,ee.height,0,fe,Re,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Fe&&Ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ge,Ne[0].width,Ne[0].height,ee.depth);for(let J=0,me=Ne.length;J<me;J++)if(he=Ne[J],v.format!==_i)if(fe!==null)if(Fe){if(R)if(v.layerUpdates.size>0){let _e=Q0(he.width,he.height,v.format,v.type);for(let re of v.layerUpdates){let Le=he.data.subarray(re*_e/he.data.BYTES_PER_ELEMENT,(re+1)*_e/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,re,he.width,he.height,1,fe,Le)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,ee.depth,fe,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,ge,he.width,he.height,ee.depth,0,he.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?R&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,ee.depth,fe,Re,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,ge,he.width,he.height,ee.depth,0,fe,Re,he.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Fe&&Ye&&t.texStorage2D(n.TEXTURE_2D,pe,ge,Ne[0].width,Ne[0].height);for(let J=0,me=Ne.length;J<me;J++)he=Ne[J],v.format!==_i?fe!==null?Fe?R&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(n.TEXTURE_2D,J,ge,he.width,he.height,0,he.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?R&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,he.width,he.height,fe,Re,he.data):t.texImage2D(n.TEXTURE_2D,J,ge,he.width,he.height,0,fe,Re,he.data)}else if(v.isDataArrayTexture)if(Fe){if(Ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ge,ee.width,ee.height,ee.depth),R)if(v.layerUpdates.size>0){let J=Q0(ee.width,ee.height,v.format,v.type);for(let me of v.layerUpdates){let _e=ee.data.subarray(me*J/ee.data.BYTES_PER_ELEMENT,(me+1)*J/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,ee.width,ee.height,1,fe,Re,_e)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,Re,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,ee.width,ee.height,ee.depth,0,fe,Re,ee.data);else if(v.isData3DTexture)Fe?(Ye&&t.texStorage3D(n.TEXTURE_3D,pe,ge,ee.width,ee.height,ee.depth),R&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,Re,ee.data)):t.texImage3D(n.TEXTURE_3D,0,ge,ee.width,ee.height,ee.depth,0,fe,Re,ee.data);else if(v.isFramebufferTexture){if(Ye)if(Fe)t.texStorage2D(n.TEXTURE_2D,pe,ge,ee.width,ee.height);else{let J=ee.width,me=ee.height;for(let _e=0;_e<pe;_e++)t.texImage2D(n.TEXTURE_2D,_e,ge,J,me,0,fe,Re,null),J>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),ee.parentNode!==J){J.appendChild(ee),d.add(v),J.onpaint=me=>{let _e=me.changedElements;for(let re of d)_e.includes(re.image)&&(re.needsUpdate=!0)},J.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ee);else{let _e=n.RGBA,re=n.RGBA,Le=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,_e,re,Le,ee)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Fe&&Ye){let J=Mt(Ne[0]);t.texStorage2D(n.TEXTURE_2D,pe,ge,J.width,J.height)}for(let J=0,me=Ne.length;J<me;J++)he=Ne[J],Fe?R&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,fe,Re,he):t.texImage2D(n.TEXTURE_2D,J,ge,fe,Re,he);v.generateMipmaps=!1}else if(Fe){if(Ye){let J=Mt(ee);t.texStorage2D(n.TEXTURE_2D,pe,ge,J.width,J.height)}R&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Re,ee)}else t.texImage2D(n.TEXTURE_2D,0,ge,fe,Re,ee);p(v)&&b(V),de.__version=ce.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function qe(T,v,k){if(v.image.length!==6)return;let V=yt(T,v),q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+k);let ce=i.get(q);if(q.version!==ce.__version||V===!0){t.activeTexture(n.TEXTURE0+k);let de=Qe.getPrimaries(Qe.workingColorSpace),Z=v.colorSpace===Ur?null:Qe.getPrimaries(v.colorSpace),ee=v.colorSpace===Ur||de===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Re=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let re=0;re<6;re++)!fe&&!Re?ge[re]=g(v.image[re],!0,r.maxCubemapSize):ge[re]=Re?v.image[re].image:v.image[re],ge[re]=Tn(v,ge[re]);let he=ge[0],Ne=s.convert(v.format,v.colorSpace),Fe=s.convert(v.type),Ye=E(v.internalFormat,Ne,Fe,v.normalized,v.colorSpace),R=v.isVideoTexture!==!0,pe=ce.__version===void 0||V===!0,J=q.dataReady,me=S(v,he);at(n.TEXTURE_CUBE_MAP,v);let _e;if(fe){R&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,he.width,he.height);for(let re=0;re<6;re++){_e=ge[re].mipmaps;for(let Le=0;Le<_e.length;Le++){let Ae=_e[Le];v.format!==_i?Ne!==null?R?J&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ae.width,Ae.height,Ne,Ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,Ye,Ae.width,Ae.height,0,Ae.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ae.width,Ae.height,Ne,Fe,Ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,Ye,Ae.width,Ae.height,0,Ne,Fe,Ae.data)}}}else{if(_e=v.mipmaps,R&&pe){_e.length>0&&me++;let re=Mt(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,re.width,re.height)}for(let re=0;re<6;re++)if(Re){R?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ge[re].width,ge[re].height,Ne,Fe,ge[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ye,ge[re].width,ge[re].height,0,Ne,Fe,ge[re].data);for(let Le=0;Le<_e.length;Le++){let Ot=_e[Le].image[re].image;R?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,Ot.width,Ot.height,Ne,Fe,Ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,Ye,Ot.width,Ot.height,0,Ne,Fe,Ot.data)}}else{R?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ne,Fe,ge[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ye,Ne,Fe,ge[re]);for(let Le=0;Le<_e.length;Le++){let Ae=_e[Le];R?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,Ne,Fe,Ae.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,Ye,Ne,Fe,Ae.image[re])}}}p(v)&&b(n.TEXTURE_CUBE_MAP),ce.__version=q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Me(T,v,k,V,q,ce){let de=s.convert(k.format,k.colorSpace),Z=s.convert(k.type),ee=E(k.internalFormat,de,Z,k.normalized,k.colorSpace),fe=i.get(v),Re=i.get(k);if(Re.__renderTarget=v,!fe.__hasExternalTextures){let ge=Math.max(1,v.width>>ce),he=Math.max(1,v.height>>ce);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,ce,ee,ge,he,v.depth,0,de,Z,null):t.texImage2D(q,ce,ee,ge,he,0,de,Z,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Qt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,q,Re.__webglTexture,0,Vt(v)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,q,Re.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Je(T,v,k){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){let V=v.depthTexture,q=V&&V.isDepthTexture?V.type:null,ce=M(v.stencilBuffer,q),de=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Qt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Vt(v),ce,v.width,v.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt(v),ce,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ce,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,T)}else{let V=v.textures;for(let q=0;q<V.length;q++){let ce=V[q],de=s.convert(ce.format,ce.colorSpace),Z=s.convert(ce.type),ee=E(ce.internalFormat,de,Z,ce.normalized,ce.colorSpace);Qt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Vt(v),ee,v.width,v.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt(v),ee,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ee,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function an(T,v,k){let V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=i.get(v.depthTexture);if(q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),at(n.TEXTURE_CUBE_MAP,v.depthTexture);let fe=s.convert(v.depthTexture.format),Re=s.convert(v.depthTexture.type),ge;v.depthTexture.format===fr?ge=n.DEPTH_COMPONENT24:v.depthTexture.format===gs&&(ge=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ge,v.width,v.height,0,fe,Re,null)}}else ae(v.depthTexture,0);let ce=q.__webglTexture,de=Vt(v),Z=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,ee=v.depthTexture.format===gs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===fr)Qt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Z,ce,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Z,ce,0);else if(v.depthTexture.format===gs)Qt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Z,ce,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Z,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(T){let v=i.get(T),k=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let V=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){let q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),v.__depthDisposeCallback=q}v.__boundDepthTexture=V}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(k)for(let V=0;V<6;V++)an(v.__webglFramebuffer[V],T,V);else{let V=T.texture.mipmaps;V&&V.length>0?an(v.__webglFramebuffer[0],T,0):an(v.__webglFramebuffer,T,0)}else if(k){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=n.createRenderbuffer(),Je(v.__webglDepthbuffer[V],T,!1);else{let q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ce)}}else{let V=T.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Je(v.__webglDepthbuffer,T,!1);else{let q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(T,v,k){let V=i.get(T);v!==void 0&&Me(V.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&tt(T)}function Lt(T){let v=T.texture,k=i.get(T),V=i.get(v);T.addEventListener("dispose",y);let q=T.textures,ce=T.isWebGLCubeRenderTarget===!0,de=q.length>1;if(de||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=v.version,o.memory.textures++),ce){k.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[Z]=[];for(let ee=0;ee<v.mipmaps.length;ee++)k.__webglFramebuffer[Z][ee]=n.createFramebuffer()}else k.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let Z=0;Z<v.mipmaps.length;Z++)k.__webglFramebuffer[Z]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(de)for(let Z=0,ee=q.length;Z<ee;Z++){let fe=i.get(q[Z]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&Qt(T)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Z=0;Z<q.length;Z++){let ee=q[Z];k.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[Z]);let fe=s.convert(ee.format,ee.colorSpace),Re=s.convert(ee.type),ge=E(ee.internalFormat,fe,Re,ee.normalized,ee.colorSpace,T.isXRRenderTarget===!0),he=Vt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ge,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,k.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),Je(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),at(n.TEXTURE_CUBE_MAP,v);for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Me(k.__webglFramebuffer[Z][ee],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ee);else Me(k.__webglFramebuffer[Z],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(v)&&b(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let Z=0,ee=q.length;Z<ee;Z++){let fe=q[Z],Re=i.get(fe),ge=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ge=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,Re.__webglTexture),at(ge,fe),Me(k.__webglFramebuffer,T,fe,n.COLOR_ATTACHMENT0+Z,ge,0),p(fe)&&b(ge)}t.unbindTexture()}else{let Z=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Z=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Z,V.__webglTexture),at(Z,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Me(k.__webglFramebuffer[ee],T,v,n.COLOR_ATTACHMENT0,Z,ee);else Me(k.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,Z,0);p(v)&&b(Z),t.unbindTexture()}T.depthBuffer&&tt(T)}function rt(T){let v=T.textures;for(let k=0,V=v.length;k<V;k++){let q=v[k];if(p(q)){let ce=D(T),de=i.get(q).__webglTexture;t.bindTexture(ce,de),b(ce),t.unbindTexture()}}}let Bt=[],mn=[];function Xn(T){if(T.samples>0){if(Qt(T)===!1){let v=T.textures,k=T.width,V=T.height,q=n.COLOR_BUFFER_BIT,ce=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(T),Z=v.length>1;if(Z)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);let ee=T.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[fe]);let Re=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Re,0)}n.blitFramebuffer(0,0,k,V,0,0,k,V,q,n.NEAREST),c===!0&&(Bt.length=0,mn.length=0,Bt.push(n.COLOR_ATTACHMENT0+fe),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(Bt.push(ce),mn.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,mn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,de.__webglColorRenderbuffer[fe]);let Re=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){let v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Vt(T){return Math.min(r.maxSamples,T.samples)}function Qt(T){let v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function P(T){let v=o.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function Tn(T,v){let k=T.colorSpace,V=T.format,q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Wc&&k!==Ur&&(Qe.getTransfer(k)===gt?(V!==_i||q!==Qn)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",k)),v}function Mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=K,this.resetTextureUnits=z,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=ae,this.setTexture2DArray=X,this.setTexture3D=ie,this.setTextureCube=se,this.rebindTextures=ht,this.setupRenderTarget=Lt,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Xn,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Qt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function qP(n,e){function t(i,r=Ur){let s,o=Qe.getTransfer(r);if(i===Qn)return n.UNSIGNED_BYTE;if(i===Pf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Lf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===G0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===W0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===V0)return n.BYTE;if(i===z0)return n.SHORT;if(i===Aa)return n.UNSIGNED_SHORT;if(i===Nf)return n.INT;if(i===Zi)return n.UNSIGNED_INT;if(i===xi)return n.FLOAT;if(i===on)return n.HALF_FLOAT;if(i===j0)return n.ALPHA;if(i===q0)return n.RGB;if(i===_i)return n.RGBA;if(i===fr)return n.DEPTH_COMPONENT;if(i===gs)return n.DEPTH_STENCIL;if(i===Of)return n.RED;if(i===Ff)return n.RED_INTEGER;if(i===vs)return n.RG;if(i===kf)return n.RG_INTEGER;if(i===Uf)return n.RGBA_INTEGER;if(i===Dl||i===Al||i===Il||i===Rl)if(o===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Dl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Dl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Il)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bf||i===Hf||i===Vf||i===zf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Bf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===zf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gf||i===Wf||i===jf||i===qf||i===Xf||i===Nl||i===Yf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Gf||i===Wf)return o===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===jf)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===qf)return s.COMPRESSED_R11_EAC;if(i===Xf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Nl)return s.COMPRESSED_RG11_EAC;if(i===Yf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Zf||i===$f||i===Kf||i===Jf||i===Qf||i===eh||i===th||i===nh||i===ih||i===rh||i===sh||i===oh||i===ah||i===ch)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Zf)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$f)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Kf)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jf)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qf)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===eh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===th)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ih)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===rh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===oh)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ah)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ch)return o===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lh||i===uh||i===dh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===lh)return o===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fh||i===hh||i===Pl||i===ph)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===fh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===hh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ph)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ia?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var XP=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,YP=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ol(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Nt({vertexShader:XP,fragmentShader:YP,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new te(new sn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pv=class extends hr{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,m=null,_=typeof XRWebGLBinding<"u",g=new hv,p={},b=t.getContextAttributes(),D=null,E=null,M=[],S=[],C=new Ee,y=null,w=null,A=new yn;A.viewport=new Ht;let L=new yn;L.viewport=new Ht;let F=[A,L],z=new Tf,O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ne=M[Y];return ne===void 0&&(ne=new Ea,M[Y]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Y){let ne=M[Y];return ne===void 0&&(ne=new Ea,M[Y]=ne),ne.getGripSpace()},this.getHand=function(Y){let ne=M[Y];return ne===void 0&&(ne=new Ea,M[Y]=ne),ne.getHandSpace()};function K(Y){let ne=S.indexOf(Y.inputSource);if(ne===-1)return;let Te=M[ne];Te!==void 0&&(Te.update(Y.inputSource,Y.frame,l||o),Te.dispatchEvent({type:Y.type,data:Y.inputSource}))}function j(){r.removeEventListener("select",K),r.removeEventListener("selectstart",K),r.removeEventListener("selectend",K),r.removeEventListener("squeeze",K),r.removeEventListener("squeezestart",K),r.removeEventListener("squeezeend",K),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",ae);for(let Y=0;Y<M.length;Y++){let ne=S[Y];ne!==null&&(S[Y]=null,M[Y].disconnect(ne))}O=null,H=null,g.reset();for(let Y in p)delete p[Y];if(e.setRenderTarget(D),h=null,f=null,d=null,r=null,E=null,yt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),w!==null){let Y=w.camera;Y.fov=w.fov,Y.zoom=w.zoom,Y.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(D=e.getRenderTarget(),r.addEventListener("select",K),r.addEventListener("selectstart",K),r.addEventListener("selectend",K),r.addEventListener("squeeze",K),r.addEventListener("squeezestart",K),r.addEventListener("squeezeend",K),r.addEventListener("end",j),r.addEventListener("inputsourceschange",ae),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,qe=null,Me=null;b.depth&&(Me=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=b.stencil?gs:fr,qe=b.stencil?Ia:Zi);let Je={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Je),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Gt(f.textureWidth,f.textureHeight,{format:_i,type:Qn,depthTexture:new cs(f.textureWidth,f.textureHeight,qe,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Te={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,Te),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),E=new Gt(h.framebufferWidth,h.framebufferHeight,{format:_i,type:Qn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),yt.setContext(r),yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(Y){for(let ne=0;ne<Y.removed.length;ne++){let Te=Y.removed[ne],qe=S.indexOf(Te);qe>=0&&(S[qe]=null,M[qe].disconnect(Te))}for(let ne=0;ne<Y.added.length;ne++){let Te=Y.added[ne],qe=S.indexOf(Te);if(qe===-1){for(let Je=0;Je<M.length;Je++)if(Je>=S.length){S.push(Te),qe=Je;break}else if(S[Je]===null){S[Je]=Te,qe=Je;break}if(qe===-1)break}let Me=M[qe];Me&&Me.connect(Te)}}let X=new N,ie=new N;function se(Y,ne,Te){X.setFromMatrixPosition(ne.matrixWorld),ie.setFromMatrixPosition(Te.matrixWorld);let qe=X.distanceTo(ie),Me=ne.projectionMatrix.elements,Je=Te.projectionMatrix.elements,an=Me[14]/(Me[10]-1),tt=Me[14]/(Me[10]+1),ht=(Me[9]+1)/Me[5],Lt=(Me[9]-1)/Me[5],rt=(Me[8]-1)/Me[0],Bt=(Je[8]+1)/Je[0],mn=an*rt,Xn=an*Bt,Vt=qe/(-rt+Bt),Qt=Vt*-rt;if(ne.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Qt),Y.translateZ(Vt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Me[10]===-1)Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let P=an+Vt,Tn=tt+Vt,Mt=mn-Qt,T=Xn+(qe-Qt),v=ht*tt/Tn*P,k=Lt*tt/Tn*P;Y.projectionMatrix.makePerspective(Mt,T,v,k,P,Tn),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Oe(Y,ne){ne===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ne.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let ne=Y.near,Te=Y.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(Te=g.depthFar)),z.near=L.near=A.near=ne,z.far=L.far=A.far=Te,(O!==z.near||H!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),O=z.near,H=z.far),z.layers.mask=Y.layers.mask|6,A.layers.mask=z.layers.mask&-5,L.layers.mask=z.layers.mask&-3;let qe=Y.parent,Me=z.cameras;Oe(z,qe);for(let Je=0;Je<Me.length;Je++)Oe(Me[Je],qe);Me.length===2?se(z,A,L):z.projectionMatrix.copy(A.projectionMatrix),w===null&&Y.isPerspectiveCamera&&(w={camera:Y,fov:Y.fov,zoom:Y.zoom}),Pe(Y,z,qe)};function Pe(Y,ne,Te){Te===null?Y.matrix.copy(ne.matrixWorld):(Y.matrix.copy(Te.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ne.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=no*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(z)},this.getCameraTexture=function(Y){return p[Y]};let Pt=null;function at(Y,ne){if(u=ne.getViewerPose(l||o),m=ne,u!==null){let Te=u.views;h!==null&&(e.setRenderTargetFramebuffer(E,h.framebuffer),e.setRenderTarget(E));let qe=!1;Te.length!==z.cameras.length&&(z.cameras.length=0,qe=!0);for(let tt=0;tt<Te.length;tt++){let ht=Te[tt],Lt=null;if(h!==null)Lt=h.getViewport(ht);else{let Bt=d.getViewSubImage(f,ht);Lt=Bt.viewport,tt===0&&(e.setRenderTargetTextures(E,Bt.colorTexture,Bt.depthStencilTexture),e.setRenderTarget(E))}let rt=F[tt];rt===void 0&&(rt=new yn,rt.layers.enable(tt),rt.viewport=new Ht,F[tt]=rt),rt.matrix.fromArray(ht.transform.matrix),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.projectionMatrix.fromArray(ht.projectionMatrix),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert(),rt.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),tt===0&&(z.matrix.copy(rt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),qe===!0&&z.cameras.push(rt)}let Me=r.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let tt=d.getDepthInformation(Te[0]);tt&&tt.isValid&&tt.texture&&g.init(tt,r.renderState)}if(Me&&Me.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let tt=0;tt<Te.length;tt++){let ht=Te[tt].camera;if(ht){let Lt=p[ht];Lt||(Lt=new ol,p[ht]=Lt);let rt=d.getCameraImage(ht);Lt.sourceTexture=rt}}}}for(let Te=0;Te<M.length;Te++){let qe=S[Te],Me=M[Te];qe!==null&&Me!==void 0&&Me.update(qe,ne,l||o)}Pt&&Pt(Y,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),m=null}let yt=new EM;yt.setAnimationLoop(at),this.setAnimationLoop=function(Y){Pt=Y},this.dispose=function(){}}},ZP=new At,CM=new je;CM.set(-1,0,0,0,1,0,0,0,1);function $P(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,$0(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,b,D,E){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),d(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),f(g,p),p.isMeshPhysicalMaterial&&h(g,p,E)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,b,D):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===fn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===fn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let b=e.get(p),D=b.envMap,E=b.envMapRotation;D&&(g.envMap.value=D,g.envMapRotation.value.setFromMatrix4(ZP.makeRotationFromEuler(E)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(CM),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,b,D){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=D*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let b=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function KP(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,M){let S=M.program;i.uniformBlockBinding(E,S)}function l(E,M){let S=r[E.id];S===void 0&&(g(E),S=u(E),r[E.id]=S,E.addEventListener("dispose",b));let C=M.program;i.updateUBOMapping(E,C);let y=e.render.frame;s[E.id]!==y&&(f(E),s[E.id]=y)}function u(E){let M=d();E.__bindingPointIndex=M;let S=n.createBuffer(),C=E.__size,y=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,S),S}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){let M=r[E.id],S=E.uniforms,C=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let y=0,w=S.length;y<w;y++){let A=S[y];if(Array.isArray(A))for(let L=0,F=A.length;L<F;L++)h(A[L],y,L,C);else h(A,y,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(E,M,S,C){if(_(E,M,S,C)===!0){let y=E.__offset,w=E.value;if(Array.isArray(w)){let A=0;for(let L=0;L<w.length;L++){let F=w[L],z=p(F);m(F,E.__data,A),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(A+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,E.__data)}}function m(E,M,S){typeof E=="number"||typeof E=="boolean"?M[0]=E:E.isMatrix3?(M[0]=E.elements[0],M[1]=E.elements[1],M[2]=E.elements[2],M[3]=0,M[4]=E.elements[3],M[5]=E.elements[4],M[6]=E.elements[5],M[7]=0,M[8]=E.elements[6],M[9]=E.elements[7],M[10]=E.elements[8],M[11]=0):ArrayBuffer.isView(E)?M.set(new E.constructor(E.buffer,E.byteOffset,M.length)):E.toArray(M,S)}function _(E,M,S,C){let y=E.value,w=M+"_"+S;if(C[w]===void 0)return typeof y=="number"||typeof y=="boolean"?C[w]=y:ArrayBuffer.isView(y)?C[w]=y.slice():C[w]=y.clone(),!0;{let A=C[w];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return C[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(A.equals(y)===!1)return A.copy(y),!0}}return!1}function g(E){let M=E.uniforms,S=0,C=16;for(let w=0,A=M.length;w<A;w++){let L=Array.isArray(M[w])?M[w]:[M[w]];for(let F=0,z=L.length;F<z;F++){let O=L[F],H=Array.isArray(O.value)?O.value:[O.value];for(let K=0,j=H.length;K<j;K++){let ae=H[K],X=p(ae),ie=S%C,se=ie%X.boundary,Oe=ie+se;S+=se,Oe!==0&&C-Oe<X.storage&&(S+=C-Oe),O.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=X.storage}}}let y=S%C;return y>0&&(S+=C-y),E.__size=S,E.__cache={},this}function p(E){let M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(M.boundary=16,M.storage=E.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",E),M}function b(E){let M=E.target;M.removeEventListener("dispose",b);let S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function D(){for(let E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:c,update:l,dispose:D}}var JP=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),vr=null;function QP(){return vr===null&&(vr=new nl(JP,16,16,vs,on),vr.name="DFG_LUT",vr.minFilter=dn,vr.magFilter=dn,vr.wrapS=dr,vr.wrapT=dr,vr.generateMipmaps=!1,vr.needsUpdate=!0),vr}var _h=class{constructor(e={}){let{canvas:t=Xb(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=Qn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;let _=h,g=new Set([Uf,kf,Ff]),p=new Set([Qn,Zi,Aa,Ia,Pf,Lf]),b=new Uint32Array(4),D=new Int32Array(4),E=new N,M=null,S=null,C=[],y=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,L=!1,F=null,z=null,O=null,H=null;this._outputColorSpace=zt;let K=0,j=0,ae=null,X=-1,ie=null,se=new Ht,Oe=new Ht,Pe=null,Pt=new we(0),at=0,yt=t.width,Y=t.height,ne=1,Te=null,qe=null,Me=new Ht(0,0,yt,Y),Je=new Ht(0,0,yt,Y),an=!1,tt=new Ma,ht=!1,Lt=!1,rt=new At,Bt=new N,mn=new Ht,Xn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Vt=!1;function Qt(){return ae===null?ne:1}let P=i;function Tn(x,I){return t.getContext(x,I)}let Mt,T,v,k,V,q,ce,de,Z,ee,fe,Re,ge,he,Ne,Fe,Ye,R,pe,J,me,_e,re;try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ot,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",wi,!1),P===null){let I="webgl2";if(P=Tn(I,x),P===null)throw Tn(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(x){throw t.removeEventListener("webglcontextlost",Ot,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",wi,!1),He("WebGLRenderer: "+x.message),x}function Le(){Mt=new oN(P),Mt.init(),me=new qP(P,Mt),T=new $2(P,Mt,e,me),v=new WP(P,Mt),T.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),z=P.createFramebuffer(),O=P.createFramebuffer(),H=P.createFramebuffer(),k=new lN(P),V=new IP,q=new jP(P,Mt,v,V,T,me,k),ce=new sN(A),de=new dI(P),_e=new Y2(P,de),Z=new aN(P,de,k,_e),ee=new dN(P,Z,de,_e,k),R=new uN(P,T,q),Ne=new K2(V),fe=new AP(A,ce,Mt,T,_e,Ne),Re=new $P(A,V),ge=new NP,he=new UP(Mt),Ye=new X2(A,ce,v,ee,m,c),Fe=new GP(A,ee,T),re=new KP(P,k,T,v),pe=new Z2(P,Mt,k),J=new cN(P,Mt,k),k.programs=fe.programs,A.capabilities=T,A.extensions=Mt,A.properties=V,A.renderLists=ge,A.shadowMap=Fe,A.state=v,A.info=k}_!==Qn&&(w=new hN(_,t.width,t.height,a,r,s));let Ae=new pv(A,P);this.xr=Ae,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let x=Mt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Mt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(x){x!==void 0&&(ne=x,this.setSize(yt,Y,!1))},this.getSize=function(x){return x.set(yt,Y)},this.setSize=function(x,I,G=!0){if(Ae.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}yt=x,Y=I,t.width=Math.floor(x*ne),t.height=Math.floor(I*ne),G===!0&&(t.style.width=x+"px",t.style.height=I+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,x,I)},this.getDrawingBufferSize=function(x){return x.set(yt*ne,Y*ne).floor()},this.setDrawingBufferSize=function(x,I,G){yt=x,Y=I,ne=G,t.width=Math.floor(x*G),t.height=Math.floor(I*G),this.setViewport(0,0,x,I)},this.setEffects=function(x){if(_===Qn){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let I=0;I<x.length;I++)if(x[I].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(se)},this.getViewport=function(x){return x.copy(Me)},this.setViewport=function(x,I,G,U){x.isVector4?Me.set(x.x,x.y,x.z,x.w):Me.set(x,I,G,U),v.viewport(se.copy(Me).multiplyScalar(ne).round())},this.getScissor=function(x){return x.copy(Je)},this.setScissor=function(x,I,G,U){x.isVector4?Je.set(x.x,x.y,x.z,x.w):Je.set(x,I,G,U),v.scissor(Oe.copy(Je).multiplyScalar(ne).round())},this.getScissorTest=function(){return an},this.setScissorTest=function(x){v.setScissorTest(an=x)},this.setOpaqueSort=function(x){Te=x},this.setTransparentSort=function(x){qe=x},this.getClearColor=function(x){return x.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(x=!0,I=!0,G=!0){let U=0;if(x){let B=!1;if(ae!==null){let xe=ae.texture.format;B=g.has(xe)}if(B){let xe=ae.texture.type,Se=p.has(xe),ye=Ye.getClearColor(),Ce=Ye.getClearAlpha(),Ie=ye.r,$e=ye.g,nt=ye.b;Se?(b[0]=Ie,b[1]=$e,b[2]=nt,b[3]=Ce,P.clearBufferuiv(P.COLOR,0,b)):(D[0]=Ie,D[1]=$e,D[2]=nt,D[3]=Ce,P.clearBufferiv(P.COLOR,0,D))}else U|=P.COLOR_BUFFER_BIT}I&&(U|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(U|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U!==0&&P.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),F=x},this.dispose=function(){t.removeEventListener("webglcontextlost",Ot,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",wi,!1),Ye.dispose(),ge.dispose(),he.dispose(),V.dispose(),ce.dispose(),ee.dispose(),_e.dispose(),re.dispose(),fe.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",wv),Ae.removeEventListener("sessionend",Tv),_s.stop()};function Ot(x){x.preventDefault(),Xc("WebGLRenderer: Context Lost."),L=!0}function _t(){Xc("WebGLRenderer: Context Restored."),L=!1;let x=k.autoReset,I=Fe.enabled,G=Fe.autoUpdate,U=Fe.needsUpdate,B=Fe.type;Le(),k.autoReset=x,Fe.enabled=I,Fe.autoUpdate=G,Fe.needsUpdate=U,Fe.type=B}function wi(x){He("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function $i(x){let I=x.target;I.removeEventListener("dispose",$i),eS(I)}function eS(x){tS(x),V.remove(x)}function tS(x){let I=V.get(x).programs;I!==void 0&&(I.forEach(function(G){fe.releaseProgram(G)}),x.isShaderMaterial&&fe.releaseShaderCache(x))}this.renderBufferDirect=function(x,I,G,U,B,xe){I===null&&(I=Xn);let Se=B.isMesh&&B.matrixWorld.determinantAffine()<0,ye=rS(x,I,G,U,B);v.setMaterial(U,Se);let Ce=G.index,Ie=1;if(U.wireframe===!0){if(Ce=Z.getWireframeAttribute(G),Ce===void 0)return;Ie=2}let $e=G.drawRange,nt=G.attributes.position,De=$e.start*Ie,Et=($e.start+$e.count)*Ie;xe!==null&&(De=Math.max(De,xe.start*Ie),Et=Math.min(Et,(xe.start+xe.count)*Ie)),Ce!==null?(De=Math.max(De,0),Et=Math.min(Et,Ce.count)):nt!=null&&(De=Math.max(De,0),Et=Math.min(Et,nt.count));let en=Et-De;if(en<0||en===1/0)return;_e.setup(B,U,ye,G,Ce);let Ut,It=pe;if(Ce!==null&&(Ut=de.get(Ce),It=J,It.setIndex(Ut)),B.isMesh)U.wireframe===!0?(v.setLineWidth(U.wireframeLinewidth*Qt()),It.setMode(P.LINES)):It.setMode(P.TRIANGLES);else if(B.isLine){let Cn=U.linewidth;Cn===void 0&&(Cn=1),v.setLineWidth(Cn*Qt()),B.isLineSegments?It.setMode(P.LINES):B.isLineLoop?It.setMode(P.LINE_LOOP):It.setMode(P.LINE_STRIP)}else B.isPoints?It.setMode(P.POINTS):B.isSprite&&It.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(Mt.get("WEBGL_multi_draw"))It.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Cn=B._multiDrawStarts,be=B._multiDrawCounts,Fn=B._multiDrawCount,lt=Ce?de.get(Ce).bytesPerElement:1,ui=V.get(U).currentProgram.getUniforms();for(let Ki=0;Ki<Fn;Ki++)ui.setValue(P,"_gl_DrawID",Ki),It.render(Cn[Ki]/lt,be[Ki])}else if(B.isInstancedMesh)It.renderInstances(De,en,B.count);else if(G.isInstancedBufferGeometry){let Cn=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,be=Math.min(G.instanceCount,Cn);It.renderInstances(De,en,be)}else It.render(De,en)};function Sv(x,I,G,U){F!==null&&x.isNodeMaterial&&F.setObject(U,x),ht===!0&&Ne.setState(x,G,!1),x.transparent===!0&&x.side===Nn&&x.forceSinglePass===!1?(x.side=fn,x.needsUpdate=!0,Xl(x,I,U),x.side=hs,x.needsUpdate=!0,Xl(x,I,U),x.side=Nn):Xl(x,I,U)}this.compile=function(x,I,G=null){G===null&&(G=x),F!==null&&F.renderStart(x,I,G),S=he.get(G),S.init(I),y.push(S),G.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(S.pushLight(B),B.castShadow&&S.pushShadow(B))}),x!==G&&x.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(S.pushLight(B),B.castShadow&&S.pushShadow(B))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),Lt=this.localClippingEnabled,ht=Ne.init(this.clippingPlanes,Lt),ht===!0&&Ne.setGlobalState(this.clippingPlanes,I),F!==null&&Fe.render(S.state.shadowsArray,G,I);let U=new Set;return x.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let xe=B.material;if(xe)if(Array.isArray(xe))for(let Se=0;Se<xe.length;Se++){let ye=xe[Se];Sv(ye,G,I,B),U.add(ye)}else Sv(xe,G,I,B),U.add(xe)}),S=y.pop(),F!==null&&F.renderEnd(),U},this.compileAsync=function(x,I,G=null){let U=this.compile(x,I,G);return new Promise(B=>{function xe(){if(U.forEach(function(Se){let Ce=V.get(Se).currentProgram;(Ce===void 0||Ce.isReady())&&U.delete(Se)}),U.size===0){B(x);return}setTimeout(xe,10)}Mt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let qh=null;function nS(x){qh&&qh(x)}function wv(){_s.stop()}function Tv(){_s.start()}let _s=new EM;_s.setAnimationLoop(nS),typeof self<"u"&&_s.setContext(self),this.setAnimationLoop=function(x){qh=x,Ae.setAnimationLoop(x),x===null?_s.stop():_s.start()},Ae.addEventListener("sessionstart",wv),Ae.addEventListener("sessionend",Tv),this.render=function(x,I){if(I!==void 0&&I.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;F!==null&&F.renderStart(x,I);let G=Ae.enabled===!0&&Ae.isPresenting===!0,U=w!==null&&(ae===null||G)&&w.begin(A,ae);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(I),I=Ae.getCamera()),x.isScene===!0&&x.onBeforeRender(A,x,I,ae),S=he.get(x,y.length),S.init(I),S.state.textureUnits=q.getTextureUnits(),y.push(S),rt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),tt.setFromProjectionMatrix(rt,ji,I.reversedDepth),Lt=this.localClippingEnabled,ht=Ne.init(this.clippingPlanes,Lt),M=ge.get(x,C.length),M.init(),C.push(M),Ae.enabled===!0&&Ae.isPresenting===!0){let Se=A.xr.getDepthSensingMesh();Se!==null&&Xh(Se,I,-1/0,A.sortObjects)}Xh(x,I,0,A.sortObjects),M.finish(),F!==null&&F.updateLights(S.state.lightsArray),A.sortObjects===!0&&M.sort(Te,qe),Vt=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,Vt&&Ye.addToRenderList(M,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ht===!0&&Ne.beginShadows();let B=S.state.shadowsArray;if(Fe.render(B,x,I),ht===!0&&Ne.endShadows(),(U&&w.hasRenderPass())===!1){let Se=M.opaque,ye=M.transmissive;if(S.setupLights(),I.isArrayCamera){let Ce=I.cameras;if(ye.length>0)for(let Ie=0,$e=Ce.length;Ie<$e;Ie++){let nt=Ce[Ie];Dv(Se,ye,x,nt)}Vt&&Ye.render(x);for(let Ie=0,$e=Ce.length;Ie<$e;Ie++){let nt=Ce[Ie];Cv(M,x,nt,nt.viewport)}}else ye.length>0&&Dv(Se,ye,x,I),Vt&&Ye.render(x),Cv(M,x,I)}ae!==null&&j===0&&(q.updateMultisampleRenderTarget(ae),q.updateRenderTargetMipmap(ae)),U&&w.end(A),x.isScene===!0&&x.onAfterRender(A,x,I),_e.resetDefaultState(),X=-1,ie=null,y.pop(),y.length>0?(S=y[y.length-1],q.setTextureUnits(S.state.textureUnits),ht===!0&&Ne.setGlobalState(A.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?M=C[C.length-1]:M=null,F!==null&&F.renderEnd()};function Xh(x,I,G,U){if(x.visible===!1)return;if(x.layers.test(I.layers)){if(x.isGroup)G=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(I);else if(x.isLightProbeGrid)S.pushLightProbeGrid(x);else if(x.isLight)S.pushLight(x),x.castShadow&&S.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(tt)){U&&mn.setFromMatrixPosition(x.matrixWorld).applyMatrix4(rt);let Se=ee.update(x),ye=x.material;ye.visible&&M.push(x,Se,ye,G,mn.z,null,I)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(tt))){let Se=ee.update(x),ye=x.material;if(U&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),mn.copy(x.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),mn.copy(Se.boundingSphere.center)),mn.applyMatrix4(x.matrixWorld).applyMatrix4(rt)),Array.isArray(ye)){let Ce=Se.groups;for(let Ie=0,$e=Ce.length;Ie<$e;Ie++){let nt=Ce[Ie],De=ye[nt.materialIndex];De&&De.visible&&M.push(x,Se,De,G,mn.z,nt,I)}}else ye.visible&&M.push(x,Se,ye,G,mn.z,null,I)}}let xe=x.children;for(let Se=0,ye=xe.length;Se<ye;Se++)Xh(xe[Se],I,G,U)}function Cv(x,I,G,U){let{opaque:B,transmissive:xe,transparent:Se}=x;S.setupLightsView(G),ht===!0&&Ne.setGlobalState(A.clippingPlanes,G),U&&v.viewport(se.copy(U)),B.length>0&&ql(B,I,G),xe.length>0&&ql(xe,I,G),Se.length>0&&ql(Se,I,G),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Dv(x,I,G,U){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[U.id]===void 0){let De=Mt.has("EXT_color_buffer_half_float")||Mt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[U.id]=new Gt(1,1,{generateMipmaps:!0,type:De?on:Qn,minFilter:ms,samples:Math.max(4,T.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}let xe=S.state.transmissionRenderTarget[U.id],Se=U.viewport||se;xe.setSize(Se.z*A.transmissionResolutionScale,Se.w*A.transmissionResolutionScale);let ye=A.getRenderTarget(),Ce=A.getActiveCubeFace(),Ie=A.getActiveMipmapLevel();A.setRenderTarget(xe),A.getClearColor(Pt),at=A.getClearAlpha(),at<1&&A.setClearColor(16777215,.5),A.clear(),Vt&&Ye.render(G);let $e=A.toneMapping;A.toneMapping=Yi;let nt=U.viewport;if(U.viewport!==void 0&&(U.viewport=void 0),S.setupLightsView(U),ht===!0&&Ne.setGlobalState(A.clippingPlanes,U),ql(x,G,U),q.updateMultisampleRenderTarget(xe),q.updateRenderTargetMipmap(xe),Mt.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let Et=0,en=I.length;Et<en;Et++){let Ut=I[Et],{object:It,geometry:Cn,material:be,group:Fn}=Ut;if(be.side===Nn&&It.layers.test(U.layers)){let lt=be.side;be.side=fn,be.needsUpdate=!0,Av(It,G,U,Cn,be,Fn),be.side=lt,be.needsUpdate=!0,De=!0}}De===!0&&(q.updateMultisampleRenderTarget(xe),q.updateRenderTargetMipmap(xe))}A.setRenderTarget(ye,Ce,Ie),A.setClearColor(Pt,at),nt!==void 0&&(U.viewport=nt),A.toneMapping=$e}function ql(x,I,G){let U=I.isScene===!0?I.overrideMaterial:null;for(let B=0,xe=x.length;B<xe;B++){let Se=x[B],{object:ye,geometry:Ce,group:Ie}=Se,$e=Se.material;$e.allowOverride===!0&&U!==null&&($e=U),ye.layers.test(G.layers)&&Av(ye,I,G,Ce,$e,Ie)}}function Av(x,I,G,U,B,xe){F!==null&&B.isNodeMaterial&&F.setObject(x,B),x.onBeforeRender(A,I,G,U,B,xe),x.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),B.onBeforeRender(A,I,G,U,x,xe),B.transparent===!0&&B.side===Nn&&B.forceSinglePass===!1?(B.side=fn,B.needsUpdate=!0,A.renderBufferDirect(G,I,U,B,x,xe),B.side=hs,B.needsUpdate=!0,A.renderBufferDirect(G,I,U,B,x,xe),B.side=Nn):A.renderBufferDirect(G,I,U,B,x,xe),x.onAfterRender(A,I,G,U,B,xe)}function Xl(x,I,G){I.isScene!==!0&&(I=Xn);let U=V.get(x),B=S.state.lights,xe=S.state.shadowsArray,Se=B.state.version,ye=fe.getParameters(x,B.state,xe,I,G,S.state.lightProbeGridArray),Ce=fe.getProgramCacheKey(ye),Ie=U.programs;U.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,U.fog=I.fog;let $e=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;U.envMap=ce.get(x.envMap||U.environment,$e),U.envMapRotation=U.environment!==null&&x.envMap===null?I.environmentRotation:x.envMapRotation,Ie===void 0&&(x.addEventListener("dispose",$i),Ie=new Map,U.programs=Ie);let nt=Ie.get(Ce);if(nt!==void 0){if(U.currentProgram===nt&&U.lightsStateVersion===Se)return Rv(x,ye),nt}else ye.uniforms=fe.getUniforms(x),F!==null&&x.isNodeMaterial&&F.build(x,G,ye),x.onBeforeCompile(ye,A),nt=fe.acquireProgram(ye,Ce),Ie.set(Ce,nt),U.uniforms=ye.uniforms;let De=U.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(De.clippingPlanes=Ne.uniform),Rv(x,ye),U.needsLights=oS(x),U.lightsStateVersion=Se,U.needsLights&&(De.ambientLightColor.value=B.state.ambient,De.lightProbe.value=B.state.probe,De.sunLights.value=B.state.sun,De.sunLightShadows.value=B.state.sunShadow,De.directionalLights.value=B.state.directional,De.directionalLightShadows.value=B.state.directionalShadow,De.spotLights.value=B.state.spot,De.spotLightShadows.value=B.state.spotShadow,De.rectAreaLights.value=B.state.rectArea,De.ltc_1.value=B.state.rectAreaLTC1,De.ltc_2.value=B.state.rectAreaLTC2,De.pointLights.value=B.state.point,De.pointLightShadows.value=B.state.pointShadow,De.hemisphereLights.value=B.state.hemi,De.sunShadowMatrix.value=B.state.sunShadowMatrix,De.sunShadowCascade.value=B.state.sunShadowCascade,De.directionalShadowMatrix.value=B.state.directionalShadowMatrix,De.spotLightMatrix.value=B.state.spotLightMatrix,De.spotLightMap.value=B.state.spotLightMap,De.pointShadowMatrix.value=B.state.pointShadowMatrix),U.lightProbeGrid=S.state.lightProbeGridArray.length>0,U.currentProgram=nt,U.uniformsList=null,nt}function Iv(x){if(x.uniformsList===null){let I=x.currentProgram.getUniforms();x.uniformsList=Pa.seqWithValue(I.seq,x.uniforms)}return x.uniformsList}function Rv(x,I){let G=V.get(x);G.outputColorSpace=I.outputColorSpace,G.batching=I.batching,G.batchingColor=I.batchingColor,G.instancing=I.instancing,G.instancingColor=I.instancingColor,G.instancingMorph=I.instancingMorph,G.skinning=I.skinning,G.morphTargets=I.morphTargets,G.morphNormals=I.morphNormals,G.morphColors=I.morphColors,G.morphTargetsCount=I.morphTargetsCount,G.numClippingPlanes=I.numClippingPlanes,G.numIntersection=I.numClipIntersection,G.vertexAlphas=I.vertexAlphas,G.vertexTangents=I.vertexTangents,G.toneMapping=I.toneMapping}function iS(x,I){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;E.setFromMatrixPosition(I.matrixWorld);for(let G=0,U=x.length;G<U;G++){let B=x[G];if(B.texture!==null&&B.boundingBox.containsPoint(E))return B}return null}function rS(x,I,G,U,B){I.isScene!==!0&&(I=Xn),q.resetTextureUnits();let xe=I.fog,Se=U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial?I.environment:null,ye=ae===null?A.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Qe.workingColorSpace,Ce=U.isMeshStandardMaterial||U.isMeshLambertMaterial&&!U.envMap||U.isMeshPhongMaterial&&!U.envMap,Ie=ce.get(U.envMap||Se,Ce),$e=U.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,nt=!!G.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),De=!!G.morphAttributes.position,Et=!!G.morphAttributes.normal,en=!!G.morphAttributes.color,Ut=Yi;U.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ut=A.toneMapping);let It=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Cn=It!==void 0?It.length:0,be=V.get(U),Fn=S.state.lights;if(ht===!0&&(Lt===!0||x!==ie)){let Ft=x===ie&&U.id===X;Ne.setState(U,x,Ft)}let lt=!1;U.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Fn.state.version||be.outputColorSpace!==ye||B.isBatchedMesh&&be.batching===!1||!B.isBatchedMesh&&be.batching===!0||B.isBatchedMesh&&be.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&be.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&be.instancing===!1||!B.isInstancedMesh&&be.instancing===!0||B.isSkinnedMesh&&be.skinning===!1||!B.isSkinnedMesh&&be.skinning===!0||B.isInstancedMesh&&be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&be.instancingMorph===!1&&B.morphTexture!==null||be.envMap!==Ie||U.fog===!0&&be.fog!==xe||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Ne.numPlanes||be.numIntersection!==Ne.numIntersection)||be.vertexAlphas!==$e||be.vertexTangents!==nt||be.morphTargets!==De||be.morphNormals!==Et||be.morphColors!==en||be.toneMapping!==Ut||be.morphTargetsCount!==Cn||!!be.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,be.__version=U.version);let ui=be.currentProgram;lt===!0&&(ui=Xl(U,I,B),F&&U.isNodeMaterial&&F.onUpdateProgram(U,ui,be));let Ki=!1,Br=!1,xo=!1,Ct=ui.getUniforms(),Xt=be.uniforms;if(v.useProgram(ui.program)&&(Ki=!0,Br=!0,xo=!0),U.id!==X&&(X=U.id,Br=!0),be.needsLights){let Ft=iS(S.state.lightProbeGridArray,B);be.lightProbeGrid!==Ft&&(be.lightProbeGrid=Ft,Br=!0)}if(Ki||ie!==x){v.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Ct.setValue(P,"projectionMatrix",x.projectionMatrix),Ct.setValue(P,"viewMatrix",x.matrixWorldInverse);let Vr=Ct.map.cameraPosition;Vr!==void 0&&Vr.setValue(P,Bt.setFromMatrixPosition(x.matrixWorld)),T.logarithmicDepthBuffer&&Ct.setValue(P,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&Ct.setValue(P,"isOrthographic",x.isOrthographicCamera===!0),ie!==x&&(ie=x,Br=!0,xo=!0)}if(be.needsLights&&(Fn.state.sunShadowMap.length>0&&Ct.setValue(P,"sunShadowMap",Fn.state.sunShadowMap,q),Fn.state.directionalShadowMap.length>0&&Ct.setValue(P,"directionalShadowMap",Fn.state.directionalShadowMap,q),Fn.state.spotShadowMap.length>0&&Ct.setValue(P,"spotShadowMap",Fn.state.spotShadowMap,q),Fn.state.pointShadowMap.length>0&&Ct.setValue(P,"pointShadowMap",Fn.state.pointShadowMap,q)),B.isSkinnedMesh){Ct.setOptional(P,B,"bindMatrix"),Ct.setOptional(P,B,"bindMatrixInverse");let Ft=B.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),Ct.setValue(P,"boneTexture",Ft.boneTexture,q))}B.isBatchedMesh&&(Ct.setOptional(P,B,"batchingTexture"),Ct.setValue(P,"batchingTexture",B._matricesTexture,q),Ct.setOptional(P,B,"batchingIdTexture"),Ct.setValue(P,"batchingIdTexture",B._indirectTexture,q),Ct.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&Ct.setValue(P,"batchingColorTexture",B._colorsTexture,q));let Hr=G.morphAttributes;if((Hr.position!==void 0||Hr.normal!==void 0||Hr.color!==void 0)&&R.update(B,G,ui),(Br||be.receiveShadow!==B.receiveShadow)&&(be.receiveShadow=B.receiveShadow,Ct.setValue(P,"receiveShadow",B.receiveShadow)),(U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial)&&U.envMap===null&&I.environment!==null&&(Xt.envMapIntensity.value=I.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=QP()),Br){if(Ct.setValue(P,"toneMappingExposure",A.toneMappingExposure),be.needsLights&&sS(Xt,xo),xe&&U.fog===!0&&Re.refreshFogUniforms(Xt,xe),Re.refreshMaterialUniforms(Xt,U,ne,Y,S.state.transmissionRenderTarget[x.id]),be.needsLights&&be.lightProbeGrid){let Ft=be.lightProbeGrid;Xt.probesSH.value=Ft.texture,Xt.probesMin.value.copy(Ft.boundingBox.min),Xt.probesMax.value.copy(Ft.boundingBox.max),Xt.probesResolution.value.copy(Ft.resolution)}Pa.upload(P,Iv(be),Xt,q)}if(U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Pa.upload(P,Iv(be),Xt,q),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&Ct.setValue(P,"center",B.center),Ct.setValue(P,"modelViewMatrix",B.modelViewMatrix),Ct.setValue(P,"normalMatrix",B.normalMatrix),Ct.setValue(P,"modelMatrix",B.matrixWorld),U.uniformsGroups!==void 0){let Ft=U.uniformsGroups;for(let Vr=0,_o=Ft.length;Vr<_o;Vr++){let Pv=Ft[Vr];re.update(Pv,ui),re.bind(Pv,ui)}}return ui}function sS(x,I){x.ambientLightColor.needsUpdate=I,x.lightProbe.needsUpdate=I,x.sunLights.needsUpdate=I,x.sunLightShadows.needsUpdate=I,x.directionalLights.needsUpdate=I,x.directionalLightShadows.needsUpdate=I,x.pointLights.needsUpdate=I,x.pointLightShadows.needsUpdate=I,x.spotLights.needsUpdate=I,x.spotLightShadows.needsUpdate=I,x.rectAreaLights.needsUpdate=I,x.hemisphereLights.needsUpdate=I}function oS(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(x,I,G){let U=V.get(x);U.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,U.__autoAllocateDepthBuffer===!1&&(U.__useRenderToTexture=!1),V.get(x.texture).__webglTexture=I,V.get(x.depthTexture).__webglTexture=U.__autoAllocateDepthBuffer?void 0:G,U.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,I){let G=V.get(x);G.__webglFramebuffer=I,G.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(x,I=0,G=0){ae=x,K=I,j=G;let U=null,B=!1,xe=!1;if(x){let ye=V.get(x);if(ye.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(P.FRAMEBUFFER,ye.__webglFramebuffer),se.copy(x.viewport),Oe.copy(x.scissor),Pe=x.scissorTest,v.viewport(se),v.scissor(Oe),v.setScissorTest(Pe),X=-1;return}else if(ye.__webglFramebuffer===void 0)q.setupRenderTarget(x);else if(ye.__hasExternalTextures)q.rebindTextures(x,V.get(x.texture).__webglTexture,V.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let $e=x.depthTexture;if(ye.__boundDepthTexture!==$e){if($e!==null&&V.has($e)&&(x.width!==$e.image.width||x.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(x)}}let Ce=x.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(xe=!0);let Ie=V.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ie[I])?U=Ie[I][G]:U=Ie[I],B=!0):x.samples>0&&q.useMultisampledRTT(x)===!1?U=V.get(x).__webglMultisampledFramebuffer:Array.isArray(Ie)?U=Ie[G]:U=Ie,se.copy(x.viewport),Oe.copy(x.scissor),Pe=x.scissorTest}else se.copy(Me).multiplyScalar(ne).floor(),Oe.copy(Je).multiplyScalar(ne).floor(),Pe=an;if(G!==0&&(U=z),v.bindFramebuffer(P.FRAMEBUFFER,U)&&v.drawBuffers(x,U),v.viewport(se),v.scissor(Oe),v.setScissorTest(Pe),B){let ye=V.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,ye.__webglTexture,G)}else if(xe){let ye=I;for(let Ce=0;Ce<x.textures.length;Ce++){let Ie=V.get(x.textures[Ce]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ce,Ie.__webglTexture,G,ye)}}else if(x!==null&&G!==0){let ye=V.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ye.__webglTexture,G)}X=-1};function Nv(x){let I=V.get(x);return(I.__readFormat!==x.format||I.__readType!==x.type)&&(I.__readFormat=x.format,I.__readType=x.type,I.__formatReadable=T.textureFormatReadable(x.format),I.__typeReadable=T.textureTypeReadable(x.type)),I}this.readRenderTargetPixels=function(x,I,G,U,B,xe,Se,ye=0){if(!(x&&x.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){v.bindFramebuffer(P.FRAMEBUFFER,Ce);try{let Ie=x.textures[ye],$e=Ie.format,nt=Ie.type;x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ye);let De=Nv(Ie);if(De.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=x.width-U&&G>=0&&G<=x.height-B&&P.readPixels(I,G,U,B,me.convert($e),me.convert(nt),xe)}finally{let Ie=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(P.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(x,I,G,U,B,xe,Se,ye=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce)if(I>=0&&I<=x.width-U&&G>=0&&G<=x.height-B){v.bindFramebuffer(P.FRAMEBUFFER,Ce);let Ie=x.textures[ye],$e=Ie.format,nt=Ie.type;x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ye);let De=Nv(Ie);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Et=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Et),P.bufferData(P.PIXEL_PACK_BUFFER,xe.byteLength,P.STREAM_READ),P.readPixels(I,G,U,B,me.convert($e),me.convert(nt),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let en=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(P.FRAMEBUFFER,en);let Ut=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Zb(P,Ut,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Et),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,xe),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(Et),P.deleteSync(Ut),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,I=null,G=0){let U=Math.pow(2,-G),B=Math.floor(x.image.width*U),xe=Math.floor(x.image.height*U),Se=I!==null?I.x:0,ye=I!==null?I.y:0;q.setTexture2D(x,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,Se,ye,B,xe),v.unbindTexture()},this.copyTextureToTexture=function(x,I,G=null,U=null,B=0,xe=0){let Se,ye,Ce,Ie,$e,nt,De,Et,en,Ut=x.isCompressedTexture?x.mipmaps[xe]:x.image;if(G!==null)Se=G.max.x-G.min.x,ye=G.max.y-G.min.y,Ce=G.isBox3?G.max.z-G.min.z:1,Ie=G.min.x,$e=G.min.y,nt=G.isBox3?G.min.z:0;else{let Xt=Math.pow(2,-B);Se=Math.floor(Ut.width*Xt),ye=Math.floor(Ut.height*Xt),x.isDataArrayTexture?Ce=Ut.depth:x.isData3DTexture?Ce=Math.floor(Ut.depth*Xt):Ce=1,Ie=0,$e=0,nt=0}U!==null?(De=U.x,Et=U.y,en=U.z):(De=0,Et=0,en=0);let It=me.convert(I.format),Cn=me.convert(I.type),be;I.isData3DTexture?(q.setTexture3D(I,0),be=P.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(q.setTexture2DArray(I,0),be=P.TEXTURE_2D_ARRAY):(q.setTexture2D(I,0),be=P.TEXTURE_2D),v.activeTexture(P.TEXTURE0),v.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),v.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),v.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);let Fn=v.getParameter(P.UNPACK_ROW_LENGTH),lt=v.getParameter(P.UNPACK_IMAGE_HEIGHT),ui=v.getParameter(P.UNPACK_SKIP_PIXELS),Ki=v.getParameter(P.UNPACK_SKIP_ROWS),Br=v.getParameter(P.UNPACK_SKIP_IMAGES);v.pixelStorei(P.UNPACK_ROW_LENGTH,Ut.width),v.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ut.height),v.pixelStorei(P.UNPACK_SKIP_PIXELS,Ie),v.pixelStorei(P.UNPACK_SKIP_ROWS,$e),v.pixelStorei(P.UNPACK_SKIP_IMAGES,nt);let xo=x.isDataArrayTexture||x.isData3DTexture,Ct=I.isDataArrayTexture||I.isData3DTexture;if(x.isDepthTexture){let Xt=V.get(x),Hr=V.get(I),Ft=V.get(Xt.__renderTarget),Vr=V.get(Hr.__renderTarget);v.bindFramebuffer(P.READ_FRAMEBUFFER,Ft.__webglFramebuffer),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,Vr.__webglFramebuffer);for(let _o=0;_o<Ce;_o++)xo&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,V.get(x).__webglTexture,B,nt+_o),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,V.get(I).__webglTexture,xe,en+_o)),P.blitFramebuffer(Ie,$e,Se,ye,De,Et,Se,ye,P.DEPTH_BUFFER_BIT,P.NEAREST);v.bindFramebuffer(P.READ_FRAMEBUFFER,null),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||x.isRenderTargetTexture||V.has(x)){let Xt=V.get(x),Hr=V.get(I);v.bindFramebuffer(P.READ_FRAMEBUFFER,O),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,H);for(let Ft=0;Ft<Ce;Ft++)xo?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Xt.__webglTexture,B,nt+Ft):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Xt.__webglTexture,B),Ct?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Hr.__webglTexture,xe,en+Ft):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Hr.__webglTexture,xe),B!==0?P.blitFramebuffer(Ie,$e,Se,ye,De,Et,Se,ye,P.COLOR_BUFFER_BIT,P.NEAREST):Ct?P.copyTexSubImage3D(be,xe,De,Et,en+Ft,Ie,$e,Se,ye):P.copyTexSubImage2D(be,xe,De,Et,Ie,$e,Se,ye);v.bindFramebuffer(P.READ_FRAMEBUFFER,null),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Ct?x.isDataTexture||x.isData3DTexture?P.texSubImage3D(be,xe,De,Et,en,Se,ye,Ce,It,Cn,Ut.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(be,xe,De,Et,en,Se,ye,Ce,It,Ut.data):P.texSubImage3D(be,xe,De,Et,en,Se,ye,Ce,It,Cn,Ut):x.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,xe,De,Et,Se,ye,It,Cn,Ut.data):x.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,xe,De,Et,Ut.width,Ut.height,It,Ut.data):P.texSubImage2D(P.TEXTURE_2D,xe,De,Et,Se,ye,It,Cn,Ut);v.pixelStorei(P.UNPACK_ROW_LENGTH,Fn),v.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt),v.pixelStorei(P.UNPACK_SKIP_PIXELS,ui),v.pixelStorei(P.UNPACK_SKIP_ROWS,Ki),v.pixelStorei(P.UNPACK_SKIP_IMAGES,Br),xe===0&&I.generateMipmaps&&P.generateMipmap(be),v.unbindTexture()},this.initRenderTarget=function(x){V.get(x).__webglFramebuffer===void 0&&q.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?q.setTextureCube(x,0):x.isData3DTexture?q.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?q.setTexture2DArray(x,0):q.setTexture2D(x,0),v.unbindTexture()},this.resetState=function(){K=0,j=0,ae=null,v.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}};var Fa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var jn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},eL=new fs(-1,1,1,-1,0,1),mv=class extends Wt{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}},tL=new mv,xr=class{constructor(e){this._mesh=new te(tL,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,eL)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ka=class extends jn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Nt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=li.clone(e.uniforms),this.material=new Nt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new xr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Ul=class extends jn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Mh=class extends jn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Sh=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new Ee);this._width=i.width,this._height=i.height,t=new Gt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:on}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ka(Fa),this.copyPass.material.blending=yi,this.timer=new vl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Ul!==void 0&&(o instanceof Ul?i=!0:o instanceof Mh&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Bl={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var wh=class extends jn{constructor(){super(),this.isOutputPass=!0,this.uniforms=li.clone(Bl.uniforms),this.material=new Sa({name:Bl.name,uniforms:this.uniforms,vertexShader:Bl.vertexShader,fragmentShader:Bl.fragmentShader}),this._fsQuad=new xr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qe.getTransfer(this._outputColorSpace)===gt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_l?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===El?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===bl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===co?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Sl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===wl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ml&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Th=class extends jn{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new we}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}};var DM={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new we(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Ua=class n extends jn{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Ee(e.x,e.y):new Ee(256,256),this.clearColor=new we(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Gt(s,o,{type:on,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Gt(s,o,{type:on,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new Gt(s,o,{type:on,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}let a=DM;this.highPassUniforms=li.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Nt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Ee(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=li.clone(Fa.uniforms),this.blendMaterial=new Nt({uniforms:this.copyUniforms,vertexShader:Fa.vertexShader,fragmentShader:Fa.fragmentShader,premultipliedAlpha:!0,blending:xl,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new we,this._oldClearAlpha=1,this._basic=new gr,this._fsQuad=new xr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Ee(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],i=e/3;for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(i*i))/i);let r=[],s=[];for(let o=1;o<e;o+=2){let a=t[o],c=o+1<e?t[o+1]:0,l=a+c;r.push((o*a+(o+1)*c)/l),s.push(l)}return new Nt({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ee(.5,.5)},direction:{value:new Ee(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:s}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Nt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Ua.BlurDirectionX=new Ee(1,0);Ua.BlurDirectionY=new Ee(0,1);var Hl={name:"SMAAEdgesShader",defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new Ee(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Vl={name:"SMAAWeightsShader",defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new Ee(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Ch={name:"SMAABlendShader",uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new Ee(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};var Dh=class extends jn{constructor(){super(),this._edgesRT=new Gt(1,1,{depthBuffer:!1,type:on}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Gt(1,1,{depthBuffer:!1,type:on}),this._weightsRT.texture.name="SMAAPass.weights";let e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new ci,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=dn,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;let i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new ci,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=Jt,this._searchTexture.minFilter=Jt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=li.clone(Hl.uniforms),this._materialEdges=new Nt({defines:Object.assign({},Hl.defines),uniforms:this._uniformsEdges,vertexShader:Hl.vertexShader,fragmentShader:Hl.fragmentShader}),this._uniformsWeights=li.clone(Vl.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new Nt({defines:Object.assign({},Vl.defines),uniforms:this._uniformsWeights,vertexShader:Vl.vertexShader,fragmentShader:Vl.fragmentShader}),this._uniformsBlend=li.clone(Ch.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new Nt({uniforms:this._uniformsBlend,vertexShader:Ch.vertexShader,fragmentShader:Ch.fragmentShader}),this._fsQuad=new xr(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}};var Ah=class extends ro{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Ge;e.deleteAttribute("uv");let t=new oe({side:fn}),i=new oe,r=new ml(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let s=new te(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new rl(e,i,6),a=new Mn;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new te(e,Ba(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new te(e,Ba(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new te(e,Ba(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new te(e,Ba(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let f=new te(e,Ba(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let h=new te(e,Ba(100));h.position.set(0,20,0),h.scale.set(1,.1,1),this.add(h)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ba(n){return new ul({color:0,emissive:16777215,emissiveIntensity:n})}var AM={name:"GradeShader",uniforms:{tDiffuse:{value:null},time:{value:0},warmth:{value:.02},vignette:{value:.4},grain:{value:.018}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float warmth;
    uniform float vignette;
    uniform float grain;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + time) * 43758.5453); }

    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      // Contrast around mid grey, then a warm tint in the highlights.
      c.rgb = (c.rgb - 0.5) * 1.04 + 0.5;
      c.rgb += vec3(warmth, warmth * 0.5, -warmth * 0.6) * c.rgb;
      // Vignette.
      vec2 d = vUv - 0.5;
      float v = 1.0 - dot(d, d) * vignette * 1.6;
      c.rgb *= clamp(v, 0.0, 1.0);
      // Grain.
      c.rgb += (hash(vUv) - 0.5) * grain;
      gl_FragColor = c;
    }
  `};var Ha=class n{leftHeld=Be(!1);rightHeld=Be(!1);steer=En(()=>(this.rightHeld()?1:0)-(this.leftHeld()?1:0));flick=Be(0);accelerate=Be(!1);brake=Be(!1);nitroRequest=Be(!1);pauseRequest=Be(!1);hornRequest=Be(!1);touchStartX=0;touchStartY=0;touchStartAt=0;bound=!1;bind(){this.bound||(this.bound=!0,window.addEventListener("keydown",e=>this.onKey(e,!0)),window.addEventListener("keyup",e=>this.onKey(e,!1)),window.addEventListener("touchstart",e=>this.onTouchStart(e),{passive:!0}),window.addEventListener("touchend",e=>this.onTouchEnd(e),{passive:!0}),window.addEventListener("blur",()=>this.releaseAll()))}hold(e,t){e==="left"?this.leftHeld.set(t):e==="right"?this.rightHeld.set(t):this[e].set(t)}consumeFlick(){let e=this.flick();return e!==0&&this.flick.set(0),e}consume(e){let t=this[e]();return t&&this[e].set(!1),t}onKey(e,t){let i=e.code;(i==="ArrowLeft"||i==="ArrowRight"||i==="ArrowUp"||i==="ArrowDown"||i==="KeyA"||i==="KeyD"||i==="KeyW"||i==="KeyS"||i==="Space"||i==="Escape"||i==="KeyP"||i==="KeyH")&&(e.preventDefault(),(i==="ArrowLeft"||i==="KeyA")&&this.leftHeld.set(t),(i==="ArrowRight"||i==="KeyD")&&this.rightHeld.set(t),(i==="ArrowUp"||i==="KeyW")&&this.accelerate.set(t),(i==="ArrowDown"||i==="KeyS")&&this.brake.set(t),t&&!e.repeat&&(i==="Space"&&this.nitroRequest.set(!0),(i==="Escape"||i==="KeyP")&&this.pauseRequest.set(!0),i==="KeyH"&&this.hornRequest.set(!0)))}onTouchStart(e){let t=e.changedTouches[0];t&&(this.touchStartX=t.clientX,this.touchStartY=t.clientY,this.touchStartAt=performance.now())}onTouchEnd(e){let t=e.changedTouches[0];if(!t||e.target?.closest("button, a"))return;let i=t.clientX-this.touchStartX,r=t.clientY-this.touchStartY;performance.now()-this.touchStartAt<600&&(Math.abs(i)>28&&Math.abs(i)>Math.abs(r)?this.flick.set(i<0?-1:1):r<-40&&this.nitroRequest.set(!0))}releaseAll(){this.leftHeld.set(!1),this.rightHeld.set(!1),this.accelerate.set(!1),this.brake.set(!1)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};function Ln(n,e){return(n-(e-1)/2)*gn}function IM(n,e){return Math.max(0,Math.min(e-1,n))}function zl(n){return Math.floor(Math.random()*n)}function Ei(n){return n/3.6}function qn(n,e){return n+Math.random()*(e-n)}function Sn(n){return Math.random()<n}function bi(n){return n[Math.floor(Math.random()*n.length)]}function RM(n){let e=Object.entries(n),t=e.reduce((r,[,s])=>r+(s??0),0),i=Math.random()*t;for(let[r,s]of e)if(i-=s??0,i<=0)return r;return e[e.length-1][0]}var Ih=class{points;pool=[];positions;colors;sizes;max;constructor(e=400){this.max=e,this.positions=new Float32Array(e*3),this.colors=new Float32Array(e*3),this.sizes=new Float32Array(e);let t=new Wt;t.setAttribute("position",new bn(this.positions,3)),t.setAttribute("color",new bn(this.colors,3));let i=new as({size:.35,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0});this.points=new so(t,i),this.points.frustumCulled=!1;for(let r=0;r<e;r++)this.pool.push({x:0,y:-50,z:0,vx:0,vy:0,vz:0,life:0,max:1,size:.3})}emit(e,t,i,r,s,o,a,c,l){for(let u=0;u<e;u++){let d=this.pool.find(h=>h.life<=0);if(!d)return;d.x=t+(Math.random()-.5)*o,d.y=i,d.z=r,d.vx=(Math.random()-.5)*o*2,d.vy=Math.random()*a,d.vz=c+Math.random()*c*.5,d.life=l*(.6+Math.random()*.4),d.max=d.life;let f=this.pool.indexOf(d);this.colors[f*3]=s.r,this.colors[f*3+1]=s.g,this.colors[f*3+2]=s.b}}update(e,t){let i=this.points.geometry.attributes.position;for(let r=0;r<this.max;r++){let s=this.pool[r];if(s.life<=0){this.positions[r*3+1]=-50;continue}s.life-=e,s.vy-=6*e,s.x+=s.vx*e,s.y=Math.max(.02,s.y+s.vy*e),s.z+=(s.vz+t)*e,this.positions[r*3]=s.x,this.positions[r*3+1]=s.y,this.positions[r*3+2]=s.z}i.needsUpdate=!0}};var Gl=new N;function Mi(n,e,t,i,r,s){let o=2*Math.PI*r/4,a=Math.max(s-2*r,0),c=Math.PI/4;Gl.copy(e),Gl[i]=0,Gl.normalize();let l=.5*o/(o+a),u=1-Gl.angleTo(n)/c;return Math.sign(Gl[t])===1?u*l:a/(o+a)+l+l*(1-u)}var Rh=class n extends Ge{constructor(e=1,t=1,i=1,r=2,s=.1){let o=r*2+1;if(s=Math.min(e/2,t/2,i/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:r,radius:s},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new N,l=new N,u=new N(e,t,i).divideScalar(2).subScalar(s),d=this.attributes.position.array,f=this.attributes.normal.array,h=this.attributes.uv.array,m=d.length/6,_=new N,g=.5/o;for(let p=0,b=0;p<d.length;p+=3,b+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[p+0]=u.x*Math.sign(c.x)+l.x*s,d[p+1]=u.y*Math.sign(c.y)+l.y*s,d[p+2]=u.z*Math.sign(c.z)+l.z*s,f[p+0]=l.x,f[p+1]=l.y,f[p+2]=l.z,Math.floor(p/m)){case 0:_.set(1,0,0),h[b+0]=Mi(_,l,"z","y",s,i),h[b+1]=1-Mi(_,l,"y","z",s,t);break;case 1:_.set(-1,0,0),h[b+0]=1-Mi(_,l,"z","y",s,i),h[b+1]=1-Mi(_,l,"y","z",s,t);break;case 2:_.set(0,1,0),h[b+0]=1-Mi(_,l,"x","z",s,e),h[b+1]=Mi(_,l,"z","x",s,i);break;case 3:_.set(0,-1,0),h[b+0]=1-Mi(_,l,"x","z",s,e),h[b+1]=1-Mi(_,l,"z","x",s,i);break;case 4:_.set(0,0,1),h[b+0]=1-Mi(_,l,"x","y",s,e),h[b+1]=1-Mi(_,l,"y","x",s,t);break;case 5:_.set(0,0,-1),h[b+0]=Mi(_,l,"x","y",s,e),h[b+1]=1-Mi(_,l,"y","x",s,t);break}}static fromJSON(e){return new n(e.width,e.height,e.depth,e.segments,e.radius)}};var gv=new oe({color:1315862,roughness:.95}),NM=new oe({color:13224396,metalness:.95,roughness:.25}),ei=new wa({color:1186856,roughness:.08,metalness:.5,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.1}),po=new oe({color:15132390,metalness:1,roughness:.12}),wn=new oe({color:1842206,roughness:.75}),Nh=new oe({color:723725,roughness:1}),nL=new oe({color:7015179,emissive:0,roughness:.3}),iL=new oe({color:16775392,emissive:0,roughness:.2});function mo(n){return new wa({color:n,roughness:.3,metalness:.35,clearcoat:.9,clearcoatRoughness:.12,envMapIntensity:.9})}function ft(n,e,t,i,r=0,s=0,o=0,a=.12){let c=new te(new Rh(n,e,t,3,Math.min(a,n/2,e/2,t/2)),i);return c.position.set(r,s,o),c.castShadow=!0,c}function et(n,e,t,i,r=0,s=0,o=0){let a=new te(new Ge(n,e,t),i);return a.position.set(r,s,o),a.castShadow=!0,a}function xt(n,e,t,i,r=.34,s=.26){let o=new te(new Tt(r,r,s,20),gv);o.rotation.z=Math.PI/2,o.position.set(e,t,i),o.castShadow=!0;let a=new te(new ll(r*.92,r*.1,6,20),gv);a.rotation.y=Math.PI/2,o.add(a);let c=new te(new Tt(r*.6,r*.6,s+.02,10),NM);o.add(c);for(let u=0;u<5;u++){let d=new te(new Ge(r*.14,r*1.05,s+.04),NM);d.rotation.x=u/5*Math.PI,o.add(d)}let l=new te(new Tt(r*1.25,r*1.25,s*.6,16,1,!1,0,Math.PI),Nh);return l.rotation.z=Math.PI/2,l.rotation.y=Math.PI/2,l.position.set(e>0?e-s*.3:e+s*.3,t,i),n.add(l,o),o}function go(n,e,t,i){let r=ft(e*.82,.16,.08,nL.clone(),0,i,t/2+.02,.04),s=ft(e*.84,.18,.08,iL.clone(),0,i,-t/2-.02,.04);for(let o of[-1,1])n.add(et(.22,.1,.02,po,o*e*.3,i,-t/2-.07)),n.add(et(.22,.08,.02,wn,o*e*.3,i,t/2+.07));return n.add(r,s),{brake:r,head:s}}function vv(n,e,t){let i=new oe({color:16052448,roughness:.6});n.add(et(.36,.12,.02,i,0,t,e/2+.05),et(.36,.12,.02,i,0,t,-e/2-.05))}function LM(n,e=1.7,t=4.2,i=1.3){let r=new st,s=mo(n);r.add(ft(e,i*.46,t,s,0,i*.4,0,.16)),r.add(ft(e*.88,i*.44,t*.5,s,0,i*.78,.15,.2)),r.add(et(e*.9,.01,.02,wn,0,i*.63,-t*.42)),r.add(et(e*.9,.01,.02,wn,0,i*.63,t*.4)),r.add(et(e*.82,i*.36,.04,ei,0,i*.8,-t*.1)),r.add(et(e*.8,i*.3,.04,ei,0,i*.8,t*.4)),r.add(et(.03,i*.3,t*.44,ei,-e*.44,i*.82,.15)),r.add(et(.03,i*.3,t*.44,ei,e*.44,i*.82,.15)),r.add(et(.02,i*.42,.015,Nh,-e/2-.005,i*.4,.05)),r.add(et(.02,i*.42,.015,Nh,e/2+.005,i*.4,.05)),r.add(ft(e+.06,.2,.18,wn,0,i*.2,t/2,.06)),r.add(ft(e+.06,.2,.18,wn,0,i*.2,-t/2,.06)),r.add(et(e*.5,.12,.03,po,0,i*.32,-t/2-.08)),r.add(et(e*.5,.14,.03,Nh,0,i*.32,-t/2-.07)),r.add(ft(.2,.1,.12,s,-e/2-.12,i*.7,-t*.1,.03)),r.add(ft(.2,.1,.12,s,e/2+.12,i*.7,-t*.1,.03));let o=new te(new Tt(.05,.05,.2,8),po);o.rotation.x=Math.PI/2,o.position.set(e*.3,.3,t/2+.08),r.add(o),vv(r,t,i*.22);let a=[xt(r,-e/2,.34,-t*.32),xt(r,e/2,.34,-t*.32),xt(r,-e/2,.34,t*.32),xt(r,e/2,.34,t*.32)],{brake:c,head:l}=go(r,e,t,i*.45);return{group:r,wheels:a,brake:c,headlights:l,width:e,length:t}}function rL(n){let r=new st,s=mo(n);r.add(ft(1.95,1.9*.5,4.7,s,0,1.9*.45,0,.12)),r.add(ft(1.95*.96,1.9*.42,4.7*.64,s,0,1.9*.84,.2,.14)),r.add(et(1.95*.9,1.9*.34,.04,ei,0,1.9*.86,-4.7*.12)),r.add(et(.03,1.9*.28,4.7*.52,ei,-1.95*.48,1.9*.86,.2)),r.add(et(.03,1.9*.28,4.7*.52,ei,1.95*.48,1.9*.86,.2)),r.add(ft(1.95+.12,.3,.26,wn,0,1.9*.22,-4.7/2,.05)),r.add(ft(1.95+.12,.26,.18,wn,0,1.9*.22,4.7/2,.05)),r.add(et(1.95*.9,.08,.08,po,0,1.9*.22,-4.7/2-.16)),r.add(ft(1.95*.8,.1,4.7*.5,wn,0,1.9*1.08,.2,.04)),r.add(ft(.22,.12,.14,s,-1.95/2-.13,1.9*.76,-4.7*.1,.03)),r.add(ft(.22,.12,.14,s,1.95/2+.13,1.9*.76,-4.7*.1,.03));let o=new te(new Tt(.42,.42,.26,18),gv);o.rotation.x=Math.PI/2,o.position.set(.5,1.9*.58,4.7/2+.16),r.add(o),vv(r,4.7,1.9*.3);let a=[xt(r,-1.95/2,.42,-4.7*.32,.42,.3),xt(r,1.95/2,.42,-4.7*.32,.42,.3),xt(r,-1.95/2,.42,4.7*.32,.42,.3),xt(r,1.95/2,.42,4.7*.32,.42,.3)],{brake:c,head:l}=go(r,1.95,4.7,1.9*.5);return{group:r,wheels:a,brake:c,headlights:l,width:1.95,length:4.7}}function OM(){let i=new st,r=mo(16053488),s=new oe({color:1989560,roughness:.5,metalness:.3});i.add(ft(2,2.1*.84,5,r,0,2.1*.52,0,.18)),i.add(et(2+.02,.22,5-.3,s,0,2.1*.45,0));for(let u=-1.5;u<=1.5;u+=1)i.add(et(2+.04,.5,.75,ei,0,2.1*.72,u));i.add(et(2*.9,.62,.04,ei,0,2.1*.72,-5/2+.05)),i.add(et(2*.86,.5,.04,ei,0,2.1*.72,5/2-.05)),i.add(ft(2+.06,.18,.16,wn,0,2.1*.14,-5/2,.05)),i.add(ft(2+.06,.18,.16,wn,0,2.1*.14,5/2,.05)),i.add(ft(.24,.14,.14,r,-2/2-.14,2.1*.7,-5*.35,.03)),i.add(ft(.24,.14,.14,r,2/2+.14,2.1*.7,-5*.35,.03));let o=new oe({color:7039851,metalness:.6,roughness:.4});i.add(et(2*.9,.06,5*.7,o,0,2.1*.96,0)),i.add(ft(2*.5,.35,5*.3,new oe({color:9268835,roughness:1}),0,2.1*1.16,.4,.05)),vv(i,5,2.1*.2);let a=[xt(i,-2/2,.38,-5*.3,.38,.28),xt(i,2/2,.38,-5*.3,.38,.28),xt(i,-2/2,.38,5*.3,.38,.28),xt(i,2/2,.38,5*.3,.38,.28)],{brake:c,head:l}=go(i,2,5,2.1*.3);return{group:i,wheels:a,brake:c,headlights:l,width:2,length:5}}function sL(){let i=new st,r=mo(16106776),s=new oe({color:2105376,roughness:.8});i.add(ft(1.3,.6,2.6*.9,r,0,.55,.1,.14)),i.add(ft(1.3*.6,.7,.9,r,0,.75,-2.6*.38,.2)),i.add(ft(1.3*.9,.1,2.6*.9,s,0,1.7-.05,.1,.04));for(let l of[-1,1])i.add(et(.06,1.7-.6,.06,s,l*1.3/2-l*.08,1.7*.65,2.6*.4)),i.add(et(.06,1.7-.6,.06,s,l*1.3/2-l*.08,1.7*.65,-2.6*.2));i.add(et(1.3*.85,.5,.04,ei,0,1.1,-2.6*.42)),i.add(ft(.3,.25,.25,s,0,1.7+.1,.2,.04)),i.add(et(.7,.04,.04,po,0,1.05,-2.6*.2)),i.add(ft(1.3*.8,.2,.7,new oe({color:6105882,roughness:.9}),0,.95,2.6*.2,.06));let o=[xt(i,0,.28,-2.6*.42,.28,.16),xt(i,-1.3/2,.28,2.6*.3,.28,.16),xt(i,1.3/2,.28,2.6*.3,.28,.16)],{brake:a,head:c}=go(i,1.3*.7,2.6*.9,.8);return{group:i,wheels:o,brake:a,headlights:c,width:1.3,length:2.6}}function oL(){let i=new st,r=mo(3111486),s=new oe({color:12369076,roughness:.8});i.add(ft(2.3,2.8*.56,2,r,0,2.8*.42,-7/2+1,.12)),i.add(et(2.3*.9,.7,.04,ei,0,2.8*.55,-7/2+.02)),i.add(ft(2.3,2.8*.86,7-2.3,s,0,2.8*.55,1.15,.05)),i.add(et(2.3+.1,.3,.2,po,0,2.8*.14,-7/2));let o=new oe({color:6111287});for(let d=-1;d<=3;d+=1.3)i.add(et(2.3+.06,.04,.04,o,0,2.8*.9,d));let a=new te(new Tt(.07,.07,1.6,8),po);a.position.set(2.3/2+.1,2.8*.7,-7/2+2.1),i.add(a),i.add(et(.1,.4,.2,wn,-2.3/2-.2,2.8*.6,-7/2+.3)),i.add(et(.1,.4,.2,wn,2.3/2+.2,2.8*.6,-7/2+.3));let c=[xt(i,-2.3/2,.45,-7*.36,.45,.32),xt(i,2.3/2,.45,-7*.36,.45,.32),xt(i,-2.3/2,.45,7*.2,.45,.32),xt(i,2.3/2,.45,7*.2,.45,.32),xt(i,-2.3/2,.45,7*.36,.45,.32),xt(i,2.3/2,.45,7*.36,.45,.32)],{brake:l,head:u}=go(i,2.3,7,2.8*.3);return{group:i,wheels:c,brake:l,headlights:u,width:2.3,length:7}}function aL(){let i=new st,r=mo(16250866),s=new oe({color:[13840175,1402304,16361509][Math.floor(Math.random()*3)],roughness:.4,metalness:.3});i.add(ft(2.5,3.3*.9,11,r,0,3.3*.52,0,.2)),i.add(et(2.5+.02,.5,11-.4,s,0,3.3*.35,0)),i.add(et(2.5+.04,3.3*.32,11*.86,ei,0,3.3*.72,.3)),i.add(et(2.5*.92,3.3*.5,.04,ei,0,3.3*.68,-11/2+.03)),i.add(et(2.5*.3,.3,.6,wn,-2.5/2-.2,3.3*.7,-11/2+.6)),i.add(et(2.5*.3,.3,.6,wn,2.5/2+.2,3.3*.7,-11/2+.6));let o=[xt(i,-2.5/2,.5,-11*.34,.5,.34),xt(i,2.5/2,.5,-11*.34,.5,.34),xt(i,-2.5/2,.5,11*.3,.5,.34),xt(i,2.5/2,.5,11*.3,.5,.34)],{brake:a,head:c}=go(i,2.5,11,3.3*.28);return{group:i,wheels:o,brake:a,headlights:c,width:2.5,length:11}}function cL(){let i=new st,r=mo(12986408),s=new oe({color:9159498,roughness:1});i.add(ft(1.9*.6,.9,2.2,r,0,.9,-6.5/2+1.3,.1)),i.add(ft(.5,.6,.5,wn,0,1.75,-6.5/2+1.6,.08)),i.add(et(.08,.9,.08,wn,.35,1.6,-6.5/2+.8));let o=new te(new Tt(.05,.05,1,8),wn);o.position.set(-.3,1.8,-6.5/2+.8),i.add(o),i.add(ft(1.9,.6,3.6,new oe({color:6111287,roughness:1}),0,.8,1.2,.05)),i.add(ft(1.9*1.1,1.4,3.4,s,0,1.7,1.2,.3));let a=[xt(i,-1.9*.3,.3,-6.5/2+.5,.3,.2),xt(i,1.9*.3,.3,-6.5/2+.5,.3,.2),xt(i,-1.9*.38,.62,-6.5/2+1.9,.62,.4),xt(i,1.9*.38,.62,-6.5/2+1.9,.62,.4),xt(i,-1.9/2,.4,1.2,.4,.24),xt(i,1.9/2,.4,1.2,.4,.24)],{brake:c,head:l}=go(i,1.9*.6,6.5,.9);return{group:i,wheels:a,brake:c,headlights:l,width:1.9,length:6.5}}var PM=[16777215,12632256,2829099,12000284,1713022,7951688,14737632,5125166,6323595,16498733,1118481,9306168];function FM(n){switch(n){case"microbus":return OM();case"tuktuk":return sL();case"truck":return oL();case"bus":return aL();case"tractor":return cL();default:return LM(PM[Math.floor(Math.random()*PM.length)])}}function kM(n){return n.id==="microbus"?OM():n.id==="jeep"?rL(n.color):LM(n.color,n.width,n.length,n.height)}function BM(n,e=.5){let r=document.createElement("canvas");r.width=512,r.height=512;let s=r.getContext("2d");s.fillStyle="#3a3a3f",s.fillRect(0,0,512,512);for(let c=0;c<2600;c++)s.fillStyle=Math.random()>.5?"rgba(255,255,255,.035)":"rgba(0,0,0,.07)",s.fillRect(Math.random()*512,Math.random()*512,2,2);let o=512/n;for(let c=0;c<n;c++)s.fillStyle=`rgba(0,0,0,${.08*e})`,s.fillRect(c*o+o*.2,0,o*.18,512),s.fillRect(c*o+o*.62,0,o*.18,512);s.strokeStyle="rgba(0,0,0,.25)",s.lineWidth=2;for(let c=0;c<6*e;c++){s.beginPath();let l=Math.random()*512,u=Math.random()*512;s.moveTo(l,u);for(let d=0;d<5;d++)l+=(Math.random()-.5)*40,u+=Math.random()*30,s.lineTo(l,u);s.stroke()}s.fillStyle="rgba(214,180,70,.85)",s.fillRect(6,0,6,512),s.fillRect(500,0,6,512),s.fillStyle="rgba(225,225,220,.82)";for(let c=1;c<n;c++){let l=Math.round(c*o)-3;for(let u=0;u<512;u+=96)s.fillRect(l,u,6,48)}let a=new Jn(r);return a.wrapS=Wn,a.wrapT=Wn,a.colorSpace=zt,a.anisotropy=8,a}function HM(){let e=document.createElement("canvas");e.width=256,e.height=256;let t=e.getContext("2d"),i=t.createImageData(256,256),r=new Float32Array(256*256);for(let a=0;a<r.length;a++)r[a]=Math.random();let s=new Float32Array(256*256);for(let a=0;a<256;a++)for(let c=0;c<256;c++){let l=0;for(let u=-1;u<=1;u++)for(let d=-1;d<=1;d++)l+=r[(a+u+256)%256*256+(c+d+256)%256];s[a*256+c]=l/9}for(let a=0;a<256;a++)for(let c=0;c<256;c++){let l=s[a*256+(c-1+256)%256],u=s[a*256+(c+1)%256],d=s[(a-1+256)%256*256+c],f=s[(a+1)%256*256+c],h=(a*256+c)*4;i.data[h]=128+(l-u)*220,i.data[h+1]=128+(d-f)*220,i.data[h+2]=255,i.data[h+3]=255}t.putImageData(i,0,0);let o=new Jn(e);return o.wrapS=Wn,o.wrapT=Wn,o}function VM(n){let e=document.createElement("canvas");e.width=128,e.height=128;let t=e.getContext("2d");t.fillStyle=n,t.fillRect(0,0,128,128);for(let r=0;r<700;r++)t.fillStyle=Math.random()>.5?"rgba(255,255,255,.12)":"rgba(0,0,0,.14)",t.fillRect(Math.random()*128,Math.random()*128,2,2);let i=new Jn(e);return i.wrapS=Wn,i.wrapT=Wn,i.colorSpace=zt,i}function yv(n,e,t){let r=64*e,s=document.createElement("canvas");s.width=256,s.height=r;let o=s.getContext("2d");if(n){let u=["#d8c9a8","#cdb892","#e2d7bf","#bfae8f","#d6bfa0","#efe9dc"];o.fillStyle=u[Math.floor(Math.random()*u.length)],o.fillRect(0,0,256,r),o.fillStyle="rgba(0,0,0,.14)";for(let d=0;d<e;d++)o.fillRect(0,d*64+54,256,4)}else{o.fillStyle="#9a4a2c",o.fillRect(0,0,256,r),o.fillStyle="rgba(0,0,0,.18)";for(let u=0;u<r;u+=8){let d=u/8%2?10:0;for(let f=-10;f<256;f+=20)o.fillRect(f+d,u,19,1);o.fillRect(0,u+7,256,1)}o.fillStyle="#b9b2a6";for(let u=0;u<e;u++)o.fillRect(0,u*64,256,6);for(let u=0;u<256;u+=64)o.fillRect(u,0,8,r)}let a=o.createLinearGradient(0,r,0,r-90);a.addColorStop(0,"rgba(0,0,0,.42)"),a.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=a,o.fillRect(0,r-90,256,90);let c=o.createLinearGradient(0,0,0,60);c.addColorStop(0,"rgba(255,250,230,.14)"),c.addColorStop(1,"rgba(255,250,230,0)"),o.fillStyle=c,o.fillRect(0,0,256,60);for(let u=0;u<e;u++)for(let d=20;d<236;d+=48){let f=Math.random()>(t?.35:.8);o.fillStyle=f?"#f7e3a1":"#1b2430",o.fillRect(d,u*64+18,26,30),o.fillStyle="rgba(255,255,255,.25)",o.fillRect(d,u*64+18,26,2),Math.random()>.6&&(o.fillStyle="#cfcfcf",o.fillRect(d+4,u*64+50,18,9))}let l=new Jn(s);return l.colorSpace=zt,l}var UM=["\u0639\u0631\u0648\u0636 \u0627\u0644\u0639\u064A\u062F \xB7 \u062E\u0635\u0645 \u0665\u0660\u066A","\u0634\u0642\u0642 \u062A\u0645\u0644\u064A\u0643 \xB7 \u0645\u0642\u062F\u0645 \u0661\u0660\u066A","\u0643\u0634\u0631\u064A \u0623\u0628\u0648 \u0637\u0627\u0631\u0642","\u0627\u0634\u062A\u0631\u0643 \u062F\u0644\u0648\u0642\u062A\u064A","\u0645\u062F\u064A\u0646\u0629 \u062C\u062F\u064A\u062F\u0629 \xB7 \u0633\u0627\u0639\u0629 \u0645\u0646 \u0647\u0646\u0627","\u0628\u0637\u0627\u0637\u0633 \u0634\u064A\u0628\u0633\u064A","\u0633\u064A\u0631\u0627\u0645\u064A\u0643 \u0643\u0644\u064A\u0648\u0628\u0627\u062A\u0631\u0627","\u0633\u0648\u0628\u0631 \u0645\u0627\u0631\u0643\u062A \u0662\u0664 \u0633\u0627\u0639\u0629","\u0634\u0627\u0644\u064A\u0647\u0627\u062A \u0627\u0644\u0633\u0627\u062D\u0644 \xB7 \u0642\u0633\u0651\u0637 \u0639\u0644\u0649 \u0668 \u0633\u0646\u064A\u0646","\u0643\u0627\u0628\u062A\u0646 \u0645\u0627\u062C\u062F \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062A","\u0639\u0635\u064A\u0631 \u0642\u0635\u0628 \u0623\u0628\u0648 \u0639\u0648\u0641","\u0645\u0648\u0644 \u062C\u062F\u064A\u062F \xB7 \u0627\u0641\u062A\u062A\u0627\u062D \u0642\u0631\u064A\u0628"];function zM(){let t=document.createElement("canvas");t.width=512,t.height=256;let i=t.getContext("2d"),r=["#d32f2f","#1565c0","#2e7d32","#ef6c00","#6a1b9a","#00838f"];i.fillStyle=r[Math.floor(Math.random()*r.length)],i.fillRect(0,0,512,256),i.fillStyle="rgba(255,255,255,.12)",i.fillRect(0,256*.62,512,256*.38),i.fillStyle="#ffffff",i.font='bold 56px "Changa", "Cairo", sans-serif',i.textAlign="center",i.textBaseline="middle",i.direction="rtl",i.fillText(UM[Math.floor(Math.random()*UM.length)],512/2,256*.42),i.font='28px "Cairo", sans-serif',i.fillStyle="rgba(255,255,255,.85)",i.fillText("\u0627\u062A\u0635\u0644 \u0661\u0669\u0660\u0660\u0660",512/2,256*.8);let s=new Jn(t);return s.colorSpace=zt,s}function Wl(n,e,t="#ffffff",i=""){let r=document.createElement("canvas");r.width=256,r.height=128;let s=r.getContext("2d");s.fillStyle=e,s.fillRect(0,0,256,128),s.strokeStyle=t,s.lineWidth=8,s.strokeRect(6,6,244,116),s.fillStyle=t,s.font=`bold ${i?44:54}px "Changa", "Cairo", sans-serif`,s.textAlign="center",s.textBaseline="middle",s.direction="rtl",s.fillText(n,128,i?48:66),i&&(s.font='24px "Cairo", sans-serif',s.fillText(i,128,92));let o=new Jn(r);return o.colorSpace=zt,o}function GM(){let n=document.createElement("canvas");n.width=256,n.height=256;let e=n.getContext("2d");e.fillStyle="#2a7fb8",e.fillRect(0,0,256,256),e.strokeStyle="rgba(255,255,255,.22)",e.lineWidth=2;for(let i=0;i<18;i++){e.beginPath();let r=Math.random()*256;e.moveTo(0,r);for(let s=0;s<=256;s+=16)e.lineTo(s,r+Math.sin(s/20+i)*4);e.stroke()}let t=new Jn(n);return t.wrapS=Wn,t.wrapT=Wn,t.colorSpace=zt,t}function WM(){let n=document.createElement("canvas");n.width=128,n.height=256;let e=n.getContext("2d");e.fillStyle="#b89a6a",e.fillRect(0,0,128,256),e.strokeStyle="rgba(60,40,20,.6)",e.lineWidth=3;for(let i=-8;i<8;i++)e.beginPath(),e.moveTo(i*32,0),e.lineTo(i*32+128,256),e.stroke(),e.beginPath(),e.moveTo(i*32+128,0),e.lineTo(i*32,256),e.stroke();let t=new Jn(n);return t.wrapS=Wn,t.wrapT=Wn,t.repeat.set(4,6),t.colorSpace=zt,t}var lL=-170,xv=30,vo=600,Si=2.4,xs=class n{scene=new ro;sun=new gl(16777215,2.4);sky=new fl(12574719,8022608,1.2);route=lr[0];lanes=4;halfRoad=4*gn/2;road=null;asphalt=HM();roadTex=null;shoulders=[];kerbs=[];ground=null;sea=null;seaTex=null;scenery=[];landmark=null;landmarkTimer=0;lamps=[];spinners=[];bridges=[];stars=null;dome=null;domeMat=null;sunDisc=null;moon=null;built=!1;night=!1;dayColor=new we(10406399);duskColor=new we(15899235);nightColor=new we(659236);build(){if(this.built)return;this.built=!0,this.scene.fog=new $c(10406399,70,210),this.scene.background=this.dayColor.clone(),this.domeMat=new Nt({side:fn,depthWrite:!1,fog:!1,uniforms:{top:{value:new we(5214166)},horizon:{value:new we(14281983)},sunDir:{value:new N(.3,.6,-.7)},sunColor:{value:new we(16773572)},night:{value:0}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir; uniform vec3 sunColor; uniform float night;
        varying vec3 vDir;
        void main(){
          float h = clamp(vDir.y, 0.0, 1.0);
          vec3 c = mix(horizon, top, pow(h, 0.6));
          float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
          c += sunColor * (pow(s, 48.0) * 0.9 + pow(s, 6.0) * 0.18) * (1.0 - night);
          gl_FragColor = vec4(c, 1.0);
        }`}),this.dome=new te(new oi(420,24,12),this.domeMat),this.dome.position.set(0,-20,-120),this.scene.add(this.dome),this.sun.position.set(30,60,-20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.left=-40,this.sun.shadow.camera.right=40,this.sun.shadow.camera.top=60,this.sun.shadow.camera.bottom=-60,this.sun.shadow.camera.far=200,this.sun.shadow.bias=-5e-4,this.scene.add(this.sun,this.sky);let e=new Wt,t=[];for(let i=0;i<900;i++){let r=Math.random()*Math.PI*2,s=Math.random()*Math.PI*.45+.05;t.push(Math.cos(r)*Math.cos(s)*300,Math.sin(s)*300,Math.sin(r)*Math.cos(s)*300-100)}e.setAttribute("position",new vt(t,3)),this.stars=new so(e,new as({color:16777215,size:1.6,transparent:!0,opacity:0,fog:!1})),this.scene.add(this.stars),this.sunDisc=new te(new oi(9,16,16),new gr({color:16774084,fog:!1})),this.moon=new te(new oi(6,16,16),new gr({color:15265023,fog:!1})),this.scene.add(this.sunDisc,this.moon),this.setRoute(this.route)}setRoute(e){this.route=e,this.lanes=e.lanes,this.halfRoad=e.lanes*gn/2;for(let o of this.scenery)this.scene.remove(o.group),this.dispose(o.group);this.scenery.length=0,this.landmark&&(this.scene.remove(this.landmark.group),this.dispose(this.landmark.group),this.landmark=null);for(let o of this.bridges)this.scene.remove(o);this.bridges=[],this.spinners.length=0;for(let o of[this.road,this.ground,this.sea,...this.shoulders,...this.kerbs])o&&this.scene.remove(o);this.shoulders=[],this.kerbs=[],this.sea=null;let t=this.halfRoad*2;this.roadTex=BM(e.lanes,e.scenery==="desert"||e.scenery==="coast"?.2:.8),this.roadTex.repeat.set(1,vo/15),this.asphalt.repeat.set(4,vo/4),this.road=new te(new sn(t+.4,vo),new oe({map:this.roadTex,normalMap:this.asphalt,normalScale:new Ee(.35,.35),roughness:.82,metalness:.1,envMapIntensity:.3})),this.road.rotation.x=-Math.PI/2,this.road.position.set(0,0,-200),this.road.receiveShadow=!0,this.scene.add(this.road);let i=e.scenery==="fields"?"#8a7a55":"#b8a888";for(let o of[-1,1]){let a=VM(i);a.repeat.set(1,60);let c=new te(new sn(Si,vo),new oe({map:a,roughness:1}));c.rotation.x=-Math.PI/2,c.position.set(o*(this.halfRoad+Si/2+.2),-.01,-200),c.receiveShadow=!0,this.scene.add(c),this.shoulders.push(c);let l=new te(new Ge(.5,.25,vo),new oe({color:e.scenery==="city"||e.scenery==="sea"?14277081:10395294}));l.position.set(o*(this.halfRoad+Si+.5),.12,-200),l.castShadow=!0,this.scene.add(l),this.kerbs.push(l)}if(this.ground=new te(new sn(500,vo+200),new oe({color:e.ground,roughness:1,envMapIntensity:.15})),this.ground.rotation.x=-Math.PI/2,this.ground.position.set(0,-.05,-200),this.ground.receiveShadow=!0,this.scene.add(this.ground),e.scenery==="sea"||e.scenery==="coast"){this.seaTex=GM(),this.seaTex.repeat.set(8,30);let o=e.scenery==="sea"?24:60;this.sea=new te(new sn(300,vo+200),new oe({map:this.seaTex,roughness:.25,metalness:.2})),this.sea.rotation.x=-Math.PI/2,this.sea.position.set(this.halfRoad+o+150,-.3,-200),this.scene.add(this.sea)}let r=-10,s=Math.round(44*Math.max(.5,e.density));for(let o=0;o<s;o++){let a=o%2===0?-1:1,c=this.makeScenery(a);c.group.position.z=r,this.scene.add(c.group),this.scenery.push(c),o%2===1&&(r-=12/e.density)}if(e.scenery==="city")for(let o=0;o<2;o++){let a=this.makeBridge();a.position.z=-200-o*400,this.scene.add(a),this.bridges.push(a)}this.landmarkTimer=60,this.setDayPhase(e.startPhase)}advance(e,t){this.roadTex&&(this.roadTex.offset.y-=e/15);for(let i of this.shoulders)i.material.map.offset.y-=e/10;this.seaTex&&(this.seaTex.offset.y-=e/60+t*.02);for(let i of this.scenery)if(i.group.position.z+=e,i.group.position.z>xv){let r=Math.sign(i.group.position.x)||1,s=this.makeScenery(r);s.group.position.z=this.farthestZ()-12/this.route.density,this.scene.remove(i.group),this.dispose(i.group),i.group=s.group,i.length=s.length,this.scene.add(s.group)}for(let i of this.bridges)i.position.z+=e,i.position.z>xv&&(i.position.z-=800);this.landmarkTimer-=e,this.landmark?(this.landmark.group.position.z+=e*.6,this.landmark.group.position.z>120&&(this.scene.remove(this.landmark.group),this.dispose(this.landmark.group),this.landmark=null)):this.landmarkTimer<=0&&this.route.landmarks.length&&(this.landmark=this.makeLandmark(bi(this.route.landmarks)),this.landmark.group.position.z=-320,this.scene.add(this.landmark.group),this.landmarkTimer=qn(700,1400));for(let i of this.spinners)i.mesh.rotation.z+=i.rate*t}setDayPhase(e){let t=new we,i=e%1;i<.25?t.lerpColors(this.dayColor,this.duskColor,i/.25):i<.4?t.lerpColors(this.duskColor,this.nightColor,(i-.25)/.15):i<.65?t.copy(this.nightColor):i<.8?t.lerpColors(this.nightColor,this.duskColor,(i-.65)/.15):t.lerpColors(this.duskColor,this.dayColor,(i-.8)/.2);let r=new we(this.route.haze),s=t.clone().lerp(r,i<.25||i>.8?.35:0);if(this.scene.background.copy(s),this.scene.fog.color.copy(s),this.domeMat){let c=this.domeMat.uniforms;c.horizon.value.copy(s),c.top.value.copy(s).multiplyScalar(.55).lerp(new we(3896520),i<.22||i>.82?.5:0),c.night.value=i>.3&&i<.75?1:0;let l=i*Math.PI*2;c.sunDir.value.set(Math.sin(l)*.5,Math.cos(l)*.6+.1,-.7).normalize(),c.sunColor.value.set(i>.12&&i<.3?16756848:16773572)}let o=i>.32&&i<.72?1:i>.22&&i<.82?.5:0;this.night=o===1,this.sun.intensity=2.4-o*2.1,this.sun.color.set(i>.12&&i<.3?16756848:16777215),this.sky.intensity=1.2-o*.95;for(let c of this.lamps)c.emissiveIntensity=o>0?3:0;this.stars&&(this.stars.material.opacity=o);let a=i*Math.PI*2;this.sunDisc&&(this.sunDisc.position.set(Math.sin(a)*120,Math.cos(a)*110+10,-260),this.sunDisc.visible=this.sunDisc.position.y>-5),this.moon&&(this.moon.position.set(-Math.sin(a)*120,-Math.cos(a)*110+10,-260),this.moon.visible=this.moon.position.y>-5)}get isNight(){return this.night}farthestZ(){return this.scenery.reduce((e,t)=>Math.min(e,t.group.position.z),0)}makeScenery(e){switch(this.route.scenery){case"desert":return this.desertPiece(e);case"sea":return e>0?this.cornichePiece():this.cityPiece(e,!0);case"coast":return e>0?this.beachPiece():Sn(.6)?this.compoundPiece(e):this.desertPiece(e);case"fields":return this.fieldsPiece(e);case"giza":return Sn(.5)?this.cityPiece(e,!1,2,5):this.palmsPiece(e);default:return this.cityPiece(e,!1)}}edge(e,t=3){return e*(this.halfRoad+Si+t)}cityPiece(e,t,i=3,r=10){let s=new st,o=Math.random(),a=this.edge(e);if(o<.62){let c=i+Math.floor(Math.random()*(r-i)),l=t||Math.random()>.55,u=7+Math.random()*5,d=8+Math.random()*6,f=c*3,h=yv(l,c,this.night),m=new oe({map:h,roughness:.9}),_=new oe({color:l?13483420:9388842,roughness:.9}),g=new te(new Ge(u,f,d),[_,m,_,_,_,m]);g.position.set(a+e*(u/2),f/2,0),g.castShadow=!0,g.receiveShadow=!0,s.add(g);let p=new oe({color:l?14275264:11577497,roughness:.95}),b=new oe({color:3815994,roughness:.6,metalness:.4});for(let E=1;E<c;E++){if(Math.random()>.65)continue;let M=a+e*.5,S=E*3+.1,C=(Math.random()-.5)*(d-3),y=new te(new Ge(1.2,.18,2.4),p);y.position.set(M,S,C),y.castShadow=!0;let w=new te(new Ge(.05,.9,2.4),b);if(w.position.set(M-e*.58,S+.5,C),s.add(y,w),Math.random()>.6){let A=new te(new Ge(.5,.45,.7),new oe({color:14211288,roughness:.7}));A.position.set(a+e*.3,S+1.9,C+1.6),s.add(A)}}let D=new te(new Tt(.7,.7,1.2,10),new oe({color:2829099}));if(D.position.set(a+e*(u/2)+(Math.random()-.5)*2,f+.6,(Math.random()-.5)*3),s.add(D),!l&&Math.random()>.5){let E=new te(new Ge(u*.9,1.4,d*.9),_);E.position.set(a+e*(u/2),f+.7,0),s.add(E)}if(Sn(.7)){let E=new te(new Ge(u*.5,2.6,.2),new oe({color:1382946,emissive:this.night?3812880:0}));E.position.set(a+e*.1,1.3,0);let M=new te(new Ge(u*.6,.12,1.4),new oe({color:bi([11680298,1994677,3046706,13214247]),roughness:.9}));M.position.set(a-e*.6,2.7,0),M.rotation.x=e*.25,s.add(E,M)}return s.add(this.makeLamp(e*(this.halfRoad+Si+1.2),-3)),{group:s,length:d}}return o<.82?this.palmsPiece(e):this.billboardPiece(e)}palmsPiece(e){let t=new st,i=this.edge(e);for(let r=0;r<3;r++)t.add(this.makePalm(i+e*(1+Math.random()*6),-4+r*4));return Sn(.5)&&t.add(this.makeLamp(e*(this.halfRoad+Si+1.2),0)),{group:t,length:12}}billboardPiece(e){let t=new st,i=this.edge(e),r=new te(new Tt(.25,.3,9,8),new oe({color:5592405}));r.position.set(i+e*2,4.5,0),t.add(r);let s=new te(new sn(10,5),new oe({map:zM(),roughness:.6,emissive:1118481}));s.position.set(i+e*2,11,0),s.rotation.y=e<0?Math.PI*.42:-Math.PI*.42,t.add(s);let o=s.clone();return o.rotation.y+=Math.PI,t.add(o),{group:t,length:12}}desertPiece(e){let t=new st,i=this.edge(e,6),r=Math.random();if(r<.7){let s=30+Math.random()*40,o=30+Math.random()*30,a=new sn(s,o,10,8),c=a.attributes.position,l=2+Math.random()*6;for(let d=0;d<c.count;d++){let f=c.getX(d)/s,h=c.getY(d)/o;c.setZ(d,Math.max(0,Math.cos(f*Math.PI)*Math.cos(h*Math.PI))*l+Math.random()*.4)}a.computeVertexNormals();let u=new te(a,new oe({color:bi([14730639,14072191,15258272]),roughness:1}));return u.rotation.x=-Math.PI/2,u.position.set(i+e*(s/2),0,0),u.receiveShadow=!0,t.add(u),Sn(.3)&&t.add(this.makeRocks(i+e*4,0)),{group:t,length:o*.7}}if(r<.85){let s=new te(new Ge(16,.6,10),new oe({color:16119285}));s.position.set(i+e*10,5,0),s.castShadow=!0,t.add(s);for(let[c,l]of[[-6,-3],[6,-3],[-6,3],[6,3]]){let u=new te(new Tt(.2,.2,5,8),new oe({color:12434877}));u.position.set(i+e*10+c,2.5,l),t.add(u)}let o=new te(new Ge(10,4,7),new oe({color:16777215}));o.position.set(i+e*22,2,0),t.add(o);let a=new te(new sn(4,2),new oe({map:Wl("\u0628\u0646\u0632\u064A\u0646\u0629","#d32f2f","#ffffff","\u0643\u0627\u0641\u064A\u062A\u0631\u064A\u0627 \xB7 \u062D\u0645\u0651\u0627\u0645"),side:Nn,emissive:2236962}));return a.position.set(i+e*3,7,0),a.rotation.y=e<0?Math.PI/2:-Math.PI/2,t.add(a),t.add(this.makeLamp(e*(this.halfRoad+Si+1.2),-6)),{group:t,length:36}}return this.billboardPiece(e)}cornichePiece(){let e=new st,t=this.edge(1,.5),i=new te(new Ge(.6,1.1,12),new oe({color:15131350}));i.position.set(t+6,.55,0),e.add(i);let r=new te(new Ge(6,.2,12),new oe({color:13617077}));r.position.set(t+3,.1,0),r.receiveShadow=!0,e.add(r);for(let s=0;s<2;s++)e.add(this.makePalm(t+2+Math.random()*2,-4+s*6));if(e.add(this.makeLamp(this.halfRoad+Si+1.2,-2)),Sn(.4)){let s=new te(new Xi(1.2,.6,8),new oe({color:bi([15684432,4367861,16772696])}));s.position.set(t+4.5,2,2),e.add(s)}return{group:e,length:12}}beachPiece(){let e=new st,t=this.edge(1,4),i=new te(new sn(60,30),new oe({color:15786685,roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(t+30,.01,0),e.add(i);for(let r=0;r<3;r++){let s=new te(new Xi(1.4,.7,8),new oe({color:bi([15684432,4367861,16772696,16777215])}));s.position.set(t+40+Math.random()*15,2,-8+r*8);let o=new te(new Tt(.05,.05,2,6),new oe({color:16777215}));o.position.copy(s.position).setY(1),e.add(s,o)}return e.add(this.makePalm(t+2+Math.random()*4,0)),{group:e,length:24}}compoundPiece(e){let t=new st,i=this.edge(e,5),r=new te(new Ge(.5,2.6,36),new oe({color:15920868}));r.position.set(i,1.3,0),t.add(r);let s=new oe({color:16448250,roughness:.8}),o=new oe({color:11680298,roughness:.9});for(let a=0;a<3;a++){let c=i+e*(8+Math.random()*6),l=-12+a*12,u=new te(new Ge(8,5,8),s);u.position.set(c,2.5,l),u.castShadow=!0;let d=new te(new Xi(6.2,2.4,4),o);d.rotation.y=Math.PI/4,d.position.set(c,6.2,l),t.add(u,d),t.add(this.makePalm(c+e*5,l+3))}return t.add(this.makeLamp(e*(this.halfRoad+Si+1.2),-8)),{group:t,length:36}}fieldsPiece(e){let t=new st,i=this.edge(e,1),r=Math.random();if(r<.55){let s=new te(new sn(4,16),new oe({color:5209999,roughness:.3}));s.rotation.x=-Math.PI/2,s.position.set(i+e*3,-.2,0),t.add(s);let o=new oe({color:bi([6265658,8107332,5016111]),roughness:1});for(let a=0;a<6;a++){let c=new te(new Ge(1.2,.5+Math.random()*1.2,15),o);c.position.set(i+e*(8+a*2.2),.4,0),t.add(c)}for(let a=0;a<2;a++)t.add(this.makePalm(i+e*(22+Math.random()*8),-6+a*10));return{group:t,length:16}}if(r<.85){let s=1+Math.floor(Math.random()*3),o=s*3,a=5+Math.random()*3,c=yv(Sn(.3),s,this.night),l=new oe({color:9388842,roughness:.9}),u=new te(new Ge(a,o,7),[l,new oe({map:c}),l,l,l,new oe({map:c})]);return u.position.set(i+e*(a/2+1),o/2,0),u.castShadow=!0,t.add(u),Sn(.5)&&t.add(this.makePalm(i+e*(a+4),3)),{group:t,length:10}}return this.palmsPiece(e)}makeLandmark(e){let t=new st,i=Sn(.5)?-1:1,r=this.edge(i,60);switch(e){case"pyramids":{let s=new oe({color:14270348,roughness:1});for(let[o,a,c]of[[0,0,70],[60,-40,58],[110,-70,42]]){let l=new te(new Xi(c,c*.63,4),s);l.rotation.y=Math.PI/4,l.position.set(r+i*(40+o),c*.315,a),t.add(l)}break}case"cairoTower":{let s=new te(new Tt(4,5,90,16,1,!0),new oe({map:WM(),side:Nn}));s.position.set(r,45,-20);let o=new te(new Tt(8,5,8,16),new oe({color:12098154}));o.position.set(r,92,-20),t.add(s,o);break}case"mosque":{let s=new oe({color:15854034}),o=new te(new Ge(22,10,22),s);o.position.set(r,5,0);let a=new te(new oi(8,20,12,0,Math.PI*2,0,Math.PI/2),new oe({color:3046763}));a.position.set(r,10,0);let c=new te(new Tt(1.4,1.8,36,10),s);c.position.set(r+i*14,18,8),t.add(o,a,c);break}case"lighthouse":{let s=new te(new Tt(3,4,40,14),new oe({color:16777215}));s.position.set(this.halfRoad+120,20,0);let o=new te(new Tt(3.5,3.5,6,14),new oe({color:13840175}));o.position.set(this.halfRoad+120,24,0);let a=new oe({color:16773570,emissive:16765803,emissiveIntensity:0});this.lamps.push(a);let c=new te(new oi(2.4,12,12),a);c.position.set(this.halfRoad+120,42,0),t.add(s,o,c);break}case"windmills":{for(let s=0;s<4;s++){let o=r+i*s*40,a=-s*30,c=new te(new Tt(1,1.6,60,10),new oe({color:16119285}));c.position.set(o,30,a);let l=new st;l.position.set(o,60,a+2);for(let u=0;u<3;u++){let d=new te(new Ge(2,26,.6),new oe({color:16777215}));d.position.y=13;let f=new st;f.rotation.z=u/3*Math.PI*2,f.add(d),l.add(f)}this.spinners.push({mesh:l,rate:.6+Math.random()*.4}),t.add(c,l)}break}case"canal":{let s=new te(new sn(14,300),new oe({color:4160138,roughness:.2}));s.rotation.x=-Math.PI/2,s.position.set(this.edge(i,10)+i*7,-.25,-100),t.add(s);break}default:return this.compoundPiece(i)}return{group:t,length:100}}makeRocks(e,t){let i=new st,r=new oe({color:10390378,roughness:1});for(let s=0;s<4;s++){let o=new te(new cl(.4+Math.random()*.8,0),r);o.position.set(e+(Math.random()-.5)*4,.3,t+(Math.random()-.5)*6),o.rotation.set(Math.random(),Math.random(),Math.random()),i.add(o)}return i}makeLamp(e,t){let i=new st,r=new te(new Tt(.08,.12,7,6),new oe({color:9080726}));r.position.set(e,3.5,t),i.add(r);let s=new te(new Ge(1.4,.08,.08),new oe({color:9080726}));s.position.set(e-Math.sign(e)*.6,7,t),i.add(s);let o=new oe({color:16773570,emissive:16765803,emissiveIntensity:0});this.lamps.push(o);let a=new te(new Ge(.9,.2,.4),o);return a.position.set(e-Math.sign(e)*1.2,7,t),i.add(a),i}makePalm(e,t){let i=new st,r=5+Math.random()*4,s=new te(new Tt(.18,.3,r,7),new oe({color:8018490,roughness:1}));s.position.set(e,r/2,t),s.rotation.z=(Math.random()-.5)*.15,s.castShadow=!0,i.add(s);let o=new oe({color:bi([3112250,3836484,2780723]),roughness:.9,side:Nn});for(let c=0;c<8;c++){let l=new te(new Xi(.5,3.4,4),o),u=c/8*Math.PI*2;l.position.set(e+Math.cos(u)*1.2,r+.3,t+Math.sin(u)*1.2),l.rotation.set(Math.sin(u)*1.25,0,-Math.cos(u)*1.25),i.add(l)}let a=new te(new oi(.4,6,6),new oe({color:13073450}));return a.position.set(e,r-.3,t),i.add(a),i}makeBridge(){let e=new st,t=this.halfRoad*2+40,i=new oe({color:12104360,roughness:.95}),r=new te(new Ge(t,1.4,9),i);r.position.set(0,7.5,0),r.castShadow=!0,e.add(r);for(let a of[-1,1]){let c=new te(new Ge(1.6,7,3),i);c.position.set(a*(this.halfRoad+Si+1.6),3.5,0),e.add(c)}let s=new te(new Ge(t,1,.2),new oe({color:4157365}));s.position.set(0,8.7,-4.4),e.add(s);let o=new te(new sn(6,2),new oe({map:Wl(this.route.name,"#1b5e20","#ffffff",this.route.place),emissive:1118481}));return o.position.set(0,5.6,4.6),e.add(o),e}dispose(e){e.traverse(t=>{let i=t;if(!i.isMesh)return;i.geometry.dispose();let r=Array.isArray(i.material)?i.material:[i.material];for(let s of r){let o=s;o.map?.dispose();let a=this.lamps.indexOf(o);a>=0&&this.lamps.splice(a,1),s.dispose()}}),this.spinners.splice(0,this.spinners.length,...this.spinners.filter(t=>!this.contains(e,t.mesh)))}contains(e,t){let i=!1;return e.traverse(r=>{r===t&&(i=!0)}),i}get spawnZ(){return lL}get despawnZ(){return xv}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var uL=3,dL=1.6,Ph=class n{world=ue(xs);parts=null;spec;difficulty;route;x=0;heading=0;shove=0;speed=0;nitroLeft=0;invulnerable=0;shake=0;offRoad=!1;headlights=[];reset(e,t,i){this.spec=e,this.difficulty=t,this.route=i,this.parts&&(this.world.scene.remove(this.parts.group),this.headlights=[]),this.parts=kM(e),this.parts.group.position.set(0,0,0),this.world.scene.add(this.parts.group);for(let r of[-.5,.5]){let s=new pl(16773836,0,70,Math.PI/6,.6,1);s.position.set(r*e.width*.7,e.height*.5,-e.length/2),s.target.position.set(r*e.width*1.2,0,-40),this.parts.group.add(s,s.target),this.headlights.push(s)}this.x=0,this.heading=0,this.shove=0,this.speed=0,this.nitroLeft=0,this.invulnerable=0,this.shake=0,this.offRoad=!1}get maxSpeed(){let e=this.nitroLeft>0?1.45:1;return this.difficulty.maxSpeed*this.route.speed*this.spec.topSpeed*e}get nitroActive(){return this.nitroLeft>0}flick(e){this.heading+=e*.28*this.spec.steering}fireNitro(){this.nitroLeft=uL}takeHit(e){this.speed*=.45,this.invulnerable=dL,this.shake=1,this.nitroLeft=0,this.shove=(this.x>=e?1:-1)*6,this.heading+=(this.x>=e?1:-1)*.25}bump(e=.5){this.speed=Math.min(this.speed,45),this.shake=Math.max(this.shake,e)}update(e,t,i,r,s){if(!this.parts)return;let o=this.maxSpeed,a=this.difficulty.minSpeed+(o-this.difficulty.minSpeed)*.55,c=Math.min(1,this.speed/Math.max(1,this.difficulty.maxSpeed*this.route.speed));this.nitroLeft>0?(this.nitroLeft-=e,this.speed+=(o-this.speed)*Math.min(1,e*1.8)):r?this.speed=Math.max(this.difficulty.minSpeed*.4,this.speed-120*e):i?this.speed=Math.min(o,this.speed+(60-c*25)*e):this.speed+=(a-this.speed)*Math.min(1,e*.5);let l=this.spec.steering*(.42-c*.24);t!==0?(this.heading+=t*this.spec.steering*2.4*e,this.heading=uo.clamp(this.heading,-l*1.6,l*1.6)):this.heading-=this.heading*Math.min(1,e*3.2);let u=this.offRoad?this.spec.grip*.6:this.spec.grip,d=Math.sin(this.heading)*Ei(this.speed)*.55*u+this.shove;this.x+=d*e,this.shove-=this.shove*Math.min(1,e*4);let f=this.world.halfRoad+Si-this.spec.width*.4,h=this.world.halfRoad-this.spec.width*.3;Math.abs(this.x)>f&&(this.x=Math.sign(this.x)*f,this.heading=-Math.sign(this.x)*.15,this.shove=-Math.sign(this.x)*3,this.speed=Math.max(this.difficulty.minSpeed*.5,this.speed*.9),this.shake=Math.max(this.shake,.4)),this.offRoad=Math.abs(this.x)>h,this.offRoad&&(this.speed=Math.max(this.difficulty.minSpeed*.6,this.speed-50*e),this.shake=Math.max(this.shake,.18));let m=this.parts.group;m.position.x=this.x,m.rotation.y=uo.lerp(m.rotation.y,-this.heading*.9,.25),m.rotation.z=uo.lerp(m.rotation.z,-d*.012,.2),m.position.y=this.offRoad?Math.sin(performance.now()/30)*.03:0;for(let p of this.parts.wheels)p.rotation.x+=Ei(this.speed)*e/.34;this.parts.wheels[0].rotation.y=-this.heading*.6,this.parts.wheels[1].rotation.y=-this.heading*.6,this.invulnerable>0?(this.invulnerable-=e,m.visible=Math.floor(this.invulnerable*12)%2===0):m.visible=!0,this.shake=Math.max(0,this.shake-e*2.2);for(let p of this.headlights)p.intensity=s?60:0;let _=this.parts.headlights.material;_.emissive.setHex(s?16773296:0),_.emissiveIntensity=2.5;let g=this.parts.brake.material;g.emissive.setHex(r?16718362:s?8912896:0),g.emissiveIntensity=r?3:1.2}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var jM=[15843965,14724201,13010498,9262372,16767916],qM=[16777215,1402304,3046706,10395294,6111287,0,13840175,16498733];function _v(){let n=new st,e=new oe({color:jM[Math.floor(Math.random()*jM.length)],roughness:.9}),t=new oe({color:qM[Math.floor(Math.random()*qM.length)],roughness:.9}),i=new oe({color:Math.random()>.5?2503224:3622735,roughness:.9}),r=new te(new oi(.16,10,10),e);r.position.y=1.62;let s=new te(new oi(.165,10,6,0,Math.PI*2,0,Math.PI/2),new oe({color:1710618}));s.position.y=1.64;let o=new te(new Ge(.42,.6,.24),t);o.position.y=1.16;let a=new te(new Ge(.38,.86,.22),i);a.position.y=.43;let c=()=>{let d=new te(new Ge(.11,.56,.11),t);return d.geometry.translate(0,-.28,0),d.position.y=1.42,d},l=c();l.position.x=-.27;let u=c();return u.position.x=.27,n.add(r,s,o,a,l,u),n.traverse(d=>d.castShadow=!0),{group:n,leftArm:l,rightArm:u,bubble:null}}function jl(n,e,t){n.bubble&&(n.group.remove(n.bubble),n.bubble.material.map?.dispose(),n.bubble.material.dispose());let i=document.createElement("canvas");i.width=512,i.height=160;let r=i.getContext("2d");r.fillStyle="rgba(255,255,255,.96)";let s=28;r.beginPath(),r.moveTo(s,10),r.lineTo(512-s,10),r.quadraticCurveTo(502,10,502,10+s),r.lineTo(502,120-s),r.quadraticCurveTo(502,120,512-s,120),r.lineTo(280,120),r.lineTo(256,150),r.lineTo(232,120),r.lineTo(s,120),r.quadraticCurveTo(10,120,10,120-s),r.lineTo(10,10+s),r.quadraticCurveTo(10,10,s,10),r.closePath(),r.fill(),r.fillStyle="#1b1200",r.font='bold 44px "Changa", "Cairo", sans-serif',r.textAlign="center",r.textBaseline="middle",r.direction="rtl",r.fillText(e,256,66);let o=new Jn(i);o.colorSpace=zt;let a=new el(new ba({map:o,depthTest:!1,transparent:!0}));a.scale.set(3.2,1,1),a.position.y=2.4,a.renderOrder=10,n.group.add(a),n.bubble=a}function Ev(n){n.bubble&&(n.group.remove(n.bubble),n.bubble.material.map?.dispose(),n.bubble.material.dispose(),n.bubble=null)}function Lh(n,e,t){n.rightArm.rotation.z=-2.4+Math.sin(e*14)*.5,n.rightArm.rotation.x=Math.sin(e*9)*.3,t?(n.leftArm.rotation.z=2.4-Math.sin(e*14+1)*.5,n.leftArm.rotation.x=Math.cos(e*9)*.3):n.leftArm.rotation.z=.2}function XM(n){n.leftArm.rotation.set(0,0,.1),n.rightArm.rotation.set(0,0,-.1)}var YM=["\u0641\u064A\u0646 \u0639\u064A\u0646\u0643 \u064A\u0627 \u0639\u0645\u061F!","\u0634\u0648\u0641 \u0642\u062F\u0627\u0645\u0643!","\u0625\u0646\u062A \u0646\u0627\u064A\u0645\u061F!","\u062D\u0627\u0633\u0628 \u064A\u0627 \u0628\u0627\u0634\u0627!","\u064A\u0627 \u0639\u0645 \u0625\u0646\u062A!","\u0645\u0627\u0634\u064A \u064A\u0627 \u0623\u0633\u0637\u0649\u061F!"],yo=[["\u0625\u0646\u062A \u0623\u0639\u0645\u0649\u061F!","\u0645\u064A\u0646 \u0627\u0644\u0644\u064A \u0623\u0639\u0645\u0649\u061F!"],["\u0639\u0631\u0628\u064A\u062A\u064A \u064A\u0627 \u0639\u0645!","\u0639\u0631\u0628\u064A\u062A\u0643 \u0625\u064A\u0647\u061F \u0625\u0646\u062A \u0627\u0644\u0644\u064A \u062C\u0627\u064A \u0639\u0644\u064A\u0627!"],["\u0647\u0627\u062A \u0631\u062E\u0635\u062A\u0643!","\u0631\u062E\u0635\u062A\u064A \u0641\u064A \u062C\u064A\u0628\u064A\u060C \u0639\u0627\u064A\u0632 \u0625\u064A\u0647\u061F"],["\u062D\u0627\u0633\u0628 \u0628\u0642\u0649!","\u0623\u0646\u0627 \u0627\u0644\u0644\u064A \u0623\u062D\u0627\u0633\u0628\u061F!"],["\u062E\u0644\u0627\u0635 \u064A\u0627 \u0639\u0645\u2026 \u0645\u0627\u0634\u064A","\u0645\u0627\u0634\u064A \u0645\u0627\u0634\u064A\u060C \u0631\u0628\u0646\u0627 \u064A\u0647\u062F\u064A\u0643"]];var bv=80,Oh=class n{world=ue(xs);entities=[];hazards=[];pickups=[];spawnAcc=0;hazardAcc=0;pickupAcc=0;difficulty;route;levelBoost=1;scene3=null;lastHit=null;clock=0;coinGeo=new Tt(.45,.45,.12,14);coinMat=new oe({color:16762941,metalness:.8,roughness:.25,emissive:9067008,emissiveIntensity:.6});canGeo=new Tt(.3,.3,.9,10);canMat=new oe({color:58879,emissive:48340,emissiveIntensity:1.2});get lanes(){return this.world.lanes}reset(e,t){this.difficulty=e,this.route=t,this.levelBoost=1;for(let i of this.entities)this.world.scene.remove(i.parts.group);for(let i of this.hazards)this.world.scene.remove(i.group);for(let i of this.pickups)this.world.scene.remove(i.mesh);this.entities=[],this.hazards=[],this.pickups=[],this.spawnAcc=0,this.hazardAcc=-4,this.pickupAcc=0,this.endScene();for(let i=0;i<7;i++)this.spawnVehicle(-50-i*18)}setLevel(e){this.levelBoost=1+(e-1)*.12}update(e,t,i){this.clock+=e,this.playScene(e);let r={hits:0,hitFromX:0,severe:!1,nearMisses:0,coins:0,nitroCans:0,fines:0,bumps:0,potholes:0,sand:0,honks:[],radarLimit:bv},s=this.difficulty.maxSpeed*this.route.speed,o=.35+t.speed/s;for(this.spawnAcc+=this.difficulty.spawnRate*this.levelBoost*o*e*(this.lanes/4+.4);this.spawnAcc>=1;)this.spawnAcc-=1,this.spawnVehicle();this.hazardAcc+=o*e,this.hazardAcc>qn(5,9)&&(this.hazardAcc=0,this.spawnHazard()),this.pickupAcc+=o*e,this.pickupAcc>3.5&&(this.pickupAcc=0,this.spawnPickups());let a=Ei(t.speed),c=t.width/2,l=t.length/2;for(let u of this.entities){this.drive(u,e),u.prevZ=u.z,u.z+=(a-Ei(u.speed))*e,u.parts.group.position.set(u.x,0,u.z);for(let _ of u.parts.wheels)_.rotation.x+=Ei(u.speed)*e/.34;this.setLights(u.parts,u.braking>0||u.speed<u.cruise*.7,i);let d=Math.abs(u.x-t.x),f=Math.abs(u.z),h=d<(u.parts.width/2+c)*.88,m=f<(u.parts.length/2+l)*.9;h&&m&&!u.hit?(u.hit=!0,t.invulnerable||(r.hits++,r.hitFromX=u.x,r.severe=Math.abs(t.speed-u.speed)>45||Math.abs(u.x-t.x)<(u.parts.width/2+c)*.5,this.lastHit=u),u.shoved=2,u.speed=Math.max(u.speed,t.speed)+25):!u.passed&&!u.hit&&d<u.parts.width/2+c+1.1&&this.crossed(u.prevZ,u.z)&&(u.passed=!0,r.nearMisses++,!u.honked&&Sn(.5)&&(u.honked=!0,r.honks.push({kind:u.kind,dx:u.x-t.x})))}for(let u of this.hazards){if(u.prevZ=u.z,u.z+=a*e,u.group.position.z=u.z,u.done)continue;let d=u.lanes.some(f=>Math.abs(Ln(f,this.lanes)-t.x)<gn*.55);if(u.kind==="cones"){let f=u.lanes.reduce((h,m)=>Math.min(h,Math.abs(Ln(m,this.lanes)-t.x)),99);f<gn/2+c*.9&&Math.abs(u.z)<u.length/2+l*.9&&(u.done=!0,t.invulnerable||(r.hits++,r.hitFromX=t.x+(f<.1?1:0)));continue}this.crossed(u.prevZ,u.z)&&(u.done=!0,u.kind==="radar"?t.speed>bv&&r.fines++:u.kind==="bump"?t.speed>60&&r.bumps++:u.kind==="pothole"&&d?r.potholes++:u.kind==="sand"&&d&&r.sand++)}for(let u of this.pickups)u.z+=a*e,u.mesh.position.z=u.z,u.mesh.rotation.y+=e*4,!u.taken&&Math.abs(u.z)<1.6&&Math.abs(Ln(u.lane,this.lanes)-t.x)<gn*.6&&(u.taken=!0,u.mesh.visible=!1,u.kind==="coin"?r.coins++:r.nitroCans++);return this.recycle(),r}react(e,t,i){let r=this.lastHit;if(!r||this.scene3)return 0;let s=_v();if(!e){let l=r.x>t?-1:1;return s.group.position.set(l*(r.parts.width/2+.05),.25,-r.parts.length*.15),s.group.rotation.y=l>0?Math.PI/2:-Math.PI/2,s.group.scale.set(.9,.9,.9),r.parts.group.add(s.group),jl(s,bi(YM),this.world.scene),this.scene3={driver:s,player:null,entity:r,left:1.8,total:1.8,line:0,severe:e},0}r.frozen=99,r.shoved=0,r.speed=0;let o=-(i/2+1.6),a=Math.sign(r.x-t)||1;s.group.position.set(t+a*.7,0,o),s.group.rotation.y=a>0?Math.PI/2:-Math.PI/2;let c=_v();return c.group.position.set(t-a*.7,0,o),c.group.rotation.y=a>0?-Math.PI/2:Math.PI/2,this.world.scene.add(s.group,c.group),jl(s,yo[0][0],this.world.scene),this.scene3={driver:s,player:c,entity:r,left:3.2,total:3.2,line:0,severe:e},3.2}playScene(e){let t=this.scene3;if(!t)return;t.left-=e;let i=this.clock;if(!t.severe){Lh(t.driver,i,!1),t.left<=0&&this.endScene();return}let r=Math.min(yo.length-1,Math.floor((t.total-t.left)/t.total*yo.length));r!==t.line&&(t.line=r,jl(t.driver,yo[r][0],this.world.scene),t.player&&jl(t.player,yo[r][1],this.world.scene));let s=r===yo.length-1;Lh(t.driver,i,!s),t.player&&Lh(t.player,i+.5,!s),t.left<=0&&this.endScene()}endScene(){let e=this.scene3;e&&(Ev(e.driver),XM(e.driver),e.driver.group.parent?.remove(e.driver.group),e.player&&(Ev(e.player),this.world.scene.remove(e.player.group)),e.entity.frozen=0,e.entity.shoved=1.5,e.entity.speed=e.entity.cruise,this.scene3=null)}audible(e){return this.entities.map(t=>({kind:t.kind,dx:t.x-e,dz:t.z,speed:t.speed,radio:t.radio})).filter(t=>Math.hypot(t.dx,t.dz)<60).sort((t,i)=>Math.hypot(t.dx,t.dz)-Math.hypot(i.dx,i.dz)).slice(0,4)}crossed(e,t){return e<0&&t>=0||e>0&&t<=0}drive(e,t){let i=Ln(e.targetLane,this.lanes);if(Math.abs(e.x-i)>.02){let s=Math.sign(i-e.x)*gn*1.6*t;e.x=Math.abs(s)>Math.abs(i-e.x)?i:e.x+s,e.parts.group.rotation.y=-Math.sign(i-e.x)*.06}else e.lane=e.targetLane,e.parts.group.rotation.y=0;for(let s of this.hazards){if(s.kind!=="cones"||s.done)continue;let o=s.z-e.z;if(!(o<-45||o>-4)&&s.lanes.includes(e.targetLane)){let a=[e.targetLane-1,e.targetLane+1].filter(c=>c>=0&&c<this.lanes&&!s.lanes.includes(c));a.length&&(e.targetLane=bi(a))}}for(let s of this.entities){if(s===e||Math.abs(s.x-e.x)>gn*.7)continue;let o=e.z-s.z;o>0&&o<s.parts.length/2+e.parts.length/2+6&&s.speed<e.speed&&(e.speed=s.speed)}if(e.frozen>0){e.frozen-=t,e.speed=Math.max(0,e.speed-200*t);return}if(e.shoved>0){e.shoved-=t;return}if(e.braking>0){e.braking-=t,e.speed=Math.max(8,e.speed-90*t);return}if(e.speed+=(e.cruise-e.speed)*Math.min(1,t*.8),e.moodTimer-=t,e.moodTimer>0)return;e.moodTimer=qn(1.5,4);let r=e.kind==="microbus"?this.difficulty.microbusMood:e.kind==="car"?.08:e.kind==="tuktuk"?.12:.03;Sn(r)&&(e.kind==="microbus"&&Sn(.45)?e.braking=qn(.8,1.6):e.targetLane=IM(e.lane+(Sn(.5)?-1:1),this.lanes))}setLights(e,t,i){let r=e.brake.material;r.emissive.setHex(t?16718362:i?6684672:0),r.emissiveIntensity=t?3:1.2;let s=e.headlights.material;s.emissive.setHex(i?16773296:0),s.emissiveIntensity=2.5}spawnVehicle(e){let t=RM(this.route.traffic),i=zl(this.lanes),r=e??this.world.spawnZ+qn(-30,0);if(this.entities.some(l=>Math.abs(l.x-Ln(i,this.lanes))<gn*.7&&Math.abs(l.z-r)<18))return;let o=this.difficulty.maxSpeed*this.route.speed,a=t==="tuktuk"?qn(20,38):t==="tractor"?qn(12,22):t==="truck"?qn(o*.25,o*.4):t==="bus"?qn(o*.3,o*.45):t==="microbus"?qn(o*.3,o*.75):qn(o*.3,o*.55),c=FM(t);c.group.position.set(Ln(i,this.lanes),0,r),this.world.scene.add(c.group),this.entities.push({kind:t,parts:c,lane:i,targetLane:i,x:Ln(i,this.lanes),z:r,prevZ:r,speed:a,cruise:a,moodTimer:qn(1,3),braking:0,shoved:0,hit:!1,passed:!1,honked:!1,radio:t==="tuktuk"||t==="microbus"&&Sn(.4),frozen:0})}spawnHazard(){let e=bi(this.route.hazards),t=this.world.spawnZ-20,i=new st,r=[],s=1,o=this.lanes*gn,a=Array.from({length:this.lanes},(c,l)=>l);if(e==="bump"){let c=new te(new Ge(o,.22,1.1),new oe({color:3947580,roughness:1}));c.position.y=.1,i.add(c);for(let l=-o/2+.6;l<o/2;l+=1.2){let u=new te(new Ge(.6,.24,1.12),new oe({color:15909376}));u.position.set(l,.1,0),i.add(u)}r=a,i.add(this.sign("\u0645\u0637\u0628","#f2c200","#1b1b1b",-28))}else if(e==="pothole"){let c=zl(this.lanes);r=[c];let l=new te(new al(.9,16),new oe({color:1315860,roughness:1}));l.rotation.x=-Math.PI/2,l.position.set(Ln(c,this.lanes),.02,0),i.add(l)}else if(e==="sand"){let c=zl(this.lanes);r=[c,Math.min(this.lanes-1,c+1)];let l=new te(new sn(gn*2.2,8),new oe({color:15259304,roughness:1,transparent:!0,opacity:.85}));l.rotation.x=-Math.PI/2,l.position.set((Ln(r[0],this.lanes)+Ln(r[1],this.lanes))/2,.03,0),i.add(l),s=8}else if(e==="radar"){i.add(this.sign(`\u0631\u0627\u062F\u0627\u0631 ${bv}`,"#1b1b1b","#ffffff",0));let c=new te(new Ge(.5,.4,.6),new oe({color:10395294}));c.position.set(o/2+1.2,2.3,0),i.add(c),r=a}else{let c=Math.floor(Math.random()*Math.max(1,this.lanes-1));r=this.lanes>1?[c,c+1]:[0],s=2;let l=new oe({color:16739584});for(let h of r)for(let m of[-1,0,1]){let _=new te(new Xi(.28,.8,8),l);_.position.set(Ln(h,this.lanes)+m*1,.4,0),i.add(_)}let u=r.reduce((h,m)=>h+Ln(m,this.lanes),0)/r.length,d=new te(new Ge(gn*r.length,.25,.2),new oe({color:16777215}));d.position.set(u,.9,0),i.add(d);let f=new te(new Ge(gn*.6,.27,.22),new oe({color:13959168}));f.position.copy(d.position),i.add(f),i.add(this.sign("\u0643\u0645\u064A\u0646","#d50000","#ffffff",-34))}i.position.z=t,this.world.scene.add(i),this.hazards.push({kind:e,group:i,lanes:r,z:t,prevZ:t,length:s,done:!1})}sign(e,t,i,r){let s=new st,o=this.lanes*gn/2+1.2,a=new te(new Tt(.06,.06,2.4,6),new oe({color:7829367}));a.position.set(o,1.2,r),s.add(a);let c=new te(new sn(2,1),new oe({map:Wl(e,t,i),side:Nn,emissive:1118481}));return c.position.set(o,2.6,r),c.rotation.y=-Math.PI*.12,s.add(c),s}spawnPickups(){let e=zl(this.lanes),t=this.world.spawnZ-qn(0,20);if(!this.entities.some(r=>Math.abs(r.x-Ln(e,this.lanes))<gn*.7&&Math.abs(r.z-t)<24)){if(Sn(.12)){let r=new te(this.canGeo,this.canMat);r.position.set(Ln(e,this.lanes),.7,t),this.world.scene.add(r),this.pickups.push({kind:"nitro",mesh:r,lane:e,z:t,taken:!1});return}for(let r=0;r<5;r++){let s=new te(this.coinGeo,this.coinMat);s.rotation.x=Math.PI/2,s.position.set(Ln(e,this.lanes),.7,t-r*3),this.world.scene.add(s),this.pickups.push({kind:"coin",mesh:s,lane:e,z:t-r*3,taken:!1})}}}recycle(){let e=this.world.despawnZ,t=this.world.spawnZ-80;this.entities=this.entities.filter(i=>{let r=i.z<e&&i.z>t;return r||this.world.scene.remove(i.parts.group),r}),this.hazards=this.hazards.filter(i=>{let r=i.z<e+40;return r||this.world.scene.remove(i.group),r}),this.pickups=this.pickups.filter(i=>{let r=i.z<e&&!i.taken;return r||this.world.scene.remove(i.mesh),r})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var fL=240,hL=800,Fh=class n{zone=ue(xn);store=ue(ts);input=ue(Ha);audio=ue(Ko);world=ue(xs);traffic=ue(Oh);player=ue(Ph);renderer=null;composer=null;bloom=null;grade=null;camera=new yn(62,1,.1,500);particles=new Ih;last=0;idleSpeed=0;onRunEnded=null;brawlLeft=0;dust=new we(14206362);spark=new we(16757575);flame=new we(5104639);mount(e){if(this.renderer)return;this.renderer=new _h({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Cf,this.renderer.toneMapping=co,this.renderer.toneMappingExposure=.88;let t=new La(this.renderer);this.world.scene.environment=t.fromScene(new Ah,.04).texture,this.world.scene.environmentIntensity=.3,t.dispose();let i=/Android|iPhone|iPad/i.test(navigator.userAgent);this.store.quality.set(i&&window.devicePixelRatio>2?"low":"high"),this.world.build(),this.world.scene.add(this.particles.points),this.world.setDayPhase(this.store.dayPhase()),this.player.reset(this.store.car(),this.store.difficulty(),this.store.route()),this.traffic.reset(this.store.difficulty(),this.store.route()),this.input.bind(),this.composer=new Sh(this.renderer),this.composer.addPass(new Th(this.world.scene,this.camera)),this.bloom=new Ua(new Ee(1,1),.2,.4,.98),this.composer.addPass(this.bloom),this.composer.addPass(new wh),this.grade=new ka(AM),this.composer.addPass(this.grade),this.composer.addPass(new Dh),this.camera.position.set(0,2.9,7.2),this.camera.lookAt(0,1.1,-16),this.resize(),window.addEventListener("resize",()=>this.resize()),this.zone.runOutsideAngular(()=>{this.last=performance.now();let r=s=>{requestAnimationFrame(r);let o=Math.min(.05,(s-this.last)/1e3);this.last=s,this.frame(o)};requestAnimationFrame(r)})}setRoute(){this.world.setRoute(this.store.route()),this.traffic.reset(this.store.difficulty(),this.store.route()),this.player.reset(this.store.car(),this.store.difficulty(),this.store.route()),this.store.dayPhase.set(this.store.route().startPhase)}beginRun(e){this.onRunEnded=e,this.brawlLeft=0,this.world.route.id!==this.store.route().id&&this.world.setRoute(this.store.route()),this.player.reset(this.store.car(),this.store.difficulty(),this.store.route()),this.traffic.reset(this.store.difficulty(),this.store.route()),this.world.setDayPhase(this.store.dayPhase()),this.audio.startEngine()}frame(e){if(!this.renderer||!this.composer)return;let t=this.store.status();t==="playing"?this.simulate(e):t==="menu"||t==="map"?(this.idleSpeed+=(40-this.idleSpeed)*e,this.world.advance(Ei(this.idleSpeed)*e,e),this.player.update(e,0,!1,!1,this.world.isNight),this.particles.update(e,Ei(this.idleSpeed)),this.audio.stopEngine()):this.audio.stopEngine(),this.placeCamera(e),this.store.quality()==="high"?this.composer.render():this.renderer.render(this.world.scene,this.camera)}simulate(e){if(this.input.consume("pauseRequest")){this.store.pause();return}let t=this.input.consumeFlick();t!==0&&this.player.flick(t),this.input.consume("hornRequest")&&this.audio.horn(),this.input.consume("nitroRequest")&&this.store.nitro()>=1&&!this.player.nitroActive&&(this.player.fireNitro(),this.store.nitro.set(0),this.store.nitroActive.set(!0),this.store.push("nitro","\u0646\u064A\u062A\u0631\u0648!"),this.audio.nitroBurst());let i=this.world.isNight;if(this.brawlLeft>0){this.brawlLeft-=e,this.brawlLeft<=0&&(this.player.invulnerable=1.5),this.player.speed=Math.max(0,this.player.speed-300*e),this.player.update(e,0,!1,!0,i),this.store.speed.set(0),this.traffic.update(e,{x:this.player.x,width:this.player.spec.width,length:this.player.spec.length,speed:0,invulnerable:!0},i),this.particles.update(e,0),this.audio.engine(0,!1,this.traffic.audible(this.player.x));return}this.player.update(e,this.input.steer(),this.input.accelerate(),this.input.brake(),i),!this.player.nitroActive&&this.store.nitroActive()&&this.store.nitroActive.set(!1),this.store.wheel.set(Math.round(uo.clamp(this.player.heading/.5,-1,1)*100)/100),this.store.braking()!==this.input.brake()&&this.store.braking.set(this.input.brake()),this.store.throttle()!==this.input.accelerate()&&this.store.throttle.set(this.input.accelerate()),this.player.offRoad!==this.store.offRoad()&&(this.store.offRoad.set(this.player.offRoad),this.audio.gravel(this.player.offRoad));let r=Ei(this.player.speed)*e;this.world.advance(r,e);let s=this.traffic.update(e,{x:this.player.x,width:this.player.spec.width,length:this.player.spec.length,speed:this.player.speed,invulnerable:this.player.invulnerable>0},i),o=this.player.spec.length/2;this.player.offRoad&&this.player.speed>20&&this.particles.emit(3,this.player.x,.1,o,this.dust,1.2,2.5,4,.8),this.player.nitroActive&&this.particles.emit(4,this.player.x,.4,o,this.flame,.6,.5,14,.35),this.particles.update(e,Ei(this.player.speed));let a=this.store.distance()+r;this.store.distance.set(a),this.store.speed.set(Math.round(this.player.speed)),this.player.speed>this.store.topSpeed()&&this.store.topSpeed.set(Math.round(this.player.speed)),this.store.cleanStreak.update(f=>f+r);let c=1+Math.floor(a/hL);c!==this.store.level()&&(this.store.level.set(c),this.traffic.setLevel(c),this.store.push("level",`\u0643\u064A\u0644\u0648 ${Math.round(a/1e3*10)/10} \u2014 \u0627\u0644\u0632\u062D\u0645\u0629 \u0628\u062A\u0632\u064A\u062F`));let l=(this.store.dayPhase()+e/fL)%1;this.store.dayPhase.set(l),this.world.setDayPhase(l),this.bloom&&(this.bloom.strength=i?.65:.12,this.bloom.threshold=i?.8:.98),this.grade&&(this.grade.uniforms.time.value=performance.now()/1e3);let u=this.store.stars();s.coins&&(this.store.coins.update(f=>f+s.coins),this.store.push("coin",`+${s.coins*10}`,s.coins*10),this.audio.coin()),s.nitroCans&&(this.store.nitro.set(1),this.store.push("nitro","\u0646\u064A\u062A\u0631\u0648 \u062C\u0627\u0647\u0632"),this.audio.coin()),s.nearMisses&&(this.store.nearMisses.update(f=>f+s.nearMisses),this.store.nitro.update(f=>Math.min(1,f+.25*s.nearMisses)),this.store.push("nearMiss","\u062D\u0631\u0641\u0646\u0629! +50",50),this.audio.nearMiss());for(let f of s.honks)this.audio.hornOf(f.kind,f.dx);if(s.fines&&(this.store.coins.update(f=>Math.max(0,f-10)),this.store.push("fine",`\u0631\u0627\u062F\u0627\u0631 ${s.radarLimit} \u2014 \u0645\u062E\u0627\u0644\u0641\u0629`,-100),this.audio.fine()),s.bumps&&(this.player.bump(.6),this.store.push("bump","\u0645\u0637\u0628! \u0647\u062F\u0651\u064A"),this.audio.bump()),s.potholes&&(this.player.bump(.9),this.store.nitro.set(0),this.store.push("bump","\u062D\u0641\u0631\u0629 \u2014 \u0631\u0627\u062D \u0627\u0644\u0646\u064A\u062A\u0631\u0648"),this.audio.bump()),s.sand&&(this.player.bump(.4),this.player.flick(Math.random()<.5?-.6:.6),this.particles.emit(20,this.player.x,.2,0,this.dust,2.5,3,3,1),this.store.push("bump","\u0631\u0645\u0644 \u0639\u0644\u0649 \u0627\u0644\u0637\u0631\u064A\u0642!")),s.hits){this.player.takeHit(s.hitFromX),this.store.lives.update(h=>h-1),this.store.bestClean.update(h=>Math.max(h,this.store.cleanStreak())),this.store.cleanStreak.set(0),this.store.push("hit",s.severe?"\u062E\u0628\u0637\u0629 \u062C\u0627\u0645\u062F\u0629 \u2014 \u0646\u0632\u0644\u0648\u0627 \u064A\u062A\u062E\u0627\u0646\u0642\u0648\u0627!":"\u062E\u0628\u0637\u0629!"),this.audio.crash();let f=this.traffic.react(s.severe,this.player.x,this.player.spec.length);if(f>0&&(this.brawlLeft=f,this.player.invulnerable=0,this.player.shake=0),setTimeout(()=>this.audio.hornOf("car",s.hitFromX-this.player.x),f>0?600:250),this.particles.emit(30,this.player.x,.8,-this.player.spec.length/2,this.spark,2,6,2,.7),this.store.lives()<=0){this.endRun();return}}if(this.store.stars()>u){let f=this.store.objectives().filter(h=>h.done);this.store.push("mission",`\u2B50 ${f[f.length-1]?.text??""}`),this.audio.coin()}if(this.store.mode()==="timed"){let f=Math.max(0,this.store.timeLeft()-e);if(this.store.timeLeft.set(f),f<=0){this.endRun();return}}this.audio.engine(this.player.speed,this.player.nitroActive,this.traffic.audible(this.player.x))}endRun(){this.store.bestClean.update(e=>Math.max(e,this.store.cleanStreak())),this.audio.stopEngine(),this.store.endRun(),this.onRunEnded?.()}placeCamera(e){let t=this.player.x*.6-this.player.heading*1.2;this.camera.position.x+=(t-this.camera.position.x)*Math.min(1,e*4);let i=this.player.speed/200*1.6;this.camera.position.z+=(7.2+i-this.camera.position.z)*Math.min(1,e*2);let r=this.player.shake,s=(Math.random()-.5)*r*.5,o=(Math.random()-.5)*r*.3;this.camera.position.y=2.9+o+this.player.speed*.002,this.camera.lookAt(this.player.x*.6+s+this.player.heading*3,1.1,-16),this.camera.rotation.z+=this.player.heading*.05,this.camera.fov=66+(this.player.nitroActive?10:0)+this.player.speed*.05,this.camera.updateProjectionMatrix()}resize(){if(!this.renderer||!this.composer)return;let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.composer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var ZM="zahma.progress.v1",Mv={stars:{},bank:0,owned:["fiat128"]},kh=class n{state=Be(this.load());bank=En(()=>this.state().bank);owned=En(()=>this.state().owned);totalStars=En(()=>Object.values(this.state().stars).reduce((e,t)=>e+t,0));stars(e){return this.state().stars[e]??0}isUnlocked(e){let t=lr.findIndex(i=>i.id===e);return t<=0?!0:this.stars(lr[t-1].id)>=lr[t].unlock}owns(e){return this.state().owned.includes(e)}finishRun(e,t,i){let r=this.stars(e);return this.update(s=>tn(Rt({},s),{bank:s.bank+i,stars:tn(Rt({},s.stars),{[e]:Math.max(r,t)})})),Math.max(0,t-r)}buy(e){let t=$s.find(i=>i.id===e);return!t||this.owns(e)||this.bank()<t.price?!1:(this.update(i=>tn(Rt({},i),{bank:i.bank-t.price,owned:[...i.owned,e]})),!0)}update(e){let t=e(this.state());this.state.set(t);try{localStorage.setItem(ZM,JSON.stringify(t))}catch{}}load(){try{let e=localStorage.getItem(ZM);return e?Rt(Rt({},Mv),JSON.parse(e)):Mv}catch{return Mv}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var $M="zahma.runs.v2",pL=80,Uh=class n{runs=Be(this.load());best(e,t,i){return this.runs().filter(r=>r.mode===e&&r.difficulty===t&&r.route===i).reduce((r,s)=>Math.max(r,s.score),0)}record(e){let t=this.best(e.mode,e.difficulty,e.route),i=[e,...this.runs()].sort((r,s)=>s.score-r.score).slice(0,pL);this.runs.set(i);try{localStorage.setItem($M,JSON.stringify(i))}catch{}return e.score>t&&e.score>0}load(){try{let e=localStorage.getItem($M);return e?JSON.parse(e):[]}catch{return[]}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var KM="zahma.touchHint.v1",On=class n{store=ue(ts);scores=ue(Uh);progress=ue(kh);engine=ue(Fh);audio=ue(Ko);input=ue(Ha);routes=lr;cars=$s;newBest=Be(!1);newStars=Be(0);touchHint=Be(this.needsHint());isTouch=matchMedia("(hover: none) and (pointer: coarse)").matches;mount(e){this.engine.mount(e)}choose(e){this.store.mode.set(e)}chooseDifficulty(e){this.store.difficultyId.set(e)}chooseCar(e){this.progress.owns(e)&&this.store.carId.set(e)}buyCar(e){this.progress.buy(e)&&this.store.carId.set(e)}chooseRoute(e){this.progress.isUnlocked(e)&&(this.store.routeId.set(e),this.engine.setRoute(),this.store.toMenu())}openMap(){this.audio.unlock(),this.store.toMap()}toggleMute(){this.store.muted.update(e=>!e)}start(){this.audio.unlock(),this.newBest.set(!1),this.newStars.set(0),this.store.startRun(),this.engine.beginRun(()=>this.onRunEnded())}dismissHint(){this.touchHint.set(!1);try{localStorage.setItem(KM,"1")}catch{}}pause(){this.store.pause()}resume(){this.audio.unlock(),this.store.resume()}restart(){this.start()}toMenu(){this.store.toMenu()}hold(e,t){this.input.hold(e,t)}nitro(){this.input.nitroRequest.set(!0)}horn(){this.input.hornRequest.set(!0)}best(){return this.scores.best(this.store.mode(),this.store.difficultyId(),this.store.routeId())}async share(){let e=this.store,t=`\u0639\u0645\u0644\u062A ${e.score()} \u0646\u0642\u0637\u0629 \u0641\u064A \u0632\u062D\u0645\u0629 \u0639\u0644\u0649 ${e.route().name} \u2014 ${e.distanceKm()} \u0643\u0645 \u0628\u0639\u0631\u0628\u064A\u0629 ${e.car().name}. \u062C\u0631\u0651\u0628 \u062A\u0643\u0633\u0631\u0647\u0627: ${location.href}`;try{return navigator.share?(await navigator.share({text:t}),!0):(await navigator.clipboard.writeText(t),!0)}catch{return!1}}onRunEnded(){let e=this.store,t=this.scores.record({mode:e.mode(),difficulty:e.difficultyId(),route:e.routeId(),car:e.carId(),score:e.score(),distance:Math.round(e.distance()),coins:e.coins(),nearMisses:e.nearMisses(),topSpeed:e.topSpeed(),stars:e.stars(),at:new Date().toISOString()});this.newBest.set(t),this.newStars.set(this.progress.finishRun(e.routeId(),e.stars(),e.coins()))}needsHint(){try{return!localStorage.getItem(KM)}catch{return!0}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=We({token:n,factory:n.\u0275fac,providedIn:"root"})};var mL=["stage"],Bh=class n{game=ue(On);stage=EE.required("stage");constructor(){gg(()=>this.game.mount(this.stage().nativeElement))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-game-canvas"]],viewQuery:function(t,i){t&1&&gd(i.stage,mL,5),t&2&&Lg()},decls:2,vars:0,consts:[["stage",""],["aria-hidden","true",1,"stage"]],template:function(t,i){t&1&&un(0,"canvas",1,0)},styles:["[_nghost-%COMP%]{position:fixed;inset:0;display:block}.stage[_ngcontent-%COMP%]{width:100%;height:100%;display:block;touch-action:none}"],changeDetection:0})};var gL=(n,e)=>e.text;function vL(n,e){if(n&1&&(W(0,"p",3),Q(1),$()),n&2){let t=St();le(),_n("\u{1F3C6} ",t.game.newStars()," \u0646\u062C\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0631\u064A\u0642 \u062F\u0647")}}function yL(n,e){n&1&&(W(0,"p",3),Q(1,"\u{1F3C6} \u0623\u0639\u0644\u0649 \u0646\u062A\u064A\u062C\u0629 \u0644\u064A\u0643 \u0647\u0646\u0627"),$())}function xL(n,e){if(n&1&&(W(0,"p",4),Q(1),$()),n&2){let t=St();le(),_n("\u0623\u0639\u0644\u0649 \u0646\u062A\u064A\u062C\u0629: ",t.game.best())}}function _L(n,e){if(n&1&&(W(0,"li"),Q(1),$()),n&2){let t=e.$implicit;nn("done",t.done),le(),zn("",t.done?"\u2B50":"\u2606"," ",t.text)}}var Hh=class n{game=ue(On);store=this.game.store;shared=Be(!1);async share(){this.shared.set(await this.game.share())}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-game-over"]],decls:42,vars:11,consts:[["role","dialog","aria-label","\u062E\u0644\u0635 \u0627\u0644\u0645\u0634\u0648\u0627\u0631",1,"card"],[1,"kicker"],[1,"starline"],[1,"best"],[1,"sub"],[1,"objectives"],[3,"done"],[1,"stats"],["type","button",1,"primary",3,"click"],["type","button",3,"click"]],template:function(t,i){t&1&&(W(0,"div",0)(1,"p",1),Q(2),$(),W(3,"h2"),Q(4),$(),W(5,"p",2),Q(6),$(),Hn(7,vL,2,1,"p",3)(8,yL,2,0,"p",3)(9,xL,2,1,"p",4),W(10,"ul",5),$n(11,_L,2,4,"li",6,gL),$(),W(13,"dl",7)(14,"div")(15,"dt"),Q(16,"\u0627\u0644\u0645\u0633\u0627\u0641\u0629"),$(),W(17,"dd"),Q(18),$()(),W(19,"div")(20,"dt"),Q(21,"\u0641\u0643\u0629 \u0644\u0644\u062C\u0631\u0627\u062C"),$(),W(22,"dd"),Q(23),$()(),W(24,"div")(25,"dt"),Q(26,"\u062D\u0631\u0641\u0646\u0629"),$(),W(27,"dd"),Q(28),$()(),W(29,"div")(30,"dt"),Q(31,"\u0623\u0639\u0644\u0649 \u0633\u0631\u0639\u0629"),$(),W(32,"dd"),Q(33),$()()(),W(34,"button",8),dt("click",function(){return i.game.restart()}),Q(35,"\u062A\u0627\u0646\u064A"),$(),W(36,"button",9),dt("click",function(){return i.game.openMap()}),Q(37,"\u0637\u0631\u064A\u0642 \u062A\u0627\u0646\u064A"),$(),W(38,"button",9),dt("click",function(){return i.share()}),Q(39),$(),W(40,"button",9),dt("click",function(){return i.game.toMenu()}),Q(41,"\u0627\u0644\u0642\u0627\u0626\u0645\u0629"),$()()),t&2&&(le(2),zn("",i.store.route().name," \xB7 ",i.store.mode()==="timed"?"\u062E\u0644\u0635 \u0627\u0644\u0648\u0642\u062A":"\u062E\u0644\u0635 \u0627\u0644\u0643\u0627\u0648\u062A\u0634"),le(2),mt(i.store.score()),le(2),zn("","\u2B50".repeat(i.store.stars()),"","\u2606".repeat(3-i.store.stars())),le(),Vn(i.game.newStars()>0?7:i.game.newBest()?8:9),le(4),Kn(i.store.objectives()),le(7),_n("",i.store.distanceKm()," \u0643\u0645"),le(5),_n("+",i.store.coins()),le(5),mt(i.store.nearMisses()),le(5),_n("",i.store.topSpeed()," \u0643\u0645/\u0633"),le(6),mt(i.shared()?"\u0627\u062A\u0646\u0633\u062E \u2713":"\u0634\u0627\u0631\u0643 \u0627\u0644\u0646\u062A\u064A\u062C\u0629"))},styles:["[_nghost-%COMP%]{position:fixed;inset:0;display:grid;place-items:center;overflow:auto;padding:1rem;background:#080a18a6;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.card[_ngcontent-%COMP%]{display:grid;gap:.5rem;width:min(92vw,22rem);padding:1.4rem;border-radius:22px;background:#14162cf0;border:1px solid rgba(255,255,255,.14);text-align:center;color:#fff}.kicker[_ngcontent-%COMP%]{margin:0;font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;color:var(--sand)}h2[_ngcontent-%COMP%]{margin:0;font-family:var(--mono);font-size:3.2rem;line-height:1;color:var(--gold)}.starline[_ngcontent-%COMP%]{margin:0;font-size:1.4rem;letter-spacing:.2em}.best[_ngcontent-%COMP%]{margin:0;color:#7cf5b4;font-family:var(--display)}.sub[_ngcontent-%COMP%]{margin:0;color:var(--ink-2);font-size:.9rem}.objectives[_ngcontent-%COMP%]{margin:0;padding:0;list-style:none;display:grid;gap:.2rem;text-align:start}.objectives[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:.8rem;color:var(--ink-2);padding:.25rem .6rem;border-radius:8px;background:#ffffff0d}.objectives[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]{color:var(--gold)}.stats[_ngcontent-%COMP%]{margin:.2rem 0;display:grid;grid-template-columns:1fr 1fr;gap:.4rem}.stats[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:.5rem;border-radius:12px;background:#ffffff0f}dt[_ngcontent-%COMP%]{font-size:.68rem;color:var(--ink-2)}dd[_ngcontent-%COMP%]{margin:0;font-family:var(--mono);font-size:1.05rem}button[_ngcontent-%COMP%]{font:inherit;font-family:var(--display);font-size:1.05rem;padding:.65rem;border-radius:14px;border:1px solid rgba(255,255,255,.18);background:#ffffff14;color:#fff;cursor:pointer}.primary[_ngcontent-%COMP%]{background:linear-gradient(180deg,#ffd666,#f2b01e);color:#1b1200;border:0;font-size:1.3rem}"],changeDetection:0})};var EL=(n,e)=>e.text,bL=(n,e)=>e.id;function ML(n,e){if(n&1&&(W(0,"div",48)(1,"small"),Q(2,"\u0627\u0644\u0648\u0642\u062A"),$(),W(3,"b"),Q(4),kg(5,"number"),$()()),n&2){let t=St();nn("low",t.store.timeLeft()<10),le(4),mt(Ug(5,3,t.store.timeLeft(),"1.0-0"))}}function SL(n,e){if(n&1&&un(0,"span",49),n&2){let t=e.$implicit,i=St();nn("gone",t>=i.store.lives())}}function wL(n,e){if(n&1&&(W(0,"li"),Q(1),$()),n&2){let t=e.$implicit;nn("done",t.done),le(),zn("",t.done?"\u2B50":"\u2606"," ",t.text)}}function TL(n,e){if(n&1&&(W(0,"p"),Q(1),$()),n&2){let t=e.$implicit;Og("event "+t.kind),le(),mt(t.text)}}function CL(n,e){n&1&&(W(0,"p",12),Q(1,"\u26A0 \u0625\u0646\u062A \u0639\u0644\u0649 \u0627\u0644\u0637\u0648\u0627\u0631 \u2014 \u0627\u0631\u062C\u0639 \u0644\u0644\u0623\u0633\u0641\u0644\u062A"),$())}function DL(n,e){if(n&1){let t=ar();W(0,"div",50),dt("click",function(){Ni(t);let r=St();return Pi(r.game.dismissHint())}),W(1,"div",51)(2,"h3"),Q(3,"\u0625\u0632\u0627\u064A \u062A\u0633\u0648\u0642"),$(),W(4,"p")(5,"b"),Q(6,"\u2039 \u0634\u0645\u0627\u0644 \xB7 \u064A\u0645\u064A\u0646 \u203A"),$(),Q(7," \u2014 \u0627\u0636\u063A\u0637 \u0648\u0645\u062A\u0633\u064A\u0628\u0634 \u0639\u0644\u0649 \u0646\u0635 \u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u0644\u064A \u0639\u0627\u064A\u0632 \u062A\u0631\u0648\u062D\u0647\u060C \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0628\u062A\u0644\u0641 \u0637\u0648\u0644 \u0645\u0627 \u0625\u064A\u062F\u0643 \u0639\u0644\u064A\u0647."),$(),W(8,"p")(9,"b"),Q(10,"\u25B2 \u0628\u0646\u0632\u064A\u0646 \xB7 \u25BC \u0641\u0631\u0627\u0645\u0644"),$(),Q(11," \u2014 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646. \u0644\u0648 \u0633\u064A\u0628\u062A\u0647\u0645 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0628\u062A\u0645\u0634\u064A \u0644\u0648\u062D\u062F\u0647\u0627 \u0639\u0644\u0649 \u0633\u0631\u0639\u0629 \u0645\u0631\u064A\u062D\u0629."),$(),W(12,"p")(13,"b"),Q(14,"\u26A1 \u0646\u064A\u062A\u0631\u0648"),$(),Q(15," \u2014 \u0628\u064A\u062A\u0645\u0644\u064A \u0645\u0646 \xAB\u0627\u0644\u062D\u0631\u0641\u0646\u0629\xBB: \u0643\u0644 \u0645\u0627 \u062A\u0639\u062F\u0651\u064A \u062C\u0646\u0628 \u0639\u0631\u0628\u064A\u0629 \u0645\u0646 \u063A\u064A\u0631 \u0645\u0627 \u062A\u062E\u0628\u0637."),$(),W(16,"p")(17,"b"),Q(18,"\u0627\u0633\u062D\u0628 \u0644\u0641\u0648\u0642"),$(),Q(19," \u0641\u064A \u0623\u064A \u0645\u0643\u0627\u0646 = \u0646\u064A\u062A\u0631\u0648 \u0643\u0645\u0627\u0646."),$(),W(20,"button",52),Q(21,"\u0641\u0647\u0645\u062A\u060C \u064A\u0644\u0627"),$()()()}}var Vh=class n{game=ue(On);store=this.game.store;dial(e){return Math.min(132,e/200*132)}lifeSlots(){return Array.from({length:this.store.maxLives()},(e,t)=>t)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-hud"]],decls:90,vars:24,consts:[[1,"top"],[1,"stat","score"],[1,"stat"],[1,"stat","time",3,"low"],["type","button","aria-label","\u0648\u0642\u0651\u0641",1,"pause",3,"click"],[1,"side"],["aria-label","\u0627\u0644\u0643\u0627\u0648\u062A\u0634",1,"lives"],[1,"tire",3,"gone"],[1,"missions"],[3,"done"],["aria-live","polite",1,"events"],[3,"class"],[1,"offroad"],["viewBox","0 0 100 100","aria-hidden","true",1,"wheel"],["cx","50","cy","50","r","44","fill","none","stroke","#1a1a1f","stroke-width","11"],["cx","50","cy","50","r","44","fill","none","stroke","#3a3a42","stroke-width","7"],["d","M50 50 L50 10 M50 50 L16 68 M50 50 L84 68","stroke","#2a2a30","stroke-width","9","stroke-linecap","round"],["cx","50","cy","50","r","13","fill","#1f1f24","stroke","#4a4a52","stroke-width","2"],["cx","50","cy","50","r","5","fill","#ffc83d"],["d","M50 10 a40 40 0 0 1 20 5","stroke","#ffc83d","stroke-width","4","fill","none","stroke-linecap","round"],[1,"dash"],[1,"dial"],["viewBox","0 0 100 60","aria-hidden","true"],["d","M8 55 A45 45 0 0 1 92 55","fill","none","stroke","rgba(255,255,255,.15)","stroke-width","6","stroke-linecap","round"],["d","M8 55 A45 45 0 0 1 92 55","fill","none","stroke-width","6","stroke-linecap","round"],[1,"gear"],[1,"nitro-bar"],[1,"touch"],["type","button","aria-label","\u0644\u0641 \u0634\u0645\u0627\u0644",1,"zone","left",3,"pointerdown","pointerup","pointercancel","pointerleave"],["type","button","aria-label","\u0644\u0641 \u064A\u0645\u064A\u0646",1,"zone","right",3,"pointerdown","pointerup","pointercancel","pointerleave"],[1,"pedals"],["type","button","aria-label","\u0646\u064A\u062A\u0631\u0648",1,"pedal","boost",3,"pointerdown","disabled"],["type","button","aria-label","\u0628\u0646\u0632\u064A\u0646",1,"pedal","gas",3,"pointerdown","pointerup","pointercancel","pointerleave"],["viewBox","0 0 40 70","aria-hidden","true"],["x","4","y","2","width","32","height","66","rx","6","fill","#2a2a30","stroke","#55555e","stroke-width","2"],["stroke","#8a8a94","stroke-width","2"],["x1","10","y1","14","x2","30","y2","14"],["x1","10","y1","26","x2","30","y2","26"],["x1","10","y1","38","x2","30","y2","38"],["x1","10","y1","50","x2","30","y2","50"],["type","button","aria-label","\u0641\u0631\u0627\u0645\u0644",1,"pedal","brake",3,"pointerdown","pointerup","pointercancel","pointerleave"],["viewBox","0 0 50 40","aria-hidden","true"],["x","3","y","3","width","44","height","34","rx","6","fill","#2a2a30","stroke","#55555e","stroke-width","2"],["x1","10","y1","12","x2","40","y2","12"],["x1","10","y1","20","x2","40","y2","20"],["x1","10","y1","28","x2","40","y2","28"],["type","button","aria-label","\u0643\u0644\u0627\u0643\u0633",1,"horn",3,"pointerdown"],[1,"hint"],[1,"stat","time"],[1,"tire"],[1,"hint",3,"click"],[1,"card"],["type","button"]],template:function(t,i){t&1&&(W(0,"div",0)(1,"div",1)(2,"small"),Q(3,"\u0627\u0644\u0646\u0642\u0637"),$(),W(4,"b"),Q(5),$()(),W(6,"div",2)(7,"small"),Q(8,"\u0643\u0645"),$(),W(9,"b"),Q(10),$()(),W(11,"div",2)(12,"small"),Q(13,"\u0641\u0643\u0629"),$(),W(14,"b"),Q(15),$()(),Hn(16,ML,6,6,"div",3),W(17,"button",4),dt("click",function(){return i.game.pause()}),Q(18,"\u275A\u275A"),$()(),W(19,"div",5)(20,"div",6),$n(21,SL,1,2,"span",7,Ng),$(),W(23,"ul",8),$n(24,wL,2,4,"li",9,EL),$()(),W(26,"div",10),$n(27,TL,2,3,"p",11,bL),$(),Hn(29,CL,2,0,"p",12),Fi(),W(30,"svg",13),un(31,"circle",14)(32,"circle",15)(33,"path",16)(34,"circle",17)(35,"circle",18)(36,"path",19),$(),Cr(),W(37,"div",20)(38,"div",21),Fi(),W(39,"svg",22),un(40,"path",23)(41,"path",24),$(),Cr(),W(42,"b"),Q(43),$(),W(44,"small"),Q(45,"\u0643\u0645/\u0633"),$(),W(46,"span",25),Q(47),$()(),W(48,"div",26),un(49,"i"),W(50,"span"),Q(51),$()()(),W(52,"div",27)(53,"button",28),dt("pointerdown",function(){return i.game.hold("left",!0)})("pointerup",function(){return i.game.hold("left",!1)})("pointercancel",function(){return i.game.hold("left",!1)})("pointerleave",function(){return i.game.hold("left",!1)}),W(54,"span"),Q(55,"\u2039"),$(),W(56,"small"),Q(57,"\u0634\u0645\u0627\u0644"),$()(),W(58,"button",29),dt("pointerdown",function(){return i.game.hold("right",!0)})("pointerup",function(){return i.game.hold("right",!1)})("pointercancel",function(){return i.game.hold("right",!1)})("pointerleave",function(){return i.game.hold("right",!1)}),W(59,"span"),Q(60,"\u203A"),$(),W(61,"small"),Q(62,"\u064A\u0645\u064A\u0646"),$()(),W(63,"div",30)(64,"button",31),dt("pointerdown",function(){return i.game.nitro()}),Q(65,"\u26A1"),W(66,"small"),Q(67,"\u0646\u064A\u062A\u0631\u0648"),$()(),W(68,"button",32),dt("pointerdown",function(){return i.game.hold("accelerate",!0)})("pointerup",function(){return i.game.hold("accelerate",!1)})("pointercancel",function(){return i.game.hold("accelerate",!1)})("pointerleave",function(){return i.game.hold("accelerate",!1)}),Fi(),W(69,"svg",33),un(70,"rect",34),W(71,"g",35),un(72,"line",36)(73,"line",37)(74,"line",38)(75,"line",39),$()(),Cr(),W(76,"small"),Q(77,"\u0628\u0646\u0632\u064A\u0646"),$()(),W(78,"button",40),dt("pointerdown",function(){return i.game.hold("brake",!0)})("pointerup",function(){return i.game.hold("brake",!1)})("pointercancel",function(){return i.game.hold("brake",!1)})("pointerleave",function(){return i.game.hold("brake",!1)}),Fi(),W(79,"svg",41),un(80,"rect",42),W(81,"g",35),un(82,"line",43)(83,"line",44)(84,"line",45),$()(),Cr(),W(85,"small"),Q(86,"\u0641\u0631\u0627\u0645\u0644"),$()()(),W(87,"button",46),dt("pointerdown",function(){return i.game.horn()}),Q(88,"\u{1F4E3}"),$()(),Hn(89,DL,22,0,"div",47)),t&2&&(le(5),mt(i.store.score()),le(5),mt(i.store.distanceKm()),le(5),mt(i.store.coins()),le(),Vn(i.store.mode()==="timed"?16:-1),le(5),Kn(i.lifeSlots()),le(3),Kn(i.store.objectives()),le(3),Kn(i.store.events()),le(2),Vn(i.store.offRoad()?29:-1),le(),es("transform","rotate("+i.store.wheel()*110+"deg)"),le(8),nn("nitro",i.store.nitroActive()),le(3),Jr("stroke",i.store.nitroActive()?"#4de3ff":"#ffc83d")("stroke-dasharray",i.dial(i.store.speed())+" 200"),le(2),mt(i.store.speed()),le(4),mt(i.store.gear()),le(),nn("ready",i.store.nitro()>=1),le(),es("width",i.store.nitro()*100,"%"),le(2),mt(i.store.nitro()>=1?"\u0646\u064A\u062A\u0631\u0648 \u062C\u0627\u0647\u0632":"\u0646\u064A\u062A\u0631\u0648"),le(13),Qr("disabled",i.store.nitro()<1),le(4),nn("down",i.store.throttle()),le(10),nn("down",i.store.braking()),le(11),Vn(i.game.isTouch&&i.game.touchHint()?89:-1))},dependencies:[jg],styles:["[_nghost-%COMP%]{position:fixed;inset:0;pointer-events:none;display:block;direction:rtl}.top[_ngcontent-%COMP%]{position:absolute;top:max(.6rem,env(safe-area-inset-top));inset-inline:.75rem;display:flex;gap:.5rem;align-items:stretch}.stat[_ngcontent-%COMP%]{display:grid;justify-items:center;padding:.35rem .75rem;border-radius:14px;background:#080a188c;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;min-width:4rem}.stat[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:.62rem;color:var(--ink-2);letter-spacing:.08em}.stat[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-family:var(--mono);font-size:1.15rem;line-height:1.2}.score[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:var(--gold)}.time.low[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#ff5252;animation:_ngcontent-%COMP%_blink .5s steps(2) infinite}.pause[_ngcontent-%COMP%]{pointer-events:auto;margin-inline-start:auto;font:inherit;width:2.6rem;border-radius:14px;border:0;background:#080a188c;color:#fff;cursor:pointer;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.side[_ngcontent-%COMP%]{position:absolute;top:4.3rem;inset-inline-end:.85rem;display:grid;gap:.5rem;justify-items:end}.lives[_ngcontent-%COMP%]{display:flex;gap:.3rem}.tire[_ngcontent-%COMP%]{width:1rem;height:1rem;border-radius:50%;background:#222;border:.28rem solid #d0d0d0;box-shadow:0 2px 6px #00000080;transition:.3s}.tire.gone[_ngcontent-%COMP%]{opacity:.2;transform:scale(.8)}.missions[_ngcontent-%COMP%]{margin:0;padding:0;list-style:none;display:grid;gap:.2rem}.missions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:.68rem;color:var(--ink-2);background:#080a1873;padding:.15rem .5rem;border-radius:8px}.missions[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]{color:var(--gold)}.events[_ngcontent-%COMP%]{position:absolute;top:26%;inset-inline:0;display:grid;justify-items:center;gap:.3rem}.event[_ngcontent-%COMP%]{margin:0;font-family:var(--display);font-size:1.5rem;color:#fff;text-shadow:0 3px 12px rgba(0,0,0,.6);animation:_ngcontent-%COMP%_pop 1.8s ease-out forwards}.event.coin[_ngcontent-%COMP%]{color:var(--gold);font-size:1.2rem}.event.nearMiss[_ngcontent-%COMP%]{color:#7cf5b4}.event.fine[_ngcontent-%COMP%], .event.hit[_ngcontent-%COMP%]{color:#ff6b6b;font-size:1.9rem}.event.bump[_ngcontent-%COMP%]{color:#ffd166}.event.nitro[_ngcontent-%COMP%]{color:#4de3ff}.event.mission[_ngcontent-%COMP%]{color:var(--gold);font-size:1.2rem}.event.level[_ngcontent-%COMP%]{color:#fff;font-size:1.05rem;font-family:var(--mono)}.offroad[_ngcontent-%COMP%]{position:absolute;top:42%;inset-inline:0;margin:0;text-align:center;font-family:var(--display);color:#ffd166;text-shadow:0 2px 10px rgba(0,0,0,.7);animation:_ngcontent-%COMP%_blink .6s steps(2) infinite}.wheel[_ngcontent-%COMP%]{position:absolute;bottom:-2.2rem;left:50%;width:9.5rem;height:9.5rem;margin-left:-4.75rem;transition:transform .08s linear;filter:drop-shadow(0 8px 16px rgba(0,0,0,.6));opacity:.92}.dash[_ngcontent-%COMP%]{position:absolute;bottom:1.4rem;inset-inline-start:.75rem;display:grid;gap:.4rem;justify-items:start;direction:ltr}.dial[_ngcontent-%COMP%]{position:relative;width:8.5rem;color:#fff;text-shadow:0 3px 12px rgba(0,0,0,.6)}.dial[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:100%;display:block}.dial[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{position:absolute;left:50%;bottom:.1rem;transform:translate(-50%);font-family:var(--mono);font-size:2.1rem;line-height:1}.dial[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{position:absolute;left:50%;bottom:-.9rem;transform:translate(-50%);font-size:.6rem;color:var(--ink-2);letter-spacing:.1em}.dial[_ngcontent-%COMP%]   .gear[_ngcontent-%COMP%]{position:absolute;right:-1.4rem;bottom:.2rem;width:1.6rem;height:1.6rem;border-radius:6px;background:#080a18b3;border:1px solid rgba(255,255,255,.25);font-family:var(--mono);font-size:.95rem;display:grid;place-items:center;color:var(--gold)}.dial.nitro[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#4de3ff}.nitro-bar[_ngcontent-%COMP%]{position:relative;width:8.5rem;margin-top:1rem;height:1.1rem;border-radius:999px;background:#080a188c;overflow:hidden;border:1px solid rgba(255,255,255,.18)}.nitro-bar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,#00bcd4,#4de3ff);transition:width .2s}.nitro-bar.ready[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_blink .6s steps(2) infinite}.nitro-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;display:block;text-align:center;font-size:.65rem;line-height:1.3rem;color:#fff;letter-spacing:.08em}.touch[_ngcontent-%COMP%]{display:none}@media(hover:none)and (pointer:coarse){.touch[_ngcontent-%COMP%]{display:block}.dash[_ngcontent-%COMP%]{bottom:calc(10rem + env(safe-area-inset-bottom))}.wheel[_ngcontent-%COMP%]{bottom:calc(.4rem + env(safe-area-inset-bottom));width:8rem;height:8rem;margin-left:-4rem;pointer-events:none}.zone[_ngcontent-%COMP%]{pointer-events:auto;position:absolute;bottom:0;top:55%;width:50%;border:0;background:transparent;color:#ffffff8c;font:inherit;display:grid;place-content:end center;padding-bottom:calc(1rem + env(safe-area-inset-bottom));touch-action:none;-webkit-user-select:none;user-select:none}.zone[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:4rem;line-height:1}.zone[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-family:var(--display);font-size:.8rem;letter-spacing:.1em}.zone.left[_ngcontent-%COMP%]{left:0}.zone.right[_ngcontent-%COMP%]{right:0}.zone[_ngcontent-%COMP%]:active{background:linear-gradient(0deg,rgba(255,255,255,.14),transparent);color:#fff}.pedals[_ngcontent-%COMP%]{pointer-events:auto;position:absolute;inset-inline-end:.75rem;bottom:calc(1rem + env(safe-area-inset-bottom));display:grid;gap:.5rem;width:5.6rem}.pedal[_ngcontent-%COMP%]{height:4.6rem;border-radius:14px;border:0;background:transparent;color:#fff;display:grid;place-items:center;gap:.1rem;line-height:1;padding:0;touch-action:none;-webkit-user-select:none;user-select:none;filter:drop-shadow(0 6px 10px rgba(0,0,0,.6));transition:transform .08s}.pedal[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:3.4rem;width:auto}.pedal[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-family:var(--display);font-size:.68rem;color:var(--ink-2)}.pedal.gas[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:4rem}.pedal.brake[_ngcontent-%COMP%]{height:3.6rem}.pedal.down[_ngcontent-%COMP%]{transform:scale(.92) translateY(3px)}.pedal.down[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%]{stroke:#ffc83d}.pedal.boost[_ngcontent-%COMP%]{height:3.2rem;border-radius:999px;background:#00bcd4bf;font-size:1.3rem;border:2px solid rgba(255,255,255,.3)}.pedal.boost[_ngcontent-%COMP%]:disabled{opacity:.35}.horn[_ngcontent-%COMP%]{pointer-events:auto;position:absolute;inset-inline-start:.75rem;bottom:calc(9.5rem + env(safe-area-inset-bottom));width:3rem;height:3rem;border-radius:50%;border:2px solid rgba(255,255,255,.25);background:#080a1899;font-size:1.2rem}.hint[_ngcontent-%COMP%]{pointer-events:auto;position:absolute;inset:0;display:grid;place-items:center;background:#080a18b3;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}}.card[_ngcontent-%COMP%]{width:min(90vw,22rem);padding:1.3rem;border-radius:20px;background:#14162cf2;border:1px solid rgba(255,255,255,.14);color:#fff;display:grid;gap:.6rem}.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-family:var(--display);font-size:1.5rem;color:var(--gold)}.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.9rem;line-height:1.6;color:var(--ink-2)}.card[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#fff}.card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font:inherit;font-family:var(--display);font-size:1.1rem;padding:.7rem;border-radius:14px;border:0;background:linear-gradient(180deg,#ffd666,#f2b01e);color:#1b1200}@keyframes _ngcontent-%COMP%_pop{0%{opacity:0;transform:translateY(12px) scale(.9)}12%{opacity:1;transform:none}75%{opacity:1}to{opacity:0;transform:translateY(-16px)}}@keyframes _ngcontent-%COMP%_blink{50%{opacity:.35}}"],changeDetection:0})};var JM=(n,e)=>e.id;function AL(n,e){if(n&1&&(Fi(),W(0,"text",13),Q(1),$()),n&2){let t=St().$implicit;le(),mt(t.name)}}function IL(n,e){if(n&1){let t=ar();Fi(),W(0,"g",9),dt("click",function(){let r=Ni(t).$implicit,s=St();return Pi(s.game.chooseRoute(r.id))}),un(1,"circle",10)(2,"circle",11),W(3,"text",12),Q(4),$(),Hn(5,AL,2,1,":svg:text",13),$()}if(n&2){let t=e.$implicit,i=e.$index,r=St();nn("locked",!r.game.progress.isUnlocked(t.id))("on",r.store.routeId()===t.id),Jr("transform","translate("+r.px(t)[0]+" "+r.px(t)[1]+")"),le(4),mt(i+1),le(),Vn(r.store.routeId()===t.id?5:-1)}}function RL(n,e){if(n&1&&Q(0),n&2){let t=St().$implicit,i=St();zn(" ","\u2B50".repeat(i.game.progress.stars(t.id)),"","\u2606".repeat(3-i.game.progress.stars(t.id))," ")}}function NL(n,e){if(n&1&&Q(0),n&2){let t=St().$implicit;_n(" \u{1F512} ",t.unlock," \u2B50 \u0639\u0644\u0649 \u0627\u0644\u0644\u064A \u0642\u0628\u0644\u0647 ")}}function PL(n,e){if(n&1){let t=ar();W(0,"li")(1,"button",14),dt("click",function(){let r=Ni(t).$implicit,s=St();return Pi(s.game.chooseRoute(r.id))}),W(2,"span",15),Q(3),$(),W(4,"span",16)(5,"strong"),Q(6),$(),W(7,"small"),Q(8),$(),W(9,"em"),Q(10),$()(),W(11,"span",17),Hn(12,RL,1,2)(13,NL,1,1),$()()()}if(n&2){let t=e.$implicit,i=e.$index,r=St();le(),nn("on",r.store.routeId()===t.id),Qr("disabled",!r.game.progress.isUnlocked(t.id)),le(2),mt(i+1),le(3),mt(t.name),le(2),mt(t.place),le(2),mt(t.tagline),le(2),Vn(r.game.progress.isUnlocked(t.id)?12:13)}}var LL=[[25,31.5],[27,31.4],[29.2,30.9],[30.4,31.4],[31.3,31.6],[32.3,31.3],[33.3,31.1],[34.2,31.3],[34.9,29.5],[34.6,28.2],[34.2,27.8],[33.6,27.9],[33.2,28.4],[32.6,29.9],[32.4,29.5],[32.6,28.6],[33.3,27.6],[33.8,26.6],[34.4,25.6],[35,24.7],[35.6,23.6],[36.2,22.8],[36.9,22],[31.5,22],[25,22]],OL=[[32.9,24.1],[32.6,25.7],[31.7,26.6],[31.2,27.2],[30.8,28.1],[30.9,29.2],[31.2,29.9],[31.2,30.3]],zh=class n{game=ue(On);store=this.game.store;land=this.path(LL,!0);nile=this.path(OL,!1);px(e){return this.project(e.lon,e.lat)}project(e,t){return[Math.round((e-24.5)/13*320),Math.round((32-t)/10.5*320)]}path(e,t){let i=e.map(([r,s],o)=>(o?"L":"M")+this.project(r,s).join(" ")).join(" ");return t?i+" Z":i}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-map"]],decls:19,vars:3,consts:[[1,"sheet"],["type","button",1,"back",3,"click"],[1,"body"],["viewBox","0 0 320 340","aria-label","\u062E\u0631\u064A\u0637\u0629 \u0645\u0635\u0631",1,"egypt"],[1,"land"],[1,"nile"],["role","button","tabindex","0",1,"pin",3,"locked","on"],["x","160","y","330",1,"caption"],[1,"list"],["role","button","tabindex","0",1,"pin",3,"click"],["r","11",1,"halo"],["r","7"],["y","3"],["y","-14",1,"name"],["type","button",3,"click","disabled"],[1,"n"],[1,"t"],[1,"stars"]],template:function(t,i){t&1&&(W(0,"div",0)(1,"header")(2,"button",1),dt("click",function(){return i.game.toMenu()}),Q(3,"\u2192 \u0631\u062C\u0648\u0639"),$(),W(4,"h1"),Q(5,"\u0627\u062E\u062A\u0627\u0631 \u0627\u0644\u0637\u0631\u064A\u0642"),$(),W(6,"p"),Q(7),$()(),W(8,"div",2),Fi(),W(9,"svg",3),un(10,"path",4)(11,"path",5),$n(12,IL,6,7,":svg:g",6,JM),W(14,"text",7),Q(15,"\u0627\u0644\u0642\u0627\u0647\u0631\u0629 \u0648\u0627\u0644\u062C\u064A\u0632\u0629 \u0641\u064A\u0647\u0645 \u0664 \u0637\u0631\u0642 \u2014 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0632\u064A \u0627\u0644\u0642\u0627\u064A\u0645\u0629"),$()(),Cr(),W(16,"ul",8),$n(17,PL,14,8,"li",null,JM),$()()()),t&2&&(le(7),_n("\u2B50 ",i.game.progress.totalStars()," \xB7 \u0643\u0644 \u0637\u0631\u064A\u0642 \u0628\u064A\u0641\u062A\u062D \u0628\u0646\u062C\u0648\u0645 \u0627\u0644\u0644\u064A \u0642\u0628\u0644\u0647"),le(3),Jr("d",i.land),le(),Jr("d",i.nile),le(),Kn(i.game.routes),le(5),Kn(i.game.routes))},styles:["[_nghost-%COMP%]{position:fixed;inset:0;display:grid;place-items:center;overflow:auto;padding:1rem;background:linear-gradient(180deg,#080a188c,#080a18d9)}.sheet[_ngcontent-%COMP%]{width:min(100%,56rem);display:grid;gap:1rem}header[_ngcontent-%COMP%]{display:grid;gap:.2rem;text-align:center;position:relative}.back[_ngcontent-%COMP%]{position:absolute;inset-inline-start:0;top:0;font:inherit;color:#fff;background:#ffffff1a;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.35rem .9rem;cursor:pointer}h1[_ngcontent-%COMP%]{margin:0;font-family:var(--display);font-size:2.2rem;color:#fff}header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--ink-2);font-size:.85rem}.body[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start}@media(max-width:44rem){.body[_ngcontent-%COMP%]{grid-template-columns:1fr}}.egypt[_ngcontent-%COMP%]{width:100%;height:auto}.land[_ngcontent-%COMP%]{fill:#e8d5a82e;stroke:var(--sand);stroke-width:1.5;stroke-linejoin:round}.nile[_ngcontent-%COMP%]{fill:none;stroke:#4fc3f7;stroke-width:2;stroke-linecap:round;opacity:.8}.pin[_ngcontent-%COMP%]{cursor:pointer}.pin[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{fill:var(--gold)}.pin[_ngcontent-%COMP%]   .halo[_ngcontent-%COMP%]{fill:#ffc83d40;animation:_ngcontent-%COMP%_pulse 1.6s ease-in-out infinite}.pin.on[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{fill:#7cf5b4}.pin.on[_ngcontent-%COMP%]   .halo[_ngcontent-%COMP%]{fill:#7cf5b44d}.pin.locked[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{fill:#777}.pin.locked[_ngcontent-%COMP%]   .halo[_ngcontent-%COMP%]{animation:none;fill:transparent}.pin[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{fill:#1b1200;font-family:var(--mono);font-weight:700;font-size:9px;text-anchor:middle;pointer-events:none}.pin.locked[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{fill:#ddd}.pin[_ngcontent-%COMP%]   text.name[_ngcontent-%COMP%]{fill:#fff;font-family:var(--display);font-size:12px;paint-order:stroke;stroke:#080a18d9;stroke-width:3px}.caption[_ngcontent-%COMP%]{fill:var(--ink-3);font-size:9px;text-anchor:middle}.list[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:grid;gap:.5rem}.list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-columns:auto 1fr auto;gap:.8rem;align-items:center;text-align:start;padding:.7rem .9rem;border-radius:16px;background:#ffffff12;border:2px solid rgba(255,255,255,.14);color:#fff;font:inherit;cursor:pointer}.list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{opacity:.45;cursor:not-allowed}.list[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{border-color:#7cf5b4;background:#7cf5b41f}.n[_ngcontent-%COMP%]{font-family:var(--mono);color:var(--gold);font-size:1.2rem}.t[_ngcontent-%COMP%]{display:grid}.t[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-family:var(--display);font-size:1.1rem}.t[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--sand);font-size:.72rem}.t[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-style:normal;color:var(--ink-2);font-size:.8rem}.stars[_ngcontent-%COMP%]{font-size:.8rem;white-space:nowrap;color:var(--gold)}@keyframes _ngcontent-%COMP%_pulse{50%{r:13;opacity:.4}}"],changeDetection:0})};var FL=(n,e)=>e.text,QM=(n,e)=>e.id;function kL(n,e){if(n&1&&(W(0,"li"),Q(1),$()),n&2){let t=e.$implicit;le(),mt(t.text)}}function UL(n,e){if(n&1){let t=ar();W(0,"button",10),dt("click",function(){let r=Ni(t).$implicit,s=St();return Pi(s.game.chooseDifficulty(r.id))}),W(1,"strong"),Q(2),W(3,"em"),Q(4),$()(),W(5,"span"),Q(6),$()()}if(n&2){let t=e.$implicit,i=St();nn("on",i.store.difficultyId()===t.id),le(2),_n("",t.name," "),le(2),_n("\xD7",t.multiplier),le(2),mt(t.tagline)}}function BL(n,e){if(n&1){let t=ar();W(0,"button",10),dt("click",function(){Ni(t);let r=St().$implicit,s=St();return Pi(s.game.chooseCar(r.id))}),un(1,"i",19),W(2,"strong"),Q(3),$(),W(4,"span"),Q(5),$(),W(6,"small"),Q(7),$()()}if(n&2){let t=St().$implicit,i=St();nn("on",i.store.carId()===t.id),le(),es("background","#"+t.color.toString(16).padStart(6,"0")),le(2),mt(t.name),le(2),mt(t.tagline),le(2),vd("",t.lives," \u0643\u0627\u0648\u062A\u0634 \xB7 \u062A\u0645\u0627\u0633\u0643 ",t.grip," \xB7 \u0639\u062C\u0644\u0629 ",t.steering)}}function HL(n,e){if(n&1){let t=ar();W(0,"button",20),dt("click",function(){Ni(t);let r=St().$implicit,s=St();return Pi(s.game.buyCar(r.id))}),un(1,"i",19),W(2,"strong"),Q(3),W(4,"em"),Q(5),$()(),W(6,"span"),Q(7),$(),W(8,"small"),Q(9),$()()}if(n&2){let t=St().$implicit,i=St();Qr("disabled",i.game.progress.bank()<t.price),le(),es("background","#"+t.color.toString(16).padStart(6,"0")),le(2),_n("",t.name," "),le(2),_n("\u{1F4B0} ",t.price),le(2),mt(t.tagline),le(2),mt(i.game.progress.bank()<t.price?"\u0644\u0645 \u0641\u0643\u0629 \u0645\u0646 \u0627\u0644\u0645\u0634\u0627\u0648\u064A\u0631":"\u0627\u0636\u063A\u0637 \u0639\u0634\u0627\u0646 \u062A\u0634\u062A\u0631\u064A\u0647\u0627")}}function VL(n,e){if(n&1&&Hn(0,BL,8,9,"button",11)(1,HL,10,7,"button",18),n&2){let t=e.$implicit,i=St();Vn(i.game.progress.owns(t.id)?0:1)}}function zL(n,e){n&1&&(W(0,"p",16)(1,"kbd"),Q(2,"\u2190"),$(),W(3,"kbd"),Q(4,"\u2192"),$(),Q(5," \u0639\u062C\u0644\u0629 \xB7 "),W(6,"kbd"),Q(7,"\u2191"),$(),Q(8," \u0628\u0646\u0632\u064A\u0646 \xB7 "),W(9,"kbd"),Q(10,"\u2193"),$(),Q(11," \u0641\u0631\u0627\u0645\u0644 \xB7 "),W(12,"kbd"),Q(13,"\u0645\u0633\u0627\u0641\u0629"),$(),Q(14," \u0646\u064A\u062A\u0631\u0648 \xB7 "),W(15,"kbd"),Q(16,"H"),$(),Q(17," \u0643\u0644\u0627\u0643\u0633 \xB7 "),W(18,"kbd"),Q(19,"Esc"),$(),Q(20," \u0648\u0642\u0651\u0641 "),$())}var Gh=class n{game=ue(On);store=this.game.store;difficulties=Rc;static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-menu"]],decls:59,vars:12,consts:[[1,"sheet"],[1,"brand"],[1,"kicker"],[1,"wallet"],["type","button",1,"route",3,"click"],[1,"label"],[1,"change"],[1,"row"],[1,"missions"],[1,"chips"],["type","button",1,"chip",3,"click"],["type","button",1,"chip",3,"on"],[1,"chips","cars"],[1,"go"],["type","button",1,"start",3,"click"],[1,"best"],[1,"how"],["type","button",1,"mute",3,"click"],["type","button",1,"chip","locked",3,"disabled"],[1,"swatch"],["type","button",1,"chip","locked",3,"click","disabled"]],template:function(t,i){t&1&&(W(0,"div",0)(1,"header",1)(2,"p",2),Q(3,"\u0644\u0639\u0628\u0629 \u0633\u0648\u0627\u0642\u0629 \u0645\u0635\u0631\u064A\u0629 \xB7 \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0639\u0644\u0649 \u0637\u0648\u0644"),$(),W(4,"h1"),Q(5,"\u0632\u062D\u0645\u0629"),$(),W(6,"p",3),Q(7),$()(),W(8,"button",4),dt("click",function(){return i.game.openMap()}),W(9,"span",5),Q(10,"\u0627\u0644\u0637\u0631\u064A\u0642"),$(),W(11,"strong"),Q(12),$(),W(13,"small"),Q(14),$(),W(15,"span",6),Q(16,"\u063A\u064A\u0651\u0631 \u0645\u0646 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u2190"),$()(),W(17,"section",7)(18,"h2"),Q(19,"\u0627\u0644\u0645\u0647\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0637\u0631\u064A\u0642 \u062F\u0647"),$(),W(20,"ul",8),$n(21,kL,2,1,"li",null,FL),$()(),W(23,"section",7)(24,"h2"),Q(25,"\u0627\u0644\u0645\u0634\u0648\u0627\u0631"),$(),W(26,"div",9)(27,"button",10),dt("click",function(){return i.game.choose("endless")}),W(28,"strong"),Q(29,"\u0645\u0634\u0648\u0627\u0631"),$(),W(30,"span"),Q(31,"\u0644\u062D\u062F \u0645\u0627 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u062A\u062E\u0644\u0635"),$()(),W(32,"button",10),dt("click",function(){return i.game.choose("timed")}),W(33,"strong"),Q(34,"\u0633\u0627\u0628\u0642 \u0627\u0644\u0632\u0645\u0646"),$(),W(35,"span"),Q(36,"\u0669\u0660 \u062B\u0627\u0646\u064A\u0629 \u0628\u0633"),$()()()(),W(37,"section",7)(38,"h2"),Q(39,"\u0627\u0644\u0632\u062D\u0645\u0629"),$(),W(40,"div",9),$n(41,UL,7,5,"button",11,QM),$()(),W(43,"section",7)(44,"h2"),Q(45,"\u0627\u0644\u062C\u0631\u0627\u062C"),$(),W(46,"div",12),$n(47,VL,2,1,null,null,QM),$()(),W(49,"footer",13)(50,"button",14),dt("click",function(){return i.game.start()}),Q(51,"\u064A\u0644\u0627 \u0646\u0645\u0634\u064A"),$(),W(52,"p",15),Q(53,"\u0623\u0639\u0644\u0649 \u0646\u062A\u064A\u062C\u0629 \u0639\u0644\u0649 \u0627\u0644\u0637\u0631\u064A\u0642 \u062F\u0647: "),W(54,"b"),Q(55),$()(),Hn(56,zL,21,0,"p",16),W(57,"button",17),dt("click",function(){return i.game.toggleMute()}),Q(58),$()()()),t&2&&(le(7),zn("\u{1F4B0} ",i.game.progress.bank()," \u0641\u0643\u0629 \xB7 \u2B50 ",i.game.progress.totalStars()),le(5),mt(i.store.route().name),le(2),zn("",i.store.route().place," \xB7 ",i.store.route().tagline),le(7),Kn(i.store.route().objectives),le(6),nn("on",i.store.mode()==="endless"),le(5),nn("on",i.store.mode()==="timed"),le(9),Kn(i.difficulties),le(6),Kn(i.game.cars),le(8),mt(i.game.best()),le(),Vn(i.game.isTouch?-1:56),le(2),mt(i.store.muted()?"\u{1F507} \u0627\u0644\u0635\u0648\u062A \u0645\u0642\u0641\u0648\u0644":"\u{1F50A} \u0627\u0644\u0635\u0648\u062A \u0634\u063A\u0627\u0644"))},styles:['[_nghost-%COMP%]{position:fixed;inset:0;display:grid;place-items:start center;overflow:auto;padding:1rem;background:linear-gradient(180deg,#080a1859,#080a18c7)}.sheet[_ngcontent-%COMP%]{width:min(100%,44rem);display:grid;gap:1rem;padding-bottom:2rem}.brand[_ngcontent-%COMP%]{text-align:center}.kicker[_ngcontent-%COMP%]{margin:0;font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;color:var(--sand)}h1[_ngcontent-%COMP%]{margin:.1rem 0;font-family:var(--display);font-size:clamp(3.6rem,16vw,6.5rem);line-height:1;color:#fff;text-shadow:0 6px 0 #b8860b,0 14px 40px rgba(0,0,0,.5)}.wallet[_ngcontent-%COMP%]{margin:0;color:var(--gold);font-family:var(--mono);font-size:.9rem}.route[_ngcontent-%COMP%]{display:grid;gap:.1rem;text-align:start;padding:.9rem 1rem;border-radius:18px;cursor:pointer;font:inherit;color:#fff;background:linear-gradient(135deg,#7cf5b42e,#4fc3f71f);border:2px solid rgba(124,245,180,.5)}.route[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-family:var(--mono);font-size:.65rem;letter-spacing:.18em;color:#7cf5b4}.route[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-family:var(--display);font-size:1.6rem}.route[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--ink-2);font-size:.8rem}.route[_ngcontent-%COMP%]   .change[_ngcontent-%COMP%]{justify-self:end;font-size:.75rem;color:#7cf5b4}h2[_ngcontent-%COMP%]{margin:0 0 .5rem;font-family:var(--display);font-size:1.05rem;color:var(--sand)}.missions[_ngcontent-%COMP%]{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:.4rem}.missions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.3rem .7rem;border-radius:999px;background:#ffc83d24;border:1px solid rgba(255,200,61,.4);font-size:.8rem;color:#fff}.missions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\2606  ";color:var(--gold)}.chips[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr));gap:.55rem}.chip[_ngcontent-%COMP%]{position:relative;text-align:start;display:grid;gap:.15rem;padding:.75rem .85rem;border-radius:16px;cursor:pointer;background:#ffffff12;border:2px solid rgba(255,255,255,.14);color:#fff;font:inherit;transition:.18s}.chip[_ngcontent-%COMP%]:hover{background:#ffffff1f}.chip.on[_ngcontent-%COMP%]{border-color:var(--gold);background:#ffc83d24;box-shadow:0 0 0 4px #ffc83d26}.chip.locked[_ngcontent-%COMP%]{border-style:dashed}.chip[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:not-allowed}.chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-family:var(--display);font-size:1.15rem;display:flex;justify-content:space-between;align-items:baseline}.chip[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-style:normal;font-family:var(--mono);font-size:.75rem;color:var(--gold)}.chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.8rem;color:var(--ink-2)}.chip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-family:var(--mono);font-size:.65rem;color:var(--sand)}.swatch[_ngcontent-%COMP%]{position:absolute;top:.8rem;inset-inline-end:.8rem;width:.9rem;height:.9rem;border-radius:50%;border:2px solid rgba(255,255,255,.6)}.go[_ngcontent-%COMP%]{display:grid;gap:.55rem;justify-items:center;text-align:center}.start[_ngcontent-%COMP%]{font:inherit;font-family:var(--display);font-size:1.6rem;padding:.8rem 3rem;border-radius:999px;border:0;cursor:pointer;color:#1b1200;background:linear-gradient(180deg,#ffd666,#f2b01e);box-shadow:0 8px #a86f00,0 18px 40px #00000073;transition:transform .12s,box-shadow .12s}.start[_ngcontent-%COMP%]:active{transform:translateY(6px);box-shadow:0 2px #a86f00,0 8px 20px #00000073}.best[_ngcontent-%COMP%]{margin:0;color:var(--ink-2);font-size:.9rem}.best[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:var(--gold);font-family:var(--mono)}.how[_ngcontent-%COMP%]{margin:0;font-size:.75rem;color:var(--ink-3);max-width:30rem;line-height:1.9}kbd[_ngcontent-%COMP%]{font-family:var(--mono);font-size:.7rem;padding:.05rem .4rem;border-radius:6px;background:#ffffff1f;border:1px solid rgba(255,255,255,.2)}.mute[_ngcontent-%COMP%]{font:inherit;font-size:.8rem;color:var(--ink-2);background:none;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:.3rem .9rem;cursor:pointer}'],changeDetection:0})};var Wh=class n{game=ue(On);store=this.game.store;static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-pause"]],decls:11,vars:2,consts:[["role","dialog","aria-label","\u0627\u0644\u0644\u0639\u0628\u0629 \u0648\u0627\u0642\u0641\u0629",1,"card"],["type","button",1,"primary",3,"click"],["type","button",3,"click"]],template:function(t,i){t&1&&(W(0,"div",0)(1,"h2"),Q(2,"\u0648\u0627\u0642\u0641\u064A\u0646 \u0634\u0648\u064A\u0629"),$(),W(3,"p"),Q(4),$(),W(5,"button",1),dt("click",function(){return i.game.resume()}),Q(6,"\u0643\u0645\u0651\u0644"),$(),W(7,"button",2),dt("click",function(){return i.game.restart()}),Q(8,"\u0627\u0628\u062F\u0623 \u0645\u0646 \u0623\u0648\u0644"),$(),W(9,"button",2),dt("click",function(){return i.game.toMenu()}),Q(10,"\u0627\u0644\u0642\u0627\u0626\u0645\u0629"),$()()),t&2&&(le(4),zn("",i.store.distanceKm()," \u0643\u0645 \xB7 ",i.store.score()," \u0646\u0642\u0637\u0629"))},styles:["[_nghost-%COMP%]{position:fixed;inset:0;display:grid;place-items:center;background:#080a1899;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.card[_ngcontent-%COMP%]{display:grid;gap:.6rem;width:min(90vw,20rem);padding:1.5rem;border-radius:22px;background:#14162ceb;border:1px solid rgba(255,255,255,.14);text-align:center;color:#fff}h2[_ngcontent-%COMP%]{margin:0;font-family:var(--display);font-size:2rem}p[_ngcontent-%COMP%]{margin:0 0 .5rem;color:var(--ink-2);font-family:var(--mono)}button[_ngcontent-%COMP%]{font:inherit;font-family:var(--display);font-size:1.1rem;padding:.7rem;border-radius:14px;border:1px solid rgba(255,255,255,.18);background:#ffffff14;color:#fff;cursor:pointer}.primary[_ngcontent-%COMP%]{background:linear-gradient(180deg,#ffd666,#f2b01e);color:#1b1200;border:0}"],changeDetection:0})};function GL(n,e){n&1&&Dr(0,"app-menu")}function WL(n,e){n&1&&Dr(0,"app-map")}function jL(n,e){n&1&&Dr(0,"app-hud")}function qL(n,e){n&1&&Dr(0,"app-hud")(1,"app-pause")}function XL(n,e){n&1&&Dr(0,"app-game-over")}var jh=class n{game=ue(On);status=this.game.store.status;static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Bn({type:n,selectors:[["app-root"]],decls:6,vars:1,template:function(t,i){if(t&1&&(Dr(0,"app-game-canvas"),Hn(1,GL,1,0,"app-menu")(2,WL,1,0,"app-map")(3,jL,1,0,"app-hud")(4,qL,2,0)(5,XL,1,0,"app-game-over")),t&2){let r;le(),Vn((r=i.status())==="menu"?1:r==="map"?2:r==="playing"?3:r==="paused"?4:r==="over"?5:-1)}},dependencies:[Bh,Gh,zh,Vh,Wh,Hh],encapsulation:2,changeDetection:0})};e0(jh,BE).catch(n=>console.error(n));
