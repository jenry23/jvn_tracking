(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76c630c8"],{"00a5":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.row[t.entry.key]?s("span",{staticClass:"badge badge-pill badge-azure"},[t._v("\n    "+t._s(t.row[t.entry.key][t.entry.field])+"\n  ")]):s("span",{staticClass:"badge badge-pill badge-orange"},[t._v("\n    Not Assigned\n  ")])])},n=[],r={props:["field","row"],computed:{entry(){let t=_.split(this.field,".");return{key:t[0],field:t[1]}}}},i=r,d=(s("10b7"),s("2877")),c=Object(d["a"])(i,a,n,!1,null,"a60ff64a",null);e["a"]=c.exports},"10b7":function(t,e,s){"use strict";s("17f4")},"17f4":function(t,e,s){},"88f4":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header card-header-primary card-header-icon"},[t._m(0),s("h4",{staticClass:"card-title"},[t._v("\n            "+t._s(t.$t("global.view"))+"\n            "),s("strong",[t._v(t._s(t.$t("cruds.expense.title_singular")))])])]),s("div",{staticClass:"card-body"},[s("back-button")],1),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"table-responsive"},[s("div",{staticClass:"table"},[s("tbody",[s("tr",[s("td",{staticClass:"text-primary"},[t._v("\n                        "+t._s(t.$t("cruds.expense.fields.id"))+"\n                      ")]),s("td",[t._v("\n                        "+t._s(t.entry.id)+"\n                      ")])]),s("tr",[s("td",{staticClass:"text-primary"},[t._v("\n                        "+t._s(t.$t("cruds.expense.fields.expense_category"))+"\n                      ")]),s("td",[s("datatable-single",{attrs:{row:t.entry,field:"expense_category.name"}})],1)]),s("tr",[s("td",{staticClass:"text-primary"},[t._v("\n                        "+t._s(t.$t("cruds.expense.fields.entry_date"))+"\n                      ")]),s("td",[t._v("\n                        "+t._s(t.entry.entry_date)+"\n                      ")])]),s("tr",[s("td",{staticClass:"text-primary"},[t._v("\n                        "+t._s(t.$t("cruds.expense.fields.amount"))+"\n                      ")]),s("td",[t._v("\n                        "+t._s(t.entry.amount)+"\n                      ")])]),s("tr",[s("td",{staticClass:"text-primary"},[t._v("\n                        "+t._s(t.$t("cruds.expense.fields.description"))+"\n                      ")]),s("td",[t._v("\n                        "+t._s(t.entry.description)+"\n                      ")])])])])])])])])])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card-icon"},[s("i",{staticClass:"material-icons"},[t._v("remove_red_eye")])])}],r=s("2f62"),i=s("00a5"),d={components:{DatatableSingle:i["a"]},data(){return{}},beforeDestroy(){this.resetState()},computed:{...Object(r["c"])("ExpensesSingle",["entry"])},watch:{"$route.params.id":{immediate:!0,handler(){this.resetState(),this.fetchShowData(this.$route.params.id)}}},methods:{...Object(r["b"])("ExpensesSingle",["fetchShowData","resetState"])}},c=d,l=s("2877"),o=Object(l["a"])(c,a,n,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-76c630c8.a6838138.js.map