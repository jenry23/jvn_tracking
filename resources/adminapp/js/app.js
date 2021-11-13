/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 require('./bootstrap')

 import Vue from 'vue';
 import moment from 'moment'
 import $ from 'jquery'

 Vue.config.productionTip = false
 window.Vue = Vue;

 Vue.prototype.moment = moment
 Vue.prototype.$jquery = $


 import App from './App.vue'

 // Core
 import router from './routes/routes'
 import store from './store/store'
 import i18n from './i18n'

 import '../sass/app.scss'
 import * as registerServiceWorker from './registerServiceWorker'

 // Plugins

 import GlobalComponents from './globalComponents'
 import GlobalDirectives from './globalDirectives'
 import GlobalMixins from './mixins/global'

 Vue.use(GlobalComponents)
 Vue.use(GlobalDirectives)
 Vue.use(GlobalMixins)


const app = new Vue({
  el: '#app',
  render: h => h(App),
  registerServiceWorker,
  router,
  store,
  i18n,
})
