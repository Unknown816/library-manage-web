import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

axios.defaults.baseURL = '/api'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
