import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入echarts
import echarts from 'echarts'
//注册全局组件
Vue.prototype.$echarts = echarts
//引入elementui
import ElementUI from 'element-ui';
//引入elementui样式
import 'element-ui/lib/theme-chalk/index.css';
//注册全局组件
Vue.prototype.$Elementui = ElementUI
//use elementui
Vue.use(ElementUI)
//request
import request from './utils/request'
//注册全局组件
Vue.prototype.$request = request


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
