(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217ab9"],{c85c:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(t){return t.preventDefault(),s.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[s._m(0),e("div",{staticClass:"card-body"},[e("back-button")],1),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("input",{staticClass:"form-control",attrs:{type:"hidden"},domProps:{value:s.entry.id}}),e("div",{staticClass:"form-group bmd-form-group",class:{"has-items":s.entry.name,"is-focused":"name"==s.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[s._v("Name")]),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:s.entry.name},on:{input:s.updateName,focus:function(t){return s.focusField("name")},blur:s.clearFocus}})]),e("div",{staticClass:"form-group bmd-form-group",class:{"has-items":s.entry.address,"is-focused":"address"==s.activeField}},[e("label",{staticClass:"bmd-label-floating",attrs:{required:""}},[s._v("Address")]),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:s.entry.address},on:{input:s.updateAddress,focus:function(t){return s.focusField("address")},blur:s.clearFocus}})])])])],1),e("qriously",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{id:"qriously",value:s.entry.id,size:150}}),e("img",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{src:s.entry.qrcodeSrc,alt:"circle"}}),e("div",{staticClass:"card-footer"},[e("vue-button-spinner",{staticClass:"btn-primary",attrs:{status:s.status,isLoading:s.loading,disabled:s.loading}},[s._v("\n            Save\n            ")])],1)],1)])])])])},r=[function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"card-header card-header-primary card-header-icon"},[e("div",{staticClass:"card-icon"},[e("i",{staticClass:"material-icons"},[s._v("add")])]),e("h4",{staticClass:"card-title"},[s._v("\n              Create\n              "),e("strong",[s._v("Passenger")])])])}],i=e("2f62"),d={data(){return{time1:"",status:"",file:[],activeField:""}},computed:{...Object(i["c"])("PassengerSingle",["entry","loading","lists"])},beforeDestroy(){this.resetState()},methods:{...Object(i["b"])("PassengerSingle",["storeData","resetState","setQrCode","setName","setAddress"]),updateName(s){this.setName(s.target.value)},updateAddress(s){this.setAddress(s.target.value)},submitForm(){this.storeData().then(()=>{this.$router.push({name:"passenger_list.index"})}).catch(s=>{this.status="failed",_.delay(()=>{this.status=""},3e3)})},focusField(s){this.activeField=s},clearFocus(){this.activeField=""}}},l=d,c=e("2877"),o=Object(c["a"])(l,a,r,!1,null,null,null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d217ab9.5c4783c2.js.map