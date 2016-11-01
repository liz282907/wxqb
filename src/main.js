import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App'



import router from './route.config'

Vue.use(VueResource);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
