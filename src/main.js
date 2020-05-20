import Vue from 'vue';
import App from './App.vue';
import VueFlashMessage from 'vue-flash-message';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueGtag from "vue-gtag";
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
  web3: null
})

shared.install = function(){
  Object.defineProperty(Vue.prototype, '$store', {
    get () { return shared }
  })
}

Vue.use(shared);
Vue.use(VueFlashMessage);
Vue.use(Loading);
Vue.use(VueGtag,{
  config: { id: "UA-167128867-1" }
});

/**
 * Mount App
 */
new Vue({
  render: h => h(App),
}).$mount('#app')
