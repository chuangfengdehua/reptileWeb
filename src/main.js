// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css'
import '../static/css/reset.css'
Vue.use(Antd)
Vue.config.productionTip = false
// 设置全局axios请求
Vue.prototype.$http = axios
// 设置全局路径变量
Vue.prototype.baseURL = process.env.API_ROOT
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
