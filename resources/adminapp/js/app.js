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
import { auth } from './firebase'
import '../sass/app.scss'
import registerServiceWorker from './registerServiceWorker'

// Plugins

import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import GlobalMixins from './mixins/global'

Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(GlobalMixins)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  }
  else {
    next()
  }
})



let app
 auth.onAuthStateChanged(() => {
   if (!app) {
    const app = new Vue({
      el: '#app',
      registerServiceWorker,
      render: h => h(App),
      router,
      store,
      i18n,
    })
  }
})
