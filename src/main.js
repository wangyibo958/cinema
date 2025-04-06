import Vue from 'vue'
import App from './App.vue'
import router from './router'//路由切换页面
import ElementUI from 'element-ui'//组件库
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI) //必须调用
Vue.use(router)
new Vue({
  router, // 注入路由实例
  render: h => h(App)
}).$mount('#app')
