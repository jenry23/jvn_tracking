(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de753"],{8676:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[t._m(0),e("div",{staticClass:"card-body"},[e("back-button")],1),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"form-group bmd-form-group",class:{"has-items":t.entry.title,"is-focused":"title"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v("Title")]),e("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.entry.title},on:{input:t.updateTitle,focus:function(s){return t.focusField("title")},blur:t.clearFocus}})]),e("div",{staticClass:"form-group bmd-form-group",class:{"has-items":t.entry.companyID,"is-focused":"companyID"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v("Company")]),e("v-select",{attrs:{name:"companyID",label:"company_name",value:t.entry.companyID,options:t.lists.companyID,required:""},on:{input:t.updateCompanyID,focus:function(s){return t.focusField("companyID")},blur:t.clearFocus}})],1),e("div",{staticClass:"form-group bmd-form-group",class:{"has-items":0!==t.entry.permissions.length,"is-focused":"permissions"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v("Permissions")]),e("v-select",{key:"permissions-field",attrs:{name:"permissions",label:"title",value:t.entry.permissions,options:t.lists.permissions,closeOnSelect:!1,multiple:""},on:{input:t.updatePermissions,focus:function(s){return t.focusField("permissions")},blur:t.clearFocus}})],1)])])],1),e("div",{staticClass:"card-footer"},[e("vue-button-spinner",{staticClass:"btn-primary",attrs:{status:t.status,isLoading:t.loading,disabled:t.loading}},[t._v("\n            Save\n            ")])],1)])])])])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card-header card-header-primary card-header-icon"},[e("div",{staticClass:"card-icon"},[e("i",{staticClass:"material-icons"},[t._v("add")])]),e("h4",{staticClass:"card-title"},[t._v("\n              Create\n              "),e("strong",[t._v("Roles")])])])}],r=e("2f62"),l={data(){return{status:"",activeField:""}},computed:{...Object(r["c"])("RolesSingle",["entry","loading","lists"])},mounted(){this.fetchCreateData()},beforeDestroy(){this.resetState()},methods:{...Object(r["b"])("RolesSingle",["storeData","resetState","setTitle","setCompanyID","setPermissions","fetchCreateData"]),updateCompanyID(t){this.setCompanyID(t)},updateTitle(t){this.setTitle(t.target.value)},updatePermissions(t){this.setPermissions(t)},submitForm(){this.storeData().then(()=>{this.$router.push({name:"roles.index"}),this.$eventHub.$emit("create-success")}).catch(t=>{this.status="failed",_.delay(()=>{this.status=""},3e3)})},focusField(t){this.activeField=t},clearFocus(){this.activeField=""}}},o=l,n=e("2877"),c=Object(n["a"])(o,a,i,!1,null,null,null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0de753.b1e04163.js.map