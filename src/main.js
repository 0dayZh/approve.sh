import Vue from 'vue';
import App from './App.vue';
import VueFlashMessage from 'vue-flash-message';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
require('vue-flash-message/dist/vue-flash-message.min.css');


Vue.config.productionTip = false

/**
 * Global shared store
 */
const shared = Vue.observable({
  account: {
    address: "",
  },
  approvals: [],
  web3: null,
  debug: true
})

shared.install = function(){
  Object.defineProperty(Vue.prototype, '$store', {
    get () { return shared }
  })
}

Vue.use(shared);
Vue.use(VueFlashMessage);
Vue.use(Loading);

/**
 * Mount App
 */
new Vue({
  render: h => h(App),
}).$mount('#app')
