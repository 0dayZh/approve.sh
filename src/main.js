import Vue from 'vue'
import App from './App.vue'

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

/**
 * Mount App
 */
new Vue({
  render: h => h(App),
}).$mount('#app')
