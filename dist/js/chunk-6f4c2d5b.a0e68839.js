(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f4c2d5b"],{"0a2a":function(t,e,a){},"602f":function(t,e,a){"use strict";var s=a("755e");e["a"]=Object(s["MapElementFactory"])({name:"directionsRenderer",ctr(){return window.google.maps.DirectionsRenderer},events:["directions_changed"],mappedProps:{options:{zoomControl:!1}},props:{origin:{type:Object},destination:{type:Object},waypoints:{type:Array},travelMode:{type:String}},afterCreate(t){let e=new window.google.maps.DirectionsService;this.$watch(()=>[this.origin,this.destination,this.waypoints,this.travelMode],()=>{let{origin:a,destination:s,waypoints:i,travelMode:n}=this;a&&s&&i&&n&&(t.setOptions({preserveViewport:!0}),t.setPanel(document.getElementById("panel")),e.route({origin:a,destination:s,travelMode:n,waypoints:i,provideRouteAlternatives:!0,optimizeWaypoints:!0},(e,a)=>{t.setDirections(e)}))})}})},"6ae9":function(t,e,a){"use strict";a("0a2a")},fdc7:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("back-button"),a("download-excel",{staticClass:"btn btn-primary float-right",attrs:{data:t.data,fields:t.json_fields,worksheet:"Trip Ticket",name:"trip_ticket.xls"}},[t._v("\r\n      Export Trip Ticket\r\n    ")]),a("button",{staticClass:"btn btn-warning",on:{click:t.daily}},[t._v("Daily")]),a("button",{staticClass:"btn btn-warning",on:{click:t.weekly}},[t._v("Weekly")]),a("button",{staticClass:"btn btn-warning",on:{click:t.monthly}},[t._v("Monthly")]),a("button",{staticClass:"btn btn-warning",on:{click:t.annual}},[t._v("Annual")]),a("h3",[t._v(t._s(t.title))]),a("div",{staticClass:"row"},t._l(t.data,(function(e){return a("div",{key:e.id,staticClass:"col-12"},[a("div",{staticClass:"card text-dark"},[a("div",{staticClass:"card-header",staticStyle:{"background-color":"#006400"}},[a("i",{staticClass:"fa fa-university"}),a("strong",{staticStyle:{color:"white"}},[t._v(" Ticket Number : "+t._s(e.id))])]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("table",{staticClass:"table table-responsive table-sm"},[a("tbody",[a("tr",[a("th",{staticClass:"border-0 w-50"},[t._v("Route ID :")]),a("td",{staticClass:"border-0"},[t._v(t._s(e.routeID))])]),a("tr",[a("th",[t._v("Vehicle ID :")]),a("td",[t._v(t._s(e.vehicleID))])]),a("tr",[a("th",[t._v("Schedule :")]),a("td",[t._v(t._s(e.startTime)+" - "+t._s(e.endTime))])]),a("tr",[a("th",[t._v("Status :")]),a("td",[t._v(t._s(e.status))])]),a("tr",["Completed"===e.status?a("a",{staticClass:"btn btn-primary",attrs:{href:"#",type:"button"},on:{click:function(a){return a.preventDefault(),t.approveData(e.id,e.vehicleID)}}},[t._v("\r\n                  Approve By Admin\r\n                  ")]):t._e()])])])]),a("div",{staticClass:"col-md-3"},[a("table",{staticClass:"table table-responsive table-sm anyClass"},[t._m(1,!0),t._l(e.passenger,(function(e){return a("tbody",[a("tr",[a("td",[t._v(t._s(e.name))])])])}))],2)]),a("div",{staticClass:"5"})])])])])})),0)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h4",{staticClass:"card-title"},[t._v("\r\n      History\r\n      "),a("strong",[t._v("Ticket")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[a("b",[t._v("Passenger Name")])])])])}],n=a("2f62"),r=a("602f"),o=a("755e"),l=a("aeac"),c={components:{DirectionsRenderer:r["a"]},data(){return{title:"Daily",json_data:[],bank_accounts:[],xprops:{module:"TicketsIndex",route:"tickets",permission_prefix:"tickets_"},json_fields:{Date:"date",Route:"routeID",Vehicle:"vehicleID",Driver:"driverID","Start Time":"startTime","End Time":"endTime",Passenger:"passengerID"}}},beforeDestroy(){this.resetState()},computed:{...Object(n["c"])("TicketsIndex",["data","total","loading"]),google:o["gmapApi"]},mounted(){this.fetchDailyData(),this.updateData(),this.updateMarkers()},methods:{...Object(n["b"])("TicketsIndex",["fetchDailyData","fetchWeeklyData","fetchMonthlyData","fetchAnnualData","setQuery","resetState"]),daily(){this.fetchDailyData(),this.title="Daily"},weekly(){this.fetchWeeklyData(),this.title="Weekly"},monthly(){this.fetchMonthlyData(),this.title="Monthly"},annual(){this.fetchAnnualData(),this.title="Annual"},approveData(t,e){this.$swal({title:"Are you sure?",text:"You want to Approve!",type:"warning",showCancelButton:!0,confirmButtonText:"Yes",confirmButtonColor:"#dd4b39",focusCancel:!0,reverseButtons:!0}).then(e=>{e.value&&this.$store.dispatch(this.xprops.module+"/approveAdmin",t).then(t=>{this.$swal({type:"primary",title:"Succesfully",text:"Approved By Admin"})})})},updateData(){var t=this.$route.params.id;const e=this;var a=l["c"].ref("driverTrips/"),s=this.$route.params.vehicle;a.on("value",(function(t){var a=t.val()[s],i=parseFloat(a.latitude),n=parseFloat(a.longitude);e.center={lat:i,lng:n}})),l["m"].doc(t).onSnapshot(t=>{var e=t.data().passengerID,a=t.data().routeID;l["k"].doc(a).onSnapshot(t=>{var e=t.data(),a=e["destination"],s=e["pitstops"],i=[];l["g"].doc(a).onSnapshot(t=>{var e={lat:t.data().latitude,lng:t.data().longitude};this.destination=e}),s.forEach(t=>{l["g"].doc(t).onSnapshot(t=>{i.push({location:{lat:t.data().latitude,lng:t.data().longitude},stopover:!0})})}),this.waypts=i}),this.passenger=e})},updateMarkers:function(){this.$refs.mapRef.$mapPromise.then(t=>{const e=new google.maps.TrafficLayer;e.setMap(t)})}}},d=c,p=(a("6ae9"),a("2877")),u=Object(p["a"])(d,s,i,!1,null,"ce9a6908",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-6f4c2d5b.a0e68839.js.map