import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css
import Moment from 'moment'
import RainbowPanel from "@/components/RainbowPanel";
import SimplePanel from "@/components/SimplePanel";
import SingleNav from "@/components/SingleNav";
import {formatNumber, formatNumberToB,formatNumberToM,formatNumberTo} from "@/utils/utils"
import {Decimal} from "decimal.js"

Vue.prototype.$formatNumberTo = formatNumberTo
Vue.prototype.$decimal = Decimal

Vue.filter('formatDate', function(value) {
  return Moment(value).format('YYYY-MM-DD')
})
Vue.filter('formatTime', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('formatNumber',value=>{
  return formatNumber(value)
})
Vue.filter('formatNumberToB',value=>{
  return formatNumberToB(value)
})
Vue.filter('formatNumberToM',value=>{
  return formatNumberToM(value)
})
Vue.filter('formatNumberTo',value=>{
  return formatNumberTo(value)
})
Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.component('RainbowPanel',RainbowPanel)
Vue.component('SimplePanel',SimplePanel)
Vue.component('SingleNav',SingleNav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
