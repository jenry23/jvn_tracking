(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a4d5c4f"],{"22b5":function(t,e,i){"use strict";(function(t){i.d(e,"a",(function(){return r})),i.d(e,"b",(function(){return p})),i.d(e,"c",(function(){return d}));var n,r={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1)}},Back:{In:function(t){var e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-r.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*r.Bounce.In(2*t):.5*r.Bounce.Out(2*t-1)+.5}}};n="undefined"===typeof self&&"undefined"!==typeof t&&t.hrtime?function(){var e=t.hrtime();return 1e3*e[0]+e[1]/1e6}:"undefined"!==typeof self&&void 0!==self.performance&&void 0!==self.performance.now?self.performance.now.bind(self.performance):void 0!==Date.now?Date.now:function(){return(new Date).getTime()};var o=n,a=function(){function t(){this._tweens={},this._tweensAddedDuringUpdate={}}return t.prototype.getAll=function(){var t=this;return Object.keys(this._tweens).map((function(e){return t._tweens[e]}))},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},t.prototype.remove=function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},t.prototype.update=function(t,e){void 0===t&&(t=o()),void 0===e&&(e=!1);var i=Object.keys(this._tweens);if(0===i.length)return!1;while(i.length>0){this._tweensAddedDuringUpdate={};for(var n=0;n<i.length;n++){var r=this._tweens[i[n]],a=!e;r&&!1===r.update(t,a)&&!e&&delete this._tweens[i[n]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},t}(),s={Linear:function(t,e){var i=t.length-1,n=i*e,r=Math.floor(n),o=s.Utils.Linear;return e<0?o(t[0],t[1],n):e>1?o(t[i],t[i-1],i-n):o(t[r],t[r+1>i?i:r+1],n-r)},Bezier:function(t,e){for(var i=0,n=t.length-1,r=Math.pow,o=s.Utils.Bernstein,a=0;a<=n;a++)i+=r(1-e,n-a)*r(e,a)*t[a]*o(n,a);return i},CatmullRom:function(t,e){var i=t.length-1,n=i*e,r=Math.floor(n),o=s.Utils.CatmullRom;return t[0]===t[i]?(e<0&&(r=Math.floor(n=i*(1+e))),o(t[(r-1+i)%i],t[r],t[(r+1)%i],t[(r+2)%i],n-r)):e<0?t[0]-(o(t[0],t[0],t[1],t[1],-n)-t[0]):e>1?t[i]-(o(t[i],t[i],t[i-1],t[i-1],n-i)-t[i]):o(t[r?r-1:0],t[r],t[i<r+1?i:r+1],t[i<r+2?i:r+2],n-r)},Utils:{Linear:function(t,e,i){return(e-t)*i+t},Bernstein:function(t,e){var i=s.Utils.Factorial;return i(t)/i(e)/i(t-e)},Factorial:function(){var t=[1];return function(e){var i=1;if(t[e])return t[e];for(var n=e;n>1;n--)i*=n;return t[e]=i,i}}(),CatmullRom:function(t,e,i,n,r){var o=.5*(i-t),a=.5*(n-e),s=r*r,u=r*s;return(2*e-2*i+o+a)*u+(-3*e+3*i-2*o-a)*s+o*r+e}}},u=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),h=new a,p=function(){function t(t,e){void 0===e&&(e=h),this._object=t,this._group=e,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=r.Linear.None,this._interpolationFunction=s.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=u.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.to=function(t,e){return this._valuesEnd=Object.create(t),void 0!==e&&(this._duration=e),this},t.prototype.duration=function(t){return this._duration=t,this},t.prototype.start=function(t){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed)for(var e in this._reversed=!1,this._valuesStartRepeat)this._swapEndStartRepeatValues(e),this._valuesStart[e]=this._valuesStartRepeat[e];return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=void 0!==t?"string"===typeof t?o()+parseFloat(t):t:o(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},t.prototype._setupProperties=function(t,e,i,n){for(var r in i){var o=t[r],a=Array.isArray(o),s=a?"array":typeof o,u=!a&&Array.isArray(i[r]);if("undefined"!==s&&"function"!==s){if(u){var h=i[r];if(0===h.length)continue;h=h.map(this._handleRelativeValue.bind(this,o)),i[r]=[o].concat(h)}if("object"!==s&&!a||!o||u)"undefined"===typeof e[r]&&(e[r]=o),a||(e[r]*=1),n[r]=u?i[r].slice().reverse():e[r]||0;else{for(var p in e[r]=a?[]:{},o)e[r][p]=o[p];n[r]=a?[]:{},this._setupProperties(o,e[r],i[r],n[r])}}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},t.prototype.pause=function(t){return void 0===t&&(t=o()),this._isPaused||!this._isPlaying||(this._isPaused=!0,this._pauseStart=t,this._group&&this._group.remove(this)),this},t.prototype.resume=function(t){return void 0===t&&(t=o()),this._isPaused&&this._isPlaying?(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this):this},t.prototype.stopChainedTweens=function(){for(var t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].stop();return this},t.prototype.group=function(t){return this._group=t,this},t.prototype.delay=function(t){return this._delayTime=t,this},t.prototype.repeat=function(t){return this._initialRepeat=t,this._repeat=t,this},t.prototype.repeatDelay=function(t){return this._repeatDelayTime=t,this},t.prototype.yoyo=function(t){return this._yoyo=t,this},t.prototype.easing=function(t){return this._easingFunction=t,this},t.prototype.interpolation=function(t){return this._interpolationFunction=t,this},t.prototype.chain=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this._chainedTweens=t,this},t.prototype.onStart=function(t){return this._onStartCallback=t,this},t.prototype.onUpdate=function(t){return this._onUpdateCallback=t,this},t.prototype.onRepeat=function(t){return this._onRepeatCallback=t,this},t.prototype.onComplete=function(t){return this._onCompleteCallback=t,this},t.prototype.onStop=function(t){return this._onStopCallback=t,this},t.prototype.update=function(t,e){if(void 0===t&&(t=o()),void 0===e&&(e=!0),this._isPaused)return!0;var i,n,r=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(t>r)return!1;e&&this.start(t)}if(this._goToEnd=!1,t<this._startTime)return!0;!1===this._onStartCallbackFired&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),n=(t-this._startTime)/this._duration,n=0===this._duration||n>1?1:n;var a=this._easingFunction(n);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,a),this._onUpdateCallback&&this._onUpdateCallback(this._object,n),1===n){if(this._repeat>0){for(i in isFinite(this._repeat)&&this._repeat--,this._valuesStartRepeat)this._yoyo||"string"!==typeof this._valuesEnd[i]||(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),void 0!==this._repeatDelayTime?this._startTime=t+this._repeatDelayTime:this._startTime=t+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var s=0,u=this._chainedTweens.length;s<u;s++)this._chainedTweens[s].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(t,e,i,n){for(var r in i)if(void 0!==e[r]){var o=e[r]||0,a=i[r],s=Array.isArray(t[r]),u=Array.isArray(a),h=!s&&u;h?t[r]=this._interpolationFunction(a,n):"object"===typeof a&&a?this._updateProperties(t[r],o,a,n):(a=this._handleRelativeValue(o,a),"number"===typeof a&&(t[r]=o+(a-o)*n))}},t.prototype._handleRelativeValue=function(t,e){return"string"!==typeof e?e:"+"===e.charAt(0)||"-"===e.charAt(0)?t+parseFloat(e):parseFloat(e)},t.prototype._swapEndStartRepeatValues=function(t){var e=this._valuesStartRepeat[t],i=this._valuesEnd[t];this._valuesStartRepeat[t]="string"===typeof i?this._valuesStartRepeat[t]+parseFloat(i):this._valuesEnd[t],this._valuesEnd[t]=e},t}(),c=(u.nextId,h),d=(c.getAll.bind(c),c.removeAll.bind(c),c.add.bind(c),c.remove.bind(c),c.update.bind(c))}).call(this,i("f28c"))},"602f":function(t,e,i){"use strict";var n=i("755e");e["a"]=Object(n["MapElementFactory"])({name:"directionsRenderer",ctr(){return window.google.maps.DirectionsRenderer},events:["directions_changed"],mappedProps:{options:{zoomControl:!1}},props:{origin:{type:Object},destination:{type:Object},waypoints:{type:Array},travelMode:{type:String}},afterCreate(t){let e=new window.google.maps.DirectionsService;this.$watch(()=>[this.origin,this.destination,this.waypoints,this.travelMode],()=>{let{origin:i,destination:n,waypoints:r,travelMode:o}=this;i&&n&&r&&o&&(t.setOptions({preserveViewport:!0}),t.setPanel(document.getElementById("panel")),e.route({origin:i,destination:n,travelMode:o,waypoints:r,provideRouteAlternatives:!0,optimizeWaypoints:!0},(e,i)=>{t.setDirections(e)}))})}})},a8f7:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"full-screen-map"},[i("gmap-map",{ref:"mapRef",staticStyle:{width:"100%",height:"800px"},attrs:{center:t.center,tilt:0,heading:0,zoom:15,options:{mapId:"15431d2b469f209e",disableDefaultUI:!0,preserveViewport:!0}}},[i("directions-renderer",{attrs:{origin:t.center,destination:t.destination,waypoints:t.waypts,travelMode:"DRIVING"}})],1)],1)},r=[],o=i("22b5"),a=i("602f"),s=i("aeac"),u={components:{DirectionsRenderer:a["a"]},data(){return{user:null,center:{lat:0,lng:0},waypts:[{lat:0,lng:0}],cameraOptions:{},markers:[],origin:{lat:0,lng:0},destination:{lat:0,lng:0},position:"",watchPositionId:null}},mounted(){this.initMap(),this.getDirection()},methods:{initMap(){this.$refs.mapRef.$mapPromise.then(t=>{const e=new google.maps.TrafficLayer;e.setMap(t);const i=[["Back","back",google.maps.ControlPosition.TOP_LEFT],["Scan Passenger","scan",google.maps.ControlPosition.TOP_LEFT],["Driving Mode","driving",google.maps.ControlPosition.RIGHT_BOTTOM]];i.forEach(([e,i,n])=>{const r=document.createElement("div"),a=document.createElement("button");a.classList.add("ui-button"),a.innerText=""+e,a.addEventListener("click",()=>{o(i)}),r.appendChild(a),t.controls[n].push(r)});var n=this.$route.params.id,r=this;const o=function(t){switch(t){case"back":window.history.go(-1);break;case"scan":r.$router.push({name:"tickets.passenger",params:{id:n}});break;case"driving":r.drivingMode();break;default:break}}});let t=this,e=[];t.watchPositionId=navigator.geolocation.watchPosition(i=>{t.updateLocation(i.coords.latitude,i.coords.longitude),e.push({position:{lat:i.coords.latitude,lng:i.coords.longitude}})},t=>{console.log(t.message)}),t.markers=e},drivingMode(){const t={tilt:0,heading:0,zoom:12,center:this.center};this.$refs.mapRef.$mapPromise.then(e=>{function i(t){requestAnimationFrame(i),Object(o["c"])(t)}new o["b"](t).to({tilt:65,heading:90,zoom:20},15e3).easing(o["a"].Quadratic.Out).onUpdate(()=>{e.moveCamera(t)}).start(),requestAnimationFrame(i)})},getDirection(){var t=this.$route.params.id;s["m"].doc(t).onSnapshot(t=>{var e=t.data().routeID;s["k"].doc(e).onSnapshot(t=>{var e=t.data(),i=e["destination"],n=(e["origin"],e["pitstops"]),r=[];s["g"].doc(i).onSnapshot(t=>{var e={lat:t.data().latitude,lng:t.data().longitude};this.destination=e}),n.forEach(t=>{s["g"].doc(t).onSnapshot(t=>{r.push({location:{lat:t.data().latitude,lng:t.data().longitude},stopover:!0})})}),this.waypts=r})})},stopLocationUpdates(){navigator.geolocation.clearWatch(this.watchPositionId)},updateLocation(t,e){const i=this;i.center={lat:t,lng:e};const n={latitude:t,longitude:e};s["c"].ref("driverTrips/NCM4336").update(n)}}},h=u,p=i("2877"),c=Object(p["a"])(h,n,r,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-5a4d5c4f.e7ca57b9.js.map